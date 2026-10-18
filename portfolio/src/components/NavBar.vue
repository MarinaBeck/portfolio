<script setup lang="ts">

import {ref} from "vue";


</script>

<template>

  <nav id="nav" class="flex justify-between items-center relative">


    <!-- <img src="/logoS.svg" alt="Logo" id="logo" /> -->
    <span class="font-heading">marina</span>

    <ul class="hidden space-x-24">
      <!--Nav Links-->
      <li><a href="#aboutme">About </a></li>
      <li><a href="#projects"> Projects</a></li>
      <li><a href="#journey">Journey</a></li>
      <li><a href="#experience">Experience</a></li>
    </ul>

    <span class="muted-text-50 desktop:block reveal"><a href="https://github.com/MarinaBeck">hosted with github </a></span>


  </nav>

</template>

<style scoped>


#nav{
  padding: 2% 0;
}


li, p{
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
  background-color: var(--color-highlight-500);
  transition: width 0.3s ease-in-out;
}

li:hover::after, p:hover::after{
  width: 100%;
}


p{
  width: auto;
  max-width: 200px;
}


.mobile-menu li {
  padding: 0.5rem 0;
  background-color: transparent;
}



</style>