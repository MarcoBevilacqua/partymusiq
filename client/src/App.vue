<template>
  <base-layout>
    <Login v-if="!this.auth.user" @user-logged-in="this.setUserInfo"></Login>
    <Authenticated
      v-else
      @user-logged-refresh="this.setUserInfo"
      @user-logged-out="this.resetUserInfo"
      :user="this.auth.user"
    >
      <router-view></router-view>
    </Authenticated>
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
import Login from "./components/auth/Login.vue";

import { heartbeat } from "./services/AuthService";
export default {
  components: {
    Authenticated,
    BaseLayout,
    Login,
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
      console.log(userInfo);
      this.auth.user = { username: userInfo.username };
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
