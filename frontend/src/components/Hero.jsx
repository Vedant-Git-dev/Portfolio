import { Github, Linkedin, Download, ExternalLink } from 'lucide-react';

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center px-6 pt-20">
      <div className="max-w-4xl">
        <div className="mb-6">
          <span className="text-cyan-400 text-sm font-mono">$ whoami</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
          <span className="text-white">Vedant Pardeshi</span>
        </h1>
        <h2 className="text-2xl md:text-3xl text-gray-400 mb-8 font-light">
          AI/ML Engineer <span className="text-cyan-400">|</span> LLM Agent Systems <span className="text-cyan-400">&</span> Autonomous Planning
        </h2>
        <div align = "center">
        <p className="text-lg text-gray-300 mb-12 max-w-2xl leading-relaxed">
          I design intelligent systems that don't just process, they reason, plan, and adapt. 
          Focused on pushing LLMs beyond chat into autonomous agents that solve complex, 
          multi-step problems in dynamic environments.
        </p>
        </div>
        <div className="flex gap-4 flex-wrap justify-center">
          <a
            href="https://github.com/Vedant-Git-dev"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-transparent border-2 border-cyan-400 text-cyan-400 rounded hover:bg-cyan-400/10 transition-all duration-300 flex items-center gap-2 group cursor-pointer"
          >
            <Github size={20} />
            <span>GitHub</span>
            <ExternalLink size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
          </a>
          <a
            href="https://www.linkedin.com/in/vedant-pardeshi"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-cyan-400 text-gray-900 rounded hover:bg-cyan-300 transition-all duration-300 flex items-center gap-2 font-medium cursor-pointer"
          >
            <Linkedin size={20} />
            <span>Connect</span>
          </a>
          <button
            onClick={() => window.open('/resume.pdf', '_blank')}
            className="px-6 py-3 bg-transparent border-2 border-gray-600 text-gray-300 rounded hover:border-cyan-400 hover:text-cyan-400 transition-all duration-300 flex items-center gap-2 cursor-pointer"
          >
            <Download size={20} />
            <span>Resume</span>
          </button>
        </div>
      </div>
    </section>
  );
}