# 四川大学机器学习与数据科学协会 (SCU · MLDSA) 官网换届交接与日常维护指南

> **编制目的**：为了让每一届社长、办公室、宣传部、活动部干事在**完全不懂前端编程、无需在自己电脑安装任何开发环境**的情况下，也能用 3 分钟完成官网文字修改、上传可下载文件以及完成换届权限交接。

---

## 一、 官网核心文件说明（只需认识 1 个文件 + 1 个文件夹）

整个官网经过专门的“数据与界面分离”设计，日常维护**永远不需要去改 `index.html`**，你只需要关注：

1. **`site-config.js`（全站唯一中文配置文件）**
   - 指导老师信息、三大部门（办公室/宣传部/活动部）介绍、近期学术活动、可下载文件列表、招新 QQ 群号和邮箱，**全部集中在这个文件里**。
   - 直接在 GitHub 网页上点开 `site-config.js` → 点击右上角铅笔图标（Edit）→ 修改引号 `" "` 里的中文 → 点击绿色按钮 `Commit changes` 保存，1 分钟后全网自动生效！
2. **`downloads/`（本地可下载文件存放目录）**
   - 存放供全校同学直接下载的报名表、策划书模板、读书会讲义 PDF / Markdown / Word 等文件。

---

## 二、 怎么上架新的可下载文件？（两种方式任选）

### 场景 A：日常小文件（< 25 MB，如 PDF 讲义、招新报名表、Word 模板）
1. 打开社团 GitHub 仓库网页，点击进入 **`downloads`** 文件夹。
2. 点击右上角 **`Add file` → `Upload files`**，把你的文件（例如 `2026秋季读书会第1期讲义.pdf`）拖进去，点击底部 **`Commit changes`**。
3. 打开仓库根目录的 **`site-config.js`**，找到 `resources: [` 这一段，复制粘贴新增一项：
   ```javascript
   {
     id: "res-2026- autumn-1",
     title: "2026 秋季机器学习读书会第 1 期讲义",
     category: "学术讲义", // 可选：入门路线 | 学术讲义 | 竞赛干货 | 社团文档
     format: "PDF",
     size: "3.2 MB",
     updatedAt: "2026-10",
     sourceType: "local",
     url: "downloads/2026秋季读书会第1期讲义.pdf",
     filename: "2026秋季读书会第1期讲义.pdf",
     description: "这里写一两句对该讲义内容的简介。",
     featured: true
   },
   ```
4. 保存后，官网的「知识库与文件下载中心」就会自动生成一张带分类筛选、搜索和一键下载按钮的卡片！

### 场景 B：大体积文件（25 MB ~ 2 GB，如数据集压缩包、Workshop 录屏）
- **不要直接塞进 `downloads/` 文件夹**（避免仓库体积膨胀变慢）。
- **方法 1（推荐，永久免费）**：点击 GitHub 仓库右侧边栏的 **`Releases` → `Draft a new release`**，把几百兆的 `.zip` 压缩包拖进附件栏发布，右键复制生成的下载链接，在 `site-config.js` 中把 `sourceType` 设为 `"external"`，`url` 填入该链接即可。
- **方法 2（国内网盘/飞书文档）**：将大文件上传至社团公共飞书知识库或阿里云盘/夸克网盘，将分享链接填入 `url`，`sourceType` 设为 `"external"`。

---

## 三、 一年期域名怎么绑定？一年后到期不续费怎么办？

### 1. 为什么要用 GitHub Organization（组织账号）？
请注册一个专门的 GitHub 组织账号（例如名称为 **`scu-mldsa`**），并在该组织下创建名为 **`scu-mldsa.github.io`** 的公开仓库，将本文件夹所有文件上传进去。
- 这样你们将自动获得一个**终身免费、永不过期**的官方网址：`https://scu-mldsa.github.io`。

### 2. 第一年绑定你自己的域名
1. 在仓库的 `Settings` → `Pages` → `Custom domain` 中填入你购买的域名（例如 `mldsa.xxxx.com`），勾选 `Enforce HTTPS`。
2. 在你的域名服务商后台（或 Cloudflare DNS）添加一条 `CNAME` 记录，指向 `scu-mldsa.github.io`。
3. 此时访问你的自定义域名即可打开社团官网。

### 3. 一年后域名到期时的平滑过渡方案
- **如果下一届决定不续费域名**：
  - 只需要进入 GitHub 仓库 `Settings` → `Pages`，把 `Custom domain` 输入框清空并保存。
  - **网站没有任何一行代码或文件会丢失**，所有访问会自动回退到永久免费网址 `https://scu-mldsa.github.io`！

---

## 四、 每年社团换届 30 秒交接清单（Checklist）

1. **交接 GitHub 组织管理员权限**：
   - 老社长登录 GitHub → 进入 `scu-mldsa` 组织主页 → 点击 **`People` → `Invite member`** → 输入新任社长/部长的 GitHub 用户名 → 角色选择 **`Owner`（所有者）**。
   - **无需交接任何个人手机号、身份证或银行卡！**
2. **更新新一届招新群号与邮箱**：
   - 新社长打开 `site-config.js`，翻到最底部 `recruitment` 区域，修改 `qqGroup` 和 `email` 字段即可。
