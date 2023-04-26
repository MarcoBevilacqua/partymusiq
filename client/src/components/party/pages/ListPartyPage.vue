<template>
  <page-layout title="Your Parties">
    <party-list-item v-if="parties.length" :parties="parties"></party-list-item>
    <div v-else class="mx-auto w-1/2 items-center text-center">
      <div>
        <span>Whoop, seems like you have no party</span>
      </div>
      <div>
        <a
          @click="goToCreateParty"
          class="cursor-pointer rounded-md text-indigo-600 text-sm font-semibold"
          >Create Party</a
        >
      </div>
    </div>
    <invitation-list></invitation-list>
  </page-layout>
</template>

<script>
import PageLayout from "../../../base/PageLayout.vue";
import { getAllParties } from "../../../services/PartyService";
import PartyListItem from "../PartyList.vue";
import InvitationList from "../../invitations/InvitationList.vue";
export default {
  components: {
    PageLayout,
    PartyListItem,
    InvitationList,
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
    goToCreateParty() {
      console.log("create party");
      this.$router.push("/party/add");
    },
  },
  mounted() {
    this.getAllParties();
  },
};
</script>
