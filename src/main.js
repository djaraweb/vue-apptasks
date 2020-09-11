import Vue from "vue";
import App from "./App.vue";
import { store } from "./store/store";

window.eventBus = new Vue();

Vue.config.productionTip = false;
import 'bootstrap/dist/css/bootstrap.min.css';

new Vue({
  render: h => h(App),
  store
}).$mount("#app");
