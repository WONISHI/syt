//vue3框架提供的方法createApp方法，可以用来创建应用实列方法
import { createApp } from "vue";
import "@/style/reset.scss";
import router from "@/router";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
//@ts-ignore
import HostpitalTop from "@/components/hostpiat_top/index.vue";
//@ts-ignore
import HostpitalBottom from "@/components/hostpiat_bottom/index.vue";
//@ts-ignore
import login from "@/components/login/index.vue"
//@ts-ignore
import zhCn from "element-plus/dist/locale/zh-cn.mjs";
import pinia from './store/index.ts';
// @ts-ignore
import svgIcon from "@/components/svgIcon/index.vue";

//引入根组件
//@ts-ignore
import App from "@/App.vue";
//利用createApp方法创建应用实列，且将应用实列挂载到挂载点。
const app = createApp(App);
app.component("HostpitalTop", HostpitalTop);
app.component("HostpitalBottom", HostpitalBottom);
app.component("svg-icon", svgIcon);
app.component("Login", login);
app.use(router);
app.use(pinia)
app.use(ElementPlus, {
  locale: zhCn,
});
import './permission.ts'
app.mount("#app");
