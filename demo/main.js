import Vue from 'vue'
import App from './App.vue'
import preview from '../lib/index.js';
import '../lib/main.css'

const opts = {
  mainClass : 'pswp--minimal--dark',
  barsSize : {
    top: 0,
    bottom: 0
  },
  captionEl : false,
  fullscreenEl : false,
  shareEl : false,
  bgOpacity : 0.85,
  tapToClose : true,
  tapToToggleControls : false,
}
Vue.use(preview, opts);

Vue.config.productionTip = false


new Vue({
  render: h => h(App)
}).$mount('#app')
