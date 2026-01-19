# [From Atomic to Composite: Reinforcement Learning Enables Generalization in Complementary Reasoning](https://arxiv.org/pdf/2512.01970)
Sitao Cheng, Xunjian Yin, Ruiwen Zhou, Yuxuan Li, Xinyi Wang, Liangming Pan, William Yang Wang, Victor Zhong

## Research Questions

While Reinforcement Learning (RL) significantly improves the performance of Large Language Models (LLMs), researchers are debating on <u>**whether RL is genuinely a skill synthesizer or merely a probability amplifier**</u>. Current post-training paradigms (especially after DeepSeek-R1) rely on Supervised Fine-Tuning (SFT) followed by RL. However, SFT fundamentally favors the memorization of training distributions. A critical quesiton still holds-**<u>is there any prerequisite for RL to generalize?</u>**


## Problem Definition

We study **Complementary Reasoning**, requiring both parametric and contextual skills. Specifically, we adopt knowledge-intensive reasoning, a practical question answering task requiring grounded knowledge and multi-hop compositional skills, as a testbed. We isolated two "atomic" skills and a composite skill:

* **Parametric Reasoning (Mem):** Relying on internal knowledge encoded in model parameters.
* **Contextual Reasoning (Ctx):** Relying on novel facts provided in the input context.
* **Complementary Reasoning (Comp):** Relying on novel facts provided in the input context.

## Methodology: Synthetic Human Biographies
To study this rigorously with strictly controlled settings without the risk of data contamination from web-scale corpora, we develop a synthetic environment
* **Controlled Dataset:** We generate 10k synthetic human biographies based on a relational knowledge graph. Based on this, we sample relation combinations and question-answer pairs with templates. We construct training and testing data for Parametric (Mem), Contextual (Ctx) and Complementary (Comp) Reasoning, respectively.
* **Generalization Levels:** We test generalization across three levels of difficulty: **I.I.D.** (seen relation paths), **Composition** (unseen relation paths of seen relations), and **Zero-shot** (unseen relations).
An example question is shown below:
```
  "question": "Can you tell me the phone number of the boss of Justin Martinez's roommate?",
  "answer": "6548113713",
  "answer_cot": "Justin Martinez shared a room with Carl Jarvis. Frederick Juarez is the boss of Carl Jarvis. Frederick Juarez's phone number is 6548113713. So, the answer is: 6548113713",
  "instruction": "Answer the following question.",
  "gen_type": "composition"
```

## Key Findings: RL as a Reasoning Synthesizer


Our study reveals that RL is not just a probability amplifier; it is a **skill synthesizer**—but it requires a specific foundation.

### **The Atomic Prerequisite** 
RL can only synthesize new complex skills (Comp) if the base model has firstly master sufficient independent atomic skills (Mem and Ctx).
### **Necessity of Sufficient Atomic Skills** 
A model trained first on sufficient atomic skills ($SFT_{MEM+CTX}$) and then RL ($RL_{COMP}$) significantly outperforms models trained directly on the composite task (Comp), especially in the most challenging Zero-shot settings. Without any atomic skill, RL can not generalize well.

### **Necessity of RL** 
The follow-up RL ($RL_{COMP}$) significantly outperforms models trained with other strategies (e.g., SFT or LoRA) in the most challenging Zero-shot settings. We also find that SFT favors the I.I.D. performance. 
### **Data Efficiency** 

* Before RL, the capture of atomic skills requires less training data. 
* Once atomic skills are established, the model requires very few "composite" samples to "trigger" the assembly of these skills.

### **Internal Disentanglement** 

PCA analysis of hidden states shows that $SFT_{MEM+CTX}$ provides a base for RL to effectively separate the representations for memory recall vs. contextual processing.

### The SFT Generalization Paradox

Models trained directly on complex, composite tasks achieve near-perfect in-distribution accuracy (~90%) but collapse to as low as 18% on out-of-distribution (Zero-shot) settings. This indicates that SFT leads models to rely on "rote memorization" of path shortcuts rather than learning the underlying reasoning algorithm.


## Conclusion: A Scalable Path to Reasoning
These findings suggest a shift in how we train reasoning LLMs. Rather than collecting expensive, complex reasoning traces for extensive RL, it is worthwhile to focus on:
1.  Teaching the model sufficient **fundamental atomic skills** before RL.
2.  Leveraging **RL** to unlock the generalization required to compose those skills into complex logic.

---
*For more details, check out our full paper: ["From Atomic to Composite: Reinforcement Learning Enables Generalization in Complementary Reasoning](https://arxiv.org/pdf/2512.01970)*