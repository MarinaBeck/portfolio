<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick } from "vue";

interface EducationCommit {
  hash: string;
  period: string;
  title: string;
  description: string;
  skills: string[];
  files: string[];
}

defineProps<{
  commits: EducationCommit[];
}>();

const hoveredCommit = ref<EducationCommit | null>(null);

const mouseX = ref(0);
const mouseY = ref(0);
const cursorVisible = ref(false);

const cursorScale = ref(1);
const cursorRotation = ref(0);
const isMoving = ref(false);

const viewportWidth = ref(1024);
const viewportHeight = ref(768);

// Scroll animation
const educationSection = ref<HTMLElement | null>(null);
const isVisible = ref(false);
const animationReady = ref(false);

let sectionObserver: IntersectionObserver | undefined;

let previousX = 0;
let previousY = 0;
let previousTime = 0;
let lastMovementTime = 0;

let rotationVelocity = 0;
let animationFrame: number | null = null;

function updateViewport() {
  viewportWidth.value = window.innerWidth;
  viewportHeight.value = window.innerHeight;
}

function onMouseMove(event: MouseEvent) {
  const now = performance.now();

  mouseX.value = event.clientX;
  mouseY.value = event.clientY;
  cursorVisible.value = true;

  if (previousTime > 0) {
    const deltaTime = Math.max(now - previousTime, 1);
    const deltaX = event.clientX - previousX;
    const deltaY = event.clientY - previousY;

    const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2);
    const speed = distance / deltaTime;
    const intensity = Math.min(speed / 1.5, 1);

    // Größer bei schneller Bewegung
    cursorScale.value = 1 + intensity * 0.25;

    // Drehung abhängig von horizontaler Bewegung
    rotationVelocity = deltaX * 0.8;

    if (distance > 0) {
      isMoving.value = true;
      lastMovementTime = now;
    }
  } else {
    lastMovementTime = now;
  }

  previousX = event.clientX;
  previousY = event.clientY;
  previousTime = now;
}

function animateCursor() {
  const now = performance.now();

  // Nach kurzer Ruhephase vom Bewegungsmodus ins Pulsieren wechseln
  if (now - lastMovementTime > 120) {
    isMoving.value = false;
  }

  // Drehung durch Mausbewegung mit sanftem Nachlaufen
  cursorRotation.value += rotationVelocity;
  rotationVelocity *= 0.9;

  if (Math.abs(rotationVelocity) < 0.05) {
    rotationVelocity = 0;
  }

  if (isMoving.value) {
    // Beim Bewegen auf normale Größe zurückfedern
    cursorScale.value += (1 - cursorScale.value) * 0.08;
  } else {
    // Bei Stillstand sanft pulsieren
    const pulse = 1 + Math.sin(now / 250) * 0.08;
    cursorScale.value += (pulse - cursorScale.value) * 0.12;
  }

  animationFrame = requestAnimationFrame(animateCursor);
}

function onMouseLeave() {
  hoveredCommit.value = null;
  cursorVisible.value = false;

  previousTime = 0;
  lastMovementTime = 0;
  rotationVelocity = 0;

  cursorScale.value = 1;
  cursorRotation.value = 0;
  isMoving.value = false;
}

onMounted(async () => {
  updateViewport();

  window.addEventListener("resize", updateViewport);
  animationFrame = requestAnimationFrame(animateCursor);

  await nextTick();

  const element = educationSection.value;

  if (!element) return;

  // Bei reduzierter Bewegung direkt anzeigen
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    isVisible.value = true;
    return;
  }

  // Animation erst nach Einrichtung des Elements aktivieren
  animationReady.value = true;

  sectionObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          isVisible.value = true;

          // Animation nur einmal auslösen
          sectionObserver?.disconnect();
        }
      },
      {
        threshold: 0,
        rootMargin: "0px 0px -10% 0px",
      },
  );

  sectionObserver.observe(element);
});

onUnmounted(() => {
  window.removeEventListener("resize", updateViewport);

  if (animationFrame !== null) {
    cancelAnimationFrame(animationFrame);
  }

  sectionObserver?.disconnect();
});
</script>

