# Inspira Playground

Experimenting with **Vue 3 / Nuxt 4** animated components from [Inspira UI](https://inspira-ui.com).

## Quick Start

```bash
npm install
npm run dev
# Open http://localhost:3000
```

## Pages

| Page | Description |
|------|-------------|
| `/` | Landing page with Aurora background, shimmer buttons, morphing text |
| `/dashboard` | 3D Infinite Grid terminal dashboard concept |
| `/neural-bg.html` | Standalone WebGL shader for screen recording backgrounds |

## Useful Links

### Inspira UI (Vue/Nuxt)
- **Docs**: https://inspira-ui.com/docs/en/components
- **GitHub**: https://github.com/unovue/inspira-ui
- **All Components**: https://inspira-ui.com/docs/en/components

### Component Categories
- [Backgrounds](https://inspira-ui.com/docs/en/components/backgrounds) - Aurora, Neural, Cosmic Portal, Particles
- [Text Animations](https://inspira-ui.com/docs/en/components/text-animations) - Morphing, Glitch, Sparkles, Blur Reveal
- [Buttons](https://inspira-ui.com/docs/en/components/buttons) - Shimmer, Ripple, Rainbow, Gradient
- [3D/Visualization](https://inspira-ui.com/docs/en/components/visualization) - Infinite Grid, Globe, Icon Cloud
- [Special Effects](https://inspira-ui.com/docs/en/components/special-effects) - Confetti, Meteors, Neon Border

### React Equivalents (for Next.js projects)
- **Aceternity UI**: https://ui.aceternity.com
- **Magic UI**: https://magicui.design
- **shadcn/ui**: https://ui.shadcn.com

### Related Tech
- **shadcn-vue**: https://www.shadcn-vue.com (Vue port of shadcn/ui)
- **OGL**: https://github.com/oframe/ogl (WebGL framework used by Inspira)
- **Motion-V**: https://motion.vueuse.org (Vue animation library)

## Components Used

### Aurora Background
Animated gradient background with flowing colors.
```vue
<AuroraBackground class="dark">
  <slot />
</AuroraBackground>
```

### Shimmer Button
Buttons with animated shimmer/glow effect.
```vue
<ShimmerButton shimmer-color="#a78bfa" background="rgba(139, 92, 246, 0.9)">
  Click Me
</ShimmerButton>
```

### Morphing Text
Text that cycles through an array with blur transitions.
```vue
<MorphingText :texts="['Hello', 'World', 'Vue']" />
```

### Infinite Grid
3D WebGL grid of cards you can pan/rotate.
```vue
<InfiniteGrid :card-data="cards" :options="gridOptions" />
```

### Neural Background (Standalone)
Pure WebGL shader - no dependencies. Open `/neural-bg.html` directly in browser.
- Adjustable hue, saturation, chroma
- Color presets
- Hide controls for screen recording
- Great for terminal backgrounds!

## Tech Stack

- **Nuxt 4** - Vue meta-framework
- **TailwindCSS 3** - Utility CSS
- **OGL** - WebGL (for Infinite Grid)
- **GSAP** - Animations
- **clsx + tailwind-merge** - Class utilities

## License

MIT - Components adapted from [Inspira UI](https://github.com/unovue/inspira-ui)
