<template>
  <div
    ref="elementRef"
    :class="cn('transition-all', props.class)"
    :style="elementStyle"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { cn } from '~/lib/utils'

interface Props {
  class?: string
  direction?: 'up' | 'down' | 'left' | 'right' | 'fade'
  distance?: number
  duration?: number
  delay?: number
  threshold?: number
  once?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  direction: 'up',
  distance: 50,
  duration: 600,
  delay: 0,
  threshold: 0.1,
  once: true
})

const elementRef = ref<HTMLDivElement | null>(null)
const isVisible = ref(false)
let observer: IntersectionObserver | null = null

const getTransform = () => {
  if (isVisible.value) return 'translate(0, 0)'

  switch (props.direction) {
    case 'up':
      return `translateY(${props.distance}px)`
    case 'down':
      return `translateY(-${props.distance}px)`
    case 'left':
      return `translateX(${props.distance}px)`
    case 'right':
      return `translateX(-${props.distance}px)`
    case 'fade':
    default:
      return 'translate(0, 0)'
  }
}

const elementStyle = computed(() => ({
  opacity: isVisible.value ? 1 : 0,
  transform: getTransform(),
  transitionDuration: `${props.duration}ms`,
  transitionDelay: `${props.delay}ms`,
  transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)'
}))

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          isVisible.value = true
          if (props.once && observer) {
            observer.unobserve(entry.target)
          }
        } else if (!props.once) {
          isVisible.value = false
        }
      })
    },
    { threshold: props.threshold }
  )

  if (elementRef.value) {
    observer.observe(elementRef.value)
  }
})

onUnmounted(() => {
  if (observer) {
    observer.disconnect()
  }
})
</script>
