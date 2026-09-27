---
title: "遥操作中的触觉反馈：一份调研笔记"
description: "一份遥操作触觉反馈的调研笔记：人体如何感知触觉，振动、力、电刺激、流体阵列等反馈方式，DOGlove 等遥操作系统，以及 DexUMI、DEXOP 等类 UMI 的穿戴式采集装置。"
tags: [robotics, haptics, teleoperation]
---

本调研主要探究遥操作时的触觉反馈，为笔者在忆生科技实习期间完成。

本文首先说明遥操作为什么需要触觉反馈，并介绍人体的触觉感知机制；随后按振动、力、电刺激、形状阵列等类别梳理触觉反馈的实现方式；接着分析几个具体的遥操作系统，以及类 UMI 的穿戴式采集装置；最后进行总结与讨论。

## 1. 遥操作为什么需要触觉反馈

模仿学习的效果在很大程度上取决于数据，但"什么是好的数据"很难定义。遥操作是目前采集灵巧手数据的主流方式，常见的有三类：

- **基于视觉的手势识别**（如用 VR 头显追踪手部）：无需穿戴设备，但容易受遮挡影响，精度有限；
- **动作捕捉手套**：精度高，但操作者感受不到机械手的接触，只能依靠视觉判断是否接触以及接触力的大小；
- **商用力触觉手套**（如 SenseGlove、MANUS 的力反馈型号）：反馈效果好，但价格昂贵，且与机器人系统集成的工作量较大。

<figure>
  <img src="/assets/blog/haptic-teleoperation/teleop-methods.jpg" alt="三类遥操作方式的对比：视觉手势识别、动捕手套、商用力触觉手套">
  <figcaption>现有的三类遥操作方式。图源：DOGlove 项目报告</figcaption>
</figure>

缺少触觉时，操作者只能依靠视觉判断接触状态。当物体被手指遮挡、接触力很小，或需要控制抓握力度时，这种判断并不可靠。因此，一个直接的思路是研制兼具动作捕捉和力触觉反馈、且成本较低的设备。

## 2. 人体的触觉感知

### 2.1 皮肤中的四类机械感受器

手部皮肤中主要有四类机械感受器，分别负责不同的触觉信息：

| 感受器 | 主要感知 | 对应的操作场景 |
| --- | --- | --- |
| 默克尔触盘（Merkel disc） | 持续的压力、边缘和细小的形状 | 分辨物体表面的纹理和形状 |
| 迈斯纳小体（Meissner corpuscle） | 轻触、低频振动、皮肤上的细微滑动 | 察觉物体开始打滑 |
| 环层小体（Pacinian corpuscle） | 高频振动，约 250 Hz 附近最敏感 | 手持工具时的瞬态振动，如碰撞、敲击 |
| 鲁菲尼末梢（Ruffini ending） | 皮肤的拉伸 | 感知手指姿态和剪切力的方向 |

该表可作为后文讨论的参照：一种触觉反馈装置能刺激哪类感受器，决定了它能传递哪类信息。振动马达主要刺激环层小体和迈斯纳小体，因此适合表达接触和碰撞；表达形状需要能刺激默克尔触盘的阵列；表达剪切和拉扯则需要使皮肤产生拉伸。

### 2.2 不同身体部位的触觉反馈

触觉是人机交互（human–computer interaction，HCI）领域的重要研究方向。在具身智能兴起之前，已有大量 HCI 研究关注如何让人感知虚拟或远程环境。按身体部位划分，常见的有：

- **脖颈**：模拟头部受到的撞击，也有工作用于引导头部转动。常用肌肉电刺激（EMS）：将电极贴在对应肌肉上，刺激肌肉收缩，从而产生压力或撞击感。
- **胸背**：一般为穿戴式背心，其上排布多个振动马达或机械推杆，VR 中发生碰撞时，对应位置的装置动作，产生压力和碰撞感。
- **手臂**：研究相对较少，典型做法是用 EMS 刺激手臂肌肉，模拟搬起重物时的阻力。
- **手指**：研究最多，涉及振动、电触觉、柔性电子皮肤和微流体等方式，详见第 3 节。
- **全身**：例如用经颅磁刺激作用于大脑，在全身多个部位产生触觉（3.3 节）。

遥操作主要关注手指，但手臂和躯干的触觉同样有用，例如提示操作者机械臂即将碰到障碍物（4.4 节）。

## 3. 触觉反馈的实现方式

### 3.1 振动：ERM、LRA 与压电

振动是成本最低、应用最广的触觉反馈方式，常见于手机和游戏手柄。常用的执行器有三类：

