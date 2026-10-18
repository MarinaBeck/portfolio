
<script setup lang="ts">
interface TerminalLine {
  command: string;
  output: string;
}

defineProps<{
  title?: string;
  lines: TerminalLine[];
}>();
</script>

<template>
  <div
      class="w-full max-w-2xl overflow-hidden rounded-xl border border-neutral-700 bg-primary-650 font-mono text-sm min-h-[50vh]"
  >
    <!-- macOS Header -->
    <div
        class="flex items-center border-b border-neutral-700 bg-primary-700 px-4 py-3"
    >
      <div class="flex gap-2">
        <span class="h-3 w-3 rounded-full bg-[#ff5f57]"></span>
        <span class="h-3 w-3 rounded-full bg-[#febc2e]"></span>
        <span class="h-3 w-3 rounded-full bg-[#28c840]"></span>
      </div>

      <div class="flex-1 pr-10 text-center text-xs text-neutral-500">
        {{ title ?? "marina — zsh" }}
      </div>
    </div>

    <!-- Terminal Content -->
    <div class="min-h-52 space-y-1 p-5 text-neutral-200">
      <template v-for="(line, index) in lines" :key="index">
        <div class="flex gap-2 text-neutral-600">
          <span class="">$</span>
          <span>{{ line.command }}</span>
        </div>

        <div
            class="mb-5 pl-4 whitespace-pre-wrap text-[14px] md:text-[16px] lg:text-[18px]"
            :class="
                index === lines.length - 1
                  ? 'text-highlight-500'
                  : 'text-neutral-300'
              "
        >
          {{ line.output }}
        </div>
      </template>

    </div>
  </div>
</template>