
<script setup lang="ts">
import { ref, computed } from "vue";

type WorkOrInt = "all" | "work" | "internship";

interface Experience {
  type: Exclude<WorkOrInt, "all">;
  duration: string;
  position: string;
  company: string;
  location: string;
  year: number;
}

const activeFilter = ref<WorkOrInt>("all");

const experiences: Experience[] = [
  {
    type: "work",
    duration: "2 months",
    position: "Webdesigner in marketing",
    company: "AEP H2 GmbH",
    location: "Linz - Austria",
    year: 2025,
  },
  {
    type: "internship",
    duration: "1 month",
    position: "Frontend Web Developer",
    company: "fab4minds Informationstechnik GmbH",
    location: "Vitis - Austria",
    year: 2023,
  },
  {
    type: "internship",
    duration: "1 month",
    position: "IT support and Network Management",
    company: "NBG Holding GmbH",
    location: "Gmünd - Austria",
    year: 2022,
  },
  {
    type: "internship",
    duration: "3 months",
    position: "Frontend Web Developer",
    company: "MARKETIERE GmbH",
    location: "Horn - Austria",
    year: 2026,
  },
];

const filteredExperiences = computed(() => {
  return activeFilter.value === "all"
      ? experiences
      : experiences.filter(
          (experience) => experience.type === activeFilter.value
      );
});

const groupedExperiences = computed(() => {
  const groups: {
    type: Exclude<WorkOrInt, "all">;
    items: Experience[];
  }[] = [];

  for (const experience of filteredExperiences.value) {
    let group = groups.find((item) => item.type === experience.type);

    if (!group) {
      group = { type: experience.type, items: [] };
      groups.push(group);
    }

    group.items.push(experience);
  }

  // Sort each group by year, newest first
  for (const group of groups) {
    group.items.sort((a, b) => b.year - a.year);
  }

  return groups;
});
</script>

<template>
  <div class="flex flex-row justify-between pt-20" id="experience">
    <h1 class="text-body text-highlight-500">experience</h1>
    <span class="text-body text-highlight-500">{</span>
  </div>

  <div class="flex justify-between mb-10 mt-10 added-padding">
    <h2 class="font-h1 text-body self-center-safe">most recent</h2>

    <div class="filter-wrapper">
      <label class="filter-label" for="filter">filter</label>

      <select id="filter" v-model="activeFilter" class="filter-select">
        <option value="all">all</option>
        <option value="work">work</option>
        <option value="internship">internship</option>
      </select>
    </div>
  </div>

  <!-- Experience groups -->
  <section
      v-for="group in groupedExperiences"
      :key="group.type"
      class="added-padding mb-8"
  >
    <p class="greenText mb-4">{{ group.type }}</p>

    <!-- Individual experience entries -->
    <article
        v-for="(experience, index) in group.items"
        :key="`${experience.company}-${experience.year}`"
    >
      <div class="flex w-full items-center">
        <!-- Left symbol -->
        <p class="bigSymbols flex-shrink-0 max-md:hidden">&lt;</p>

        <!-- Content -->
        <div class="flex-1 max-w-xl mx-auto text-left font-h1">
          <h2 class="font-h1 font-bold">{{ experience.duration }}</h2>
          <p class="muted-text-50 reveal">{{ experience.position }}</p>
          <p class="muted-text-50 reveal">
            {{ experience.company }}
          </p>
          <p class="text-neutral-700">
            {{ experience.year }}
            {{ experience.location }}
          </p>
        </div>

        <!-- Right symbol -->
        <p class="bigSymbols flex-shrink-0 max-md:hidden">/&gt;</p>
      </div>

      <!-- Separator between entries on mobile -->
      <hr
          v-if="index < group.items.length - 1"
          class="min-md:hidden mt-5 mb-5"
      />
    </article>
  </section>

  <span class="text-body text-highlight-500">}</span>
</template>

<style scoped>
.added-padding {
  padding-left: 10vw;
  padding-right: 10vw;
}

.descriptions {
  font-size: 13px;
}

.bigSymbols {
  font-size: clamp(50px, 8vw, 10vw);
  font-family: var(--font-h1);
  letter-spacing: var(--h1-letter-spacing);
  font-weight: bold;
  opacity: 70%;
}

.greenText {
  color: var(--color-highlight-500);
}

.filter-wrapper {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 1rem;
  border: none;
}

.filter-label {
  color: white;
}

.filter-select {
  background-color: var(--color-primary-600);
  border-radius: 20px;
  padding: 0.8rem 2.5rem 0.8rem 1.2rem;
  color: white;
  border: none;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
  appearance: none;
  cursor: pointer;
  font-size: 1rem;
}

.filter-wrapper::after {
  content: "▾";
  position: absolute;
  right: 1.2rem;
  pointer-events: none;
  color: white;
}

.filter-select option {
  background-color: var(--color-primary-600);
  color: white;
  border: none;
}
</style>
