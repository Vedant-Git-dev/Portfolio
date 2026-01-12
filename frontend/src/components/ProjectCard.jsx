import { Github } from 'lucide-react';

export default function ProjectCard({ project }) {
  return (
    <div className="border border-gray-800 rounded-lg p-8 hover:border-cyan-400/50 hover:scale-105 transition-all duration-300 bg-gray-900/50 hover:shadow-2xl hover:shadow-cyan-400/20">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-2xl font-bold text-white">{project.title}</h3>
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="text-cyan-400 hover:text-cyan-300 transition-colors cursor-pointer"
        >
          <Github size={24} />
        </a>
      </div>
      
      <p className="text-sm text-cyan-400 mb-6 font-mono">{project.role}</p>
      
      <div className="space-y-6 text-gray-300">
        <div>
          <h4 className="text-white font-semibold mb-2 text-sm uppercase tracking-wide">Problem</h4>
          <p>{project.problem}</p>
        </div>
        
        <div>
          <h4 className="text-white font-semibold mb-2 text-sm uppercase tracking-wide">Approach</h4>
          <p>{project.approach}</p>
        </div>
        
        <div>
          <h4 className="text-white font-semibold mb-2 text-sm uppercase tracking-wide">Technical Challenge</h4>
          <p>{project.challenge}</p>
        </div>
        
        <div className="bg-gray-800/50 border-l-2 border-cyan-400 p-4 rounded">
          <p className="text-cyan-400 font-semibold">{project.result}</p>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {project.tech.map((t, i) => (
            <span
              key={i}
              className="px-3 py-1 bg-gray-800 text-gray-400 rounded text-sm font-mono hover:bg-gray-700 transition-colors cursor-default"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}