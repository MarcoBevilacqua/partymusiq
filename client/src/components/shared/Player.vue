<template>
  <div>
    <h3
      class="text-2xl mt-6 text-center font-extralight tracking-tight text-gray-900 sm:text-2xl"
    >
      Now Playing:
      <small>{{ this.playing }}</small>
    </h3>
    <div
      id="queue"
      class="w-64 mx-auto my-4 bg-gray-200 rounded-sm text-center"
    >
      <h4 class="py-2 bg-slate-400 text-white font-bold">Coming up...</h4>
      <ul class="p-2 text-white-200">
        <li v-for="song in this.songList" class="my-2">
          <span>
            {{ song }}
            <a @click="this.removeSong(song)" class="text-red-400"
              >remove song</a
            >
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    songList: Array,
  },
  data() {
    return {
      playing: "",
      queue: [],
    };
  },
  methods: {
    removeSong(song) {
      this.$emit("remove-from-playlist", song);
    },
  },
  mounted() {
    this.playing = this.songList[0];
  },
};
</script>
