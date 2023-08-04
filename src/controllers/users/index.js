const getUserById = require("./getUserById");
const getLastUserEntries = require("./getLastUserEntries");
const postNewUser = require('./postNewUser');
const validateUser = require('./validateUser');
const loginUser = require('./loginUser');
const updateUser = require('./updateUser');
const changePwd = require('./changePwd');
const recoverPwd = require('./recoverPwd');
const setNewPwd = require('./setNewPwd');
const deleteUser = require ('./deleteUser');
const reportUser = require ('./reportUser')


module.exports = {
    getUserById,
    getLastUserEntries,
    postNewUser,
    validateUser,
    loginUser,
    updateUser,
    changePwd,
    recoverPwd,
    setNewPwd,
    deleteUser,
    reportUser
}