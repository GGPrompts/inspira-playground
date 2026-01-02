<script setup lang="ts">
import { ExternalLink, Github, Star } from "lucide-vue-next";
import type { PortfolioCardData } from "~/composables/useGitHubRepos";

defineProps<{
  project: PortfolioCardData;
}>();
</script>

<template>
  <div
    class="glass rounded-xl overflow-hidden group card-hover neon-border transition-all duration-300"
  >
    <!-- Project Image -->
    <div class="relative h-48 overflow-hidden">
      <img
        v-if="project.image"
        :src="project.image"
        :alt="project.title"
        class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
      <div
        v-else
        class="w-full h-full bg-gradient-to-br from-[var(--neon-cyan)]/20 to-[var(--neon-purple)]/20 flex items-center justify-center"
      >
        <span class="text-4xl font-bold text-white/30">{{ project.title[0] }}</span>
      </div>

      <!-- Dark overlay for white GitHub preview images -->
      <div class="absolute inset-0 bg-[#0a0a0f]/40 mix-blend-multiply" />
      <!-- Gradient overlay for smooth transition to content -->
      <div class="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-[#0a0a0f]/60 to-transparent" />

      <!-- Category badge -->
      <div class="absolute top-4 left-4">
        <span class="badge-purple">
          {{ project.category }}
        </span>
      </div>

      <!-- Stars badge -->
      <div v-if="project.stars > 0" class="absolute top-4 right-4">
        <span class="badge-neon flex items-center gap-1">
          <Star class="w-3 h-3" />
          {{ project.stars }}
        </span>
      </div>
    </div>

    <!-- Content -->
    <div class="p-5">
      <h3 class="text-xl font-bold text-slate-100 mb-2 group-hover:text-[var(--neon-cyan)] transition-colors drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
        {{ project.title }}
      </h3>

      <p class="text-sm text-slate-400 mb-4 line-clamp-2">
        {{ project.description || 'No description available' }}
      </p>

      <!-- Tags -->
      <div class="flex flex-wrap gap-2 mb-4">
        <span
          v-for="tag in project.tags.slice(0, 3)"
          :key="tag"
          class="text-xs px-2 py-1 rounded-md bg-[#0a0a0f]/80 backdrop-blur-sm text-slate-300 border border-white/10 shadow-sm"
        >
          {{ tag }}
        </span>
      </div>

      <!-- Actions -->
      <div class="flex items-center gap-3 pt-4 border-t border-white/10">
        <a
          :href="project.repoUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="flex items-center gap-2 text-sm text-slate-400 hover:text-[var(--neon-cyan)] transition-colors"
        >
          <Github class="w-4 h-4" />
          View Code
        </a>
        <a
          v-if="project.demoUrl"
          :href="project.demoUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="flex items-center gap-2 text-sm text-slate-400 hover:text-[var(--neon-purple)] transition-colors"
        >
          <ExternalLink class="w-4 h-4" />
          Live Demo
        </a>
        <span class="ml-auto text-xs text-slate-500">
          {{ project.date }}
        </span>
      </div>
    </div>
  </div>
</template>
