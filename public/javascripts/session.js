var sessionApp = new Vue({
  el: '#sessionApp',
  data: {
    questions: null
  },
  methods: {
    getQuestions: function(session_id) {
      axios
        .get('/session/questions/' + session_id).then(response =>  this.questions = response.data);
    }
  }
})

sessionApp.getQuestions('1234')
