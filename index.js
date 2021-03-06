/* eslint-disable */

const express = require("express"); // load express package
const bodyParser = require("body-parser"); // load body parser for http requests
const slug = require("slug");
const app = express();
const multer = require("multer");
const path = require("path");
const mongo = require("mongodb");
const port = 3000; // browser adress
const storage = multer.diskStorage({
  // This adds a name and extension to the uploaded file.
  destination: function (req, file, cb) {
    cb(null, "static/uploads/"); // location where the uploaded file needs to be stored
  },
  filename: function (req, file, cb) {
    console.log(file.mimetype);
    console.log(file);
    cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname))
    // resource: https://stackoverflow.com/questions/31592726/how-to-store-a-file-with-file-extension-with-multer
    // resource: Found out about this by reading the code of Nadine van den Bosch.
  },
});
const upload = multer({
  storage: storage,
});
const session = require("express-session");

require("dotenv").config();
// database connection
var db = null;
var url = "mongodb+srv://" + process.env.DB_HOST;

mongo.MongoClient.connect(
  url, {
    useUnifiedTopology: true,
  },
  function (err, client) {
    if (err) {
      throw err;
    }

    db = client.db(process.env.DB_NAME);
    console.log("Connected correctly to MongoDB server");
    // console.log(process.env.DB_NAME);
  }
);

// Routing
app.use(express.static(__dirname + "/static"));
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: process.env.SESSION_SECRET
}));
app.post("/", upload.single("profilePicture"), add);
app.get("/", home); // Routing
app.get("/search", search); // Routing
app.post('/search', search);
app.get("/register", register); // Routing
app.get("/login", login); // Routing
app.post("/login", loginUser);
app.get("/logout", logout);
app.get("/:id", profile);
app.post("/:id", update);
app.set("view engine", "ejs"); // Templating
app.set("views", "view"); // Templating
app.use(notFound);
app.listen(port, function () {
  return console.log("Server is working!"); // sends a confirmation that the server works.
});

// 404 error -> still need to make a page for this.
function notFound(req, res) {
  res.status(404).send("404 page");
}

// profile page
function profile(req, res, next) {
  let id = req.params.id;
  db.collection("friendshipData").findOne({
      profileId: id,
    },
    done
  );

  function done(err, data) {
    if (err) {
      next(err);
    } else {
      res.render("profile.ejs", {
        data: data,
        user: req.session.user
      });
    }
  }
}
// Resource
// read the code examples from backend + the code from Bjorn Borgie + I watched the recorded lesson from tech 5

//Home page
async function home(req, res, next) {
  const allData = await db.collection("friendshipData").find().toArray();
  const dataBG = await db.collection("friendshipData").find({
    interests: "Board games" // Looks in all data for people that have Board games in their interests
  }).toArray();
  const dataComics = await db.collection("friendshipData").find({
    interests: "Comics",
    interests: "comics" // Looks in all data for people that have comics in their interests
  }).toArray();
  const dataMTB = await db.collection("friendshipData").find({
    interests: 'Mountainbike' // Looks in all data for people that have comics in their interests
  }).toArray();
  const dataGames = await db.collection("friendshipData").find({
    interests: 'Games' // Looks in all data for people that have comics in their interests
  }).toArray();

  if (req.session.user) { // Is there a user logged in? If so then:
    const myData = await db.collection("friendshipData").findOne({
      profileId: req.session.user.user.profileId
    });

    if (!allData) {
      res.send("Error occured while retrieving data");
    }

    done(allData, myData, dataBG, dataComics, dataMTB, dataGames);

    function done(allData, myData, dataBG, dataComics, dataMTB, dataGames) {
      // console.log("this is all data", allData);
      // console.log("this is my data", myData);
      res.render("index.ejs", {
        user: myData,
        data: allData,
        dataBG: dataBG,
        dataComics: dataComics,
        dataMTB: dataMTB,
        dataGames: dataGames

      });
    }

    // console.log(allData);
  } else if (!req.session.user) { // If there is no user logged in:
    // db.collection("friendshipData").find().toArray(done);
    done(allData, dataBG, dataComics);

    function done(allData, dataBG, dataComics) {
      res.render("index.ejs", {
        user: req.session.user,
        data: allData,
        dataBG: dataBG,
        dataComics: dataComics

      });
    }

  }
}
// resource: I got help from Janno kapritsias through an individual screenshare sessions 
// when I got stuck using async / await.

