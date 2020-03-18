import Vue from 'vue';
import VueRouter from 'vue-router';
import MainPage from "../components/share/page/MainPage";
import LoginForm from '../components/my/page/LoginFormPage';
import SignUpPage from '../components/my/page/SignUpPage' ;
import MyPage from '../components/my/page/MyPageIndex';
import GoodsDetailPage from '../components/goods/page/GoodsDetailPage';
import MyCart from "../components/my/page/MyCartPage";

Vue.use(VueRouter);

const routes = [
    {path: '/', component: MainPage},
    {path: '/login', component: LoginForm},
    {path: '/signup', component: SignUpPage},
    {path: '/faq', component: MyPage, props:{selectedComponent : 'FaqCategoryList'}},
    {path: '/inquiryForm', component: MyPage, props:{selectedComponent:'InquiryForm', userInfo: true}},
    {path: '/inquiryAnswer', component: MyPage, props:{selectedComponent:'InquiryAnswer', userInfo: true}},
    {path: '/myreview', component: MyPage, props:{selectedComponent: 'MyReview',userInfo: true}},
    {path: '/goodsDetail/:goodsCode', component: GoodsDetailPage},
    {path: '/cart', component: MyCart},
    {path: '/deliveryanduserinfomanagement' ,component: MyPage, props:{selectedComponent: 'DeliveryAndUserInfoManagementTaps'}},
    {path: '/wishlist', component: MyPage, props:{selectedComponent: 'Wishlist'}}
]

export default new VueRouter({
    routes,
    scrollBehavior () {
        return { x: 0, y: 0 }
    }
})
