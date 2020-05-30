const router = require('express').Router();
const axios = require('axios');
const schedule = require('node-schedule');

const soraPort = process.env.NODE_ENV === 'production' ? 8000 : 8100;
const numShards = process.env.NODE_ENV === 'production' ? 3 : 1;
const endPoint = process.env.NODE_ENV === 'production' ? 'http://api.sorabot.pw/bot/0/api' : `http://localhost:${soraPort}/api`;

const getShardedUrl = (shardId) => {
    if (process.env.NODE_ENV === 'production') {
        return `http://api.sorabot.pw/bot/${shardId}/api`;
    } else {
        return `http://localhost:${(soraPort + shardId)}/api`
    }
};

let statsCache = {};
let allWaifusCache = {};
let globalLeaderCache = [];

const getStats = async () => {
    console.log("Populating stats cache...");
    const promises = [];

    for (let i=0; i<numShards; i++) {
        const p = axios.get(`${getShardedUrl(i)}/stats`)
        promises.push(p);
    }

    let result = {
        messagesReceived: 0n,
        commandsExecuted: 0,
        ping: 0,
        guildCount: 0,
        userCount: 0,
    };

    const results = await Promise.all(promises.map(p => p.catch(e => e)));
    const validResults = results.filter(result => !(result instanceof Error));

    validResults.forEach(({ data }, index) => {
        if (index === 0) {
            result.uptime = data.uptime;
            result.shardNum = data.shardNum;
            result.version = data.version;
        }

        const msgRec = Number.parseInt(data.messagesReceived);
        result.messagesReceived += msgRec;
        result.commandsExecuted += data.commandsExecuted;
        result.ping += data.ping;
        result.guildCount += data.guildCount;
        result.userCount += data.userCount;

        // last changes to the responses
        result.ping = Math.round(result.ping / numShards);
        result.messagesReceived = result.messagesReceived +"";

        statsCache = result;
        console.log("Finished populating stats cache");
    });
}

getStats();
const statsJob = schedule.scheduleJob("*/5 * * * *", getStats);


// All waifus cache
const getAllWaifus = () => {
    console.log("Populating all waifus cache...");
    axios.get(`${endPoint}/waifus`)
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

// Global leaderboard
const getGlobalLeaderboard = async () => {
    console.log("Populating global leaderboard cache...");
    const promises = [];

    for (let i=0; i<numShards; i++) {
        const p = axios.get(`${getShardedUrl(i)}/leaderboard/global`)
        promises.push(p);
    }

    const userMap = new Map();
    let users = [];

    const results = await Promise.all(promises.map(p => p.catch(e => e)));
    const validResults = results.filter(result => !(result instanceof Error));

    validResults.forEach(({ data }) => {
        const list = data.ranks;
        list.forEach((user) => {
            if (!userMap.has(user.userId)) {
                // add it to map and the array
                userMap.set(user.userId, true);
                users.push(user);
            }
        });
    });

    // now sort the entire array with unique users
    users.sort((user1, user2) => {
        return user1.exp >= user2.exp ? -1 : 1;
    });
    // slice it so its only 100 users
    if (users.length > 100 ) {
        users = users.slice(0, 100);
    }
    // reset the ranks
    for (let i=0; i<users.length; i++) {
        users[i].rank = i+1;
    }
    // set the cache
    globalLeaderCache = users;

    console.log("Finished populating global leaderboard cache");
}

getGlobalLeaderboard();
const globalJob = schedule.scheduleJob("*/30 * * * *", getGlobalLeaderboard);

router.get('/getAllWaifus', (req,res) => {
    res.json(allWaifusCache);
});

router.get('/getUserWaifus/:userId', (req,res) => {
    const userId = req.params.userId;
    axios.get(`${endPoint}/waifus/user/${userId}`)
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
    axios.get(`${getShardedUrl(shardId)}/leaderboard/${guildId}`)
    .then(r => {
        res.json(r.data);
    })
    .catch(e => {
        console.log(e);
        res.status(500).send("Couldn't reach Sora Api.");
    });
});

router.get('/getRarities', (req, res) => {
    axios.get(`${endPoint}/waifus/rarities`)
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

router.get('/getGlobalLeaderboard', (req,res) => {
    res.json(globalLeaderCache);
});


module.exports = router;
