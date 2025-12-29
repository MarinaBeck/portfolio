<script setup lang="ts">
import BlockForm from "@/components/BlockForm.vue";
import { EBlockTypes } from "@/types.ts";
</script>

<template>
  <h1>// Journey</h1>

  <!-- Desktop Timeline -->
  <div class="relative w-full mt-12 grid grid-cols-[1fr_40px_1fr] gap-y-24 auto-rows-min hidden md:grid">

    <!-- Timeline Linie -->
    <span class="timeline-line absolute top-0 bottom-0 left-1/2 -translate-x-1/2"></span>

    <!-- Item 1 -->
    <BlockForm class="justify-self-start col-start-1 col-end-2" :type="EBlockTypes.Glass" size="half">
      <h2>University of Applied Science <br> Upper Austria Hagenberg</h2>
      <p>Design of Digital Products</p>
    </BlockForm>
    <p class="justify-self-center col-start-3 col-end-4 timeline-text">2024 - continuously</p>
    <div class="timeline-bullet col-start-2 col-end-3 row-start-1 row-end-2 self-start mt-2"></div>

    <!-- Item 2 -->
    <p class="justify-self-center col-start-1 col-end-2 timeline-text">2019 - 2024</p>
    <BlockForm class="justify-self-end col-start-3 col-end-4" :type="EBlockTypes.Glass" size="half">
      <h2>Secondary technical school <br> Krems - Austria  </h2>
      <p>information technology</p>
    </BlockForm>
    <div class="timeline-bullet col-start-2 col-end-3 row-start-2 row-end-3 self-start mt-2"></div>

    <!-- Item 3 -->
    <BlockForm class="justify-self-start col-start-1 col-end-2" :type="EBlockTypes.Glass" size="half">
      <h2>Middleschool Stift Zwettl</h2>
      <p>Music</p>
    </BlockForm>
    <p class="justify-self-center col-start-3 col-end-4 timeline-text">2015 - 2019</p>
    <div class="timeline-bullet col-start-2 col-end-3 row-start-3 row-end-4 self-start mt-2"></div>

  </div>

  <!-- Mobile Timeline: Block + Text unter Block -->
  <div class="flex flex-col gap-8 md:hidden mt-12">
    <div class="flex flex-col gap-2">
      <BlockForm :type="EBlockTypes.Glass" size="big">
        <h2>University of Applied Science <br> Upper Austria Hagenberg</h2>
        <p>Design of Digital Products</p>
      </BlockForm>
      <p class="text-center font-semibold ">2024 - continuously</p>
    </div>

    <div class="flex flex-col gap-2">
      <BlockForm :type="EBlockTypes.Glass" size="big">
        <h2>Another Education/Experience <br> Example Institute</h2>
        <p>Some Program/Role</p>
      </BlockForm>
      <p class="text-center font-semibold ">2022 - 2024</p>
    </div>

    <div class="flex flex-col gap-2">
      <BlockForm :type="EBlockTypes.Glass" size="big">
        <h2>Some Job / Role <br> Company Name</h2>
        <p>Description</p>
      </BlockForm>
      <p class="text-center font-semibold ">2020 - 2022</p>
    </div>
  </div>
</template>


<style scoped>
h1 {
  margin-bottom: 2rem;
}

.timeline-line {
  width: 7px;
  background-color: var(--primary-500);
  border-radius: 10px;
  z-index: 0;
}

.timeline-bullet {
  width: 38px;
  height: 38px;
  border-radius: 50px 100px 50px 50px;
  background-color: var(--highlight-500);
  z-index: 10;
}

.timeline-text {
  color: var(--highlight-500);
  font-weight: 600;
}

p{
  color: var(--highlight-500);
}


</style>
