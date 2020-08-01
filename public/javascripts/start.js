var formApp = new Vue({
  el: '#formApp',
  data: {
    sessionName: null,
    sessionDescription: null,
    userName: null,
    hostName: null,
    hostContact: null,
  },
  methods: {
    startSession: function() {
      axios
        .post('/session/start', {session_name: this.sessionName, session_description: this.sessionDescription, user_name: this.userName, host_name: this.hostName, host_contact_info: this.hostContact}).then(response => {
          window.location.href = '/session/presenter#/id/' + response.data.session_id;
        });
    },
    joinSession: function() {
      window.location.href = '/session/audience#/id/' + this.sessionId
    }
  }
})
