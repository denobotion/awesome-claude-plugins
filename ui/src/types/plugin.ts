/**
 * Type definitions for Claude plugins/tools
 */

export interface Plugin {
  /** Unique identifier for the plugin */
  id: string;
  /** Display name of the plugin */
  name: string;
  /** Short description of what the plugin does */
  description: string;
  /** URL to the plugin repository or homepage */
  url: string;
  /** Author or organization name */
  author: string;
  /** Optional author GitHub/URL */
  authorUrl?: string;
  /** Categories/tags for filtering */
  tags: string[];
  /** Whether the plugin is officially supported by Anthropic */
  official: boolean;
  /** Date when the plugin was added to the list */
  addedAt: string;
  /** Optional URL to a logo/icon */
  logoUrl?: string;
  /** Optional GitHub stats */
  github?: GitHubStats;
}

export interface GitHubStats {
  /** GitHub repository owner/name e.g. "user/repo" */
  repo: string;
  /** Number of stars */
  stars?: number;
  /** Number of forks */
  forks?: number;
  /** Last updated date */
  updatedAt?: string;
}

export type PluginTag =
  | "productivity"
  | "search"
  | "coding"
  | "data"
  | "finance"
  | "travel"
  | "entertainment"
  | "education"
  | "health"
  | "utilities"
  | "social"
  | "news"
  | string;

export interface PluginFilters {
  search: string;
  tags: string[];
  officialOnly: boolean;
}

export interface PluginCategory {
  label: string;
  value: string;
  count: number;
}
