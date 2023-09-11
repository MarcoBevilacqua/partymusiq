<template>
  <page-layout title="Your Parties">
    <party-list-item v-if="parties.length" :parties="parties"></party-list-item>
    <div v-else class="mx-auto w-1/2 items-center text-center">
      <div>
        <span>Whoop, seems like you have no party</span>
      </div>
    </div>
  </page-layout>
  <page-layout title="Party from your friends">
    <invitation-list-item :invitations="invitations"></invitation-list-item>
  </page-layout>
</template>

<script>
import PageLayout from "../../../base/PageLayout.vue";
import { getAllParties } from "../../../services/PartyService";
import { getInvitations } from "../../../services/InvitationService";
import PartyListItem from "../PartyList.vue";
import InvitationListItem from "../../invitation/InvitationList.vue";
export default {
  components: {
    PageLayout,
    PartyListItem,
    InvitationListItem,
  },
  data() {
    return {
      parties: [],
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
    getAllParties() {
      getAllParties()
        .then((response) => {
          this.parties = response.map((e) => {
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
    this.getAllParties();
    this.getInvitations();
  },
};
</script>
