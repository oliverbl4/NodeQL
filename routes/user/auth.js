var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var passport = require('passport');
var error_types = require('../../middleware/error_types');

/* POST login. */
/* Based on https://medium.com/front-end-weekly/learn-using-jwt-with-passport-authentication-9761539c4314 */
router.post('/', function (req, res, next) {

    passport.authenticate('local', {session: false}, (err, user, info) => {

        // Checking if user has been logged in
        if (err || !user) {
            return next(new error_types.Error400("Login failed."));
        }

        const { env: { JWT_LIFETIME = 0, JWT_ALGORITHM = null, JWT_SECRET = null } = {} } = process || {};

        // If has been authenticated successfully, then create a jwt token
        const payload = {
            sub: user._id,
            exp: Math.round(Date.now()/1000) + parseInt(JWT_LIFETIME),
            username: user.emailAddress
        };
        const token = jwt.sign(JSON.stringify(payload), JWT_SECRET, {algorithm: JWT_ALGORITHM});

        // Token response
        return res.json({token});
    })
    (req, res);

});

module.exports = router;
