<template>
  <div class="min-h-screen bg-[#0a0a0f] dark">
    <!-- Hero with Stars Background -->
    <section class="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
      <StarsBackground class="absolute inset-0" :star-count="300" :speed-factor="0.03">
        <Meteors :count="15" color="rgba(168, 85, 247, 0.6)" />
      </StarsBackground>

      <div class="relative z-10 text-center px-4">
        <ScrollReveal direction="up" :delay="100">
          <h1 class="text-5xl md:text-7xl font-bold text-white terminal-glow mb-4 font-terminal">
            <TypewriterText text="Animation Lab" :speed="80" />
          </h1>
        </ScrollReveal>

        <ScrollReveal direction="up" :delay="300">
          <p class="text-xl text-slate-400 max-w-2xl mx-auto font-terminal">
            Testing ground for Inspira UI + GSAP + Motion-V + Three.js effects.
            <br />
            <span class="text-[var(--neon-cyan)]">Dark terminal vibes only.</span>
          </p>
        </ScrollReveal>
      </div>
    </section>

    <!-- Background Effects Section -->
    <section class="py-20 px-4">
      <div class="max-w-7xl mx-auto">
        <ScrollReveal>
          <h2 class="text-3xl font-bold text-white terminal-glow-purple mb-8 font-terminal">
            // Animated Backgrounds
          </h2>
        </ScrollReveal>

        <div class="grid md:grid-cols-2 gap-8">
          <!-- Flickering Grid -->
          <ScrollReveal direction="left" :delay="100">
            <TiltCard class="rounded-xl overflow-hidden">
              <div class="relative h-64 bg-[#0a0a0f]">
                <FlickeringGrid
                  class="absolute inset-0"
                  :square-size="4"
                  :grid-gap="6"
                  :flicker-chance="0.3"
                  color="rgb(0, 255, 255)"
                  :max-opacity="0.3"
                />
                <div class="absolute inset-0 flex items-center justify-center">
                  <div class="glass rounded-lg p-4 text-center">
                    <h3 class="text-lg font-bold text-[var(--neon-cyan)] font-terminal">FlickeringGrid</h3>
                    <p class="text-sm text-slate-400">Canvas-based animated grid</p>
                  </div>
                </div>
              </div>
            </TiltCard>
          </ScrollReveal>

          <!-- Stars Background -->
          <ScrollReveal direction="right" :delay="200">
            <TiltCard class="rounded-xl overflow-hidden">
              <div class="relative h-64 bg-[#0a0a0f]">
                <StarsBackground
                  class="absolute inset-0"
                  :star-count="150"
                  :star-color="[168, 85, 247]"
                  :speed-factor="0.08"
                />
                <div class="absolute inset-0 flex items-center justify-center">
                  <div class="glass rounded-lg p-4 text-center">
                    <h3 class="text-lg font-bold text-[var(--neon-purple)] font-terminal">StarsBackground</h3>
                    <p class="text-sm text-slate-400">3D parallax starfield</p>
                  </div>
                </div>
              </div>
            </TiltCard>
          </ScrollReveal>

          <!-- Aurora Background -->
          <ScrollReveal direction="left" :delay="300">
            <TiltCard class="rounded-xl overflow-hidden">
              <AuroraBackground class="h-64">
                <div class="flex items-center justify-center h-full">
                  <div class="glass rounded-lg p-4 text-center">
                    <h3 class="text-lg font-bold text-white font-terminal">AuroraBackground</h3>
                    <p class="text-sm text-slate-400">Gradient aurora effect</p>
                  </div>
                </div>
              </AuroraBackground>
            </TiltCard>
          </ScrollReveal>

          <!-- Meteors -->
          <ScrollReveal direction="right" :delay="400">
            <TiltCard class="rounded-xl overflow-hidden">
              <div class="relative h-64 bg-gradient-to-br from-[#0a0a0f] to-slate-900">
                <Meteors :count="25" color="rgba(0, 255, 255, 0.8)" />
                <div class="absolute inset-0 flex items-center justify-center">
                  <div class="glass rounded-lg p-4 text-center">
                    <h3 class="text-lg font-bold text-[var(--neon-cyan)] font-terminal">Meteors</h3>
                    <p class="text-sm text-slate-400">Falling meteor animation</p>
                  </div>
                </div>
              </div>
            </TiltCard>
          </ScrollReveal>
        </div>
      </div>
    </section>

    <!-- CRT Effects Section -->
    <section class="py-20 px-4 bg-gradient-to-b from-transparent via-[var(--neon-purple)]/5 to-transparent">
      <div class="max-w-7xl mx-auto">
        <ScrollReveal>
          <h2 class="text-3xl font-bold text-white terminal-glow mb-8 font-terminal">
            // CRT & Terminal Effects
          </h2>
        </ScrollReveal>

        <div class="grid md:grid-cols-2 gap-8">
          <!-- CRT Effect Demo -->
          <ScrollReveal direction="up" :delay="100">
            <CRTEffect
              class="rounded-xl overflow-hidden"
              :show-scanlines="true"
              :show-flicker="true"
              :show-vignette="true"
              :scanline-opacity="0.2"
            >
              <div class="h-64 bg-[#0a0a0f] p-6 font-terminal">
                <div class="text-[var(--neon-green)] text-sm">
                  <p class="mb-2">matt@opus:~$ neofetch</p>
                  <p class="text-slate-500">──────────────────────────</p>
                  <p><span class="text-[var(--neon-cyan)]">OS:</span> Arch Linux x86_64</p>
                  <p><span class="text-[var(--neon-cyan)]">Host:</span> Claude Code Terminal</p>
                  <p><span class="text-[var(--neon-cyan)]">Shell:</span> zsh 5.9</p>
                  <p><span class="text-[var(--neon-cyan)]">Editor:</span> neovim</p>
                  <p><span class="text-[var(--neon-cyan)]">Theme:</span> <span class="text-[var(--neon-purple)]">Neon Dark</span></p>
                  <p class="mt-2">matt@opus:~$ <span class="cursor-blink"></span></p>
                </div>
              </div>
            </CRTEffect>
          </ScrollReveal>

          <!-- Spotlight Cursor Demo -->
          <ScrollReveal direction="up" :delay="200">
            <SpotlightCursor class="rounded-xl overflow-hidden glass h-64">
              <div class="h-full flex items-center justify-center p-6">
                <div class="text-center">
                  <h3 class="text-lg font-bold text-white font-terminal mb-2">SpotlightCursor</h3>
                  <p class="text-sm text-slate-400">Move your mouse around</p>
                  <p class="text-xs text-[var(--neon-cyan)] mt-2">Cursor follows with glow effect</p>
                </div>
              </div>
            </SpotlightCursor>
          </ScrollReveal>
        </div>
      </div>
    </section>

    <!-- Interactive Elements Section -->
    <section class="py-20 px-4">
      <div class="max-w-7xl mx-auto">
        <ScrollReveal>
          <h2 class="text-3xl font-bold text-white terminal-glow-green mb-8 font-terminal">
            // Interactive Components
          </h2>
        </ScrollReveal>

        <div class="grid md:grid-cols-3 gap-8 mb-12">
          <!-- Tilt Card -->
          <ScrollReveal direction="up" :delay="100">
            <TiltCard
              class="glass rounded-xl p-6 h-48"
              :max-tilt="20"
              :show-spotlight="true"
              spotlight-color="rgba(0, 255, 255, 0.15)"
            >
              <h3 class="text-lg font-bold text-[var(--neon-cyan)] font-terminal mb-2">TiltCard</h3>
              <p class="text-sm text-slate-400">3D perspective tilt on hover with spotlight</p>
            </TiltCard>
          </ScrollReveal>

          <!-- Gradient Border -->
          <ScrollReveal direction="up" :delay="200">
            <GradientBorder
              class="h-48"
              :colors="['#00ffff', '#a855f7', '#ec4899', '#00ffff']"
              :speed="3"
            >
              <div class="p-6 h-full flex flex-col justify-center">
                <h3 class="text-lg font-bold text-white font-terminal mb-2">GradientBorder</h3>
                <p class="text-sm text-slate-400">Animated rotating gradient border</p>
              </div>
            </GradientBorder>
          </ScrollReveal>

          <!-- Magnetic Button -->
          <ScrollReveal direction="up" :delay="300">
            <div class="glass rounded-xl p-6 h-48 flex flex-col justify-center items-center">
              <h3 class="text-lg font-bold text-white font-terminal mb-4">MagneticButton</h3>
              <MagneticButton
                class="px-6 py-3 bg-[var(--neon-cyan)]/10 border border-[var(--neon-cyan)]/50 rounded-lg text-[var(--neon-cyan)] font-terminal hover:bg-[var(--neon-cyan)]/20 transition-colors"
                :strength="0.4"
                :child-strength="0.6"
              >
                Hover & Move
              </MagneticButton>
            </div>
          </ScrollReveal>
        </div>

        <!-- Shimmer Button Row -->
        <ScrollReveal direction="up" :delay="400">
          <div class="flex flex-wrap gap-4 justify-center">
            <ShimmerButton
              shimmer-color="#00ffff"
              background="rgba(0, 255, 255, 0.1)"
              class="text-[var(--neon-cyan)] border border-[var(--neon-cyan)]/30 font-terminal"
            >
              Cyan Shimmer
            </ShimmerButton>
            <ShimmerButton
              shimmer-color="#a855f7"
              background="rgba(168, 85, 247, 0.1)"
              class="text-[var(--neon-purple)] border border-[var(--neon-purple)]/30 font-terminal"
            >
              Purple Shimmer
            </ShimmerButton>
            <ShimmerButton
              shimmer-color="#22c55e"
              background="rgba(34, 197, 94, 0.1)"
              class="text-[var(--neon-green)] border border-[var(--neon-green)]/30 font-terminal"
            >
              Green Shimmer
            </ShimmerButton>
          </div>
        </ScrollReveal>
      </div>
    </section>

    <!-- Loading States Section -->
    <section class="py-20 px-4 bg-gradient-to-b from-transparent via-[var(--neon-cyan)]/5 to-transparent">
      <div class="max-w-7xl mx-auto">
        <ScrollReveal>
          <h2 class="text-3xl font-bold text-white terminal-glow mb-8 font-terminal">
            // Loading States
          </h2>
        </ScrollReveal>

        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <!-- Terminal Loader - Text -->
          <ScrollReveal direction="up" :delay="100">
            <div class="glass rounded-xl p-6">
              <h4 class="text-sm font-bold text-slate-400 mb-4 font-terminal">Typewriter</h4>
              <TerminalLoader
                variant="text"
                :texts="['Compiling...', 'Bundling assets...', 'Optimizing...', 'Done!']"
              />
            </div>
          </ScrollReveal>

          <!-- Terminal Loader - Spinner -->
          <ScrollReveal direction="up" :delay="200">
            <div class="glass rounded-xl p-6">
              <h4 class="text-sm font-bold text-slate-400 mb-4 font-terminal">Spinner</h4>
              <TerminalLoader variant="spinner" message="Processing..." />
            </div>
          </ScrollReveal>

          <!-- Terminal Loader - Dots -->
          <ScrollReveal direction="up" :delay="300">
            <div class="glass rounded-xl p-6">
              <h4 class="text-sm font-bold text-slate-400 mb-4 font-terminal">Dots</h4>
              <TerminalLoader variant="dots" message="Loading" />
            </div>
          </ScrollReveal>

          <!-- Skeleton Loaders -->
          <ScrollReveal direction="up" :delay="400">
            <div class="glass rounded-xl p-6">
              <h4 class="text-sm font-bold text-slate-400 mb-4 font-terminal">Skeleton</h4>
              <div class="space-y-2">
                <SkeletonLoader height="12px" width="80%" />
                <SkeletonLoader height="12px" width="60%" />
                <SkeletonLoader height="12px" width="90%" />
              </div>
            </div>
          </ScrollReveal>
        </div>

        <!-- Progress Bar Demo -->
        <ScrollReveal direction="up" :delay="500">
          <div class="mt-8 glass rounded-xl p-6">
            <h4 class="text-sm font-bold text-slate-400 mb-4 font-terminal">Progress Bar</h4>
            <TerminalLoader
              variant="text"
              :texts="['Installing dependencies...']"
              :show-progress="true"
              :progress="progressValue"
            />
          </div>
        </ScrollReveal>
      </div>
    </section>

    <!-- Maz-UI Components Section -->
    <section class="py-20 px-4">
      <div class="max-w-7xl mx-auto">
        <ScrollReveal>
          <h2 class="text-3xl font-bold text-white terminal-glow mb-8 font-terminal">
            // Maz-UI Integration
          </h2>
        </ScrollReveal>

        <div class="grid md:grid-cols-2 gap-8 mb-8">
          <!-- MazInputCode - Terminal Access -->
          <ScrollReveal direction="left" :delay="100">
            <div class="glass rounded-xl p-6">
              <h4 class="text-sm font-bold text-slate-400 mb-2 font-terminal">MazInputCode</h4>
              <p class="text-xs text-slate-500 mb-4">Terminal access verification</p>
              <div class="space-y-4">
                <div class="flex justify-center">
                  <MazInputCode
                    v-model="accessCode"
                    :code-length="6"
                    size="lg"
                    class="maz-terminal-code"
                    @completed="onCodeComplete"
                  />
                </div>
                <p class="text-center text-xs font-terminal" :class="codeStatus.class">
                  {{ codeStatus.message }}
                </p>
              </div>
            </div>
          </ScrollReveal>

          <!-- MazChart - System Metrics -->
          <ScrollReveal direction="right" :delay="200">
            <div class="glass rounded-xl p-6">
              <h4 class="text-sm font-bold text-slate-400 mb-2 font-terminal">MazChart</h4>
              <p class="text-xs text-slate-500 mb-4">System metrics visualization</p>
              <div class="h-48">
                <MazChart
                  v-bind="systemMetricsChart"
                  class="w-full h-full"
                />
              </div>
            </div>
          </ScrollReveal>
        </div>

        <!-- MazDialog Demo -->
        <ScrollReveal direction="up" :delay="300">
          <div class="glass rounded-xl p-6 text-center">
            <h4 class="text-sm font-bold text-slate-400 mb-2 font-terminal">MazDialog</h4>
            <p class="text-xs text-slate-500 mb-4">Terminal-style modal popup</p>
            <MazBtn
              color="primary"
              class="maz-terminal-btn"
              @click="isDialogOpen = true"
            >
              Open Terminal Dialog
            </MazBtn>

            <MazDialog
              v-model="isDialogOpen"
              title="// SYSTEM_ACCESS"
              class="maz-terminal-dialog"
            >
              <div class="font-terminal text-sm space-y-2">
                <p class="text-[var(--neon-green)]">root@opus:~$ system --status</p>
                <p class="text-slate-400">────────────────────────────</p>
                <p><span class="text-[var(--neon-cyan)]">CPU:</span> <span class="text-white">12% @ 3.8GHz</span></p>
                <p><span class="text-[var(--neon-cyan)]">MEM:</span> <span class="text-white">8.2GB / 32GB</span></p>
                <p><span class="text-[var(--neon-cyan)]">DISK:</span> <span class="text-white">456GB / 1TB</span></p>
                <p><span class="text-[var(--neon-cyan)]">NET:</span> <span class="text-[var(--neon-green)]">CONNECTED</span></p>
                <p class="mt-4 text-[var(--neon-green)]">root@opus:~$ <span class="cursor-blink"></span></p>
              </div>

              <template #footer="{ close }">
                <MazBtn color="danger" outline size="sm" @click="close">
                  Close
                </MazBtn>
                <MazBtn color="primary" size="sm" class="maz-terminal-btn" @click="close">
                  Execute
                </MazBtn>
              </template>
            </MazDialog>
          </div>
        </ScrollReveal>
      </div>
    </section>

    <!-- Text Effects Section -->
    <section class="py-20 px-4">
      <div class="max-w-7xl mx-auto">
        <ScrollReveal>
          <h2 class="text-3xl font-bold text-white terminal-glow-purple mb-8 font-terminal">
            // Text Effects
          </h2>
        </ScrollReveal>

        <div class="grid md:grid-cols-2 gap-8">
          <!-- Morphing Text -->
          <ScrollReveal direction="left" :delay="100">
            <div class="glass rounded-xl p-8 h-32 flex flex-col items-center justify-center">
              <span class="text-xs text-slate-500 font-terminal mb-2">MorphingText</span>
              <MorphingText
                :texts="['Claude Code', 'AI Agents', 'Terminal UI', 'Open Source']"
                class="text-3xl font-bold text-slate-100 terminal-glow-subtle font-terminal"
              />
            </div>
          </ScrollReveal>

          <!-- Typewriter -->
          <ScrollReveal direction="right" :delay="200">
            <div class="glass rounded-xl p-8 h-32 flex flex-col items-center justify-center">
              <span class="text-xs text-slate-500 font-terminal mb-2">TypewriterText</span>
              <TypewriterText
                text="Building the future with AI-powered terminals..."
                :speed="40"
                :loop="true"
                :loop-delay="3000"
                class="text-lg text-[var(--neon-cyan)] font-terminal"
              />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>

    <!-- Scroll Reveal Demo Section -->
    <section class="py-20 px-4 bg-gradient-to-b from-transparent via-[var(--neon-purple)]/5 to-transparent">
      <div class="max-w-7xl mx-auto">
        <ScrollReveal>
          <h2 class="text-3xl font-bold text-white terminal-glow mb-8 font-terminal">
            // Scroll Reveal Directions
          </h2>
        </ScrollReveal>

        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <ScrollReveal direction="up" :delay="0">
            <div class="glass rounded-lg p-4 text-center">
              <span class="text-[var(--neon-cyan)] font-terminal">↑ Up</span>
            </div>
          </ScrollReveal>
          <ScrollReveal direction="down" :delay="100">
            <div class="glass rounded-lg p-4 text-center">
              <span class="text-[var(--neon-purple)] font-terminal">↓ Down</span>
            </div>
          </ScrollReveal>
          <ScrollReveal direction="left" :delay="200">
            <div class="glass rounded-lg p-4 text-center">
              <span class="text-[var(--neon-green)] font-terminal">← Left</span>
            </div>
          </ScrollReveal>
          <ScrollReveal direction="right" :delay="300">
            <div class="glass rounded-lg p-4 text-center">
              <span class="text-[var(--neon-pink)] font-terminal">→ Right</span>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>

    <!-- Three.js 3D Terminal Scene -->
    <section class="py-20 px-4">
      <div class="max-w-7xl mx-auto">
        <ScrollReveal>
          <h2 class="text-3xl font-bold text-white terminal-glow mb-8 font-terminal">
            // Three.js Terminal Scene
          </h2>
        </ScrollReveal>

        <ScrollReveal direction="up" :delay="200">
          <div class="rounded-xl overflow-hidden border border-white/10">
            <Terminal3DScene
              class="h-[500px] w-full"
              :terminal-count="5"
              :rotation-speed="0.001"
              :float-amplitude="0.4"
              :camera-distance="14"
            >
              <div class="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div class="glass rounded-xl p-6 text-center max-w-md">
                  <h3 class="text-xl font-bold text-white font-terminal mb-2">3D Terminal Array</h3>
                  <p class="text-sm text-slate-400">
                    Interactive Three.js scene with floating terminal windows.
                    <br />
                    <span class="text-[var(--neon-cyan)]">Move your mouse to rotate the view</span>
                  </p>
                </div>
              </div>
            </Terminal3DScene>
          </div>
        </ScrollReveal>
      </div>
    </section>

    <!-- Footer -->
    <footer class="py-12 px-4 border-t border-white/5">
      <div class="max-w-6xl mx-auto text-center">
        <p class="text-slate-500 text-sm font-terminal">
          Animation Lab |
          <NuxtLink to="/" class="text-[var(--neon-cyan)] hover:underline">Back to Home</NuxtLink>
        </p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import StarsBackground from '~/components/ui/StarsBackground.vue'
