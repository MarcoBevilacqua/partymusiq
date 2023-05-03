<template>
  <invitation-list-item :invitations="invitations"></invitation-list-item>
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
              host: e.host.username,
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
