---
permalink: /
author_profile: true
stylesheets:
  - /assets/css/home.css
redirect_from:
  - /about/
  - /about.html
---

<header class="hero-heading">
  <h1 class="main-heading">
    <span class="heading-kicker">Welcome, I am Wentao Guo.</span>
    <span class="heading-main">Building embodied intelligence through<br>data loops and robot hands.</span>
  </h1>
  <div class="hero-chips" aria-label="Research themes">
    <span>Data-centric robotics</span>
    <span>Closed-loop learning</span>
    <span>Task-aware hardware</span>
  </div>
</header>

<section id="about" class="profile-intro">
  <p class="intro-lead">
    I am Wentao Guo, an incoming first-year Ph.D. student at The University of Hong Kong, working on Robotics and Embodied AI. 
  </p>
  <p class="intro-lead">
    My research aims to build stronger embodied models through data-centric exploration: understanding what data robots need, closing the loop between collection and policy improvement, and developing systems that can continuously refine behavior from real interaction.
  </p>
  <p class="intro-lead">
    I am also interested in hardware as part of the learning pipeline. By designing task-aware robotic hands, grippers, and data-collection devices, I hope to obtain higher-quality interaction data, reshape the action space of manipulation tasks, and study how better hardware design can reduce the burden on robot policies.
  </p>
</section>

<section id="news">
  <h2>News</h2>
  <div class="news-box">
    <ul class="news-list">
      <li><span class="news-date"><em>2026.06</em></span> mu0 received Best Innovation Solution at the 2nd WBCD Winners @ ICRA 2026.</li>
      <li><span class="news-date"><em>2026.02</em></span> Received Bronze Award at Deep Hackathon 2025.</li>
      <li><span class="news-date"><em>2025.10</em></span> SCAL received Best Demo Award at IROS Workshop CIM.</li>
      <li><span class="news-date"><em>2025.10</em></span> Hoecken-D Hand accepted to ROBIO 2025 as Oral.</li>
      <li><span class="news-date"><em>2025.08</em></span> Won 1st Place at the ASME Student Mechanism & Robotics Design Competition.</li>
      <li><span class="news-date"><em>2025.07</em></span> IROS 2025 first-author paper accepted as Oral.</li>
    </ul>
  </div>
</section>

<section id="experience">
  <h2>Experience</h2>
  <div class="education-container">
    <div class="education-card">
      <div class="education-logos">
        <img class="education-logo-wide" src="images/school_logo/hku_logo.png" alt="The University of Hong Kong logo">
      </div>
      <div class="education-info">
        <strong>The University of Hong Kong</strong><br>
        <em>2026.9 - Present</em><br>
        Ph.D. student in Embodied AI, <a href="https://www.cds.hku.hk/" target="_blank" rel="noreferrer">School of Computing and Data Science (CDS)</a>, advised by <a href="https://yanchaoyang.github.io/" target="_blank" rel="noreferrer">Yanchao Yang</a>.
      </div>
    </div>

    <div class="education-card">
      <div class="education-logos">
        <img class="education-logo-wide" src="images/school_logo/transcengram_logo.png" alt="Transcengram logo">
      </div>
      <div class="education-info">
        <strong>Transcengram</strong><br>
        <em>2025.10 - Present</em><br>
        Algorithm Intern in <a href="https://transcengram.com/" target="_blank" rel="noreferrer">Transcengram</a>, Shenzhen Algorithm Department. Research on teleoperation and data collection.
      </div>
    </div>

    <div class="education-card">
      <div class="education-logos">
        <img class="education-logo-wide" src="images/school_logo/x-institue_logo.jpg" alt="X-Institute logo">
        <img src="images/school_logo/Tsinghua_University_Logo.svg" alt="Tsinghua University logo">
      </div>
      <div class="education-info">
        <strong>X-Institute (X-Scholar)</strong><br>
        <em>2024.10 - Present</em><br>
        Tsinghua University Tsien Excellence in Engineering Program (Joint Training), advised by <a href="https://scholar.google.com/citations?hl=zh-CN&amp;user=n-3doEMAAAAJ" target="_blank" rel="noreferrer">Wenzeng Zhang</a>. Research on underactuated hands and embodied AI policies
      </div>
    </div>

    <div class="education-card">
      <div class="education-logos">
        <img src="images/school_logo/bit_logo.svg" alt="Beijing Institute of Technology logo">
      </div>
      <div class="education-info">
        <strong>Beijing Institute of Technology</strong><br>
        <em>2022.8 - 2026.6</em><br>
        School of Computer Science · Xu Teli Honors Program (B.Eng.). Dewin Scholarship.
      </div>
    </div>
  </div>