import FlickeringGrid from '~/components/ui/FlickeringGrid.vue'
import AuroraBackground from '~/components/ui/AuroraBackground.vue'
import Meteors from '~/components/ui/Meteors.vue'
import TiltCard from '~/components/ui/TiltCard.vue'
import MagneticButton from '~/components/ui/MagneticButton.vue'
import CRTEffect from '~/components/ui/CRTEffect.vue'
import SpotlightCursor from '~/components/ui/SpotlightCursor.vue'
import GradientBorder from '~/components/ui/GradientBorder.vue'
import ShimmerButton from '~/components/ui/ShimmerButton.vue'
import TerminalLoader from '~/components/ui/TerminalLoader.vue'
import SkeletonLoader from '~/components/ui/SkeletonLoader.vue'
import ScrollReveal from '~/components/ui/ScrollReveal.vue'
import TypewriterText from '~/components/ui/TypewriterText.vue'
import MorphingText from '~/components/ui/MorphingText.vue'
import Terminal3DScene from '~/components/ui/Terminal3DScene.vue'

// Maz-UI components (auto-imported via @maz-ui/nuxt module)
// MazInputCode, MazChart, MazDialog, MazBtn are globally available

// Progress bar demo
const progressValue = ref(0)
let progressInterval: ReturnType<typeof setInterval> | null = null

