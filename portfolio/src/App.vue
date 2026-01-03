<script setup lang="ts">

import NavBar from "@/components/NavBar.vue";
import AboutMe from "@/components/AboutMe.vue";
import AboutMeInfo from "@/components/AboutMeInfo.vue";
import Skills from "@/components/Skills.vue";
import Projects from "@/components/Projects.vue";
import Journey from "@/components/Journey.vue";
import Experience from "@/components/Experience.vue";
import Contact from "@/components/Contact.vue";
</script>

<template>
  <div class="container">
    <NavBar></NavBar>
    <AboutMe></AboutMe>
    <AboutMeInfo></AboutMeInfo>
    <Skills></Skills>
    <Projects></Projects>
    <Journey></Journey>
    <Experience></Experience>
    <Contact></Contact>
  </div>

</template>

<style scoped>
.container{
  padding: 0 5%;
}

</style>
