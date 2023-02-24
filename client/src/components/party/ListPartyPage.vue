<template>
  <h1>Parties</h1>
  <div v-for="party in parties" :key="party.id">
    <h3>{{ party.title }}</h3>
    <h4>{{ party.starting }}</h4>
    <span>Created by: {{ party.host }}</span>
  </div>
  <div>
    <a @click="goToCreateParty">Create Party</a>
  </div>
</template>

<script>
import { getAllParties } from "../../services/PartyService";
export default {
  data() {
    return {
      parties: [],
    };
  },
  methods: {
    getAllParties() {
      getAllParties().then((response) => {
        console.log(response);
        this.parties = response;
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
