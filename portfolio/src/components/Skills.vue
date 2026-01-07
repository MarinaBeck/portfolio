<script setup lang="ts">

//imports

import {ref, onMounted, computed} from "vue";
import BlockForm from "@/components/BlockForm.vue";
import {EBlockTypes} from "@/types.ts";
import adobeIllustrator from "../assets/adobeIllustrator.webp";
import adobeIndesign from "../assets/adobeIndesign.webp";
import adobePhotoshop from "../assets/adobePhotoshop.webp";
import css3 from "../assets/css3.webp";
import docker from "../assets/docker.webp";
import html from "../assets/html5.webp";
import javascript from "../assets/javascript.webp";
import typescript from "../assets/typescript.webp";
import vuejs from "../assets/vuejs.webp";
import tailwindcss from "../assets/tailwind.webp";
import figma from "../assets/figma-color.png";
import react from "../assets/react.svg";

// slider

const slider = ref<HTMLDivElement | null>(null);

const isDragging = ref(false);
const startX = ref(0);
const scrollLeft = ref(0);

const onMouseDown = (e: MouseEvent) => {
  if (!slider.value) return;

  isDragging.value = true;
  isAutoScrolling.value = false; // pause auto scrolling
  slider.value.classList.add("dragging");

  startX.value = e.pageX - slider.value.offsetLeft;
  scrollLeft.value = slider.value.scrollLeft;
};


const onMouseMove = (e: MouseEvent) => {
  if (!isDragging.value || !slider.value) return;

  e.preventDefault();

  const x = e.pageX - slider.value.offsetLeft;
  const walk = (x - startX.value) * 1.5; // Drag-Speed
  slider.value.scrollLeft = scrollLeft.value - walk;
};

const onMouseUp = () => {
  if (!slider.value) return;

  isDragging.value = false;
  slider.value.classList.remove("dragging");
};

const onTouchStart = (e: TouchEvent) => {
  if (!slider.value) return;

  const touch = e.touches[0];
  if (!touch) return;

  startX.value = touch.pageX;
  scrollLeft.value = slider.value.scrollLeft;
};

const onTouchMove = (e: TouchEvent) => {
  if (!slider.value) return;

  const touch = e.touches[0];
  if (!touch) return;

  const walk = (touch.pageX - startX.value) * 1.5;
  slider.value.scrollLeft = scrollLeft.value - walk;
};


const onTouchEnd = () => {
  isDragging.value = false;
};


const isAutoScrolling = ref(true);
let animationId: number | null = null;
let scrollAccumulator = 0;

const AUTO_SCROLL_SPEED = 0.4; // px pro Frame

const autoScroll = () => {
  if (!slider.value) return;

  if (isAutoScrolling.value && !isDragging.value) {
    scrollAccumulator += AUTO_SCROLL_SPEED;

    // Nur scrollen wenn mindestens 1 Pixel akkumuliert wurde
    if (scrollAccumulator >= 1) {
      const scrollAmount = Math.floor(scrollAccumulator);
      slider.value.scrollLeft += scrollAmount;
      scrollAccumulator -= scrollAmount;

      // Endlos-Loop: Wenn am Ende, zurück zum Anfang
      const maxScroll = slider.value.scrollWidth - slider.value.clientWidth;
      if (slider.value.scrollLeft >= maxScroll) {
        slider.value.scrollLeft = 0;
      }
    }
  }

  animationId = requestAnimationFrame(autoScroll);
};

onMounted(() => {
  autoScroll();
})


// image sources for the blockform skills

const skillImages = [
  html,
  css3,
  figma,
  tailwindcss,
  javascript,
  typescript,
  vuejs,
  react,
  docker,
  adobeIllustrator,
  adobeIndesign,
  adobePhotoshop,
];
</script>

<template>
  <h2 class="text-right">(...MySkills)</h2>

  <div class="relative flex items-center ">
    <div class="whiteLine"></div>

    <!-- Slider -->
    <div
        ref="slider"
        class="slider p-5 px-4 sm:px-8 lg:px-14
         flex gap-5
         overflow-x-auto
         cursor-grab
         relative z-10"
        @mousedown="onMouseDown"
        @mousemove="onMouseMove"
        @mouseup="onMouseUp"
        @mouseleave="() => { onMouseUp(); isAutoScrolling = true }"
        @touchstart="onTouchStart"
        @touchmove="onTouchMove"
        @touchend="onTouchEnd"
    >

      <div v-for="(image, index) in skillImages"
           :key="index"
           class="max-md:min-w-64 flex items-center justify-center">
        <BlockForm
            :type="EBlockTypes.Filled"
            :size="'small'"
            :class="index % 2 === 1 ? 'outlined-wrapper' : ''"
            class="max-md:min-w-64"
        >
          <img v-if="image" :src="image" alt="skill icon"/>
        </BlockForm>

      </div>

    </div>
  </div>

</template>

<style scoped>

img {
  scale: 0.9;
}

.outlined-wrapper {
  outline: 5px solid var(--primary-400);
  outline-offset: -3px;
}

h2 {
  margin: 7% 0 2% 0;
}


.whiteLine {
  background-color: var(--primary-10);
  height: 40px;
  width: 100%;
  position: absolute;
  z-index: 0;
}

.slider {
  user-select: none;
  scrollbar-width: none;
}


.slider::-webkit-scrollbar {
  display: none;
}

.dragging {
  cursor: grabbing;
}

</style>