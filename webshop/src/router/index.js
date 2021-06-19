import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/components/Home.vue'
import Login from '@/components/login/Login.vue'
import User from '@/components/user/User.vue'
import Overview from '@/components/overview/Overview.vue'
import SignUp from '@/components/signUp/SignUp.vue'
import { Path } from '../constants/Path'

const routes = [
  {
    path: Path.HOME,
    name: 'Home',
    component: Home
  },
  {
    path: Path.LOGIN,
    name: 'Login',
    component: Login
  },
  {
    path: Path.OVERVIEW,
    name: 'Overview',
    component: Overview
  },
  {
    path: Path.USER,
    name: 'User',
    component: User
  },
  {
    path: Path.SIGNUP,
    name: 'SignUp',
    component: SignUp
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
