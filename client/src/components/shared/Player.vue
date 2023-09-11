<template>
  <div v-if="this.songList.length" class="bg-gray-100">
    <h4
      class="text-2xl mt-6 font-extralight tracking-tight text-gray-900 sm:text-2xl"
    >
      Now Playing
    </h4>
    <small>{{ this.songList[this.playing].title }}</small>
    <player-controls
      :track="this.playing"
      @next-track="this.getNextTrack"
    ></player-controls>

    <div class="my-2 border-t-2 border-t-gray-500"></div>
    <div id="queue">
      <queue
        @remove-from-playlist="(songList) => (this.songList = songList)"
        :queue="this.songList"
        :playing="this.playing"
      ></queue>
    </div>
  </div>
  <div v-else id="controls" class="py-4">
    <small
      >Seems like no one has added song to this playlist
      <router-link :to="'/party/' + this.$parent.party._id + '/music'">
        <span class="text-indigo-600 cursor-pointer font-bold">
          Add something!
        </span>
      </router-link>
    </small>
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
  },
};
</script>
