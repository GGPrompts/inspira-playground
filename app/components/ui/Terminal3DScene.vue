<template>
  <div
    ref="containerRef"
    :class="cn('relative overflow-hidden', props.class)"
  >
    <canvas ref="canvasRef" class="absolute inset-0" />

    <!-- Overlay content -->
    <div class="relative z-10">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import * as THREE from 'three'
import { cn } from '~/lib/utils'

interface Props {
  class?: string
  terminalCount?: number
  rotationSpeed?: number
  floatAmplitude?: number
  cameraDistance?: number
}

const props = withDefaults(defineProps<Props>(), {
  terminalCount: 5,
  rotationSpeed: 0.001,
  floatAmplitude: 0.5,
  cameraDistance: 12
})

const containerRef = ref<HTMLDivElement | null>(null)
const canvasRef = ref<HTMLCanvasElement | null>(null)

let scene: THREE.Scene
let camera: THREE.PerspectiveCamera
let renderer: THREE.WebGLRenderer
let terminals: THREE.Group[] = []
let animationId: number | null = null
let mouseX = 0
let mouseY = 0

const createTerminalMesh = (index: number): THREE.Group => {
  const group = new THREE.Group()

  // Terminal screen (main body)
  const screenGeometry = new THREE.BoxGeometry(3, 2, 0.1)
  const screenMaterial = new THREE.MeshStandardMaterial({
    color: 0x0a0a0f,
    emissive: 0x001111,
    emissiveIntensity: 0.3,
    metalness: 0.8,
    roughness: 0.2
  })
  const screen = new THREE.Mesh(screenGeometry, screenMaterial)
  group.add(screen)

  // Screen glow (emissive plane on front)
  const glowGeometry = new THREE.PlaneGeometry(2.8, 1.8)
  const glowColor = index % 3 === 0 ? 0x00ffff : index % 3 === 1 ? 0xa855f7 : 0x22c55e
  const glowMaterial = new THREE.MeshBasicMaterial({
    color: glowColor,
    transparent: true,
    opacity: 0.15
  })
  const glow = new THREE.Mesh(glowGeometry, glowMaterial)
  glow.position.z = 0.06
  group.add(glow)

  // Terminal text lines (simple boxes to simulate text)
  const lineColors = [0x00ffff, 0xa855f7, 0x22c55e, 0xffffff]
  for (let i = 0; i < 6; i++) {
    const lineWidth = 0.3 + Math.random() * 1.5
    const lineGeometry = new THREE.BoxGeometry(lineWidth, 0.08, 0.01)
    const lineMaterial = new THREE.MeshBasicMaterial({
      color: lineColors[i % lineColors.length],
      transparent: true,
      opacity: 0.6 + Math.random() * 0.4
    })
    const line = new THREE.Mesh(lineGeometry, lineMaterial)
    line.position.set(-1.2 + lineWidth / 2, 0.7 - i * 0.22, 0.06)
    group.add(line)
  }

  // Blinking cursor
  const cursorGeometry = new THREE.BoxGeometry(0.08, 0.12, 0.01)
  const cursorMaterial = new THREE.MeshBasicMaterial({
    color: 0x00ffff,
    transparent: true,
    opacity: 1
  })
  const cursor = new THREE.Mesh(cursorGeometry, cursorMaterial)
  cursor.position.set(-0.5, -0.5, 0.06)
  cursor.userData.isCursor = true
  group.add(cursor)

  // Frame/bezel
  const frameGeometry = new THREE.BoxGeometry(3.2, 2.2, 0.15)
  const frameMaterial = new THREE.MeshStandardMaterial({
    color: 0x1a1a2e,
    metalness: 0.9,
    roughness: 0.3
  })
  const frame = new THREE.Mesh(frameGeometry, frameMaterial)
  frame.position.z = -0.05
  group.add(frame)

  // Edge glow
  const edgeGeometry = new THREE.EdgesGeometry(frameGeometry)
  const edgeMaterial = new THREE.LineBasicMaterial({
    color: glowColor,
    transparent: true,
    opacity: 0.5
  })
  const edges = new THREE.LineSegments(edgeGeometry, edgeMaterial)
  edges.position.z = -0.05
  group.add(edges)

  return group
}

