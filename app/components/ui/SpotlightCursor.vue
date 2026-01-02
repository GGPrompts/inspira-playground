<template>
  <div
    ref="containerRef"
    :class="cn('relative', props.class)"
    @mousemove="handleMouseMove"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <slot />

    <!-- Spotlight effect -->
    <div
      v-show="isActive"
      class="pointer-events-none fixed z-50 transition-opacity duration-300"
      :style="spotlightStyle"
    />

    <!-- Border highlight effect -->
    <div
      v-if="showBorderHighlight && isActive"
      class="pointer-events-none absolute inset-0 z-10 rounded-[inherit] transition-opacity duration-300"
      :style="borderHighlightStyle"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { cn } from '~/lib/utils'

interface Props {
  class?: string
  size?: number
  color?: string
  intensity?: number
  showBorderHighlight?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  size: 400,
  color: '0, 255, 255',
  intensity: 0.15,
  showBorderHighlight: true
})

const containerRef = ref<HTMLDivElement | null>(null)
const isActive = ref(false)
const mouseX = ref(0)
const mouseY = ref(0)
const localX = ref(0)
const localY = ref(0)

const spotlightStyle = computed(() => ({
  width: `${props.size}px`,
  height: `${props.size}px`,
  left: `${mouseX.value - props.size / 2}px`,
  top: `${mouseY.value - props.size / 2}px`,
  background: `radial-gradient(circle, rgba(${props.color}, ${props.intensity}) 0%, transparent 70%)`,
  borderRadius: '50%',
  opacity: isActive.value ? 1 : 0
}))

const borderHighlightStyle = computed(() => ({
  background: `radial-gradient(${props.size}px circle at ${localX.value}px ${localY.value}px, rgba(${props.color}, 0.2), transparent 50%)`
}))

const handleMouseMove = (e: MouseEvent) => {
  mouseX.value = e.clientX
  mouseY.value = e.clientY

  if (containerRef.value) {
    const rect = containerRef.value.getBoundingClientRect()
    localX.value = e.clientX - rect.left
    localY.value = e.clientY - rect.top
  }
}

const handleMouseEnter = () => {
  isActive.value = true
}

const handleMouseLeave = () => {
  isActive.value = false
}
</script>
