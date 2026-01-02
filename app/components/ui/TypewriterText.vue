<template>
  <span :class="cn('font-terminal', props.class)">
    <span>{{ displayText }}</span>
    <span
      v-if="showCursor"
      class="ml-0.5 inline-block animate-blink"
      :style="{ color: cursorColor }"
    >{{ cursorChar }}</span>
  </span>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { cn } from '~/lib/utils'

interface Props {
  class?: string
  text: string
  speed?: number
  delay?: number
  showCursor?: boolean
  cursorChar?: string
  cursorColor?: string
  loop?: boolean
  loopDelay?: number
}

const props = withDefaults(defineProps<Props>(), {
  speed: 50,
  delay: 0,
  showCursor: true,
  cursorChar: '█',
  cursorColor: 'var(--neon-cyan)',
  loop: false,
  loopDelay: 2000
})

const emit = defineEmits<{
  complete: []
}>()

const displayText = ref('')
let timeoutId: ReturnType<typeof setTimeout> | null = null
let intervalId: ReturnType<typeof setInterval> | null = null

const eraseText = (onComplete: () => void) => {
  intervalId = setInterval(() => {
    if (displayText.value.length > 0) {
      displayText.value = displayText.value.slice(0, -1)
    } else {
      if (intervalId) clearInterval(intervalId)
      // Brief pause after erasing before retyping
      timeoutId = setTimeout(onComplete, 300)
    }
  }, props.speed / 2) // Erase faster than typing
}

const typeText = () => {
  let index = 0
  displayText.value = ''

  intervalId = setInterval(() => {
    if (index < props.text.length) {
      displayText.value += props.text[index]
      index++
    } else {
      if (intervalId) clearInterval(intervalId)
      emit('complete')

      if (props.loop) {
        timeoutId = setTimeout(() => {
          eraseText(typeText)
        }, props.loopDelay)
      }
    }
  }, props.speed)
}

onMounted(() => {
  timeoutId = setTimeout(() => {
    typeText()
  }, props.delay)
})

onUnmounted(() => {
  if (timeoutId) clearTimeout(timeoutId)
  if (intervalId) clearInterval(intervalId)
})

watch(() => props.text, () => {
  if (intervalId) clearInterval(intervalId)
  if (timeoutId) clearTimeout(timeoutId)
  typeText()
})
</script>

<style scoped>
@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}

.animate-blink {
  animation: blink 1s step-end infinite;
}
</style>
