import { useEffect, useRef, useState } from 'react';

export default function About() {
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

  return (
    <section 
      id="about" 
      ref={sectionRef}
      className={`py-32 px-6 transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="mb-16 text-center">
          <div className="inline-block">
            <div className="inline-flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-12 bg-cyan-400"></div>
              <span className="text-cyan-400 text-sm font-mono tracking-widest">ABOUT ME</span>
              <div className="h-px w-12 bg-cyan-400"></div>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold">
              <span className="text-white">Turning complex data into </span>
              <span className="text-cyan-400">actionable intelligence.</span>
            </h2>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Left column - Story */}
          <div className="space-y-6 text-gray-400 leading-relaxed">
            <p>
              I'm driven by a fundamental question: how do we make AI systems that can truly think ahead? 
              Not just predict the next token, but decompose complex goals, reason about dependencies, 
              and execute multi-step plans autonomously.
            </p>
            <p>
              My approach combines first principles thinking with pragmatic engineering. I build systems 
              that work in production, not just in notebooks. Whether it's designing recursive planning 
              algorithms for autonomous agents or optimizing RAG pipelines through learning to rank, 
              I focus on architectures that scale and adapt.
            </p>
            <p>
              I believe in building systems that last. That means proper evaluation, monitoring, and iterative improvement. 
              Whether it's autonomous agents or ranking systems, the goal is production grade engineering, not research demos.
            </p>
          </div>

          {/* Right column - Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-800 rounded-xl p-6 hover:border-cyan-400/30 transition-all">
              <div className="text-4xl font-bold text-white mb-2">4+</div>
              <div className="text-sm text-gray-400 uppercase tracking-wide">Intelligent Systems Built</div>
            </div>
            <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-800 rounded-xl p-6 hover:border-cyan-400/30 transition-all">
              <div className="text-4xl font-bold text-white mb-2">90%</div>
              <div className="text-sm text-gray-400 uppercase tracking-wide">Autonomous Task Accuracy</div>
            </div>
            <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-800 rounded-xl p-6 hover:border-cyan-400/30 transition-all">
              <div className="text-4xl font-bold text-white mb-2">20+</div>
              <div className="text-sm text-gray-400 uppercase tracking-wide">Model & Prompt Iterations</div>
            </div>
            <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-800 rounded-xl p-6 hover:border-cyan-400/30 transition-all">
              <div className="text-4xl font-bold text-white mb-2">10+</div>
              <div className="text-sm text-gray-400 uppercase tracking-wide">Core Technologies Used</div>
            </div>
          </div>
        </div>

        {/* My Approach */}
        <div className="mt-16">
          <div className="flex items-center gap-2 mb-8">
            <svg className="w-5 h-5 text-cyan-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"/>
            </svg>
            <h3 className="text-2xl font-bold text-white">My Approach</h3>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-gray-800/30 to-gray-900/30 border border-gray-800 rounded-xl p-6 hover:border-cyan-400/30 transition-all group">
              <div className="w-12 h-12 bg-cyan-400/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-cyan-400/20 transition-all">
                <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <h4 className="text-white font-semibold mb-2">Structured Thinking</h4>
              <p className="text-gray-400 text-sm">I focus on breaking complex problems into clear, manageable components before writing any code.</p>
            </div>

            <div className="bg-gradient-to-br from-gray-800/30 to-gray-900/30 border border-gray-800 rounded-xl p-6 hover:border-cyan-400/30 transition-all group">
              <div className="w-12 h-12 bg-cyan-400/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-cyan-400/20 transition-all">
                <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h4 className="text-white font-semibold mb-2">Evidence-Driven</h4>
              <p className="text-gray-400 text-sm">Decisions are guided by experimentation, evaluation, and results</p>
            </div>

            <div className="bg-gradient-to-br from-gray-800/30 to-gray-900/30 border border-gray-800 rounded-xl p-6 hover:border-cyan-400/30 transition-all group">
              <div className="w-12 h-12 bg-cyan-400/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-cyan-400/20 transition-all">
                <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h4 className="text-white font-semibold mb-2">Impact Oriented</h4>
              <p className="text-gray-400 text-sm">I aim to build systems that are actually useful, practical, and meaningful in real-world scenarios.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}