const init = () => {
  if (!containerRef.value || !canvasRef.value) return

  const width = containerRef.value.clientWidth
  const height = containerRef.value.clientHeight

  // Scene
  scene = new THREE.Scene()
  scene.fog = new THREE.Fog(0x0a0a0f, 5, 25)

  // Camera
  camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100)
  camera.position.z = props.cameraDistance

  // Renderer
  renderer = new THREE.WebGLRenderer({
    canvas: canvasRef.value,
    antialias: true,
    alpha: true
  })
  renderer.setSize(width, height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.setClearColor(0x0a0a0f, 1)

  // Lights
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.3)
  scene.add(ambientLight)

  const pointLight1 = new THREE.PointLight(0x00ffff, 1, 20)
  pointLight1.position.set(5, 5, 5)
  scene.add(pointLight1)

  const pointLight2 = new THREE.PointLight(0xa855f7, 0.8, 20)
  pointLight2.position.set(-5, -5, 5)
  scene.add(pointLight2)

  // Create terminals in a circular arrangement
  for (let i = 0; i < props.terminalCount; i++) {
    const terminal = createTerminalMesh(i)

    // Position in a 3D arc
    const angle = (i / props.terminalCount) * Math.PI * 2 - Math.PI / 2
    const radius = 6
    const yOffset = Math.sin(i * 0.8) * 2

    terminal.position.x = Math.cos(angle) * radius
    terminal.position.y = yOffset
    terminal.position.z = Math.sin(angle) * radius - 3

    // Rotate to face center (roughly)
    terminal.rotation.y = -angle + Math.PI

    // Store initial position for animation
    terminal.userData.initialY = terminal.position.y
    terminal.userData.phase = Math.random() * Math.PI * 2

    terminals.push(terminal)
    scene.add(terminal)
  }

  // Add particle field
  const particleCount = 200
  const particleGeometry = new THREE.BufferGeometry()
  const positions = new Float32Array(particleCount * 3)

  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 30
    positions[i * 3 + 1] = (Math.random() - 0.5) * 20
    positions[i * 3 + 2] = (Math.random() - 0.5) * 20
  }

  particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  const particleMaterial = new THREE.PointsMaterial({
    color: 0x00ffff,
    size: 0.05,
    transparent: true,
    opacity: 0.6
  })
  const particles = new THREE.Points(particleGeometry, particleMaterial)
  scene.add(particles)

  // Mouse move handler
  const handleMouseMove = (e: MouseEvent) => {
    if (!containerRef.value) return
    const rect = containerRef.value.getBoundingClientRect()
    mouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1
    mouseY = -((e.clientY - rect.top) / rect.height) * 2 + 1
  }

  containerRef.value.addEventListener('mousemove', handleMouseMove)

  // Animation loop
  let time = 0
  const animate = () => {
    time += 0.016

    // Rotate scene slightly based on mouse
    scene.rotation.y += (mouseX * 0.1 - scene.rotation.y) * 0.05
    scene.rotation.x += (mouseY * 0.05 - scene.rotation.x) * 0.05

    // Animate terminals
    terminals.forEach((terminal, i) => {
      // Floating animation
      const floatOffset = Math.sin(time * 0.5 + terminal.userData.phase) * props.floatAmplitude
      terminal.position.y = terminal.userData.initialY + floatOffset

      // Slight rotation
      terminal.rotation.z = Math.sin(time * 0.3 + i) * 0.05

      // Cursor blink
      terminal.children.forEach((child: THREE.Object3D) => {
        if (child.userData.isCursor) {
          ;(child as THREE.Mesh).visible = Math.sin(time * 5) > 0
        }
      })
    })

    // Rotate particle field
    particles.rotation.y += 0.0005
    particles.rotation.x += 0.0002

    renderer.render(scene, camera)
    animationId = requestAnimationFrame(animate)
  }

  animate()

  // Handle resize
  const handleResize = () => {
    if (!containerRef.value) return
    const width = containerRef.value.clientWidth
    const height = containerRef.value.clientHeight

    camera.aspect = width / height
    camera.updateProjectionMatrix()
    renderer.setSize(width, height)
  }

  window.addEventListener('resize', handleResize)

  onUnmounted(() => {
    if (animationId) cancelAnimationFrame(animationId)
    window.removeEventListener('resize', handleResize)
    containerRef.value?.removeEventListener('mousemove', handleMouseMove)
    renderer.dispose()
  })
}

onMounted(() => {
  init()
})
</script>
