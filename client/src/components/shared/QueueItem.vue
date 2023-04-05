<template>
  <div>
    <span class="text-xs py-2 pl-2">{{ item.title }}</span>
  </div>
  <div class="flex justify-end gap-2 basis-2/4 align-baseline">
    <div>
      <a
        v-if="!this.voted"
        @click="this.upvoteSong(item._id)"
        class="cursor-pointer text-gray-400 hover:text-gray-400"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          class="w-4 h-4"
        >
          <path
            fill-rule="evenodd"
            d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
            clip-rule="evenodd"
          />
        </svg>
      </a>
      <a
        v-else
        @click="this.downvoteSong(item._id)"
        class="cursor-pointer text-gray-400 hover:text-gray-400"
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
            d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
          />
        </svg>
      </a>
    </div>
    <div>
      <a
        @click="this.removeSong(item.title, item._id)"
        class="cursor-pointer text-red-400 hover:text-gray-400"
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
    </div>
  </div>
</template>

<script>
import { removeSongFromPlaylist } from "../../services/PlaylistService";
import { upvoteSong, downvoteSong } from "../../services/SongService";

export default {
  props: {
    item: Object,
  },
  data() {
    return {
      canVote: true,
      voted: false,
    };
  },
  methods: {
    upvoteSong(songIdx) {
      upvoteSong(this.$route.params.id, songIdx).then((res) => {
        console.log(res);
      });
      console.log("voting song nr " + songIdx);
      this.canVote = false;
      this.voted = true;
    },

    downvoteSong(songIdx) {
      downvoteSong(this.$route.params.id, songIdx).then((res) => {
        console.log(res);
      });
      console.log("downvoting voting song " + songIdx);
      this.canVote = true;
      this.voted = false;
    },
    removeSong(songTitle, songIndex) {
      removeSongFromPlaylist(this.$route.params.id, songTitle)
        .then((res) => {
          if (res.status === 200) {
            //remove song from list
            this.$emit("song-removed", songIndex);
          }
        })
        .catch((err) => {
          console.log(err);
          console.log("Cannot remove song from playlist");
        });
    },
  },
};
</script>
