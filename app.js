const express= require("express");
const bodyParser= require("body-parser");
const ejs= require("ejs");
const request= require("request");

const app= express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static("public"));

app.get("/", function(req, res) {
	res.render("home");
});

app.get("/about", function(req,res) {
	res.render("about");
});

app.get("/image", function(req,res) {
	res.render("image");
});

app.get("/registration", function(req,res) {
	res.render("registration");
});

app.get("/contact", function(req,res) {
	res.render("contact");
});

app.get("/donate", function(req,res) {
	var username=req.body.userName;
	var Amount=req.body.amount;
	
	res.render("donate", {userName: "Thanks  for donating "});
});

app.get("/comment", function(req,res) {
	var GoodName=req.body.goodName;
	
	res.render("comment", {goodname: "Thanks  for commenting"});
});
		

app.post("/registration", function(req,res) {
	var Name= req.body.fullname;
	var Email= req.body.email;
	var Contact= req.body.mobile;
	var Add=req.body.add;
	var Age=req.body.age;
	var Profession=req.body.profession;
	var data= {
		members: [
		{
			email_address: Email,
		    status:"subscribed",
			merge_fields: {
				FNAME:Name,
				AGE:Age,
				ADDRESS:Add,
				PHONE:Contact,
				PROFESSION:Profession,
			},
		},
	 ],
	};
	
var jsonData= JSON.stringify(data);
	
	var options= {
		url: "https://us18.api.mailchimp.com/3.0/lists/e0b642d28b",
		method: "POST",
		headers: {
			"Authorization": "Kunal1 2134b74ea6b20ab1e1cb9b1831788f14-us18",
		},
		body: jsonData,
	};
	
	request(options, function(error, response, body) {
		if(response.statusCode=== 200) {
		res.render("success", {fullName: "Your Name is: " + Name, emailAdd: "Your Email is: " + Email,
		address:"Your  Address is: " + Add, age:"Your Age is: " + Age, profession:"Your Profession is: " + Profession,
		mobile:"Your Contact No. is: " + Contact});
		}
	});
});

app.listen(process.env.PORT||4000, function() {
	console.log("Server Started Running on port:4000");
});