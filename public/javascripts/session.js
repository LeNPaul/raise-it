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

// Sample code for regularly calling a function
// https://stackoverflow.com/questions/36572540/vue-js-auto-reload-refresh-data-with-timer

// 0. If using a module system (e.g. via vue-cli), import Vue and VueRouter
// and then call `Vue.use(VueRouter)`.

// 1. Define route components.
// These can be imported from other files
const Foo = { template: '<div>fooasdfasdf</div>' }
const Bar = { template: '<div>bar</div>' }

// 2. Define some routes
// Each route should map to a component. The "component" can
// either be an actual component constructor created via
// `Vue.extend()`, or just a component options object.
// We'll talk about nested routes later.
const routes = [
  { path: '/foo', component: Foo },
  { path: '/bar', component: Bar }
]

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = new VueRouter({
  routes // short for `routes: routes`
})

// 4. Create and mount the root instance.
// Make sure to inject the router with the router option to make the
// whole app router-aware.
const app = new Vue({
  router
}).$mount('#testApp')

// Now the app has started!
