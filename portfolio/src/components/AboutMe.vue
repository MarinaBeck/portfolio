<script setup lang="ts">
import { onMounted, onUnmounted, ref, nextTick } from "vue";
import { useMotion } from "@vueuse/motion";

import FloatingCursor from "@/components/hover/FloatingCursor.vue";
import { useFloatingCursor } from "@/composables/useFloatingCursor";

const sections = [
  { title: "about", number: "01", id: "about" },
  { title: "education", number: "02", id: "education" },
  { title: "projects", number: "03", id: "projects" },
  { title: "experience", number: "04", id: "experience" },
  { title: "contact", number: "05", id: "contact" },
];

const {
  active: cursorActive,
  cursor,
  onEnter: onCursorEnter,
  onLeave: onCursorLeave,
} = useFloatingCursor();

// Separater Cursor für die Navigation
const {
  active: navCursorActive,
  cursor: navCursor,
  onEnter: onNavCursorEnter,
  onLeave: onNavCursorLeave,
} = useFloatingCursor();

const activeNavNumber = ref("");

const sectionRefs = ref<HTMLElement[]>([]);

// Dynamische Pfeile ohne repeat()
const arrowContainer = ref<HTMLElement | null>(null);
const arrows = ref<string[]>([]);
const typedCount = ref(0);

let typewriterInterval: ReturnType<typeof setInterval> | undefined;

onMounted(async () => {
  await nextTick();

  if (arrowContainer.value) {
    const containerWidth = arrowContainer.value.clientWidth;
    const fontSize = parseFloat(
        getComputedStyle(arrowContainer.value).fontSize,
    );

    // Ungefähre Breite eines Zeichens
    const arrowWidth = fontSize * 0.6;
    const arrowCount = Math.max(
        0,
        Math.floor(containerWidth / arrowWidth),
    );

    // Pfeile einzeln erzeugen
    arrows.value = [];

    for (let i = 0; i < arrowCount; i++) {
      arrows.value.push(">");
    }

    // Einmalige Typewriter-Animation
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
  }

  // Section-Animationen initialisieren
  sections.forEach((_, i) => {
    const el = sectionRefs.value[i];

    if (el) {
      useMotion(el, {
        initial: {
          opacity: 0.3,
          x: -50,
        },
        enter: {
          opacity: 1,
          x: 0,
          transition: {
            duration: 600,
            delay: i * 100,
          },
        },
      });
    }
  });
});

onUnmounted(() => {
  if (typewriterInterval) {
    clearInterval(typewriterInterval);
  }
});

function enterNav(sectionNumber: string) {
  activeNavNumber.value = sectionNumber;
  onNavCursorEnter();
}

function leaveNav() {
  onNavCursorLeave();
  activeNavNumber.value = "";
}








</script>

