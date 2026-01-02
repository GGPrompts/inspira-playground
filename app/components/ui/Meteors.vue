<template>
  <div :class="cn('overflow-hidden', props.class)">
    <slot />

    <!-- Meteor elements -->
    <span
      v-for="(meteor, index) in meteors"
      :key="index"
      class="meteor absolute pointer-events-none"
      :style="meteor.style"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '~/lib/utils'

interface Props {
  class?: string
  count?: number
  color?: string
}

const props = withDefaults(defineProps<Props>(), {
  count: 20,
  color: 'rgba(0, 255, 255, 0.8)'
})

interface MeteorStyle {
  style: {
    top: string
    left: string
    animationDelay: string
    animationDuration: string
  }
}

const meteors = computed<MeteorStyle[]>(() => {
  return Array(props.count)
    .fill(null)
    .map(() => ({
      style: {
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 10}s`,
        animationDuration: `${Math.random() * 8 + 2}s`
      }
    }))
})
</script>

<style scoped>
.meteor {
  width: 3px;
  height: 3px;
  background: v-bind('props.color');
  border-radius: 50%;
  box-shadow:
    0 0 2px 1px rgba(255, 255, 255, 0.2),
    0 0 6px 2px v-bind('props.color'),
    0 0 12px 4px v-bind('props.color');
  animation: meteor-fall linear infinite;
  opacity: 0;
}

.meteor::before {
  content: '';
  position: absolute;
  width: 80px;
  height: 2px;
  background: linear-gradient(90deg, v-bind('props.color'), transparent);
  transform: translateX(-100%);
}

@keyframes meteor-fall {
  0% {
    opacity: 0;
    transform: translateX(0) translateY(0) rotate(45deg);
  }
  5% {
    opacity: 1;
  }
  70% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    transform: translateX(300px) translateY(300px) rotate(45deg);
  }
}
</style>
