<template>
  <button
    ref="buttonRef"
    :class="cn('relative transition-transform duration-200', props.class)"
    :style="buttonStyle"
    @mouseenter="handleMouseEnter"
    @mousemove="handleMouseMove"
    @mouseleave="handleMouseLeave"
  >
    <span
      :style="childStyle"
      class="relative inline-flex items-center transition-transform duration-200"
    >
      <slot />
    </span>
  </button>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { cn } from '~/lib/utils'

interface Props {
  class?: string
  strength?: number
  childStrength?: number
  radius?: number
}

const props = withDefaults(defineProps<Props>(), {
  strength: 0.3,
  childStrength: 0.6,
  radius: 150
})

const buttonRef = ref<HTMLButtonElement | null>(null)
const isHovered = ref(false)
const translateX = ref(0)
const translateY = ref(0)
const childTranslateX = ref(0)
const childTranslateY = ref(0)

const buttonStyle = computed(() => ({
  transform: `translate(${translateX.value}px, ${translateY.value}px)`
}))

const childStyle = computed(() => ({
  transform: `translate(${childTranslateX.value}px, ${childTranslateY.value}px)`
}))

const handleMouseEnter = () => {
  isHovered.value = true
}

const handleMouseMove = (e: MouseEvent) => {
  if (!buttonRef.value) return

  const rect = buttonRef.value.getBoundingClientRect()
  const centerX = rect.left + rect.width / 2
  const centerY = rect.top + rect.height / 2

  const distanceX = e.clientX - centerX
  const distanceY = e.clientY - centerY

  translateX.value = distanceX * props.strength
  translateY.value = distanceY * props.strength
  childTranslateX.value = distanceX * props.childStrength
  childTranslateY.value = distanceY * props.childStrength
}

const handleMouseLeave = () => {
  isHovered.value = false
  translateX.value = 0
  translateY.value = 0
  childTranslateX.value = 0
  childTranslateY.value = 0
}
</script>
