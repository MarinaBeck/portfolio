<script setup lang="ts">

import BlockForm from "@/components/BlockForm.vue";
import {EBlockTypes} from "@/types.ts";
import NextUp from "../assets/NextUp.png";
import NewWork from "../assets/newWork.png";

const openLink = (url: string) => {
  window.open(url, '_blank');
};
</script>

<template>
  <h1 id="projects">// Projects</h1>

  <div class="flex  gap-10 proj">
    <BlockForm :type="EBlockTypes.Outline" size="half" class="max-md:w-full max-lg:w-auto image-hover"
               @click="openLink('https://www.figma.com/design/9f94tJbe4ylyjanwglAss0/NextUp_Marina_Beck?node-id=262-622&t=98lTMgt5OGGkPGwp-1')"
    >
      <img :src="NextUp" alt="NextUpProject" />
      <div class="overlay">
        <h2 class="project-title">NextUp</h2>
        <p class="project-description">Concert rating app</p>
      </div>

    </BlockForm>
    <BlockForm :type="EBlockTypes.Outline" size="half" class="max-md:w-full max-lg:w-auto image-hover flex items-center"
               @click="openLink('https://new-work-projekt.netlify.app/')"

    >
      <img :src="NewWork" alt="NewWorkProject" class="rounded-3xl" />
      <div class="overlay">
        <h2 class="project-title">New Work</h2>
        <p class="project-description">Agile Project Management course</p>
      </div>
    </BlockForm>
  </div>


</template>

<style scoped>
h1{
  margin: 5% 0;
}

.proj{
  margin-bottom: 5%;
  max-width: 100vw;
}

.image-hover {
  overflow: hidden;
  cursor: pointer;
  position: relative;
}

.image-hover img {
  transition: transform 0.5s ease-in-out;
}

.image-hover:hover img {
  transform: scale(1.1);
}

.overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 40%;
  background: linear-gradient(
      to top,
      rgba(0, 0, 0, 0.95) 0%,
      rgba(0, 0, 0, 0.5) 80%,
      transparent 100%
  );
  padding: 0 1.5rem;
  pointer-events: none;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

@media(max-width: 1025px){
  div{
    flex-wrap: wrap;
    max-width: 100vw;
  }
}
</style>