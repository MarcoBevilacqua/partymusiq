<template>
  <page-layout title="Create new party">
    <div class="w-1/3 mx-auto border bg-white rounded px-8 py-8 mb-4">
      <add-party-form></add-party-form>
    </div>
  </page-layout>
</template>

<script>
import PageLayout from "../../../base/PageLayout.vue";
import AddPartyForm from "../form/AddPartyForm.vue";

export default {
  components: {
    AddPartyForm,
    PageLayout,
  },
};
</script>
