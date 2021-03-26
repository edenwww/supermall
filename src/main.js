import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import FastClick from 'fastclick'

import toast from 'components/common/toast'

Vue.config.productionTip = false

//事件总线解决非父子组件的通信,定义$bus,否则$bus为undefine
Vue.prototype.$bus = new Vue()

//安装toast插件
Vue.use(toast)

//解决移动端300ms延迟
FastClick.attach(document.body)



new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
