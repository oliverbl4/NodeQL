var express = require('express');
var router  = express.Router();
var jwt = require('jsonwebtoken');
var UserModal = require('../../models/user');
var error_types = require('../../middleware/error_types');
var bcrypt = require('bcrypt');

/* POST login. */
router.post('/', function (req, res, next) {
        console.log("caso login");
        var params = req.body;
        var emailAddress = params.emailAddress;
        var password = params.password;
        UserModal.findOne({emailAddress: emailAddress})
            .then(user=>{
                if(user === null || !bcrypt.compareSync(password, user.password))
                    next(new error_types.Error404("username or password not correct."));
                else{
                    console.log("*** comienza generacion token*****");
                    const payload = {
                        sub: user._id,
                        exp: Math.round(Date.now()/1000) + parseInt(process.env.JWT_LIFETIME),
                        username: user.emailAddress
                    };
                    const token = jwt.sign(JSON.stringify(payload), process.env.JWT_SECRET, {algorithm: process.env.JWT_ALGORITHM});
                    res.json({ data: { token: token } });
                }
            })
            .catch(err=>next(err)) // error en DB

        // passport.authenticate('local', {session: false}, (err, user, info) => {
    //     if (err || !user) {
    //         return res.status(400).json({
    //             message: 'Something is not right',
    //             user   : user
    //         });
    //     }
    //     req.login(user, {session: false}, (err) => {
    //         if (err) {
    //             res.send(err);
    //         }
    //         // generate a signed json web token with the contents of user object and return it in the response
    //         const token = jwt.sign(user, 'your_jwt_secret');
    //         return res.json({user, token});
    //     });
    // })(req, res);
});

module.exports = router;
