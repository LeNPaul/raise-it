var express = require('express');
var router = express.Router();
var Session = require('../models/session');
var Question = require('../models/question')

// https://stackoverflow.com/questions/105034/how-to-create-guid-uuid
function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

/* GET page for starting session. */
router.get('/start', function(req, res) {
  res.render('start', { user : req.user });
});

/* GET page for joining session */
router.get('/join', function(req, res) {
  res.render('join', { user : req.user });
});

/* GET page for viewing session as presenter */
router.get('/presenter', function(req, res) {
  res.render('session/presenter', { user : req.user });
})

/* GET page for viewing session as audience */
router.get('/audience', function(req, res) {
  res.render('session/audience', { user : req.user });
})

/* POST request for starting session */
// curl --header "Content-Type: application/json" --data '{"session_id":"asdf", "session_name": "asdfasfdsf"}' localhost:3000/session/start
router.post('/start', (req, res) => {
  var session_id = uuidv4();
  var newSession = new Session({
    session_id: session_id,
    session_name: req.body.session_name,
    session_description: req.body.session_description,
    host_name: req.body.host_name,
    host_contact_info: req.body.host_contact_info,
    start_date_time: new Date()
  })
  newSession.save(function(err, data) {
    if (err) {res.json({success: false})} else {
      res.json({
        session_id: session_id,
        session_name: req.body.session_name,
        session_description: req.body.session_description,
        host_name: req.body.host_name,
        host_contact_info: req.body.host_contact_info
      });
    };
  })
});

/* POST request for ending session */
// curl --header "Content-Type: application/json" --data '{"session_id":"6d4e8ac0-b7bc-4887-9352-cfd5b0d92b25"}' localhost:8080/session/end
router.post('/end', (req, res) => {
  Session.find({session_id: req.body.session_id}, function(err, session) {
    if(session[0]) {
      Session.findByIdAndUpdate(
        session[0]._id,
        {end_date_time: new Date()},
        { new: true },
        function(err, update) {
          if (err == null) {
            res.json({Success: true});
          } else {
            console.log(err, update);
            res.json({Success: false});
          }
        }
      )
    } else{
      res.json({Success: false});
    }
  })
});

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
      questions.sort(function(a, b) {
        return b.upvotes - a.upvotes;
      });
      res.json(questions);
    } else {
      res.status(500).json([]);
    }
  })
})

/* POST update the status of a question to either answered or unanswered */
// curl --header "Content-Type: application/json" --data '{"is_answered": false, "question_id": "1234"}' http://localhost:8080/session/question
router.post('/question/status', function(req, res) {
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

/* POST update the vote count of a question */
// curl --header "Content-Type: application/json" --data '{"question_id": "52a3d05e-f3de-4b6f-8f7e-31442b13f0d3", "vote_count": 1}' http://localhost:8080/session/question/vote
router.post('/question/vote', function(req, res) {
  Question.find({question_id: req.body.question_id}, function(err, question) {
    // Add previous vote count with the new vote
    var voteCount = question[0].upvotes + req.body.vote_count
    Question.findByIdAndUpdate(
      question[0].id,
      {upvotes: voteCount},
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

/* POST create a new question */
// curl --header "Content-Type: application/json" --data '{"session_id": "b3b3d326-fb14-46ed-9d0e-2a0a094f5bb0", "question_text": "Hello, its me again, I guess I can not use apostrophes"}' http://localhost:8080/session/question/new
router.post('/question/new', function(req, res) {
  // Create new question
  var newQuestion = new Question({
    session_id: req.body.session_id,
    question_id: uuidv4(),
    question_text: req.body.question_text,
    upvotes: 0,
    is_answered: false,
    submitted_date_time: new Date()
  })
  newQuestion.save(function(err, data) {
    if (err) {
      res.json({success: false})
    } else {
      res.json({success: true});
    }
  })
})

module.exports = router;