- **ERM（Eccentric Rotating Mass，偏心转子马达）**：带偏心配重的直流电机，旋转时产生振动。结构简单、成本极低，但振幅和频率都由转速决定，无法独立控制，启停也较慢，只能提供较粗糙的振感。在消费电子中已基本被 LRA 取代。
- **LRA（Linear Resonant Actuator，线性马达）**：由线圈、磁铁和弹簧组成，用交流信号在共振频率附近驱动质量块往复运动。响应快、功耗低、振感清晰，是目前手机的主流方案；缺点是只在共振频率附近效率较高，频带较窄。按振动方向可分为纵向（Z 轴，通常为圆形）和横向（X/Y 轴，通常为长方形，行程更大，振感更丰富）两种。
- **压电（piezo）**：压电效应是双向的。材料受压时产生电压（正压电效应），可用于传感；反之，施加电压时材料发生形变（逆压电效应），以交流电驱动即可产生振动。压电执行器利用的是后者，用压电薄膜或叠层陶瓷在高频下形变，频带宽、响应最快，可以编程出不同的触感，适合模拟纹理和摩擦；但需要上百伏的驱动电压，驱动电路和封装都更复杂。需要与**压阻**区分：压阻材料只是电阻随形变变化，只能用于采集，不能用于驱动。

不同应用场景下的选型建议如下：

| 应用目标 | 推荐 | 理由 |
| --- | --- | --- |
| 基础的遥操作提示（接触 / 撞击） | LRA | 响应快、功耗低、结构简单 |
| 复杂纹理 / 精细触觉研究 | 压电 | 高频、宽带，触感可编程 |
| 成本受限 / DIY 入门 | ERM | 成本极低，但只能提供粗糙的振动 |
| 多点、空间方位反馈 | LRA 阵列 | 各手指可独立反馈，还可利用多个马达的相位差表达方向 |

振动的局限同样明显：它只能表达是否接触以及接触的强弱，无法表达形状、软硬和力的方向。

### 3.2 力反馈

力反馈的目标是在操作者的手指上施加真实的阻力，使其感知到抓握物体时的反作用力。常见的结构有以下几种：

- **绳驱**：电机通过绳索牵引手指，DOGlove 即采用这种方案（4.1 节）。结构轻，但只能提供单一方向的拉力。
- **连杆外骨骼**：用连杆将电机的力矩传递到各个指节，同时可以测量关节角度，许多数据手套采用这一思路。
- **制动器 / 阻尼**：不主动施力，而是在需要时锁住关节或增大阻尼。例如 Hsin-Ruey Tsai 组的 ELAXO 用可调阻力模拟抓握和扭转，DextrEMS（3.3 节）中也使用了机械制动器。被动式方案的优点是安全、省电。

在上述结构的基础上，还可以做一些简单的扩展，例如在手指两侧增加推杆，引入侧摆方向的自由度，从而传递剪切力的感觉；或者用动态可调的阻尼模拟物体的软硬。

需要注意的是，用电机实现力反馈时，反馈的主观感受在很大程度上取决于控制方式。DOGlove 的实践表明，若只是简单地增大伺服的 PID 增益，操作者会感到反馈过硬、不自然。

### 3.3 电刺激与磁刺激

电刺激在 HCI 研究中非常常见，Pedro Lopes（现任职于芝加哥大学）在这一方向做了大量工作。

**肌肉电刺激（EMS）** 使肌肉非自主地收缩，从而产生被推开的感觉。例如在 VR 中推墙或搬起重箱时刺激手臂肌肉，使人感到墙推不动、箱子很重：

<figure class="narrow">
  <img src="/assets/blog/haptic-teleoperation/ems-walls.jpg" alt="用肌肉电刺激模拟 VR 中的墙壁和重物">
  <figcaption>用 EMS 模拟 VR 中的墙和重物。图源：Lopes et al., CHI 2017</figcaption>
</figure>

同样的方法也可以用于刺激颈部肌肉，直接驱动头部转动，以引导视线：

<figure>
  <img src="/assets/blog/haptic-teleoperation/ems-neck.jpg" alt="用颈部肌肉电刺激控制头部朝向">
  <figcaption>用颈部 EMS 驱动头部转动。图源：Tanaka et al., CHI 2022</figcaption>
</figure>

**DextrEMS** 针对 EMS 的两个固有问题：刺激一根手指时，其他手指也会随之运动；要让手指保持静止，只能持续收缩对侧肌肉，导致手指上下振荡。该工作在 8 个指关节上加装了机械制动器（整套仅 68 克），由 EMS 负责驱动、制动器负责将手指锁定在目标位置，从而实现更灵巧的控制。

<figure>
  <img src="/assets/blog/haptic-teleoperation/dextrems.jpg" alt="DextrEMS：肌肉电刺激结合指关节上的机械制动器">
  <figcaption>DextrEMS。图源：Nith et al., UIST 2021</figcaption>
