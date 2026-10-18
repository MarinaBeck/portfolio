<script setup lang="ts">
import { motion } from "motion-v";
import playButton from "../assets/play-svgrepo-com.svg";

const openMail = () => {
  const hex = "6d6172696e612e6265636b3840676d61696c2e636f6d";
  const email = hex
      .match(/.{1,2}/g)!
      .map((byte) => String.fromCharCode(parseInt(byte, 16)))
      .join("");

  window.open(
      `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(email)}`,
      "_blank",
      "noopener,noreferrer"
  );
};

</script>

<template>
  <div class="contact-container" id="contact">
    <!-- Contact -->
    <div class="flex flex-col items-center pb-35 pt-20 gap-5">
      <div class="flex gap-5 justify-center">
        <motion.img
            alt="playbutton"
            :src="playButton"
            class="max-w-[1.5vw] min-w-[20px]"
            :animate="{ x: [-3, 4] }"
            :transition="{
            duration: 0.8,
            repeat: Infinity,
            repeatType: 'mirror',
            ease: 'easeInOut',
          }"
        />

        <h1 id="contact" class="text-center font-bold">
          contact me
        </h1>
      </div>

      <!-- Button mit Icon-Layer hinter dem Button -->
      <button
          type="button"
          @click="openMail"
          class="email-button"
      >
          <span class="button-overlay" aria-hidden="true">
            <span class="button-icon text-highlight-500">→</span>
          </span>
        <span class="button-text">email me</span>
      </button>
    </div>
  </div>
</template>

<style scoped>
.contact-container {
  width: 100%;
  min-width: 0;
}

/* Email-Button */
.email-button {
  /* Background is drawn by ::before so the layer behind can peek out */
  position: relative;
  isolation: isolate;

  display: inline-flex;
  align-items: center;
  justify-content: center;

  padding: 1rem 2.5rem;
  border-radius: 999px;
  background: transparent;
  border: none;

  color: var(--color-neutrals-800);
  text-decoration: none;

  font-size: clamp(16px, 1vw, 24px);
  font-weight: bold;

  cursor: pointer;
  transition: transform 0.35s cubic-bezier(0.65, 0, 0.35, 1), opacity 0.2s ease;
}

.email-button:hover {
  transform: translateX(-5px);
}

/* Base color of the button, stays in place */
.email-button::before {
  content: "";
  position: absolute;
  inset: 0;
  z-index: -2;

  background-color: var(--color-highlight-500);
  border-radius: inherit;
}

/* Layer behind the button, slides only to the right on hover */
.button-overlay {
  position: absolute;
  inset: 0;
  z-index: -3;

  background-color: var(--color-primary-400);
  border-radius: inherit;

  opacity: 0;
  transform: translateX(0);
  transition: transform 0.35s cubic-bezier(0.65, 0, 0.35, 1), opacity 0.2s ease;
}

/* Icon sits in the part of the layer that peeks out to the right */
.button-icon {
  position: absolute;
  top: 50%;
  right: 0.75rem;
  transform: translateY(-50%);

  font-size: 1.25em;
  line-height: 1;
  opacity: 0;
  transition: opacity 0.2s ease 0.15s;
}

.email-button:hover .button-overlay {
  opacity: 1;
  transform: translateX(2.3rem);
}

.email-button:hover .button-icon {
  opacity: 1;
}

/* Text bleibt über dem Overlay */
.button-text {
  position: relative;
  z-index: 1;
}

.email-button:active {
  transform: scale(0.98);
}

.email-button:focus-visible {
  outline: 2px solid var(--color-highlight-500);
  outline-offset: 4px;
}

@media (prefers-reduced-motion: reduce) {
  .button-overlay,
  .button-icon {
    transition: none;
  }
}
</style>