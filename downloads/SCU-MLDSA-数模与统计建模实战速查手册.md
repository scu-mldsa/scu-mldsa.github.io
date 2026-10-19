# SCU · MLDSA 数学建模与统计建模实战速查手册

> **出品单位**：四川大学机器学习与数据科学协会（SCU · MLDSA）  
> **适用赛事**：全国大学生数学建模竞赛（CUMCM）、美国大学生数学建模竞赛（MCM/ICM）、全国大学生统计建模大赛、市场调查与分析大赛、Kaggle

---

## 一、 四大题型核心算法映射表

| 问题类型 | 经典数理统计方法 | 现代机器学习 / 优化方法 | 模型检验与评估指标 |
| :--- | :--- | :--- | :--- |
| **评价与决策类** | 熵权法 + TOPSIS、层次分析法 (AHP)、主成分综合评价 | DEA 数据包络分析、模糊综合评价、ランダムフォレスト特征重要性 | 一致性检验 ($CR < 0.1$)、敏感性分析（权重扰动测试） |
| **预测与回归类** | 多元线性回归、ARIMA / SARIMA 时间序列、灰色预测 GM(1,1) | XGBoost / LightGBM 回归、LSTM / Temporal Fusion Transformer | $R^2$、RMSE、MAE、MAPE、残差白噪声检验 (Ljung-Box) |
| **分类与判别类** | Logistic 回归、Fisher 线性判别、朴素贝叶斯 | 支持向量机 (SVM)、Stacking 模型融合、焦损函数 (Focal Loss) | ROC-AUC、PR-AUC、F1-Score、混淆矩阵、K-S 统计量 |
| **机理与优化类** | 线性/整数规划 (LP/MILP)、微分方程传染病/动力学模型 | 模拟退火 (SA)、遗传算法 (GA)、粒子群 (PSO)、QUBO 二次无约束优化 | 约束满足度、收敛曲线图、帕累托前沿 (Pareto Front) |

---

## 二、 高水平论文获奖黄金结构（以国赛/统计建模为例）

1. **摘要（决定奖项档次的 60%）**
   - **第一段**：一句话点明问题背景与研究目标。
   - **第二段至第四段（核心）**：针对问题一/二/三，分别写清**「建立什么具体模型 → 采用什么求解算法 → 得到什么精确数值结论」**（切忌空洞套话，必须有具体量化指标！）。
   - **结尾段**：总结模型的创新点（如引入正则化修正、多模型融合对比）与灵敏度稳健性表现。
2. **数据预处理与探索性数据分析（EDA）**
   - 异常值检测（$3\sigma$ 原则、箱线图 IQR、孤立森林 Isolation Forest）。
   - 缺失值处理（多重插补 MICE、KNN 插补、样条插值）。
   - 相关性分析（Pearson 线性相关、Spearman 秩相关、互信息矩阵热力图）。

---

## 三、 学术图表冰蓝配色规范（Python Matplotlib 速查）

```python
import matplotlib.pyplot as plt

# SCU-MLDSA 推荐科研冰蓝渐变色板（色盲友好 & 打印清晰）
MLDSA_PALETTE = [
    "#0284C7",  # 深邃晶蓝（主折线/主柱状图）
    "#38BDF8",  # 冰川亮蓝（次要系列）
    "#6366F1",  # 靛青学术紫（对比系列）
    "#14B8A6",  # 极光青绿（辅助系列）
    "#F59E0B",  # 琥珀暖金（高亮异常点/阈值线）
]

plt.rcParams["font.sans-serif"] = ["SimHei", "Arial"]
plt.rcParams["axes.unicode_minus"] = False
plt.rcParams["figure.dpi"] = 300
```
