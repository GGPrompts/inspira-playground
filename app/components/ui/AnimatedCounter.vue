<script setup lang="ts">
import { ref, watch, onMounted } from "vue";
import { useIntersectionObserver } from "@vueuse/core";

const props = withDefaults(
  defineProps<{
    target: number;
    label: string;
    suffix?: string;
    prefix?: string;
    duration?: number;
    glowColor?: "cyan" | "purple" | "green";
  }>(),
  {
    suffix: "",
    prefix: "",
    duration: 2000,
    glowColor: "cyan",
  }
);

const count = ref(0);
const hasAnimated = ref(false);
const containerRef = ref<HTMLElement | null>(null);

const glowClass = {
  cyan: "terminal-glow",
  purple: "terminal-glow-purple",
  green: "terminal-glow-green",
}[props.glowColor];

function animateCount() {
  if (hasAnimated.value) return;
  hasAnimated.value = true;

  const steps = 60;
  const increment = props.target / steps;
  let current = 0;
  const stepDuration = props.duration / steps;

  const timer = setInterval(() => {
    current += increment;
    if (current >= props.target) {
      count.value = props.target;
      clearInterval(timer);
    } else {
      count.value = Math.floor(current);
    }
  }, stepDuration);
}

const { stop } = useIntersectionObserver(
  containerRef,
  ([{ isIntersecting }]) => {
    if (isIntersecting && !hasAnimated.value) {
      animateCount();
    }
  },
  { threshold: 0.5 }
);

onMounted(() => {
  // Cleanup on unmount handled by vueuse
});
</script>

<template>
  <div ref="containerRef" class="text-center group">
    <div
      :class="[
        'text-4xl md:text-5xl font-bold text-[var(--neon-cyan)] transition-all duration-300',
        glowClass,
      ]"
    >
      {{ prefix }}{{ count.toLocaleString() }}{{ suffix }}
    </div>
    <div class="text-sm text-slate-400 mt-2 group-hover:text-slate-300 transition-colors">
      {{ label }}
    </div>
  </div>
</template>
