/* eslint-disable */

const express = require("express"); // load express package
const bodyParser = require("body-parser"); // load body parser for http requests
const slug = require("slug");
const app = express();
const multer = require("multer");
const mongo = require("mongodb");
const port = 3000; // browser adress
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "static/uploads/");
  },
  filename: function (req, file, cb) {
    console.log(file.mimetype);
    if (file.mimetype == "image/png") {
      cb(null, Date.now() + ".png"); //Appending .jpg
    } else if (file.mimetype == "image.jpg") {
      cb(null, Date.now() + ".jpg"); //Appending .jpg
    }

  }
});
const upload = multer({
  storage: storage
});

require('dotenv').config()
// poging 4
// database connection
var db = null;
var url = "mongodb+srv://" + process.env.DB_HOST + ":" + process.env.DB_PORT;

mongo.MongoClient.connect(url, function (err, client) {
  if (err) {
    throw err;
  }

  db = client.db(process.env.DB_NAME);
  console.log("Connected correctly to MongoDB server");
  console.log(process.env.DB_NAME);
});


// data set
let data = [{
    profileId: "Nathan",
    firstname: "Nathan",
    lastname: "Neelis",
    age: 29,
    location: "Alkmaar",
    interests: [
      "Mountainbike",
      "Board games",
      "Comics",
      "Movies",
      "Food",
      "DnD",
    ],
    description: "Hi! I like to meet someone that wants to join me for a ride at the mountainbike track in Alkmaar. I also am interested in playing board games, DnD and I like to read comics or watch movies. I also really like food, so want to grab a bite?",
    profilePicture: "nathan.JPG"
  },
  {
    profileId: "Nathan",
    firstname: "Nathan",
    lastname: "Student",
    age: 21,
    location: "Amsterdam",
    interests: ["Beer", "Drinking games", "Comics", "Netflix", "Food", "DnD"],
    description: "Hi! I like to meet someone that wants to join me for a ride at the mountainbike track in Alkmaar. I also am interested in playing board games, DnD and I like to read comics or watch movies. I also really like food, so want to grab a bite?",
    profilePicture: "nathan.JPG"
  }

];

// Routing
app.use(express.static(__dirname + "/static"));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.post("/", upload.single("profilePicture"), add);
app.get("/", home); // Routing
app.get("/search", search); // Routing
app.get("/register", register); // Routing
app.set("view engine", "ejs"); // Templating
app.set("views", "view"); // Templating
app.use(notFound);
app.listen(port, function () {
  return console.log("Server is working!"); // sends a confirmation that the server works.
});



function notFound(req, res) {
  res.status(404).send("404 page");
}

//Home function
function home(req, res) {
  res.render("index.ejs", {
    data: data
  });
}

//Register function
function register(req, res) {
  res.render("register.ejs");
}
//search function
function search(req, res) {
  res.render("search.ejs", {
    data: data
  });
}

function add(req, res) {
  let id = slug(req.body.profileId).toLowerCase();
  let interestsArray = req.body.interests.split(", ");

  console.log(data.length);
  data.push({
    profileId: id,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    age: req.body.age,
    location: req.body.location,
    interests: interestsArray,
    description: req.body.description,
    profilePicture: req.file ? req.file.filename : null // zet alles na de ? uit, dan krijg je een data object. Daar kan je meer mee.
  });
  console.log(data.length);
  console.log(data);

  // res.redirect("/" + id);
  res.render("index.ejs");
}