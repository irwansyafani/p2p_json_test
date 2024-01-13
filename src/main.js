import "./assets/main.scss";
import { createApp } from "vue";
import App from "./App.vue";
import { createRouter, createWebHistory } from "vue-router";

import HomeVue from "./views/Home.vue";
import DetailsVue from "./views/Details.vue";

const app = createApp(App);
const routes = [
  {
    name: "Home",
    path: "/",
    component: HomeVue,
  },
  {
    name: "Detail",
    path: "/loans/:id",
    component: DetailsVue,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

app.use(router).mount("#app");
