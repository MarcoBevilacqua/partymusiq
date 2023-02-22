<template>
  <form @submit.prevent="createParty">
    <label for="title">Title</label>
    <input type="text" name="title" id="title" v-model="title" />
    <label for="starting">Date</label>
    <input type="datetime" name="starting" id="starting" v-model="starting" />
    <label for="host">Host</label>
    <select name="host" id="host" v-model="host">
      <option value="-1">No host selected</option>
      <option v-for="user in users" :key="user._id" :value="user._id">
        {{ user.name }}
      </option>
    </select>
    <input type="submit" value="salva" />
  </form>
</template>

<script>
import { createParty } from "../../services/PartyService";
import { getAllUsers } from "../../services/UserService";
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
      });
    },
  },
  mounted() {
    this.getAllUsers();
  },
};
</script>
