const express = require('express');

const router = express.Router();

const isUser = require("../middlewares/isUser");
const canEdit = require("../middlewares/canEdit");
const entryExists = require("../middlewares/entryExists");
const commentExists = require('../middlewares/commentExists');



const {
    getLastEntries,
    getOneEntry,
    getEntriesByCategory,
    getEntriesByGenre,
    getTopRatedEntriesByCategory,
    postEntry,
    editEntry,
    postComment,
    editComment,
    addPhotoEntry,
    deletePhotoEntry,
    deleteEntry,
    voteEntry,
    voteComment,
    reportEntry,
    reportComment
    
} = require('../controllers/entries');


router.get('/last-entries', getLastEntries);
router.get('/entry/:idEntry', entryExists, getOneEntry);
router.get('/entries/:category', getEntriesByCategory);
router.get('/entries/:category/:genre', getEntriesByGenre);
router.get('/top-rated/:category', getTopRatedEntriesByCategory);
router.post('/entry', isUser, postEntry);
router.put('/edit-entry/:idEntry',entryExists,isUser,canEdit,editEntry);
router.post('/entry/:idEntry/comments', entryExists, isUser, postComment);
router.put('/entry/:idEntry/edit-comment/:idComment',entryExists, commentExists,isUser, editComment);
router.post('/entries/:idEntry/photos', entryExists, isUser, canEdit, addPhotoEntry);
router.delete('/entries/:idEntry/photos/:idPhoto', isUser, entryExists, canEdit, deletePhotoEntry);
router.delete('/entry/:idEntry', isUser, entryExists, canEdit, deleteEntry);
router.post('/entries/:idEntry/votes',isUser, entryExists, voteEntry);
router.post('/entries/:idEntry/votes/:idComment', isUser,entryExists, commentExists, voteComment);
router.post('/entries/:idEntry/report', isUser, entryExists, reportEntry)
router.post('/entries/:idEntry/report/:idComment',isUser,entryExists, commentExists, reportComment)



module.exports = router;