</figure>

**不遮挡手掌的全手电触觉**（CHI 2023 最佳论文）：电极只贴在手背和手腕上，通过刺激正中神经和尺神经，使人在手掌一侧的 11 个位置感知到触觉。由于手掌侧没有任何装置，用户可以正常抓握真实物体。

<figure>
  <img src="/assets/blog/haptic-teleoperation/electrotactile-full-hand.jpg" alt="电极只放在手背，就能在手掌和手指上产生触觉">
  <figcaption>不遮挡手掌的全手电触觉。图源：Tanaka et al., CHI 2023</figcaption>
</figure>

**磁刺激**：EMS 的电脉冲会带来刺痛感，且依赖预先涂好凝胶的电极，电极需要贴紧皮肤，凝胶也很快会变干。改用磁场刺激肌肉（UIST 2023）可以减轻刺痛感，并能隔着衣物进行刺激。

**Haptic Source-Effector**（CHI 2024）更进一步：用经颅磁刺激（TMS）作用于大脑，将磁线圈移动到头皮上的不同位置，即可在全身产生 15 种不同的触觉和力觉，无需在每个部位都安装执行器。

<figure>
  <img src="/assets/blog/haptic-teleoperation/haptic-source-effector.jpg" alt="通过刺激大脑在多个身体部位产生触觉">
  <figcaption>Haptic Source-Effector。图源：Tanaka et al., CHI 2024</figcaption>
</figure>

电刺激（包括磁刺激）的优点是设备可以做得很小、很轻，并能产生真实的力。但其局限同样明显：不同个体对电刺激的反应差异很大，每次使用前都需要校准；刺痛感和安全风险也使其难以长时间使用。总体而言，电刺激目前主要停留在研究阶段，距离可长期使用的产品还有较大距离。

### 3.4 形状阵列

要表达形状，需要在指尖放置一个"像素阵列"，每个像素可以独立凸起。最直接的方案是机械推杆阵列，但难以小型化；桌面尺度的大型推杆阵列已有相关工作。

**Fluid Reality**（CMU，UIST 2023）是本次调研中最接近理想的方案。每个指尖有一个由气泡状像素组成的阵列，像素内装有液体，通电后液体流入气泡使其鼓起。每个像素都是一个仅几百微米厚的电渗泵，没有任何运动部件，直接利用电场驱动液体中的电荷流动。

<figure>
  <img src="/assets/blog/haptic-teleoperation/fluid-reality.jpg" alt="Fluid Reality：在 VR 里用手指推方块时，指尖阵列凸起，右下角的触点全部亮起">
  <figcaption>在 VR 中用手指推方块：右上为指尖阵列的实物，右下为被激活的触点。图源：Shen et al., UIST 2023（项目视频截图）</figcaption>
</figure>

该方案较好地兼顾了前述需求：

1. **具备阵列**：可以表达物体的大致形状，且响应迅速；
2. **低成本、便携**：整只手套无需连接外部设备，含全部驱动电路和电池仅 207 克，据报道续航约 3 小时，制作成本在 1000 美元以内。

其难点在于制作：封装容易漏液，在此基础上进行改进也需要一定的化学背景（据尝试复现的同学反馈）。该项目后来已成立公司，若以产品落地为目标，直接采购可能比自行复现更可行。

此外，**柔性电子皮肤**和**微振动阵列**也可以模拟精细的图案和纹理，比电刺激更安全、触感更真实，但工艺同样复杂。

### 3.5 软硬、摩擦及其他感觉

另有一些工作不直接施加力，而是改变手指对真实物体的感知：

- **改变软硬感**（Lopes 组，UIST 2021 最佳论文）：通过限制指腹的形变，使硬质物体被感知为更软。装置只夹在指腹两侧，指腹大部分保持裸露，仍能感知物体的纹理，也无需改造物体本身。
- **Stick&Slip**（Lopes 组，CHI 2024）：在指腹上沉积一层快速蒸发的液体，改变指腹与表面之间的摩擦系数，使表面变滑或变黏（约 ±60%），液体蒸发后摩擦即恢复原状。该方法无需改造被触摸的表面，但前提是手指接触真实表面，因此难以直接用于遥操作。

<figure>
  <img src="/assets/blog/haptic-teleoperation/stick-slip.jpg" alt="Stick&amp;Slip：用液体涂层让同一个表面变滑或变黏">
  <figcaption>Stick&amp;Slip。图源：Mazursky et al., CHI 2024</figcaption>
</figure>

