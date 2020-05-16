// run script testing
const test = 'NPM script test';
console.log(test); // testing 

// NPM packages
const camelCase = require('camelcase');
console.log(camelCase('hello-world'));


// Serve
const express = require('express'); // load express package
const app = express();
const port = 3000 // browser adress

// app.get("/about", function(req, res) { res.sendFile(__dirname + "/static/about.html"); }); // This is a specific about page.
// app.get('/', function(req, res){ res.end('hello world') } ) // This sends a message

app.use(express.static(__dirname + "/static"))
// app.use(notFound) // - WERKT NOG NIET HELEMAAL - ALS HET AANSTAAT KOMT ALLES OP 404 BEHALVE HOME


app.listen(port, function () {
  return console.log('Server is working!') // sends a confirmation that the server works.
})
// app.use(function (req, res, next) {
//   res.status(404).send('404 page');
// }); // 404 message

app.get('/', home)
app.get('/search', search)



//Home function
  // function home(req, res) {
  //     res.sendFile(__dirname + "/static");
  // }

//search function
// function search(req, res){
//     res.sendFile(__dirname + "/static/search.html");
// }

// 404 function - WERKT NOG NIET HELEMAAL - ALS HET AANSTAAT KOMT ALLES OP 404 BEHALVE HOME
// function notFound(req, res) {
//   res.status(404).send('404 page');
// }



// query exercise
app.get('/mp3', function (req, res) {
  res.type("audio/mp3")
  res.sendFile(__dirname + '/static/mp3/gelukt.mp3')
  // res.header("Content-Type", "audio/mp3");
  // res.sendFile(__dirname + '/static/mp3/gelukt.mp3')
})

// Resource: !!
// stackoverflow, & Hulha, r. (2011, 23 maart). Why isn’t express-js setting the Content-Type header? 
// Geraadpleegd op 14 mei 2020, van https://stackoverflow.com/questions/5400761/why-isnt-express-js-setting-the-content-type-header

app.get('/search/:userId/profile/:profileId', function (req, res) {
  res.send(req.params)
})

// Resource: !!
// Express. (2017?). Express routing. Geraadpleegd op 14 mei 2020, van https://expressjs.com/en/guide/routing.html




// Templating
app.set('view engine', 'ejs')
app.set('views', 'view')


// data set
var data = [
  {
    profileId: 'Nathan',
    firstname: 'Nathan',
    lastname: 'Neelis',
    age: 29,
    location: 'Alkmaar',
    interests: ['Mountainbike', 'Board games', 'Comics', 'Movies', 'Food', 'DnD'],
    description: 'Hi! I like to meet someone that wants to join me for a ride at the mountainbike track in Alkmaar. I also am interested in playing board games, DnD and I like to read comics or watch movies. I also really like food, so want to grab a bite?'
  },
  {
    profileId: 'Nathan',
    firstname: 'Nathan',
    lastname: 'Student',
    age: 21,
    location: 'Amsterdam',
    interests: ['Beer', 'Drinking games', 'Comics', 'Netflix', 'Food', 'DnD'],
    description: 'Hi! I like to meet someone that wants to join me for a ride at the mountainbike track in Alkmaar. I also am interested in playing board games, DnD and I like to read comics or watch movies. I also really like food, so want to grab a bite?'
  }
]

//Home function
  function home(req, res) {
      res.render('index.ejs', {data: data});
  }

//search function
  function search(req, res){
    res.render('search.ejs', {data: data});
}
