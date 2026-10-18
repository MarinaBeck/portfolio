<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { computed, ref } from "vue";

interface Skill {
  name: string;
  icon: string;
}

const fallbackIcon = "carbon:code";

const skills: Skill[] = [
  // Programmiersprachen & Frameworks
  { name: "C#", icon: "devicon:csharp" },
  { name: ".NET", icon: "logos:dotnet" },
  { name: "WPF", icon: fallbackIcon },
  { name: "Java", icon: "logos:java" },
  { name: "Spring Boot", icon: "logos:spring-icon" },
  { name: "Python", icon: "logos:python" },
  { name: "Node.js", icon: "logos:nodejs-icon" },
  { name: "Vue.js", icon: "logos:vue" },
  { name: "React Native", icon: "logos:react" },
  { name: "TypeScript", icon: "logos:typescript-icon" },

  // Webtechnologien
  { name: "HTML5", icon: "logos:html-5" },
  { name: "CSS", icon: "logos:css-3" },
  { name: "SCSS", icon: "logos:sass" },
  { name: "Tailwind CSS", icon: "logos:tailwindcss-icon" },

  // APIs
  { name: "REST-APIs", icon: "carbon:api" },

  // Datenbanken
  { name: "MySQL", icon: "logos:mysql" },
  { name: "Oracle", icon: "logos:oracle" },
  { name: "MongoDB", icon: "logos:mongodb-icon" },
  { name: "Apache TinkerPop Gremlin", icon: fallbackIcon },

  // DevOps & Versionsverwaltung
  { name: "Docker", icon: "logos:docker-icon" },
  { name: "Docker Compose", icon: "logos:docker-icon" },
  { name: "Dockerfile", icon: "logos:docker-icon" },
  { name: "Git", icon: "logos:git-icon" },
  { name: "GitHub", icon: "logos:github-icon" },

  // Design
  { name: "Figma", icon: "logos:figma" },
];

const skillIcons = ref<Record<string, string>>({});

function getSkillIcon(skill: Skill): string {
  return skillIcons.value[skill.name] ?? skill.icon;
}

function handleIconError(skill: Skill) {
  skillIcons.value[skill.name] = fallbackIcon;
}
</script>

<template>
  <section
      class="grid w-full min-w-0 grid-cols-1 items-start gap-6
           md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]
           md:gap-8 lg:gap-12 xl:gap-20"
  >
    <!-- Linke Seite: Code-Editor -->
    <div class="min-w-0">
      <p
          class="font-heading text-base tracking-wide text-neutrals-500"
      >
        skillset
      </p>

      <div
          class="my-5 flex gap-1 overflow-hidden whitespace-nowrap
               font-h1 text-2xl leading-none text-secondary-900
               md:my-8 lg:my-10 "
          aria-hidden="true"
      >
        <span v-for="n in 16" :key="n">&gt;</span>
      </div>

      <p
          class="mb-2 font-mono text-sm text-neutrals-600 muted-text-50"
      >
        marina_skills.tsx
      </p>

      <div class="font-mono text-sm leading-7 sm:text-base">
        <div class="flex items-baseline gap-3">
          <span
              class="w-4 shrink-0 select-none text-right text-neutrals-600"
          >
            1
          </span>

          <span class="text-neutrals-500">const skills = [</span>
        </div>

        <div
            v-for="(skill, index) in skills"
            :key="skill.name"
            class="flex min-w-0 items-baseline gap-3"
        >
          <span
              class="w-4 shrink-0 select-none text-right text-neutrals-600"
          >
            {{ index + 2 }}
          </span>

          <span class="min-w-0 break-words text-highlight-500">
            "{{ skill.name }}"<span v-if="index < skills.length - 1">,</span>
          </span>
        </div>

        <div class="flex items-baseline gap-3">
          <span
              class="w-4 shrink-0 select-none text-right text-neutrals-600"
          >
            {{ skills.length + 2 }}
          </span>

          <span class="text-neutrals-500">];</span>
        </div>
      </div>
    </div>

    <!-- Rechte Seite: Technologie-Labels -->
    <div
        class="flex min-w-0 flex-wrap content-start items-center gap-2
             sm:gap-3 md:pt-20 lg:gap-3 lg:pt-24 xl:gap-4"
    >
      <div
          v-for="skill in skills"
          :key="skill.name"
          class="inline-flex max-w-full shrink-0 items-center gap-2
               rounded-full border border-neutrals-800 bg-primary-600
               py-1.5 pl-1.5 pr-3 text-sm text-neutrals-500
               transition-all duration-200
               hover:-translate-y-0.5 hover:border-secondary-500
               hover:bg-primary-550
               sm:gap-2.5 sm:py-2 sm:pr-4 sm:text-base"
      >
        <span
            class="grid size-7 shrink-0 place-items-center rounded-lg
                 bg-primary-400 text-secondary-400 sm:size-[30px]"
        >
          <Icon
              :icon="getSkillIcon(skill)"
              width="20"
              height="20"
              @load-error="handleIconError(skill)"
          />
        </span>

        <span class="whitespace-nowrap">
          {{ skill.name }}
        </span>
      </div>
    </div>
  </section>
</template>