- **HairTouch**（CHI 2021）：在 VR 手柄上伸出一束毛刷，通过改变毛发伸出的长度和约束程度，表达软硬、粗糙度和表面高度的差异。
- **GuideBand**（CHI 2021）：三个电机通过绳索牵引手腕上的腕带，在三维方向上施加不同强度的拉力，用于引导小臂的运动方向。
- **FingerX**（CHI 2022）：在手指上安装可伸出和收回的支撑结构，配合真实物体渲染虚拟物体的形状。

以上三项工作均有 Hsin-Ruey Tsai 参与，前文提到的 ELAXO 也出自其实验室。

温度和湿度同样属于触觉，但难以用于遥操作：热量和液体的传导过慢，无法跟上接触状态的快速变化。纹理的应用场景也较少，在大多数操作任务中，纹理对动作的影响并不明显。

### 3.6 小结

| 方式 | 可表达的信息 | 优点 | 缺点 |
| --- | --- | --- | --- |
| 振动（ERM / LRA / 压电） | 接触、碰撞、粗略的力度；压电还可表达纹理 | 成本低、轻便、易于集成 | 无法表达形状和力的方向 |
| 力反馈（绳驱 / 连杆 / 制动） | 抓握阻力、物体软硬 | 提供真实的力 | 结构较重，通常只有单一方向 |
| 电 / 磁刺激（EMS / 电触觉 / TMS） | 力、多个位置的触觉 | 设备轻小 | 个体差异大、需要校准、有刺痛感和安全风险 |
| 形状阵列（推杆 / 流体） | 形状、接触位置 | 信息量大 | 工艺复杂，难以量产 |
| 改变软硬 / 摩擦 | 软硬、滑腻程度 | 可与真实物体结合 | 依赖真实物体，适用场景有限 |

## 4. 遥操作中的触觉反馈

### 4.1 DOGlove：低成本的力触觉手套

DOGlove（RSS 2025）的目标可以用作者的一句话概括："Bring everything about touch back to human." 它面向实时遥操作而非离线示教，旨在实现兼具动作捕捉和力触觉反馈的低成本设备。

<figure>
  <img src="/assets/blog/haptic-teleoperation/doglove-overview.jpg" alt="DOGlove 手套与仿真中的灵巧手">
  <figcaption>DOGlove。图源：Zhang et al., RSS 2025</figcaption>
</figure>

**硬件**：21 自由度的动作捕捉与 5 自由度的力反馈，整套成本低于 600 美元，并且开源。每根手指由电机通过绳索牵引，提供拉力反馈；每个指尖装有一个 LRA，提供振动反馈。

<figure>
  <img src="/assets/blog/haptic-teleoperation/doglove-finger.jpg" alt="DOGlove 的绳驱滑轮系统与手指爆炸图">
  <figcaption>绳驱机构与单根手指的爆炸图。图源：Zhang et al., RSS 2025</figcaption>
</figure>

**动作重定向（retargeting）**：人手与灵巧手的尺寸和关节结构不同，需要将手套测得的关节角映射到灵巧手上。DOGlove 先用手套的正运动学求出人手的指尖位置，经过缩放和变换后，再用灵巧手的逆运动学求解关节角。其中的关键是保证对指：人的拇指与食指接触时，灵巧手的拇指与食指也必须接触。这部分映射需要人工设计，工作量较大。

<figure>
  <img src="/assets/blog/haptic-teleoperation/doglove-retargeting.jpg" alt="从人手经过手套正运动学和指尖逆运动学映射到灵巧手">
  <figcaption>动作重定向。图源：Zhang et al., RSS 2025</figcaption>
</figure>

**力触觉重定向**：灵巧手指尖装有一维力传感器，DOGlove 根据测得的力，在振动和力反馈之间切换：

| 指尖力 | 振动 | 力反馈 | 说明 |
| --- | :---: | :---: | --- |
| < 10 g | ✗ | ✗ | 用阈值区分真实接触与传感器噪声 |
| 10–50 g | ✓ | ✗ | 轻接触时只使用振动 |
| 50–100 g | ✓ | ✓ | 开始引入力反馈 |
| > 100 g | ✗ | ✓ | 只保留力反馈 |

<figure>
  <img src="/assets/blog/haptic-teleoperation/doglove-haptic-force.jpg" alt="DOGlove 按指尖力大小切换振动和力反馈的三个阈值">
  <figcaption>力触觉重定向的三个阈值。图源：Zhang et al., RSS 2025</figcaption>
</figure>

轻接触时不使用力反馈，一方面是因为人对振动较为敏感，用振动表达轻接触更自然；另一方面，力反馈通过调节伺服的力矩实现（具体为调节 PID 的 Kp），在小力范围内容易让人感到过硬。

