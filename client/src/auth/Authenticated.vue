<template>
  <div>
    <div class="px-6 pt-6 lg:px-8">
      <nav class="flex items-center justify-between" aria-label="Global">
        <div class="flex lg:flex-1">
          <a href="#" class="-m-1.5 p-1.5">
            <span class="sr-only">Your Company</span>
            <img
              class="h-8"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt=""
            />
          </a>
        </div>
        <div class="flex lg:hidden">
          <button
            type="button"
            class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            @click="mobileMenuOpen = true"
          >
            <span class="sr-only">Open main menu</span>
            <Bars3Icon class="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div class="hidden lg:flex lg:gap-x-12">
          <router-link to="/">
            <h3
              class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
            >
              PartyMusiq
            </h3>
          </router-link>
        </div>
        <div class="hidden lg:flex lg:flex-1 lg:justify-end">
          <div v-if="this.$props.user">
            <div>
              <a
                @click="this.goToUserProfile"
                class="cursor-pointer text-sm font-semibold leading-6 text-gray-900"
                >{{ this.$props?.user?.username }}
              </a>
            </div>
            <div>
              <a
                v-if="this.$props.user"
                @click="this.goToLogout"
                class="text-sm cursor-pointer"
                ><small>Logout</small></a
              >
            </div>
          </div>
          <div v-else>
            <a href="#" class="text-sm font-semibold leading-6 text-gray-900"
              >Log in <span aria-hidden="true">&rarr;</span></a
            >
          </div>
        </div>
      </nav>
      <Dialog as="div" @close="mobileMenuOpen = false" :open="mobileMenuOpen">
        <DialogPanel
          class="fixed inset-0 z-10 overflow-y-auto bg-white px-6 py-6 lg:hidden"
        >
          <div class="flex items-center justify-between">
            <a href="#" class="-m-1.5 p-1.5">
              <span class="sr-only">Your Company</span>
              <img
                class="h-8"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                alt=""
              />
            </a>
            <button
              type="button"
              class="-m-2.5 rounded-md p-2.5 text-gray-700"
              @click="mobileMenuOpen = false"
            >
              <span class="sr-only">Close menu</span>
              <XMarkIcon class="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div class="mt-6 flow-root">
            <div class="-my-6 divide-y divide-gray-500/10">
              <div class="space-y-2 py-6">
                <a
                  v-for="item in navigation"
                  :key="item.name"
                  :href="item.href"
                  class="-mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-400/10"
                  >{{ item.name }}</a
                >
              </div>
              <div class="py-6">
                <a
                  href="#"
                  class="-mx-3 block rounded-lg py-2.5 px-3 text-base font-semibold leading-6 text-gray-900 hover:bg-gray-400/10"
                  >Log in</a
                >
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </div>
    <slot></slot>
  </div>
</template>

<script>
const mobileMenuOpen = ref(false);

import { logout } from "../services/AuthService";
import { ref } from "vue";
import { Dialog, DialogPanel } from "@headlessui/vue";
import { Bars3Icon, XMarkIcon } from "@heroicons/vue/24/outline";

export default {
  props: {
    user: Object,
  },
  methods: {
    goToUserProfile() {
      this.$router.push("/user/profile");
    },
    goToLogout() {
      logout().then((res) => {
        if (!res) {
          return false;
        }
        this.$emit("user-logged-out");
        this.$router.push("/login");
      });
    },
  },
};
</script>
