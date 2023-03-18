<template>
  <div class="relative px-6 lg:px-8">
    <div class="mx-auto max-w-2xl py-32 sm:py-42 lg:py-48">
      <div class="hidden sm:mb-8 sm:flex sm:justify-center">
        <div class="relative py-1 px-3 text-sm leading-6 text-gray-600">
          <h2
            class="text-4xl font-bold tracking-tight text-gray-900 sm:text-4xl"
          >
            These are your parties:
          </h2>
        </div>
      </div>

      <div
        class="mx-auto w-1/2 items-center text-center relative rounded-md py-4 gap-x-6 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20"
      >
        <party-list-item :parties="parties"></party-list-item>
      </div>
      <div class="mt-10 flex items-center justify-center gap-x-6">
        <a
          @click="goToCreateParty"
          class="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >Create Party</a
        >
      </div>
    </div>
    <div
      class="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
    ></div>
  </div>
</template>

<script>
import { getAllParties } from "../../../services/PartyService";
import PartyListItem from "../PartyList.vue";
export default {
  components: {
    PartyListItem,
  },
  data() {
    return {
      parties: [],
      dateOptions: {
        weekday: "long",
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
          console.log(response);
          this.parties = response.map((e) => {
            let partyDate = new Date(e.starting);
            return {
              id: e._id,
              starting: partyDate.toLocaleTimeString("it-IT", this.dateOptions),
              host: e.host[0].name,
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
