---
title: 'Optimal transportation'
date: 2025-02-09
permalink: /posts/2025/02/OT/
tags:
  - study
---
在探索TTA (test time adaptation) 的时期，有幸了解到OT这一方法，也谨以此文感谢李爽老师对我在大模型方面的教导。

# 1. 最优运输问题简述
对于源数据分布与目标数据分布这两大分布，我们希望使用最小的代价\\( c(m,n) \\)完成从源数据分布迁移到目标数据分布这一过程，计算出最佳传输方案\\( p(m,n) \\)

当我们计算出了最小代价\\( c(m,n) \\)与最佳传输方案\\( p(m,n) \\)，我们就可以：

使用\\( c(m,n) \\)来衡量两个分布的相似性或差异性
在一定条件下，使用\\( p(m,n) \\)对新的样本进行类似的迁移

# 2. 概念引入
## 2.1 基础概念介绍
Histograms：概率向量或称为概率直方图
一个长度为n的数组，每个元素的值在\[0, 1\]之间，并且该数组的和为1，即表示的是一个概率分布向量

$$
\Sigma_n \overset{\text{def.}}{=} \left\{ \mathbf{a} \in \mathbf{R}_{+}^n : \sum_{i=1}^n \mathbf{a}_i = 1 \right\}
$$

Discrete measures：离散测度
一个带有权\\( a \\)和位置 \\( x_1, \ldots, x_n \in \mathcal{X} \\) 的离散测度写作

$$
\alpha=\sum_{i=1}^n \mathbf{a}_i \delta_{x_i}
$$

图中红色点是均匀的概率分布，蓝色点是任意的概率分布。
点状分布对应一维数据的概率向量分布，点云状分布对应二维数据的概率向量分布
![](/images/posts/2025-02/discrete-distribution.png)

Push-forward operator：前向操作符
对于连续映射\\( T:\mathcal{X}\to\mathcal{Y} \\)，定义前向操作符\\( T_\sharp:\mathcal{M(X)}\to\mathcal{M(Y)} \\)，对于离散测度，前向操作符移动支撑测度内所有点的位置

$$
T_\sharp\alpha\overset{\text{def.}}{=}\sum\limits_i\mathbf{a}_i\delta_{T(x_i)}
$$

直观地说，可测量映射\\( T:\mathcal{X}\to\mathcal{Y} \\)可以解释为将单个点从可测量空间移动道另一个点的函数，\\( T_\sharp \\)则是\\( T \\)的一个扩展，作用对象扩展到了一整个概率测度到另一个新概率测度
![](/images/posts/2025-02/push-function.png)

## 2.2 蒙日（Monge）问题
### 2.3.1 定义
蒙日(Monge)问题的定义：找出从一个 measure到另一个measure的映射，使得所有\\( c( x_i , y_j ) \\)的和最小，其中\\( c \\)表示映射路线的运输代价，需要根据具体应用定义。

采用离散测度来解释，对于两个离散测度：

$$\alpha=\sum\limits_{i=1}^n \mathbf{a}_i \delta_{x_i} \quad \text{and} \quad \beta=\sum\limits_{j=1}^m \mathbf{b}_j \delta_{y_j}$$

找到一个n维映射到m维的一个映射 \\( T:\{x_1,...,x_n\}\to\{y_1,...,y_m\} \\) ，使得：

$$\forall j \in [\![ m ]\!], \quad \mathbf{b}_j=\sum_{i: T\left(x_i\right)=y_j} \mathbf{a}_i$$

此约束条件要求，可紧密地表示为 \\( T_{\sharp} \alpha=\beta \\) ，被称为mass conservation constraint

\\( n=m \\)可以有如下左图
\\( n>m \\)时，一个\\( x_i \\)只能输出到一个\\( y_j \\)，但一个\\( y_j \\)允许输入多个\\( x_i \\)
\\( n<m \\)意味着优化问题无解
下图为两个Monge问题例子：
![](/images/posts/2025-02/example-monge.png)

左图中两个离散测度内点是对称相等的，而右图是大小区分的

最终形式化表达如下

$$\min \limits_T\left\{\sum\limits_i c\left(x_i, T\left(x_i\right)\right): T_{\sharp} \alpha=\beta\right\}$$

