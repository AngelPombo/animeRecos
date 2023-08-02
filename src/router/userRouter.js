const express = require('express');

const router = express.Router();

const isUser = require('../middlewares/isUser');

const {
    getUserById,
    getLastUserEntries,
    postNewUser,
    validateUser,
    loginUser,
    updateUser,
    changePwd,
    recoverPwd,
    setNewPwd
} = require('../controllers/users');

router.get('/user/:idUser', isUser, getUserById);
router.get('/user-entries/:idUser', getLastUserEntries);

router.get('/users/validate/:regCode', validateUser);
router.post('/new-user', postNewUser);
router.post('/login', loginUser);
router.put('/edit-profile/:idUser', isUser, updateUser);

router.put('/users/:idUser/password', changePwd);
router.post('/users/recover-password', recoverPwd);
router.post('/users/reset-password', setNewPwd);

module.exports = router;