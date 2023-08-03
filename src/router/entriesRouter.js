const express = require('express');

const router = express.Router();

const isUser = require("../middlewares/isUser");

const {
    getLastEntries,
    getOneEntry,
    getEntriesByCategory,
    getEntriesByGenre,
    getTopRatedEntriesByCategory,
    postEntry
} = require('../controllers/entries');

router.get('/last-entries', getLastEntries);
router.get('/entry/:idEntry', getOneEntry);
router.get('/entries/:category', getEntriesByCategory);
router.get('/entries/:category/:genre', getEntriesByGenre);
router.get('/top-rated/:category', getTopRatedEntriesByCategory);
router.post('/entry', isUser, postEntry)


module.exports = router;