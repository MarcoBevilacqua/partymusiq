<template>
  <div
    v-for="party in parties"
    :key="party.id"
    class="w-1/3 text-sm leading-6 text-gray-600"
  >
    <div class="rounded-md mr-2 ring-1 ring-gray-900/10">
      <div class="w-full py-2 bg-slate-100">
        <a
          @click="goToEditParty(party.id)"
          class="cursor-pointer hover:underline px-2.5 py-1 text-md font-semibold"
          >{{ party.title }}</a
        >
      </div>
      <div class="px-2 py-3 leading-4">
        <h4>{{ party.startingDate }}</h4>
        <h4 class="text-xl">
          <b>Starting {{ party.startingTime }}</b>
        </h4>
      </div>
    </div>
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
