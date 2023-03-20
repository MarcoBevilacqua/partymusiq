<template>
  <base-layout>
    <Guest @user-logged-in="this.setUserInfo"></Guest>
    <Authenticated :user="this.auth.user">
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
import Guest from "./auth/Guest.vue";
export default {
  components: {
    Authenticated,
    BaseLayout,
    Guest,
  },
  data() {
    return {
      auth: {
        user: { username: null },
      },
    };
  },
  methods: {
    setUserInfo(userInfo) {
      this.auth.user.username = userInfo.username;
    },
  },
};
</script>