**后续方向**：作者认为二值或一维信号并不足够，除接触与否之外，材质、软硬、温度等信息同样重要，他们也在尝试形状感知阵列。

### 4.2 Bunny-VisionPro：基于 ERM 的低成本反馈

Bunny-VisionPro（IROS 2025）使用 Apple Vision Pro 进行双手灵巧遥操作，并用 ERM 实现了一套成本较低的触觉反馈：

- 在机器人五指的指尖贴 FSR 压力传感器，实时读取手指与物体之间的接触压力；
- 先进行零点标定（在多个关节位置采集基线，插值后扣除），再做低通滤波；
- 将触觉强度归一化为 0–255 的 PWM 占空比，直接驱动操作者手指上的 ERM 振动马达。

<figure>
  <img src="/assets/blog/haptic-teleoperation/bunny-haptics.jpg" alt="Bunny-VisionPro 的 FSR 传感器、ERM 振动马达和零点标定曲线">
  <figcaption>左：机器人指尖的 FSR 与操作者手上的 ERM；右：零点标定前后的触觉信号。图源：Ding et al., IROS 2025</figcaption>
</figure>

论文还将触觉加入了策略的输入：一种是作为向量并入机器人状态，用 MLP 编码；另一种是将发生接触的指尖视为点，拼入相机点云一起进行视觉编码。实验结果如下：

- 在简单的单手任务中，加入触觉输入几乎没有提升；
- 在双手任务（如双手捏合、协同搬运）中有少量提升；
- 用户实验表明，操作者主观上更倾向于有振动反馈，认为其更自然、更容易感知接触。

这说明触觉反馈对数据采集者的帮助，可能比作为策略输入更直接。此外，ERM 已较为过时，改用 LRA 可以获得更好的反馈效果。

### 4.3 触觉的 AR 可视化

除了将触觉传递到手上，另一种思路是将触觉信息可视化：

- **RDP（Reactive Diffusion Policy，RSS 2025）** 的遥操作系统 TactAR 用 AR 将触觉和力引起的形变实时渲染在末端执行器上，帮助操作者完成削黄瓜皮、擦除花瓶上的字迹等需要控制接触力的任务；
- KTH 的一项灵巧手工作（*Learning Dexterous In-Hand Manipulation with Multifingered Hands via Visuomotor Diffusion*，IROS 2025）使用 Meta Quest 3 的透视 AR 追踪人手，并将追踪结果叠加显示，使操作者能实时看到手的姿态，但没有触觉反馈。

在此基础上，还可以将力的方向和接触位置叠加到 AR 画面中。RDP 使用的是夹爪，若扩展到灵巧手，并将触觉可视化直接叠加在操作者的手上，效果可能更好。

### 4.4 全身振动提示

AeroHaptix 是一套穿戴式振动触觉系统：操作者遥控无人机时，屏幕中不可见的障碍物会通过身体对应方位的振动进行提示，从而减少碰撞。

<figure class="medium">
  <img src="/assets/blog/haptic-teleoperation/aerohaptix.jpg" alt="AeroHaptix：遥控无人机时用身上的振动提示看不见的障碍物">
  <figcaption>AeroHaptix。图源：Huang et al., RA-L 2025</figcaption>
</figure>

这一思路同样适用于机器人遥操作：在操作者的手臂或躯干上布置若干振动马达，提示机械臂即将碰到周围物体。手臂外骨骼（如 AirExo）已有相关工作，但利用触觉提示碰撞仍值得进一步探索。

## 5. 类 UMI 的穿戴式采集

UMI 使用手持夹爪直接记录人的操作，采集时不需要机器人在场。以下几项工作将这一思路扩展到了灵巧手：采集装置戴在人手上，人用自己的手完成操作，天然具备完整的触觉，因而无需再设法将触觉还原给操作者。

### 5.1 Feel the Force：人手与夹爪使用相同的触觉传感器

FTF（Feel the Force，RSS 2025 workshop）不使用遥操作，而是直接采集人手的演示：操作者佩戴一只在拇指指腹装有 AnySkin 式磁性触觉传感器的手套完成任务，机器人夹爪的一个指尖上也装有同样的传感器。其思路是：既然要把人的力迁移到机器人上，就让两端使用相同的传感器。为简化问题，人手到夹爪的映射是固定的。

<figure>
  <img src="/assets/blog/haptic-teleoperation/ftf-glove.jpg" alt="Feel the Force：人手手套和机器人夹爪上都装了 AnySkin 触觉传感器">
  <figcaption>左：采集者佩戴的 AnySkin 手套；右：装有 AnySkin 的夹爪。图源：Adeniji et al., 2025</figcaption>
</figure>

策略从机器人和物体关键点的历史轨迹、力以及夹爪状态中学习，预测未来的运动和所需的接触力，再交由夹爪的力反馈控制器执行。

