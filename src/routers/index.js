import VueRouter from 'vue-router';
import Index from '../views/index';
import Puzzle from '../views/puzzle';
import Login from '../views/login';

const routes = [{
    path: '/',
    component: Index
  }, {
    path: '/puzzle',
    component: Puzzle
  }, {
    path: '/login',
    component: Login
  }
];

const router = new VueRouter({
  mode: 'history',
  routes
})

module.exports = router;
