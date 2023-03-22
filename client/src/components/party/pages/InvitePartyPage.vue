<template>
  <list-user-page></list-user-page>
</template>

<script>
import ListUserPage from "../../user/pages/ListUserPage.vue";
import { getAllUsers } from "../../../services/UserService";
export default {
  components: {
    ListUserPage,
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
