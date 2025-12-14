<script setup lang="ts">

</script>

<template>

  <nav id="nav" class="flex justify-between">

    <img src="/logoS.svg" alt="Logo" id="logo" />

    <ul class="flex space-x-24">
      <!--Nav Links-->
      <li>About Me</li>
      <li>Projects</li>
      <li>Journey</li>
      <li>Experience</li>
    </ul>

    <p>Contact</p>


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

</style>