// Maz-UI: Access Code state
const accessCode = ref('')
const codeVerified = ref<boolean | null>(null)

const codeStatus = computed(() => {
  if (codeVerified.value === null) {
    return { message: 'Enter access code: 123456', class: 'text-slate-500' }
  }
  if (codeVerified.value) {
    return { message: 'ACCESS GRANTED', class: 'text-[var(--neon-green)] terminal-glow-green' }
  }
  return { message: 'ACCESS DENIED', class: 'text-red-500' }
})

const onCodeComplete = (code: string) => {
  codeVerified.value = code === '123456'
  setTimeout(() => {
    accessCode.value = ''
    codeVerified.value = null
  }, 2000)
}

// Maz-UI: Dialog state
const isDialogOpen = ref(false)

// Maz-UI: Chart config for system metrics
const systemMetricsChart = {
  type: 'line' as const,
  data: {
    labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '24:00'],
    datasets: [
      {
        label: 'CPU %',
        data: [12, 19, 35, 45, 32, 28, 15],
        borderColor: '#00ffff',
        backgroundColor: 'rgba(0, 255, 255, 0.1)',
        tension: 0.4,
        fill: true,
      },
      {
        label: 'Memory %',
        data: [45, 48, 52, 58, 55, 50, 47],
        borderColor: '#a855f7',
        backgroundColor: 'rgba(168, 85, 247, 0.1)',
        tension: 0.4,
        fill: true,
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: '#94a3b8',
          font: { family: 'JetBrains Mono' },
        },
      },
    },
    scales: {
      x: {
        ticks: { color: '#64748b', font: { family: 'JetBrains Mono', size: 10 } },
        grid: { color: 'rgba(100, 116, 139, 0.2)' },
      },
      y: {
        ticks: { color: '#64748b', font: { family: 'JetBrains Mono', size: 10 } },
        grid: { color: 'rgba(100, 116, 139, 0.2)' },
        min: 0,
        max: 100,
      },
    },
  },
}

onMounted(() => {
  progressInterval = setInterval(() => {
    progressValue.value = (progressValue.value + 1) % 101
  }, 100)
})

onUnmounted(() => {
  if (progressInterval) clearInterval(progressInterval)
})

// Page meta
useHead({
  title: 'Animation Lab | Inspira Playground'
})
</script>
