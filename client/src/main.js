import { createApp } from "vue";
import App from "./App.vue";
import { createRouter, createWebHashHistory } from "vue-router";

import Login from "./components/auth/Login.vue";
import Register from "./components/auth/Register.vue";
import { AddParty, EditParty, ListParty } from "./components/party/index";

import "./assets/main.css";

// 2. Define some routes
// Each route should map to a component.
const routes = [
  { path: "/party", component: ListParty },
  { path: "/login", component: Login, meta: { requiresAuth: false } },
  { path: "/register", component: Register },
  { path: "/party/add", component: AddParty },
  { path: "/party/:id", component: EditParty, name: "edit-party" },
];

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHashHistory(),
  routes, // short for `routes: routes`
});

const app = createApp(App);

app.use(router);

app.mount("#app");
