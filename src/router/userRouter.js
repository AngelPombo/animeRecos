const express = require('express');

const router = express.Router();

const isUser = require('../middlewares/isUser');
const userExists = require("../middlewares/userExists");
const isAdmin = require('../middlewares/isAdmin');
const isBannedUser = require('../middlewares/isBannedUser');
const validateDataUser = require('../middlewares/validateDataUser');

const {
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
    reportUser,
    bannUser,
    getTotalReportsUser
} = require('../controllers/users');


router.get('/user/:idUser',userExists, isUser, isBannedUser, getUserById);
router.get('/user-entries/:idUser', isUser, isBannedUser, getLastUserEntries);
router.get('/users/validate/:regCode', validateUser);
router.get('/users/total-reports/:idUser', userExists, isUser, isAdmin, getTotalReportsUser);

router.post('/new-user', validateDataUser, postNewUser);
router.post('/login', loginUser);
router.post('/users/recover-password', recoverPwd);
router.post('/users/reset-password', setNewPwd);
router.post('/users/:idUser/report', userExists, isUser, reportUser);

router.put('/edit-profile/:idUser',userExists, isUser, updateUser);
router.put('/users/:idUser/password', userExists, isUser, changePwd);
router.put('/users/:idUser/bann', userExists, isUser, isAdmin, bannUser);

router.delete('/users/:idUser', userExists, isUser, deleteUser);




module.exports = router;