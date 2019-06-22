const router = require('express').Router();
const axios = require('axios');

const soraPort = process.env.NODE_ENV === 'production' ? 8087 : 8187;

router.get('/getAllWaifus', (req,res) => {
    axios.get(`http://localhost:${soraPort}/api/SoraApi/GetAllWaifus/`)
    .then(r => {
        res.json(r.data);
    })
    .catch(e => {
        console.log(e);
        res.status(500).send("Couldn't reach Sora Api.");
    });
});

module.exports = router;