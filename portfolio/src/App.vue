<script setup lang="ts">

import NavBar from "@/components/NavBar.vue";
import AboutMe from "@/components/AboutMe.vue";
import AboutMeInfo from "@/components/AboutMeInfo.vue";
</script>

<template>
  <div class="container">
    <NavBar></NavBar>
    <AboutMe></AboutMe>
    <AboutMeInfo></AboutMeInfo>
  </div>

</template>

<style scoped>
.container{
  padding: 0 5%;
}

</style>
