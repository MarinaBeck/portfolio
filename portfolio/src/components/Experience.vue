<script setup lang="ts">

import {ref} from "vue";

type workOrInt =  "all" |"work" | "internship";

const activeFilter = ref<workOrInt>("all");

</script>

<template>
  <h1>// Experience</h1>

  <div class="flex justify-between mb-10">
    <h2>most recent</h2>
    <div class="filter-wrapper ">
      <label class="filter-label" for="filter">filter</label>

      <select id="filter" v-model="activeFilter" class="filter-select">
        <option value="all">all</option>
        <option value="work">work</option>
        <option value="internship">internship</option>
      </select>
    </div>
  </div>



  <!-- WORK -->
  <div v-if="activeFilter === 'all' || activeFilter === 'work'" class="w-full">

    <!-- LABEL (eigene Zeile) -->
    <p class="greenText mb-4">work</p>

    <!-- CONTENT ROW -->
    <div class="flex w-full items-center">

      <!-- left symbol -->
      <p class="text-[clamp(50px,13vw,15vw)] flex-shrink-0">&lt;</p>

      <!-- textbox -->
      <div class="mx-auto max-w-lg text-left">
        <h2>2 months</h2>
        <p>Web Developer and UX / UI Designer in marketing</p>
        <p>AEP H2 GmbH <br> Linz - Austria</p>
        <p class="descriptions">2025</p>
      </div>

      <!-- right symbol -->
      <p class="text-[clamp(50px,13vw,15vw)] flex-shrink-0">/&gt;</p>
    </div>

  </div>



  <!-- INTERNSHIP -->
  <div v-if="activeFilter === 'all' || activeFilter === 'internship'">
    <p class="greenText">internship</p>
    <div id="internship" class="flex w-full items-center" >

      <!-- Left Symbol -->
      <p class="bigSymbols flex-shrink-0">&lt;</p>

      <!-- Content -->
      <div class="flex-1 max-w-xl mx-auto px-6 text-left">
        <h2>1 month</h2>
        <p>Frontend Web Developer</p>
        <p>fab4minds GmbH <br>
          Vitis - Austria</p>
        <p class="descriptions">2023</p>
      </div>

      <!-- Right Symbol -->
      <p class="bigSymbols flex-shrink-0">/&gt;</p>
    </div>

    <div id="internship" class="flex w-full items-center" >

      <!-- Left Symbol -->
      <p class="bigSymbols flex-shrink-0">&lt;</p>

      <!-- Content -->
      <div class="flex-1 max-w-xl mx-auto px-6 text-left">
        <h2>1 month</h2>
        <p>IT support and network management</p>
        <p>NBG Holding GmbH <br>
          Gmünd - Austria </p>
        <p class="descriptions">2022</p>
      </div>

      <!-- Right Symbol -->
      <p class="bigSymbols flex-shrink-0">/&gt;</p>
    </div>
  </div>

</template>

<style scoped>

h1{
  margin: 7% 0;
}

.bigSymbols{
  font-size: clamp(50px, 13vw, 15vw);
}

.greenText{
  color: var(--highlight-500);
}

.filter-wrapper {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 1rem;
}

/* Label */
.filter-label {
  color: white;
}

/* SELECT */
.filter-select {
  background-color: var(--primary-550);
  border-radius: 20px;
  padding: 0.8rem 2.5rem 0.8rem 1.2rem;
  color: white;
  border: none;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
  appearance: none;
  cursor: pointer;
  font-size: 1rem;
}

/* Arrow */
.filter-wrapper::after {
  content: "▾";
  position: absolute;
  right: 1.2rem;
  pointer-events: none;
  color: white;
}

/* Options (limited styling, browser-dependent) */
.filter-select option {
  background-color: var(--primary-550);
  color: white;
}


</style>