---
permalink: /
title: ""
author_profile: true
redirect_from: 
  - /about/
  - /about.html
---

Hi, I am Sitao Cheng, a Ph.D. student at the University of Waterloo, fortunate to be advised by Prof. [Victor Zhong](https://www.victorzhong.com/). I am currently a Student Researcher at [Samaya AI](https://samaya.ai/), working with [Yuhao Zhang](https://yuhao.im/). <!-- I closely work with Prof. [Liangming Pan](https://liangmingpan.bio/).  --> Before that, I was a research scholar in the UCSB NLP Group with Prof. [William Wang](https://sites.cs.ucsb.edu/~william/index.html), and a research intern at [Microsoft Research Asia](https://www.microsoft.com/en-us/research/group/data-knowledge-intelligence/). I received my Master's degree from Nanjing University.
{: .intro}

My research asks how reasoning in large language models can generalize *efficiently*: how a model can autonomously compose the skills it already has (parametric) with newly acquired ones (contextual), and recursively improve itself. I work across language agents, reinforcement learning, retrieval-augmented generation (RAG), and neural-symbolic reasoning. Three questions drive my current work:
{: .intro}

1. **Efficient generalization of language agents.** How can an agent build a reusable hierarchy of skills from its own experience, and how can training teach it to capture how those skills compose?
2. **RL and compositional generalization.** Which training strategies produce models that compose skills they were never explicitly taught, and what does that reveal about how RL works?
3. **Automatic reward modeling.** Can reward functions be *discovered* rather than hand-designed, by a reward proposer that learns from its own trials?
{: .research-list}

I am always glad to talk about research, so please feel free to [reach out](mailto:sitao.cheng@uwaterloo.ca). You can also read my [CV](https://sitaocheng.github.io/files/sitao_cheng_cv_2026_10.pdf).


## Recent News

<div class="news-panel">
<div class="news-feed" markdown="1" tabindex="0" role="region" aria-label="Recent news">

- **2026-10** Attended COLM 2026 in San Francisco.
- **2026-08** Joined Samaya AI as a Student Researcher.
- **2026-04** Attended ICLR 2026 in Rio de Janeiro.
- **2026-04** One paper accepted to ACL 2026.
- **2025-12** Gave talks on compositional generalization at Peking University and Nanjing University.
- **2025-11** Received the TD Layer 6 Graduate Scholarship in Data & AI for Fall 2025.
- **2025-09** Began my Ph.D. at the University of Waterloo.
- **2025-06** Two papers accepted to EMNLP 2025.
- **2025-03** Three papers accepted to ACL 2025.
- **2024-11** Attended SoCal NLP 2024 in San Diego.
- **2024-11** Attended EMNLP 2024 in Miami.
- **2024-09** One paper accepted to EMNLP 2024.
- **2024-08** Attended and volunteered at ACL 2024 in Bangkok.
- **2024-07** Joined the UC Santa Barbara NLP Group.
- **2024-05** Two papers accepted to ACL 2024.
- **2023-12** Attended EMNLP 2023 in Singapore.
- **2023-10** One paper accepted to EMNLP 2023.
- **2022-11** One paper accepted to AAAI 2023.

</div>
</div>


## Preprints

<div class="pub-cards">
<div class="pub-card">
  <a class="pub-thumb" href="https://sitaocheng.github.io/xtree/" aria-hidden="true" tabindex="-1"><img src="/images/pubs/xtree.png" alt="" loading="lazy"></a>
  <div class="pub-body">
    <a class="pub-title" href="https://sitaocheng.github.io/xtree/">X-Tree: Tokenizing Reusable Experience for Efficient Agent Generalization</a>
    <div class="pub-authors"><strong>Sitao Cheng</strong>, Xunjian Yin, Zhiyuan Sun, Yuxuan Li, Ruiwen Zhou, Xiangru Jian, Victor Zhong</div>
    <div class="pub-venue">Preprint, 2026</div>
    <div class="pub-links"><a href="https://arxiv.org/abs/2609.32993">Paper</a> <a href="https://sitaocheng.github.io/xtree/">Project page</a> <a href="https://sitaocheng.github.io/xtree/blog.html">Blog</a> <a href="https://github.com/sitaocheng/X-Tree">Code</a></div>
  </div>
</div>
<div class="pub-card">
  <a class="pub-thumb" href="https://sitaocheng.github.io/atomic/" aria-hidden="true" tabindex="-1"><img src="/images/pubs/atomic.png" alt="" loading="lazy"></a>
  <div class="pub-body">
    <a class="pub-title" href="https://sitaocheng.github.io/atomic/">From Atomic to Composite: Reinforcement Learning Enables Generalization in Complementary Reasoning</a>
    <div class="pub-authors"><strong>Sitao Cheng</strong>, Xunjian Yin, Ruiwen Zhou, Yuxuan Li, Xinyi Wang, Liangming Pan, William Yang Wang, Victor Zhong</div>
    <div class="pub-venue">Preprint, 2025</div>
    <div class="pub-links"><a href="https://arxiv.org/pdf/2512.01970">Paper</a> <a href="https://sitaocheng.github.io/atomic/">Project page</a> <a href="https://github.com/sitaocheng/from_atomic_to_composite">Code</a> <a href="https://huggingface.co/datasets/sitao/From_atomic_to_composite">Data</a></div>
  </div>
</div>
<div class="pub-card">
  <a class="pub-thumb" href="https://sitaocheng.github.io/derl/" aria-hidden="true" tabindex="-1"><img src="/images/pubs/derl.png" alt="" loading="lazy"></a>
  <div class="pub-body">
    <a class="pub-title" href="https://sitaocheng.github.io/derl/">Dual-Evolving Reinforcement Learning for Automated Reward Design</a>
    <div class="pub-authors"><strong>Sitao Cheng*</strong>, Tianle Li*, Xuhan Huang*, Xunjian Yin, Difan Zou</div>
    <div class="pub-note">* Equal contribution</div><div class="pub-venue">Preprint, 2026</div>
    <div class="pub-links"><a href="https://arxiv.org/abs/2512.13399">Paper</a> <a href="https://sitaocheng.github.io/derl/">Project page</a> <a href="https://github.com/sitaocheng/DERL">Code</a> <a href="https://huggingface.co/DifferentiableEvolutionaryRL">Models</a></div>
  </div>
</div>
<div class="pub-card">
  <a class="pub-thumb" href="https://arxiv.org/pdf/2601.21742" aria-hidden="true" tabindex="-1"><img src="/images/pubs/ecl.png" alt="" loading="lazy"></a>
  <div class="pub-body">
    <a class="pub-title" href="https://arxiv.org/pdf/2601.21742">Epistemic Context Learning: Building Trust the Right Way in LLM-Based Multi-Agent Systems</a>
    <div class="pub-authors">Ruiwen Zhou*, Maojia Song*, Xiaobao Wu, <strong>Sitao Cheng</strong>, Xunjian Yin, Yuxi Xie, Zoey Hao, Wenyue Hua, Liangming Pan, Soujanya Poria, Min-Yen Kan</div>
    <div class="pub-note">* Equal contribution</div><div class="pub-venue">Preprint, 2026</div>
    <div class="pub-links"><a href="https://arxiv.org/pdf/2601.21742">Paper</a> <a href="https://github.com/skyriver-2000/epistemic-context-learning">Code</a></div>
  </div>
</div>
</div>


## Selected Publications

<div class="pub-cards">
<div class="pub-card">
  <a class="pub-thumb" href="https://arxiv.org/abs/2410.08414" aria-hidden="true" tabindex="-1"><img src="/images/pubs/interplay.png" alt="" loading="lazy"></a>
  <div class="pub-body">
    <a class="pub-title" href="https://arxiv.org/abs/2410.08414">Understanding the Interplay between Parametric and Contextual Knowledge for Large Language Models</a>
    <div class="pub-authors"><strong>Sitao Cheng</strong>, Liangming Pan, Xunjian Yin, Xinyi Wang, William Yang Wang</div>
    <div class="pub-venue">KnowFM Workshop @ ACL 2025 <span class="pub-badge">Oral</span></div>
    <div class="pub-links"><a href="https://arxiv.org/abs/2410.08414">Paper</a> <a href="https://github.com/sitaocheng/Knowledge_Interplay">Code</a></div>
  </div>
</div>
<div class="pub-card">
  <a class="pub-thumb" href="https://arxiv.org/abs/2403.08593" aria-hidden="true" tabindex="-1"><img src="/images/pubs/readi.png" alt="" loading="lazy"></a>
  <div class="pub-body">
    <a class="pub-title" href="https://arxiv.org/abs/2403.08593">Call Me When Necessary: LLMs can Efficiently and Faithfully Reason over Structured Environments</a>
    <div class="pub-authors"><strong>Sitao Cheng</strong>, Ziyuan Zhuang, Yong Xu, Fangkai Yang, Chaoyun Zhang, Xiaoting Qin, Xiang Huang, Ling Chen, Qingwei Lin, Dongmei Zhang, Saravan Rajmohan, Qi Zhang</div>
    <div class="pub-venue">Findings of ACL 2024</div>
    <div class="pub-links"><a href="https://arxiv.org/abs/2403.08593">Paper</a> <a href="https://github.com/microsoft/Readi">Code</a></div>
  </div>
</div>
<div class="pub-card">
  <a class="pub-thumb" href="https://arxiv.org/abs/2507.01335" aria-hidden="true" tabindex="-1"><img src="/images/pubs/ledom.png" alt="" loading="lazy"></a>
  <div class="pub-body">
    <a class="pub-title" href="https://arxiv.org/abs/2507.01335">LEDOM: Reverse Language Model</a>
    <div class="pub-authors">Xunjian Yin, <strong>Sitao Cheng</strong>, Yuxi Xie, Xinyu Hu, Li Lin, Xinyi Wang, Liangming Pan, William Yang Wang, Xiaojun Wan</div>
    <div class="pub-venue">ACL 2026 <span class="pub-badge">Oral</span></div>
    <div class="pub-links"><a href="https://arxiv.org/abs/2507.01335">Paper</a> <a href="https://huggingface.co/Corning/Reverse-Model-7B-348B">Model</a></div>
  </div>
</div>
<div class="pub-card">
  <a class="pub-thumb" href="https://arxiv.org/abs/2403.11886" aria-hidden="true" tabindex="-1"><img src="/images/pubs/queryagent.png" alt="" loading="lazy"></a>
  <div class="pub-body">
    <a class="pub-title" href="https://arxiv.org/abs/2403.11886">QueryAgent: A Reliable and Efficient Reasoning Framework with Environmental Feedback based Self-Correction</a>
    <div class="pub-authors">Xiang Huang*, <strong>Sitao Cheng*</strong>, Shanshan Huang, Jiayu Shen, Yong Xu, Chaoyun Zhang, Yuzhong Qu</div>
    <div class="pub-note">* Equal contribution</div><div class="pub-venue">ACL 2024 <span class="pub-badge">Oral</span></div>
    <div class="pub-links"><a href="https://arxiv.org/abs/2403.11886">Paper</a> <a href="https://github.com/cdhx/QueryAgent">Code</a></div>
  </div>
</div>
<div class="pub-card">
  <a class="pub-thumb" href="https://arxiv.org/abs/2411.13504" aria-hidden="true" tabindex="-1"><img src="/images/pubs/disentangle.png" alt="" loading="lazy"></a>
  <div class="pub-body">
    <a class="pub-title" href="https://arxiv.org/abs/2411.13504">Disentangling Memory and Reasoning Ability in Large Language Models</a>
    <div class="pub-authors">Mingyu Jin, Weidi Luo, <strong>Sitao Cheng</strong>, Xinyi Wang, Wenyue Hua, Ruixiang Tang, William Yang Wang, Yongfeng Zhang</div>
    <div class="pub-venue">ACL 2025</div>
    <div class="pub-links"><a href="https://arxiv.org/abs/2411.13504">Paper</a> <a href="https://github.com/MingyuJ666/Disentangling-Memory-and-Reasoning">Code</a></div>
  </div>
</div>
<div class="pub-card">
  <a class="pub-thumb" href="https://www.arxiv.org/abs/2408.04259" aria-hidden="true" tabindex="-1"><img src="/images/pubs/efficientrag.png" alt="" loading="lazy"></a>
  <div class="pub-body">
    <a class="pub-title" href="https://www.arxiv.org/abs/2408.04259">EfficientRAG: Efficient Retriever for Multi-Hop Question Answering</a>
    <div class="pub-authors">Ziyuan Zhuang, Zhiyang Zhang, <strong>Sitao Cheng</strong>, Fangkai Yang, Jia Liu, Shujian Huang, Qingwei Lin, Saravan Rajmohan, Dongmei Zhang, Qi Zhang</div>
    <div class="pub-venue">EMNLP 2024</div>
    <div class="pub-links"><a href="https://www.arxiv.org/abs/2408.04259">Paper</a> <a href="https://github.com/NIL-zhuang/EfficientRAG-official">Code</a></div>
  </div>
</div>
<div class="pub-card">
  <a class="pub-thumb" href="https://arxiv.org/abs/2412.08972" aria-hidden="true" tabindex="-1"><img src="/images/pubs/rulearena.png" alt="" loading="lazy"></a>
  <div class="pub-body">
    <a class="pub-title" href="https://arxiv.org/abs/2412.08972">RuleArena: A Benchmark for Rule-Guided Reasoning with LLMs in Real-World Scenarios</a>
    <div class="pub-authors">Ruiwen Zhou, Wenyue Hua, Liangming Pan, <strong>Sitao Cheng</strong>, Xiaobao Wu, En Yu, William Yang Wang</div>
    <div class="pub-venue">ACL 2025</div>
    <div class="pub-links"><a href="https://arxiv.org/abs/2412.08972">Paper</a> <a href="https://github.com/skyriver-2000/RuleArena">Code</a></div>
  </div>
</div>
</div>


## Teaching

- **CS240** Data Structures and Data Management, Teaching Assistant, Winter & Spring 2026, UWaterloo
- **CS115** Introduction to Computer Science 1, Teaching Assistant, Spring 2025, UWaterloo
{: .plain-list}


## Services

- Reviewer: ARR, ICLR, ICML, NeurIPS
- Volunteer: ACL 2024
{: .plain-list}
