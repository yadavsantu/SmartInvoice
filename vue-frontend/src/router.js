import { createRouter, createWebHistory } from "vue-router";
import SignUp from "./pages/SignUp.vue";
import LoginPage from "./pages/LoginPage.vue";
import Dashboard from "./pages/Dash_Board.vue";
import checkAuthStatus from "../utills/checkTokenStatus";

const routes = [
  { path: "/SignUp", component: SignUp, meta: { showNavBar: false } },
  { path: "/LoginPage", component: LoginPage, meta: { showNavBar: false } },
  { path: "/DashBoard", component: Dashboard, meta: { showNavBar: true } },
  { path: "/", component: Dashboard, meta: { showNavBar: true } },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});
router.beforeEach(async (to, from, next) => {
  console.log("Checking authentication...");
  const isAuthenticated = await checkAuthStatus();
  console.log("Authentication status:", isAuthenticated);

  if (to.path === "/DashBoard" && !isAuthenticated) {
    console.log("Redirecting to LoginPage...");
    return next("/LoginPage");
  }
  if (to.path === "/" && isAuthenticated) {
    console.log("Redirecting to Dashboard...");
    return next("/DashBoard");
  }

  if (to.path === "/LoginPage" && isAuthenticated) {
    console.log("Already authenticated, redirecting to Dashboard...");
    return next("/DashBoard");
  }

  next();
});

export default router;
