import { createRouter, createWebHistory } from "vue-router";
import SignUp from './pages/SignUp.vue';
const routes = [
{ path: '/SignUp', component: SignUp },
];
const router = createRouter({
    history: createWebHistory(),
    routes,
})
export default router;