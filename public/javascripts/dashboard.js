const routes = [
  { path: '/user/:username' }
]

const router = new VueRouter({
  routes
})

const dashboardApp = new Vue({
  data: {
    sessions: null
  },
  created () {
    this.getSessions();
  },
  methods: {
    getSessions: function() {
      axios
        .get('/session/sessions/' + this.$route.params.username).then(response => this.sessions = response.data);
    }
  },
  router
}).$mount('#dashboardApp')
