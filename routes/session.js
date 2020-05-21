var express = require('express');
var router = express.Router();

/* GET page for starting session. */
router.get('/start', function(req, res, next) {
  res.render('start', { user : req.user });
});

router.post('/start/:session_id', (req, res) => {
  res.json({hello: 'world!', session_id: req.params.session_id});
});

module.exports = router;
