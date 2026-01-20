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
      image : "https://plus.unsplash.com/premium_photo-1683120963435-6f9355d4a776?q=80&w=663&auto=format&fit=crop",
      github: "https://github.com/Vedant-Git-dev/PhiCraft",
      shortDescription: "An LLM-powered autonomous Minecraft agent capable of multi-step planning and execution with dynamic error recovery.",
      fullDescription: "Built a ReAct inspired planning engine that recursively decomposes complex tasks into executable primitives. The system maintains a hierarchical task graph, tracks environmental state (inventory, world state), and dynamically replans when execution fails. Implemented 12 autonomous pipelines covering mining, crafting, farming, and navigation. The hardest challenge was handling uncertainty in a non-deterministic environment where mobs attack, resources shift, and tools break unexpectedly.",
      metrics: [
        "90%+ success rate on complex multi-step tasks",
        "4-8 levels of recursive planning depth",
        "12 autonomous execution pipelines",
        "Real-time error detection and replanning"
      ],
      status: "COMPLETED",
      tech: ["Python", "Node.js", "Mineflayer", "ReAct Planning", "State Machines"]
    },
    {
      title: "RAG Configuration Optimizer",
      role: "ML System Design & Learning to Rank",
      image : "https://images.unsplash.com/photo-1597733336794-12d05021d510?q=80&w=1374&auto=format&fit=crop",
      category: "ML Systems",
      github: "https://github.com/Vedant-Git-dev/RAG-Optimizer",
      shortDescription: "A two-stage ML system that automatically selects optimal RAG configurations per question using learning-to-rank.",
      fullDescription: "Production RAG systems fail with static configurations because different questions need different retrieval strategies. I framed configuration selection as a learning-to-rank problem with a two-stage pipeline. Stage 1: LightGBM proposer does high-recall candidate selection from the configuration space. Stage 2: LambdaRank ranker uses listwise optimization to rank configurations per query, trained with reward-based relevance signals. The challenge was training a ranker without labeled data, solved by using retrieval quality metrics as implicit feedback in a multi-armed bandit setup.",
      metrics: [
        "Near-zero median regret across diverse queries",
        "Dynamic per-query configuration selection",
        "No manual tuning required per domain",
        "Listwise ranking with group-aware training"
      ],
      status: "COMPLETED",
      tech: ["Python", "LightGBM", "LambdaRank", "scikit-learn", "RAG Pipelines"]
    }
  ];

  return (
    <section 
      id="projects" 
      ref={sectionRef}
      className={`py-32 px-6 transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="mb-16 text-center">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="h-px w-12 bg-cyan-400"></div>
            <span className="text-cyan-400 text-sm font-mono tracking-widest">SYSTEM LOGS / PROJECTS</span>
            <div className="h-px w-12 bg-cyan-400"></div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold">
            <span className="text-white">Architecting </span>
            <span className="text-cyan-400">Intelligence.</span>
          </h2>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {projects.map((project, i) => (
            <ProjectCard key={i} project={project} />
          ))}
        </div>

        {/* View More Button */}
        <div className="text-center">
          <button 
            onClick={() => window.open('https://github.com/Vedant-Git-dev', '_blank')}
            className="px-8 py-4 bg-white text-gray-900 rounded-lg hover:bg-gray-100 transition-all text-sm font-medium inline-flex items-center gap-2 group cursor-pointer"
          >
            Explore GitHub
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}