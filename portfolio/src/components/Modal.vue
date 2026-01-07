<script setup lang="ts">

import {ref} from "vue";

const emit = defineEmits<{
  close: []
}>();

</script>

<template>
  <div class="modal-overlay">
    <div class="modal-content">
      <button class="close-btn" @click="emit('close')">×</button>
      <slot></slot>
    </div>
  </div>


</template>

<style scoped>

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  backdrop-filter: blur(4px);
}


.modal-content {
  background: var(--primary-650, white);
  padding: 2.5rem;
  border-radius: 12px;
  max-width: 500px;
  width: 90%;
  max-height: 80vh;
  overflow-y: auto;
  position: relative;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);

  animation: fadeIn 0.3s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}


.close-btn {
  position: absolute;
  top: 1rem;
  right: 1rem;
  font-size: 2rem;
  background: none;
  border: none;
  cursor: pointer;
  color: var(--neutrals-500, #333);
  line-height: 1;
  padding: 0.25rem 0.5rem;
  transition: transform 0.2s ease;
}

.close-btn:hover {
  transform: scale(1.1);
  color: var(--highlight-500);
}

</style>