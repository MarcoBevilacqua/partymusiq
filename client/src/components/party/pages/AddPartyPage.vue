<template>
  <div class="relative px-6 lg:px-8">
    <div class="mx-auto max-w-2xl py-32 sm:py-42 lg:py-48">
      <div class="hidden sm:mb-8 sm:flex sm:justify-center">
        <div class="relative py-1 px-3 text-sm leading-6 text-gray-600">
          <h3
            class="text-2xl font-bold tracking-tight text-gray-900 sm:text-2xl"
          >
            Create new party:
          </h3>
        </div>
      </div>
      <div class="mx-auto max-w-xs">
        <form
          @submit.prevent="createParty"
          class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <div class="mb-4">
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="title"
            >
              Party title
            </label>
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="title"
              type="text"
              placeholder="Party Title"
              v-model="title"
            />
          </div>
          <div class="mb-6">
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="password"
            >
              Start at:
            </label>
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              type="datetime"
              name="starting"
              id="starting"
              v-model="starting"
              placeholder="21-12-2023 22:00"
            />
          </div>
          <div class="mb-6">
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="password"
            >
              Hosted by:
            </label>
            <select
              class="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              name="host"
              id="host"
              v-model="host"
            >
              <option value="-1">No host selected</option>
              <option v-for="user in users" :key="user._id" :value="user._id">
                {{ user.name }}
              </option>
            </select>
          </div>
          <div class="flex items-center justify-between">
            <button
              class="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { createParty } from "../../../services/PartyService";
import { getAllUsers } from "../../../services/UserService";
export default {
  data() {
    return {
      users: [],
      title: "",
      starting: null,
      host: null,
    };
  },
  methods: {
    getAllUsers() {
      getAllUsers().then((response) => {
        this.users = response;
      });
    },
    createParty() {
      let partyData = {
        title: this.title,
        starting: this.starting,
        host: this.host,
      };

      createParty(partyData).then((response) => {
        console.log(response);
        this.$router.back();
      });
    },
  },
  mounted() {
    this.getAllUsers();
  },
};
</script>
