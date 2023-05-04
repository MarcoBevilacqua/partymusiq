<template>
  <base-layout>
    <guest v-if="!this.auth.user">
      <login
        v-if="this.$route.path === '/login'"
        @user-logged-in="this.setUserInfo"
      ></login>
      <register v-else @user-registered="this.setUserInfo"></register
    ></guest>
    <authenticated
      v-else
      @user-logged-refresh="this.setUserInfo"
      @user-logged-out="this.resetUserInfo"
      :user="this.auth.user"
    >
      <router-view></router-view>
    </authenticated>
  </base-layout>
</template>

<style scoped>
header {
  line-height: 1.5;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }
}
</style>

<script>
import Authenticated from "./auth/Authenticated.vue";
import BaseLayout from "./base/BaseLayout.vue";
import Guest from "./auth/Guest.vue";
import Login from "./components/auth/Login.vue";
import Register from "./components/auth/Register.vue";

import { heartbeat } from "./services/AuthService";
export default {
  components: {
    Authenticated,
    BaseLayout,
    Guest,
    Login,
    Register,
  },
  data() {
    return {
      auth: {
        user: null,
      },
    };
  },
  methods: {
    setUserInfo(userInfo) {
      this.auth.user = { username: userInfo.username };
      this.$router.push("/party");
    },
    resetUserInfo() {
      this.auth.user = null;
    },
  },
  mounted() {
    if (!this.auth.user) {
      heartbeat().then((res) => {
        if (!res.username) {
          //not logged in
          this.$router.push("/login");
        } else {
          this.setUserInfo(res);
        }
      });
    }
  },
};
</script>
