const express = require('express');

const router = express.Router();

const {
    getLastEntries
} = require('../controllers/entries');

router.get('/last-entries', getLastEntries);

module.exports = router;