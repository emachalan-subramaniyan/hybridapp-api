var express = require('express');
var router = express.Router();
const db = require("../../../../db/connection");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Hybrid-Api' });
});

module.exports = router;
