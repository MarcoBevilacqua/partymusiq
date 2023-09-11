<template>
  <form @submit.prevent="createParty">
    <div class="mb-4">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="title">
        Title
      </label>
      <input
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="title"
        type="text"
        placeholder="Party Title"
        v-model="title"
      />
    </div>
    <div class="grid grid-cols-3 gap-2 mb-6">
      <div class="col-span-2">
        <label
          class="block text-gray-700 text-sm font-bold mb-2"
          for="password"
        >
          Start at:
        </label>
        <date-picker
          v-model="startingRaw"
          :model-value="startingRaw"
          @update:model-value="formatDate"
        />
      </div>
      <div class="col-span-1">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="mood">
          Mood:
        </label>
        <select
          class="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
          name="mood"
          id="mood"
          v-model="mood"
        >
          <option value="-1">No mood selected</option>
          <option
            v-for="mood in availableMoods"
            :key="mood.id"
            :value="mood.id"
          >
            {{ mood.title }}
          </option>
        </select>
      </div>
    </div>
    <div class="">
      <button
        class="w-full bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        type="submit"
      >
        Save
      </button>
    </div>
  </form>
</template>

<script>
import { createParty } from "../../../services/PartyService";

import DatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

export default {
  components: { DatePicker },
  data() {
    return {
      starting: null,
      title: "",
      startingRaw: null,
      mood: null,
      //TODO: make these programmatic
      availableMoods: [
        { id: 1, title: "happy" },
        { id: 2, title: "savage" },
        { id: 3, title: "calm" },
        { id: 4, title: "chill" },
      ],
    };
  },
  methods: {
    formatDate(date) {
      this.starting =
        [
          this.padTo2Digits(date.getDate()),
          this.padTo2Digits(date.getMonth() + 1),
          date.getFullYear(),
        ].join("-") +
        " " +
        [
          this.padTo2Digits(date.getHours()),
          this.padTo2Digits(date.getMinutes()),
        ].join(":");
    },

    padTo2Digits(num) {
      return num.toString().padStart(2, "0");
    },
    createParty() {
      let partyData = {
        title: this.title,
        starting: this.starting,
        mood: this.mood,
      };

      createParty(partyData).then((response) => {
        console.log(response);
        this.$router.back();
      });
    },
  },
};
</script>