含义为通过映射\\( T(x_i) \\)，满足转移到\\( b_j \\)的所有\\( a_i \\)的和恰好等于\\( b_j \\)，要求所有的\\( a_i \\)必须转走，同时所有的\\( b_j \\)收到了预期的总和
其中\\( c \\)代表运输代价，\\( T_\sharp \\)代表映射的运输方案

### 2.3.2 缺陷
1. 对于任意两个分布不一定存在可行解
	* \\( n\ne m \\)时，Monge问题不一定存在可行解
2. 可行域非凸，求解效率低下
	* mass conservation constraint，其中的push-forward操作使得优化问题求解困难，大多数时间需要进行方案的枚举，复杂度极大

那么能否改掉push-forward操作，使得整个OT问题变为凸问题：
1. 保证了唯一可行解的存在
2. 可以灵活使用各种优化方法求解
于是有了Kantorovich问题定义

## 2.3 Kantorovich Relaxation（松弛Monge问题）
### 2.3.1 运输公式定义
Kantorovich 的关键思想是放宽运输的确定性性质，即源点\\( x_i \\)只能分配给另一个点或位置 \\( y_{\sigma_i} \\) 或 \\( T(x_i) \\)。
相反，Kantorovich 提议将任何点\\( x_i \\)的mass都可能调度到多个位置。
Kantorovich 放弃了质量运输应该是确定性的，而是考虑了一种概率运输，它允许现在通常所说的质量从一个源头向多个目标分裂。

运输公式定义如下，其中离散概率分布向量\\( \mathbf{a}\in\mathbb{R}^n \\)和\\( \mathbf{b}\in\mathbb{R}^m \\)：

$$\mathbf{U}(\mathbf{a}, \mathbf{b}) \stackrel{\text { def. }}{=}\left\{\mathbf{P} \in \mathbb{R}_{+}^{n \times m}: \mathbf{P} \mathbb{1}_m=\mathbf{a} \quad\right. \text{and} \left.\quad \mathbf{P}^{\mathrm{T}} \mathbb{1}_n=\mathbf{b}\right\}$$

其中我们使用以下矩阵向量表示法：

$$
\mathbf{P} \mathbb{1}_m=\left(\sum_j \mathbf{P}_{i, j}\right)_i \in \mathbb{R}^n \quad \text{and} \quad \mathbf{P}^{\mathrm{T}} \mathbb{1}_n=\left(\sum_i \mathbf{P}_{i, j}\right)_j \in \mathbb{R}^m
$$

具体例子如下图：
![](/images/posts/2025-02/example-T.png)

矩阵集\\( \mathbf{U}(\mathbf{a},\mathbf{b}) \\)由 \\( n+m \\) 相等约束有界和定义，因此是凸多面体（有限矩阵集的凸包）

此外，Monge公式本质上是不对称的（如先前例子2.2右图可见），而Kantorovich的松弛公式总是对称的，即当且仅当\\( P^T \\)在\\( \mathbf{U}(\mathbf{b},\mathbf{a}) \\)时，有耦合\\( P \\)在\\( \mathbf{U}(\mathbf{a},\mathbf{b}) \\)中。

### 2.3.2 求解公式与理解

最终求解公式定义如下：

$$\mathrm{L}_{\mathbf{C}}(\mathbf{a}, \mathbf{b}) \stackrel{\text { def. }}{=} \min _{\mathbf{P} \in \mathbf{U}(\mathbf{a}, \mathbf{b})}\langle\mathbf{C}, \mathbf{P}\rangle \stackrel{\text { def. }}{=} \sum_{i, j} \mathbf{C}_{i, j} \mathbf{P}_{i, j}$$

对于数学表达的理解
1. \\( C \\) 与 \\( P \\) 的矩阵内积应该尽可能的小，即**运输代价越小的两个传输点，获得更大的匹配权重\\( P_{i,j} \\)**
2. Kantorovich松弛了约束，允许了多x到多y的匹配
3. \\( P^* \\)的行和等于\\( \mathbf{a} \\)向量，列和等于\\( \mathbf{b} \\)向量，即是需满足输入与输出总量匹配
4. \\( P^* \\)的行和列分别等于两个概率分布向量，\\( P^* \\)也可以被理解为联合概率分布矩阵

