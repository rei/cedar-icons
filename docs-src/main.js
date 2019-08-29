import Vue from 'vue'
import App from './App.vue'
import router from './router'

import '@rei/cedar/dist/reset.css';
import '@rei/cedar/dist/cdr-fonts.css';
import '@rei/cedar/dist/cedar.css';
import '@rei/cedar/dist/utilities.css';

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')