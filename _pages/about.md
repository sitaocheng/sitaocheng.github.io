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

1. **Language agents.** What makes reasoning transfer to open, real-world environments rather than to curated benchmarks?
2. **Automatic reward modeling.** Can reward functions be *discovered* rather than hand-designed, through differentiable evolutionary meta-rewards?
3. **RL and compositional generalization.** Which training strategies produce models that compose skills they were never explicitly taught, and what does that reveal about how RL works? I study this concretely by building robust GUI agents.
{: .research-list}

I am always glad to talk about research, so please feel free to [reach out](mailto:sitao.cheng@uwaterloo.ca). You can also read my [CV](https://sitaocheng.github.io/files/sitao_cheng_cv_2026_04.pdf).


## Recent News

<div class="news-panel">
<div class="news-feed" markdown="1" tabindex="0" role="region" aria-label="Recent news">

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

- From Atomic to Composite: Reinforcement Learning Enables Generalization in Complementary Reasoning\
<span class="authors">**Sitao Cheng**, Xunjian Yin, Ruiwen Zhou, Yuxuan Li, Xinyi Wang, Liangming Pan, William Yang Wang, Victor Zhong</span>\
[paper](https://arxiv.org/pdf/2512.01970) [code](https://github.com/sitaocheng/from_atomic_to_composite) [data](https://huggingface.co/datasets/sitao/From_atomic_to_composite)

- Differentiable Evolutionary Reinforcement Learning\
<span class="authors">**Sitao Cheng\***, Tianle Li\*, Xuhan Huang\*, Xunjian Yin, Difan Zou</span>\
[paper](https://arxiv.org/abs/2512.13399) [code](https://github.com/sitaocheng/DERL) [model](https://huggingface.co/DifferentiableEvolutionaryRL)

- Epistemic Context Learning: Building Trust the Right Way in LLM-Based Multi-Agent Systems\
<span class="authors">Ruiwen Zhou\*, Maojia Song\*, Xiaobao Wu, **Sitao Cheng**, Xunjian Yin, Yuxi Xie, Zoey Hao, Wenyue Hua, Liangming Pan, Soujanya Poria, Min-Yen Kan</span>\
[paper](https://arxiv.org/pdf/2601.21742) [code](https://github.com/skyriver-2000/epistemic-context-learning)
{: .pub-list}


## Selected Publications

- **[KnowFM @ ACL'25 Oral]** Understanding the Interplay between Parametric and Contextual Knowledge for Large Language Models\
<span class="authors">**Sitao Cheng**, Liangming Pan, Xunjian Yin, Xinyi Wang, William Yang Wang</span>\
[paper](https://arxiv.org/abs/2410.08414) [code](https://github.com/sitaocheng/Knowledge_Interplay)

- **[ACL'24 Findings]** Call Me When Necessary: LLMs can Efficiently and Faithfully Reason over Structured Environments\
<span class="authors">**Sitao Cheng**, Ziyuan Zhuang, Yong Xu, Fangkai Yang, Chaoyun Zhang, Xiaoting Qin, Xiang Huang, Ling Chen, Qingwei Lin, Dongmei Zhang, Saravan Rajmohan, Qi Zhang</span>\
[paper](https://arxiv.org/abs/2403.08593) [code](https://github.com/microsoft/Readi)

- **[ACL'26 Oral]** LEDOM: Reverse Language Model\
<span class="authors">Xunjian Yin, **Sitao Cheng**, Yuxi Xie, Xinyu Hu, Li Lin, Xinyi Wang, Liangming Pan, William Yang Wang, Xiaojun Wan</span>\
[paper](https://arxiv.org/abs/2507.01335) [model](https://huggingface.co/Corning/Reverse-Model-7B-348B)

- **[ACL'24 Oral]** QueryAgent: A Reliable and Efficient Reasoning Framework with Environmental Feedback based Self-Correction\
<span class="authors">Xiang Huang\*, **Sitao Cheng\***, Shanshan Huang, Jiayu Shen, Yong Xu, Chaoyun Zhang, Yuzhong Qu</span>\
[paper](https://arxiv.org/abs/2403.11886) [code](https://github.com/cdhx/QueryAgent)

- **[ACL'25]** Disentangling Memory and Reasoning Ability in Large Language Models\
<span class="authors">Mingyu Jin, Weidi Luo, **Sitao Cheng**, Xinyi Wang, Wenyue Hua, Ruixiang Tang, William Yang Wang, Yongfeng Zhang</span>\
[paper](https://arxiv.org/abs/2411.13504) [code](https://github.com/MingyuJ666/Disentangling-Memory-and-Reasoning)

- **[EMNLP'24]** EfficientRAG: Efficient Retriever for Multi-Hop Question Answering\
<span class="authors">Ziyuan Zhuang, Zhiyang Zhang, **Sitao Cheng**, Fangkai Yang, Jia Liu, Shujian Huang, Qingwei Lin, Saravan Rajmohan, Dongmei Zhang, Qi Zhang</span>\
[paper](https://www.arxiv.org/abs/2408.04259) [code](https://github.com/NIL-zhuang/EfficientRAG-official)

- **[ACL'25]** RuleArena: A Benchmark for Rule-Guided Reasoning with LLMs in Real-World Scenarios\
<span class="authors">Ruiwen Zhou, Wenyue Hua, Liangming Pan, **Sitao Cheng**, Xiaobao Wu, En Yu, William Yang Wang</span>\
[paper](https://arxiv.org/abs/2412.08972) [code](https://github.com/skyriver-2000/RuleArena)
{: .pub-list}


## Teaching

- **CS240** Data Structures and Data Management, Teaching Assistant, Winter & Spring 2026, UWaterloo
- **CS115** Introduction to Computer Science 1, Teaching Assistant, Spring 2025, UWaterloo
{: .plain-list}


## Services

- Reviewer: ARR, ICLR, ICML, NeurIPS
- Volunteer: ACL 2024
{: .plain-list}
