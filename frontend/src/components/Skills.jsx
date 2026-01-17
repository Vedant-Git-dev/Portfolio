import { useEffect, useRef, useState } from 'react';

export default function Skills() {
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

  const skillCategories = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      title: "Core Languages",
      skills: ["Python", "C/C++", "SQL", "JavaScript"]
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      title: "Intelligence & Data",
      skills: ["PyTorch", "TensorFlow", "LangChain", "Scikit-learn", "React", "Flask"]
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
        </svg>
      ),
      title: "Infrastructure & Tools",
      skills: ["Git", "Docker", "AWS", "HuggingFace", "Linux"]
    }
  ];

  return (
    <section 
      id="skills" 
      ref={sectionRef}
      className={`py-32 px-6 transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="mb-16 text-center">
          <div className="inline-flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-12 bg-cyan-400"></div>
            <span className="text-cyan-400 text-sm font-mono tracking-widest">TECHNICAL ARSENAL</span>
            <div className="h-px w-12 bg-cyan-400"></div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-white">Engineered for </span>
            <span className="text-cyan-400">Scale & Performance.</span>
          </h2>
          <p className="text-gray-400 max-w-2xl">
            A robust toolkit designed to handle complex ML pipelines, scalable backend systems, and responsive user interfaces.
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {skillCategories.map((category, i) => (
            <div 
              key={i}
              className="bg-gradient-to-br from-gray-800/30 to-gray-900/30 border border-gray-800 rounded-xl p-6 hover:border-cyan-400/30 transition-all group"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-cyan-400/10 rounded-lg flex items-center justify-center group-hover:bg-cyan-400/20 transition-all">
                  <div className="text-cyan-400">
                    {category.icon}
                  </div>
                </div>
                <h3 className="text-white font-semibold">{category.title}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, j) => (
                  <span
                    key={j}
                    className="px-3 py-1 bg-gray-800/50 border border-gray-700 text-gray-400 rounded-lg text-sm hover:border-cyan-400/30 hover:text-cyan-400 transition-all cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
              
              {/* Progress indicator */}
              <div className="mt-4 pt-4 border-t border-gray-800">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs text-gray-500 uppercase tracking-wide">PMR</span>
                  <span className="text-xs text-cyan-400 font-mono">
                    {i === 0 ? "PMR" : i === 1 ? "PMR" : "PMR"}
                  </span>
                </div>
                <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-cyan-400 to-cyan-600 rounded-full transition-all duration-1000"
                    style={{ width: isVisible ? (i === 0 ? '100%' : i === 1 ? '100%' : '100%') : '0%' }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}