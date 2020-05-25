// run script testing
const test = "NPM script test";
console.log(test); // testing

// NPM packages
const camelCase = require("camelcase");
console.log(camelCase("hello-world"));

// Serve
const express = require("express"); // load express package
const app = express();
const port = 3000; // browser adress

// Routing
app.use(express.static(__dirname + "/static"));
app.get("/", home);
app.get("/search", search);
app.get("/register", register)
app.set("view engine", "ejs"); // Templating
app.set("views", "view"); // Templating
app.use(notFound);
// query exercise
app.get("/mp3", function (req, res) {
  res.type("audio/mp3");
  res.sendFile(__dirname + "/static/mp3/gelukt.mp3");
  // res.header("Content-Type", "audio/mp3");
  // res.sendFile(__dirname + '/static/mp3/gelukt.mp3')
});
app.get("/search/:userId/profile/:profileId", function (req, res) {
  res.send(req.params);
});
app.listen(port, function () {
  return console.log("Server is working!"); // sends a confirmation that the server works.
});

// 404 error not working

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
  res.render("register.ejs", {
    data: data
  });
}

//search function
function search(req, res) {
  res.render("search.ejs", {
    data: data
  });
}

// data set
var data = [{
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
  },
  {
    profileId: "Suzanne",
    firstname: "Suus",
    lastname: "Suusje",
    age: 28,
    location: "Amsterdam",
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
    profileId: "Suzanne",
    firstname: "Suus",
    lastname: "Suusje",
    age: 28,
    location: "Amsterdam",
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
];