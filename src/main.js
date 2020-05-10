import Vue from 'vue'
import App from './App'
import Axios from 'axios'
import router from './router'
import vuetify from './plugins/vuetify';
import VueSimpleAlert from "vue-simple-alert";

Vue.prototype.$http = Axios;
Vue.prototype.$apiUrl = 'http://127.0.0.1:5002/Backend/index.php';

Vue.config.productionTip = false
Vue.use(VueSimpleAlert);

new Vue({
  render: h => h(App),
  router,
  vuetify,
  components: { App }
}).$mount('#app')