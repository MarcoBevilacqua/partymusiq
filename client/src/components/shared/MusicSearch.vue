<template>
  <form
    @submit.prevent="addSongToPlaylist"
    class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
  >
    <span class="text-sm font-lighter">No Playlist available</span>
    <label for="song" class="block text-gray-700 text-sm font-light mb-2"
      >Search Artist or title</label
    >
    <input
      class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      type="text"
      id="song"
      ref="song"
      name="song"
      autocomplete="false"
      @input="searchMusicForPlaylist"
    />
    <div class="relative w-80 border border-t-2" v-if="this.canChooseSong">
      <ul>
        <li
          class="cursor-pointer hover:bg-gray-200 border-b py-2 px-1"
          v-for="searchResult in this.searchResults"
        >
          <a
            class="text-gray-400 font-lighter px-2"
            @click="this.addSong(searchResult)"
            >{{ searchResult }}</a
          >
        </li>
      </ul>
    </div>
    <input
      class="bg-indigo-600 cursor-pointer mt-4 py-1 px-2 rounded-md text-white font-lighter"
      :disabled="!this.canAddSong"
      type="submit"
      value="Add song"
    />
    <ul></ul>
  </form>
</template>

<script>
import { searchMusicForPlaylist } from "../../services/PlaylistService";

export default {
  data() {
    return {
      canChooseSong: false,
      canAddSong: false,
      searchResults: [],
      songList: [],
    };
  },
  methods: {
    addSong(song) {
      console.log("Adding " + song);
      this.songList.push(song);
      this.canChooseSong = false;
      this.canAddSong = true;
      this.$refs.song.value = song;
    },
    addSongToPlaylist() {
      this.$emit("add-to-playlist", this.songList);
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
};
</script>
