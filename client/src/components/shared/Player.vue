<template>
  <small>{{ this.songList[this.playing] }}</small>
  <player-controls
    :track="this.playing"
    @next-track="this.getNextTrack"
  ></player-controls>

  <div class="my-2 border-t-2 border-t-gray-500"></div>
  <div id="queue">
    <queue
      @remove-from-playlist="this.removeSongFromPlaylist"
      :queue="this.songList"
      :playing="this.playing"
    ></queue>

    <div id="controls" class="mb-4">
      <router-link :to="'/party/' + this.$parent.party._id + '/music'">
        <button
          class="px-4 py-2 bg-indigo-200 hover:bg-indigo-300 text-xs cursor-pointer"
        >
          Add new song
        </button>
      </router-link>
    </div>
  </div>
</template>

<script>
import PlayerControls from "./PlayerControls.vue";
import Queue from "./Queue.vue";

export default {
  components: { PlayerControls, Queue },
  data() {
    return {
      songList: this.$parent.party.playlist,
      playing: 0,
    };
  },
  methods: {
    getNextTrack() {
      console.log(
        "track changing from " + this.playing + " to " + this.playing + 1
      );
      this.playing++;
      return this.songList[this.playing];
    },
    removeSong(songId) {
      console.log("removing song " + songId + " from playlist");
      this.songList.filter((song) => song === songId);
    },
  },
};
</script>
