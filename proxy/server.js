const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

app.use(cors());

app.get('/NameSearch/GetNamesCount', async (req, res) => {
    try {
        const { data } = await axios.get(`https://ask.rks-gov.net/NameSearch/GetNamesCount/?Name=${req.query.Name}`);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
});

app.listen(3001, () => console.log('Proxy server running on port 3001'));