<figure>
  <img src="/assets/blog/haptic-teleoperation/ftf-overview.jpg" alt="Feel the Force 的整体流程：人手演示、力敏感的策略、机器人执行">
  <figcaption>Feel the Force 的整体流程。图源：Adeniji et al., 2025</figcaption>
</figure>

### 5.2 DexUMI：与灵巧手运动学一致的外骨骼

DexUMI（CoRL 2025，最佳论文提名）旨在弥合人手与灵巧手之间的两类差距：

- **硬件差距**：为特定的灵巧手（如 Inspire Hand、XHand）设计外骨骼，其关节和长度与灵巧手一致。人佩戴外骨骼操作时，动作可以直接映射，无需 retargeting。
- **视觉差距**：用分割和图像修复模型将视频中的人手和外骨骼去除，替换为机器人手的图像，使训练数据在视觉上接近机器人自身的操作。

<figure>
  <img src="/assets/blog/haptic-teleoperation/dexumi-hardware.jpg" alt="DexUMI 为 Inspire Hand 和 XHand 设计的外骨骼，记录动作和观测">
  <figcaption>DexUMI 的外骨骼。图源：Xu et al., CoRL 2025</figcaption>
</figure>

与 UMI 相比，DexUMI 的新颖性没有那么突出，但完整跑通了从数据采集到策略部署的流程，采集效率也明显更高：15 分钟内，遥操作可采集 11 条轨迹，DexUMI 为 36 条，徒手操作为 51 条。

<figure class="medium">
  <img src="/assets/blog/haptic-teleoperation/dexumi-efficiency.jpg" alt="15 分钟内遥操作、DexUMI、徒手分别采集的轨迹数量">
  <figcaption>采集效率对比。图源：Xu et al., CoRL 2025</figcaption>
</figure>

### 5.3 DEXOP：带被动机械手的手部外骨骼

DEXOP 提出了名为 perioperation 的采集范式：人佩戴手部外骨骼，外骨骼上连接一只被动的机械手，人的手指通过连杆直接带动机械手的手指，实现 1:1 操作。

- 采集速度快，操作者能直接感受到接触，精度有保证；
- 机械手上布满触觉传感器，虽然触觉无法完整感知形状，但操作者可以借助视觉，保证采到完成任务的数据；
- 只使用手腕相机和触觉，不使用第三人称视角，因此画面中没有人手，不存在视觉差距；
- 手臂部分安装在 AirExo-2 全臂外骨骼上，可同时采集手臂的动作。

<figure>
  <img src="/assets/blog/haptic-teleoperation/dexop.jpg" alt="DEXOP：带全手触觉传感器的外骨骼与机械手">
  <figcaption>DEXOP。图源：Fang et al., 2025</figcaption>
</figure>

其局限在于：受连杆宽度限制，对指较难实现，也存在一定的碰撞问题；此外，DEXOP 是在自行设计的机械手上加装的，设计时已考虑拆装。对于已封装好的商用灵巧手，则难以进行类似的改造。

### 5.4 其他相关工作

- **DigituSync**（UIST 2022）：一种被动外骨骼，将两个人的手连接在一起，实时传递手指运动，并可调节两人之间的力传递比例。其思路与 DEXOP 相近，但只能传递手指的屈伸，无法完成抓握。
- **Festo ExoHand**（2012）：较早的气动外骨骼手，既能将人手的动作实时传递给机械手，也能将机械手的抓握力反馈给操作者，属于双向遥操作。
- **刺绣智能手套**（Nature Communications 2024）：用数字刺绣机将压阻式触觉传感器和振动执行器直接绣入纺织品，快速制作兼具感知与反馈功能的手套，其演示也包括机器人遥操作。
- **开源触觉传感器**：例如 3D-ViTac 开源了一种低成本的柔性触觉传感器，作者称 30 分钟即可制作一个。DexUMI 等人手采集方案目前无法采集触觉，将这类传感器贴在手上即可同时采集触觉信息。
- **Co-Embodiment**：一项在会议上展示的实验，后整理为论文 *One Body, Two Minds*（KTH，2026）。抓取由扩散策略完成，用户只需点头即可触发与任务相关的手指动作，例如按下电钻开关。用户能够很快适应这种控制方式。这表明对于低自由度的手，或许用四个按键加一个摇杆即可控制整只手，只是效率不及 DEXOP。

## 6. 总结与讨论

