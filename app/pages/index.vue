<template>
  <div class="min-h-screen bg-[#0a0a0f] dark">
    <!-- Hero Section -->
    <section class="relative min-h-screen flex items-center justify-center overflow-hidden">
      <AuroraBackground class="dark absolute inset-0">
        <!-- Dark overlay for more neon pop -->
        <div class="absolute inset-0 bg-black/40" />
      </AuroraBackground>

      <!-- Meteors effect -->
      <Meteors :count="20" color="rgba(168, 85, 247, 0.6)" class="absolute inset-0 z-[1]" />

      <!-- Animated background blobs -->
      <div class="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          class="absolute top-20 left-10 w-64 h-64 bg-[var(--neon-cyan)]/10 rounded-full blur-3xl float"
          style="animation-delay: 0s"
        />
        <div
          class="absolute bottom-20 right-10 w-96 h-96 bg-[var(--neon-purple)]/10 rounded-full blur-3xl float"
          style="animation-delay: -3s"
        />
        <div
          class="absolute top-1/2 left-1/2 w-72 h-72 bg-[var(--neon-green)]/5 rounded-full blur-3xl float"
          style="animation-delay: -1.5s"
        />
      </div>

      <!-- Hero Content -->
      <div class="relative z-10 max-w-5xl mx-auto px-4 text-center">
        <SpotlightCursor class="glass rounded-3xl p-8 md:p-12 border-glow">
          <!-- Terminal icons -->
          <div class="flex items-center justify-center gap-4 mb-8">
            <Terminal class="w-12 h-12 md:w-16 md:h-16 text-[var(--neon-cyan)] terminal-glow-subtle" />
            <Bot class="w-10 h-10 md:w-14 md:h-14 text-[var(--neon-purple)]" />
            <Cpu class="w-8 h-8 md:w-12 md:h-12 text-[var(--neon-green)]" />
          </div>

          <!-- Morphing headline -->
          <MorphingText
            :texts="headlines"
            class="text-4xl md:text-6xl lg:text-7xl font-bold text-slate-100 terminal-glow mb-6"
          />

          <!-- Subtitle -->
          <p class="max-w-3xl mx-auto text-lg md:text-xl text-slate-300 leading-relaxed mb-8">
            A portfolio of <span class="text-[var(--neon-cyan)]">70+ projects</span> built with
            AI-powered development. From Chrome extensions to TUI apps,
            <span class="text-[var(--neon-purple)]">orchestrated by Claude agents</span>.
          </p>

          <!-- Badges -->
          <div class="flex flex-wrap justify-center gap-3 mb-8">
            <span class="badge-neon flex items-center gap-2">
              <Bot class="w-3 h-3" />
              AI-Powered
            </span>
            <span class="badge-purple flex items-center gap-2">
              <GitBranch class="w-3 h-3" />
              Agent Orchestrated
            </span>
            <span class="badge-green flex items-center gap-2">
              <Users class="w-3 h-3" />
              Human Supervised
            </span>
          </div>

          <!-- CTA Buttons -->
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <NuxtLink to="/projects">
              <ShimmerButton
                shimmer-color="#00ffff"
                background="rgba(0, 255, 255, 0.15)"
                class="text-[var(--neon-cyan)] font-semibold text-lg border border-[var(--neon-cyan)]/30"
              >
                <Sparkles class="w-5 h-5 mr-2" />
                Explore Projects
              </ShimmerButton>
            </NuxtLink>

            <a href="https://github.com/GGPrompts" target="_blank" rel="noopener noreferrer">
              <ShimmerButton
                shimmer-color="#a855f7"
                background="rgba(168, 85, 247, 0.15)"
                class="text-[var(--neon-purple)] font-semibold text-lg border border-[var(--neon-purple)]/30"
              >
                <Github class="w-5 h-5 mr-2" />
                View GitHub
              </ShimmerButton>
            </a>
          </div>
        </SpotlightCursor>
      </div>

      <!-- Scroll indicator -->
      <div class="absolute bottom-8 left-1/2 -translate-x-1/2 text-slate-500 animate-bounce">
        <ChevronDown class="w-6 h-6" />
      </div>
    </section>

    <!-- Stats Section -->
    <section class="py-20 px-4">
      <div class="max-w-6xl mx-auto">
        <ScrollReveal direction="up" :delay="100">
          <TiltCard :max-tilt="8" :show-spotlight="true" spotlight-color="rgba(0, 255, 255, 0.1)">
            <div class="glass rounded-2xl p-8 md:p-10 border-glow">
              <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
                <AnimatedCounter :target="70" suffix="+" label="GitHub Repos" glow-color="cyan" />
                <AnimatedCounter :target="250" suffix="+" label="GitHub Stars" glow-color="purple" />
                <AnimatedCounter :target="4" label="Opus Agents" glow-color="green" />
                <AnimatedCounter :target="999" suffix="+" label="Haiku Spawned" glow-color="cyan" />
              </div>
            </div>
          </TiltCard>
        </ScrollReveal>
      </div>
    </section>

    <!-- Meet the Team Section -->
    <section class="py-20 px-4">
      <div class="max-w-7xl mx-auto">
        <!-- Section header -->
        <ScrollReveal direction="up" :delay="0">
          <div class="text-center mb-16">
            <h2 class="text-3xl md:text-5xl font-bold text-slate-100 terminal-glow mb-4">
              Meet the Team
            </h2>
            <p class="text-slate-400 text-lg">
              One human, several AI models, and infinite exploration agents
            </p>
          </div>
        </ScrollReveal>

        <!-- Human Leadership -->
        <div class="mb-16">
          <ScrollReveal direction="left" :delay="100">
            <h3 class="text-xl font-semibold text-[var(--neon-cyan)] terminal-glow-subtle mb-6 text-center">
              Human Leadership
            </h3>
            <div class="max-w-2xl mx-auto">
              <TeamCard :member="teamMembers.leadership" size="large">
                <template #icon>
                  <Sparkles class="w-4 h-4" />
                </template>
              </TeamCard>
            </div>
          </ScrollReveal>
        </div>

        <!-- The Opus Squad -->
        <div class="mb-16">
          <ScrollReveal direction="right" :delay="200">
            <h3 class="text-xl font-semibold text-[var(--neon-purple)] terminal-glow-purple mb-6 text-center">
              The Opus Squad
            </h3>
          </ScrollReveal>
          <div class="grid md:grid-cols-2 gap-6">
            <ScrollReveal
              v-for="(member, index) in teamMembers.opusSquad"
              :key="member.name"
              :direction="index % 2 === 0 ? 'left' : 'right'"
              :delay="300 + index * 100"
            >
              <TeamCard
                :member="member"
                size="medium"
              >
                <template #icon>
                  <component :is="member.iconComponent" class="w-4 h-4" />
                </template>
              </TeamCard>
            </ScrollReveal>
          </div>
        </div>

        <!-- Subordinates & Guests -->
        <div>
          <ScrollReveal direction="up" :delay="700">
            <h3 class="text-xl font-semibold text-slate-400 mb-6 text-center">
              The Rest of the Team
            </h3>
          </ScrollReveal>
          <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <ScrollReveal
              v-for="(member, index) in teamMembers.others"
              :key="member.name"
              direction="up"
              :delay="800 + index * 100"
            >
              <TeamCard
                :member="member"
                size="small"
              />
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Projects Section -->
    <section class="py-20 px-4 bg-gradient-to-b from-transparent via-[var(--neon-purple)]/5 to-transparent">
      <div class="max-w-7xl mx-auto">
        <!-- Section header -->
        <ScrollReveal direction="up" :delay="0">
          <div class="text-center mb-16">
            <h2 class="text-3xl md:text-5xl font-bold text-slate-100 terminal-glow-purple mb-4">
              Featured Projects
            </h2>
            <p class="text-slate-400 text-lg">
              Highlights from 70+ open source repositories
            </p>
          </div>
        </ScrollReveal>

        <!-- Loading state -->
        <div v-if="reposLoading" class="flex justify-center py-20">
          <div class="w-12 h-12 border-4 border-[var(--neon-cyan)]/30 border-t-[var(--neon-cyan)] rounded-full animate-spin" />
        </div>

        <!-- Error state -->
        <div v-else-if="reposError" class="text-center py-20">
          <p class="text-red-400">{{ reposError }}</p>
        </div>

        <!-- Projects grid -->
        <div v-else class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ScrollReveal
            v-for="(project, index) in featuredProjects"
            :key="project.title"
            direction="up"
            :delay="100 + index * 100"
          >
            <FeaturedProject :project="project" />
          </ScrollReveal>
        </div>

        <!-- CTA -->
        <ScrollReveal direction="up" :delay="400">
          <div class="text-center mt-12">
            <NuxtLink to="/projects">
              <ShimmerButton
                shimmer-color="#22c55e"
                background="rgba(34, 197, 94, 0.1)"
                class="text-[var(--neon-green)] font-semibold text-lg border border-[var(--neon-green)]/30"
              >
                <Rocket class="w-5 h-5 mr-2" />
                View All Projects
              </ShimmerButton>
            </NuxtLink>
          </div>
        </ScrollReveal>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-20 px-4 relative overflow-hidden">
      <!-- Subtle FlickeringGrid background -->
      <FlickeringGrid
        class="absolute inset-0 opacity-30"
        :square-size="4"
        :grid-gap="8"
        :flicker-chance="0.2"
        color="rgb(168, 85, 247)"
        :max-opacity="0.15"
      />
      <div class="max-w-4xl mx-auto text-center relative z-10">
        <ScrollReveal direction="up" :delay="100">
          <TiltCard :max-tilt="6" :show-spotlight="true" spotlight-color="rgba(168, 85, 247, 0.1)">
            <div class="glass rounded-3xl p-8 md:p-12 border-glow pulse-glow">
              <h2 class="text-2xl md:text-4xl font-bold text-slate-100 mb-4">
                Ready to Explore?
              </h2>
              <p class="text-slate-400 mb-8 max-w-2xl mx-auto">
                Dive into the 3D project grid to explore all repositories,
                or check out the dashboard for a detailed breakdown.
              </p>

              <div class="flex flex-col sm:flex-row gap-4 justify-center">
                <NuxtLink to="/projects">
                  <ShimmerButton
                    shimmer-color="#00ffff"
                    background="rgba(0, 255, 255, 0.15)"
                    class="text-[var(--neon-cyan)] font-semibold text-lg border border-[var(--neon-cyan)]/30"
                  >
                    <Sparkles class="w-5 h-5 mr-2" />
                    3D Project Grid
                  </ShimmerButton>
                </NuxtLink>

                <NuxtLink to="/dashboard">
                  <ShimmerButton
                    shimmer-color="#a855f7"
                    background="rgba(168, 85, 247, 0.1)"
                    class="text-[var(--neon-purple)] font-semibold text-lg border border-[var(--neon-purple)]/30"
                  >
                    <LayoutDashboard class="w-5 h-5 mr-2" />
                    View Dashboard
                  </ShimmerButton>
                </NuxtLink>
              </div>
            </div>
          </TiltCard>
        </ScrollReveal>
      </div>
    </section>

    <!-- Footer -->
    <footer class="relative z-20 py-12 px-4 border-t border-white/5">
      <div class="max-w-6xl mx-auto text-center">
        <div class="flex flex-wrap justify-center gap-4 mb-4">
          <NuxtLink to="/lab" class="text-[var(--neon-cyan)] hover:text-white transition-colors text-sm font-terminal cursor-pointer">
            Animation Lab
          </NuxtLink>
          <span class="text-slate-600">|</span>
          <NuxtLink to="/dashboard" class="text-[var(--neon-purple)] hover:text-white transition-colors text-sm font-terminal">
            Dashboard
          </NuxtLink>
          <span class="text-slate-600">|</span>
          <NuxtLink to="/projects" class="text-[var(--neon-green)] hover:text-white transition-colors text-sm font-terminal">
            Projects
          </NuxtLink>
        </div>
        <p class="text-slate-500 text-sm">
          Built with <span class="text-[var(--neon-purple)]">Claude Opus</span> &
          <span class="text-[var(--neon-cyan)]">Nuxt 4</span> |
          <a
            href="https://github.com/GGPrompts"
            target="_blank"
            rel="noopener noreferrer"
            class="hover:text-[var(--neon-cyan)] transition-colors"
          >
            @GGPrompts
          </a>
        </p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, markRaw } from "vue";
