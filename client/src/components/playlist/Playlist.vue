<template>
  <div class="text-center" v-if="!playlist || this.mode === 'add'">
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
        @input="searchMusicForPlaylist"
      />
      <div v-if="this.canChooseSong">
        <ul>
          <li v-for="searchResult in this.searchResults">
            <a
              class="cursor-pointer hover:bg-gray-200 hover:p-1 text-gray-400 font-bold"
              @click="this.addSong(searchResult)"
              >{{ searchResult }}</a
            >
          </li>
        </ul>
      </div>
      <input
        class="bg-indigo-600 mt-4 py-1 px-2 rounded-md text-white font-lighter"
        :disabled="!this.canAddSong"
        type="submit"
        value="Add song"
      />
      <ul></ul>
    </form>
  </div>
  <div v-else>
    <h3
      class="text-2xl mt-6 text-center font-extralight tracking-tight text-gray-900 sm:text-2xl"
    >
      Now Playing:
    </h3>
    <div class="text-center border-md border-gray-200 rounded-md">
      <ul>
        <li v-for="song in playlist">
          {{ song }}
        </li>
      </ul>
      <div class="mt-2">
        <a
          class="bg-indigo-200 rounded-sm p-2 font-lighter cursor-pointer"
          @click="this.mode = 'add'"
          >Click to add new song</a
        >
      </div>
    </div>
  </div>
</template>

<script>
import {
  searchMusicForPlaylist,
  addSongToPlaylist,
} from "../../services/PlaylistService";
export default {
  props: {
    playlist: Object,
  },
  data() {
    return {
      canChooseSong: false,
      canAddSong: false,
      mode: "list",
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
      addSongToPlaylist(this.$parent.party._id, this.songList).then((res) => {
        console.log(res);
        this.mode = "list";
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
};
</script>
