<template>
  <page-layout title="Invite to party">
    <list-invite-party-page :users="this.users"></list-invite-party-page>
  </page-layout>
</template>

<script>
import PageLayout from "../../../base/PageLayout.vue";
import ListInvitePartyPage from "../../invitation/pages/ListInviteUserPage.vue";
import { getAvailableForParty } from "../../../services/InvitationService";
export default {
  components: {
    PageLayout,
    ListInvitePartyPage,
  },
  data() {
    return {
      users: [],
    };
  },
  methods: {
    getAllUsers() {
      getAvailableForParty(this.$route.params.id).then((res) => {
        this.users = res.friends;
      });
    },
  },
  mounted() {
    this.getAllUsers();
  },
};
</script>
