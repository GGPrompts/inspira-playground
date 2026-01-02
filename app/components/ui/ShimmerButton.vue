<template>
  <button
    :class="cn(
      'group relative z-0 flex cursor-pointer items-center justify-center overflow-hidden whitespace-nowrap px-6 py-3',
      'transform-gpu transition-all duration-300 ease-out active:translate-y-px active:scale-[0.98]',
      props.class
    )"
    :style="{
      '--shimmer-color': shimmerColor,
      '--shimmer-color-faded': shimmerColor + '40',
      '--radius': borderRadius,
      '--speed': shimmerDuration,
      '--bg': background,
      borderRadius: borderRadius,
    } as Record<string, string>"
  >
    <!-- Smooth gradient border -->
    <div
      class="absolute -inset-[1px] rounded-[inherit] opacity-75 blur-[1px] transition-opacity duration-300 group-hover:opacity-100"
      :style="{
        background: `linear-gradient(135deg, ${shimmerColor}30, transparent 40%, transparent 60%, ${shimmerColor}30)`,
        borderRadius: borderRadius,
      }"
    />

    <!-- Animated glow ring -->
    <div class="absolute -inset-[2px] rounded-[inherit] opacity-0 group-hover:opacity-100 transition-opacity duration-500">
      <div
        class="absolute inset-0 rounded-[inherit] animate-glow-pulse"
        :style="{
          boxShadow: `0 0 20px ${shimmerColor}40, 0 0 40px ${shimmerColor}20`,
        }"
      />
    </div>

    <!-- Flowing shimmer effect -->
    <div class="absolute inset-0 rounded-[inherit] overflow-hidden">
      <div
        class="absolute inset-0 animate-shimmer-flow opacity-60"
        :style="{
          background: `linear-gradient(90deg, transparent, ${shimmerColor}30, transparent)`,
          transform: 'translateX(-100%)',
        }"
      />
    </div>

    <!-- Content -->
    <span class="relative z-10 flex items-center">
      <slot>{{ props.children }}</slot>
    </span>

    <!-- Inner highlight -->
    <div
      :class="cn(
        'absolute inset-0 rounded-[inherit]',
        'shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]',
        'transition-shadow duration-300',
        'group-hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.2),inset_0_-1px_0_rgba(255,255,255,0.05)]'
      )"
    />

    <!-- Background -->
    <div
      class="absolute inset-0 -z-10 rounded-[inherit]"
      :style="{ background: background }"
    />
  </button>
</template>

<script setup lang="ts">
import { cn } from "../../lib/utils";

interface Props {
  shimmerColor?: string;
  shimmerSize?: string;
  borderRadius?: string;
  shimmerDuration?: string;
  background?: string;
  class?: string;
  children?: string;
}

const props = withDefaults(defineProps<Props>(), {
  shimmerColor: "#ffffff",
  shimmerSize: "0.05em",
  borderRadius: "100px",
  shimmerDuration: "3s",
  background: "rgba(0, 0, 0, 1)",
});
</script>

<style>
@keyframes shimmer-flow {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(200%);
  }
}

@keyframes glow-pulse {
  0%,
  100% {
    opacity: 0.5;
  }
  50% {
    opacity: 1;
  }
}

.animate-shimmer-flow {
  animation: shimmer-flow var(--speed, 3s) ease-in-out infinite;
}

.animate-glow-pulse {
  animation: glow-pulse 2s ease-in-out infinite;
}
</style>
