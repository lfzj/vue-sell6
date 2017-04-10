import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import App from './App';
import goods from './components/goods/goods';
import ratings from './components/ratings/ratings';
import seller from './components/seller/seller';
import './common/stylus/index.css';
Vue.config.debug = true;
Vue.use(VueRouter);
Vue.use(VueResource);
// 创建一个路由器实例
// 并且配置路由规则
const router = new VueRouter({
  routes: [
    {path: '/', component: goods},
    {path: '/goods', component: goods},
    {path: '/ratings', component: ratings},
    {path: '/seller', component: seller}
  ],
  // linkActiveClass: 'active',设置自定义属性样
  linkActiveClass: 'active'
});

new Vue({
  router: router,
  render: h => h(App)
}).$mount('#app');
//  添加goods样式
router.push('goods');
