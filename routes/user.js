const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');
const sock = require('../controllers/sockController');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer_config');
const socket = require('../middleware/socket');

router.get('/connect', sock.connect);

router.post('/signup', userCtrl.signup);
router.get('/signout', userCtrl.signout);
router.delete('/killMe', userCtrl.delAcount);
router.get('/profil', auth, userCtrl.getUserProfil);
router.put('/profil',auth,  multer, userCtrl.setUserProfil);

const Router = function(io) {
    if(io){
        router.post('/signin', userCtrl.signin(io));
    }
    return router
}
exports.module = Router;


// module.exports = router;