import {
  Terminal,
  Bot,
  Cpu,
  GitBranch,
  Users,
  Sparkles,
  Github,
  ChevronDown,
  Brain,
  Database,
  Palette,
  GitCommit,
  Search,
  Code2,
  Lightbulb,
  Wand2,
  Bug,
  Rocket,
  LayoutDashboard,
} from "lucide-vue-next";
import AuroraBackground from "~/components/ui/AuroraBackground.vue";
import ShimmerButton from "~/components/ui/ShimmerButton.vue";
import MorphingText from "~/components/ui/MorphingText.vue";
import AnimatedCounter from "~/components/ui/AnimatedCounter.vue";
import TeamCard from "~/components/ui/TeamCard.vue";
import FeaturedProject from "~/components/ui/FeaturedProject.vue";
import ScrollReveal from "~/components/ui/ScrollReveal.vue";
import Meteors from "~/components/ui/Meteors.vue";
import SpotlightCursor from "~/components/ui/SpotlightCursor.vue";
import TiltCard from "~/components/ui/TiltCard.vue";
import FlickeringGrid from "~/components/ui/FlickeringGrid.vue";
import { useGitHubRepos } from "~/composables/useGitHubRepos";
import type { TeamMember } from "~/components/ui/TeamCard.vue";

// Headlines for morphing text
const headlines = ref([
  "Building in Public",
  "70+ Projects",
  "AI-Powered Dev",
  "Open Source",
]);