// other resources learning async / await:
// https://www.youtube.com/watch?v=QO4NXhWo_NM. // promises part 1 what is a promise
// https://www.youtube.com/watch?v=AwyoVjVXnLk // promises part 2 how to make a promise
// https://www.youtube.com/watch?v=XO77Fib9tSI // Async await part 1
// https://www.youtube.com/watch?v=chavThlNz3s // Async await part 2

// Resource selecting one object from database for sessions
// https://docs.mongodb.com/manual/reference/method/db.collection.findOne/#db.collection.findOne


//Register function
function register(req, res) {
  db.collection("friendshipData").find().toArray(done);

  if (req.session.user) {
    res.redirect("/logout");
  }

  function done(err, data) {
    if (err) {
      next(err);
    } else {
      res.render("register.ejs", {
        data: data,
        user: req.session.user
      });
    }
  }
}

// search page
async function search(req, res) {
  {
    try {
      const allData = await db.collection("friendshipData").find().toArray(); // all data in database
      const user = await db.collection("friendshipData").findOne({ // find session user
        _id: req.session.sessionID,
      });
      const search = await db.collection("friendshipData").find({ // find data that equals filtered activity
        interests: req.body.activity
      }).toArray();
      const activity = req.body.activity; // filtered activity


      if (user) { // checks if there is a user logged in
        const done = async (allData, user, search, activity) => {
          const equalActivities = await db.collection("friendshipData").find({ // finds other users with the same interests 
            interests: user.interests[0] // How to create loop here?
          }).toArray();
          req.session.search = search; // makes a session on the filtered activity
          res.render('search.ejs', {
            data: allData,
            user: user,
            dataFilter: req.session.search,
            activity: activity,
            dataEqual: equalActivities
          });
        };
        done(allData, user, search, activity);
      } else { // if there is no user logged in
        const done = async (allData, search, activity) => {
          req.session.search = search;
          res.render('search.ejs', {
            user: user,
            data: allData,
            dataFilter: req.session.search,
            activity: activity
          });
        };
        done(allData, search, activity);
      }
    } catch (err) {
      res.send('something went wrong in the gathering the data'); // Error handling
    }
  };
}
// register data to database
function add(req, res, next) {
  let id = slug(req.body.profileId).toLowerCase();
  let interestsArray = req.body.interests.split(", ");


  db.collection("friendshipData").insertOne({
      profileId: id,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      age: req.body.age,
      location: req.body.location,
      interests: interestsArray,
      description: req.body.description,
      profilePicture: req.file ? req.file.filename : null, // zet alles na de ? uit, dan krijg je een data object. Daar kan je meer mee.
    },
    done
  );


  function done(err, data) {
    if (err) {
      next(err);
    } else {
      res.redirect("/" + id);
    }
  }
}

//update interests function works by replacing
function update(req, res, next) {
  let id = req.params.id;
  let addNewInterests = req.body.addInterests.split(", ");

  db.collection('friendshipData').updateOne({
    profileId: id
  }, {
    $push: {
      interests: {
        $each: addNewInterests,
        $position: -1
      }
    },
    $currentDate: {
      lastModified: true
    }
  }, done);

  function done(err, data) {
    if (err) {
      next(err);
    } else {
      res.redirect("/" + id);
    }
  }

}

// Resource for db update code
// https://docs.mongodb.com/manual/tutorial/update-documents/
// Resource on how to update an array by pushing. Instead of inserting another array.
// https://kb.objectrocket.com/mongo-db/how-to-add-elements-into-an-array-in-mongodb-1195


// login page
function login(req, res, next) {
  db.collection("friendshipData").find().toArray(done);

  if (req.session.user) {
    res.redirect("/logout");
  }

  function done(err, data) {
    if (err) {
      next(err);
    } else {
      res.render("login.ejs", {
        data: data,
      });
    }
  }
}


// logs in a user and gives it a session
function loginUser(req, res, next) {
  let userId = req.body.userList

  db.collection("friendshipData").findOne({
      profileId: userId,
    },
    done
  );


  function done(err, data) {
    if (err) {
      next(err);
    } else {
      req.session.user = {
        user: data
      }
      res.redirect("/");
    }
  }
}

function logout(req, res, next) {
  req.session.destroy(function (err) {
    if (err) {
      next(err)
    } else {
      res.redirect("/login")
    }
  })
}