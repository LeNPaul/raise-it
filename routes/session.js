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
  // https://stackoverflow.com/questions/105034/how-to-create-guid-uuid
  function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
  var newSession = new Session({
    session_id: uuidv4(),
    session_name: req.body.session_name,
    session_description: req.body.session_description,
    host_name: req.body.host_name,
    host_contact_info: req.body.host_contact_info,
    start_date_time: new Date()
  })
  newSession.save(function(err, data) {
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
