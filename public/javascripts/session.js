var sessionApp = new Vue({
  el: '#sessionApp',
  data: {
    info: null,
    questions: null
  },
  created () {
    this.getQuestions();
    this.timer = setInterval(this.getQuestions, 3000)
  },
  methods: {
    getInfo: function(session_id) {
      axios
        .get('/session/data/' + session_id).then(response => this.info = response.data);
    },
    getQuestions: function(session_id) {
      console.log(session_id);
      axios
        .get('/session/questions/' + session_id).then(response =>  this.questions = response.data);
    }
  }
})

sessionApp.getQuestions('1234')
sessionApp.getInfo('5dee9cbc-8fb1-44fd-b965-8cfdecdd1390')
