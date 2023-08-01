const express = require('express');

const router = express.Router();

const {
    getLastEntries,
    getOneEntry,
    getEntriesByCategory,
    getEntriesByGenre,
    getTopRatedEntriesByCategory
} = require('../controllers/entries');

router.get('/last-entries', getLastEntries);
router.get('/entry/:idEntry', getOneEntry);
router.get('/entries/:category', getEntriesByCategory);
router.get('/entries/:category/:genre', getEntriesByGenre);
router.get('/top-rated/:category', getTopRatedEntriesByCategory);
//hacer get de perfil de usuario


module.exports = router;