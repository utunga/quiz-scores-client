import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "@/store/index";
import "./registerServiceWorker";
import Buefy from 'buefy'
import VueSlider from 'vue-slider-component'
import 'vue-slider-component/theme/default.css'
import 'easy-circular-progress/src/_index.scss'

Vue.component('VueSlider', VueSlider)
Vue.config.productionTip = false;

Vue.use(Buefy, {
  defaultIconPack: 'fas'
})

//console.log(store);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
