<template>
  <div :class="cn('font-terminal', props.class)">
    <!-- Terminal-style loading indicator -->
    <div class="flex items-center gap-2 text-[var(--neon-cyan)]">
      <span class="text-slate-500">$</span>
      <span>{{ currentText }}</span>
      <span class="cursor-blink text-[var(--neon-cyan)]" />
    </div>

    <!-- Progress bar (optional) -->
    <div v-if="showProgress" class="mt-2">
      <div class="h-1 w-full rounded-full bg-slate-800">
        <div
          class="h-full rounded-full bg-gradient-to-r from-[var(--neon-cyan)] to-[var(--neon-purple)] transition-all duration-300"
          :style="{ width: `${progress}%` }"
        />
      </div>
      <div class="mt-1 text-xs text-slate-500">{{ progress }}%</div>
    </div>

    <!-- Spinner variant -->
    <div v-if="variant === 'spinner'" class="flex items-center gap-3">
      <div class="terminal-spinner">
        <span v-for="(char, i) in spinnerChars" :key="i" :class="{ active: spinnerIndex === i }">
          {{ char }}
        </span>
      </div>
      <span class="text-slate-400">{{ message }}</span>
    </div>

    <!-- Dots variant -->
    <div v-if="variant === 'dots'" class="flex items-center gap-1">
      <span class="text-slate-500">[</span>
      <span
        v-for="i in 3"
        :key="i"
        class="loading-dot"
        :style="{ animationDelay: `${(i - 1) * 0.2}s` }"
      >.</span>
      <span class="text-slate-500">]</span>
      <span class="ml-2 text-slate-400">{{ message }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { cn } from '~/lib/utils'

interface Props {
  class?: string
  variant?: 'text' | 'spinner' | 'dots'
  message?: string
  texts?: string[]
  showProgress?: boolean
  progress?: number
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'text',
  message: 'Loading...',
  texts: () => ['Initializing...', 'Compiling...', 'Loading modules...', 'Almost there...'],
  showProgress: false,
  progress: 0
})

const spinnerChars = ['|', '/', '-', '\\']
const spinnerIndex = ref(0)
const textIndex = ref(0)
const charIndex = ref(0)
let spinnerInterval: ReturnType<typeof setInterval> | null = null
let typeInterval: ReturnType<typeof setInterval> | null = null

const currentText = computed(() => {
  const fullText = props.texts[textIndex.value] ?? ''
  return fullText.slice(0, charIndex.value)
})

onMounted(() => {
  // Spinner animation
  spinnerInterval = setInterval(() => {
    spinnerIndex.value = (spinnerIndex.value + 1) % spinnerChars.length
  }, 100)

  // Typewriter animation
  if (props.variant === 'text') {
    typeInterval = setInterval(() => {
      const fullText = props.texts[textIndex.value] ?? ''
      if (charIndex.value < fullText.length) {
        charIndex.value++
      } else {
        // Wait a bit then move to next text
        setTimeout(() => {
          textIndex.value = (textIndex.value + 1) % props.texts.length
          charIndex.value = 0
        }, 1000)
      }
    }, 50)
  }
})

onUnmounted(() => {
  if (spinnerInterval) clearInterval(spinnerInterval)
  if (typeInterval) clearInterval(typeInterval)
})
</script>

<style scoped>
.cursor-blink::after {
  content: '█';
  animation: blink 1s step-end infinite;
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}

.terminal-spinner span {
  display: none;
}

.terminal-spinner span.active {
  display: inline;
  color: var(--neon-cyan);
}

.loading-dot {
  animation: dot-bounce 0.6s infinite;
  color: var(--neon-cyan);
}

@keyframes dot-bounce {
  0%, 100% {
    transform: translateY(0);
    opacity: 0.5;
  }
  50% {
    transform: translateY(-4px);
    opacity: 1;
  }
}
</style>
