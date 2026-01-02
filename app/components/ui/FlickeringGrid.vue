<template>
  <div
    ref="containerRef"
    :class="cn('relative overflow-hidden', props.class)"
  >
    <canvas
      ref="canvasRef"
      class="pointer-events-none"
      :style="{ width: '100%', height: '100%' }"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { cn } from '~/lib/utils'

interface Props {
  class?: string
  squareSize?: number
  gridGap?: number
  flickerChance?: number
  color?: string
  maxOpacity?: number
}

const props = withDefaults(defineProps<Props>(), {
  squareSize: 4,
  gridGap: 6,
  flickerChance: 0.3,
  color: 'rgb(0, 255, 255)',
  maxOpacity: 0.3
})

const containerRef = ref<HTMLDivElement | null>(null)
const canvasRef = ref<HTMLCanvasElement | null>(null)
let animationId: number | null = null
let isVisible = true
let lastFlickerTime = 0
const flickerInterval = 150 // ms between flicker updates

// Create grid of squares with random opacities
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

  const cols = Math.ceil(rect.width / (props.squareSize + props.gridGap))
  const rows = Math.ceil(rect.height / (props.squareSize + props.gridGap))

  // Store opacities for each cell
  const opacities: number[][] = Array(rows)
    .fill(null)
    .map(() =>
      Array(cols)
        .fill(null)
        .map(() => Math.random() * props.maxOpacity)
    )

  const draw = (timestamp: number) => {
    const shouldFlicker = timestamp - lastFlickerTime >= flickerInterval

    if (shouldFlicker) {
      lastFlickerTime = timestamp
      ctx.clearRect(0, 0, rect.width, rect.height)

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const rowData = opacities[row]
          if (!rowData) continue

          // Randomly flicker (only when interval elapsed)
          if (Math.random() < props.flickerChance) {
            rowData[col] = Math.random() * props.maxOpacity
          }

          const x = col * (props.squareSize + props.gridGap)
          const y = row * (props.squareSize + props.gridGap)
          const opacity = rowData[col] ?? 0

          ctx.fillStyle = props.color.replace('rgb', 'rgba').replace(')', `, ${opacity})`)
          ctx.fillRect(x, y, props.squareSize, props.squareSize)
        }
      }
    }

    if (isVisible) {
      animationId = requestAnimationFrame(draw)
    }
  }

  draw(0)
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
    isVisible = false
    if (animationId) cancelAnimationFrame(animationId)
    resizeObserver.disconnect()
  })
})
</script>
