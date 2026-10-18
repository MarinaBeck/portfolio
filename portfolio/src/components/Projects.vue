<script setup lang="ts">
import {ref} from "vue";
import {motion} from "motion-v";

import nextUp from "../assets/NextUp.png";
import newWork from "../assets/newWork.png";

interface Project {
  title: string;
  stats: string[];
  description: string;
  image: string;
  technologies: string[];
  link?: string;
  year?: string;
}

const projects: Project[] = [
  {
    title: "New Work Website",
    stats: ["group of five", "semester project", "development"],
    description:
        "I was part of the development team in a group of five students. While three of us built the website, two took care of the design. The project was centred on the specific requirements of the New Work theme.",
    image: newWork,
    technologies: ["React", "JavaScript"],
    link: "https://new-work-projekt.netlify.app/",
    year: "2025",
  },
  {
    title: "NextUp",
    stats: ["group of 3", "semester project", "UI / UX - Design"],
    description:
        "A Design created for a concert rating App. A Concept conducted with 2 other students in a group project",
    image: nextUp,
    technologies: ["Figma", "User Interviews", "UI / UX Design"],
    link: "https://www.figma.com/design/0bx0c1y5zHEUMziLb9u5E2/NextUp--Copy-?node-id=262-622&t=zTRCXYdhp7D6s30S-1",
    year: "2025",
  }
];

const carousel = ref<HTMLElement | null>(null);
const isDragging = ref(false);
const startX = ref(0);
const scrollStart = ref(0);
let dragMoved = false;
const DRAG_THRESHOLD = 5;

function onPointerDown(event: PointerEvent) {
  if (event.pointerType !== "mouse" || event.button !== 0) return;

  const element = carousel.value;
  if (!element) return;

  isDragging.value = true;
  dragMoved = false;
  startX.value = event.clientX;
  scrollStart.value = element.scrollLeft;
}

function onPointerMove(event: PointerEvent) {
  const element = carousel.value;
  if (!element || !isDragging.value) return;

  const distance = event.clientX - startX.value;

  // Capture erst starten, wenn wirklich gezogen wird
  if (!dragMoved && Math.abs(distance) > DRAG_THRESHOLD) {
    dragMoved = true;
    element.classList.add("is-dragging");
    element.setPointerCapture(event.pointerId);
  }

  if (dragMoved) {
    element.scrollLeft = scrollStart.value - distance;
  }
}

function onPointerUp() {
  isDragging.value = false;
  carousel.value?.classList.remove("is-dragging");
}

function onLinkClick(event: MouseEvent) {
  if (dragMoved) {
    event.preventDefault();
    dragMoved = false;
    return;
  }

  dragMoved = false;
}
</script>

<template>
  <div class="flex flex-row justify-between pt-20" id="projects">
    <h1 class="text-body text-highlight-500">projects</h1>
    <a class="text-body text-highlight-500" >{</a>
  </div>

  <section
      class="flex min-h-[70vh] w-full min-w-0 flex-col justify-center py-8 md:py-12"
  >
    <!-- Horizontales Carousel -->
    <div
        ref="carousel"
        class="projects-carousel flex items-stretch gap-5
             overflow-x-auto overflow-y-hidden pb-4
             md:gap-7"
        @pointerdown="onPointerDown"
        @pointermove="onPointerMove"
        @pointerup="onPointerUp"
        @pointercancel="onPointerUp"
        @lostpointercapture="onPointerUp"
    >
      <motion.article
          v-for="(project, index) in projects"
          :key="project.title"
          class="group relative flex w-[82vw] max-w-[60%] shrink-0 flex-col self-stretch"
          :initial="{ opacity: 0, y: 24 }"
          :while-in-view="{ opacity: 1, y: 0 }"
          :in-view-options="{ once: true, amount: 0.15 }"
          :transition="{
            duration: 0.5,
            delay: index * 0.08,
            ease: 'easeOut',
          }"
      >
        <!-- Link deckt die ganze Karte ab -->
        <a
            v-if="project.link"
            :href="project.link"
            target="_blank"
            rel="noopener noreferrer"
            class="absolute inset-0 z-10"
            :aria-label="`${project.title} öffnen`"
            @click="onLinkClick"
        />

        <!-- Projektbild -->
        <div
            class="relative aspect-[4/3] shrink-0 overflow-hidden
           rounded-xl border border-neutrals-800 bg-primary-600 max-h-[50vh]"
        >
          <img
              :src="project.image"
              :alt="`Vorschau von ${project.title}`"
              class="size-full object-cover transition-transform
             duration-500 group-hover:scale-105"
              loading="lazy"
              draggable="false"
          />

          <span
              class="absolute left-4 top-4 rounded-full
             border border-neutrals-800 bg-primary-600/90
             px-3 py-1 font-mono text-xs text-neutrals-500"
          >
            {{ project.year ?? `0${index + 1}` }}
          </span>
        </div>

        <!-- Projektbeschreibung -->
        <div class="flex flex-1 flex-col pt-5">
          <div class="mb-0.5 flex items-start justify-between gap-3 font-h1">
            <h3
                class="min-w-0 break-words text-neutrals-500
               transition-colors duration-200
               group-hover:text-highlight-600"
            >
              {{ project.title }}
            </h3>

            <span
                class="shrink-0 font-mono text-sm text-neutrals-600"
                aria-hidden="true"
            >
              {{ String(index + 1).padStart(2, "0") }}
            </span>
          </div>

          <div class="flex flex-wrap gap-2 pt-0.5 pb-7 muted-text-50 reveal font-h1 tracking-tighter">
            {
            <span
                v-for="(stat, statIndex) in project.stats"
                :key="statIndex"
                class="text-sm"
            >
              {{ stat }}<span v-if="statIndex < project.stats.length - 1">, </span>
            </span>
            }
          </div>

          <p class="text-sm leading-relaxed text-neutrals-300 pt-1 pb-1">
            {{ project.description }}
          </p>

          <!-- Technologien -->
          <div class="mt-auto flex flex-wrap gap-2 pt-5">
            <span
                v-for="technology in project.technologies"
                :key="technology"
                class="rounded-full border border-neutrals-800
               bg-primary-600 px-3 py-1
               text-xs text-neutrals-500"
            >
              {{ technology }}
            </span>
          </div>
        </div>
      </motion.article>
    </div>
  </section>

  <span class="text-body text-highlight-500">}</span>
</template>

<style scoped>
.projects-carousel {
  scrollbar-width: thin;
  scrollbar-color: var(--color-primary-400) transparent;
  overscroll-behavior-x: contain;
  -webkit-overflow-scrolling: touch;
  cursor: grab;
}

.projects-carousel::-webkit-scrollbar {
  height: 5px;
}

.projects-carousel::-webkit-scrollbar-track {
  background: transparent;
}

.projects-carousel::-webkit-scrollbar-thumb {
  background: var(--color-primary-400);
  border-radius: 9999px;
}

.projects-carousel.is-dragging {
  cursor: grabbing;
  user-select: none;
}

.projects-carousel.is-dragging img {
  pointer-events: none;
}

.projects-carousel article {
  user-select: none;
}

@media (prefers-reduced-motion: reduce) {
  .projects-carousel img {
    transition: none;
  }
}
</style>