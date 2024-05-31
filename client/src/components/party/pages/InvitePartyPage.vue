<template>
  <page-layout title="Invite your friends to party">
    <list-invite-party-page
      :usersForParty="this.usersForParty.invitations"
      :title="'INVITATIONS'"
      @user-invited="this.setInvitedUser"
    ></list-invite-party-page>
    <list-invite-party-page
      :usersForParty="this.usersForParty.uninvitedFriends"
      :title="'UNINVITED FRIENDS'"
      @user-invited="this.setInvitedUser"
    ></list-invite-party-page>
    <list-invite-party-page
      :title="'USERS'"
      :users-for-party="this.usersForParty.users"
      @user-invited="this.setInvitedUser"
    ></list-invite-party-page>
  </page-layout>
</template>

<script>
import PageLayout from "../../../base/PageLayout.vue";
import ListInvitePartyPage from "../../invitation/pages/ListInviteUserPage.vue";
import { getInvitations } from "../../../services/InvitationService";
export default {
  components: {
    PageLayout,
    ListInvitePartyPage,
  },
  data() {
    return {
      usersForParty: {},
    };
  },
  methods: {
    getUsersForParty() {
      getInvitations(this.$route.params.id).then((res) => {
        console.log("get available for party: ", res);
        this.usersForParty = res;
        console.log(this.usersForParty);
      });
    },
    setInvitedUser(userId) {
      console.log("invited friend:", userId);
      this.usersForParty.filter((u) => u._id !== userId);
    },
  },
  mounted() {
    this.getUsersForParty();
  },
};
</script>
