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
    <playlist
      id="party"
      v-if="this.party.playlist"
      :songList="this.party.playlist"
    ></playlist>
    <music-search @add-to-playlist="addToPlaylist"></music-search>
  </div>
  <div class="mt-4 text-center w-full">
    <router-link to="/">
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
import { addSongToPlaylist } from "../../../services/PlaylistService";
import BaseLayout from "../../../base/BaseLayout.vue";
import Playlist from "../../playlist/Playlist.vue";
import MusicSearch from "../../shared/MusicSearch.vue";

//constants
import PartyMode from "../../../constants/Party";
export default {
  components: {
    BaseLayout,
    Playlist,
    MusicSearch,
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
    addToPlaylist(songList) {
      addSongToPlaylist(this.party._id, songList).then((res) => {
        console.log(res);
        this.mode = PartyMode.MODE_LIST;
        this.list = res.value.playlist;
      });
    },
  },
  mounted() {
    this.getSingleParty(this.$route.params.id);
  },
};
</script>
