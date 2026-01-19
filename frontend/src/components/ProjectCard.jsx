import { useState } from 'react';
import { Github, ChevronDown } from 'lucide-react';

export default function ProjectCard({ project }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="group relative bg-gradient-to-br from-gray-800/30 to-gray-900/30 border border-gray-800 rounded-2xl overflow-hidden hover:border-cyan-400/30 transition-all duration-500">
      {/* Project Image/Preview */}
      <div className="relative h-56 bg-gradient-to-br from-cyan-900/20 to-gray-900 overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:20px_20px]">
        <img
          src={project.image}
          alt={project.title}
          loading="lazy"
          className={`
            w-full h-full object-cover
            transition-transform duration-[1400ms] ease-out
          `}
        />
        </div>
        
        {/* Category Badge */}
        <div className="absolute top-4 left-4 px-3 py-1 bg-cyan-400/10 border border-cyan-400/20 rounded-full">
          <span className="text-cyan-400 text-xs font-medium uppercase tracking-wide">{project.category}</span>
        </div>
        
        {/* Expand/Collapse Button */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="absolute top-4 right-4 w-10 h-10 bg-gray-900/80 backdrop-blur-sm border border-gray-700 rounded-lg flex items-center justify-center hover:bg-gray-800 hover:border-cyan-400 transition-all z-10"
        >
          <ChevronDown 
            className={`w-5 h-5 text-gray-400 hover:text-cyan-400 transition-all duration-300 ${
              isExpanded ? 'rotate-180' : ''
            }`}
          />
        </button>

        {/* Project Title Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-gray-900 via-gray-900/80 to-transparent">
          <h3 className="text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors">
            {project.title}
          </h3>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        {/* Short Description (Always Visible) */}
        {!isExpanded && (
          <p className="text-gray-400 text-sm leading-relaxed">
            {project.shortDescription}
          </p>
        )}

        {/* Expanded Content */}
        {isExpanded && (
          <div className="space-y-4 animate-in fade-in duration-300">
            <p className="text-gray-400 text-sm leading-relaxed">
              {project.fullDescription}
            </p>

            {/* Key Metrics if available */}
            {project.metrics && (
              <div className="bg-gray-800/30 rounded-lg p-4 space-y-2">
                <div className="flex items-center gap-2 mb-3">
                  <svg className="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  <span className="text-cyan-400 text-sm font-semibold uppercase tracking-wide">Key Metrics</span>
                </div>
                {project.metrics.map((metric, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-400 text-sm">{metric}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2 pt-2">
          {project.tech.map((tech, i) => (
            <span
              key={i}
              className="px-3 py-1 bg-gray-800/50 border border-gray-700 text-gray-400 rounded-lg text-xs font-mono hover:border-cyan-400/30 transition-all"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Status & Actions */}
        <div className="pt-4 border-t border-gray-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${
              project.status === 'COMPLETED' ? 'bg-green-500' : 
              project.status === 'IN PROGRESS' ? 'bg-yellow-500' : 
              'bg-cyan-400'
            } animate-pulse`}></div>
            <span className={`text-sm font-medium ${
              project.status === 'COMPLETED' ? 'text-green-500' : 
              project.status === 'IN PROGRESS' ? 'text-yellow-500' : 
              'text-cyan-400'
            }`}>
              {project.status}
            </span>
          </div>
          
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg hover:bg-gray-800 hover:border-cyan-400 transition-all group"
          >
            <Github className="w-4 h-4 text-gray-400 group-hover:text-cyan-400 transition-colors" />
            <span className="text-gray-400 text-sm group-hover:text-cyan-400">CODE</span>
          </a>
        </div>
      </div>
    </div>
  );
}