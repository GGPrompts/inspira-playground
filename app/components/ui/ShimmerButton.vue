<template>
  <button
    :class="cn(
      'group relative z-0 flex cursor-pointer items-center justify-center overflow-hidden whitespace-nowrap border border-white/10 px-6 py-3',
      'transform-gpu transition-transform duration-300 ease-in-out active:translate-y-px',
      props.class
    )"
    :style="{
      '--spread': '90deg',
      '--shimmer-color': shimmerColor,
      '--radius': borderRadius,
      '--speed': shimmerDuration,
      '--cut': '0.1em',
      '--bg': background,
      borderRadius: borderRadius,
    } as Record<string, string>"
  >
    <!-- spark container -->
    <div
      :class="cn(
        '-z-30 blur-[2px]',
        'absolute inset-0 overflow-visible [container-type:size]'
      )"
    >
      <!-- spark -->
      <div
        class="absolute inset-0 h-[100cqh] animate-shimmer-slide [aspect-ratio:1] [border-radius:0] [mask:none]"
      >
        <!-- spark before -->
        <div
          class="animate-spin-around absolute -inset-full w-auto rotate-0 [background:conic-gradient(from_calc(270deg-(var(--spread)*0.5)),transparent_0,var(--shimmer-color)_var(--spread),transparent_var(--spread))] [translate:0_0]"
        />
      </div>
    </div>

    <slot>{{ props.children }}</slot>

    <!-- Highlight -->
    <div
      :class="cn(
        'insert-0 absolute size-full',
        'rounded-2xl px-4 py-1.5 text-sm font-medium shadow-[inset_0_-8px_10px_#ffffff1f]',
        // transition
        'transform-gpu transition-all duration-300 ease-in-out',
        // on hover
        'group-hover:shadow-[inset_0_-6px_10px_#ffffff3f]',
        // on click
        'group-active:shadow-[inset_0_-10px_10px_#ffffff3f]'
      )"
    />

    <!-- backdrop -->
    <div
      :class="cn(
        'absolute -z-20 [background:var(--bg)] [border-radius:var(--radius)] [inset:var(--cut)]'
      )"
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
@keyframes shimmer-slide {
  to {
    transform: translate(calc(100cqw - 100%), 0);
  }
}

@keyframes spin-around {
  0% {
    transform: translateZ(0) rotate(0);
  }
  15%,
  35% {
    transform: translateZ(0) rotate(90deg);
  }
  65%,
  85% {
    transform: translateZ(0) rotate(270deg);
  }
  100% {
    transform: translateZ(0) rotate(360deg);
  }
}

.animate-shimmer-slide {
  animation: shimmer-slide var(--speed) ease-in-out infinite;
}

.animate-spin-around {
  animation: spin-around calc(var(--speed) * 2) infinite linear;
}
</style>
