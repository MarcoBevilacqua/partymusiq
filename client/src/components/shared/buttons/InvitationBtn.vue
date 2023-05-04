<template>
  <div
    v-if="this.invitationStatus.isPending(this.status)"
    class="inline-flex w-full justify-around text-center border-t"
  >
    <div
      class="w-1/2 cursor-pointer hover:bg-slate-200 border-r border-indigo-200"
    >
      <a @click="accept()"> Accept</a>
    </div>
    <div class="w-1/2 cursor-pointer hover:bg-slate-200 border-gray-200">
      <a @click="decline()">Decline</a>
    </div>
  </div>
  <div v-else>
    <div
      class="w-full cursor-pointer hover:bg-slate-200 border-r border-indigo-200"
    >
      <a @click="acceptParty(invitation._id)">
        {{ this.invitationStatus.getStatusLabel(status) }}</a
      >
    </div>
  </div>
</template>

<script>
import InvitationStatus from "../../../utils/InvitationStatus";

export default {
  props: {
    status: Number,
  },
  data() {
    return {
      invitationStatus: new InvitationStatus(),
    };
  },
  methods: {
    accept() {
      this.$emit("accept-invitation");
    },
    decline() {
      this.$emit("decline-invitation");
    },
  },
};
</script>
