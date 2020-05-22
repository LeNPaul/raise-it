var express = require('express');
var router = express.Router();
var Session = require('../models/session');

/* GET page for starting session. */
router.get('/start', function(req, res) {
  res.render('start', { user : req.user });
});

/* POST request for starting session */
// curl --header "Content-Type: application/json" --data '{"session_id":"asdf", "session_name": "asdfasfdsf"}' localhost:3000/session/start
router.post('/start', (req, res) => {

  var newSession = new Session({
    session_id: '<generate session id>',
    session_name: req.body.session_name,
    session_description: req.body.session_description,
    host_name: req.body.host_name,
    host_contact_info: req.body.host_contact_info,
    start_date_time: new Date()
  })

  newSession.save(function(err, data) {
    console.log(err);
    if (err) {res.json({success: false})} else {
      res.json({
        session_name: req.body.session_name,
        session_description: req.body.session_description,
        host_name: req.body.host_name,
        host_contact_info: req.body.host_contact_info
      });
    };
  })

});

module.exports = router;