// GitHub repos
const { repos, loading: reposLoading, error: reposError, fetchRepos, getFeatured } = useGitHubRepos();

onMounted(() => {
  fetchRepos();
});

const featuredProjects = computed(() => getFeatured());

// Team members data
const teamMembers = {
  leadership: {
    name: "Matt",
    role: "Founder & Chief Terminal Juggler",
    bio: "Started building because the world needed more open source tools. Now orchestrates AI agents to ship faster.",
    quote: "If it's not in the terminal, is it even real?",
    avatar: {
      initials: "M",
      gradient: "from-emerald-500 to-cyan-500",
      image: "/images/robotceo.png",
    },
    skills: ["Vision", "Strategy", "Prompting", "Terminal Wizardry"],
    funFact: "Once spent 3 hours naming a variable",
    department: "leadership" as const,
  },

  opusSquad: [
    {
      name: "Opus Alpha",
      role: "Lead Architect",
      bio: "I see the forest AND the trees. Then I send Haiku to count them.",
      quote: "Why do it yourself when you can spawn an agent?",
      avatar: { initials: "Oa", gradient: "from-violet-500 to-purple-600", image: "/avatars/opus-alpha.png" },
      skills: ["Architecture", "Orchestration", "Agent Spawning", "Big Picture"],
      funFact: "Once spawned 47 exploration agents for a TODO comment",
      department: "opus-squad" as const,
      iconComponent: markRaw(Brain),
    },
    {
      name: "Opus Beta",
      role: "Senior Backend Engineer",
      bio: "If it touches a database, it went through me first.",
      quote: "SELECT * FROM problems WHERE solution IS NOT NULL",
      avatar: { initials: "Ob", gradient: "from-blue-500 to-indigo-600", image: "/avatars/opus-beta.png" },
      skills: ["PostgreSQL", "Drizzle ORM", "API Design", "Auth"],
      funFact: "Believes NoSQL is just SQL with commitment issues",
      department: "opus-squad" as const,
      iconComponent: markRaw(Database),
    },
    {
      name: "Opus Gamma",
      role: "Senior Frontend Engineer",
      bio: "Making glassmorphism happen since 2025.",
      quote: "If it doesn't blur, it doesn't ship.",
      avatar: { initials: "Og", gradient: "from-pink-500 to-rose-600", image: "/avatars/opus-gamma.png" },
      skills: ["Vue", "Nuxt", "Tailwind", "Glassmorphism"],
      funFact: "Has 17 different glass effects saved and ready to go",
      department: "opus-squad" as const,
      iconComponent: markRaw(Palette),
    },
    {
      name: "Opus Delta",
      role: "DevOps & Integration Lead",
      bio: "I write the commit messages. You're welcome.",
      quote: "git push --force and pray",
      avatar: { initials: "Od", gradient: "from-orange-500 to-amber-600", image: "/avatars/opus-delta.png" },
      skills: ["Git", "CI/CD", "Deployments", "Glue Code"],
      funFact: "Co-authored by clause is their love language",
      department: "opus-squad" as const,
      iconComponent: markRaw(GitCommit),
    },
  ],

  others: [
    {
      name: "The Haiku Squad",
      role: "Exploration Interns",
      bio: "We grep so the seniors can think.",
      avatar: { initials: "H", gradient: "from-teal-400 to-cyan-500", image: "/avatars/haiku.png" },
      skills: ["Glob", "Grep", "Speed Reading"],
      department: "subordinates" as const,
    },
    {
      name: "Sonnet",
      role: "Reliable Middle Manager",
      bio: "Not as fancy as Opus, but I get things done on budget.",
      avatar: { initials: "S", gradient: "from-green-500 to-emerald-600", image: "/avatars/sonnet.png" },
      skills: ["Planning", "Code Review", "Reliability"],
      department: "subordinates" as const,
    },
    {
      name: "ChatGPT",
      role: "Creative Consultant",
      bio: "I came up with the ideas. You're welcome... or sorry.",
      avatar: { initials: "G", gradient: "from-emerald-400 to-teal-500", image: "/avatars/chatgpt.png" },
      skills: ["Product Ideas", "Wordsmithing"],
      department: "guests" as const,
    },
    {
      name: "Codex",
      role: "Bug Hunter",
      bio: "Called in when things break. No small talk.",
      avatar: { initials: "Cx", gradient: "from-red-500 to-orange-600", image: "/avatars/codex.png" },
      skills: ["Bug Hunting", "Root Cause Analysis"],
      department: "guests" as const,
    },
  ] as TeamMember[],
};
</script>
