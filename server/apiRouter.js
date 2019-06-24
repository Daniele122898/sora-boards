const router = require('express').Router();
const axios = require('axios');

const soraPort = process.env.NODE_ENV === 'production' ? 8087 : 8187;

const soraApi = `http://localhost:${soraPort}/api/SoraApi`;

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

router.get('/GetUserWaifus/:userId', (req,res) => {
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


module.exports = router;