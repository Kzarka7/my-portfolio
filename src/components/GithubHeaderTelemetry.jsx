import { useEffect, useState } from "react";

export default function GithubHeaderTelemetry() {
  const [stats, setStats] = useState({
    repos: "--",
    commits: "--",
    contribs: "--",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;
      const USERNAME = "Kzarka7";

      // Optimized query to pull both total grid squares and explicit commit values
      const query = `
        query($username: String!) {
          user(login: $username) {
            repositories(ownerAffiliations: OWNER) {
              totalCount
            }
            contributionsCollection {
              totalCommitContributions # Raw isolated commits
              contributionCalendar {
                totalContributions     # Combined squares (Commits + PRs + Issues)
              }
            }
          }
        }
      `;

      try {
        const res = await fetch("https://api.github.com/graphql", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${GITHUB_TOKEN}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ query, variables: { username: USERNAME } }),
        });

        const json = await res.json();

        // 🛡️ Error Fallback Guard: Prevents app from crashing if token fails
        if (!json.data || json.errors) {
          console.error("GitHub API structural response error:", json.errors);
          return;
        }

        const data = json.data.user;

        setStats({
          repos: data.repositories?.totalCount ?? 0,
          commits: data.contributionsCollection?.totalCommitContributions ?? 0,
          contribs: data.contributionsCollection?.contributionCalendar?.totalContributions ?? 0,
        });
      } catch (err) {
        console.error("Telemetry channel link failure:", err);
      } finally {
        setLoading(false);
      }
    }

  fetchStats();
}, []);

return (
  <div
    style={{ fontFamily: "var(--font-mono, monospace)" }}
    className="text-[11px] text-[var(--disabled)] tracking-wider flex items-center flex-wrap justify-center md:justify-end gap-3 max-w-[500px] leading-relaxed uppercase"
  >
    {/* Loading State String / Identifier */}
    <span className="text-[var(--primary,#00f0ff)] font-semibold animate-pulse">
      {loading ? "✦ CORRELATING_METRICS..." : "LIVE METRICS:"}
    </span>

    {/* Repos Block */}
    <span className="whitespace-nowrap">
      REPOS[{" "}
      <strong className="text-white tabular-nums font-bold">
        {stats.repos}
      </strong>{" "}
      ]
    </span>

    {/* Separator Pipe 1 */}
    <span className="text-[var(--border-2E,#222)] hidden sm:inline">❘</span>

    {/* Commits Block */}
    <span className="whitespace-nowrap">
      COMMITS[{" "}
      <strong className="text-white tabular-nums font-bold">
        {stats.commits}
      </strong>{" "}
      ]
    </span>

    {/* Separator Pipe 2 */}
    <span className="text-[var(--border-2E,#222)] hidden sm:inline">❘</span>

    {/* Combined Total Contributions Grid Units Block */}
    <span className="whitespace-nowrap">
      CONTRIBS[{" "}
      <strong className="text-[var(--primary,#00f0ff)] tabular-nums font-bold">
        {stats.contribs}
      </strong>{" "}
      ]
    </span>
  </div>
);
}