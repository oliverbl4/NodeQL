var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    return res.send({message: 'respond with a resource'});
});

/* GET user profile. */
router.get('/profile', function(req, res, next) {
    return res.send(req.user);
});

module.exports = router;
