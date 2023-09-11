<template>
  <div
    v-if="this.users.length"
    v-for="user in users"
    :key="user._id"
    class="w-1/4 p-2"
  >
    <div class="rounded-md p-2 text-gray-600 border border-gray-200">
      <div class="lh-1">
        <h1 class="text-xl font-light">{{ user.name }}</h1>
        <small>{{ user.username }}</small>
      </div>
      <add-friend-btn :userId="user._id"></add-friend-btn>
    </div>
  </div>
</template>

<script>
import AddFriendBtn from "./btn/AddFriend.vue";

export default {
  components: {
    AddFriendBtn,
  },
  props: {
    users: Array,
  },
};
</script>
