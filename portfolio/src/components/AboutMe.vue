<script setup lang="ts">
import {EBlockTypes} from "@/types.ts";
import BlockForm from "@/components/BlockForm.vue";
</script>

<template>
  <div id="about-me">
    <div  class="flex flex-wrap lg:flex-nowrap justify-between items-stretch gap-4">
      <BlockForm :type="EBlockTypes.Outline" :size="'big'" class="w-full lg:w-auto lg:flex-1 my-6">
        <div class="block-content">
          <h1 id="eyeText">Hello,<br> I am Marina</h1>
          <h2>I code. I stay active.</h2>
          <p>Frontend developer with a additional interest in UI | UX Design</p>
        </div>
      </BlockForm>
      <div class="w-full lg:w-auto">
        <h1 class="dev">&lt;<span class="highlightC">WebDeveloper</span>&gt;</h1>
        <BlockForm :type="EBlockTypes.Filled" :size="'half'" class="w-full lg:w-auto image-container">
          <img alt="portrait" src="../assets/portrait.png" />
        </BlockForm>
        <h1 class="text-right dev desktop:mt-9">&lt;/<span class="highlightC">WebDeveloper</span>&gt;</h1>
      </div>
    </div>
  </div>


</template>

<style scoped>
#about-me{
  padding: 5% 0;
}

#eyeText{
  font-size: clamp(0.5rem, 5vw, 7rem);
}

.block-content{
  padding: 2%;
}

.highlightC{
  color: var(--highlight-500);
}

.dev{
  font-size: clamp(0.5rem, 2vw, 2rem);
}

.image-container{
  overflow: visible;
  align-items: flex-end;
}

img{
  width: clamp(200px, 100%, 350px);
  height: auto;
  object-fit: cover;
  border-bottom-left-radius: 75px;
  display: block;
}

@media (min-width: 1024px) {
  img {
    margin-left: 30%;
    top: -40px;
    margin-bottom: -40px;
  }
}


</style>