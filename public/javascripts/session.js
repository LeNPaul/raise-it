// sessionApp.getQuestions('1234')
// sessionApp.getInfo('5dee9cbc-8fb1-44fd-b965-8cfdecdd1390')

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
    getQuestions: function() {
      axios
        .get('/session/questions/' + this.$route.params.id).then(response =>  this.questions = response.data);
    }
  },
  router
}).$mount('#sessionApp')
