<script setup lang="ts">

import NavBar from "@/components/NavBar.vue";
import AboutMe from "@/components/AboutMe.vue";
import AboutMeInfo from "@/components/AboutMeInfo.vue";
import Skills from "@/components/Skills.vue";
import Projects from "@/components/Projects.vue";
import Education from "@/components/Education.vue";
import Experience from "@/components/Experience.vue";
import Contact from "@/components/Contact.vue";
import Footer from "@/components/Footer.vue";
</script>

<template>

  <NavBar></NavBar>
  <AboutMe></AboutMe>
  <AboutMeInfo></AboutMeInfo>

  <Projects></Projects>

  <Experience></Experience>
  <Contact></Contact>
  <Footer></Footer>

</template>

<style>

body{
  overflow-x: hidden;
}

.container {
  padding: 0 5%;
}

html {
  scroll-behavior: smooth;
}

</style>
