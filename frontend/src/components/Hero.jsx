import { Github, Linkedin, Mail } from 'lucide-react';

export default function Hero() {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center px-6 pt-20 relative overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-cyan-950/20 via-transparent to-transparent"></div>
      
      <div className="max-w-4xl mx-auto text-center relative z-10">
        {/* Status badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-400/10 border border-cyan-400/20 rounded-full mb-8">
          <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
          <span className="text-cyan-400 text-sm font-medium">OPEN TO WORK</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
          <span className="text-white">Vedant Pardeshi</span>
        </h1>
        
        <h2 className="text-2xl md:text-4xl mb-6 font-light">
          <span className="text-gray-400">AI/ML Engineer </span>
          <span className="text-cyan-400">&</span>
          <span className="text-gray-400"> Machine Learning Engineer</span>
        </h2>
        
        <p className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
        Engineering intelligent systems using NLP, LLM-based agents, and data-driven prediction.
        </p>


        {/* Social Links */}
        <div className="flex gap-4 justify-center">
          <a
            href="https://github.com/Vedant-Git-dev"
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 bg-gray-800/50 border border-gray-700 rounded-lg flex items-center justify-center hover:bg-gray-700 hover:border-cyan-400 transition-all group"
          >
            <Github className="w-5 h-5 text-gray-400 group-hover:text-cyan-400 transition-colors" />
          </a>
          <a
            href="https://www.linkedin.com/in/vedant-pardeshi"
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 bg-gray-800/50 border border-gray-700 rounded-lg flex items-center justify-center hover:bg-gray-700 hover:border-cyan-400 transition-all group"
          >
            <Linkedin className="w-5 h-5 text-gray-400 group-hover:text-cyan-400 transition-colors" />
          </a>
          <a
            href="mailto:vedantpardeshi26@gmail.com"
            className="w-12 h-12 bg-gray-800/50 border border-gray-700 rounded-lg flex items-center justify-center hover:bg-gray-700 hover:border-cyan-400 transition-all group"
          >
            <Mail className="w-5 h-5 text-gray-400 group-hover:text-cyan-400 transition-colors" />
          </a>
        </div>
      </div>
    </section>
  );
}