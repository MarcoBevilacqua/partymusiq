<template>
  <div class="justify-center mt-2">
    <audio @ended="this.nextTrack" controls id="player-controls"></audio>
  </div>
</template>

<script>
export default {
  props: {
    track: Number,
  },
  methods: {
    load() {},
    nextTrack() {
      this.$emit("next-track");
    },
  },
  data() {
    return {
      audio: null,
    };
  },
  mounted() {
    this.audio = document.getElementById("player-controls");
    this.audio.src = "../../../public/music/" + this.$parent.songList[0];
  },
  watch: {
    track(newTrack) {
      this.audio.src =
        "../../../public/music/" + this.$parent.songList[newTrack];
      this.audio.play();
    },
  },
};
</script>

<style scoped>
audio {
  display: inline;
}
</style>
