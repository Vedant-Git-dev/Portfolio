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
      category: "AI Agents",
      image: "https://plus.unsplash.com/premium_photo-1683120963435-6f9355d4a776?w=500&auto=format&fit=crop&q=60",
      github: "https://github.com/Vedant-Git-dev/PhiCraft",
      problem: "Built a ReAct inspired planning engine that recursively decomposes tasks. The system maintains a hierarchical task graph, tracks environmental state, and dynamically replans when execution fails.",
      status: "90%+ task success rate",
      tech: ["Python", "Node.js", "Mineflayer", "ReAct", "State Machines"]
    },
    {
      title: "RAG Configuration Optimizer",
      role: "ML System Design & Learning to Rank",
      category: "ML Systems",
      image: "https://images.unsplash.com/photo-1597733336794-12d05021d510?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.1.0",
      github: "https://github.com/Vedant-Git-dev/RAG-Optimizer",
      problem: "Framed configuration selection as a learning to rank problem. LightGBM proposer does high recall candidate selection. LambdaRank ranker uses listwise optimization per query.",
      status: "Near zero median regret",
      tech: ["Python", "LightGBM", "LambdaRank", "scikit-learn"]
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
            <div className="h-px w-12  bg-cyan-400"></div>
            <span className="text-cyan-400 text-sm font-mono tracking-widest ">SYSTEM LOGS / PROJECTS</span>            
            <div className="h-px w-12  bg-cyan-400"></div>
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
          <button className="px-8 py-4 bg-white text-gray-900 rounded-lg hover:bg-gray-100 transition-all text-sm font-medium inline-flex items-center gap-2 group">
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