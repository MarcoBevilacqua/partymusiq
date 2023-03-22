<template>
  <div class="flex flex-col justify-center text-center w-full">
    <div class="w-96 mx-auto bg-gray-100 rounded-md text-center">
      <player
        :songList="this.list"
        @switch-mode-to-add="switchMode"
        @remove-from-playlist="this.removeSongFromPlaylist"
      ></player>
    </div>
  </div>
</template>

<script>
import Player from "../shared/Player.vue";
import { removeSongFromPlaylist } from "../../services/PlaylistService";
export default {
  components: {
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
