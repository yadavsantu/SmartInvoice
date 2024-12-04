import { createRouter, createWebHistory } from "vue-router";
import SignUp from './pages/SignUp.vue';
import LoginPage from './pages/LoginPage.vue';
const routes = [
{ path: '/SignUp', component: SignUp },
{ path: '/LoginPage', component: LoginPage },
];
const router = createRouter({
    history: createWebHistory(),
    routes,
})
export default router;