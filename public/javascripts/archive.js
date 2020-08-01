const routes = [
  { path: '/id/:id' }
]

const router = new VueRouter({
  routes
})

const archiveApp = new Vue({
  data: {
    info: null,
    questions: null,
    questionText: null
  },
  created () {
    this.loadSession();
    this.timer = setInterval(this.loadSession, 3000);
  },
  methods: {
    loadQuestions: function() {
      axios
        .get('/session/questions/' + this.$route.params.id).then(response =>  this.questions = response.data);
    },
    loadSession: function() {
      this.loadQuestions();
      axios
        .get('/session/data/' + this.$route.params.id).then(response => {
          this.info = response.data;
        });
    }
  },
  router
}).$mount('#archiveApp')
