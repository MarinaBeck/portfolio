<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import Terminal_Block from "@/components/Terminal_Block.vue";
import Education from "@/components/Education.vue";
import Skills from "@/components/Skills.vue";

const left = ">>>>>>>>";
const title = "README.md";
const right = ">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>";

const fullText = left + title + right;
const count = ref(0);

const typewriterElement = ref<HTMLElement | null>(null);
const topArrowLineElement = ref<HTMLElement | null>(null);
const arrowLineElement = ref<HTMLElement | null>(null);
const headingElement = ref<HTMLElement | null>(null);

// Terminal scroll animation
const terminalSectionElement = ref<HTMLElement | null>(null);
const terminalsVisible = ref(false);

const topArrowLine = ref("");
const arrowLine = ref("");

const helloText = "Hello,";
const nameText = "I am Marina ;";
const headingCount = ref(0);
const headingStarted = ref(false);

const headingText = helloText + nameText;

let interval: ReturnType<typeof setInterval> | undefined;
let topArrowInterval: ReturnType<typeof setInterval> | undefined;
let arrowInterval: ReturnType<typeof setInterval> | undefined;
let headingInterval: ReturnType<typeof setInterval> | undefined;

let observer: IntersectionObserver | undefined;
let topArrowObserver: IntersectionObserver | undefined;
let arrowObserver: IntersectionObserver | undefined;
let headingObserver: IntersectionObserver | undefined;
let terminalObserver: IntersectionObserver | undefined;

function startArrowAnimation(
    element: HTMLElement,
    target: typeof arrowLine,
    setIntervalRef: (
        value: ReturnType<typeof setInterval> | undefined,
    ) => void,
) {
  const styles = getComputedStyle(element);
  const fontSize = parseFloat(styles.fontSize);
  const letterSpacing = parseFloat(styles.letterSpacing) || 0;
  const arrowWidth = fontSize * 0.6 + letterSpacing;

  const total = Math.max(
      0,
      Math.floor(element.clientWidth / arrowWidth),
  );

  let current = 0;

  target.value = "";

  const timer = setInterval(() => {
    if (current < total) {
      current++;
      target.value = ">".repeat(current);
    } else {
      clearInterval(timer);
      setIntervalRef(undefined);
    }
  }, 55);

  setIntervalRef(timer);
}

function startHeadingAnimation() {
  if (headingStarted.value) return;

  headingStarted.value = true;
  headingCount.value = 0;

  headingInterval = setInterval(() => {
    if (headingCount.value < headingText.length) {
      headingCount.value++;
    } else if (headingInterval) {
      clearInterval(headingInterval);
      headingInterval = undefined;
    }
  }, 90);
}

onMounted(() => {
  // README Typewriter
  if (typewriterElement.value) {
    observer = new IntersectionObserver(
        (entries: IntersectionObserverEntry[]) => {
          const entry = entries[0];

          if (entry?.isIntersecting) {
            observer?.disconnect();

            interval = setInterval(() => {
              if (count.value < fullText.length) {
                count.value++;
              } else if (interval) {
                clearInterval(interval);
                interval = undefined;
              }
            }, 70);
          }
        },
        { threshold: 0.2 },
    );

    observer.observe(typewriterElement.value);
  }

  // Main heading Typewriter
  if (headingElement.value) {
    headingObserver = new IntersectionObserver(
        (entries: IntersectionObserverEntry[]) => {
          const entry = entries[0];

          if (entry?.isIntersecting) {
            headingObserver?.disconnect();
            startHeadingAnimation();
          }
        },
        { threshold: 0.3 },
    );

    headingObserver.observe(headingElement.value);
  }

  // Obere rechte Linie
  if (topArrowLineElement.value) {
    topArrowObserver = new IntersectionObserver(
        (entries: IntersectionObserverEntry[]) => {
          const entry = entries[0];

          if (entry?.isIntersecting && topArrowLineElement.value) {
            topArrowObserver?.disconnect();

            startArrowAnimation(
                topArrowLineElement.value,
                topArrowLine,
                (timer) => {
                  topArrowInterval = timer;
                },
            );
          }
        },
        { threshold: 0.2 },
    );

    topArrowObserver.observe(topArrowLineElement.value);
  }

  // Untere Linie
  if (arrowLineElement.value) {
    arrowObserver = new IntersectionObserver(
        (entries: IntersectionObserverEntry[]) => {
          const entry = entries[0];

          if (entry?.isIntersecting && arrowLineElement.value) {
            arrowObserver?.disconnect();

            startArrowAnimation(
                arrowLineElement.value,
                arrowLine,
                (timer) => {
                  arrowInterval = timer;
                },
            );
          }
        },
        { threshold: 0.2 },
    );

    arrowObserver.observe(arrowLineElement.value);
  }

  // Terminal-Blöcke: Scroll-Trigger
  if (terminalSectionElement.value) {
    terminalObserver = new IntersectionObserver(
        ([entry]) => {
          if (entry?.isIntersecting) {
            terminalsVisible.value = true;
            terminalObserver?.disconnect();
          }
        },
        {
          threshold: 0.15,
        },
    );

    terminalObserver.observe(terminalSectionElement.value);
  }
});

