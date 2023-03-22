<template>
  <div id="song-container" class="mx-12 my-2">
    <ul class="py-4 px-2">
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
</template>

<script>
export default {
  props: {
    queue: Array,
    playing: Number,
  },
};
</script>
