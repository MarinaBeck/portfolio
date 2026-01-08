<script setup lang="ts">

import BlockForm from "@/components/BlockForm.vue";
import {EBlockTypes} from "@/types.ts";
import {ref} from "vue";
import Modal from "@/components/Modal.vue";

const showModel = ref(false);


</script>

<template>
  <BlockForm :type="EBlockTypes.Outline" class="blockF w-full custom-footer-radius pad">

    <div>

      <div>
        <h1>Marina Beck</h1>
        <div>
          <div class="flex gap-4 items-center mb-3 ">
            <div class="liPoints"></div>
            <p>Austria</p>
          </div>

          <div class="flex gap-4 items-center mb-3">
            <div class="liPoints"></div>
            <p>
              &#x6d;&#x61;&#x72;&#x69;&#x6e;&#x61;&#x2e;&#x62;&#x65;&#x63;&#x6b;&#x38;&#x40;&#x67;&#x6d;&#x61;&#x69;&#x6c;&#x2e;&#x63;&#x6f;&#x6d;
            </p>
          </div>

          <div class="flex gap-4 items-center mb-3">
            <div class="liPoints"></div>
            <p>+43 664 4610464</p>
          </div>
        </div>
      </div>

      <div class="mt-8 flex flex-col items-end">
        <img src="/logoS.svg" alt="Logo" id="logo" class="ml-auto" />
        <p class="text-right customText">built with Vue.js using Typescript, HTML and Tailwind CSS</p>
        <button class="ml-auto relative" @click="showModel = true">Impressum</button>
        <Modal v-if="showModel" @close="showModel = false">
          <h1>Impressum</h1>
          <p>Marina Beck</p>
          <p>&#x6d;&#x61;&#x72;&#x69;&#x6e;&#x61;&#x2e;&#x62;&#x65;&#x63;&#x6b;&#x38;&#x40;&#x67;&#x6d;&#x61;&#x69;&#x6c;&#x2e;&#x63;&#x6f;&#x6d;</p>
          <p>Böhmhöf 2</p>
          <p>3910 Zwettl</p>
        </Modal>

        <!-- Icons Info -->
        <p class="info mt-5">Icons from <a href="https://svgrepo.com" target="_blank">svgrepo</a></p>
        <p class="info">Skill-Icons from <a href="https://devicon.dev" target="_blank">Devicon</a></p>
      </div>

    </div>

  </BlockForm>

  <BlockForm :type="EBlockTypes.Filled" class="filledB">
    <p class="text-right"><span>&copy</span> Marina Beck</p>
  </BlockForm>

</template>

<style scoped>

h1{
  margin-bottom: 5%;
}

span{
  color: var(--highlight-500);
}

.pad{
  height: 70vh;
  max-height: 80vh;
  padding: 12% 15%;
}

@media (min-width: 1024px) {
  .pad {
    padding: 5% 10%;
  }

  .filledB > p{
    padding: 0 10%;
  }
}

.custom-footer-radius {
  border-radius: 200px 50px 0px 0px;
}

.liPoints {
  width: 22px;
  height: 22px;
  border-radius: 50px 100px 50px 50px;
  background-color: var(--highlight-500);
  z-index: 10;
}

#logo{
  height: clamp(35px, 2vw, 60px);
  width: auto;
}

.customText{
  font-size: clamp(10px, 16px, 20px);
}

.filledB > p{
  padding: 0 10%;
}

button:hover{
  opacity: 1;
  cursor: pointer;
}

/* Border-Animation */
button::after{
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 1px;
  background-color: var(--highlight-500);
  transition: width 0.3s ease-in-out;
}

button:hover::after{
  width: 100%;
}

.info{
  font-size: clamp(5px, 13px, 18px);
}

</style>