</section>

<section id="publications">
  <h2>Publications</h2>
  <p class="author-note">* equal contribution · † corresponding author · ‡ project leader</p>
  <div class="pub-button-container">
    <button class="pub-button active" onclick="filterPublications(event, 'all')">Selected Publications</button>
    <button class="pub-button" onclick="filterPublications(event, 'list')">Full Publications List</button>
  </div>

  <div id="core-publications" class="publication-view" data-publication-view="core">
    <div class="publication-card">
      <div class="homepage-card-body">
        <div class="pub-media-rotator homepage-media" data-interval="4000">
          <img src="assets/papers/26_robolineage/image/fig2.png" alt="RoboLineage lifecycle overview">
        </div>
        <div>
          <strong>RoboLineage: Agent-Native Data Lifecycle Governance Across Robot Policy Iterations</strong><br>
          <i>Qian Luo, <strong>Wentao Guo</strong>, Zhennan Qin, Nanchun Guo, Yunhan Zhao, Yi Ma, Yanchao Yang<sup>†</sup>.</i><br>
          <p>
            Agent-native lifecycle governance for robot policy iteration across collection, review, training, evaluation, and recollection.
          </p>
          <div class="pub-badge-row">
            <span class="pub-list-badge">Preprint</span>
          </div>
          <div class="link-row compact">
            <a class="homepage-link" href="https://arxiv.org/abs/2606.22142" target="_blank" rel="noreferrer">arXiv</a>
            <a class="homepage-link" href="https://robolineage.github.io/" target="_blank" rel="noreferrer">Page</a>
            <a class="homepage-link" href="https://github.com/robolineage/robolineage" target="_blank" rel="noreferrer">Code</a>
            <a class="homepage-link" href="https://robolineage.github.io/#videos" target="_blank" rel="noreferrer">Video</a>
          </div>
        </div>
      </div>
    </div>

    <div class="publication-card">
      <div class="homepage-card-body">
        <div class="pub-media-rotator homepage-media" data-interval="4000">
          <img src="assets/papers/26_icra/image/照片.png" alt="SCAL prototype">
        </div>
        <div>
          <strong>SCAL for Pinch-Lifting: Complementary Rotational and Linear Prototypes for Environment-Adaptive Grasping</strong><br>
          <i><strong>Wentao Guo</strong>, Wenzeng Zhang<sup>†</sup>.</i><br>
          <p>
            Complementary rotational and linear prototypes for environment-adaptive pinch-lifting and grasping.
          </p>
          <div class="pub-badge-row">
            <span class="pub-list-badge">Preprint</span>
            <span class="pub-list-badge">IROS Workshop CIM Best Demo Award</span>
          </div>
          <div class="link-row compact">
            <a class="homepage-link" href="assets/papers/26_icra/icra2026.pdf" target="_blank" rel="noreferrer">PDF</a>
            <a class="homepage-link" href="https://arxiv.org/abs/2510.22738" target="_blank" rel="noreferrer">arXiv</a>
            <a class="homepage-link" href="assets/papers/26_icra/tl_hand_final.mp4" target="_blank" rel="noreferrer">Video</a>
            <a class="homepage-link" href="assets/papers/26_icra/poster.jpg?view=poster" target="_blank" rel="noreferrer">Poster</a>
          </div>
        </div>
      </div>
    </div>

    <div class="publication-card">
      <div class="homepage-card-body">
        <div class="pub-media-rotator homepage-media" data-interval="4000">
          <img src="assets/papers/25_robio/image/demo集合.png" alt="Hoecken-D hand demonstrations">
        </div>
        <div>
          <strong>Hoecken-D Hand: A Novel Robotic Hand for Linear Parallel Pinching and Self-Adaptive Grasping</strong><br>
          <i><strong>Wentao Guo</strong>, Wenzeng Zhang<sup>†</sup>.</i><br>
          <p>
            A robotic hand for linear parallel pinching and self-adaptive grasping, designed around compact linkage-driven motion.
          </p>
          <div class="pub-badge-row">
            <span class="pub-list-badge">ROBIO 2025 Oral</span>
          </div>
          <div class="link-row compact">
            <a class="homepage-link" href="assets/papers/25_robio/25_robio_hoeckend.pdf" target="_blank" rel="noreferrer">PDF</a>
            <a class="homepage-link" href="https://arxiv.org/abs/2510.13553" target="_blank" rel="noreferrer">arXiv</a>
            <a class="homepage-link" href="assets/papers/25_robio/poster.jpg?view=poster" target="_blank" rel="noreferrer">Poster</a>
          </div>
        </div>
      </div>
    </div>

    <div class="publication-card">
      <div class="homepage-card-body">
        <div class="pub-media-rotator homepage-media" data-interval="4000">
          <img src="assets/papers/25_iros/image/抓取照片.png" alt="Hoeckens linkage hand grasping">
        </div>
        <div>
          <strong>A Novel Robot Hand with Hoeckens Linkages and Soft Phalanges for Scooping and Self-Adaptive Grasping in Environmental Constraints</strong><br>
          <i><strong>Wentao Guo</strong>, Yizhou Wang, Wenzeng Zhang<sup>†</sup>.</i><br>
          <p>
            A robot hand design for scooping and self-adaptive grasping in environmental constraints, combining Hoeckens linkages with soft phalanges.
          </p>
          <div class="pub-badge-row">
            <span class="pub-list-badge">IROS 2025 Oral</span>
          </div>
          <div class="link-row compact">
            <a class="homepage-link" href="assets/papers/25_iros/201866-3909.pdf" target="_blank" rel="noreferrer">PDF</a>
            <a class="homepage-link" href="https://arxiv.org/abs/2510.13535" target="_blank" rel="noreferrer">arXiv</a>
            <a class="homepage-link" href="https://www.youtube.com/watch?v=eQuu3pJjB0U" target="_blank" rel="noreferrer">Video</a>
            <a class="homepage-link" href="assets/papers/25_iros/poster.jpg?view=poster" target="_blank" rel="noreferrer">Poster</a>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div id="full-publications" class="publication-view" data-publication-view="list" hidden>
    <ul class="full-publication-list">
      <li>
        <span class="pub-list-badge">Preprint</span>
        <span class="pub-list-title">RoboLineage: Agent-Native Data Lifecycle Governance Across Robot Policy Iterations</span><br>
        <span class="pub-list-authors">Qian Luo, <strong>Wentao Guo</strong>, Zhennan Qin, Nanchun Guo, Yunhan Zhao, Yi Ma, Yanchao Yang<sup>†</sup>.</span>
        <span class="pub-list-links"><a href="https://arxiv.org/abs/2606.22142">[arXiv]</a><a href="https://robolineage.github.io/">[page]</a><a href="https://github.com/robolineage/robolineage">[code]</a><a href="https://robolineage.github.io/#videos">[video]</a></span>
      </li>
      <li>
        <span class="pub-list-badge">Preprint</span>
        <span class="pub-list-title">TwinRouterBench: Fast Static and Live Dynamic Evaluation for Realistic Agentic LLM Routing</span><br>
        <span class="pub-list-authors">Pei Yang*, Wanyi Chen*, Tongyun Yang, Pengbin Feng, Jiarong Xing, <strong>Wentao Guo</strong>, Yuhang Yao, Yuhang Han, Hanchen Li, Xu Wang, Zeyu Wang, Jie Xiao, Anjie Yang, Liang Tian, Lynn Ai, Eric Yang, Tianyu Shi<sup>†</sup>.</span>
        <span class="pub-list-links"><a href="https://arxiv.org/abs/2605.18859">[arXiv]</a><a href="https://commonstackai.github.io/TwinRouterBench/">[page]</a><a href="https://github.com/CommonstackAI/TwinRouterBench">[code]</a></span>
      </li>
      <li>
        <span class="pub-list-badge">Preprint</span>
        <span class="pub-list-badge">IROS Workshop CIM Best Demo Award</span>
        <span class="pub-list-title">SCAL for Pinch-Lifting: Complementary Rotational and Linear Prototypes for Environment-Adaptive Grasping</span><br>
        <span class="pub-list-authors"><strong>Wentao Guo</strong>, Wenzeng Zhang<sup>†</sup>.</span>
        <span class="pub-list-links"><a href="assets/papers/26_icra/icra2026.pdf">[PDF]</a><a href="https://arxiv.org/abs/2510.22738">[arXiv]</a><a href="assets/papers/26_icra/tl_hand_final.mp4">[video]</a><a href="assets/papers/26_icra/poster.jpg?view=poster">[poster]</a></span>
      </li>
      <li>
        <span class="pub-list-badge">ROBIO 2025 Oral</span>
        <span class="pub-list-title">Hoecken-D Hand: A Novel Robotic Hand for Linear Parallel Pinching and Self-Adaptive Grasping</span><br>
        <span class="pub-list-authors"><strong>Wentao Guo</strong>, Wenzeng Zhang<sup>†</sup>.</span>
        <span class="pub-list-links"><a href="assets/papers/25_robio/25_robio_hoeckend.pdf">[PDF]</a><a href="https://arxiv.org/abs/2510.13553">[arXiv]</a><a href="assets/papers/25_robio/poster.jpg?view=poster">[poster]</a></span>
      </li>
      <li>
        <span class="pub-list-badge">IROS 2025 Oral</span>
        <span class="pub-list-title">A Novel Robot Hand with Hoeckens Linkages and Soft Phalanges for Scooping and Self-Adaptive Grasping in Environmental Constraints</span><br>
        <span class="pub-list-authors"><strong>Wentao Guo</strong>, Yizhou Wang, Wenzeng Zhang<sup>†</sup>.</span>
        <span class="pub-list-links"><a href="assets/papers/25_iros/201866-3909.pdf">[PDF]</a><a href="https://arxiv.org/abs/2510.13535">[arXiv]</a><a href="https://www.youtube.com/watch?v=eQuu3pJjB0U">[video]</a><a href="assets/papers/25_iros/poster.jpg?view=poster">[poster]</a></span>
      </li>
    </ul>
  </div>
