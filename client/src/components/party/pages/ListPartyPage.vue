<template>
  <div class="relative px-6 lg:px-8">
    <div class="mx-auto py-12 sm:py-12 lg:py-12">
      <div class="hidden sm:mb-8 sm:flex">
        <div class="relative py-1 text-sm leading-6 text-gray-600">
          <h2
            class="text-2xl font-light tracking-tight text-gray-900 sm:text-4xl"
          >
            Your parties:
          </h2>
        </div>
      </div>
      <party-list-item
        v-if="parties.length"
        :parties="parties"
      ></party-list-item>

      <div v-else class="mx-auto w-1/2 items-center text-center">
        <span>Whoop, seems like you have no party</span>
      </div>
      <div class="mt-10 flex items-center justify-center gap-x-6">
        <a
          @click="goToCreateParty"
          class="cursor-pointer rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >Create Party</a
        >
      </div>
    </div>
    <div v-if="invitations.length" class="mx-auto py-12 sm:py-12 lg:py-12">
      <div class="hidden sm:mb-8 sm:flex">
        <div class="relative py-1 text-sm leading-6 text-gray-600">
          <h2
            class="text-2xl font-light tracking-tight text-gray-900 sm:text-4xl"
          >
            Invitations:
          </h2>
        </div>
      </div>
      <div class="border-purple-400"></div>
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
          console.log(response);
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
