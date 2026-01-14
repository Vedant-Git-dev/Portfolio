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
      problem: "Standard LLM agents struggle with deep recursive planning. When tasks require understanding dependency chains 4 to 8 levels deep, most systems either fail or need hardcoded workflows.",
      approach: "Built a ReAct inspired planning engine that recursively decomposes tasks. The system maintains a hierarchical task graph, tracks environmental state, and dynamically replans when execution fails.",
      challenge: "The hardest part was handling uncertainty in a dynamic environment. Minecraft is non-deterministic: mobs attack, resources aren't where expected, tools break. I designed an error recovery system that detects failures at any depth and replans without losing context.",
      result: "90%+ success rate on complex multi-step tasks. The agent autonomously executes routines like 'build a furnace' which requires: craft pickaxe → mine cobblestone → mine iron → smelt iron → craft furnace.",
      tech: ["Python", "Node.js", "Mineflayer", "ReAct Planning", "State Machines"]
    },
    {
      title: "RAG Configuration Optimizer",
      role: "ML System Design & Learning to Rank",
      github: "https://github.com/Vedant-Git-dev/RAG-Optimizer",
      problem: "Production RAG systems use static configurations for every query. This one size fits all approach fails because different questions need different strategies. Factual lookups need precision; conceptual questions need broader context.",
      approach: "Framed configuration selection as a learning to rank problem. Stage 1: LightGBM proposer does high recall candidate selection. Stage 2: LambdaRank ranker uses listwise optimization per query, trained with reward based relevance signals.",
      challenge: "Training a ranker requires labeled data on which configurations work best. I solved this using retrieval quality metrics as implicit feedback, treating it as a multi armed bandit where each configuration is an arm.",
      result: "Near zero median regret across diverse query distributions. The system consistently selects optimal configurations without manual tuning per domain.",
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