### 2.3.3 对比Monge与Kantorovich

* 动机角度，Kantorovich松弛了Monge问题的mass conservation constraint，引入mass splitting，即源点\\( x_i \\)可以分散地运输到不同地方
* 思想角度，Kantorovich松弛了Monge问题中的确定性运输（deterministic transport），转而考虑概率运输**probabilistic transport**
* 求解角度，Monge问题是一个非凸的问题，不一定存在可行解，而Kantorovich问题是一个明确的凸问题，是一个线性规划问题，必然存在最优解，同时可以使用线性规划求解方法提高求解速度
* 从泛化性，Kantorovich极大扩充了OT的运用场景

# 3. 算法解题
## 3.1 最优运输问题初解
最优运输问题的求解一般是求取Kantorovich Relaxation的解
### 3.1.1 运输多面体的顶点
具有非空且有界的可行集的线性规划在可行集的顶点处达到最小值
由于最优传输问题的可行集\\( \mathbf{U}(\mathbf{a},\mathbf{b}) \\)是有界的
因此可将最优\\( P \\)的搜索限制在多面体\\( \mathbf{U}(\mathbf{a},\mathbf{b}) \\)的极值点集上
### 3.1.2 二分图
对于线性规划寻找顶点解时，当判断其是否是一个最优解，需要符合以下条件：如果P是一个顶点解，那么P中有质量流的路径一定不行成一个环。
这同时也意味着P中最多只能有n + m − 1条不为零的质量流。具体的示意图如下：
![](/images/posts/2025-02/bipartite-network-flow.png)
上图每条连线表示一个质量流，但其中存在环，可知一定不是最优解。这便是求解最优运输的集合解释。

### 3.1.3 西北角算法与网络单纯性法

求解线性规划的方法

## 3.2 熵(Entropic)正则化

在大部分应用情况下，求标准Kantorovich Relaxation解是不必要的：如果我们利用正则化，改求近似解，那么最优传输的计算代价就大幅降低了。熵正则化的定义公式如下：

$$\mathbf{H}(\mathbf{P}) \stackrel{\text { def. }}{=}-\sum_{i, j} \mathbf{P}_{i, j}\left(\log \left(\mathbf{P}_{i, j}\right)-1\right)$$

\\( \mathbf{H} \\)是1-strongly concave（凹），因为

$$\partial^2 \mathbf{H}(P)=-\operatorname{diag}\left(1 / \mathbf{P}_{i, j}\right) $$

and 

$$\mathbf{P}_{i, j} \leq 1 $$

熵正则化的想法是使用\\( -\mathbf{H} \\) 

作为正则化函数，获得一个近似解：

$$ {\mathrm{L}}_{\mathbf{C}}^{\varepsilon }\left( {\mathbf{a},\mathbf{b}}\right) \overset{\text{ def.} }{ = }\mathop{\min }\limits_{ {\mathbf{P} \in  \mathbf{U}\left( {\mathbf{a},\mathbf{b}}\right)} }\langle \mathbf{P},\mathbf{C}\rangle  - \varepsilon \mathbf{H}\left( \mathbf{P}\right)$$

图4.1描述了熵正则化的影响，熵逐渐将原始的\\( LP \\)解法推离三角形边界，移动到熵中心
![](/images/posts/2025-02/impact-of-epsilon.png)

正则化鼓励利用多数小流量路径的传输，而惩罚稀疏的，利用少数大流量路径的传输，由此达到减少计算复杂度的目的。具体的解释可以参考下述的示意图：
![](/images/posts/2025-02/impact-of-epsilon2.png)
当参数\\( \varepsilon \\)越大，最优解的耦合程度越来越稀疏。
通过熵正则化的处理，求取近似解的过程，能够有效降低获取理想解的时间。

## 3.3 Sinkhorn算法
Sinkhorn算法基于熵正则化的思想，提供一种更加巧妙的求解向量u和v的解法（得到u和v的解，就可以认为得到了Kantorovich Relaxation问题的对偶解，也就是最终的最优解。

