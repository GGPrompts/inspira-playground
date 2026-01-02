import type { CardData } from "~/components/ui/infinite-grid/types";

/**
 * GitHub API repository response shape
 */
interface GitHubRepo {
  name: string;
  description: string | null;
  stargazers_count: number;
  language: string | null;
  topics: string[];
  pushed_at: string;
  html_url: string;
  homepage: string | null;
  fork: boolean;
  archived: boolean;
}

/**
 * Extended CardData with portfolio-specific fields
 */
export interface PortfolioCardData extends CardData {
  /** GitHub repository URL */
  repoUrl: string;
  /** Live demo URL if available */
  demoUrl?: string;
  /** Star count for sorting */
  stars: number;
  /** Computed category for filtering */
  category: string;
}

/**
 * Manual overrides for featured projects
 */
const FEATURED_OVERRIDES: Record<
  string,
  Partial<PortfolioCardData> & { featured?: boolean }
> = {
  TabzChrome: {
    description:
      "Chrome extension for AI-powered browser automation. Control tabs, capture screenshots, and integrate with Claude via MCP.",
    category: "AI Tools",
    featured: true,
  },
  ClaudeGlobalCommands: {
    description:
      "Global command palette for Claude Code. Quick access to AI assistance from anywhere on your system.",
    category: "AI Tools",
    featured: true,
  },
  "portfolio-style-guides": {
    description:
      "Interactive style guide generator for portfolio websites with live preview.",
    demoUrl: "https://ggprompts.github.io/portfolio-style-guides",
    category: "Web Apps",
    featured: true,
  },
};

/**
 * Category detection based on repo characteristics
 */
function detectCategory(repo: GitHubRepo): string {
  const name = repo.name.toLowerCase();
  const desc = (repo.description || "").toLowerCase();
  const topics = repo.topics.map((t) => t.toLowerCase());
  const lang = (repo.language || "").toLowerCase();

  // AI Tools
  if (
    topics.includes("ai") ||
    topics.includes("claude") ||
    topics.includes("mcp") ||
    topics.includes("llm") ||
    name.includes("claude") ||
    name.includes("ai") ||
    desc.includes("claude") ||
    desc.includes("ai-powered")
  ) {
    return "AI Tools";
  }

  // TUI (Terminal UI)
  if (
    topics.includes("tui") ||
    topics.includes("terminal") ||
    topics.includes("cli") ||
    name.includes("tui") ||
    desc.includes("terminal")
  ) {
    return "TUI";
  }

  // Games
  if (
    topics.includes("game") ||
    topics.includes("games") ||
    topics.includes("gamedev") ||
    name.includes("game") ||
    desc.includes("game")
  ) {
    return "Games";
  }

  // Chrome Extensions
  if (
    topics.includes("chrome-extension") ||
    topics.includes("browser-extension") ||
    name.includes("chrome")
  ) {
    return "Browser Extensions";
  }

  // Web Apps
  if (
    lang === "typescript" ||
    lang === "javascript" ||
    topics.includes("nuxt") ||
    topics.includes("vue") ||
    topics.includes("react") ||
    topics.includes("web")
  ) {
    return "Web Apps";
  }

  // Python tools
  if (lang === "python") {
    return "Python Tools";
  }

  return "Other";
}

/**
 * Format a date string to relative time (e.g., "2 days ago")
 */
function formatRelativeDate(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "today";
  if (diffDays === 1) return "1 day ago";
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 14) return "1 week ago";
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
  if (diffDays < 60) return "1 month ago";
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
  if (diffDays < 730) return "1 year ago";
  return `${Math.floor(diffDays / 365)} years ago`;
}

/**
 * Transform GitHub repo to CardData format
 */
function transformRepoToCard(repo: GitHubRepo): PortfolioCardData {
  const override = FEATURED_OVERRIDES[repo.name] || {};
  const category = override.category || detectCategory(repo);

  // Build tags: language first, then topics (max 3 total)
  const tags: string[] = [];
  if (repo.language) tags.push(repo.language);
  tags.push(...repo.topics.slice(0, 3 - tags.length));

  // Badge shows stars if notable, otherwise language
  const badge =
    repo.stargazers_count > 10
      ? `${repo.stargazers_count} stars`
      : repo.language || "";

  return {
    title: repo.name,
    badge,
    description: override.description || repo.description || undefined,
    tags,
    date: formatRelativeDate(repo.pushed_at),
    image: `https://opengraph.githubassets.com/1/${repo.html_url.replace("https://github.com/", "")}`,
    repoUrl: repo.html_url,
    demoUrl: override.demoUrl || repo.homepage || undefined,
    stars: repo.stargazers_count,
    category,
  };
}

/**
 * Composable for fetching and caching GitHub repositories
 */
export function useGitHubRepos(username: string = "GGPrompts") {
  // Cache repos in state to avoid refetching
  const repos = useState<PortfolioCardData[]>("github-repos", () => []);
  const loading = useState<boolean>("github-repos-loading", () => false);
  const error = useState<string | null>("github-repos-error", () => null);

  /**
   * Fetch repos from GitHub API
   */
  async function fetchRepos(): Promise<void> {
    // Skip if already loaded
    if (repos.value.length > 0) return;

    loading.value = true;
    error.value = null;

    try {
      const response = await $fetch<GitHubRepo[]>(
        `https://api.github.com/users/${username}/repos`,
        {
          params: {
            sort: "updated",
            per_page: 100,
          },
          headers: {
            Accept: "application/vnd.github.v3+json",
          },
        }
      );

      // Filter out forks and archived repos, transform to CardData
      const transformed = response
        .filter((repo) => !repo.fork && !repo.archived)
        .map(transformRepoToCard)
        .sort((a, b) => {
          // Featured repos first, then by stars
          const aFeatured = FEATURED_OVERRIDES[a.title]?.featured ? 1 : 0;
          const bFeatured = FEATURED_OVERRIDES[b.title]?.featured ? 1 : 0;
          if (aFeatured !== bFeatured) return bFeatured - aFeatured;
          return b.stars - a.stars;
        });

      repos.value = transformed;
    } catch (e) {
      error.value = e instanceof Error ? e.message : "Failed to fetch repos";
      console.error("GitHub API error:", e);
    } finally {
      loading.value = false;
    }
  }

  /**
   * Force refresh repos (clears cache)
   */
  async function refreshRepos(): Promise<void> {
    repos.value = [];
    await fetchRepos();
  }

  /**
   * Get repos filtered by category
   */
  function getByCategory(category: string): PortfolioCardData[] {
    return repos.value.filter((repo) => repo.category === category);
  }

  /**
   * Get all unique categories
   */
  function getCategories(): string[] {
    return [...new Set(repos.value.map((repo) => repo.category))];
  }

  /**
   * Get featured repos only
   */
  function getFeatured(): PortfolioCardData[] {
    return repos.value.filter((repo) => FEATURED_OVERRIDES[repo.title]?.featured);
  }

  /**
   * Convert to basic CardData array for InfiniteGrid
   */
  function toCardData(): CardData[] {
    return repos.value.map(({ title, badge, description, tags, date, image }) => ({
      title,
      badge,
      description,
      tags,
      date,
      image,
    }));
  }

  return {
    repos: readonly(repos),
    loading: readonly(loading),
    error: readonly(error),
    fetchRepos,
    refreshRepos,
    getByCategory,
    getCategories,
    getFeatured,
    toCardData,
  };
}
