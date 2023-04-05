<template>
  <div class="relative px-6 lg:px-8">
    <div class="mx-auto max-w-2xl pt-12 pb-4 sm:pt-2 sm:pb-4 lg:pt-12 lg:pb-4">
      <div class="hidden sm:mb-8 sm:flex sm:justify-center">
        <div class="relative py-1 px-3 text-sm leading-6 text-gray-600">
          <h2
            class="text-4xl font-light tracking-tight text-gray-900 sm:text-4xl"
          >
            Welcome to
            <span class="font-bold text-gray-400">{{ this.party.title }}</span>
          </h2>
          <small v-if="!this.party.invitation"
            >There is no one here
            <router-link
              class="text-indigo-600 font-bold"
              :to="this.party._id + '/invite'"
              >Add someone!</router-link
            ></small
          >
          <small v-else
            >{{ this.party.invitation.length }} people having fun right now!
            <router-link
              class="text-indigo-600 font-bold"
              :to="this.party._id + '/invite'"
              >Invite some more!</router-link
            >
          </small>
        </div>
      </div>
    </div>
    <!-- START PARTY PLAYER -->
    <div
      class="flex flex-col justify-center text-center w-full bg-gray-100 rounded-md"
    >
      <player
        v-if="this.party.playlist"
        @switch-mode-to-add="switchMode"
      ></player>
      <!-- END PARTY PLAYER -->

      <!-- START MUSIC SEARCH  -->
      <music-search
        v-if="this.mode === 'add'"
        @add-to-playlist="this.addSong"
      ></music-search>
      <!-- START MUSIC SEARCH  -->
    </div>
  </div>
  <div class="mt-4 text-center w-full">
    <router-link to="/party">
      <button
        class="bg-gray-300 text-gray-800 hover:bg-gray-400 px-4 py-2 rounded-md"
      >
        Go Back
      </button>
    </router-link>
  </div>
</template>

<script>
import { getSingleParty } from "../../../services/PartyService";

import BaseLayout from "../../../base/BaseLayout.vue";
import Player from "../../shared/Player.vue";
import MusicSearch from "../../shared/MusicSearch.vue";

//constants
import Party from "../../../constants/Party";
export default {
  components: {
    BaseLayout,
    Player,
    MusicSearch,
  },
  data() {
    return {
      party: {},
      canAddSong: false,
      mode: Party.PartyMode.MODE_LIST,
    };
  },
  methods: {
    getSingleParty(id) {
      getSingleParty(id).then((response) => {
        this.party = response;
      });
    },
    switchMode(mode) {
      console.log("switching to " + mode);
      this.mode = mode;
    },
  },
  mounted() {
    this.getSingleParty(this.$route.params.id);
  },
};
</script>
