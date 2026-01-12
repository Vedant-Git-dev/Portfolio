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
      className={`py-24 px-6 transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-12 text-cyan-400 flex items-center gap-3">
          <span className="text-gray-500 font-mono text-xl">01.</span>
          About
        </h2>
        <div className="text-gray-300 space-y-6 text-lg leading-relaxed">
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
          <p>
            Beyond individual projects, I've led technical initiatives from concept to deployment and 
            mentored 15+ students through the messy reality of applied ML. I've learned that the hardest 
            problems are rarely just about the model, they're about the system around it.
          </p>
        </div>
      </div>
    </section>
  );
}