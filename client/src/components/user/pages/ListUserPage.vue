<template>
  <div class="relative px-6 lg:px-8">
    <div class="mx-auto max-w-2xl py-32 sm:py-42 lg:py-48">
      <div class="hidden sm:mb-8 sm:flex sm:justify-center">
        <div class="relative py-1 px-3 text-sm leading-6 text-gray-600">
          <h2
            class="text-4xl font-bold tracking-tight text-gray-900 sm:text-4xl"
          >
            Users:
          </h2>
        </div>
      </div>
      <div class="flex flex-wrap gap-2">
        <user-list-item :users="this.users"></user-list-item>
      </div>
    </div>
    <div
      class="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
    ></div>
  </div>
</template>

<script>
import UserListItem from "../UserList.vue";
import { getAllUsers } from "../../../services/UserService";
export default {
  components: {
    UserListItem,
  },
  data() {
    return {
      users: [],
    };
  },
  methods: {
    getAllUsers() {
      getAllUsers().then((res) => {
        console.log(res);
        this.users = res;
      });
    },
  },
  mounted() {
    this.getAllUsers();
  },
};
</script>
