import VueRouter from 'vue-router'
import Index from '../views/index'
import Puzzle from '../views/puzzle'
import Login from '../views/login'
import Register from '../views/register'
import Manager from '../views/manager'
import ManagerBlogs from '../views/managerBlogs'
import ManagerTags from '../views/managerTags'
import Editor from '../views/editor'
import ArticleDetail from '../views/articleDetail'
import Category from '../views/category'
import SmallApps from '../views/smallApps'

const routes = [{
    name: 'index',
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
  }, {
    path: '/manager',
    component: Manager,
    children: [
      { path: '/manager/blogs', component: ManagerBlogs},
      { path: '/manager/tags', component: ManagerTags}
    ]
  }, {
    path: '/editor',
    component: Editor
  }, {
    path: '/article/detail/:id',
    component: ArticleDetail
  }, {
    name: 'category',
    path: '/category/:name',
    component: Category
  }, {
    path: '/smallapps',
    component: SmallApps
  }
];

const router = new VueRouter({
  mode: 'history',
  routes
});

module.exports = router;
