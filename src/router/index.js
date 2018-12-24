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
import Index from '@/components/index';
import About from '@/components/pages/about';
import Gamehost from '@/components/gameHost';
import GamehostMenu from '@/components/pages/gameHostMenu';
import Switch from '@/components/pages/switch';
import Ps4 from '@/components/pages/ps4';
import N3ds from '@/components/pages/n3ds';
import Crossgate from '@/components/pages/crossgate';
import productDetail from '@/components/pages/productDetail';
import myshoppingCart from '@/components/pages/shopCart';
import orderCheck from '@/components/pages/orderCheck';
Vue.use(VueRouter);

export default new VueRouter({
    //切換路由時回到畫面頂部
    scrollBehavior (to, from, savedPosition) {
        if (savedPosition) {
          return savedPosition
        } else {
          return { x: 0, y: 0 }
        }
    },
    routes: [
        {
            path: '*',
            redirect: '/index'
        },
        {
            path: '/',
            redirect: '/index',
            component: Index,
            children: [
                {
                    name:"關於我們",
                    path: 'index',
                    component: About,
                },
                {
                    path: 'gamehost',
                    component: Gamehost,
                    children: [
                        {
                            name:"主機介紹",
                            path: '/',
                            component: GamehostMenu,
                        },
                        {
                            name:"主機介紹-Switch",
                            path: 'switch',
                            component: Switch,
                        },
                        {
                            name:"主機介紹-PS4",
                            path: 'ps4',
                            component: Ps4,
                        },
                        {
                            name:"主機介紹-N3DS",
                            path: 'n3ds',
                            component: N3ds,
                        },
                    ],
                },
                {
                    name:"CrossGate商城",
                    path: 'shopping',
                    component: Crossgate,
                },
                {
                    name:"產品介紹",
                    path: 'productDetail/:prodId',
                    component: productDetail,
                },
                {
                    name:"我的購物車",
                    path: 'myshoppingCart',
                    component: myshoppingCart,
                },
                {
                    name:"確認訂單",
                    path: 'orderCheckout/:orderID',
                    component: orderCheck,
                },
            ],
        },
        //登入頁
        {
            path: '/login',
            component: Login,
        },
        //後台
        {
            path: '/admin',
            redirect: '/login',
            //搭配 redirect 代表如果輸入 path 則導引到redirect路徑
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
                {
                    path: 'orderCheckout/:orderID',
                    component: OrderCheckout,
                    meta: { requiresAuth: true },
                },
            ],
        },
    ],
});