1. **电刺激在研究中最常见，但难以产品化。** 个体差异大，使用前需要校准，且存在一定风险，目前主要停留在研究阶段。
2. **柔性皮肤、液泵和微振动阵列更安全、触感更真实，但工艺复杂。**
3. **高还原度的触觉难以依靠单一手段实现**，需要跨学科合作。对具身智能而言，更合理的方向是面向具身数据，而非追求触觉本身：优先实现便捷、高质量的数据采集，而不是高还原度的采集体验。
4. **在视觉可见、操控容易的情况下，简单的振动反馈已基本够用。** DOGlove 基本达到了简单触觉反馈的上限，进一步的改进大多是 ERM、LRA 等执行器的组合。
5. **传感器的布置应由采集需求决定，而非设计者的设想。** 例如是否在中间指节增加传感、是否在末端增加控制，应根据实际采集中的需要来判断。

综上，触觉在具身数据采集中主要有三种用法：

| 用法 | 代表工作 | 可行的方向 |
| --- | --- | --- |
| 遥操作时，人感受触觉 | DOGlove、Bunny-VisionPro | 振动、力、连杆直连，或新材料、流体阵列 |
| 遥操作时，人看到触觉 | RDP、AR 可视化 | AR 结合振动，在画面中显示力的方向和接触位置 |
| 类 UMI 的穿戴式采集 | FTF、DexUMI、DEXOP | 戴在人手上、可 1:1 操控的采集装置，配合低成本触觉传感器 |

笔者认为第三种方式最有利于 scaling：装置戴在人手上，采集速度快，操作方式也符合人的本体感知，是与人最接近的采集方式。

此外，在开展数据采集之前，或许应当先明确什么才是好的遥操作数据：轨迹、速度、力，哪些才是策略真正需要的。

## 参考文献

### 遥操作与数据采集

