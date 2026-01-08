<script setup lang="ts">

import {ref} from "vue";

type workOrInt =  "all" |"work" | "internship";

const activeFilter = ref<workOrInt>("all");

</script>

<template>
  <h1 id="experience">// Experience</h1>

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
      <p class="bigSymbols flex-shrink-0 max-md:hidden">&lt;</p>

      <!-- textbox -->
      <div class="flex-1 max-w-xl mx-auto text-left">
        <h2>2 months</h2>
        <p>Webdesigner in marketing</p>
        <p>AEP H2 GmbH <br> Linz - Austria</p>
        <p class="descriptions">2025</p>
      </div>

      <!-- right symbol -->
      <p class="bigSymbols flex-shrink-0 max-md:hidden">/&gt;</p>
    </div>

  </div>



  <!-- INTERNSHIP -->
  <div v-if="activeFilter === 'all' || activeFilter === 'internship'">
    <p class="greenText mb-4">internship</p>

    <div class="flex w-full items-center" >

      <!-- Left Symbol -->
      <p class="bigSymbols flex-shrink-0 max-md:hidden">&lt;</p>

      <!-- Content -->
      <div class="flex-1 max-w-xl mx-auto text-left">
        <h2>1 month</h2>
        <p>Frontend Web Developer</p>
        <p>fab4minds Informationstechnik GmbH <br>
          Vitis - Austria</p>
        <p class="descriptions">2023</p>
      </div>

      <!-- Right Symbol -->
      <p class="bigSymbols flex-shrink-0 max-md:hidden">/&gt;</p>
    </div>

    <hr class="min-md:hidden mt-5 mb-5">

    <div class="flex w-full items-center" >

      <!-- Left Symbol -->
      <p class="bigSymbols flex-shrink-0 max-md:hidden">&lt;</p>

      <!-- Content -->
      <div class="flex-1 max-w-xl mx-auto text-left">
        <h2>1 month</h2>
        <p>IT support and network management</p>
        <p>NBG Holding GmbH <br>
          Gmünd - Austria </p>
        <p class="descriptions">2022</p>
      </div>

      <!-- Right Symbol -->
      <p class="bigSymbols flex-shrink-0 max-md:hidden">/&gt;</p>
    </div>
  </div>

</template>

<style scoped>

h1{
  margin: 7% 0;
}

.descriptions{
  font-size: 13px;
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

.filter-select option {
  background-color: var(--primary-550);
  color: white;
}



</style>