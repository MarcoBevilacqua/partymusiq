<template>
  <div class="inline-flex gap-2">
    <a
      v-if="this.canAskFriend"
      @click="this.askFriend(userId)"
      class="cursor-pointer text-indigo-300 font-ligther"
      >Friend</a
    >
    <span v-else class="text-indigo-400">Already your friend!</span>
  </div>
</template>

<script>
import { addFriend } from "../../../services/UserService";

export default {
  props: {
    userId: String,
  },
  data() {
    return {
      canAskFriend: true,
    };
  },

  methods: {
    askFriend(userId) {
      addFriend(userId)
        .then((res) => {
          if (res.ok === 1) {
            this.canAskFriend = false;
          }
        })
        .catch((err) => {
          console.warn("An error Occurred: " + err);
        });
    },
  },
};
</script>
