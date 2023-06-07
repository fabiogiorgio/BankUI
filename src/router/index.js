import { createWebHistory, createRouter } from "vue-router";

const routes = [
  {
    path: "/login",
    component: () => import('../components/LoginView.vue'),
  },
  {
    path: "/home",
    component: () => import('../components/WelcomeView.vue'),
  },
  {
    path: "/disclaimers",
    component: () => import('../components/Disclaimers.vue')
  },
  {
    path: "/termsandconditions",
    component: () => import('../components/TermsAndConditions.vue')
  },
  {
    path: "/users",
    component: () => import('../components/Users.vue')
  },
  {
    path: "/admin",
    component: () => import('../components/Admin.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: routes,
  linkActiveClass: 'active'
})



export default router;