</section>

<section id="projects">
  <h2>Projects</h2>

  <div class="project-card">
    <div class="homepage-card-body">
      <div class="pub-media-rotator homepage-media" data-interval="4000">
        <img src="images/projects/26WBCD_mu0.png" alt="mu0 deformable object manipulation project">
      </div>
      <div>
        <strong>mu0 · Deformable Object Manipulation</strong>
        <span class="status-pill">2026</span><br>
        <div class="project-badges">
          <a href="https://wbcdcompetition.github.io/#Winners" target="_blank" rel="noreferrer">Best Innovation Solution · 2nd WBCD Winners @ ICRA 2026</a>
        </div>
        <p>
          Designed and standardized a task-specific action workflow, collected UMI data, supplemented targeted data with DAgger, and fine-tuned the model for robust deformable-object manipulation.
        </p>
      </div>
    </div>
  </div>

  <div class="project-card">
    <div class="homepage-card-body">
      <div class="pub-media-rotator homepage-media" data-interval="4000">
        <img src="images/projects/25AMSE.jpg" alt="Adaptive robotic grippers project">
      </div>
      <div>
        <strong>Adaptive Robotic Grippers for Multi-Mode Grasping with Pinching and Scooping under Environmental Constraints</strong>
        <span class="status-pill">2025</span><br>
        <div class="project-badges">
          <a href="https://sites.google.com/site/asmemrc/design-competition-showcase/2025-finalists#h.2oibi1g704mf" target="_blank" rel="noreferrer">ASME SMRDC 2025 1st Place</a>
          <a href="https://youtu.be/kNnKri4CBBw" target="_blank" rel="noreferrer">Video</a>
          <a href="assets/papers/25_iros/201866-3909.pdf" target="_blank" rel="noreferrer">Paper</a>
        </div>
        <p>
          Achieved vertical adaptability via linear linkages, enabling pinch-scoop switching under environmental constraints. Fabricated six 3D-printed prototypes for systematic validation.
        </p>
      </div>
    </div>
  </div>

  <div class="project-card">
    <div class="homepage-card-body">
      <div class="pub-media-rotator homepage-media" data-interval="4000">
        <img src="images/projects/MoYiXing.png" alt="MoYiXing modular robot car">
      </div>
      <div>
        <strong>MoYiXing Modular Robot Car (Lidar + 6-DOF Arm)</strong>
        <span class="status-pill">2024</span><br>
        <div class="project-badges">
          <span>National 1st Prize · RoboCup Innovation</span>
          <span>National 1st Prize · University Robot Creative Competition</span>
          <span>National 2nd Prize · Robot Combat</span>
          <span>National 2nd Prize · International Youth AI Competition</span>
        </div>
        <p>
          Modular design with navigation, grasping, perception, monitoring, cleaning, and dialogue. Supports modular camera setup with AI recognition. Implemented DQN habit-learning and semi-autonomous execution on Jetson Nano.
        </p>
      </div>
    </div>
  </div>

  <div class="project-card">
    <div class="homepage-card-body">
      <div class="pub-media-rotator homepage-media" data-interval="4000">
        <img src="images/projects/YiBao.png" alt="YiBao meeting agent">
      </div>
      <div>
        <strong>YiBao · Meeting Agent (On-device LLM + Local DB + RAG)</strong>
        <span class="status-pill">2024</span><br>
        <div class="project-badges">
          <a href="https://www.osredm.com/competition/cyyy/notice" target="_blank" rel="noreferrer">National 3rd Prize · Open-Source Innovation</a>
          <a href="https://www.osredm.com/p69087132/yibao" target="_blank" rel="noreferrer">OSRedM Repo</a>
          <a href="https://www.osredm.com/p69087132/yibao/tree/master/%E5%B1%95%E7%A4%BA%E8%A7%86%E9%A2%91.mp4" target="_blank" rel="noreferrer">Video</a>
        </div>
        <p>
          Meeting agent built on Jiuge on-device LLM: integrates local DB, custom summarization, and ASR, with three RAG optimizations (query planning, confidence gating, adversarial robustness) for better minutes and retrieval.
        </p>
      </div>
    </div>
  </div>

  <div class="project-card">
    <div class="homepage-card-body">
      <div class="pub-media-rotator homepage-media" data-interval="4000">
        <img src="images/projects/weather.png" alt="Digital twin and AI for grid resilience">
      </div>
      <div>
        <strong>Yi-Dian-Yi-Di: Problem-Driven Digital Twin + Strong AI for Grid Resilience</strong>
        <span class="status-pill">2024</span><br>
        <div class="project-badges">
          <span>Special Prize · Challenge Cup Problem-Driven Special Track</span>
          <a href="https://mp.weixin.qq.com/s/7oM3LOVDVTd2uuUYfdLXgg" target="_blank" rel="noreferrer">BIT Official WeChat Report</a>
        </div>
        <p>
          For distribution grids under extreme weather, we integrate strong AI with digital twins: time-series models and local knowledge base for early warnings, vulnerability assessment, and damage location prediction; an industry LLM connects multimodal monitoring with operations research for proactive monitor-alert-dispatch-recovery; a digital-twin platform provides panoramic visualization and strategy simulation.
        </p>
      </div>
    </div>
  </div>

  <div class="project-card">
    <div class="homepage-card-body">
      <div class="pub-media-rotator homepage-media" data-interval="4000">
        <img src="images/projects/sleep.png" alt="Sleep bias mitigation pipeline">
      </div>
      <div>
        <strong>Bias Mitigation Pipeline for Sleep-Focused LLM Tasks</strong>
        <span class="status-pill">2024</span><br>
        <div class="project-badges">
          <span>Disruptive Innovation Award</span>
          <a href="https://mp.weixin.qq.com/s/fILJC71T2K0f8nhAyzxn6A" target="_blank" rel="noreferrer">X-Challenge Track 7</a>
        </div>
        <p>
          Sleep-focused pipeline: from staging and scoring to LLM analysis and fine-tuning. Applied fine-tuning and constraints to reduce bias, with clustering-based updates planned for continuous improvement.
        </p>
      </div>
    </div>
  </div>


