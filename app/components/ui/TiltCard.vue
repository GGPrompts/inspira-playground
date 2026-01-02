<template>
  <div
    ref="cardRef"
    :class="cn('relative transform-gpu transition-transform duration-200 ease-out', props.class)"
    :style="cardStyle"
    @mouseenter="handleMouseEnter"
    @mousemove="handleMouseMove"
    @mouseleave="handleMouseLeave"
  >
    <!-- Spotlight glow effect -->
    <div
      v-if="showSpotlight"
      class="pointer-events-none absolute -inset-px rounded-[inherit] opacity-0 transition-opacity duration-300"
      :class="{ 'opacity-100': isHovered }"
      :style="spotlightStyle"
    />

    <!-- Content -->
    <div class="relative z-10">
      <slot />
    </div>

    <!-- Glare effect -->
    <div
      v-if="showGlare"
      class="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 overflow-hidden"
      :class="{ 'opacity-100': isHovered }"
    >
      <div
        class="absolute w-[200%] h-[200%] bg-gradient-to-br from-white/20 via-transparent to-transparent"
        :style="glareStyle"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { cn } from '~/lib/utils'

interface Props {
  class?: string
  maxTilt?: number
  perspective?: number
  scale?: number
  showSpotlight?: boolean
  showGlare?: boolean
  spotlightColor?: string
}

const props = withDefaults(defineProps<Props>(), {
  maxTilt: 15,
  perspective: 1000,
  scale: 1.02,
  showSpotlight: true,
  showGlare: true,
  spotlightColor: 'rgba(0, 255, 255, 0.15)'
})

const cardRef = ref<HTMLDivElement | null>(null)
const isHovered = ref(false)
const rotateX = ref(0)
const rotateY = ref(0)
const mouseX = ref(0)
const mouseY = ref(0)

const cardStyle = computed(() => ({
  transformStyle: 'preserve-3d',
  transform: isHovered.value
    ? `perspective(${props.perspective}px) rotateX(${rotateX.value}deg) rotateY(${rotateY.value}deg) scale(${props.scale})`
    : `perspective(${props.perspective}px) rotateX(0deg) rotateY(0deg) scale(1)`
}))

const spotlightStyle = computed(() => ({
  background: `radial-gradient(800px circle at ${mouseX.value}px ${mouseY.value}px, ${props.spotlightColor} 0%, transparent 25%, transparent 100%)`
}))

const glareStyle = computed(() => ({
  transform: `translate(${mouseX.value - 100}%, ${mouseY.value - 100}%)`
}))

const handleMouseEnter = () => {
  isHovered.value = true
}

const handleMouseMove = (e: MouseEvent) => {
  if (!cardRef.value) return

  const rect = cardRef.value.getBoundingClientRect()
  const x = e.clientX - rect.left
  const y = e.clientY - rect.top
  const centerX = rect.width / 2
  const centerY = rect.height / 2

  mouseX.value = x
  mouseY.value = y

  const rotateXValue = ((y - centerY) / centerY) * -props.maxTilt
  const rotateYValue = ((x - centerX) / centerX) * props.maxTilt

  rotateX.value = rotateXValue
  rotateY.value = rotateYValue
}

const handleMouseLeave = () => {
  isHovered.value = false
  rotateX.value = 0
  rotateY.value = 0
}
</script>
