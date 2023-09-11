<template>
  <div
    v-for="invitation in invitations"
    :key="invitation.id"
    class="w-1/3 rounded-md gap-x-6 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20"
  >
    <div class="w-full py-2 bg-slate-100">
      <a class="cursor-pointer px-2.5 py-1 text-md font-semibold">{{
        invitation.title
      }}</a>
    </div>
    <div class="px-2 py-3">
      <h4>{{ invitation.startingDate }}</h4>
      <h4 class="text-xl">
        <b>Starting {{ invitation.startingTime }}</b>
      </h4>
      <span class="text-xs">Host: {{ invitation.host }}</span>
    </div>
    <invitation-btn
      @accept-invitation="answer(invitation, true)"
      @decline-invitation="answer(invitation, false)"
      :status="invitation.status"
    ></invitation-btn>
  </div>
</template>

<script>
import { answerInvitation } from "../../services/InvitationService";
import InvitationBtn from "../shared/buttons/InvitationBtn.vue";
export default {
  components: {
    InvitationBtn,
  },
  props: {
    invitations: Array,
  },
  methods: {
    answer(invitation, accepted) {
      answerInvitation(invitation, accepted).then((res) => console.log(res));
    },
  },
};
</script>
