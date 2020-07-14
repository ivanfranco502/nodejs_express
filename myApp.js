var express = require("express");
var app = express();

let bodyParser = require("body-parser");

// --> 7)  Mount the Logger middleware here
app.use((rq, rs, next) => {
  console.log(`${rq.method} ${rq.path} - ${rq.ip}`);
  next();
});
// --> 11)  Mount the body-parser middleware  here
app.use(bodyParser.urlencoded({extended:false}));
/** 1) Meet the node console. */
//console.log("Hello World");

/** 2) A first working Express Server */
//app.get("/", (rq, rs) => rs.send("Hello Express"));

/** 3) Serve an HTML file */
app.get("/", (rq, rs) => rs.sendFile(__dirname + "/views/index.html"));
/** 4) Serve static assets  */
app.use(express.static(__dirname+"/public"));

/** 5) serve JSON on a specific route */
//app.get("/json", (rq, rs) => rs.json({"message": "Hello json"}));

/** 6) Use the .env file to configure the app */

app.get("/json", (rq, rs) => {
  let message = "Hello json";

  return process.env.MESSAGE_STYLE === "uppercase" 
    ? rs.json({"message": message.toUpperCase()})
    : rs.json({message})});
/** 7) Root-level Middleware - A logger */
//  place it before all the routes !

/** 8) Chaining middleware. A Time server */
app.get('/now', (rq, rs, next) => {
  rq.time = new Date().toString();
  next();
}, (rq, rs) => rs.json({"time": rq.time}));

/** 9)  Get input from client - Route parameters */
app.get('/:word/echo', (rq, rs) => {
  let echo = rq.params.word;
  return rs.json({echo});
});
/** 10) Get input from client - Query parameters */
// /name?first=<firstname>&last=<lastname>
app.route('/name').get((rq, rs) => {
  const name = `${rq.query.first} ${rq.query.last}`;
  return rs.json({name});
})
/** 11) Get ready for POST Requests - the `body-parser` */
// place it before all the routes !
.post((rq, rs) => {
  const name = `${rq.body.first} ${rq.body.last}`;
  return rs.json({name});
});
/** 12) Get data form POST  */

// This would be part of the basic setup of an Express app
// but to allow FCC to run tests, the server is already active
/** app.listen(process.env.PORT || 3000 ); */

//---------- DO NOT EDIT BELOW THIS LINE --------------------

module.exports = app;
