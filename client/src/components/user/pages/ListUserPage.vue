<template>
  <page-layout title="Users">
    <user-list-item :users="this.users"></user-list-item>
  </page-layout>
</template>

<script>
import PageLayout from "../../../base/PageLayout.vue";
import UserListItem from "../UserList.vue";
import { getNonFriends } from "../../../services/UserService";
export default {
  components: {
    PageLayout,
    UserListItem,
  },
  data() {
    return {
      users: [],
    };
  },
  methods: {
    getNonFriendUsers() {
      getNonFriends().then((res) => {
        this.users = res;
      });
    },
  },
  mounted() {
    this.getNonFriendUsers();
  },
};
</script>
