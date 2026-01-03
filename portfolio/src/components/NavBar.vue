<script setup lang="ts">

import {ref} from "vue";

const isMenuOpen = ref(false);


const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};
</script>

<template>

  <nav id="nav" class="flex justify-between items-center relative">

    <img src="/logoS.svg" alt="Logo" id="logo" />

    <ul class="hidden desktop:flex space-x-24">
      <!--Nav Links-->
      <li><a href="#aboutme">About </a></li>
      <li><a href="#projects"> Projects</a></li>
      <li><a href="#journey">Journey</a></li>
      <li><a href="#experience">Experience</a></li>
    </ul>

    <p class="hidden desktop:block"><a href="#contact">Contact </a></p>

    <!-- Burger Menu Button (unter 1400px sichtbar) -->
    <button @click="toggleMenu" class="desktop:hidden burger-btn">
      <span class="burger-line"></span>
      <span class="burger-line"></span>
      <span class="burger-line"></span>
    </button>

    <!-- Mobile Menu -->
    <div v-if="isMenuOpen" class="mobile-menu desktop:hidden">
      <ul class="flex flex-col space-y-4">
        <li @click="toggleMenu"><a href="#aboutme">About </a></li>
        <li @click="toggleMenu"><a href="#projects"> Projects</a></li>
        <li @click="toggleMenu"><a href="#journey">Journey</a></li>
        <li @click="toggleMenu"><a href="#experience">Experience</a></li>
        <li @click="toggleMenu">Contact</li>
      </ul>
    </div>


  </nav>

</template>

<style scoped>

#logo{
  height: clamp(35px, 2vw, 60px);
  width: auto;
}

#nav{
  padding: 2% 0;
}

li, p{
  opacity: 0.8;
  transition: opacity 0.3s ease-in-out;
  position: relative;
  font-size: clamp(0.5rem, 30px, 1rem);
}

li:hover, p:hover{
  opacity: 1;
  cursor: pointer;
}

/* Border-Animation */
li::after, p::after{
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 1px;
  background-color: var(--highlight-500);
  transition: width 0.3s ease-in-out;
}

li:hover::after, p:hover::after{
  width: 100%;
}


p{
  width: auto;
  max-width: 200px;
}

/* Burger Menu Styles */
.burger-btn {
  display: flex;
  flex-direction: column;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
}

.burger-line {
  width: 30px;
  height: 3px;
  background-color: var(--primary-10);
  transition: all 0.3s ease;
}

.mobile-menu {
  position: absolute;
  top: 100%;
  right: 0;
  background-color: var(--primary-550);
  border-radius: 20px;
  padding: 2rem;
  margin-top: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
  z-index: 1000;
}

.mobile-menu li {
  padding: 0.5rem 0;
  background-color: transparent;
}

@media (min-width: 1400px) {
  .burger-btn {
    display: none;
  }
}


</style>