<template>
  <page-layout title="Invite to party">
    <list-invite-party-page
      :usersForParty="this.usersForParty"
    ></list-invite-party-page>
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
      usersForParty: [],
    };
  },
  methods: {
    getUsersForParty() {
      getAvailableForParty(this.$route.params.id).then((res) => {
        this.usersForParty = res;
      });
    },
  },
  mounted() {
    this.getUsersForParty();
  },
};
</script>
