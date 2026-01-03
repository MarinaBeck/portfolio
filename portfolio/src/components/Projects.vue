<script setup lang="ts">

import BlockForm from "@/components/BlockForm.vue";
import {EBlockTypes} from "@/types.ts";
</script>

<template>
  <h1 id="projects">// Projects</h1>

  <div class="flex  gap-10">
    <BlockForm :type="EBlockTypes.Outline" size="half" class="max-md:w-full max-lg:w-auto blockf">
      NextUp Project
    </BlockForm>
    <BlockForm :type="EBlockTypes.Outline" size="half" class="max-md:w-full max-lg:w-auto blockf">
      Agile Project Management Project
    </BlockForm>
  </div>


</template>

<style scoped>
h1{
  margin: 5% 0;
}

div{
  margin-bottom: 5%;
  max-width: 100vw;
}


@media(max-width: 1025px){
  div{
    flex-wrap: wrap;
    max-width: 100vw;
  }
}
</style>