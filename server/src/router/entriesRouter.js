const express = require('express');

const router = express.Router();

const isUser = require("../middlewares/isUser");
const canEdit = require("../middlewares/canEdit");
const entryExists = require("../middlewares/entryExists");
const commentExists = require('../middlewares/commentExists');
const isAdmin = require('../middlewares/isAdmin');
const isBannedUser = require('../middlewares/isBannedUser');
const isBannedEntry = require('../middlewares/isBannedEntry');
const isBannedComment = require('../middlewares/isBannedComment');
const updateBadge = require('../middlewares/updateBadge');


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
    reportComment,
    bannEntry,
    bannComment,
    getTotalReportsEntry,
    getTotalReportsComment,
    getComments,
    deleteComment
    
} = require('../controllers/entries');


router.get('/last-entries', updateBadge, getLastEntries);
router.get('/entry/:idEntry', entryExists, isBannedEntry, updateBadge, getOneEntry);
router.get('/entries/:category', updateBadge, getEntriesByCategory);
router.get('/entries/:category/:genre', updateBadge, getEntriesByGenre);
router.get('/top-rated/:category', updateBadge, getTopRatedEntriesByCategory);
router.get('/entries/total-reports/:idEntry', entryExists, isUser, isAdmin, getTotalReportsEntry);
router.get('/entries/total-reports/:idEntry/comments/:idComment', entryExists, isUser, isAdmin, commentExists, getTotalReportsComment);
router.get('/comments/:idEntry', entryExists, isUser, isBannedEntry, getComments)

router.post('/entry', isUser, isBannedUser, updateBadge, postEntry);
router.post('/entry/:idEntry/comments', entryExists, isBannedEntry, isUser, isBannedUser, postComment);
router.post('/entries/:idEntry/photos', entryExists, isBannedEntry, isUser, isBannedUser, canEdit, addPhotoEntry);
router.post('/entries/:idEntry/votes',isUser, isBannedUser, entryExists, isBannedEntry, voteEntry);
router.post('/entries/:idEntry/votes/:idComment', isUser, isBannedUser, entryExists, isBannedEntry, commentExists, isBannedComment, voteComment);
router.post('/entries/:idEntry/report', isUser, isBannedUser, entryExists, isBannedEntry, reportEntry);
router.post('/entries/:idEntry/report/:idComment',isUser, isBannedUser, entryExists, isBannedEntry, commentExists, isBannedComment, reportComment);

router.put('/edit-entry/:idEntry',entryExists, isBannedEntry, isUser, isBannedUser, canEdit, editEntry);
router.put('/entry/:idEntry/edit-comment/:idComment',entryExists, isBannedEntry, commentExists, isBannedComment, isUser, isBannedUser, editComment);
router.put('/entries/:idEntry/bann', isUser, isAdmin, entryExists, isBannedUser, isBannedEntry, bannEntry);
router.put('/entries/:idEntry/comments/:idComment/bann', isUser, isAdmin, isBannedUser, entryExists, isBannedEntry, commentExists, isBannedComment, bannComment);

router.delete('/entries/:idEntry/photos/:idPhoto', isUser, entryExists, canEdit, deletePhotoEntry);
router.delete('/entry/:idEntry', isUser, entryExists, canEdit, updateBadge, deleteEntry);
router.delete('/entry/:idEntry/delete-comment/:idComment', entryExists, isBannedEntry, commentExists, isBannedComment, isUser, isBannedUser, deleteComment);





module.exports = router;