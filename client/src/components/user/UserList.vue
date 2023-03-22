<template>
  <div
    v-if="this.users.length"
    v-for="user in users"
    :key="user._id"
    class="w-1/5 text-center relative rounded-md py-4 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20"
  >
    <h4>{{ user.name }}</h4>
    <h4>{{ user.username }}</h4>
    <div>
      <a
        @click="this.askFriend(user._id)"
        class="cursor-pointer text-indigo-300 font-ligther"
        >Friend</a
      >
    </div>
    <div>
      <a
        v-if="this.$route.params.id"
        @click="this.inviteFriendToParty(user._id, this.$route.params.id)"
        class="cursor-pointer text-indigo-300 font-ligther"
        >Invite To party</a
      >
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
