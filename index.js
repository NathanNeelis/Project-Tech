const test = 'NPM script test';
console.log(test); // testing 

const express = require('express'); // load express package
const app = express();
const port = 3000 // browser adress

// app.get("/", function(req, res) { res.sendFile(__dirname + "/static/about.html"); }); // This is a specific about page.
// app.get('/', function(req, res){ res.end('hello world') } ) // This sends a message

app.use(express.static(__dirname + "/static"))
app.use(function(req, res, next) { res.status(404).send('404 page'); }); // 404 message

app.listen(port, function () {
    return console.log('Server is working!') // sends a confirmation that the server works.
  })

