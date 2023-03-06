<template>
  <div class="relative px-6 lg:px-8">
    <div class="mx-auto max-w-2xl py-32 sm:py-42 lg:py-48">
      <div class="hidden sm:mb-8 sm:flex sm:justify-center">
        <div class="relative py-1 px-3 text-sm leading-6 text-gray-600">
          <h2
            class="text-4xl font-bold tracking-tight text-gray-900 sm:text-4xl"
          >
            Hi, welcome to {{ this.party.title }}
          </h2>
          <div id="player">
            <h3
              class="text-2xl mt-6 text-center font-extralight tracking-tight text-gray-900 sm:text-2xl"
            >
              Now Playing:
            </h3>
            <div class="mt-2">
              <div id="playlist">
                <playlist :playlist="this.party.playlist"></playlist>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="text-center w-full">
      <router-link to="/">
        <button
          class="bg-gray-300 text-gray-800 hover:bg-gray-400 px-4 py-2 rounded-md"
        >
          Go Back
        </button>
      </router-link>
    </div>
  </div>
</template>

<script>
import { getSingleParty } from "../../../services/PartyService";
import BaseLayout from "../../../base/BaseLayout.vue";
import Playlist from "../../playlist/Playlist.vue";
export default {
  components: {
    BaseLayout,
    Playlist,
  },
  data() {
    return {
      party: {},
    };
  },
  methods: {
    getSingleParty(id) {
      getSingleParty(id).then((response) => {
        this.party = response;
      });
    },
  },
  mounted() {
    this.getSingleParty(this.$route.params.id);
  },
};
</script>
