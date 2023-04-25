<template>
  <div v-if="this.invitations.length" class="mx-auto py-12 sm:py-12 lg:py-12">
    <div class="hidden sm:mb-8 sm:flex">
      <div class="relative py-1 text-sm leading-6 text-gray-600">
        <h2
          class="text-2xl font-light tracking-tight text-gray-900 sm:text-4xl"
        >
          Invitations:
        </h2>
      </div>
    </div>
    <invitation-list-item
      v-if="invitations.length"
      :invitations="invitations"
    ></invitation-list-item>
    <div class="border-purple-400"></div>
  </div>
</template>

<script>
import { getInvitations } from "../../services/InvitationService";
import InvitationListItem from "../invitations/InvitationListItem.vue";
export default {
  components: {
    InvitationListItem,
  },
  data() {
    return {
      invitations: [],
      dateOptions: {
        weekday: "short",
        year: "numeric",
        month: "long",
        day: "numeric",
      },
    };
  },
  methods: {
    getInvitations() {
      getInvitations()
        .then((response) => {
          console.log(response);
          this.invitations = response.map((e) => {
            let partyDate = new Date(e.starting);
            return {
              id: e._id,
              startingTime: partyDate.toLocaleTimeString("it-IT"),
              startingDate: partyDate.toLocaleString("it-IT", this.dateOptions),
              host: e.host.name,
              title: e.title,
            };
          });
        })
        .catch((err) => {
          console.warn("AN ERROR OCCURRED: " + err);
        });
    },
  },
  mounted() {
    this.getInvitations();
  },
};
</script>
