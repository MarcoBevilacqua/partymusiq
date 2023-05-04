<template>
  <invitation-list-item :invitations="invitations"></invitation-list-item>
</template>

<script>
import { getInvitations } from "../../services/InvitationService";
import InvitationListItem from "../invitation/InvitationListItem.vue";
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
          this.invitations = response.map((e) => {
            let partyDate = new Date(e.party.starting);
            return {
              id: e._id,
              startingTime: partyDate.toLocaleTimeString("it-IT"),
              startingDate: partyDate.toLocaleString("it-IT", this.dateOptions),
              host: e.party.host.username,
              title: e.party.title,
              status: e.status,
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
