var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var reportModel = new Schema({
	description: {
		type: String
	},
	time : {
		type: Number
	},
	date : {
		type: String
	},
	billable: {
		type: Boolean,
		default: true
	}
});

module.exports = mongoose.model('Report', reportModel);
