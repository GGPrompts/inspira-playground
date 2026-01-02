<script setup lang="ts">
import type { Component } from "vue";

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  quote?: string;
  avatar: {
    initials: string;
    gradient: string;
    image?: string;
  };
  skills: string[];
  funFact?: string;
  department: "leadership" | "opus-squad" | "subordinates" | "guests";
}

defineProps<{
  member: TeamMember;
  size?: "large" | "medium" | "small";
}>();

const departmentColors = {
  leadership: "from-emerald-500 to-cyan-500",
  "opus-squad": "from-violet-500 to-purple-600",
  subordinates: "from-teal-400 to-cyan-500",
  guests: "from-gray-400 to-slate-500",
};
</script>

<template>
  <div
    class="glass rounded-xl overflow-hidden group card-hover border-glow-hover transition-all duration-300"
    :class="{
      'p-6 md:p-8': size === 'large',
      'p-5 md:p-6': size === 'medium' || !size,
      'p-4': size === 'small',
    }"
  >
    <div
      :class="{
        'flex flex-col md:flex-row gap-6 items-center md:items-start': size === 'large',
        'flex items-start gap-4': size === 'medium' || !size,
        'flex flex-col items-center text-center': size === 'small',
      }"
    >
      <!-- Avatar -->
      <div class="relative flex-shrink-0">
        <img
          v-if="member.avatar.image"
          :src="member.avatar.image"
          :alt="member.name"
          :class="[
            'rounded-xl border-2 border-[var(--neon-cyan)]/30 group-hover:border-[var(--neon-cyan)] transition-colors object-cover',
            size === 'large' ? 'w-28 h-28 md:w-32 md:h-32' : size === 'small' ? 'w-14 h-14 rounded-full' : 'w-16 h-16',
          ]"
        />
        <div
          v-else
          :class="[
            'bg-gradient-to-br flex items-center justify-center border-2 border-[var(--neon-cyan)]/30 group-hover:border-[var(--neon-cyan)] transition-colors',
            member.avatar.gradient,
            size === 'large' ? 'w-28 h-28 md:w-32 md:h-32 rounded-xl' : size === 'small' ? 'w-14 h-14 rounded-full' : 'w-16 h-16 rounded-lg',
          ]"
        >
          <span
            :class="[
              'font-bold text-white',
              size === 'large' ? 'text-3xl md:text-4xl' : size === 'small' ? 'text-sm' : 'text-lg',
            ]"
          >
            {{ member.avatar.initials }}
          </span>
        </div>

        <!-- Department indicator dot -->
        <div
          v-if="size === 'large'"
          class="absolute -bottom-2 -right-2 w-8 h-8 bg-[var(--neon-cyan)] rounded-full flex items-center justify-center pulse-glow"
        >
          <span class="text-xs font-bold text-black">*</span>
        </div>
      </div>

      <!-- Info -->
      <div
        :class="{
          'flex-1 text-center md:text-left': size === 'large',
          'flex-1 min-w-0': size === 'medium' || !size,
          'flex-1 text-center': size === 'small',
        }"
      >
        <h3
          :class="[
            'font-bold text-white',
            size === 'large' ? 'text-2xl' : size === 'small' ? 'text-base' : 'text-lg',
          ]"
        >
          {{ member.name }}
        </h3>
        <p
          :class="[
            'text-[var(--neon-purple)] flex items-center gap-2',
            size === 'large' ? 'mb-3 justify-center md:justify-start' : size === 'small' ? 'text-xs mb-2 justify-center' : 'text-sm mb-2',
          ]"
        >
          <slot name="icon" />
          {{ member.role }}
        </p>

        <p
          v-if="size !== 'small'"
          :class="[
            'text-slate-400 mb-4',
            size === 'large' ? '' : 'text-sm flex-1',
          ]"
        >
          {{ member.bio }}
        </p>

        <!-- Quote -->
        <blockquote
          v-if="member.quote && size !== 'small'"
          :class="[
            'italic border-l-2 border-[var(--neon-cyan)] pl-4 mb-4 text-slate-300',
            size === 'large' ? 'text-sm' : 'text-xs',
          ]"
        >
          "{{ member.quote }}"
        </blockquote>

        <!-- Skills -->
        <div
          v-if="size !== 'small'"
          :class="[
            'flex flex-wrap gap-2 mb-4',
            size === 'large' ? 'justify-center md:justify-start' : '',
          ]"
        >
          <span
            v-for="skill in member.skills"
            :key="skill"
            class="badge-neon"
          >
            {{ skill }}
          </span>
        </div>

        <!-- Fun Fact -->
        <div
          v-if="member.funFact && size !== 'small'"
          :class="[
            'text-xs text-slate-500 flex items-center gap-2',
            size === 'large' ? 'justify-center md:justify-start' : '',
            size === 'medium' ? 'pt-4 border-t border-white/10' : '',
          ]"
        >
          <span class="text-[var(--neon-green)]">*</span>
          Fun fact: {{ member.funFact }}
        </div>
      </div>
    </div>
  </div>
</template>
