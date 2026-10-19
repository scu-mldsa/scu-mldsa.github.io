# 《统计学习方法》核心模型公式推导与读书会提纲

> **出品单位**：四川大学机器学习与数据科学协会（SCU · MLDSA）学术研讨组  
> **参考教材**：李航《统计学习方法（第2版）》、Trevor Hastie 等《The Elements of Statistical Learning (ESL)》

---

## 专题一：统计学习三要素与泛化误差分解

任何统计学习方法均可归纳为：**模型（Model） + 策略（Strategy） + 算法（Algorithm）**。

$$\mathcal{F} = \{ f \mid Y = f_{\theta}(X), \theta \in \Theta \}$$

在平方损失下，泛化期望风险可以严格分解为 **偏差（Bias）+ 方差（Variance）+ 噪声（Noise）**：

$$\mathbb{E}_{\mathcal{D}}\left[(y - \hat{f}(x; \mathcal{D}))^2\right] = \underbrace{\left(\mathbb{E}_{\mathcal{D}}[\hat{f}(x; \mathcal{D})] - f(x)\right)^2}_{\text{Bias}^2} + \underbrace{\mathbb{E}_{\mathcal{D}}\left[\left(\hat{f}(x; \mathcal{D}) - \mathbb{E}_{\mathcal{D}}[\hat{f}(x; \mathcal{D})]\right)^2\right]}_{\text{Variance}} + \sigma_{\epsilon}^2$$

- **Bagging（如随机森林）**：主要通过平均多棵低相关树来降低 **Variance**。
- **Boosting（如 GBDT / XGBoost）**：主要通过拟合残差/负梯度来降低 **Bias**。

---

## 专题二：支持向量机（SVM）拉格朗日对偶推导脉络

1. **原始问题（Primal Problem）**：
   $$\min_{w, b} \frac{1}{2} \|w\|^2 \quad \text{s.t.} \quad y_i(w^\top x_i + b) - 1 \ge 0, \quad i=1,\dots,N$$
2. **构造广义拉格朗日函数**：
   $$L(w, b, \alpha) = \frac{1}{2}\|w\|^2 - \sum_{i=1}^N \alpha_i y_i(w^\top x_i + b) + \sum_{i=1}^N \alpha_i, \quad \alpha_i \ge 0$$
3. **利用 KKT 条件求偏导置零**：
   $$\nabla_w L = w - \sum_{i=1}^N \alpha_i y_i x_i = 0 \implies w^* = \sum_{i=1}^N \alpha_i y_i x_i$$
   $$\frac{\partial L}{\partial b} = -\sum_{i=1}^N \alpha_i y_i = 0$$
4. **转化为只依赖内积 $\langle x_i, x_j \rangle$ 的对偶凸二次规划问题**，自然引出核函数 $K(x_i, x_j) = \langle \phi(x_i), \phi(x_j) \rangle$。

---

## 专题三：EM 算法（期望极大算法）与 Jensen 不等式

当模型含有隐变量 $Z$ 时，边缘对数似然 $\log P(Y \mid \theta) = \log \sum_Z P(Y, Z \mid \theta)$ 包含“和的对数”，直接求导困难。通过引入隐变量分布 $Q(Z)$ 并应用凹函数 Jensen 不等式构造下界（ELBO）：

$$\log \sum_Z Q(Z) \frac{P(Y, Z \mid \theta)}{Q(Z)} \ge \sum_Z Q(Z) \log \frac{P(Y, Z \mid \theta)}{Q(Z)}$$

- **E-step（求期望）**：固定 $\theta^{(t)}$，令 $Q(Z) = P(Z \mid Y, \theta^{(t)})$ 使不等式取等号，写出 $Q(\theta, \theta^{(t)})$ 函数。
- **M-step（求极大）**：求 $\theta^{(t+1)} = \arg\max_{\theta} Q(\theta, \theta^{(t)})$，保证对数似然单调不减。