1. H. Zhang, S. Hu, Z. Yuan, H. Xu. [DOGlove: Dexterous Manipulation with a Low-Cost Open-Source Haptic Force Feedback Glove](https://arxiv.org/abs/2502.07730). *RSS*, 2025.
2. R. Ding, Y. Qin, J. Zhu, C. Jia, et al. [Bunny-VisionPro: Real-Time Bimanual Dexterous Teleoperation for Imitation Learning](https://arxiv.org/abs/2407.03162). *IROS*, 2025.
3. A. Adeniji, Z. Chen, V. Liu, V. Pattabiraman, et al. [Feel the Force: Contact-Driven Learning from Humans](https://arxiv.org/abs/2506.01944). *arXiv*, 2025.
4. R. Bhirangi, V. Pattabiraman, E. Erciyes, Y. Cao, et al. [AnySkin: Plug-and-play Skin Sensing for Robotic Touch](https://arxiv.org/abs/2409.08276). *ICRA*, 2025.
5. C. Chi, Z. Xu, C. Pan, E. Cousineau, et al. [Universal Manipulation Interface: In-The-Wild Robot Teaching Without In-The-Wild Robots](https://arxiv.org/abs/2402.10329). *RSS*, 2024.
6. M. Xu, H. Zhang, Y. Hou, Z. Xu, et al. [DexUMI: Using Human Hand as the Universal Manipulation Interface for Dexterous Manipulation](https://arxiv.org/abs/2505.21864). *CoRL*, 2025.
7. H.-S. Fang, B. Romero, Y. Xie, A. Hu, et al. [DEXOP: A Device for Robotic Transfer of Dexterous Human Manipulation](https://arxiv.org/abs/2509.04441). *arXiv*, 2025.
8. H. Fang, H.-S. Fang, Y. Wang, J. Ren, et al. [AirExo: Low-Cost Exoskeletons for Learning Whole-Arm Manipulation in the Wild](https://arxiv.org/abs/2309.14975). *ICRA*, 2024.
9. H. Fang, C. Wang, Y. Wang, J. Chen, et al. [AirExo-2: Scaling up Generalizable Robotic Imitation Learning with Low-Cost Exoskeletons](https://arxiv.org/abs/2503.03081). *CoRL*, 2025.
10. H. Xue, J. Ren, W. Chen, G. Zhang, et al. [Reactive Diffusion Policy: Slow-Fast Visual-Tactile Policy Learning for Contact-Rich Manipulation](https://arxiv.org/abs/2503.02881). *RSS*, 2025.
11. P. Koczy, M. C. Welle, D. Kragic. [Learning Dexterous In-Hand Manipulation with Multifingered Hands via Visuomotor Diffusion](https://arxiv.org/abs/2503.02587). *IROS*, 2025.
12. P. Koczy, Y. Zhang, D. Kragic, M. C. Welle. [One Body, Two Minds: Variable Autonomy Approach for a Co-embodied Robotic Hand](https://arxiv.org/abs/2606.25575). *arXiv*, 2026.
13. B. Huang, Y. Wang, X. Yang, Y. Luo, Y. Li. [3D-ViTac: Learning Fine-Grained Manipulation with Visuo-Tactile Sensing](https://arxiv.org/abs/2410.24091). *CoRL*, 2024.
14. Y. Luo, C. Liu, Y. J. Lee, J. DelPreto, et al. [Adaptive tactile interaction transfer via digitally embroidered smart gloves](https://doi.org/10.1038/s41467-024-45059-8). *Nature Communications*, 2024.
15. B. Huang, Z. Wang, Q. Cheng, S. Ren, et al. [AeroHaptix: A Wearable Vibrotactile Feedback System for Enhancing Collision Avoidance in UAV Teleoperation](https://arxiv.org/abs/2407.12105). *IEEE RA-L*, 2025.
16. Festo. [ExoHand](https://www.festo.com/us/en/e/about-festo/research-and-development/bionic-learning-network/highlights-from-2010-to-2012/exohand-id_33631/). Bionic Learning Network, 2012.

### 触觉反馈（HCI）

1. P. Lopes, S. You, L.-P. Cheng, S. Marwecki, P. Baudisch. [Providing Haptics to Walls & Heavy Objects in Virtual Reality by Means of Electrical Muscle Stimulation](https://doi.org/10.1145/3025453.3025600). *CHI*, 2017.
2. Y. Tanaka, J. Nishida, P. Lopes. [Electrical Head Actuation: Enabling Interactive Systems to Directly Manipulate Head Orientation](https://doi.org/10.1145/3491102.3501910). *CHI*, 2022.
3. R. Nith, S.-Y. Teng, P. Li, Y. Tao, P. Lopes. [DextrEMS: Increasing Dexterity in Electrical Muscle Stimulation by Combining it with Brakes](https://doi.org/10.1145/3472749.3474759). *UIST*, 2021.
4. Y. Tanaka, A. Shen, A. Kong, P. Lopes. [Full-hand Electro-Tactile Feedback without Obstructing Palmar Side of Hand](https://doi.org/10.1145/3544548.3581382). *CHI*, 2023.
5. Y. Tanaka, A. Takahashi, P. Lopes. [Interactive Benefits from Switching Electrical to Magnetic Muscle Stimulation](https://doi.org/10.1145/3586183.3606812). *UIST*, 2023.
6. Y. Tanaka, J. Serfaty, P. Lopes. [Haptic Source-effector: Full-body Haptics via Non-invasive Brain Stimulation](https://doi.org/10.1145/3613904.3642483). *CHI*, 2024.
7. Y. Tao, S.-Y. Teng, P. Lopes. [Altering Perceived Softness of Real Rigid Objects by Restricting Fingerpad Deformation](https://doi.org/10.1145/3472749.3474800). *UIST*, 2021.
8. A. Mazursky, J. Serfaty, P. Lopes. [Stick&Slip: Altering Fingerpad Friction via Liquid Coatings](https://doi.org/10.1145/3613904.3642299). *CHI*, 2024.
9. J. Nishida, Y. Tanaka, R. Nith, P. Lopes. [DigituSync: A Dual-User Passive Exoskeleton Glove That Adaptively Shares Hand Gestures](https://doi.org/10.1145/3526113.3545630). *UIST*, 2022.
10. V. Shen, T. Rae-Grant, J. Mullenbach, C. Harrison, C. Shultz. [Fluid Reality: High-Resolution, Untethered Haptic Gloves using Electroosmotic Pump Arrays](https://doi.org/10.1145/3586183.3606771). *UIST*, 2023.
11. Z.-Y. Zhang, H.-X. Chen, S.-H. Wang, H.-R. Tsai. [ELAXO: Rendering Versatile Resistive Force Feedback for Fingers Grasping and Twisting](https://doi.org/10.1145/3526113.3545677). *UIST*, 2022.
12. H.-R. Tsai, C. Tsai, Y.-S. Liao, Y.-T. Chiang, Z.-Y. Zhang. [FingerX: Rendering Haptic Shapes of Virtual Objects Augmented by Real Objects using Extendable and Withdrawable Supports on Fingers](https://doi.org/10.1145/3491102.3517489). *CHI*, 2022.
13. H.-R. Tsai, Y.-C. Chang, T.-Y. Wei, C.-A. Tsao, et al. [GuideBand: Intuitive 3D Multilevel Force Guidance on a Wristband in Virtual Reality](https://doi.org/10.1145/3411764.3445262). *CHI*, 2021.
14. C.-J. Lee, H.-R. Tsai, B.-Y. Chen. [HairTouch: Providing Stiffness, Roughness and Surface Height Differences Using Reconfigurable Brush Hairs on a VR Controller](https://doi.org/10.1145/3411764.3445285). *CHI*, 2021.
