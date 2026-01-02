<template>
  <div :class="cn('relative overflow-hidden', props.class)">
    <slot />

    <!-- Scanlines -->
    <div
      v-if="showScanlines"
      class="pointer-events-none absolute inset-0 z-10"
      :style="scanlinesStyle"
    />

    <!-- CRT flicker -->
    <div
      v-if="showFlicker"
      class="pointer-events-none absolute inset-0 z-10 crt-flicker"
    />

    <!-- Vignette -->
    <div
      v-if="showVignette"
      class="pointer-events-none absolute inset-0 z-10"
      :style="vignetteStyle"
    />

    <!-- RGB shift overlay (subtle) -->
    <div
      v-if="showRgbShift"
      class="pointer-events-none absolute inset-0 z-10 mix-blend-screen rgb-shift"
    />

    <!-- Curved screen effect -->
    <div
      v-if="showCurve"
      class="pointer-events-none absolute inset-0 z-20"
      :style="curveStyle"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '~/lib/utils'

interface Props {
  class?: string
  showScanlines?: boolean
  showFlicker?: boolean
  showVignette?: boolean
  showRgbShift?: boolean
  showCurve?: boolean
  scanlineOpacity?: number
  scanlineSize?: number
  vignetteStrength?: number
}

const props = withDefaults(defineProps<Props>(), {
  showScanlines: true,
  showFlicker: true,
  showVignette: true,
  showRgbShift: false,
  showCurve: false,
  scanlineOpacity: 0.15,
  scanlineSize: 2,
  vignetteStrength: 0.4
})

const scanlinesStyle = computed(() => ({
  background: `repeating-linear-gradient(
    0deg,
    transparent,
    transparent ${props.scanlineSize}px,
    rgba(0, 0, 0, ${props.scanlineOpacity}) ${props.scanlineSize}px,
    rgba(0, 0, 0, ${props.scanlineOpacity}) ${props.scanlineSize * 2}px
  )`
}))

const vignetteStyle = computed(() => ({
  background: `radial-gradient(ellipse at center, transparent 0%, transparent 50%, rgba(0, 0, 0, ${props.vignetteStrength}) 100%)`
}))

const curveStyle = computed(() => ({
  background: 'transparent',
  boxShadow: 'inset 0 0 100px 20px rgba(0, 0, 0, 0.3)',
  borderRadius: '10% / 5%'
}))
</script>

<style scoped>
.crt-flicker {
  animation: crt-flicker 0.15s infinite;
  background: rgba(18, 16, 16, 0);
}

@keyframes crt-flicker {
  0% {
    opacity: 0.27861;
  }
  5% {
    opacity: 0.34769;
  }
  10% {
    opacity: 0.23604;
  }
  15% {
    opacity: 0.90626;
  }
  20% {
    opacity: 0.18128;
  }
  25% {
    opacity: 0.83891;
  }
  30% {
    opacity: 0.65583;
  }
  35% {
    opacity: 0.67807;
  }
  40% {
    opacity: 0.26559;
  }
  45% {
    opacity: 0.84693;
  }
  50% {
    opacity: 0.96019;
  }
  55% {
    opacity: 0.08594;
  }
  60% {
    opacity: 0.20313;
  }
  65% {
    opacity: 0.71988;
  }
  70% {
    opacity: 0.53455;
  }
  75% {
    opacity: 0.37288;
  }
  80% {
    opacity: 0.71428;
  }
  85% {
    opacity: 0.70419;
  }
  90% {
    opacity: 0.7003;
  }
  95% {
    opacity: 0.36108;
  }
  100% {
    opacity: 0.24387;
  }
}

.rgb-shift {
  animation: rgb-shift 4s infinite linear;
}

@keyframes rgb-shift {
  0%, 100% {
    box-shadow:
      -1px 0 0 rgba(255, 0, 0, 0.1),
      1px 0 0 rgba(0, 255, 255, 0.1);
  }
  50% {
    box-shadow:
      1px 0 0 rgba(255, 0, 0, 0.1),
      -1px 0 0 rgba(0, 255, 255, 0.1);
  }
}
</style>
