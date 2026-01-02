<template>
  <div class="relative w-full h-screen overflow-hidden bg-black">
    <!-- Infinite Grid with Terminal Cards -->
    <ClientOnly>
      <InfiniteGrid
        :card-data="terminalCards"
        :options="gridOptions"
        class="absolute inset-0"
        @tile-clicked="handleTileClick"
      />
    </ClientOnly>

    <!-- Overlay UI -->
    <div class="absolute top-0 left-0 right-0 z-20 p-6 pointer-events-none">
      <h1 class="text-3xl font-bold text-white mb-1">Terminal Dashboard</h1>
      <p class="text-white/50">Rotate and zoom to explore your sessions</p>
    </div>

    <!-- Selected Terminal Info -->
    <div
      v-if="selectedTerminal"
      class="absolute bottom-8 left-8 right-8 z-20 bg-black/80 backdrop-blur-lg rounded-xl border border-white/10 p-6 pointer-events-auto"
    >
      <div class="flex items-center justify-between">
        <div>
          <h3 class="text-xl font-bold text-white">{{ selectedTerminal.title }}</h3>
          <p class="text-white/50 text-sm">{{ selectedTerminal.description }}</p>
          <div class="flex gap-2 mt-2">
            <span
              v-for="tag in selectedTerminal.tags"
              :key="tag"
              class="px-2 py-0.5 bg-indigo-500/20 text-indigo-300 text-xs rounded"
            >
              {{ tag }}
            </span>
          </div>
        </div>
        <button
          class="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition-colors"
          @click="selectedTerminal = null"
        >
          Close
        </button>
      </div>
    </div>

    <!-- Controls hint -->
    <div class="absolute bottom-4 right-4 z-10 text-white/30 text-sm">
      Drag to rotate • Scroll to zoom
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { CardData } from "../components/ui/infinite-grid/types";
import InfiniteGrid from "../components/ui/infinite-grid/InfiniteGrid.vue";

const selectedTerminal = ref<CardData | null>(null);

// Terminal card data matching the CardData interface
const terminalCards = ref<CardData[]>([
  {
    title: "Claude: Frontend",
    badge: "active",
    description: "npm run dev - Vite v5.0.0 ready",
    tags: ["vue", "vite", "dev"],
    date: "now",
    image: "https://picsum.photos/seed/frontend/400/300",
  },
  {
    title: "Claude: Backend",
    badge: "active",
    description: "Server running on port 3000",
    tags: ["node", "express", "api"],
    date: "2m ago",
    image: "https://picsum.photos/seed/backend/400/300",
  },
  {
    title: "lazygit",
    badge: "active",
    description: "1 branch • 3 commits ahead",
    tags: ["git", "tui"],
    date: "5m ago",
    image: "https://picsum.photos/seed/git/400/300",
  },
  {
    title: "btop",
    badge: "active",
    description: "CPU 78% • MEM 62% • Monitoring",
    tags: ["system", "monitor"],
    date: "now",
    image: "https://picsum.photos/seed/monitor/400/300",
  },
  {
    title: "Claude: Tests",
    badge: "idle",
    description: "24 passed, 24 total - All green",
    tags: ["vitest", "testing"],
    date: "10m ago",
    image: "https://picsum.photos/seed/tests/400/300",
  },
  {
    title: "zsh",
    badge: "idle",
    description: "~/projects - Ready for input",
    tags: ["shell", "bash"],
    date: "15m ago",
    image: "https://picsum.photos/seed/shell/400/300",
  },
  {
    title: "Claude: Docs",
    badge: "active",
    description: "Writing API documentation",
    tags: ["docs", "markdown"],
    date: "3m ago",
    image: "https://picsum.photos/seed/docs/400/300",
  },
  {
    title: "Docker",
    badge: "active",
    description: "3 containers running",
    tags: ["docker", "containers"],
    date: "1h ago",
    image: "https://picsum.photos/seed/docker/400/300",
  },
  {
    title: "lnav",
    badge: "active",
    description: "Watching backend/logs/unified.log",
    tags: ["logs", "debug"],
    date: "now",
    image: "https://picsum.photos/seed/logs/400/300",
  },
  {
    title: "Claude: API",
    badge: "active",
    description: "Building REST endpoints",
    tags: ["api", "rest", "typescript"],
    date: "8m ago",
    image: "https://picsum.photos/seed/api/400/300",
  },
  {
    title: "nvim",
    badge: "idle",
    description: "Editing nuxt.config.ts",
    tags: ["editor", "vim"],
    date: "20m ago",
    image: "https://picsum.photos/seed/editor/400/300",
  },
  {
    title: "htop",
    badge: "active",
    description: "System processes overview",
    tags: ["system", "processes"],
    date: "now",
    image: "https://picsum.photos/seed/htop/400/300",
  },
]);

const gridOptions = {
  gridCols: 4,
  gridRows: 3,
  gridGap: 0.2,
  tileSize: 2.5,
  baseCameraZ: 8,
  enablePostProcessing: true,
  postProcessParams: {
    distortionIntensity: -0.15,
    vignetteOffset: 0.1,
    vignetteDarkness: 0.3,
  },
};

function handleTileClick(cardData: CardData) {
  selectedTerminal.value = cardData;
}
</script>
