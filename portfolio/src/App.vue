<script setup lang="ts">

import NavBar from "@/components/NavBar.vue";
import AboutMe from "@/components/AboutMe.vue";
import AboutMeInfo from "@/components/AboutMeInfo.vue";
import Skills from "@/components/Skills.vue";
import Projects from "@/components/Projects.vue";
import Journey from "@/components/Journey.vue";
</script>

<template>
  <div class="container">
    <NavBar></NavBar>
    <AboutMe></AboutMe>
    <AboutMeInfo></AboutMeInfo>
    <Skills></Skills>
    <Projects></Projects>
    <Journey></Journey>
  </div>

</template>

<style scoped>
.container{
  padding: 0 5%;
}

</style>
