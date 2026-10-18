
<script setup>
import { motion, useMotionValue, useSpring } from "motion-v";

const props = defineProps({
  active: Boolean,
  label: {
    type: String,
    default: "↓",
  },
});

const mouseX = useMotionValue(-100);
const mouseY = useMotionValue(-100);

const springConfig = {
  stiffness: 150,
  damping: 15,
  mass: 0.5,
};

const x = useSpring(mouseX, springConfig);
const y = useSpring(mouseY, springConfig);

function moveCursor(event) {
  mouseX.set(event.clientX);
  mouseY.set(event.clientY);
}

defineExpose({ moveCursor });
</script>

<template>
  <motion.div
      class="pointer-events-none fixed left-0 top-0 z-[9999]
           flex h-12 w-12 items-center justify-center
           rounded-full "
      :style="{
      x,
      y,
      translateX: '-50%',
      translateY: '-50%',
      backgroundColor: 'var(--color-highlight-500)',
      color: 'var(--color-neutrals-900)',
    }"
      :animate="{
      opacity: active ? 1 : 0,
      scale: active ? 1 : 0.5,
    }"
      :transition="{
      type: 'spring',
      stiffness: 300,
      damping: 15,
    }"
  >
    <span class="text-2xl font-bold">{{ label }}</span>
  </motion.div>
</template>