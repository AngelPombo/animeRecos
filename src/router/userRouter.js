const express = require('express');

const router = express.Router();

const isUser = require('../middlewares/isUser');
const userExists = require("../middlewares/userExists");

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
    reportUser
} = require('../controllers/users');


router.get('/user/:idUser',userExists, isUser, getUserById);
router.get('/user-entries/:idUser', getLastUserEntries);

router.get('/users/validate/:regCode', validateUser);
router.post('/new-user', postNewUser);
router.post('/login', loginUser);
router.put('/edit-profile/:idUser',userExists, isUser, updateUser);

router.put('/users/:idUser/password', changePwd);
router.post('/users/recover-password', recoverPwd);
router.post('/users/reset-password', setNewPwd);
router.delete('/users/:idUser', isUser, deleteUser);
router.post('/users/:idUser/report', userExists, isUser, reportUser)

module.exports = router;