onUnmounted(() => {
  if (interval) clearInterval(interval);
  if (topArrowInterval) clearInterval(topArrowInterval);
  if (arrowInterval) clearInterval(arrowInterval);
  if (headingInterval) clearInterval(headingInterval);

  observer?.disconnect();
  topArrowObserver?.disconnect();
  arrowObserver?.disconnect();
  headingObserver?.disconnect();
  terminalObserver?.disconnect();
});

const terminalLines = [
  { command: "whoami", output: "Marina" },
  { command: "date --born", output: "28th of October 2005" },
  { command: "pwd", output: "Zwettl, Austria" },
];

const terminalLines2 = [
  { command: "balance --life", output: "Code, sport, repeat" },
  { command: "recharge --method", output: "Soccer, running" },
  { command: "currently_learning", output: "Danish, Statistics in R Studio" },
];

const terminalLines3 = [
  { command: "sysctl -n coffee", output: "2+ cups/day" },
  { command: "onFailure --action", output: "Learn, adapt, try again" },
  { command: "echo $STATUS", output: "Ready to hire" },
];

const educationCommits = [
  {
    hash: "a3f2d1c",
    period: "2024 - present",
    title: "FH Hagenberg - Design of Digital Products",
    description:
        "Bachelor's degree focusing on web development and app development.",
    skills: [
      "Added: Vue.js, React Native, TypeScript, Node.js, Flutter",
      "Added: Tailwind CSS",
      "Added: Figma, UI/UX",
      "Added: Project Management, Jira",
    ],
    files: ["web-dev.ts", "app.dart", "ui-design.fig"],
  },
  {
    hash: "b7e4a9f",
    period: "2019 - 2024",
    title: "HTL Krems (Location Zwettl Lower Austria) - Information Technology",
    description:
        "Higher technical school with focus on programming, databases and server management.",
    skills: [
      "Added: C#, Java, Python, HTML/CSS, JS, Network Management",
      "Added: Git, SQL",
      "Added: Windows Server, Linux",
      "Added: Arduino Microcontroller",
      "Added: Project Management, Jira",
    ],
    files: [
      "programming.js",
      "networking.conf",
      "Dockerfile",
      "package.json",
      "ubuntu.iso",
    ],
  },
  {
    hash: "c1d8f3e",
    period: "2015 - 2019",
    title: "Mittelschule Stift Zwettl",
    description:
        "Foundation in mathematics, sciences, and first introduction to computers.",
    skills: ["Added: Logic, Mathematics, English"],
    files: ["logic.txt", "math-problems.pdf", "english-grammar.md"],
  },
];
</script>

