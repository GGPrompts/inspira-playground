<template>
  <div :class="cn('relative rounded-lg', props.class)">
    <!-- Animated gradient border using conic gradient rotation -->
    <div
      class="absolute inset-0 rounded-[inherit] -z-10 overflow-hidden"
    >
      <div
        class="absolute inset-[-50%] gradient-spinner"
        :class="{ 'animate-spin-slow': animated }"
        :style="gradientStyle"
      />
    </div>
    <div class="absolute inset-[1px] rounded-[inherit] bg-[#0a0a0f] -z-10" />

    <!-- Inner content -->
    <div class="relative rounded-[inherit]" :class="innerClass">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '~/lib/utils'

interface Props {
  class?: string
  innerClass?: string
  colors?: string[]
  speed?: number
  animated?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  colors: () => ['#00ffff', '#a855f7', '#ec4899', '#00ffff'],
  speed: 4,
  animated: true
})

const gradientStyle = computed(() => ({
  background: `conic-gradient(from 0deg, ${props.colors.join(', ')})`,
  animationDuration: `${props.speed}s`
}))
</script>

<style scoped>
.animate-spin-slow {
  animation: spin linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
