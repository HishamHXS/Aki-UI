import { createRouter, createWebHistory } from 'vue-router'
import LandingPage from './views/LandingPage.vue'
import SignupPage from './views/SignupPage.vue'
import LoginPage from './views/LoginPage.vue'
import HomePage from './views/HomePage.vue'

const routes = [
  { path: '/', component: LandingPage },
  { path: '/signup', component: SignupPage },
  { path: '/login', component: LoginPage },
  { path: '/home', component: HomePage }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
