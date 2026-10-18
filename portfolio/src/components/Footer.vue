<script setup lang="ts">

import BlockForm from "@/components/BlockForm.vue";
import {EBlockTypes} from "@/types.ts";
import {ref, onMounted, onUnmounted, nextTick} from "vue";
import Modal from "@/components/Modal.vue";

const showModel = ref(false);

// Typewriter-Pfeilzeile
const arrowContainer = ref<HTMLElement | null>(null);
const arrows = ref<string[]>([]);
const typedCount = ref(0);

let typewriterInterval: ReturnType<typeof setInterval> | undefined;
let observer: IntersectionObserver | undefined;
let hasStarted = false;

const startTypewriter = () => {
  if (hasStarted || !arrowContainer.value) return;

  hasStarted = true;

  const containerWidth = arrowContainer.value.clientWidth;
  const fontSize = parseFloat(
      getComputedStyle(arrowContainer.value).fontSize,
  );

  const arrowWidth = fontSize * 0.6;
  const arrowCount = Math.max(
      0,
      Math.floor(containerWidth / arrowWidth),
  );

  arrows.value = Array(arrowCount).fill(">");

  typewriterInterval = setInterval(() => {
    if (typedCount.value < arrows.value.length) {
      typedCount.value++;
    } else {
      if (typewriterInterval) {
        clearInterval(typewriterInterval);
        typewriterInterval = undefined;
      }
    }
  }, 70);
};

onMounted(async () => {
  await nextTick();

  if (!arrowContainer.value) return;

  observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];

        if (entry?.isIntersecting) {
          startTypewriter();
          observer?.disconnect();
        }
      },
      {
        threshold: 0.2,
      },
  );

  observer.observe(arrowContainer.value);
});

onUnmounted(() => {
  observer?.disconnect();

  if (typewriterInterval) {
    clearInterval(typewriterInterval);
    typewriterInterval = undefined;
  }
});





const openMail = () => {
  const hex = "6d6172696e612e6265636b3840676d61696c2e636f6d";

  const email = hex
      .match(/.{1,2}/g)!
      .map((byte) => String.fromCharCode(parseInt(byte, 16)))
      .join("");

  // Gmail direkt beim Klick öffnen
  window.open(
      `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(email)}`,
      "_blank",
      "noopener,noreferrer",
  );
};

</script>

<template>
  <!-- Typewriter-Pfeilzeile -->
  <div
      ref="arrowContainer"
      class="arrow-container typewriter font-heading text-secondary-900 pt-10"
  >
    <template v-for="(arrow, i) in arrows" :key="i">
      <span v-if="i < typedCount">{{ arrow }}</span>
    </template>

    <span class="typewriter-caret">_</span>
  </div>

  <div class="flex flex-col items-end   font-h2 pt-20 pb-20">
    <p class="muted-text-50 reveal">
      //
      <a target="_blank" @click.prevent="openMail"
         rel="noopener noreferrer" href="&#x6d;&#x61;&#x69;&#x6c;&#x74;&#x6f;&#x3a;&#x6d;&#x61;&#x72;&#x69;&#x6e;&#x61;&#x2e;&#x62;&#x65;&#x63;&#x6b;&#x38;&#x40;&#x67;&#x6d;&#x61;&#x69;&#x6c;&#x2e;&#x63;&#x6f;&#x6d;">&#x6d;&#x61;&#x72;&#x69;&#x6e;&#x61;&#x2e;&#x62;&#x65;&#x63;&#x6b;&#x38;&#x40;&#x67;&#x6d;&#x61;&#x69;&#x6c;&#x2e;&#x63;&#x6f;&#x6d;</a>
    </p>

    <p class="muted-text-50  reveal">
      //
      <a href="&#x74;&#x65;&#x6c;&#x3a;&#x2b;&#x34;&#x33;&#x36;&#x36;&#x34;&#x34;&#x36;&#x31;&#x30;&#x34;&#x36;&#x34;">&#x2b;&#x34;&#x33;&#x20;&#x36;&#x36;&#x34;&#x20;&#x34;&#x36;&#x31;&#x30;&#x34;&#x36;&#x34;</a>
    </p>

    <div class="flex gap-1">
      <a href ="https://github.com/MarinaBeck" class="muted-text-50  reveal"> // github </a>
    </div>
  </div>




</template>

<style scoped>



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
  background-color: var(--color-highlight-500);
  transition: width 0.3s ease-in-out;
}

button:hover::after{
  width: 100%;
}

.info{
  font-size: clamp(5px, 13px, 18px);
}

/* Typewriter-Pfeilzeile */
.arrow-container {
  width: 65%;
  min-width: 0;
  font-size: clamp(0.5rem, 2vw, 2rem);
  line-height: 1.2;
}

.typewriter {
  display: block;
  overflow: hidden;
  white-space: nowrap;
  letter-spacing: 0;
}

.typewriter-caret {
  color: var(--color-secondary-900);
  animation: blink 0.8s step-end infinite;
}

@keyframes blink {
  50% {
    opacity: 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  .typewriter-caret {
    animation: none;
  }
}

</style>