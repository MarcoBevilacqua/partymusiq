<template>
  <div class="flex flex-col justify-center text-center w-full">
    <div class="w-96 mx-auto bg-gray-100 rounded-md text-center">
      <music-search
        v-if="!this.list.length || this.mode === 'add'"
        @add-to-playlist="addSongToPlaylist"
      ></music-search>
      <player
        v-else
        :songList="this.list"
        @switch-mode-to-add="switchMode"
        @remove-from-playlist="this.removeSongFromPlaylist"
      ></player>
    </div>
  </div>
</template>

<script>
import MusicSearch from "../shared/MusicSearch.vue";
import Player from "../shared/Player.vue";
import {
  addSongToPlaylist,
  removeSongFromPlaylist,
} from "../../services/PlaylistService";
export default {
  components: {
    MusicSearch,
    Player,
  },
  props: {
    songList: Array,
  },
  data() {
    return {
      canAddSong: false,
      mode: this.songList.length ? "list" : "add",
      list: [],
    };
  },
  methods: {
    addSongToPlaylist(songList) {
      addSongToPlaylist(this.$parent.party._id, songList).then((res) => {
        console.log(res);
        this.mode = "list";
        this.list = res.value.playlist;
      });
    },
    removeSongFromPlaylist(songId) {
      removeSongFromPlaylist(
        this.$parent.party._id,
        this.songList[songId]
      ).then((res) => {
        console.log(res);
        this.list = res.value.playlist;
      });
    },
    switchMode(mode) {
      console.log("switching to " + mode);
      this.mode = mode;
    },
  },
  mounted() {
    this.list = this.songList;
  },
};
</script>
