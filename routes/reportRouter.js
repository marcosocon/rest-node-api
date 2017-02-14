var express = require('express');

//ROUTES FOR REPORTS
var routes = function(Report){
	var reportRouter = express.Router();
	reportRouter.use('/reports/:reportId', function(req, res, next){
		Report.findById(req.params.reportId, function(err, report){
			if(err){
				res.status(500).send(err);
			} else if(report) {
				res.report = report;
				next();
			} else {
				res.status(404).send('Report not found.');
			}
		});
	});

	reportRouter.route('/reports')
		.post(function(req, res){
			var report = new Report(req.body);
			report.save();
			res.status(201).json(report);
		})
		.get(function(req, res){
			Report.find({}, function(err, reports){
				if(!err){
					res.json(reports);
				} else {
					res.status(500).send(err);
				}
			});
		});
	reportRouter.route('/reports/:reportId')
		.put(function(req, res){
			res.report.description = req.body.description;
			res.report.date = req.body.date;
			res.report.time = req.body.time;
			res.report.billable = req.body.billable;
			res.report.save(function(err){
				if(err){
					res.status(500).send(err);
				} else {
					res.json(res.report);
				}
			});
		})
		.patch(function(req, res){
			if(req.body._id){
				delete req.body._id;
			}
			for(var i in req.body){
				res.report[i] = req.body[i];
			}
			res.report.save(function(err){
				if(err){
					res.status(500).send(err);
				} else {
					res.json(res.report);
				}
			});
		})
		.get(function(req, res){
			res.json(res.report);
		});
	return reportRouter;
};
module.exports = routes;