var mongoose = require("mongoose");

var schoolSchema = new mongoose.Schema({
	location: String,
	outreachLocations: String, 
	cost: Number, 
	startDate: String,
	website: String, 
	FBPage: String,
	youtubeChannel: String, 
	additionalNotes: String
});

module.exports = mongoose.model("School", schoolSchema);