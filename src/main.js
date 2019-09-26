import Vue from "vue";
import App from "./App.vue";
import router from "./router/index";
import store from "./store";

import "@/assets/scss/index.scss";

import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

import "@/icons/index";

import Avue from "@smallwei/avue";
import "@smallwei/avue/lib/index.css";

import http from "@/utils/httpRequest";

import VueCookie from "vue-cookies";
//import http from "axios";

Vue.use(Avue);
Vue.use(ElementUI);
Vue.use(VueCookie);
Vue.config.productionTip = false;
Vue.prototype.$http = http;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
