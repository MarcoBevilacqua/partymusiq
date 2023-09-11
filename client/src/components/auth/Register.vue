<template>
  <div
    class="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
  >
    <div class="w-full max-w-md space-y-8">
      <div class="mx-auto max-w-2xl text-center">
        <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Sign Up
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          Or
          {{ " " }}
          <a
            @click="goToLogin"
            class="font-medium text-indigo-600 hover:text-indigo-500 cursor-pointer"
            >login</a
          >
        </p>
      </div>
      <form @submit.prevent="this.register">
        <div class="grid grid-cols-2 gap-y-6 gap-x-8 sm:grid-cols-2">
          <div class="sm:col-span-2">
            <label
              for="first-name"
              class="block text-sm font-semibold leading-6 text-gray-900"
              >Name</label
            >
            <div class="mt-2.5">
              <input
                type="text"
                name="name"
                id="name"
                class="block w-full rounded-md border-0 py-2 px-3.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div class="sm:col-span-2">
            <label
              for="company"
              class="block text-sm font-semibold leading-6 text-gray-900"
              >Username (email)</label
            >
            <div class="mt-2.5">
              <input
                type="text"
                name="username"
                id="username"
                autocomplete="organization"
                class="block w-full rounded-md border-0 py-2 px-3.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div class="sm:col-span-2">
            <label
              for="phone-number"
              class="block text-sm font-semibold leading-6 text-gray-900"
              >Password</label
            >
            <div class="mt-2.5">
              <input
                type="password"
                name="password"
                id="password"
                autocomplete="At least 4 chars"
                class="block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <SwitchGroup as="div" class="flex gap-x-4 sm:col-span-2">
            <div class="flex h-6 items-center">
              <Switch
                v-model="agreed"
                :class="[
                  agreed ? 'bg-indigo-600' : 'bg-gray-200',
                  'flex w-8 flex-none cursor-pointer rounded-full p-px ring-1 ring-inset ring-gray-900/5 transition-colors duration-200 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600',
                ]"
              >
                <span class="sr-only">Agree to policies</span>
                <span
                  aria-hidden="true"
                  :class="[
                    agreed ? 'translate-x-3.5' : 'translate-x-0',
                    'h-4 w-4 transform rounded-full bg-white shadow-sm ring-1 ring-gray-900/5 transition duration-200 ease-in-out',
                  ]"
                />
              </Switch>
            </div>
            <SwitchLabel class="text-sm leading-6 text-gray-600">
              By selecting this, you agree to our
              {{ " " }}
              <a href="#" class="font-semibold text-indigo-600"
                >privacy&nbsp;policy</a
              >.
            </SwitchLabel>
          </SwitchGroup>
        </div>
        <div class="mt-10">
          <button
            type="submit"
            class="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Sign Up
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { Switch, SwitchGroup, SwitchLabel } from "@headlessui/vue";

import { register } from "../../services/AuthService";

const agreed = ref(false);
export default {
  methods: {
    register(form) {
      let registrationFormData = {
        name: form.target[0].value,
        username: form.target[1].value,
        password: form.target[2].value,
      };

      register(registrationFormData).then((res) => {
        console.log(res);
        this.$emit("user-registered", res);
      });
    },
    goToLogin() {
      this.$router.push("/login");
    },
  },
};
</script>
