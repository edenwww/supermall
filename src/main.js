import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

//事件总线解决非父子组件得到通信,定义$bus，否则$bus为undefine
Vue.prototype.$bus = new Vue()

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
