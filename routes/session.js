var express = require('express');
var router = express.Router();

/* GET page for starting session. */
router.get('/start', function(req, res) {
  res.render('start', { user : req.user });
});

/* POST request for starting session */
router.post('/start', (req, res, next) => {
  res.json({
    session_name: req.body.session_name,
    session_description: req.body.session_description,
    host_name: req.body.host_name,
    host_contact_info: req.body.host_contact_info
  });
});

module.exports = router;
