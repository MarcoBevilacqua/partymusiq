<template>
  <div
    v-if="this.users.length"
    v-for="user in users"
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
          @click="this.askFriend(user._id)"
          class="cursor-pointer text-indigo-300 font-ligther"
          >Friend</a
        >
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
import { inviteToParty } from "../../services/PartyService";

export default {
  props: {
    users: Array,
  },
  methods: {
    askFriend(userId) {
      console.log(userId);
    },
    inviteFriendToParty(userId, partyId) {
      inviteToParty(userId, partyId).then((res) => {
        console.log(res);
      });
    },
  },
};
</script>
