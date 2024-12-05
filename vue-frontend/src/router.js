import { createRouter, createWebHistory } from "vue-router";
import SignUp from './pages/SignUp.vue';
import LoginPage from './pages/LoginPage.vue';
import Dashboard  from  './pages/Dash_Board.vue';
const routes = [
{ path: '/SignUp', component: SignUp },
{ path: '/LoginPage', component: LoginPage},
{path: '/DashBoard',component:Dashboard},
];
const router = createRouter({
    history: createWebHistory(),
    routes,
})
export default router;