<template>
  <div
      ref="educationSection"
      class="mx-auto flex w-fit flex-col font-mono text-sm leading-relaxed"
      :class="{
      'education-reveal': animationReady,
      'education-reveal-visible': isVisible,
    }"

      id="education"
  >
    <!-- Command -->
    <p class="mb-6 break-words muted-text-50">
      <span class="muted-text-50">$</span>
      git log --oneline --education
    </p>

    <!-- Git History -->
    <div
        v-for="(commit, index) in commits"
        :key="commit.hash"
        class="cursor-none"
        @mouseenter="hoveredCommit = commit"
        @mousemove="onMouseMove"
        @mouseleave="onMouseLeave"
    >
      <!-- Commit hash -->
      <div class="flex gap-3">
        <span class="text-neutral-50">*</span>

        <span class="text-highlight-500">
          {{ commit.hash }}
        </span>

        <span v-if="index === 0" class="text-highlight-500">
          (HEAD -> current)
        </span>
      </div>

      <!-- Timeline -->
      <div class="ml-1 flex gap-5">
        <!-- Dashed line -->
        <div
            class="ml-[3px] w-px shrink-0 self-stretch border-l-2 border-dashed border-neutral-600"
        ></div>

        <!-- Commit content -->
        <div class="min-w-0 flex-1">
          <p class="text-neutral-400">
            {{ commit.period }}
          </p>

          <h3 class="font-bold text-neutral-100">
            {{ commit.title }}
          </h3>

          <p class="whitespace-pre-line text-neutral-400">
            {{ commit.description }}
          </p>

          <p
              v-for="skill in commit.skills"
              :key="skill"
              class="break-words text-neutral-200"
          >
            <span class="text-highlight-500">+</span>
            {{ skill }}
          </p>

          <p class="break-words text-neutral-700 mb-5">
            {{ commit.files.length }} files changed:
            <span class="text-neutral-700">
              {{ commit.files.join(" | ") }}
            </span>
          </p>
        </div>
      </div>
    </div>
  </div>

  <!-- Hover card and custom image cursor -->
  <Teleport to="body">
    <!-- Image cursor -->
    <img
        v-if="cursorVisible && hoveredCommit"
        src="/circle-svgrepo-com.svg"
        alt=""
        aria-hidden="true"
        class="custom-cursor pointer-events-none fixed z-[10000] h-12 w-12"
        :style="{
        left: `${mouseX - 20}px`,
        top: `${mouseY - 20}px`,
        transform: `scale(${cursorScale}) rotate(${cursorRotation}deg)`,
      }"
    />

    <!-- Hover card -->
    <Transition name="hover-card">
      <div
          v-if="hoveredCommit"
          class="pointer-events-none fixed z-[9999] w-72 lg:w-[43vw] max-w-[calc(100vw-1rem)] rounded-lg border border-neutral-700 bg-neutral-900 p-4 font-mono text-xs leading-relaxed shadow-xl"
          :style="{
          left: `${Math.max(
            8,
            Math.min(mouseX + 20, viewportWidth - 304),
          )}px`,
          top: `${Math.max(
            8,
            Math.min(mouseY + 20, viewportHeight - 320),
          )}px`,
        }"
      >

        <h3 class="mb-0.5 font-bold font-heading tracking-[-10%]  text-neutral-100">
          {{ hoveredCommit.title }}
        </h3>

        <p class=" text-neutral-400">
          {{ hoveredCommit.period }}
        </p>

        <p class="mb-3 whitespace-pre-line text-neutral-400">
          {{ hoveredCommit.description }}
        </p>

        <!-- Skills -->
        <div class="mb-3">
          <p class="mb-1 text-highlight-500">
            Skills
          </p>

          <p
              v-for="skill in hoveredCommit.skills"
              :key="skill"
              class="break-words text-neutral-300"
          >
            <span class="text-highlight-500">+</span>
            {{ skill }}
          </p>
        </div>

      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
/* Scroll animation */
.education-reveal {
  opacity: 0;
  clip-path: inset(0 0 100% 0);
  transform: translateY(-20px);
  transition:
      clip-path 2s cubic-bezier(0.22, 1, 0.36, 1),
      opacity 1.5s ease,
      transform 1.8s cubic-bezier(0.22, 1, 0.36, 1);
}

.education-reveal-visible {
  opacity: 1;
  clip-path: inset(0 0 0 0);
  transform: translateY(0);
}

/* Custom cursor */
.custom-cursor {
  transform-origin: center;
  will-change: transform;
}

/* Hover card transition */
.hover-card-enter-active,
.hover-card-leave-active {
  transition:
      opacity 120ms ease,
      transform 120ms ease;
}

.hover-card-enter-from,
.hover-card-leave-to {
  opacity: 0;
  transform: translateY(4px);
}

/* Accessibility */
@media (prefers-reduced-motion: reduce) {
  .education-reveal {
    opacity: 1;
    clip-path: none;
    transform: none;
    transition: none;
  }

  .hover-card-enter-active,
  .hover-card-leave-active {
    transition: none;
  }
}
</style>