const express = require("express"); // load express package
const bodyParser = require("body-parser"); // load body parser for http requests
const slug = require("slug");
const app = express();
const port = 3000; // browser adress


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
  },
  {
    profileId: "Nathan",
    firstname: "Nathan",
    lastname: "Student",
    age: 21,
    location: "Amsterdam",
    interests: ["Beer", "Drinking games", "Comics", "Netflix", "Food", "DnD"],
    description: "Hi! I like to meet someone that wants to join me for a ride at the mountainbike track in Alkmaar. I also am interested in playing board games, DnD and I like to read comics or watch movies. I also really like food, so want to grab a bite?",
  }

];

// Routing
app.use(express.static(__dirname + "/static"));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.post("/", add);
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

  console.log(data.length)
  data.push({
    profileId: id,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    age: req.body.age,
    location: req.body.location,
    interests: interestsArray,
    description: req.body.description
  });
  console.log(data.length);
  console.log(data);

  // res.redirect("/" + id);
  res.render("index.ejs");
}