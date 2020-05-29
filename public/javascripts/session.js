var sessionApp = new Vue({
  el: '#sessionApp',
  data: {
    questions: [
      { message: 'Foo' },
      { message: 'Bar' }
    ]
  },
  methods: {
    getQuestions: function(session_id) {
      axios
        .get('/session/questions/' + session_id).then(response => console.log(response.data))
    }
  }
})
