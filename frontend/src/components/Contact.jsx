import { useEffect, useRef, useState } from 'react';
import { Mail, Github, Linkedin, ChevronRight } from 'lucide-react';

export default function Contact() {
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
  const handleEmailClick = () => {
    window.location.href = 'mailto:vedant@example.com';
  };

  return (
    <section 
      id="contact" 
      ref={sectionRef}
      className={`py-24 px-6 transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-12 text-cyan-400 flex items-center gap-3">
          <span className="text-gray-500 font-mono text-xl">04.</span>
          Get In Touch
        </h2>
        <div className="space-y-8">
          <div align = "center">
          <p className="text-gray-300 text-lg leading-relaxed max-w-2xl">
            Interested in discussing autonomous systems, agent architectures, or ML engineering? 
            I'm always open to conversations about technical challenges and collaboration opportunities.
          </p>
          </div>
          <div className="flex flex-col gap-4">
            <button
              onClick={handleEmailClick}
              className="flex items-center gap-3 text-gray-300 hover:text-cyan-400 transition-colors group cursor-pointer"
            >
              <Mail size={20} className="text-cyan-400" />
              <span className="font-mono">vedantpardeshi26@gmail.com</span>
              <ChevronRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
            <a
              href="https://github.com/Vedant-Git-dev"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-gray-300 hover:text-cyan-400 transition-colors group cursor-pointer"
            >
              <Github size={20} className="text-cyan-400" />
              <span className="font-mono">github.com/Vedant-Git-dev</span>
              <ChevronRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
            <a
              href="https://www.linkedin.com/in/vedant-pardeshi"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-gray-300 hover:text-cyan-400 transition-colors group cursor-pointer"
            >
              <Linkedin size={20} className="text-cyan-400" />
              <span className="font-mono">LinkedIn</span>
              <ChevronRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
          </div>
          <div className="pt-8 border-t border-gray-800">
            <p className="text-gray-500 font-mono text-sm">
              <span className="text-cyan-400">$</span> location: Pune, Maharashtra, India
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}