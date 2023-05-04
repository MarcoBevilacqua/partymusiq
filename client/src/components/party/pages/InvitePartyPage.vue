<template>
  <page-layout title="Invite to party">
    <list-invite-party-page :users="this.users"></list-invite-party-page>
  </page-layout>
</template>

<script>
import ListInvitePartyPage from "../../invitation/pages/ListInviteUserPage.vue";
import { getUsersToInvite } from "../../../services/UserService";
export default {
  components: {
    ListInvitePartyPage,
  },
  data() {
    return {
      users: [],
    };
  },
  methods: {
    getAllUsers() {
      getUsersToInvite(this.$route.params.id).then((res) => {
        this.users = res;
      });
    },
  },
  mounted() {
    this.getAllUsers();
  },
};
</script>
