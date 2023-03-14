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
      class="w-64 mx-auto my-4 bg-gray-300 rounded-sm text-center"
    >
      <ul class="p-2 text-white-200">
        <li v-for="song in this.songList" class="my-2">
          {{ song }}
          <hr />
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
  mounted() {
    this.playing = this.songList[0];
  },
};
</script>
