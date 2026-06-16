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
      style={{
        fontFamily: "var(--font-mono, monospace)",
        fontSize: "11px",
        color: "var(--disabled, #555)",
        letterSpacing: "0.05em",
        display: "flex",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "12px",
        maxWidth: "500px",
        lineHeight: "1.6",
        textTransform: "uppercase",
      }}
    >
      <span style={{ color: "var(--primary, #00f0ff)", fontWeight: "600" }}>
        {loading ? "✦ CORRELATING_METRICS..." : "LIVE METRICS:"}
      </span>

      <span>
        REPOS[{" "}
        <strong style={{ color: "#fff", fontVariantNumeric: "tabular-nums" }}>
          {stats.repos}
        </strong>{" "}
        ]
      </span>

      <span style={{ color: "var(--border-2E, #222)" }}>❘</span>

      <span>
        COMMITS[{" "}
        <strong style={{ color: "#fff", fontVariantNumeric: "tabular-nums" }}>
          {stats.commits}
        </strong>{" "}
        ]
      </span>

      <span style={{ color: "var(--border-2E, #222)" }}>❘</span>

      <span>
        CONTRIBS[{" "}
        <strong
          style={{
            color: "var(--primary, #00f0ff)",
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {stats.contribs}
        </strong>{" "}
        ]
      </span>
    </div>
  );
}