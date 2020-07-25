var formApp = new Vue({
  el: '#formApp',
  data: {
    sessionName: null,
    sessionDescription: null,
    hostName: null,
    hostContact: null,
  },
  methods: {
    startSession: function() {
      axios
        .post('/session/start', {session_name: this.sessionName, session_description: this.sessionDescription, host_name: this.hostName, host_contact_info: this.hostContact}).then(response => {
          window.location.href = "/session/presenter#/id/" + response.data.session_id;
        });
    }
  }
})
