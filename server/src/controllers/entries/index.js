const getLastEntries = require("./getLastEntries");
const getOneEntry = require("./getOneEntry");
const getEntriesByCategory = require("./getEntriesByCategory");
const getEntriesByGenre = require("./getEntriesByGenre");
const getTopRatedEntriesByCategory = require("./getTopRatedEntriesByCategory");
const postEntry = require("./postEntry");
const editEntry = require("./editEntry");
const postComment = require("./postComment");
const editComment = require("./editComment");
const addPhotoEntry = require ("./addPhotoEntry");
const deletePhotoEntry = require("./deletePhotoEntry");
const deleteEntry = require ("./deleteEntry");
const voteEntry = require("./voteEntry");
const voteComment = require("./voteComment");
const reportEntry = require("./reportEntry");
const reportComment = require("./reportComment");
const bannEntry = require('./bannEntry');
const bannComment = require('./bannComment');
const getTotalReportsEntry = require('./getTotalReportsEntry');
const getTotalReportsComment = require('./getTotalReportsComment');
const getComments = require('./getComments');
const deleteComment = require('./deleteComment');

module.exports = {
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
}