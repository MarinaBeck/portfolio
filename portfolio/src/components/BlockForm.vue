<script setup lang="ts">
import {EBlockTypes} from "../types"

const props = defineProps<{
  type: EBlockTypes
  size?: 'small' | 'half' | 'big'
}>();

</script>

<template>
  <div :class="[props.type, props.size]">
    <slot></slot>
  </div>

</template>

<style scoped>
.outline{
  border: 1px solid var(--primary-10);
  border-radius: 50px 300px 50px 50px;
  padding: 2% 2% 2% 3%;
}

.filled{
  background-color: var(--primary-550);
  border-radius: 50px 50px 50px 300px;
}

.small{
  min-width: 10%;
  width: clamp(200px, 12vw, 400px);
  max-width: 100vw;
}

.half{
  min-width: 50%;
  max-width: 100vw;
}

.big{
  min-width: 60%;
  max-width: 100vw;
}
</style>