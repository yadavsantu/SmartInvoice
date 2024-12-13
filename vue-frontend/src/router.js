import { createRouter, createWebHistory } from "vue-router";
import SignUp from './pages/SignUp.vue';
import LoginPage from './pages/LoginPage.vue';
import Dashboard from './pages/Dash_Board.vue';

const routes = [
  { path: '/SignUp', component: SignUp, meta: { showNavBar: false } },
  { path: '/LoginPage', component: LoginPage, meta: { showNavBar: false } },
  { path: '/DashBoard', component: Dashboard, meta: { showNavBar: true } },
  { path: '/', component: Dashboard, meta: { showNavBar: true } },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
