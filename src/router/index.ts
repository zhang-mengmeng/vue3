import { createRouter,createWebHistory,RouteRecordRaw } from "vue-router";

const routes : Array<RouteRecordRaw> = [
    {
        path:'/',
        component:() => import('../reg.vue')
    },
    {
        path:'/login',
        component:() => import('../Login.vue')
    },
    {
        path:'/user',
        component:() => import('../user.vue')
    }
]

const router = createRouter({
    history:createWebHistory(),
    routes
})

export default router
