var formApp = new Vue({
  el: '#formApp',
  data: {
    sessionInformation: null,
    sessionName: null,
    sessionDescription: null,
    hostName: null,
    hostContact: null,
  },
  methods: {
    startSession: function() {
      axios
        .post('/session/start/' + this.sessionName, {}).then(response => this.sessionInformation = response.data)
    }
  }
})
