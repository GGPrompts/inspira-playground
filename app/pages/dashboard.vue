<template>
  <div class="relative w-full h-screen overflow-hidden bg-black">
    <!-- Loading State -->
    <div v-if="loading" class="absolute inset-0 z-30 flex items-center justify-center bg-black">
      <div class="grid grid-cols-3 gap-4 p-8">
        <SkeletonLoader
          v-for="i in 9"
          :key="i"
          width="280px"
          height="200px"
          shimmer-color="rgba(0, 255, 255, 0.15)"
          class="rounded-xl"
        />
      </div>
      <div class="absolute bottom-8 left-1/2 -translate-x-1/2 text-cyan-400 font-mono">
        Loading {{ repos.length > 0 ? repos.length : '' }} projects...
      </div>
    </div>

    <!-- Infinite Grid with GitHub Repos -->
    <ClientOnly>
      <InfiniteGrid
        v-if="!loading && filteredCards.length > 0"
        :card-data="filteredCards"
        :options="gridOptions"
        class="absolute inset-0"
        @tile-clicked="handleTileClick"
      />
    </ClientOnly>

    <!-- Overlay UI -->
    <div class="absolute top-0 left-0 right-0 z-20 p-6 pointer-events-none">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-3xl font-bold text-white mb-1">Project Explorer</h1>
          <p class="text-white/50">{{ filteredCards.length }} projects • Rotate and zoom to explore</p>
        </div>
        <!-- Category Filter -->
        <div class="pointer-events-auto">
          <select
            v-model="selectedCategory"
            class="bg-black/80 backdrop-blur border border-cyan-500/30 text-cyan-400 px-4 py-2 rounded-lg font-mono text-sm focus:outline-none focus:border-cyan-400 cursor-pointer"
          >
            <option value="All">All Projects</option>
            <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Selected Project Info -->
    <div
      v-if="selectedTerminal"
      class="absolute bottom-8 left-8 right-8 z-20 bg-black/90 backdrop-blur-lg rounded-xl border border-cyan-500/20 p-6 pointer-events-auto"
    >
      <div class="flex items-center justify-between">
        <div class="flex-1">
          <div class="flex items-center gap-3 mb-2">
            <h3 class="text-xl font-bold text-white font-mono">{{ selectedTerminal.title }}</h3>
            <span class="px-2 py-0.5 bg-cyan-500/20 text-cyan-400 text-xs rounded font-mono">
              {{ selectedTerminal.category }}
            </span>
            <span v-if="selectedTerminal.stars > 0" class="text-yellow-400 text-sm">
              ⭐ {{ selectedTerminal.stars }}
            </span>
          </div>
          <p class="text-white/60 text-sm mb-3">{{ selectedTerminal.description }}</p>
          <div class="flex gap-2 flex-wrap">
            <span
              v-for="tag in selectedTerminal.tags"
              :key="tag"
              class="px-2 py-0.5 bg-purple-500/20 text-purple-300 text-xs rounded font-mono"
            >
              {{ tag }}
            </span>
          </div>
        </div>
        <div class="flex items-center gap-3 ml-6">
          <a
            :href="selectedTerminal.repoUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg transition-colors font-mono text-sm"
          >
            View Repo →
          </a>
          <a
            v-if="selectedTerminal.demoUrl"
            :href="selectedTerminal.demoUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-lg transition-colors font-mono text-sm"
          >
            Live Demo →
          </a>
          <button
            class="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors"
            @click="selectedTerminal = null"
          >
            ✕
          </button>
        </div>
      </div>
    </div>

    <!-- Controls hint -->
    <div class="absolute bottom-4 right-4 z-10 text-white/30 text-sm">
      Drag to rotate • Scroll to zoom
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import type { CardData } from "../components/ui/infinite-grid/types";
import InfiniteGrid from "../components/ui/infinite-grid/InfiniteGrid.vue";
import SkeletonLoader from "../components/ui/SkeletonLoader.vue";
import { useGitHubRepos, type PortfolioCardData } from "../composables/useGitHubRepos";

// GitHub repos composable
const { repos, loading, fetchRepos, getByCategory, getCategories } = useGitHubRepos();

// Category filter state
const selectedCategory = ref("All");
const selectedTerminal = ref<PortfolioCardData | null>(null);

// Available categories (computed after repos load)
const categories = computed(() => getCategories());

// Filtered cards based on selected category
const filteredCards = computed<CardData[]>(() => {
  const sourceRepos = selectedCategory.value === "All"
    ? repos.value
    : getByCategory(selectedCategory.value);

  // Transform PortfolioCardData to CardData for InfiniteGrid
  // Spread tags to create mutable array copy
  return sourceRepos.map((repo) => ({
    title: repo.title,
    badge: repo.badge,
    description: repo.description,
    tags: [...repo.tags],
    date: repo.date,
    image: repo.image,
  }));
});

// Fetch repos on mount
onMounted(() => {
  fetchRepos();
});

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
  // Find the full PortfolioCardData by title and create mutable copy
  const fullData = repos.value.find(r => r.title === cardData.title);
  if (fullData) {
    selectedTerminal.value = {
      ...fullData,
      tags: [...fullData.tags],
    };
  } else {
    selectedTerminal.value = null;
  }
}
</script>
