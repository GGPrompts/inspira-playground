<template>
  <div
    :class="cn('animate-pulse rounded bg-slate-800/50', props.class)"
    :style="{ width: props.width, height: props.height }"
  >
    <!-- Shimmer effect -->
    <div class="relative h-full w-full overflow-hidden rounded-[inherit]">
      <div
        class="skeleton-shimmer absolute inset-0"
        :style="shimmerStyle"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '~/lib/utils'

interface Props {
  class?: string
  width?: string
  height?: string
  shimmerColor?: string
}

const props = withDefaults(defineProps<Props>(), {
  width: '100%',
  height: '20px',
  shimmerColor: 'rgba(0, 255, 255, 0.1)'
})

const shimmerStyle = computed(() => ({
  background: `linear-gradient(90deg, transparent, ${props.shimmerColor}, transparent)`,
  animation: 'skeleton-shimmer 1.5s infinite'
}))
</script>

<style scoped>
@keyframes skeleton-shimmer {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

.skeleton-shimmer {
  animation: skeleton-shimmer 1.5s infinite;
}
</style>
