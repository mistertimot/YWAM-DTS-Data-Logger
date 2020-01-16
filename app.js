var bodyParser = require("body-parser"),
var mongoose = require("mongoose"),
var express = require("express"),
var methodOverride = require("method-override"),
var app = express(),
var passport = require("passport"),
var LocalStrategy = require("passport-local");

var School = require("./models/dts");

mongoose.connect("mongodb://localhost/project_dts");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true, useNewUrlParser: true}));
app.use(methodOverride("_method"));

//=======
//ROUTES
//=======

app.get("/", function(req, res){
	res.render("landing");
});

app.get("/about", function(req, res){
	res.render("about");
});

app.get("/opportunities", function(req, res){
	School.find({}, function(err, schools){
		if(err){
			console.log(err);
		} else{
			res.render("index", {schools: schools});
		}
	})
});

app.get("/opportunities/new", function(req, res){
	res.render("new");
});

app.post("/opportunities", function(req, res){
	School.create(req.body.school, function(err, newSchool){
		if(err){
			console.log(err);
		} else{
			console.log("New Opportunity added!");
			console.log(newSchool);
			res.redirect("/opportunities");
		}
	});
});

app.get("/opportunities/:id", function(req, res){
	School.findById(req.params.id, function(err, foundSchool){
		if(err){
			console.log(err);
		} else{
			res.render("show", {school: foundSchool});
		}
	});
});

app.get("/opportunities/:id/edit", function(req, res){
	School.findById(req.params.id, function(err, foundSchool){
		if(err){
			res.redirect("opportunities");
		} else {
			res.render("edit", {school: foundSchool});
		}
	});
});

app.put("/opportunities/:id", function(req, res){
	School.findByIdAndUpdate(req.params.id, req.body.school, function(err, updatedSchool){
		if(err){
			res.redirect("/opportunities");
		} else{
			res.redirect("/opportunities/" + req.params.id);
		}
	})
});
	
app.delete("/opportunities/:id", function(req, res){
	School.findByIdAndDelete(req.params.id, function(err){
		if(err){
			res.redirect("/opportunities");
		} else{
			res.redirect("/opportunities");
		}
	});
});
	



app.listen(3000, function(){
	console.log("App is up and running!");
});