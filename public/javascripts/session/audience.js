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
    submitQuestion: function() {
      if (this.questionText != null) {
        axios
          .post('/session/question/new', {session_id: this.$route.params.id, question_text: this.questionText})
        this.questionText = null;
      }
    },
    updateVotes: function(question_id, vote_count) {
      axios
        .post('/session/question/vote', {question_id: question_id, vote_count: vote_count}).then(response => console.log(response.data));
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
