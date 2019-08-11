const express = require('express');
const router = express.Router();
const https = require('https');
const axios = require('axios');
const config = require('config');
const auth = require('../middleware/auth');
const logger = require('../middleware/logging');

const api = process.env.API_SKILLS || config.get('API_SKILLS');

router.get('/', async (req, res) => {
    const headers = req.headers;
    logger.log({level: 'info', message: "Processing request: ", meta: headers});
    const agent = new https.Agent({rejectUnauthorized: false});
    const result = await axios.get(api, {httpsAgent: agent});
    if (result && result.data && result.data.skills) {
        logger.log({
            level: 'info',
            message: `WOW: Getting results from microservice:`,
            meta: JSON.stringify(result.data)
        });
        return res.send(result.data);
    }
    logger.error({
        level: 'error',
        message: `something went wrong...`,
    });
    res.statusMessage = "Else: Content not found";
    res.status(401);
    res.send("Else: Content not found");
});

router.post('/', auth, async (req, res) => {
    logger.log({
        level: 'info',
        message: 'Processing post request...',
    });
    const agent = new https.Agent({rejectUnauthorized: false});
    const result = await axios.post(api, req.body, {httpsAgent: agent});
    logger.log({
        level: 'info',
        message: 'Data for post request was successfully saved: ',
        meta: JSON.stringify(result.data),
    });
    return res.send(result.data);
});

router.patch('/', auth, async (req, res) => {
    const agent = new https.Agent({rejectUnauthorized: false});
    logger.log({
        level: 'info',
        message: 'Processing patch request...',
    });
    const result = await axios.patch(api, req.body, {httpsAgent: agent});
    logger.log({
        level: 'info',
        message: 'Data for patch request was successfully updated: ',
        meta: JSON.stringify(result.data),
    });
    return res.send(result.data);
});

router.delete('/:id', auth, async (req, res) => {
    const agent = new https.Agent({rejectUnauthorized: false});
    logger.log({
        level: 'info',
        message: 'Processing delete request...',
    });
    const result = await axios.delete(api + req.params.id, {httpsAgent: agent});
    logger.log({
        level: 'info',
        message: 'Data for delete request was successfully processed: ',
        meta: JSON.stringify(result.data),
    });
    return res.sendStatus(result.data);
});

module.exports = router;
