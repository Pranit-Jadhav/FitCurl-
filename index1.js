import express from"express";
import bodyParser from "body-parser";
import pg from "pg";
import env from "dotenv";
env.config();
 
const db = new pg.Client({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT,
});
db.connect();

var users = []; 
db.query("SELECT * FROM users", (err,res)=>{
    if(err){
        console.error("Error Executing Query!");
    }
    else{
        users = res.rows;
        
    }
});



var app = express();
const port = 3000;
var lock = true;


app.use(express.static("public"));

app.use(bodyParser.urlencoded(import.meta.url));

app.get("/",(req,res)=>{
    res.render("index.ejs");
});
app.get("/about",(req,res)=>{
    res.render("about.ejs");
});
app.get("/dashboard",(req,res)=>{
    res.render("plan1.ejs");
});
app.post("/login",(req,res)=>{
    res.render("login.ejs",{ close: lock });
});

app.post("/signin",async(req,res)=>{
    var pas={};
    var email = req.body["email"];
    var password = req.body["password"];
    
    pas = await db.query("SELECT password FROM users WHERE email=$1",[email]);
 
   var use = {}
   use = pas.rows[0];

if((password === use.password)){
    res.render("plan1.ejs");
    lock = true; 
}
else{ 
    lock=false;
    console.log(lock);
    res.render("login.ejs",{ close: lock});
}

    
});
app.get("/workout",(req,res)=>{
    res.render("workout.ejs");
});
app.get("/register",(req,res)=>{
    res.render("res1.ejs");
});


app.get("/alerts",(req,res)=>{
    res.render("event.ejs");
});

app.get("/wilks",(req,res)=>{
    res.render("Wilks.ejs");
});

app.get("/bmi",(req,res)=>{
    res.render("BMI.ejs");
});


app.post("/create",async(req,res)=>{
    try{
        var newname=req.body["firstname"];
        var newemail=req.body["email"];
        var newpassword=req.body["password"];
        var newlastname=req.body["lastname"];
        console.log(req.body);
        await db.query("INSERT INTO users(name,email,password)VALUES($1,$2,$3)",[
            newname,
            newemail,
            newpassword,
        ]);
        res.redirect("/");
    } catch(err){
        console.log(err);
    }
});

app.get("/abs",(req,res)=>{
    res.render("abs.ejs");
});



app.listen(port,()=>{
    console.log(`Server Running on port ${port}`);
})