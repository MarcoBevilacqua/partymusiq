<template>
  <page-layout title="Invite to party">
    <list-invite-party-page
      :usersForParty="this.usersForParty"
      @user-invited="this.setInvitedUser"
    ></list-invite-party-page>
  </page-layout>
</template>

<script>
import PageLayout from "../../../base/PageLayout.vue";
import ListInvitePartyPage from "../../invitation/pages/ListInviteUserPage.vue";
import {
  getAvailableForParty,
  getFriendsForParty,
} from "../../../services/InvitationService";
export default {
  components: {
    PageLayout,
    ListInvitePartyPage,
  },
  data() {
    return {
      usersForParty: [],
      friendsForParty: [],
    };
  },
  methods: {
    getUsersForParty() {
      getAvailableForParty(this.$route.params.id).then((res) => {
        this.usersForParty = res;
        console.log(this.usersForParty);
      });
    },
    getFriendsForParty() {
      getFriendsForParty(this.$route.params.id).then((res) => {
        this.friendsForParty = res;
        console.log(this.usersForParty);
      });
    },
    setInvitedUser(userId) {
      console.log("invited friend:", userId);
      this.usersForParty.filter((u) => u._id !== userId);
    },
  },
  mounted() {
    // this.getUsersForParty();
    // this.getFriendsForParty();
  },
};
</script>
