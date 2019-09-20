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

Vue.use(Avue);
Vue.use(ElementUI);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
