<template>
  <div :class="cn('relative rounded-lg', props.class)">
    <!-- Animated gradient border (thin glow) -->
    <div
      class="absolute inset-0 rounded-[inherit] -z-10"
      :style="borderStyle"
    />
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

const borderStyle = computed(() => ({
  background: `linear-gradient(${props.animated ? 'var(--gradient-angle)' : '135deg'}, ${props.colors.join(', ')})`,
  animation: props.animated ? `gradient-rotate ${props.speed}s linear infinite` : 'none'
}))
</script>

<style scoped>
@property --gradient-angle {
  syntax: '<angle>';
  initial-value: 0deg;
  inherits: false;
}

@keyframes gradient-rotate {
  0% {
    --gradient-angle: 0deg;
  }
  100% {
    --gradient-angle: 360deg;
  }
}
</style>
