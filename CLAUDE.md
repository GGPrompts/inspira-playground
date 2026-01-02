# Inspira Playground - Portfolio Portal

A fancy animated portfolio landing page and 3D project explorer built with Nuxt 4, Inspira UI, Maz-UI, and Three.js.

## Tech Stack

| Layer | Tech |
|-------|------|
| Framework | Nuxt 4, Vue 3.5 |
| Styling | TailwindCSS, JetBrains Mono |
| UI Libraries | Inspira UI (Aceternity port), Maz-UI |
| Animation | Motion-V, GSAP, Three.js, OGL |
| Task Tracking | Beads (`bd`) |

## Project Purpose

This is the **entry portal** to ~70 GitHub projects. Features:
- Dark terminal theme with neon accents (cyan, purple, green)
- 3D InfiniteGrid for browsing all projects
- "Meet the Team" section featuring AI agent collaborators
- Fancy WebGL/canvas animated backgrounds

## Key Files

```
app/
├── pages/
│   ├── index.vue        # Landing page (hero, stats, team, featured)
│   ├── dashboard.vue    # 3D InfiniteGrid project browser
│   └── lab.vue          # Animation playground/showcase
├── components/ui/
│   ├── infinite-grid/   # WebGL 3D grid (OGL)
│   ├── AuroraBackground.vue
│   ├── ShimmerButton.vue
│   ├── MorphingText.vue
│   ├── Terminal3DScene.vue  # Three.js 3D terminals
│   ├── Meteors.vue
│   ├── StarsBackground.vue
│   ├── FlickeringGrid.vue
│   ├── CRTEffect.vue
│   ├── TiltCard.vue
│   ├── MagneticButton.vue
│   ├── SpotlightCursor.vue
│   ├── TypewriterText.vue
│   ├── ScrollReveal.vue
│   ├── TeamCard.vue
│   ├── FeaturedProject.vue
│   ├── AnimatedCounter.vue
│   ├── SkeletonLoader.vue
│   ├── TerminalLoader.vue
│   └── GradientBorder.vue
├── composables/
│   └── useGitHubRepos.ts  # Fetches repos, categories, featured
└── assets/css/
    └── main.css           # Terminal glow, glass utilities

public/
├── avatars/              # AI agent avatars (opus-alpha, haiku, etc.)
└── images/               # robotceo.png
```

## Available Skills/Plugins

Workers in this project should use:
- **maz-ui skill** - Maz-UI component patterns, composables, AOS animations
- **nuxt-ui-v4 skill** - If adding @nuxt/ui components later

## Commands

```bash
npm run dev      # Start dev server
npm run build    # Production build
bd ready         # Show available tasks
bd list          # All tasks
bd close <id>    # Complete a task
```

## Design System

### Colors (Neon Terminal Theme)
- Primary: Cyan `#00ffff`
- Accent: Purple `#a855f7`
- Success: Green `#22c55e`
- Background: Dark `#0a0a0a`

### Typography
- Headers: JetBrains Mono (monospace)
- Body: System sans-serif
- Code: JetBrains Mono

### Effects
- `terminal-glow` - Neon text shadow
- `glass` - Glassmorphism backdrop blur
- `border-glow` - Animated neon borders

## GitHub Data

`useGitHubRepos()` composable provides:
```typescript
const {
  repos,           // All repos as PortfolioCardData[]
  loading,         // Loading state
  fetchRepos,      // Initial fetch
  getByCategory,   // Filter: "AI Tools", "TUI", "Games", etc.
  getFeatured,     // TabzChrome, ClaudeGlobalCommands, etc.
  toCardData,      // Transform for InfiniteGrid
} = useGitHubRepos()
```

## Team (AI Agents)

The "Meet the Team" section features:
- **Matt** - Founder (robotceo.png)
- **Opus Alpha** - Lead Architect
- **Opus Beta** - Backend Engineer
- **Opus Gamma** - Frontend Engineer
- **Opus Delta** - DevOps Lead
- **Haiku Squad** - Exploration Interns
- **Sonnet** - Reliable Middle Manager
- **Guest Contributors** - ChatGPT, Copilot, Codex

## Task Tracking (Beads)

This project uses **bd** (beads) for issue tracking.

```bash
bd ready              # Find available work
bd show <id>          # View issue details
bd update <id> --status in_progress  # Claim work
bd close <id>         # Complete work
bd sync               # Sync with git
```

### Session Completion

**When ending a work session**, complete ALL steps:

1. **File issues** for remaining work
2. **Run quality gates** - Tests, linters, builds
3. **Update issue status** - Close finished, update in-progress
4. **PUSH TO REMOTE**:
   ```bash
   git pull --rebase
   bd sync
   git push
   ```
5. **Verify** - `git status` shows "up to date with origin"
