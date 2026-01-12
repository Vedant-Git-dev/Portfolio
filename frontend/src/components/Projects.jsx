import { useEffect, useRef, useState } from 'react';
import ProjectCard from './ProjectCard';

export default function Projects() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);
  const projects = [
    {
      title: "PhiCraft",
      role: "Autonomous Agent Architecture",
      github: "https://github.com/Vedant-Git-dev/PhiCraft",
      problem: "Standard LLM agents struggle with deep recursive planning. When a task requires understanding dependency chains 4 to 8 levels deep, like 'craft item X' which needs Y, which requires mining Z with tool W, most systems either fail or require hardcoded workflows.",
      approach: "Built a ReAct inspired planning engine that recursively decomposes tasks into executable primitives. The system maintains a hierarchical task graph, tracks environmental state (inventory, world state), and dynamically replans when execution fails. Implemented 12 autonomous pipelines covering mining, crafting, farming, and navigation.",
      challenge: "The hardest part wasn't the planning algorithm, it was handling the uncertainty of a dynamic environment. Minecraft is non-deterministic: mobs attack, resources aren't where you expect, tools break. I had to design an error recovery system that could detect failures at any planning depth and replan from that point without losing context.",
      result: "90%+ success rate on complex multi-step tasks. The agent can autonomously execute routines like 'build a furnace' which requires: craft pickaxe → mine cobblestone → mine iron → smelt iron → craft furnace.",
      tech: ["Python", "Node.js", "Mineflayer", "ReAct Planning", "State Machines"]
    },
    {
      title: "RAG Configuration Optimizer",
      role: "ML System Design & Learning to Rank",
      github: "https://github.com/Vedant-Git-dev/RAG-Optimizer",
      problem: "Production RAG systems use static configurations, same chunk size, retrieval method, and reranking for every query. This one size fits all approach fails because different questions need different strategies. A factual lookup needs precision; conceptual questions need broader context.",
      approach: "Framed configuration selection as a learning to rank problem with a two stage pipeline. Stage 1: LightGBM proposer does high recall candidate selection from the configuration space. Stage 2: LambdaRank ranker uses listwise optimization to rank configurations per query, trained with reward based relevance signals.",
      challenge: "Training a ranker requires labeled data on which configurations work best for which queries. I solved this by using retrieval quality metrics as implicit feedback, treating it as a multi armed bandit where each configuration is an arm. The group aware training in LambdaRank handles the per query ranking structure.",
      result: "Near zero median regret across diverse query distributions. The system consistently selects optimal or near optimal configurations without manual tuning per domain.",
      tech: ["Python", "LightGBM", "LambdaRank", "scikit-learn", "RAG Pipelines"]
    }
  ];

  return (
    <section 
      id="work" 
      ref={sectionRef}
      className={`py-24 px-6 bg-gray-950/50 transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-12 text-cyan-400 flex items-center gap-3">
          <span className="text-gray-500 font-mono text-xl">02.</span>
          Selected Work
        </h2>
        <div className="grid lg:grid-cols-2 gap-8">
          {projects.map((project, i) => (
            <ProjectCard key={i} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}