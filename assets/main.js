/**
 * ============================================================================
 * SCU · MLDSA 1:1 复刻 CMU Data Science Club 渲染与路由逻辑
 * ============================================================================
 */

(function () {
  const cfg = window.SITE_CONFIG;
  if (!cfg) return;

  // 1. 渲染 Board 团队页（数学学院指导老师 + 三大部门）
  function renderBoard() {
    const advEl = document.getElementById("advisors-grid");
    if (advEl && cfg.advisors) {
      advEl.innerHTML = cfg.advisors
        .map(function (a) {
          return (
            '<div class="bg-white/90 backdrop-blur-sm border border-[#082b57]/12 rounded-2xl p-6 hover:shadow-md transition-all">' +
            '<div class="text-lg font-bold text-[#082b57]">' +
            a.name +
            " 老师</div>" +
            '<div class="text-sm font-medium text-blue-600 mt-1">' +
            a.role +
            "</div>" +
            '<div class="text-xs text-[#082b57]/60 mt-1">' +
            a.dept +
            "</div>" +
            "</div>"
          );
        })
        .join("");
    }

    const deptEl = document.getElementById("departments-grid");
    if (deptEl && cfg.departments) {
      deptEl.innerHTML = cfg.departments
        .map(function (d) {
          return (
            '<div class="bg-white/90 backdrop-blur-sm border border-[#082b57]/12 rounded-2xl p-6 hover:shadow-md transition-all">' +
            '<div class="text-lg font-bold text-[#082b57] mb-2">' +
            d.name +
            "</div>" +
            '<p class="text-sm text-[#082b57]/75 leading-relaxed">' +
            d.desc +
            "</p>" +
            "</div>"
          );
        })
        .join("");
    }
  }

  // 2. 渲染首页内嵌活动日历框 &「学术活动」完整时间表 (CMU Luma Calendar Style)
  let currentSchedFilter = "全部";

  function renderEvents() {
    const schedule = cfg.eventSchedule || [];

    // 2.1 渲染首页底部内嵌迷你日程表
    const miniEl = document.getElementById("home-mini-schedule");
    if (miniEl) {
      miniEl.innerHTML = schedule
        .map(function (ev) {
          const isUpcoming = ev.status !== "已结束";
          const badgeClass = isUpcoming
            ? "bg-blue-50 text-blue-700 border-blue-200"
            : "bg-gray-100 text-gray-500 border-gray-200";
          return (
            '<div class="px-5 py-3.5 flex items-center justify-between gap-4 hover:bg-[#082b57]/[0.02] transition-colors">' +
            '<div class="flex items-center gap-4 min-w-0">' +
            '<div class="w-16 shrink-0 text-center py-1 px-2 rounded-lg bg-[#082b57]/5">' +
            '<div class="text-xs font-bold text-[#082b57]">' +
            ev.date +
            "</div>" +
            '<div class="text-[11px] text-[#082b57]/60">' +
            ev.weekday +
            "</div>" +
            "</div>" +
            '<div class="min-w-0">' +
            '<div class="text-sm font-bold text-[#082b57] truncate">' +
            ev.title +
            "</div>" +
            '<div class="text-xs text-[#082b57]/60 mt-0.5 truncate">' +
            ev.time +
            " · " +
            ev.location +
            "</div>" +
            "</div>" +
            "</div>" +
            '<span class="text-xs px-2.5 py-0.5 rounded-full border shrink-0 ' +
            badgeClass +
            '">' +
            ev.status +
            "</span>" +
            "</div>"
          );
        })
        .join("");
    }

    // 2.2 绑定「学术活动」页筛选按钮
    const filterBar = document.getElementById("schedule-filter-bar");
    if (filterBar && !filterBar.dataset.bound) {
      filterBar.dataset.bound = "true";
      filterBar.addEventListener("click", function (e) {
        const btn = e.target.closest("[data-sched-filter]");
        if (!btn) return;
        currentSchedFilter = btn.getAttribute("data-sched-filter");
        filterBar.querySelectorAll("[data-sched-filter]").forEach(function (b) {
          const active = b.getAttribute("data-sched-filter") === currentSchedFilter;
          b.className = active
            ? "px-4 py-1.5 rounded-full text-sm font-medium bg-[#082b57] text-white cursor-pointer transition-colors"
            : "px-4 py-1.5 rounded-full text-sm font-medium bg-[#082b57]/5 text-[#082b57] hover:bg-[#082b57]/10 cursor-pointer transition-colors";
        });
        renderTimelineList();
      });
    }

    renderTimelineList();
  }

  function renderTimelineList() {
    const timelineEl = document.getElementById("events-timeline");
    if (!timelineEl || !cfg.eventSchedule) return;

    const filtered = cfg.eventSchedule.filter(function (ev) {
      if (currentSchedFilter === "近期预告") return ev.status !== "已结束";
      if (currentSchedFilter === "往期回顾") return ev.status === "已结束";
      return true;
    });

    timelineEl.innerHTML = filtered
      .map(function (ev) {
        const isUpcoming = ev.status !== "已结束";
        const dotColor = isUpcoming ? "bg-blue-600 ring-4 ring-blue-100" : "bg-[#082b57]/30";
        const statusBadge = isUpcoming
          ? '<span class="text-xs px-3 py-1 rounded-full bg-blue-50 text-blue-700 font-medium border border-blue-200">' +
            ev.status +
            "</span>"
          : '<span class="text-xs px-3 py-1 rounded-full bg-gray-100 text-gray-500 font-medium">已结束</span>';

        return (
          '<div class="flex flex-col sm:flex-row gap-4 sm:gap-8 items-start">' +
          '<!-- 左侧日期与星期列 -->' +
          '<div class="sm:w-32 shrink-0 sm:text-right pt-1">' +
          '<div class="text-base font-bold text-[#082b57]">' +
          ev.date +
          "</div>" +
          '<div class="text-xs text-[#082b57]/60">' +
          ev.weekday +
          " · " +
          ev.time +
          "</div>" +
          "</div>" +
          '<!-- 中间时间轴圆点与竖线 -->' +
          '<div class="hidden sm:flex flex-col items-center self-stretch pt-2">' +
          '<div class="w-3 h-3 rounded-full ' +
          dotColor +
          '"></div>' +
          '<div class="w-px flex-1 bg-[#082b57]/15 my-2"></div>' +
          "</div>" +
          '<!-- 右侧活动详情卡片 -->' +
          '<div class="flex-1 w-full bg-white/90 backdrop-blur-sm border border-[#082b57]/12 rounded-2xl p-6 hover:shadow-md transition-all">' +
          '<div class="flex flex-wrap items-center justify-between gap-2 mb-2">' +
          '<span class="text-xs font-semibold text-blue-600">' +
          ev.category +
          "</span>" +
          statusBadge +
          "</div>" +
          '<h3 class="text-lg font-bold text-[#082b57] mb-2">' +
          ev.title +
          "</h3>" +
          '<p class="text-sm text-[#082b57]/75 leading-relaxed mb-4">' +
          ev.desc +
          "</p>" +
          '<div class="pt-3 border-t border-[#082b57]/10 flex flex-wrap items-center justify-between gap-2 text-xs text-[#082b57]/60">' +
          "<span>地点：" +
          ev.location +
          "</span>" +
          '<a href="#/resources" data-route="resources" class="text-blue-600 font-medium hover:underline">相关讲义与资料 →</a>' +
          "</div>" +
          "</div>" +
          "</div>"
        );
      })
      .join("");
  }

  // 3. 渲染「开源项目」页（1:1 复刻 CMU Projects DOM 结构 + 支持 GitHub API 自动实时更新）
  function renderProjects() {
    const osStats = cfg.openSourceStats || {};
    const orgLinkEl = document.getElementById("projects-org-link");
    if (orgLinkEl && osStats.orgUrl) {
      orgLinkEl.setAttribute("href", osStats.orgUrl);
    }

    // 3.1 渲染顶部 12 个月份坐标标签 (1:1 复刻 CMU 绝对定位月份栏)
    const monthsEl = document.getElementById("heatmap-months");
    if (monthsEl) {
      const monthNames = ["Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"];
      const leftPositions = [13, 65, 130, 182, 247, 299, 351, 403, 468, 520, 572, 637];
      monthsEl.innerHTML = leftPositions
        .map(function (leftPx, idx) {
          return '<div class="absolute z-10" style="left: ' + leftPx + 'px">' + monthNames[idx] + "</div>";
        })
        .join("");
    }

    // 3.2 渲染 53周 x 7天热力图矩阵 (严格保持 CMU 约 85% 浅灰留白的呼吸感比例)
    function drawHeatmapGrid(dailyMap, overrideTotal) {
      const heatmapEl = document.getElementById("github-heatmap-grid");
      const countEl = document.getElementById("contribution-count");
      if (!heatmapEl) return;

      const levelColors = [
        "bg-gray-100",
        "bg-green-200",
        "bg-green-300",
        "bg-green-500",
        "bg-green-700"
      ];
      const cellsHtml = [];
      let totalSum = 0;
      const today = new Date();

      for (let i = 370; i >= 0; i--) {
        const d = new Date(today.getTime() - i * 86400000);
        const key = d.toISOString().slice(0, 10);
        const dateStr = (d.getMonth() + 1) + "月" + d.getDate() + "日";

        let count = 0;
        if (dailyMap && typeof dailyMap[key] === "number") {
          count = dailyMap[key];
        }

        totalSum += count;
        const level = count === 0 ? 0 : count >= 7 ? 4 : count >= 5 ? 3 : count >= 3 ? 2 : 1;

        cellsHtml.push(
          '<div class="w-3 h-3 rounded-sm ' +
            levelColors[level] +
            ' relative group cursor-pointer">' +
            '<div class="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">' +
            dateStr +
            "：" +
            count +
            " 次贡献" +
            "</div>" +
            "</div>"
        );
      }

      heatmapEl.innerHTML = cellsHtml.join("");
      if (countEl) {
        const finalCount = typeof overrideTotal === "number" ? overrideTotal : totalSum;
        countEl.textContent = "过去一年共 " + finalCount.toLocaleString() + " 次开源贡献";
      }
    }

    // 3.3 渲染右侧主要贡献人 (1:1 复刻 CMU 48x48 圆形头像墙 + 悬停黑底小三角气泡)
    function drawContributors(list) {
      const contribEl = document.getElementById("contributors-grid");
      if (!contribEl) return;

      contribEl.innerHTML = (list || [])
        .map(function (c) {
          const avatarSrc =
            c.avatar ||
            (c.githubId
              ? "https://github.com/" + c.githubId + ".png"
              : "https://avatars.githubusercontent.com/u/9919?v=4");
          return (
            '<a href="' +
            (c.profileUrl || "https://github.com/" + (c.githubId || "scu-mldsa")) +
            '" target="_blank" rel="noopener noreferrer" class="relative group">' +
            '<img src="' +
            avatarSrc +
            '" alt="' +
            c.name +
            '" loading="lazy" width="48" height="48" class="w-12 h-12 rounded-full ring-2 ring-white/10 group-hover:ring-white/30 transition-all object-cover bg-white" />' +
            '<div class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none">' +
            '<div class="bg-gray-900 text-white text-xs rounded px-2 py-1 whitespace-nowrap">' +
            '<div class="font-medium">' +
            c.name +
            "</div>" +
            '<div class="text-gray-300">' +
            c.commits +
            " 次贡献</div>" +
            "</div>" +
            '<div class="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>' +
            "</div>" +
            "</a>"
          );
        })
        .join("");
    }

    // 3.4 渲染下方开源项目卡片 (1:1 复刻 CMU 原版 SVG 缩略图与 bg-white/20 轻盈毛玻璃)
    function drawProjectCards(projectList) {
      const el = document.getElementById("projects-grid");
      if (!el || !projectList) return;

      const cmuPlaceholderSvg =
        '<svg class="w-24 h-24 rounded-lg shrink-0" width="96" height="96" viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg">' +
        '<rect width="96" height="96" fill="#E2E8F0"></rect>' +
        '<path d="M48 38C44.686 38 42 40.686 42 44C42 47.314 44.686 50 48 50C51.314 50 54 47.314 54 44C54 40.686 51.314 38 48 38Z" fill="#94A3B8"></path>' +
        '<path fill-rule="evenodd" clip-rule="evenodd" d="M32 28C29.7909 28 28 29.7909 28 32V64C28 66.2091 29.7909 68 32 68H64C66.2091 68 68 66.2091 68 64V32C68 29.7909 66.2091 28 64 28H32ZM64 32H32V54.3314L39.0857 47.2457C39.8668 46.4646 41.1332 46.4646 41.9143 47.2457L46.3431 51.6745L55.0857 42.9319C55.8668 42.1508 57.1332 42.1508 57.9143 42.9319L64 49.0176V32ZM32 64V59.6686L40.5 51.1686L44.9289 55.5975C45.71 56.3786 46.9763 56.3786 47.7574 55.5975L56.5 46.8549L64 54.3549V64H32Z" fill="#94A3B8"></path>' +
        "</svg>";

      const githubIconSvg =
        '<svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"></path></svg>';
      const webIconSvg =
        '<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>';

      el.innerHTML = projectList
        .map(function (p) {
          const thumbHtml = p.thumbnail
            ? '<img src="' + p.thumbnail + '" alt="' + p.title + '" class="w-24 h-24 object-cover rounded-lg shrink-0" />'
            : cmuPlaceholderSvg;

          const leadersHtml = (p.leaders || [])
            .map(function (ld) {
              return (
                '<div class="flex items-center gap-1 text-sm text-gray-600">' +
                '<a href="' +
                (ld.url || "https://github.com/scu-mldsa") +
                '" target="_blank" rel="noopener noreferrer" class="hover:text-blue-600">' +
                ld.name +
                "</a>" +
                '<span class="text-gray-400">(' +
                ld.role +
                ")</span>" +
                "</div>"
              );
            })
            .join("");

          return (
            '<div class="bg-white/20 backdrop-blur-sm rounded-lg p-6 border border-white/10 shadow-xs">' +
            '<div class="flex gap-4">' +
            thumbHtml +
            '<div class="flex-1">' +
            '<h3 class="text-xl font-semibold text-[#082b57] mb-2">' +
            p.title +
            "</h3>" +
            '<p class="text-sm text-gray-600 mb-3">' +
            p.desc +
            "</p>" +
            '<div class="flex gap-3">' +
            (p.repoUrl
              ? '<a href="' +
                p.repoUrl +
                '" target="_blank" rel="noopener noreferrer" class="text-sm text-gray-600 hover:text-blue-800 flex items-center gap-1">' +
                githubIconSvg +
                "</a>"
              : "") +
            (p.docRoute
              ? '<a href="' +
                p.docRoute +
                '" data-route="resources" class="text-sm text-gray-600 hover:text-blue-800 flex items-center gap-1">' +
                webIconSvg +
                "</a>"
              : "") +
            "</div>" +
            "</div>" +
            "</div>" +
            '<div class="mt-4 pt-4 border-t border-gray-200">' +
            '<h4 class="text-sm font-semibold text-gray-700 mb-2">项目负责人</h4>' +
            '<div class="flex flex-wrap gap-2">' +
            leadersHtml +
            "</div>" +
            "</div>" +
            "</div>"
          );
        })
        .join("");
    }

    drawHeatmapGrid(null);
    drawContributors(osStats.topContributors || []);
    drawProjectCards(cfg.projects || []);

    // 先尝试读取 GitHub Actions 自动生成的 assets/github-stats.json，若无则直接调用 GitHub API 实时拉取
    fetch("assets/github-stats.json")
      .then(function (r) {
        return r.ok ? r.json() : null;
      })
      .then(function (data) {
        if (data && data.dailyMap) {
          drawHeatmapGrid(data.dailyMap, data.totalCommits);
        }
        if (data && Array.isArray(data.contributors) && data.contributors.length > 0) {
          drawContributors(data.contributors);
        }
        if (data && Array.isArray(data.repos) && data.repos.length > 0 && osStats.autoLoadRepos) {
          drawProjectCards(data.repos);
        }
      })
      .catch(function () {
        if (osStats.githubOrg) {
          autoSyncFromGitHub(osStats.githubOrg, drawHeatmapGrid, drawContributors);
        }
      });
  }

  // 自动从 GitHub 官方公开 API 同步社团组织下的真实贡献者与提交热力图
  function autoSyncFromGitHub(orgName, onHeatmapReady, onContributorsReady) {
    // 1. 拉取组织公开事件计算最近提交热力分布
    fetch("https://api.github.com/orgs/" + encodeURIComponent(orgName) + "/events?per_page=100")
      .then(function (r) {
        return r.ok ? r.json() : null;
      })
      .then(function (events) {
        if (!Array.isArray(events) || events.length === 0) return;
        const dailyMap = {};
        let hasPush = false;
        events.forEach(function (ev) {
          if (ev.created_at) {
            const dayKey = ev.created_at.slice(0, 10);
            const commitsCount =
              ev.type === "PushEvent" && ev.payload && Array.isArray(ev.payload.commits)
                ? ev.payload.commits.length
                : 1;
            dailyMap[dayKey] = (dailyMap[dayKey] || 0) + commitsCount;
            hasPush = true;
          }
        });
        if (hasPush) {
          onHeatmapReady(dailyMap);
        }
      })
      .catch(function () {});

    // 2. 拉取组织下所有仓库并汇总真实的 Top Contributors 头像与贡献数
    fetch("https://api.github.com/orgs/" + encodeURIComponent(orgName) + "/repos?per_page=30")
      .then(function (r) {
        return r.ok ? r.json() : null;
      })
      .then(function (repos) {
        if (!Array.isArray(repos) || repos.length === 0) return;
        const topRepos = repos.slice(0, 8);
        return Promise.all(
          topRepos.map(function (repo) {
            return fetch(repo.contributors_url + "?per_page=20")
              .then(function (res) {
                return res.ok ? res.json() : [];
              })
              .catch(function () {
                return [];
              });
          })
        );
      })
      .then(function (allContribArrays) {
        if (!Array.isArray(allContribArrays)) return;
        const userMap = {};
        allContribArrays.forEach(function (arr) {
          if (!Array.isArray(arr)) return;
          arr.forEach(function (u) {
            if (!u || !u.login) return;
            if (!userMap[u.login]) {
              userMap[u.login] = {
                name: u.login,
                commits: 0,
                avatar: u.avatar_url,
                profileUrl: u.html_url
              };
            }
            userMap[u.login].commits += u.contributions || 0;
          });
        });
        const merged = Object.values(userMap).sort(function (a, b) {
          return b.commits - a.commits;
        });
        if (merged.length > 0) {
          onContributorsReady(merged.slice(0, 12));
        }
      })
      .catch(function () {});
  }

  // 4. 渲染「竞赛实战」页（从上往下纵向滑动浏览：分为 正在进行 / 即将到来 / 已结束 三大分区）
  let currentCompFilter = "全部";

  function renderCompetitions() {
    const filterBar = document.getElementById("comp-filter-bar");

    if (filterBar && !filterBar.dataset.bound) {
      filterBar.dataset.bound = "true";
      filterBar.addEventListener("click", function (e) {
        const btn = e.target.closest("[data-comp-filter]");
        if (!btn) return;
        currentCompFilter = btn.getAttribute("data-comp-filter");
        filterBar.querySelectorAll("[data-comp-filter]").forEach(function (b) {
          const active = b.getAttribute("data-comp-filter") === currentCompFilter;
          b.className = active
            ? "px-4 py-1.5 rounded-full text-sm font-medium bg-[#082b57] text-white cursor-pointer transition-colors inline-flex items-center gap-1.5"
            : "px-4 py-1.5 rounded-full text-sm font-medium bg-[#082b57]/5 text-[#082b57] hover:bg-[#082b57]/10 cursor-pointer transition-colors inline-flex items-center gap-1.5";
        });
        renderCompetitionsVertical();
      });
    }

    renderCompetitionsVertical();
  }

  function renderCompetitionsVertical() {
    const el = document.getElementById("competitions-vertical-list");
    if (!el || !cfg.competitions) return;

    const groups = [
      { key: "正在进行", dot: "bg-emerald-500 animate-pulse", badge: "bg-emerald-50 text-emerald-700 border-emerald-200" },
      { key: "即将到来", dot: "bg-blue-500", badge: "bg-blue-50 text-blue-700 border-blue-200" },
      { key: "已结束", dot: "bg-gray-400", badge: "bg-gray-100 text-gray-600 border-gray-200" }
    ];

    const visibleGroups = groups.filter(function (g) {
      return currentCompFilter === "全部" || currentCompFilter === g.key;
    });

    el.innerHTML = visibleGroups
      .map(function (group) {
        const items = cfg.competitions.filter(function (c) {
          return c.status === group.key;
        });
        if (items.length === 0) return "";

        const cardsHtml = items
          .map(function (c) {
            const membersHtml = (c.members || [])
              .map(function (m) {
                return '<span class="text-sm text-gray-600">' + m + "</span>";
              })
              .join('<span class="text-gray-300">·</span>');

            return (
              '<div class="bg-white/20 backdrop-blur-sm rounded-lg p-6 border border-white/10 shadow-xs flex flex-col justify-between">' +
              "<div>" +
              '<div class="flex flex-wrap items-center justify-between gap-2 mb-2">' +
              '<span class="text-xs font-semibold text-blue-700">' +
              (c.platform || "数据科学竞赛") +
              "</span>" +
              '<span class="inline-flex items-center gap-1.5 text-xs px-3 py-0.5 rounded-full border font-medium ' +
              group.badge +
              '">' +
              '<span class="w-2 h-2 rounded-full ' +
              group.dot +
              '"></span>' +
              c.status +
              "</span>" +
              "</div>" +
              '<h3 class="text-xl font-semibold text-[#082b57] mb-1.5">' +
              c.name +
              "</h3>" +
              '<div class="text-xs text-gray-500 mb-3">' +
              (c.timeline || "") +
              "</div>" +
              '<p class="text-sm text-gray-600 leading-relaxed mb-4">' +
              c.desc +
              "</p>" +
              "</div>" +
              '<div class="pt-4 border-t border-gray-200 flex items-center justify-between gap-2">' +
              '<div class="flex flex-wrap items-center gap-1.5">' +
              '<span class="text-xs font-semibold text-gray-700">参赛/领队成员：</span>' +
              membersHtml +
              "</div>" +
              (c.linkUrl
                ? '<a href="' +
                  c.linkUrl +
                  '" target="' +
                  (c.linkUrl.startsWith("http") ? "_blank" : "_self") +
                  '" class="text-xs font-semibold text-blue-700 hover:underline shrink-0">查看详情 →</a>'
                : "") +
              "</div>" +
              "</div>"
            );
          })
          .join("");

        return (
          "<div>" +
          '<div class="flex items-center gap-2.5 mb-5">' +
          '<span class="w-2.5 h-2.5 rounded-full ' +
          group.dot +
          '"></span>' +
          '<h2 class="text-2xl font-semibold text-[#082b57]">' +
          group.key +
          "</h2>" +
          "</div>" +
          '<div class="space-y-4">' +
          cardsHtml +
          "</div>" +
          "</div>"
        );
      })
      .join("");
  }

  // 5. 渲染资料下载页
  function renderResources() {
    const el = document.getElementById("resources-list");
    if (!el || !cfg.resources) return;

    el.innerHTML = cfg.resources
      .map(function (r) {
        return (
          '<div class="bg-white/90 backdrop-blur-sm border border-[#082b57]/12 rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:shadow-md transition-all">' +
          "<div>" +
          '<div class="flex items-center gap-2 mb-1">' +
          '<span class="text-xs px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 font-medium">' +
          r.category +
          "</span>" +
          '<span class="text-xs text-[#082b57]/50">' +
          r.format +
          "</span>" +
          "</div>" +
          '<h3 class="text-base font-bold text-[#082b57]">' +
          r.title +
          "</h3>" +
          '<p class="text-sm text-[#082b57]/75 mt-0.5">' +
          r.desc +
          "</p>" +
          "</div>" +
          '<div class="flex items-center gap-2.5 shrink-0">' +
          '<button type="button" data-preview-id="' +
          r.id +
          '" class="px-4 py-1.5 rounded-full border border-[#082b57]/20 text-sm text-[#082b57] hover:bg-[#082b57]/5 cursor-pointer transition-colors">预览</button>' +
          '<a href="' +
          r.url +
          '" download="' +
          (r.filename || "") +
          '" class="bg-[#082b57] text-white px-5 py-1.5 rounded-full text-sm font-medium hover:bg-[#082b57]/90 transition-colors">下载 ↓</a>' +
          "</div>" +
          "</div>"
        );
      })
      .join("");

    el.querySelectorAll("[data-preview-id]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        const id = btn.getAttribute("data-preview-id");
        const res = cfg.resources.find(function (item) {
          return item.id === id;
        });
        if (res) openPreview(res);
      });
    });
  }

  function openPreview(res) {
    const modal = document.getElementById("doc-preview-modal");
    const titleEl = document.getElementById("doc-preview-title");
    const bodyEl = document.getElementById("doc-preview-body");
    const dlEl = document.getElementById("doc-preview-download");
    if (!modal) return;

    titleEl.textContent = res.title;
    dlEl.setAttribute("href", res.url);
    dlEl.setAttribute("download", res.filename || "");
    bodyEl.innerHTML = '<div class="py-10 text-center text-sm text-[#082b57]/60">加载中...</div>';
    modal.classList.remove("hidden");
    modal.classList.add("flex");

    fetch(res.url)
      .then(function (r) { return r.text(); })
      .then(function (txt) {
        const esc = txt.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
        bodyEl.innerHTML =
          '<pre class="whitespace-pre-wrap text-xs leading-relaxed p-4 rounded-xl bg-slate-50 text-[#082b57] overflow-x-auto">' +
          esc +
          "</pre>";
      })
      .catch(function () {
        bodyEl.innerHTML = '<div class="py-8 text-center text-sm text-[#082b57]/75">请点击右下角直接下载文件到本地查看。</div>';
      });
  }

  function initModalClose() {
    const modal = document.getElementById("doc-preview-modal");
    const closeBtn = document.getElementById("doc-preview-close");
    if (!modal) return;
    if (closeBtn) {
      closeBtn.addEventListener("click", function () {
        modal.classList.add("hidden");
        modal.classList.remove("flex");
      });
    }
    modal.addEventListener("click", function (e) {
      if (e.target === modal) {
        modal.classList.add("hidden");
        modal.classList.remove("flex");
      }
    });
  }

  // 6. 渲染加入我们页
  function renderJoin() {
    const rec = cfg.recruitment;
    if (!rec) return;

    const qqEl = document.getElementById("rec-qq-group");
    if (qqEl) qqEl.textContent = rec.qqGroup;

    const wechatEl = document.getElementById("rec-wechat");
    if (wechatEl) wechatEl.textContent = rec.wechatAccount;

    const ghLink = document.getElementById("home-github-link");
    if (ghLink && rec.githubUrl) {
      ghLink.setAttribute("href", rec.githubUrl);
    }

    const copyBtn = document.getElementById("copy-qq-btn");
    if (copyBtn) {
      copyBtn.addEventListener("click", function () {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(rec.qqGroup);
        }
        copyBtn.textContent = "已复制";
        setTimeout(function () {
          copyBtn.textContent = "复制群信息";
        }, 1500);
      });
    }

    // 首页 QQ 群图标与加入我们页一键加群按钮绑定官方加群直链
    const homeQqBtn = document.getElementById("home-qq-btn");
    const joinQqDirect = document.getElementById("join-qq-direct");
    if (homeQqBtn && rec.qqGroupLink) {
      homeQqBtn.setAttribute("href", rec.qqGroupLink);
    }
    if (joinQqDirect && rec.qqGroupLink) {
      joinQqDirect.setAttribute("href", rec.qqGroupLink);
    }
  }

  // 7. 移动端侧滑抽屉控制 (1:1 复刻 CMU DSC)
  function initMobileDrawer() {
    const openBtn = document.getElementById("mobile-menu-button");
    const closeBtn = document.getElementById("close-menu-button");
    const drawer = document.getElementById("mobile-menu");
    if (!openBtn || !drawer) return;

    openBtn.addEventListener("click", function () {
      drawer.classList.remove("translate-x-full");
    });
    if (closeBtn) {
      closeBtn.addEventListener("click", function () {
        drawer.classList.add("translate-x-full");
      });
    }
  }

  // 8. 路由切换
  const VALID_ROUTES = ["home", "board", "events", "projects", "competitions", "resources", "join"];

  function navigateTo(route) {
    const target = VALID_ROUTES.includes(route) ? route : "home";
    VALID_ROUTES.forEach(function (r) {
      const el = document.getElementById("view-" + r);
      if (el) el.classList.toggle("active", r === target);
    });
    document.querySelectorAll(".cmu-nav-item[data-route]").forEach(function (link) {
      link.classList.toggle("active", link.getAttribute("data-route") === target);
    });
    const drawer = document.getElementById("mobile-menu");
    if (drawer) drawer.classList.add("translate-x-full");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function initRouter() {
    function parseHash() {
      const raw = (window.location.hash || "").replace(/^#\/?/, "").trim().toLowerCase();
      return VALID_ROUTES.includes(raw) ? raw : "home";
    }

    // 直接监听所有带 data-route 的链接点击，保证任何浏览器环境下点击都能立即切换子页面
    document.querySelectorAll("[data-route]").forEach(function (el) {
      el.addEventListener("click", function (e) {
        const route = el.getAttribute("data-route");
        if (route && VALID_ROUTES.includes(route)) {
          e.preventDefault();
          window.location.hash = "#/" + route;
          navigateTo(route);
        }
      });
    });

    window.addEventListener("hashchange", function () {
      navigateTo(parseHash());
    });
    navigateTo(parseHash());
  }

  function bootstrap() {
    renderBoard();
    renderEvents();
    renderProjects();
    renderCompetitions();
    renderResources();
    initModalClose();
    renderJoin();
    initMobileDrawer();
    initRouter();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", bootstrap);
  } else {
    bootstrap();
  }
})();