<template>
  <div id="about-me">
    <div class="flex flex-nowrap lg:gap-20 md:gap-20 sm:gap-5">
      <div class="w-full lg:w-auto sm:w-xs flex flex-col justify-evenly">
        <!-- Developer + dynamische Pfeile -->
        <div class="developer-row">
          <h1 class="dev whitespace-nowrap">
            &lt;<span class="highlightC">Developer</span>&gt;
          </h1>

          <span
              ref="arrowContainer"
              class="typewriter font-heading text-secondary-900"
          >
            <template v-for="(arrow, i) in arrows" :key="i">
              <span v-if="i < typedCount">{{ arrow }}</span>
            </template>
            <span class="typewriter-caret">_</span>
          </span>
        </div>

        <img alt="portrait" src="../assets/portrait.png" />

        <h1 class="text-right dev desktop:mt-9">
          &lt;/<span class="highlightC">Developer</span>&gt;
        </h1>
      </div>

      <!-- Navigation -->
      <nav
          class="nav-sections sm:flex-[0_1_80%] lg:flex-[0_1_70vw] flex-[0_1_80%]"
      >
        <a
            v-for="(section, i) in sections"
            :key="section.number"
            :href="`#${section.id}`"
            :ref="
      (el) => {
        if (el) sectionRefs[i] = el as HTMLElement;
      }
    "
            class="nav-section"
            @pointerenter="enterNav(section.number)"
            @pointerleave="leaveNav"
        >
          <span class="section-title sm:text-[clamp(3.5rem,8vw,6rem)] md:text-[clamp(4.5rem,9vw,6.5rem)] lg:text-[clamp(7.5rem,12vw,8.5rem)] text-[clamp(3.5rem,8vw,6rem)]">
            {{ section.title }}
          </span>

          <span class="section-number">{{ section.number }}</span>
        </a>
      </nav>
    </div>

    <!-- Scroll cursor -->
    <a
        class="flex flex-row items-center justify-between gap-4 pt-8 cursor-none"
        @pointerenter="onCursorEnter"
        @pointerleave="onCursorLeave"
        href="#about"
    >
      <span class="font-heading">scroll</span>

      <img
          src="../assets/arrow-down-circle-svgrepo-com.svg"
          alt="scroll"
          class="max-w-[5vw] scroll-icon"
      />

      <FloatingCursor
          ref="cursor"
          :active="cursorActive"
          label="↓"
      />
    </a>

    <!-- Nummerierter Floating Cursor für die Navigation -->
    <FloatingCursor
        ref="navCursor"
        :active="navCursorActive"
        :label="activeNavNumber"
    />
  </div>
</template>

<style scoped>
#about-me {
  height: 100vh;
  overflow-y: visible;
}

.highlightC {
  color: var(--color-highlight-500);
}

.dev {
  font-size: clamp(0.5rem, 2vw, 2rem);
  letter-spacing: 0;
  margin: 0;
  flex-shrink: 0;
}

.developer-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
  min-width: 0;
}

img {
  width: clamp(200px, 100%, 350px);
  height: auto;
  object-fit: cover;
  border-bottom-left-radius: 10px;
  display: block;
}

/* Typewriter */
.typewriter {
  display: block;
  flex: 1;
  min-width: 0;
  overflow: hidden;
  white-space: nowrap;
  font-size: clamp(0.5rem, 2vw, 2rem);
  letter-spacing: 0;
  line-height: 1.2;
}

.typewriter-caret {
  color: var(--color-highlight-500);
  animation: blink 0.8s step-end infinite;
}

@keyframes blink {
  50% {
    opacity: 0;
  }
}

/* Linker Bereich */
#about-me > div > div:first-child {
  max-width: 40vw;
  flex: 0 1 40vw;
}

/* Navigation */
.nav-sections {
  padding-top: 10vh;
  padding-right: 2vw;
  display: flex;
  flex-direction: column;
  gap: 5%;
  height: 70vh;
  overflow-y: scroll;
  scrollbar-width: none;
  -ms-overflow-style: none;
  scroll-behavior: smooth;
}

.nav-sections::-webkit-scrollbar {
  display: none;
}

.nav-section {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding-right: 2%;
  cursor: none;
}

/* Nav-Link mit sanfter Bewegung nach links */
.section-title {
  margin: 0;
  color: var(--color-neutrals-500);
  font-weight: 400;
  line-height: 1.1;
  display: block;
  letter-spacing: var(--h2-letter-spacing);
  opacity: 0.5;
  transform: translateX(0) scale(1);
  transform-origin: right center;
  transition:
      opacity 0.4s ease,
      transform 0.5s cubic-bezier(0.22, 1, 0.36, 1);
  cursor: none;
}

.nav-section:hover .section-title {
  opacity: 1;
  transform: translateX(-12px) scale(1.1);
}

.section-number {
  font-size: 0.75rem;
  color: var(--color-neutrals-600);
  font-family: var(--font-h1);
  letter-spacing: 2px;
  white-space: nowrap;
  flex-shrink: 0;
}

.scroll-icon {
  cursor: none;
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(10px);
  }
}

@media (prefers-reduced-motion: reduce) {
  .typewriter-caret {
    animation: none;
  }

  .scroll-icon {
    animation: none;
  }

  .section-title {
    transition: none;
  }
}
</style>