与熵相比，二次正则化的主要优点是它会产生最优耦合的稀疏近似，但这是以较慢的算法为代价的，该算法无法像 Sinkhorn 那样高效地并行化以同时计算多个最优传输（如 §4.16 中所述）。图 4.6 对比了熵正则化器和二次正则化器实现的近似值。
![](/images/posts/2025-02/comparison.png)
### 3.3.1 先前符号整理

随机变量\\( r \\)与\\( c \\)为概率密度，属于单纯性\\( \sum_d:=\{x\in R_{+}^{d}: x^{T}1_d=1\} \\)
传输多面体（transport plan）

$$\mathbf{U}(\mathbf{r}, \mathbf{c}) \stackrel{\text { def. }}{=}\left\{ \mathbf{P} \in \mathbb{R}_{+}^{d \times d}: \mathbf{P} \mathbb{1}_d=\mathbf{r} \quad\right. \text{and} \left.\quad \mathbf{P}^{\mathrm{T}} \mathbb{1}_d=\mathbf{c}\right\}$$

\\( \mathbf{P} \\)理解为联合概率密度函数，边缘分布满足\\( r \\) 与 \\( c \\)
\\( M \\)为传输距离或是代价，满足三角不等式

$$ \mathcal{M}=\left\{M \in \mathbb{R}_{+}^{d \times d}: \forall i, j \leq d, m_{i j}=0 \Leftrightarrow i=j, \forall i, j, k \leq d, m_{i j} \leq m_{i k}+m_{k j}\right\}$$

优化目标等价于

$$d_{M}(r, c):=\min _{P \in U(r, c)}\langle P, M\rangle$$

### 3.3.2 sinkhorn distances
思想是仍是，想让解不稀疏，就需要使得熵增大，可以找到这样一个熵最大的矩阵，即是秩1矩阵\\( rc^{T} \\)熵最大。这也符合直观的理解，秩1矩阵每一行都是别的行的倍数，只要有1个不是0，所有都不会是0。

于是添加约束

$$
U_{\alpha}(r, c)=\left\{P \in U(r, c) \mid \mathrm{KL}\left(P \| r c^{T}\right) \leq \alpha\right\} 
$$

让\\( P \\)与\\( rc^{T} \\)足够接近，那么我们写出sinkhorn distances：

$$d_{M, \alpha}(r, c) \stackrel{\text { def }}{=} \min _{P \in U_{\alpha}(r, c)}\langle P, M\rangle$$

如下图可见，Sinkhorn 距离是 M 与该球中最佳运输点的点积。
![](/images/posts/2025-02/view-of-transportation-polytope.png)
根据Cover and Thomas, 1991的文献，有等式：

$$\forall r, c \in \Sigma_{d}, \forall P \in U(r, c), h(P) \leq h(r)+h(c)$$

接下来把KL散度打开，可得出：

$$
\begin{align*}
U_{\alpha}(r, c)&:=\left\{P \in U(r, c) \mid \mathbf{K L}\left(P \| r c^{T}\right) \leq \alpha\right\}\\&=\{P \in U(r, c) \mid h(P) \geq h(r)+h(c)-\alpha\} \subset U(r, c)
\end{align*}
$$

下证明其中的：

$$\mathbf{K L}\left(P \| r c^{T}\right)=h(r)+h(c)-h(P)$$

引入KL散度与熵定义：

\\( KL(P||Q)=\sum_iP(i)log\frac{P(i)}{Q(i)} \\)
\\( h(P)=-\sum_iP(i)logP(i) \\)
\\( KL(P||Q)=H(P,Q)-h(P) \\)
\\( H(P,Q) = -\sum_iP(i)logQ(i) \\)

展开原式左侧：

$$\mathbf{K L}\left(P \| r c^{T}\right)=H(P,rc^{T})-h(P)$$

即转为证明：

$$
H(P,rc^T)=h(r)+h(c)
$$

展开左侧：

$$
\begin{align*}
H(P,rc^T)&=-\sum_iP(i)log(rc^T(i))\\
&=-\sum_iP(i)log(r(i)*c^T(i))\\
&=-\sum_iP(i)log(r(i))-\sum_iP(i)log(c^T(i))\\
&=h(r)+h(c)
\end{align*}
$$

