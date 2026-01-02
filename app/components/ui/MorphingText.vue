<template>
  <div :class="cn('relative', props.class)">
    <span
      class="inline-block font-bold transition-all duration-1000 ease-in-out"
      :style="{ opacity: isTransitioning ? 0 : 1, filter: isTransitioning ? 'blur(8px)' : 'blur(0)' }"
    >
      {{ currentText }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";
import { cn } from "../../lib/utils";

interface Props {
  texts: string[];
  class?: string;
  interval?: number;
}

const props = withDefaults(defineProps<Props>(), {
  interval: 3000,
});

const currentIndex = ref(0);
const isTransitioning = ref(false);
let intervalId: ReturnType<typeof setInterval> | null = null;

const currentText = computed(() => props.texts[currentIndex.value]);

onMounted(() => {
  intervalId = setInterval(() => {
    isTransitioning.value = true;
    setTimeout(() => {
      currentIndex.value = (currentIndex.value + 1) % props.texts.length;
      isTransitioning.value = false;
    }, 500);
  }, props.interval);
});

onUnmounted(() => {
  if (intervalId) {
    clearInterval(intervalId);
  }
});
</script>