<template>
  <!-- Header -->
  <div class="flex flex-row justify-between" id="about">
    <h1 class="text-body text-highlight-500">about</h1>
    <span class="text-body text-highlight-500">{</span>
  </div>

  <div class="pt-[3rem] md:pt-[5rem] lg:pt-[10rem]">
    <!-- README Typewriter -->
    <span ref="typewriterElement" class="font-heading">
      <span class="text-secondary-900 text-2xl">
        {{ fullText.slice(0, Math.min(count, left.length)) }}
      </span>

      <span class="muted-text-50 no-hover pl-3 pr-3">
        {{
          fullText.slice(
              left.length,
              Math.max(
                  left.length,
                  Math.min(count, left.length + title.length),
              ),
          )
        }}
      </span>

      <span class="text-secondary-900 text-2xl">
        {{ fullText.slice(left.length + title.length, count) }}
      </span>

      <span class="animate-pulse">_</span>
    </span>

    <!-- Availability -->
    <div class="flex alignright gap-5 pt-3 pb-3">
      <img
          alt="playbutton"
          src="../assets/play-svgrepo-com.svg"
          class="max-w-[1.5vw]"
      />

      <p class="muted-text-50 reveal cursor-pointer">
        ready to hire - part time (10h / week)
      </p>
    </div>

    <!-- Main heading -->
    <div class="flex flex-col text-start">
      <h1
          ref="headingElement"
          class="main-heading md:text-[clamp(4rem,8vw,5rem)] lg:text-[clamp(5rem,10vw,6rem)]"
          aria-label="Hello, I am Marina ;"
      >
        <span class="heading-line">
          {{ headingText.slice(0, Math.min(headingCount, helloText.length)) }}
          <span
              v-if="headingCount <= helloText.length"
              class="typewriter-cursor"
              aria-hidden="true"
          ></span>
        </span>

        <br />

        <span class="heading-line">
          {{
            headingCount > helloText.length
                ? headingText.slice(helloText.length, headingCount)
                : ""
          }}
          <span
              v-if="
              headingCount > helloText.length &&
              headingCount < headingText.length
            "
              class="typewriter-cursor"
              aria-hidden="true"
          ></span>
        </span>
      </h1>

      <h2
          class="muted-text-50 font-heading pt-2 text-[clamp(0.575rem,2vw,1rem)] md:text-[clamp(1rem,2vw,1.125rem)] lg:text-[clamp(1.125rem,2vw,1.25rem)]"
      >
        I code. I stay active.
      </h2>

      <h2
          class="muted-text-50 font-heading pt-15 text-[clamp(0.575rem,2vw,1rem)] md:text-[clamp(0.7rem,1.8vw,0.85rem)] lg:text-[clamp(0.825rem,1.8vw,0.95rem)]"
      >
        Full time student | Full Stack Developer | Sports Enthusiast
      </h2>

      <!-- Untere animierte Pfeillinie -->
      <div
          ref="arrowLineElement"
          class="arrow-line font-heading text-secondary-900 text-2xl"
          aria-hidden="true"
      >
        {{ arrowLine }}
      </div>
    </div>

    <div class="flex alignright gap-5 pt-3 pb-3">
      <img
          alt="playbutton"
          src="../assets/play-svgrepo-com.svg"
          class="max-w-[1vw]"
      />

      <p class="muted-text-50 reveal cursor-pointer">
        I stay active
      </p>
    </div>

    <div class="flex w-fit flex-col justify-self-end gap-2 pt-20">
      <p
          class="muted-text-50 font-heading text-[16px] md:text-[18px] lg:text-[20px]"
      >
        <span class="text-highlight-500">const</span> hobbies = [
      </p>

      <p class="pl-15 font-heading text-[32px] md:text-[36px] lg:text-[40px]">
        'soccer',<br />
        'code',<br />
        'running',<br />
        'swimming'
      </p>

      <p class="muted-text-50">];</p>
    </div>

    <!-- Extra Einrückung ab npm start -->
    <div class="added-padding">
      <div class="flex gap-5 pt-3 pb-8">
        <img
            alt="playbutton"
            src="../assets/play-svgrepo-com.svg"
            class="max-w-[1.5vw]"
        />

        <p class="font-h1">
          npm start
        </p>
      </div>

      <!-- Terminals -->
      <div
          ref="terminalSectionElement"
          class="flex flex-col gap-5 md:flex-row lg:flex-row"
      >
        <div
            class="terminal-reveal"
            :class="{ 'terminal-reveal-visible': terminalsVisible }"
            style="transition-delay: 0ms"
        >
          <Terminal_Block
              title="session_1: identity"
              :lines="terminalLines"
          />
        </div>

        <div
            class="terminal-reveal"
            :class="{ 'terminal-reveal-visible': terminalsVisible }"
            style="transition-delay: 220ms"
        >
          <Terminal_Block
              title="session_2: lifestyle & growth"
              :lines="terminalLines2"
          />
        </div>

        <div
            class="terminal-reveal"
            :class="{ 'terminal-reveal-visible': terminalsVisible }"
            style="transition-delay: 440ms"
        >
          <Terminal_Block
              title="session_3: work ethic"
              :lines="terminalLines3"
          />
        </div>
      </div>

      <!-- Education Header -->
      <div class="flex flex-row justify-between pt-20">
        <h1 class="text-body text-highlight-500">education</h1>
        <span class="text-body text-highlight-500">{</span>
      </div>

      <!-- Education -->
      <Education
          :commits="educationCommits"
          class="flex w-fit justify-center align-middle"
      />

      <span class="text-body text-highlight-500">}</span>

      <!-- skillset -->
      <Skills class="pt-20 pb-20" />
    </div>

    <span class="text-body text-highlight-500">}</span>
  </div>
</template>

<style scoped>
.alignright {
  align-items: center;
  justify-content: end;
}

/* Main heading */
.main-heading {
  font-weight: 700;
  line-height: 1.05;
}

.heading-line {
  display: inline;
}

/* Typewriter cursor */
.typewriter-cursor {
  display: inline-block;
  width: 0.055em;
  height: 0.85em;
  margin-left: 0.06em;
  vertical-align: -0.04em;
  background-color: currentColor;
  animation: cursor-blink 0.8s steps(2, start) infinite;
}

@keyframes cursor-blink {
  to {
    visibility: hidden;
  }
}

/* Untere Pfeillinie */
.arrow-line {
  width: 30vw;
  min-height: 1.2em;
  overflow: hidden;
  white-space: nowrap;
  letter-spacing: 0;
  line-height: 1.2;
  padding-top: 1rem;
}

/* Zusätzlicher Abstand */
.added-padding {
  padding: 0 5vw;
}

/* Terminal-Blöcke: smooth von links nach rechts */
.terminal-reveal {
  min-width: 0;
  flex: 1;
  opacity: 0;
  transform: translateX(-45px);
  transition:
      opacity 1.2s ease,
      transform 1.4s cubic-bezier(0.22, 1, 0.36, 1);
  will-change: opacity, transform;
}

.terminal-reveal-visible {
  opacity: 1;
  transform: translateX(0);
}

/* Accessibility */
@media (prefers-reduced-motion: reduce) {
  .typewriter-cursor {
    animation: none;
  }

  .terminal-reveal {
    opacity: 1;
    transform: none;
    transition: none;
  }
}
</style>