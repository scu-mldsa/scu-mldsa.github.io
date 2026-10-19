import fs from "fs";

const org = process.env.ORG_NAME || "scu-mldsa";
const headers = {
  Accept: "application/vnd.github+json",
  "User-Agent": "SCU-MLDSA-Website-Sync"
};

if (process.env.GITHUB_TOKEN) {
  headers.Authorization = "Bearer " + process.env.GITHUB_TOKEN;
}

async function main() {
  try {
    const reposRes = await fetch(
      `https://api.github.com/orgs/${org}/repos?per_page=50&sort=updated`,
      { headers }
    );
    if (!reposRes.ok) {
      console.log("Org API returned status:", reposRes.status);
      return;
    }

    const repos = await reposRes.json();
    if (!Array.isArray(repos)) return;

    const userMap = {};
    const dailyMap = {};
    let totalCommits = 0;
    const sinceDate = new Date(Date.now() - 371 * 86400000).toISOString();

    for (const repo of repos) {
      if (repo.fork) continue;

      const cRes = await fetch(`${repo.contributors_url}?per_page=30`, { headers });
      if (cRes.ok && cRes.status === 200) {
        const contributors = await cRes.json();
        if (Array.isArray(contributors)) {
          for (const u of contributors) {
            if (!u || !u.login || u.type === "Bot") continue;
            if (!userMap[u.login]) {
              userMap[u.login] = {
                name: u.login,
                githubId: u.login,
                commits: 0,
                avatar: u.avatar_url,
                profileUrl: u.html_url
              };
            }
            userMap[u.login].commits += u.contributions || 0;
          }
        }
      }

      const cmRes = await fetch(
        `https://api.github.com/repos/${org}/${repo.name}/commits?since=${sinceDate}&per_page=100`,
        { headers }
      );
      if (cmRes.ok && cmRes.status === 200) {
        const commits = await cmRes.json();
        if (Array.isArray(commits)) {
          for (const cm of commits) {
            const dateStr = cm?.commit?.author?.date?.slice(0, 10);
            if (dateStr) {
              dailyMap[dateStr] = (dailyMap[dateStr] || 0) + 1;
              totalCommits++;
            }
          }
        }
      }
    }

    const sortedContributors = Object.values(userMap).sort(
      (a, b) => b.commits - a.commits
    );
    const output = {
      updatedAt: new Date().toISOString(),
      totalCommits,
      dailyMap,
      contributors: sortedContributors.slice(0, 16)
    };

    fs.writeFileSync("assets/github-stats.json", JSON.stringify(output, null, 2));
    console.log("Saved assets/github-stats.json successfully.");
  } catch (err) {
    console.log("Sync warning (non-fatal):", err.message);
  }
}

main();
