<template>
  <div v-if="!this.usersForParty">  
    <span>No invitation yet</span>
  </div>
  <div
    v-if="this.usersForParty && this.usersForParty.length"
    v-for="user in this.usersForParty"
    :key="user._id"
    class="w-1/4 p-2"
  >
    <div class="rounded-md p-2 text-gray-600 border border-gray-200">
      <div class="lh-1">
        <h1 class="text-xl font-light">{{ user.name }}</h1>
        <small>{{ user.username }}</small>
      </div>
      <div class="inline-flex gap-2">
        <a
          v-if="this.$route.params.id"
          @click="this.inviteFriendToParty(user._id, this.$route.params.id)"
          class="cursor-pointer text-indigo-300 font-ligther"
          >Invite To party</a
        >
      </div>
    </div>    
</div>
</template>

<script>
import { createInvitation } from "../../../services/InvitationService";

export default {
  props: {
    usersForParty: Array,
  },
  methods: {
    askFriend(userId) {
      console.log(userId);
    },
    inviteFriendToParty(userId, partyId) {
      createInvitation(userId, partyId).then((res) => {
        console.log(res);
      });
    },
  },
};
</script>