证毕

回到原式：

$$U_{\alpha}(r, c)=\{P \in U(r, c) \mid h(P) \geq h(r)+h(c)-\alpha\} \subset U(r, c)$$

由于其中，\\( h(r) \\)与\\( h(c) \\)是确定的数，因此\\( h(P) \geq C \\)，那么可以把约束改写为如下的目标函数：

$$
\langle P, M\rangle-\frac{1}{\lambda} h(P)
$$

相当于，想 h(P) 要尽可能大。这样，我们再把概率的约束加上，可以求拉格朗日函数：

$$L(P, \alpha, \beta)=\sum_{i j} (\frac{1}{\lambda} p_{i j} \log p_{i j}+p_{i j} m_{i j})+\alpha^{\prime}\left(P 1_{d}-r\right)+\beta^{\prime}\left(P^{\prime} 1_{d}-c\right)$$

然后对拉格朗日求偏导：
对\\( p_{ij} \\)求偏导得出

$$
\begin{align*}
\frac{1}{\lambda}(\log p_{i j}+1)+m_{ij}+\alpha_{i}+\beta_{j}=0\\
\log{p_{ij}}=-1-\lambda(m_{ij}+\alpha_{i}+\beta_{j}) \\
p_{i j}^{\lambda}=\exp \left(-\frac{1}{2}-\lambda \alpha_{i}\right) \exp \left(\lambda m_{i j}\right) \exp \left(-\frac{1}{2}-\lambda \beta_{i}\right) \\
\end{align*}
$$

设定， \\( u_{j}=\exp \left(-\frac{1}{2}-\lambda \alpha_{i}\right) \\)，\\( v_{j}=\exp \left(-\frac{1}{2}-\lambda \beta_{i}\right) \\)，求和得出

$$ \sum_{i} p_{i j}=u_{j}\left(\sum_{i} M_{i j} v_{i}\right)=r_{j}, \quad \sum_{j} p_{i j}=\left(u_{j} \sum_{i} M_{i j}\right) v_{i}=c_{i}$$

写成矩阵形式即为

$$P^{\lambda}=\operatorname{diag}(u) M \operatorname{diag}(v)$$

进而，我们需要解的就是这个\\( u \\)和\\( v \\)
根据上面的拉格朗日结果的第二行，可以得到 u, v 的迭代公式

$$u_{j}^{t+1}=\frac{r_{j}}{\sum_{i} M_{i j} v_{i}^{t}}, \quad v_{i}^{t+1}=\frac{c_{i}}{\sum_{j} M_{i j} u_{j}^{t}}$$ 

可以用不动点迭代交替更新，直到收敛
关于这个的收敛速率的话可以证明是线性收敛的
# 4. OT的实践使用
## 4.1 Wasserstein GAN (WGAN) 填补 (ICML, 2017)

2017年的ICML文章，结合了最优运输中的Wasserstein距离来做填补
M. Arjovsky, S. Chintala, and L. Bottou, “Wasserstein generative adversarial networks,” in _Proceedings of the 34th International Conference on Machine Learning - Volume 70_, Sydney, NSW, Australia, Aug. 2017, pp. 214–223, Accessed: Mar. 10, 2021. [Online].
## 4.2 最优运输填补 (ICML, 2020)

采用最优运输的Wasserstein距离、Entropic 正则化以及Sinkhorn算法理论
B. Muzellec, J. Josse, C. Boyer, and M. Cuturi, “Missing Data Imputation using Optimal Transport,” _arXiv:2002.03860 [cs, stat]_, Jul. 2020, Accessed: Mar. 12, 2021. [Online]. Available: http://arxiv.org/abs/2002.03860

## 4.3 Neural Optimal Transport（ICLR 2023 Spotlight）

![](/images/posts/2025-02/stochastic_OT_map.png)

[iamalexkorotin/NeuralOptimalTransport: PyTorch implementation of "Neural Optimal Transport" (ICLR 2023 Spotlight) (github.com)](https://github.com/iamalexkorotin/NeuralOptimalTransport)

使用NOT实现了一对一、一对多的迁移
提供参数进行多样性控制