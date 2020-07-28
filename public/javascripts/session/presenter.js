// Example routes
const Foo = { template: '<div>User {{ $route.params.id }}</div>' }

const routes = [
  { path: '/id/:id', component: Foo }
]

const router = new VueRouter({
  routes
})

const sessionApp = new Vue({
  data: {
    info: null,
    questions: null,
    questionText: null,
    isSession: true
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
    updateQuestion: function(question_id, is_answered) {
      if (is_answered) {
        axios
          .post('/session/question/status', {question_id: question_id, is_answered: false}).then(response => console.log(response.data));
      } else {
        axios
          .post('/session/question/status', {question_id: question_id, is_answered: true}).then(response => console.log(response.data));
      }
    },
    endSession: function() {
      axios
        .post('/session/end', {session_id: this.$route.params.id}).then(response => console.log(response.data));
    },
    loadSession: function() {
      this.loadQuestions();
      axios
        .get('/session/data/' + this.$route.params.id).then(response => {
          this.info = response.data
          if(response.data.end_date_time) {
            this.isSession = false;
          }
        });
    }
  },
  router
}).$mount('#sessionApp')
