require('dotenv').config();
const passport    = require('passport');
const passportJWT = require("passport-jwt");
const bcrypt = require('bcrypt');

const ExtractJWT = passportJWT.ExtractJwt;

const UserModal = require('./models/user');
const error_types = require('./middleware/error_types');

const LocalStrategy = require('passport-local').Strategy;
const JWTStrategy   = passportJWT.Strategy;

passport.use(new LocalStrategy({
        usernameField: 'emailAddress',
        passwordField: 'password'
    },
    function (emailAddress, password, cb) {
        //Assume there is a DB module providing a global UserModel
        return UserModal.findOne({emailAddress: emailAddress})
            .then(user => {
                if (!user || !bcrypt.compareSync(password, user.password)) {
                    return cb(new error_types.Error404("username or password not correct."));
                }

                return cb(null, user, {
                    message: 'Logged In Successfully'
                });
            })
            .catch(err => {
                return cb(err);
            });
    }
));

passport.use(new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey   : process.env.JWT_SECRET
    },
    function (jwtPayload, cb) {
        console.log('payload');
    console.log(jwtPayload);

        //find the user in db if needed
        return UserModal.findOne({_id:jwtPayload.sub})
            .then(user => {
                return cb(null, user);
            })
            .catch(err => {
                return cb(err);
            });
    }
));

/*
passport.use(new InstagramStrategy({
        clientID: process.env.INSTAGRAM_CLIENT_ID,
        clientSecret: process.env.INSTAGRAM_CLIENT_SECRET,
        callbackURL: "http://127.0.0.1:3000/instagram/callback"
    },
    function(accessToken, refreshToken, profile, done) {
        // UserModal.findOrCreate({ instagramId: profile.id }, function (err, user) {
        //     return done(err, user);
        // });
    }
));
 */
