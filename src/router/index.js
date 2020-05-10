import Vue from 'vue'
import Router from 'vue-router'

const DashboardLayout = () => import(/*webpackChunkName:"dashboard"*/'../components/dashboardLayout.vue')
const UserDashboardLayout = () => import(/*webpackChunkName:"dashboard"*/'../components/userDashboardLayout.vue')
const landingPage = () => import(/*webpackChunkName:"dashboard"*/'../components/landingPage.vue')
const loginLayout = () => import(/*webpackChunkName:"dashboard"*/'../components/loginLayout.vue')
const loginAdmin = () => import(/*webpackChunkName:"dashboard"*/'../components/loginAdmin.vue')
const logoutLayout = () => import(/*webpackChunkName:"dashboard"*/'../components/logoutLayout.vue')
const registerLayout = () => import(/*webpackChunkName:"dashboard"*/'../components/registerLayout.vue')

function loadView(view){
    return()=>import(/*webpackChunkName:"view-[request]"*/`../components/dashboardContents/${view}.vue`)
}

function userLoadView(view){
    return()=>import(/*webpackChunkName:"view-[request]"*/`../components/userDashboardContents/${view}.vue`)
}

const routes = [
    {
        name: 'Login',
        path: '/',
        component: loginLayout
    },
    {
        name: 'Login',
        path: '/login',
        component: loginLayout
    },
    {
        name: 'LoginAdmin',
        path: '/loginAdmin',
        component: loginAdmin
    },
    {
        name: 'Logout',
        path: '/logout',
        component: logoutLayout
    },
    {
        name: 'Register',
        path: '/register',
        component: registerLayout
    },
    {
        path:'/user',
        component: UserDashboardLayout,
        children: [
            {
                name: 'Home',
                path: '/home',
                component: userLoadView('home')
            },
            {
                name: 'About',
                path: '/about',
                component: userLoadView('about')
            },
            {
                name: 'Order',
                path: '/order',
                component: userLoadView('orderPage')
            },
            {
                name: 'ListOrder',
                path: '/listOrder',
                component: userLoadView('ListOrder')
            },
            {
                name: 'profile',
                path: '/profile',
                component: userLoadView('profile')
            },
        ],
    },
    {
        path:'/admin',
        component: DashboardLayout,
        children: [
            {
                name: 'HomeAdmin',
                path: '/homeadmin',
                component: loadView('homeAdmin')
            },
            {
                name: 'listOrderPage',
                path: '/listOrderPage',
                component: loadView('listOrderPage')
            },
            {
                name: 'products',
                path: '/products',
                component: loadView('manageProducts')
            },
            {
                name: 'report',
                path: '/report',
                component: loadView('salesReport')
            },
        ],
    },
]
Vue.use(Router)

const router = new Router({mode: 'history', routes: routes})

export default router