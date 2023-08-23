import { createApp } from "vue";

import Antd from "ant-design-vue";
import "ant-design-vue/dist/reset.css";

// svg图标
// import 'virtual:svg-icons-register';
import SvgIcon from "@/components/SvgIcon/index.vue";
import antdIcons from "@/components/SvgIcon/svgicon";

import App from "./App.vue";
import store from "./store";
import router from "./router";

// eslint-disable-next-line import/no-unresolved
import "uno.css"; // unocss
import "./utils/axiosInterceptor"; // axios全局拦截器

import "./assets/style/index.less";

const app = createApp(App);

app.use(store);
app.use(router);
app.use(Antd);

app.use(antdIcons);
app.component("SvgIcon", SvgIcon);

app.mount("#app");
