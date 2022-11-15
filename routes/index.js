var express = require('express');
var router = express.Router();
var app      = express();                               // create our app w/ express
var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
const path = require('path');


/* GET home page. */
router.get('/', function(req, res, next) {
  app.set('views', path.join(__dirname, 'views'));
  app.use(express.static(__dirname + 'public/sarc'));                                   // parse application/json
});

module.exports = router;
