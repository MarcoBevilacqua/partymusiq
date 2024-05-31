<template>
  <h2>{{ title }}</h2>
  <div class="w-full inline-flex">
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
          <h1 class="text-xl font-light">{{ user.username }}</h1>
          <small>{{ user.username }}</small>
        </div>
        <div class="inline-flex gap-2">
          <a
            v-if="this.$route.params.id"
            @click="this.inviteFriendToParty(user._id, this.$route.params.id)"
            class="cursor-pointer text-indigo-300 font-ligther"
            >Invite</a
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { createInvitation } from "../../../services/InvitationService";

export default {
  emits: ["guest-invited"],
  props: {
    usersForParty: Array,
    title: String,
  },
  methods: {
    askFriend(userId) {
      console.log("asking friendship to: ", userId);
    },
    inviteFriendToParty(userId, partyId) {
      createInvitation(userId, partyId).then((res) => {
        console.log(res);
        if (res.upsertedCount === 1) {
          this.$emit("guest-invited", userId);
          return;
        }

        console.error(res);
      });
    },
  },
};
</script>
