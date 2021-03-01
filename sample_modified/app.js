var express = require("express"), 
	mongoose = require("mongoose"), 
	passport = require("passport"), 
	bodyParser = require("body-parser"), 
	LocalStrategy = require("passport-local"), 
	passportLocalMongoose = 
		require("passport-local-mongoose")
    User = require("./models/user"); 
    alert = require("alert")
const mongodbConnection = require("./mongo")

//New Comment Added to understand CodeDeploy
/*mongoose.set('useNewUrlParser', true); 
mongoose.set('useFindAndModify', false); 
mongoose.set('useCreateIndex', true); 
mongoose.set('useUnifiedTopology', true); 
const connection= mongoose.connect("mongodb://localhost:27017/sampledb"); 
console.log(connection)*/

mongodbConnection();

var app = express(); 
app.set("view engine", "ejs"); 
app.use(bodyParser.urlencoded({ extended: true })); 

app.use(require("express-session")({ 
	secret: "Rusty is a dog", 
	resave: false, 
	saveUninitialized: false
})); 

app.use(passport.initialize()); 
app.use(passport.session()); 

//passport.use(new LocalStrategy(User.authenticate())); 
//passport.serializeUser(User.serializeUser()); 
//passport.deserializeUser(User.deserializeUser()); 

//===================== 
// ROUTES 
//===================== 

app.get("/", function(req,res){
	res.redirect("/home");
});


// Showing home page 
app.get("/home", function (req, res) {
	console.log("Home path") 
	res.render("home"); 
}); 

// Showing secret page 
app.get("/secret",  function (req, res) { 
    var id = req.query.id;
   // console.log(id)
	console.log("Secret Page")
	res.render("secret",{'data': req.query.id}); 
}); 

app.get("/register",function(req,res){
    console.log("Register Page")
    res.render("register");
})

app.post("/register",function(req,res){
    var username = req.body.username;
    var password = req.body.password;
    var id = req.body.id;
    var new_user = new User({
        name: username,
        password: password,
        id:id
    })
    new_user.save(function(err,data){
        if(err){
            console.log(err)
        }
        else{
            alert("Registered Successfully")
           // console.log(data)
        }
    })
    res.redirect("/home")
})

//Showing login form 
app.get("/login", function (req, res) {
	console.log("Login Path") 
	res.render("login"); 
}); 

//Handling user login 
app.post("/login", function (req, res) { 
    var user = req.body.username;
    var pass = req.body.password;
    var check = {name: user, password: pass}
    //console.log(user)
    User.find(check,function(err,data){
        if(err){
            res.redirect("/login")
        }
        if(data.length > 0){
           // console.log(data)
            res.redirect("/secret/?id="+data[0].id)
        }
        if (data.length == 0){
            alert("Entered credentials are wrong")
            res.redirect("/login")
        }
        
    })
}); 

//Handling user logout 
app.get("/logout", function (req, res) {
	console.log("Logout Path") 
	req.logout(); 
	res.redirect("/home"); 
}); 



var port = process.env.PORT || 3000; 
app.listen(port, function () { 
	console.log("Server Has Started!"); 
}); 
