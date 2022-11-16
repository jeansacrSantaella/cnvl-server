var express = require('express');
var router = express.Router();
var app      = express();                               // create our app w/ express
const path = require('path');


/* GET home page. */
router.get('/', function(req, res, next) {
  app.set('views', path.join(__dirname, 'views'));
  app.use(express.static(__dirname + 'public'));                                   // parse application/json
});

module.exports = router;
