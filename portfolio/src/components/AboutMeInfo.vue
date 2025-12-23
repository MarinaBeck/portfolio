<script setup lang="ts">

import BlockForm from "@/components/BlockForm.vue";
import {EBlockTypes} from "@/types.ts";
import { House } from 'lucide-vue-next';
import {Cake} from "lucide-vue-next";
import {Earth} from "lucide-vue-next";
</script>

<template>
  <h1>// About Me</h1>

  <div class="flex flex-wrap justify-between">
    <BlockForm :type="EBlockTypes.Outline" :size="'half'">

      <div>
        <p class="flex gap-10">
          <House class="icons "></House>
          austria - zwettl lower austria
        </p>

        <p class="flex gap-10">
          <Cake class="icons"></Cake>
          28th October 2005
        </p>

        <p class="flex gap-10">
          <Earth class="icons"></Earth>

        </p>

      </div>


      <!-- list of infos-->
      <ul class="list-none ml-5">

        <li class="flex items-center gap-2">
          <div class="w-5 h-5 "></div>
          german native speaker
        </li>
        <li>englisch B2</li>
      </ul>
    </BlockForm>

    <!--Hobbies -->
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <BlockForm :type="EBlockTypes.Filled" :size="'small'">
        testt
      </BlockForm>
      <BlockForm :type="EBlockTypes.Filled" :size="'small'">
        testt
      </BlockForm>
      <BlockForm :type="EBlockTypes.Filled" :size="'small'">
        testt
      </BlockForm>
      <BlockForm :type="EBlockTypes.Filled" :size="'small'">
        testt
      </BlockForm>

    </div>


  </div>


</template>

<style scoped>

.icons{
  stroke: var(--highlight-500);
  width: 2rem;
  height: 2rem;
}

li > div{
  background-color: var(--highlight-500);
  border-radius: 50px 100px 50px 50px;
}

</style>