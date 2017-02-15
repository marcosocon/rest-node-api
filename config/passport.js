var JwtStrategy = require('passport-jwt').Strategy;

var User = require('../app/models/userModel');
var config = require('./database');

module.exports = function (passport) {
	var opts = {};
	opts.secretOrKey = config.secret;
	passport.use(new JwtStrategy(opts, function (jwt_payload, done) {
		User.find({id: jwt_payload.id}, function (err, user) {
			if (err) {
				return done(err, false);
			}
			if (user) {
				done(null, user);
			} else {
				done(null, false);
			}
		});
	}));
};