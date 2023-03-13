<template>
  <div v-for="party in parties" :key="party.id">
    <a
      @click="goToEditParty(party.id)"
      class="cursor-pointer rounded-md bg-slate-100 px-2.5 py-1 text-md font-semibold"
      >{{ party.title }}</a
    >
    <h4>{{ party.starting }}</h4>
    <span>Created by: </span><span class="font-bold">{{ party.host }}</span>
  </div>
</template>

<script>
export default {
  props: {
    parties: Array,
  },
  methods: {
    goToEditParty(partyId) {
      console.log("edit party " + partyId);
      this.$router.push("/party/" + partyId);
    },
  },
};
</script>
