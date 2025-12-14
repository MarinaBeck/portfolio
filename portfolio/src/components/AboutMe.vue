<script setup lang="ts">
import {EBlockTypes} from "@/types.ts";
import BlockForm from "@/components/BlockForm.vue";
</script>

<template>
  <div id="about-me">

    <div  class="flex gap-10 items-stretch">
      <BlockForm :type="EBlockTypes.Outline" :size="'big'">
        <div class="block-content">
          <h1 id="eyeText">Hello,<br> I am Marina</h1>
          <h2>I code. I stay active.</h2>
          <p>Frontend developer with a additional interest in UX / UI Design</p>
        </div>
      </BlockForm>
      <BlockForm :type="EBlockTypes.Filled" :size="'half'" class="image-container">
        <img alt="portrait" src="../assets/portrait.png" />
      </BlockForm>
    </div>
  </div>


</template>

<style scoped>
#about-me{
  padding: 5% 0;
}

#eyeText{
  font-size: clamp(1rem, 5.5rem, 7rem);
}

.block-content{
  padding: 2%;
}

.image-container{
  overflow: visible;
  align-items: flex-end;
}

img{
  width: clamp(200px, 100%, 350px);
  height: auto;
  object-fit: cover;
  border-bottom-left-radius: 50px;
  margin: 0 0 -40px 30%;
  position: relative;
  top: -40px;
}


</style>