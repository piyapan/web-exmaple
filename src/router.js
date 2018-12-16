import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/views/Home.vue';
import Authentication from '@/components/Authentication.vue';
import VueCookie from 'vue-cookie';
Vue.use(VueCookie);
Vue.use(Router);
const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/login',
            name: 'authentication',
            component: Authentication
        }
    ]
});

router.beforeEach((to, from, next) => {
    // redirect to login page if not logged in and trying to access a restricted page
    const publicPages = ['/login', '/register'];
    const authRequired = !publicPages.includes(to.path);
    const cokkie = document.cookie;
    if (authRequired && !localStorage.getItem('_user') && !cokkie.includes('csrftoken=')) {
        return next('/login');
    }
    next();
});
export default router;
