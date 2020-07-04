var express = require('express');
var router = express.Router();
var Session = require('../models/session');
var Question = require('../models/question')

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

/* GET page for viewing session as presenter */
router.get('/presenter', function(req, res) {
  res.render('session/presenter', { user : req.user });
})

/* GET session information */
router.get('/data/:session_id', function(req, res) {
  Session.find({session_id: req.params.session_id}, function(err, data) {
    if (!err) {
      res.json(data[0]);
    } else {
      res.status(500).json([]);
    }
  })
})

/* GET questions from the audience for a session */
router.get('/questions/:session_id', function(req, res) {
  Question.find({session_id: req.params.session_id}, function(err, questions) {
    if (!err) {
      res.json(questions);
    } else {
      res.status(500).json([]);
    }
  })
})

/* POST update the status of a question to either answered or unanswered */
// curl --header "Content-Type: application/json" --data '{"is_answered": false, "question_id": "1234"}' http://localhost:8080/session/question
router.post('/question', function(req, res) {
  Question.find({question_id: req.body.question_id}, function(err, question) {
    Question.findByIdAndUpdate(
      question[0].id,
      {is_answered: req.body.is_answered},
      { new: true },
      function(err, update) {
        if (err == null) {
          res.json({Success: true});
        } else {
          res.json({Success: false});
        }
      }
    )
  })
})

/* TEST endpoint to create new question */
router.get('/create_question', function(req, res) {
  // Create new question
  var newQuestion = new Question({
    session_id: '1234',
    question_id: '1234',
    question_text: 'This is a new placeholder question text',
    upvotes: 0,
    is_answered: false,
    submitted_date_time: new Date()
  })
  newQuestion.save(function(err, data) {
    if (err) {res.json({success: false})} else {
      res.json({success: true});
    }
  })
})

module.exports = router;
