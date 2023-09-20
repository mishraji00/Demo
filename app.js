var express = require("express");
var bodyparser = require("body-parser");
var cors = require("cors");
var app = express();
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:false}));

//enable the cors
app.use(cors());

const route =require('./routes/UserRegRoute');
app.use('/api', route);
app.use((req, res, next) => {
  // Log the request details

  // Continue to the next middleware or route handler
  next();
});

app.listen(8080);
console.log("Server Listening the port no. 8080");
