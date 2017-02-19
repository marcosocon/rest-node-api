var express = require('express');
var ExtractJwt = require('passport-jwt').ExtractJwt;
var passport = require('passport');
var config = require('./../config/database');

//ROUTES FOR REPORTS
var routes = function(User, JWT){
	var apiRoutes = express.Router();
	// apiRoutes.use('user/reports/:reportId', function(req, res, next){
	// 	Report.findById(req.params.reportId, function(err, report){
	// 		if(err){
	// 			res.status(500).send(err);
	// 		} else if(report) {
	// 			res.report = report;
	// 			next();
	// 		} else {
	// 			res.status(404).send('Report not found.');
	// 		}
	// 	});
	// });

	apiRoutes.route('/signup')
		.post(function (req, res) {
			if (!req.body.username || !req.body.password) {
				return res.json({success: false, mgs: 'Please insert username and password.'});
			}
			var newUser = new User({
				username: req.body.username,
				password: req.body.password
			});
			newUser.save(function (err) {
				if (err) {
					return res.json({success: false, msg: 'Username already exists'});
				}
				res.json({success: true, msg: 'User created successfully'});
			});
		});

	apiRoutes.route('/authenticate')
		.post(function (req, res) {
			User.findOne({username: req.body.username}, function (err, user) {
				if (err) {
					throw err;
				}
				if (!user) {
					res.send({success: false, msg: 'Authentication Failed, user not found.'});
				} else {
					user.comparePassword(req.body.password, function (err, isMatch) {
						if (isMatch && !err) {
							var token = JWT.sign(user, config.secret);
							res.json({success: true, token: 'JWT ' + token});
						} else {
							res.send({success: false, msg: 'Authentication Failed, wrong password'});
						}
					});
				}
			});
		});

	function cleanUserObject (user) {
		user._id = undefined;
		user.password = undefined;
		return user;
	}

	apiRoutes.route('/user')
		.get(passport.authenticate('jwt', { session: false }), function (req, res) {
			if (req.user) {
				cleanUserObject(req.user);
				res.json({success: true, user: req.user, msg: 'There you go!'});
			} else {
				res.status(403).send({success: false, msg: 'No token provided.'});
			}
		});

	apiRoutes.route('/reports')
		.post(passport.authenticate('jwt', { session: false }), function (req, res) {
			User.findById(req.user.id, function (err, user) {
				if (err || !user) {
					return res.status(404).send('Error: User not found.');
				}
				var report = req.body;
				user.reports.push(report);
				user.save();
				res.status(201).json(user.reports);
			});
		})
		.get(passport.authenticate('jwt', { session: false }), function(req, res){
			if (req.user) {
 				res.json(req.user.reports);
			}
		});

	apiRoutes.route('/reports/:reportId')
		.put(passport.authenticate('jwt', { session: false }), function (req, res) {
			res.report.description = req.body.description;
			res.report.date = req.body.date;
			res.report.time = req.body.time;
			res.report.billable = req.body.billable;
			res.report.save(function (err) {
				if(err){
					res.status(500).send(err);
				} else {
					res.json(res.report);
				}
			});
		})
		.delete(passport.authenticate('jwt', { session: false }), function (req, res) {
			res.report.remove(function (err) {
				if(err){
					res.status(500).send(err);
				} else {
					res.json({message: 'Successfully deleted'});
				}
			});
		})
		.patch(passport.authenticate('jwt', { session: false }), function (req, res) {
			if(req.body._id){
				delete req.body._id;
			}
			for(var i in req.body){
				res.report[i] = req.body[i];
			}
			res.report.save(function (err) {
				if(err){
					res.status(500).send(err);
				} else {
					res.json(res.report);
				}
			});
		})
		.get(passport.authenticate('jwt', { session: false }), function (req, res) {
			res.json(res.report);
		});

	return apiRoutes;
};

module.exports = routes;