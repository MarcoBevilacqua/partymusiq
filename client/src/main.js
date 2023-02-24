import { createApp } from "vue";
import App from "./App.vue";
import { createRouter, createWebHashHistory } from "vue-router";

import ListPartyPage from "./components/party/ListPartyPage.vue";
import AddPartyPage from "./components/party/AddPartyPage.vue";

import "./assets/main.css";

// 2. Define some routes
// Each route should map to a component.
const routes = [
  { path: "/", component: ListPartyPage },
  { path: "/party/add", component: AddPartyPage },
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
