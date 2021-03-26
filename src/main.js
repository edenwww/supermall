import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import toast from 'components/common/toast'

Vue.config.productionTip = false

//事件总线解决非父子组件的通信,定义$bus,否则$bus为undefine
Vue.prototype.$bus = new Vue()

Vue.use(toast)

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
