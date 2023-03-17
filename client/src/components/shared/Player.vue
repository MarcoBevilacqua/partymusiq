<template>
  <div>
    <h4
      class="text-2xl mt-6 font-extralight tracking-tight text-gray-900 sm:text-2xl"
    >
      Now Playing
    </h4>
    <small>{{ this.songList[this.playing] }}</small>
    <player-controls
      :track="this.playing"
      @next-track="this.getNextTrack"
    ></player-controls>
  </div>
  <div id="queue" class="mt-4">
    <div id="song-container">
      <ul class="py-4 px-2 border-t-2 border-t-gray-500">
        <li
          v-if="this.queue"
          v-for="(queueItem, queueIndex) in this.queue"
          :key="queueIndex"
          class="flex justify-between align-baseline rounded-sm text-sm mb-2"
          :class="queueIndex === this.playing ? 'bg-blue-200' : 'bg-gray-300'"
        >
          <span class="text-xs py-2 pl-2">{{ queueItem }}</span>
          <a
            @click="this.removeSong(queueIndex)"
            class="pr-2 py-2 cursor-pointer text-red-400 hover:text-gray-400"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-4 h-4"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </a>
        </li>
      </ul>
    </div>
    <add-new-song
      @click="this.$emit('switch-mode-to-add', 'add')"
    ></add-new-song>
  </div>
</template>

<script>
import PlayerControls from "./PlayerControls.vue";
import AddNewSong from "./AddNewSong.vue";

export default {
  components: {
    AddNewSong,
    PlayerControls,
  },
  props: {
    songList: Array,
  },
  data() {
    return {
      playing: 0,
      queue: this.songList || [],
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
      this.$emit("remove-from-playlist", songId);
    },
  },
};
</script>
