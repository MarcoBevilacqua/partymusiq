<template>
  <div v-if="this.queue" id="song-container" class="mx-12 my-2">
    <div
      v-for="(songTitle, songIndex) in this.queue"
      :key="songIndex"
      class="flex flex-row justify-between align-baseline rounded-sm text-sm mb-2 p-2"
      :class="songIndex === this.playing ? 'bg-blue-200' : 'bg-gray-300'"
    >
      <queue-item
        @song-removed="this.popQueueItem"
        :songTitle="songTitle"
        :songIndex="songIndex"
      />
    </div>
  </div>
</template>

<script>
import QueueItem from "./QueueItem.vue";

export default {
  components: {
    QueueItem,
  },
  props: {
    queue: Array,
    playing: Number,
  },
  methods: {
    popQueueItem(queueItem) {
      console.log("removing " + queueItem + " from queue");
      this.$emit("remove-from-playlist", queueItem);
    },
  },
};
</script>
