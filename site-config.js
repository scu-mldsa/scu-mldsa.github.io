/**
 * ============================================================================
 * 四川大学机器学习与数据科学协会 (SCU · MLDSA) 全站配置文件
 * ============================================================================
 */

window.SITE_CONFIG = {
  // ==========================================================================
  // 01. 社团基础信息
  // ==========================================================================
  club: {
    nameZh: "四川大学机器学习与数据科学协会",
    affiliation: "四川大学数学学院",
    slogan: "以数理之基，探寻智能与数据的边界。",
    description: "挂靠四川大学数学学院，汇聚全校热爱数学建模、统计学习与人工智能的青年学子。"
  },

  // ==========================================================================
  // 02. 社团活动时间表 (复制下方对象即可新增活动)
  // status 可选值："即将开始" | "报名中" | "已结束"
  // ==========================================================================
  eventSchedule: [
    {
      date: "2026年10月31日",
      weekday: "周六",
      time: "19:00 - 21:00",
      title: "机器学习与数据科学协会26秋干事破冰见面会",
      category: "团建联谊",
      location: "江安校区综B204",
      status: "即将开始",
      desc: "2026-2027学年机协干事破冰见面会，玩的开心！",
      docRoute: "#/resources"
    }
  ],

  // ==========================================================================
  // 03. 开源项目与贡献统计 (配置 githubOrg 后会自动从 GitHub 拉取真实热力图与贡献人)
  // ==========================================================================
  openSourceStats: {
    githubOrg: "scu-mldsa", // 社团 GitHub 组织英文名
    orgUrl: "https://github.com/scu-mldsa",
    totalCommits: 0,
    // 主要贡献人模板（当 GitHub 组织有真实公开提交后，会自动拉取真实 GitHub 头像与提交数替换此处）
    topContributors: [
      {
        name: "示例贡献者",
        commits: 0,
        avatar: "assets/github-avatar-mark.png",
        profileUrl: "https://github.com/scu-mldsa"
      }
    ]
  },

  // 开源项目卡片列表（复制下方对象即可新增开源项目）
  projects: [
    {
      title: "【项目模板】在此填写开源项目或仓库名称",
      desc: "在此填写项目的简要介绍（例如项目目标、实现内容或技术栈）。",
      repoUrl: "https://github.com/scu-mldsa",
      docRoute: "#/resources",
      leaders: [
        { name: "填写负责人姓名", role: "项目负责人", url: "https://github.com/scu-mldsa" }
      ]
    }
  ],

  // ==========================================================================
  // 04. 竞赛实战 (status 可选值："正在进行" | "即将到来" | "已结束")
  // ==========================================================================
  competitions: [
    {
      name: "【竞赛模板】在此填写竞赛名称（如：Kaggle / 数学建模）",
      platform: "在此填写竞赛平台或类别",
      status: "正在进行",
      timeline: "在此填写比赛时间段",
      desc: "在此填写赛题简介、组队需求或赛后方案复盘说明。",
      members: ["填写参赛成员姓名"],
      linkUrl: "https://github.com/scu-mldsa"
    }
  ],

  // ==========================================================================
  // 05. 资料下载 (把文件放进 downloads/ 文件夹后，复制下方对象即可上架新文件)
  // ==========================================================================
  resources: [
    {
      id: "res-template-1",
      title: "【资料模板】协会干事与会员招新报名表模板",
      category: "社团文档",
      format: "MD · 10 KB",
      url: "downloads/SCU-MLDSA-协会招新报名表模板.md",
      filename: "SCU-MLDSA-协会招新报名表模板.md",
      desc: "在此填写资料文件的简要说明，点击右侧按钮可直接预览或下载。"
    }, {
      id: "res-template-2",
      title: "机器学习实战Pytorch版",
      category: "社团文档",
      format: "PDF · 65.1 MB",
      url: "downloads/homlAI翻译版.pdf",
      filename: "homlAI翻译版.pdf",
      desc: "这是机器学习实战Pytorch版本的pdf，国内尚未出版"
    }, {
      id: "res-template-3",
      title: "动手学深度学习Pytorch版",
      category: "社团文档",
      format: "PDF · 29.4 MB",
      url: "downloads/d2l-zh-pytorch.pdf",
      filename: "d2l-zh-pytorch.pdf",
      desc: "这是动手学深度学习Pytorch版的pdf"
    }, {
      id: "res-template-4",
      title: "西瓜书-机器学习",
      category: "社团文档",
      format: "PDF · 37.4 MB",
      url: "downloads/机器学习.pdf",
      filename: "机器学习.pdf",
      desc: "西瓜书的pdf"
    }, {
      id: "res-template-5",
      title: "南瓜书-机器学习公式详解",
      category: "社团文档",
      format: "PDF · 11.1 MB",
      url: "downloads/机器学习公式详解.pdf",
      filename: "机器学习公式详解.pdf",
      desc: "南瓜书的pdf"
    }, {
      id: "res-template-6",
      title: "统计学习方法",
      category: "社团文档",
      format: "PDF · 91.9 MB",
      url: "downloads/统计学习方法.pdf",
      filename: "统计学习方法.pdf",
      desc: "南瓜书的pdf"
    }
  ],

  // ==========================================================================
  // 06. 团队架构：数学学院指导教师与三大核心部门（真实信息）
  // ==========================================================================
  advisors: [
    { name: "邓翠", role: "行政指导老师", dept: "四川大学数学学院" },
    { name: "罗应婷", role: "专业指导老师", dept: "四川大学数学学院" },
    { name: "易思宇", role: "专业指导老师", dept: "四川大学数学学院" }
  ],

  departments: [
    { name: "办公室", desc: "负责撰写活动策划书、新闻稿编撰与社团日常统筹。" },
    { name: "宣传部", desc: "负责在活动之前编写宣传稿、推文排版与海报视觉。" },
    { name: "活动部", desc: "负责活动现场协调控场、设备保障与拍照记录。" }
  ],

  // ==========================================================================
  // 07. 加入我们与官方联系方式（真实群号与微信公众号）
  // ==========================================================================
  recruitment: {
    qqGroup: "1135686586",
    qqGroupLink:
      "https://qun.qq.com/universal-share/share?ac=1&authKey=50eH3XOgKNp7xgY3OQZpehhFQX4EJZy4LMXset7FtKqEdwoEp3KX9wbUOUCtejkD&busi_data=eyJncm91cENvZGUiOiIxMTM1Njg2NTg2IiwidG9rZW4iOiI3QXllc1NNdWpuR3dGUXQ3RmUycElickorbjVlbzNhc28rRmNMYzJWQ21laEdyN0VCWVZiU09xU1pFaHRuNG9kIiwidWluIjoiMjQ1MTA5NjEzOCJ9&data=AcTOxEt3zVrAIIAG_n5ZojRCunZlpWgQzavDPnD9_pIM0xqSNV9lKRSVEmPI2L7Jhi2HBAvEFa2HkhZPtaQdkQ&svctype=4&tempid=h5_group_info",
    wechatAccount: "SCU数学爱好者",
    githubUrl: "https://github.com/scu-mldsa"
  }
};
