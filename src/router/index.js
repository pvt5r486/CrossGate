//官方必須元件
import Vue from 'vue';
import VueRouter from 'vue-router';
//自定
import Login from '@/components/pages/login';
import Dashboard from '@/components/dashboard';
import Products from '@/components/pages/products';
import Orders from '@/components/pages/orders';
import Coupon from '@/components/pages/coupon';
import ShoppingDemo from '@/components/pages/shoppingdemo';
import OrderCheckout from '@/components/pages/orderCheckout';
import Index from '@/components/pages/index';

Vue.use(VueRouter);

export default new VueRouter({
    routes: [
        {
            //避免用戶輸入不存在的頁面
            path: '*',
            redirect: 'index',
        },
        {
            path: '/login',
            component: Login,
        },
        {
            path: '/admin',
            component: Dashboard,
            meta: { requiresAuth: true },   
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
                {
                    path: 'orderCheckout/:orderID',
                    component: OrderCheckout,
                    meta: { requiresAuth: true },
                },
            ],
        },
        {
            name:"首頁",
            path: '/index',
            component: Index,
        },
        {
            name:"主機介紹",
            path: '/gamehost',
            component: Index,
        },
        {
            name:"CrossGate",
            path: '/shopping',
            component: Index,
        },
    ],
});