//官方必須元件
import Vue from 'vue';
import VueRouter from 'vue-router';
//自定
//import Home from '@/components/HelloWorld';
import Login from '@/components/pages/login';
import Dashboard from '@/components/dashboard';
import Products from '@/components/pages/products';
import Orders from '@/components/pages/orders';
import Coupon from '@/components/pages/coupon';
import ShoppingDemo from '@/components/pages/shoppingdemo';

Vue.use(VueRouter);

export default new VueRouter({
    routes: [
        {
            //避免用戶輸入不存在的頁面
            path: '*',
            redirect: 'login',
        },
        // {
        //     path: '/',
        //     component: Home,
        //     //加入這段代表這個頁面需要被驗證才能使用
        //     meta:
        //     {
        //         requiresAuth: true
        //     },
        // },
        {
            path: '/login',
            component: Login,
        },
        {
            path: '/admin',
            component: Dashboard,   
            children: [
                // 根的路徑通常會加上 "/"   子路徑則不會加上 "/"
                {
                    path: 'products',
                    component: Products,
                    meta: { requiresAuth: true },
                },
                {
                    path: 'orders',
                    component: Orders,
                    meta: { requiresAuth: true },
                },
                {
                    path: 'coupon',
                    component: Coupon,
                    meta: { requiresAuth: true },
                },
                {
                    path: 'shopping-demo',
                    component: ShoppingDemo,
                    meta: { requiresAuth: true },
                },
            ],
        },
    ],
});