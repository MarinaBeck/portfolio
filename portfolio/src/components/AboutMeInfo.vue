<script setup lang="ts">

import BlockForm from "@/components/BlockForm.vue";
import {EBlockTypes} from "@/types.ts";
import { House } from 'lucide-vue-next';
import {Cake} from "lucide-vue-next";
import {Earth} from "lucide-vue-next";
import {Play} from "lucide-vue-next";

// hobbies icons
import {Code} from "lucide-vue-next";
import soccer from "../assets/soccer-svgrepo-com.svg";
import running from "../assets/run-svgrepo-com.svg";
import swimming from "../assets/swimming-svgrepo-com.svg";
</script>

<template>

  <h1 id="aboutme">// About Me</h1>

  <div class="flex alignright gap-5">
    <h2>
      I stay active
    </h2>
    <Play class="stroke w-14 h-14"></Play>
  </div>


  <div class="flex flex-wrap max-lg:justify-between ">
    <BlockForm :type="EBlockTypes.Outline" :size="'half'" class="facts w-full lg:w-auto">

      <div>
        <p class="flex max-lg:gap-8 gap-5 text-wrap">
          <House class="icons "></House>
          austria <br> zwettl <br> lower austria
        </p>

        <p class="flex max-lg:gap-8 gap-5 text-wrap">
          <Cake class="icons"></Cake>
          28th October 2005
        </p>

        <p class="flex max-lg:gap-8 gap-5 text-wrap">
          <Earth class="icons"></Earth>
          austrian nationality
        </p>
      </div>

      <!-- list of infos-->
      <ul class="list-none">

        <li class="flex max-lg:gap-8 gap-5">
          <div class="w-5 h-5 "></div>
          german native speaker
        </li>
        <li class="flex max-lg:gap-8 gap-5">
          <div class="w-5 h-5 "></div>
          englisch B2
        </li>
      </ul>
    </BlockForm>

    <!--Hobbies -->
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-7 mx-auto lg:ml-auto lg:mr-0 max-sm:mt-10  ">
      <BlockForm :type="EBlockTypes.Filled" :size="'small'" class="flex flex-col justify-center items-center text-center">
        <Code class="w-20 h-20 mb-10"></Code>
        <p>web development</p>
      </BlockForm>
      <BlockForm :type="EBlockTypes.Filled" :size="'small'" class="flex flex-col justify-center items-center text-center">
        <img alt="soccer Icon" :src="soccer" class="w-20 h-20 mb-10" />
        <p>soccer</p>
      </BlockForm>
      <BlockForm :type="EBlockTypes.Filled" :size="'small'" class="flex flex-col justify-center items-center text-center">
        <img alt="running Icon" :src="running" class="w-20 h-20 mb-10">
        <p>running</p>
      </BlockForm>
      <BlockForm :type="EBlockTypes.Filled" :size="'small'" class="flex flex-col justify-center items-center text-center">
        <img alt="swimming Icon" :src="swimming" class="w-20 h-20 mb-10">
        <p>swimming</p>
      </BlockForm>
    </div>


  </div>


</template>

<style scoped>

h2{
  margin: 2% 0;
  text-align: end;
}

.alignright{
  align-items: center;
  justify-content: end;
}

.stroke{
  stroke: var(--highlight-500);
}

.facts{
  padding: 5%;
}

.facts > div{
  padding-bottom: 7%;
}

.facts > div > p {
  margin: 3% 0;
}

.icons{
  stroke: var(--highlight-500);
  width: 2rem;
  height: 2rem;
}

li{
  padding-top: 2%;
}

li > div{
  background-color: var(--highlight-500);
  border-radius: 50px 100px 50px 50px;
  align-self: center;
}

ul{
  margin: 7% 0;
}


</style>