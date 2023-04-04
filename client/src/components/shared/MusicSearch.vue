<template>
  <div class="relative px-6 lg:px-8">
    <div class="mx-auto max-w-2xl pt-12 pb-4 sm:pt-2 sm:pb-4 lg:pt-12 lg:pb-4">
      <div class="hidden sm:mb-8 sm:flex sm:justify-center">
        <div class="relative py-1 px-3 text-sm leading-6 text-gray-600">
          <h2
            class="text-4xl font-light tracking-tight text-gray-900 sm:text-4xl"
          >
            Add your music!
          </h2>
        </div>
      </div>
    </div>
    <div class="grid grid-cols-1 gap-y-2 border rounded-md bg-white">
      <div class="col px-8">
        <form @submit.prevent="addSongToPlaylist" class="pt-6 pb-8 mb-4">
          <label for="song" class="block text-gray-700 text-sm font-light mb-2"
            >Search Artist or title to add music</label
          >
          <div class="relative mt-2 rounded-md shadow-sm">
            <input
              class="shadow appearance-none border border-spacing-1 rounded w-full py-2 px-3 text-gray-700 leading-tight"
              type="text"
              id="song"
              ref="song"
              name="song"
              @input="searchMusicForPlaylist"
            />
            <div
              class="rounded-r-md absolute inset-y-0 right-0 flex items-center"
              :class="{
                'bg-indigo-600': this.canAddSong,
                'bg-indigo-400': !this.canAddSong,
              }"
            >
              <input
                class="cursor-pointer py-2 px-2 text-white disabled:cursor-not-allowed"
                :disabled="!this.canAddSong"
                type="submit"
                value="Add song"
              />
            </div>
          </div>
          <div class="relative" v-if="this.canChooseSong">
            <div class="absolute w-full inset-y-0">
              <ul class="bg-white z-10">
                <li
                  class="border border-t-2 cursor-pointer hover:bg-gray-200 border-b py-2 px-1"
                  v-for="searchResult in this.searchResults"
                  @click="this.selectSong(searchResult)"
                >
                  <a class="text-gray-500 font-lighter px-2">{{
                    searchResult
                  }}</a>
                </li>
              </ul>
            </div>
          </div>
        </form>
      </div>

      <div v-if="this.songList.length" class="col px-8 mb-4">
        <h2>Playlist</h2>
        <table class="table">
          <tbody>
            <tr v-for="song in this.songList">
              <td>{{ song }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-else class="col px-8 mb-4">
        <span class="leading-tight">No song selected</span>
      </div>
    </div>
  </div>
</template>

<script>
import { searchMusicForPlaylist } from "../../services/PlaylistService";
import { getSingleParty } from "../../services/PartyService";
export default {
  data() {
    return {
      canChooseSong: false,
      canAddSong: false,
      party: {},
      searchResults: [],
      songList: [],
    };
  },
  methods: {
    selectSong(song) {
      this.canChooseSong = false;
      this.canAddSong = true;
      this.$refs.song.value = song;
    },
    addSongToPlaylist(song) {
      console.log("Adding " + song);
      this.songList.push(this.$refs.song.value);
      this.$emit("add-to-playlist", this.songList);
      this.$refs.song.value = "";
      this.canAddSong = false;
    },
    getSingleParty(id) {
      getSingleParty(id).then((response) => {
        this.party = response;
      });
    },
    searchMusicForPlaylist(e) {
      if (e.target.value.length < 3) return;
      searchMusicForPlaylist(e.target.value).then((res) => {
        console.log(res);
        if (res.length > 0) {
          this.canChooseSong = true;
          this.searchResults = res;
        }
      });
    },
  },
  mounted() {
    this.getSingleParty(this.$route.params.id);
  },
};
</script>
