import { createApp } from "vue";
import App from "./App.vue";
import { createRouter, createWebHashHistory } from "vue-router";

import Guest from "./auth/Guest.vue";
import {
  AddParty,
  EditParty,
  ListParty,
  InviteToParty,
} from "./components/party/index";

import ListUser from "./components/user/pages/ListUserPage.vue";
import MusicSearch from "./components/shared/MusicSearch.vue";

import "./assets/main.css";

// 2. Define some routes
// Each route should map to a component.
const routes = [
  { path: "/", component: Guest },
  { path: "/party", component: ListParty },
  { path: "/login", component: Guest },
  { path: "/register", component: Guest },
  { path: "/party/add", component: AddParty },
  { path: "/party/:id", component: EditParty, name: "edit-party" },
  {
    path: "/party/:id/invite",
    component: InviteToParty,
    name: "invite-to-party",
  },
  {
    path: "/party/:id/music",
    component: MusicSearch,
    name: "add-music-to-party",
  },

  { path: "/user/profile", component: ListUser },
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
