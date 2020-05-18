var express = require('express');
var router = express.Router();

/* GET page for starting session. */
router.get('/start', function(req, res, next) {
  res.render('start', { user : req.user });
});

module.exports = router;
