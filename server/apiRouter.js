const router = require('express').Router();
const axios = require('axios');
const schedule = require('node-schedule');

const soraPort = process.env.NODE_ENV === 'production' ? 8087 : 8187;
const numShards = process.env.NODE_ENV === 'production' ? 3 : 1;

const soraApi = `http://localhost:${soraPort}/api/SoraApi`;
const getApiPort = (port) => `http://localhost:${port}/api/SoraApi`;

let statsCache = {};
let allWaifusCache = {};

const getStats = () => {
    console.log("Populating stats cache...");
    const promises = [];

    for (let i=0; i<numShards; i++) {
        const p = axios.get(`${getApiPort(soraPort+i)}/GetSoraStats/`)
        promises.push(p);
    }

    let result = {
        messagesReceived: 0n,
        commandsExecuted: 0,
        ping: 0,
        guildCount: 0,
        userCount: 0,
    };

    Promise.all(promises)
    .then(responses => {
        responses.forEach(({ data }, index) => {
            if (index == 0) {
                result.uptime = data.uptime;
                result.shardNum = data.shardNum;
                result.version = data.version;
            }

            const msgRec = BigInt(data.messagesReceived);
            result.messagesReceived += msgRec;
            result.commandsExecuted += data.commandsExecuted;
            result.ping += data.ping;
            result.guildCount += data.guildCount;
            result.userCount += data.userCount;
        });

        // last changes to the responses
        result.ping /= numShards;
        result.messagesReceived = result.messagesReceived +"";

        statsCache = result;
        console.log("Finished populating stats cache");
    })
    .catch(e => {
        console.log(e);
    });
}
getStats();
const statsJob = schedule.scheduleJob("*/5 * * * *", getStats);

// All waifus cache
getAllWaifus = () => {
    console.log("Populating all waifus cache...");
    axios.get(`${soraApi}/GetAllWaifus/`)
    .then(r => {
        allWaifusCache = r.data;
        console.log("Finished populating all waifus cache");
    })
    .catch(e => {
        console.log(e);
    });
}
getAllWaifus();
const waifuJob = schedule.scheduleJob("*/5 * * * *", getAllWaifus);

router.get('/getAllWaifus', (req,res) => {
    axios.get(`${soraApi}/GetAllWaifus/`)
    .then(r => {
        res.json(r.data);
    })
    .catch(e => {
        console.log(e);
        res.status(500).send("Couldn't reach Sora Api.");
    });
});

router.get('/getUserWaifus/:userId', (req,res) => {
    const userId = req.params.userId;
    axios.get(`${soraApi}/GetUserWaifus/${userId}`)
    .then(r => {
        res.json(r.data);
    })
    .catch(e => {
        console.log(e);
        res.status(500).send("Couldn't reach Sora Api.");
    });
});

router.get('/getLeaderboard/:id', (req,res) => {
    const guildId = req.params.id;
    const shardId = ~~((guildId / 4194304) % numShards);
    const port = soraPort+shardId;
    axios.get(`${getApiPort(port)}/GetGuildLeaderboard/${guildId}`)
    .then(r => {
        res.json(r.data);
    })
    .catch(e => {
        console.log(e);
        res.status(500).send("Couldn't reach Sora Api.");
    });
});

router.get('/getSoraStats', (req,res) => {
    res.json(statsCache);
});


module.exports = router;