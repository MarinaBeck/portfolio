<script setup lang="ts">

import NavBar from "@/components/NavBar.vue";
import AboutMe from "@/components/AboutMe.vue";
import AboutMeInfo from "@/components/AboutMeInfo.vue";
import Skills from "@/components/Skills.vue";
import Projects from "@/components/Projects.vue";
import Journey from "@/components/Journey.vue";
import Experience from "@/components/Experience.vue";
import Contact from "@/components/Contact.vue";
import Footer from "@/components/Footer.vue";
</script>

<template>

  <NavBar></NavBar>
  <AboutMe></AboutMe>
  <AboutMeInfo></AboutMeInfo>
  <Skills></Skills>
  <Projects></Projects>
  <Journey></Journey>
  <Experience></Experience>
  <Contact></Contact>
  <Footer></Footer>

</template>

<style>
body{
  padding: 0 5%;
}

.container {
  padding: 0 5%;
}

html {
  scroll-behavior: smooth;
}

</style>