</section>

<section id="awards">
  <h2>Awards & Honors</h2>
  <div class="pub-button-container award-filter">
    <button class="pub-button active" onclick="filterAwards(event, 'full')">Full</button>
    <button class="pub-button" onclick="filterAwards(event, '2026')">2026</button>
    <button class="pub-button" onclick="filterAwards(event, '2025')">2025</button>
    <button class="pub-button" onclick="filterAwards(event, '2024')">2024</button>
  </div>

  <div class="award-year-view" data-award-year="2026">
    <h3 id="awards-2026" class="award-year-heading">2026</h3>
    <ul class="award-list">
      <li><strong>Best Innovation Solution</strong>, <a href="https://wbcdcompetition.github.io/#Winners" target="_blank" rel="noreferrer">2nd WBCD Winners @ ICRA 2026</a> <span class="award-level">International</span></li>
      <li><strong>Bronze Award</strong>, Deep Hackathon 2025 <span class="award-level">National</span></li>
    </ul>
  </div>

  <div class="award-year-view" data-award-year="2025">
    <h3 id="awards-2025" class="award-year-heading">2025</h3>
    <ul class="award-list">
      <li><strong>Best Demo Award</strong>, <a href="https://cim-workshop.github.io/" target="_blank" rel="noreferrer">IROS Workshop CIM</a> <span class="award-level">International</span></li>
      <li><strong>1st Place</strong>, <a href="https://sites.google.com/site/asmemrc/design-competition-showcase/2025-finalists#h.2oibi1g704mf" target="_blank" rel="noreferrer">ASME Student Mechanism & Robotics Design Competition</a> <span class="award-level">International</span></li>
      <li><strong>Meritorious Winner</strong>, Mathematical Contest in Modeling (MCM/ICM) <span class="award-level">International</span></li>
    </ul>
  </div>

  <div class="award-year-view" data-award-year="2024">
    <h3 id="awards-2024" class="award-year-heading">2024</h3>
    <ul class="award-list">
      <li><strong>1st Prize</strong>, <a href="https://rcccaa.drct-caa.org.cn/" target="_blank" rel="noreferrer">RoboCup Innovation ('Robot+' Finals)</a> <span class="award-level">National</span></li>
      <li><strong>1st Prize</strong>, <a href="https://robotcontest2024.moocollege.com/" target="_blank" rel="noreferrer">China University Intelligent Robot Creative Competition (7th)</a> <span class="award-level">National</span></li>
      <li><strong>2nd Prize</strong>, <a href="http://robo-maker.org/" target="_blank" rel="noreferrer">China Intelligent Robot Combat & Competition (Vision-based Antagonism)</a> <span class="award-level">National</span></li>
      <li><strong>2nd Prize</strong>, <a href="https://iyaic.com/" target="_blank" rel="noreferrer">International Youth AI Competition (6th)</a> <span class="award-level">National</span></li>
      <li><strong>Special Prize</strong>, <a href="https://mp.weixin.qq.com/s/7oM3LOVDVTd2uuUYfdLXgg" target="_blank" rel="noreferrer">Challenge Cup - Problem-Driven Special Track (Jiebang Gua Shuai)</a> <span class="award-level">National</span></li>
      <li><strong>3rd Prize</strong>, <a href="https://www.osredm.com/competition/cyyy/notice" target="_blank" rel="noreferrer">Open-Source Innovation Competition</a> <span class="award-level">National</span></li>
      <li><strong>Disruptive Innovation Award</strong>, X-Camp · X-Challenge Track 7 <span class="award-level">National</span></li>
    </ul>
  </div>
