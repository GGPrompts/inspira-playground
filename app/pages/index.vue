<template>
  <AuroraBackground class="dark">
    <div class="relative flex flex-col items-center justify-center gap-8 px-4 text-center z-10">
      <!-- Morphing headline -->
      <MorphingText
        :texts="headlines"
        class="text-4xl md:text-6xl lg:text-7xl text-white mb-4"
      />

      <!-- Subtitle -->
      <p class="max-w-2xl text-lg md:text-xl text-white/70">
        Exploring Inspira UI components with Vue 3, Nuxt 4, and TailwindCSS v4.
        Beautiful animated components, zero complexity.
      </p>

      <!-- CTA Buttons -->
      <div class="flex flex-col sm:flex-row gap-4 mt-4">
        <ShimmerButton
          shimmer-color="#a78bfa"
          background="rgba(139, 92, 246, 0.9)"
          class="text-white font-semibold text-lg"
        >
          Get Started
        </ShimmerButton>

        <NuxtLink to="/dashboard">
          <ShimmerButton
            shimmer-color="#60a5fa"
            background="rgba(30, 41, 59, 0.9)"
            class="text-white font-semibold text-lg"
          >
            View Dashboard
          </ShimmerButton>
        </NuxtLink>
      </div>

      <!-- Feature cards -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 max-w-5xl w-full">
        <div
          v-for="feature in features"
          :key="feature.title"
          class="group relative p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-300 hover:-translate-y-1"
        >
          <div class="text-3xl mb-3">{{ feature.icon }}</div>
          <h3 class="text-xl font-bold text-white mb-2">{{ feature.title }}</h3>
          <p class="text-white/60 text-sm">{{ feature.description }}</p>
        </div>
      </div>
    </div>
  </AuroraBackground>
</template>

<script setup lang="ts">
import { ref } from "vue";
import AuroraBackground from "../components/ui/AuroraBackground.vue";
import ShimmerButton from "../components/ui/ShimmerButton.vue";
import MorphingText from "../components/ui/MorphingText.vue";

const headlines = ref([
  "Build Beautiful UIs",
  "Animate Everything",
  "Ship Faster",
  "Delight Users",
]);

const features = ref([
  {
    icon: "✨",
    title: "120+ Components",
    description: "Copy-paste animated components. No npm install, just grab what you need.",
  },
  {
    icon: "🎨",
    title: "TailwindCSS v4",
    description: "Modern utility-first CSS with OkLch colors and native dark mode.",
  },
  {
    icon: "🚀",
    title: "Motion-V",
    description: "Declarative animations for Vue. Smooth, performant, beautiful.",
  },
]);
</script>
