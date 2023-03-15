<template>
  <div class="text-center h-48">
    <music-search
      v-if="!this.list.length || this.mode === 'add'"
      @add-to-playlist="addSongToPlaylist"
    ></music-search>
    <player
      v-else
      :songList="this.list"
      @remove-from-playlist="this.removeSongFromPlaylist"
    ></player>
    <div v-if="this.mode === 'list'" class="text-center mt-2">
      <a
        class="bg-indigo-200 rounded-sm p-2 font-lighter cursor-pointer"
        @click="this.mode = 'add'"
        >Add new song</a
      >
    </div>
    <div v-else>
      <a
        class="bg-indigo-200 rounded-sm p-2 font-lighter cursor-pointer"
        @click="this.mode = 'list'"
        >Back to playlist</a
      >
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
    removeSongFromPlaylist(song) {
      removeSongFromPlaylist(this.$parent.party._id, song).then((res) => {
        console.log(res);
        this.list = res.value.playlist;
      });
    },
  },
  mounted() {
    this.list = this.songList;
  },
};
</script>
