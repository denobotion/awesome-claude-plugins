import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

/** Shape of a Claude plugin entry */
interface Plugin {
  name: string;
  description: string;
  url: string;
  tags: string[];
  author: string;
}

// Seed data — will be replaced by a fetched JSON manifest
const PLUGINS: Plugin[] = [
  {
    name: "Wolfram Alpha",
    description: "Access computation, math, curated knowledge & real-time data.",
    url: "https://www.wolframalpha.com",
    tags: ["math", "science", "data"],
    author: "Wolfram",
  },
  {
    name: "Zapier",
    description: "Interact with 5,000+ apps like Google Sheets, Gmail, HubSpot & more.",
    url: "https://zapier.com",
    tags: ["automation", "productivity"],
    author: "Zapier",
  },
  {
    name: "Browsing",
    description: "Browse the web in real-time to answer questions about current events.",
    url: "https://openai.com",
    tags: ["web", "search"],
    author: "OpenAI",
  },
];

export default function App() {
  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const allTags = Array.from(new Set(PLUGINS.flatMap((p) => p.tags))).sort();

  const filtered = PLUGINS.filter((plugin) => {
    const matchesQuery =
      query === "" ||
      plugin.name.toLowerCase().includes(query.toLowerCase()) ||
      plugin.description.toLowerCase().includes(query.toLowerCase());

    const matchesTag = activeTag === null || plugin.tags.includes(activeTag);

    return matchesQuery && matchesTag;
  });

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b px-6 py-4">
        <h1 className="text-2xl font-bold tracking-tight">Awesome Claude Plugins</h1>
        <p className="text-sm text-muted-foreground mt-1">
          A curated list of plugins & tools for Claude AI
        </p>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-8 space-y-6">
        {/* Search */}
        <Input
          placeholder="Search plugins…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="max-w-sm"
        />

        {/* Tag filters */}
        <div className="flex flex-wrap gap-2">
          <Badge
            variant={activeTag === null ? "default" : "outline"}
            className="cursor-pointer"
            onClick={() => setActiveTag(null)}
          >
            All
          </Badge>
          {allTags.map((tag) => (
            <Badge
              key={tag}
              variant={activeTag === tag ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => setActiveTag(activeTag === tag ? null : tag)}
            >
              {tag}
            </Badge>
          ))}
        </div>

        {/* Plugin grid */}
        <div className="grid gap-4 sm:grid-cols-2">
          {filtered.map((plugin) => (
            <Card key={plugin.name} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">
                  <a
                    href={plugin.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    {plugin.name}
                  </a>
                </CardTitle>
                <CardDescription className="text-xs">by {plugin.author}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm">{plugin.description}</p>
                <div className="flex flex-wrap gap-1">
                  {plugin.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}

          {filtered.length === 0 && (
            <p className="col-span-2 text-center text-muted-foreground py-12">
              No plugins match your search.
            </p>
          )}
        </div>
      </main>
    </div>
  );
}
