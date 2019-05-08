// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import iView from 'iview'
import i18n from '@/locale'
import config from '@/config'
import importDirective from '@/directive'
import installPlugin from '@/plugin'
import VueDND from 'awe-dnd'
import 'iview/dist/styles/iview.css'
import './index.less'
import './assets/css/common.less'
import './assets/css/module.css'
import '@/assets/icons/iconfont.css'
import utils from "./libs/prototype";
import globalMixins from './libs/mixins'
// 实际打包时应该不引入mock
/* eslint-disable */
// if (process.env.NODE_ENV !== 'production') require('@/mock')

Vue.use(iView, {
  i18n: (key, value) => i18n.t(key, value)
})
Vue.use(VueDND)
/**
 * 全局 util 主要用于弹框、entity reset、manager-view
 */
Object.keys(utils).forEach(key => {
  Vue.prototype[`$${key}`] = utils[key];
});
/**
 * 全局mixin
 */
Vue.mixin(globalMixins);
/**
 * @description 注册admin内置插件
 */
installPlugin(Vue)
/**
 * @description 生产环境关掉提示
 */
Vue.config.productionTip = false
/**
 * @description 全局注册应用配置
 */
Vue.prototype.$config = config
/**
 * 注册指令
 */
importDirective(Vue)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  i18n,
  store,
  render: h => h(App),
  mounted() {

  }
})
