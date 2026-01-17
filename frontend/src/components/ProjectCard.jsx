import { Github, ExternalLink } from 'lucide-react';

export default function ProjectCard({ project }) {
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
        <div className="absolute top-4 left-4 px-3 py-1 bg-cyan-400/10 border border-cyan-400/20 rounded-full">
          <span className="text-cyan-400 text-xs font-medium">{project.category}</span>
        </div>
        <div className="absolute top-4 right-4 flex gap-2">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 bg-gray-900/80 backdrop-blur-sm border border-gray-700 rounded-lg flex items-center justify-center hover:bg-gray-800 hover:border-cyan-400 transition-all"
          >
            <Github className="w-5 h-5 text-gray-400 hover:text-cyan-400 transition-colors" />
          </a>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        <div>
          <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
            {project.title}
          </h3>
          <p className="text-sm text-cyan-400 font-mono mb-4">{project.role}</p>
        </div>

        <p className="text-gray-400 text-sm leading-relaxed line-clamp-3">
          {project.problem}
        </p>

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

        {/* Stats/Result */}
        <div className="pt-4 border-t border-gray-800">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-cyan-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="text-cyan-400 text-sm font-medium">{project.status}</span>
          </div>
        </div>
      </div>
    </div>
  );
}