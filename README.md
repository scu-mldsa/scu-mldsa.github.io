# 四川大学机器学习与数据科学协会 (SCU · MLDSA) 官方网站

> **官方网站地址**：[https://scu-mldsa.github.io](https://scu-mldsa.github.io)  
> **挂靠单位**：四川大学数学学院  
> **微信公众号**：SCU数学爱好者 ｜ **官方 QQ 群**：`1135686586`

本仓库为 **四川大学机器学习与数据科学协会 (SCU · MLDSA)** 官方网站源码。网站采用**数据与界面完全分离**设计——社团成员在日常维护或换届交接时，**完全不需要修改 `index.html` 或任何前端代码**，只需在 GitHub 网页上直接编辑 **`site-config.js`** 配置文件即可完成所有内容的添加与更新！

---

## 快速上手：如何在网页上直接修改官网内容？（无需安装编程环境）

1. 打开本仓库主页，点击文件列表中的 **`site-config.js`**。
2. 点击文件右上角的 **铅笔图标 (`Edit this file`)** 进入网页编辑模式。
3. 按照下方对应的模板复制粘贴，修改引号 `" "` 内的中文内容。
4. 点击右上角绿色按钮 **`Commit changes...`** 保存提交。等待约 30~60 秒后，刷新 [https://scu-mldsa.github.io](https://scu-mldsa.github.io) 即可看到最新内容！

---

## 一、 如何添加「社团活动」（时间表）

在 `site-config.js` 中找到 **`eventSchedule`** 数组，复制以下模板块并粘贴在数组内（注意每个大括号 `{ ... }` 之间用英文逗号 `,` 隔开）：

```javascript
  eventSchedule: [
    // 👇 复制下面这一整块即可新增一场社团活动（越靠前的活动显示在越上面）
    {
      date: "11月15日",                          // 活动日期
      weekday: "周六",                           // 星期几
      time: "19:00 - 21:00",                     // 具体时间段
      title: "2026 秋季社团破冰团建暨桌游夜",     // 活动标题
      category: "团建联谊",                      // 活动分类（如：团建联谊 / 专题沙龙 / 经验茶话会）
      location: "江安校区青春广场 / 综合楼",      // 活动地点
      status: "即将开始",                        // 状态可选："即将开始" | "报名中" | "已结束"
      desc: "办公室、宣传部、活动部与新成员全员破冰联谊。", // 一句话活动简介
      docRoute: "#/resources"                    // 相关链接（可填 "#/resources" 或外部网址）
    },
  ],
```
> **提示**：
> - 当 `status` 填为 `"即将开始"` 或 `"报名中"` 时，该活动会同时出现在「近期预告」中；
> - 活动办完后，只需把 `status` 改为 `"已结束"`，它就会自动归档到「往期回顾」里！

---

## 二、 如何添加「开源项目」

### 1. 自动同步热力图与主要贡献人
网站已内置 `.github/workflows/sync-github.yml` 自动同步机器人：
- 每天会自动扫描 `scu-mldsa` 组织下的所有公开仓库，**全自动更新「开源活跃度热力图」和「主要贡献人头像墙」**，无需手动统计提交次数。
- 如需手动指定默认展示的贡献人，可在 `site-config.js` 的 `openSourceStats.topContributors` 中修改：
  ```javascript
  topContributors: [
    {
      name: "成员姓名或ID",
      commits: 68,
      avatar: "https://github.com/你的GitHub用户名.png", // 填真实 GitHub 用户名会自动加载头像
      profileUrl: "https://github.com/你的GitHub用户名"
    }
  ]
  ```

### 2. 添加新的开源项目展示卡片
在 `site-config.js` 中找到 **`projects`** 数组，按以下模板复制新增：

```javascript
  projects: [
    // 👇 复制下面这一整块即可新增一个开源项目卡片
    {
      title: "ML-From-Scratch：统计学习算法手写复现",
      desc: "从零使用纯 NumPy 手写推导并实现线性回归、SVM、决策树与 EM 算法，配套完整数学推导笔记。",
      thumbnail: "",                             // 可选：留空显示默认图标，也可填 "assets/封面图.png"
      repoUrl: "https://github.com/scu-mldsa/仓库名", // 点击 GitHub 小图标跳转的仓库地址
      docRoute: "#/resources",                   // 点击地球小图标跳转的文档页地址
      leaders: [
        { name: "张三", role: "项目负责人", url: "https://github.com/zhangsan" },
        { name: "李四", role: "核心维护者", url: "https://github.com/lisi" }
      ]
    },
  ],
```

---

## 三、 如何添加「竞赛实战」（Kaggle / 数模 / 统计建模等）

「竞赛实战」页面会按照 **`status`** 字段的值，自动从上往下分为 **🟢 正在进行**、**🔵 即将到来**、**⚪ 已结束** 三个区域展示。

在 `site-config.js` 中找到 **`competitions`** 数组，按以下模板复制新增：

```javascript
  competitions: [
    // 👇 复制下面这一整块即可新增一项比赛记录
    {
      name: "Kaggle 时间序列预测打榜赛",          // 竞赛或赛题名称
      platform: "Kaggle · 数据挖掘实战",          // 竞赛所属平台或类别
      status: "正在进行",                        // 必填！只能填："正在进行" | "即将到来" | "已结束"
      timeline: "2026年10月 - 12月 · 冲榜中",     // 比赛时间线说明
      desc: "使用多折交叉验证与 GBDT + 神经网络融合方案协同冲榜，欢迎感兴趣的同学加入讨论。",
      members: ["王五", "赵六"],                  // 参赛或领队成员名单
      linkUrl: "https://github.com/scu-mldsa"    // 详情或赛后复盘仓库链接
    },
  ],
```

---

## 四、 如何上传文件并添加到「资料下载」

### 第一步：把文件上传到 `downloads/` 文件夹
1. 在本仓库网页点击进入 **`downloads`** 文件夹。
2. 点击右上角 **`Add file` → `Upload files`**，将你要分享的 PDF 讲义、Markdown 笔记、Word 策划模板或压缩包（建议单个文件 `< 25 MB`）拖入页面。
3. 点击底部绿色按钮 **`Commit changes`** 完成上传。
*(注：如果是稍微大于 25MB 的文件，可以在本地 **git** 添加后再上传。如果是超过 50MB 的大型数据集或视频，建议上传至本仓库右侧的 **Releases** 或社团飞书/网盘，直接复制外链用于第二步)*。

### 第二步：在 `site-config.js` 中登记该文件
打开 `site-config.js`，找到 **`resources`** 数组，按以下模板复制新增一行：

```javascript
  resources: [
    // 👇 复制下面这一整块即可在「资料下载」页面上架新文件
    {
      id: "res-2026-slide-01",                   // 唯一编号（任意英文数字组合，不重复即可）
      title: "2026 秋季机器学习读书会第 1 期讲义", // 页面上显示的文件标题
      category: "学术讲义",                      // 分类标签（如：社团文档 / 学术讲义 / 竞赛干货 / 入门路线）
      format: "PDF · 2.4 MB",                    // 文件格式与大小说明
      url: "downloads/你的文件名.pdf",            // 文件路径（外链则直接填 https://...）
      filename: "你的文件名.pdf",                 // 点击下载时保存的文件名
      desc: "本讲义梳理了支持向量机拉格朗日对偶推导与核函数技巧。"
    },
  ],
```

---

## 五、 如何修改指导老师、三大部门或招新 QQ 群

全部位于 `site-config.js` 最底部的 `advisors`（指导老师）、`departments`（三大部门：办公室/宣传部/活动部）和 `recruitment`（招新 QQ 群号 `qqGroup`、一键加群链接 `qqGroupLink`、微信公众号 `wechatAccount`）中，直接修改对应文字保存即可。

