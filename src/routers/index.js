import VueRouter from 'vue-router'
import Index from '../views/index'
import Puzzle from '../views/puzzle'
import Login from '../views/login'
import Register from '../views/register'

const routes = [{
    path: '/',
    component: Index
  }, {
    path: '/puzzle',
    component: Puzzle
  }, {
    path: '/login',
    component: Login
  }, {
    path: '/register',
    component: Register
  }
];

const router = new VueRouter({
  mode: 'history',
  routes
});

module.exports = router;
