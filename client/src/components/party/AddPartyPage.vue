<template>
  <form submit.prevent="addParty">
    <label for="title">Title</label>
    <input type="text" name="title" id="title" />
    <label for="party_date">Date</label>
    <input type="date" name="party_date" id="party_date" />
    <label for="host">Host</label>
    <input type="text" name="host" id="host" />
  </form>
</template>
