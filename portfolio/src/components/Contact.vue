<script setup lang="ts">
const openMail = () => {
  const hex = '6d6172696e612e6265636b3840676d61696c2e636f6d';
  const email = hex.match(/.{1,2}/g)!.map(byte =>
      String.fromCharCode(parseInt(byte, 16))
  ).join('');

  window.open(`mailto:${email}`, '_blank');
};

</script>

<template>
  <div class="flex flex-col gap-15">
    <h1 id="contact" class="text-center">contact me</h1>
    <button @click="openMail" class="mx-auto px-8 py-3 md:px-12 md:py-4 lg:px-16 lg:py-5 w-fit">
      write me
    </button>
  </div>


</template>

<style scoped>

div{
  margin: 15% 0;
}

button{
  background-color: var(--primary-600);
  border: 3px solid var(--primary-10);
  width: clamp(200px, 30vw, 300px);
  padding: clamp(12px, 2vw, 24px) clamp(32px, 3vw, 64px);
  border-radius: 60px 100px 60px 60px;
  font-size: clamp(16px, 1vw, 24px);
  font-weight: bold;
}

button:hover{
  border-color: var(--highlight-500);
  transition: all 0.3s ease-in-out;
}

</style>