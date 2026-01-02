<template>
  <div
    ref="containerRef"
    :class="cn('relative overflow-hidden', props.class)"
    @mousemove="handleMouseMove"
  >
    <canvas
      ref="canvasRef"
      class="pointer-events-none absolute inset-0"
    />
    <slot />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { cn } from '~/lib/utils'

interface Props {
  class?: string
  starCount?: number
  starColor?: [number, number, number]
  speedFactor?: number
  parallaxStrength?: number
}

const props = withDefaults(defineProps<Props>(), {
  starCount: 200,
  starColor: () => [0, 255, 255],
  speedFactor: 0.05,
  parallaxStrength: 20
})

interface Star {
  x: number
  y: number
  z: number
  size: number
  layer: number
}

const containerRef = ref<HTMLDivElement | null>(null)
const canvasRef = ref<HTMLCanvasElement | null>(null)
let animationId: number | null = null
let stars: Star[] = []
let mouseX = 0
let mouseY = 0
let targetMouseX = 0
let targetMouseY = 0

const handleMouseMove = (e: MouseEvent) => {
  const rect = containerRef.value?.getBoundingClientRect()
  if (!rect) return
  targetMouseX = (e.clientX - rect.left - rect.width / 2) / rect.width
  targetMouseY = (e.clientY - rect.top - rect.height / 2) / rect.height
}

const initStars = (width: number, height: number) => {
  stars = Array(props.starCount)
    .fill(null)
    .map(() => ({
      x: Math.random() * width - width / 2,
      y: Math.random() * height - height / 2,
      z: Math.random() * 1000,
      size: Math.random() * 2 + 0.5,
      layer: Math.floor(Math.random() * 3)
    }))
}

const setupCanvas = () => {
  const canvas = canvasRef.value
  const container = containerRef.value
  if (!canvas || !container) return

  const dpr = window.devicePixelRatio || 1
  const rect = container.getBoundingClientRect()

  canvas.width = rect.width * dpr
  canvas.height = rect.height * dpr
  canvas.style.width = `${rect.width}px`
  canvas.style.height = `${rect.height}px`

  const ctx = canvas.getContext('2d')
  if (!ctx) return

  ctx.scale(dpr, dpr)
  initStars(rect.width, rect.height)

  const draw = () => {
    ctx.clearRect(0, 0, rect.width, rect.height)

    // Smooth mouse interpolation
    mouseX += (targetMouseX - mouseX) * 0.1
    mouseY += (targetMouseY - mouseY) * 0.1

    const centerX = rect.width / 2
    const centerY = rect.height / 2

    stars.forEach((star) => {
      // Move stars towards viewer
      star.z -= props.speedFactor * (1 + star.layer * 0.5)

      // Reset star if too close
      if (star.z <= 0) {
        star.z = 1000
        star.x = Math.random() * rect.width - centerX
        star.y = Math.random() * rect.height - centerY
      }

      // Project to 2D with parallax
      const scale = 500 / star.z
      const parallaxOffset = props.parallaxStrength * (1 - star.layer * 0.3)
      const x = centerX + star.x * scale + mouseX * parallaxOffset
      const y = centerY + star.y * scale + mouseY * parallaxOffset

      // Calculate opacity based on distance
      const opacity = Math.min(1, (1000 - star.z) / 500) * (0.3 + star.layer * 0.35)
      const size = star.size * scale * 0.5

      // Draw star with glow
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, size * 3)
      gradient.addColorStop(0, `rgba(${props.starColor.join(',')}, ${opacity})`)
      gradient.addColorStop(0.5, `rgba(${props.starColor.join(',')}, ${opacity * 0.3})`)
      gradient.addColorStop(1, 'transparent')

      ctx.beginPath()
      ctx.arc(x, y, size * 3, 0, Math.PI * 2)
      ctx.fillStyle = gradient
      ctx.fill()

      // Core of star
      ctx.beginPath()
      ctx.arc(x, y, size * 0.5, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`
      ctx.fill()
    })

    animationId = requestAnimationFrame(draw)
  }

  draw()
}

onMounted(() => {
  setupCanvas()

  const resizeObserver = new ResizeObserver(() => {
    if (animationId) cancelAnimationFrame(animationId)
    setupCanvas()
  })

  if (containerRef.value) {
    resizeObserver.observe(containerRef.value)
  }

  onUnmounted(() => {
    if (animationId) cancelAnimationFrame(animationId)
    resizeObserver.disconnect()
  })
})
</script>