</section>

<script>
function filterPublications(event, type) {
  const normalizedType = type === 'list' ? 'list' : 'core';
  const buttons = document.querySelectorAll('#publications .pub-button');
  const coreView = document.querySelector('[data-publication-view="core"]');
  const listView = document.querySelector('[data-publication-view="list"]');

  buttons.forEach((button) => button.classList.remove('active'));
  if (event && event.currentTarget) {
    event.currentTarget.classList.add('active');
  } else if (buttons.length) {
    const activeIndex = normalizedType === 'list' ? 1 : 0;
    if (buttons[activeIndex]) buttons[activeIndex].classList.add('active');
  }

  if (coreView) coreView.hidden = normalizedType === 'list';
  if (listView) listView.hidden = normalizedType !== 'list';
}

function filterAwards(event, year) {
  const normalizedYear = year || 'full';
  const buttons = document.querySelectorAll('.award-filter .pub-button');
  const views = document.querySelectorAll('[data-award-year]');

  buttons.forEach((button) => button.classList.remove('active'));
  if (event && event.currentTarget) {
    event.currentTarget.classList.add('active');
  } else {
    buttons.forEach((button) => {
      if (button.textContent.trim().toLowerCase() === normalizedYear) button.classList.add('active');
    });
  }

  views.forEach((view) => {
    const viewYear = view.getAttribute('data-award-year');
    view.hidden = normalizedYear !== 'all' && normalizedYear !== 'full' && viewYear !== normalizedYear;
    if (normalizedYear === 'full') view.hidden = false;
  });
}

document.addEventListener('DOMContentLoaded', () => {
  filterPublications(null, 'core');
  filterAwards(null, 'full');
});
</script>
<script src="assets/js/pub_media_rotator.js"></script>
