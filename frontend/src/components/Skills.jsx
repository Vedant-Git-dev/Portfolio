import { useEffect, useRef, useState } from 'react';
import { ChevronRight } from 'lucide-react';

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
  const skillGroups = [
    {
      title: "Core ML & Engineering",
      skills: ["Deep Learning (CNN, RNN, Transformers)", "NLP & Computer Vision", "Classical ML (SVM, Regression)", "Model Evaluation & Optimization"]
    },
    {
      title: "LLM & Agent Systems",
      skills: ["Autonomous Agents", "ReAct Planning", "RAG Architectures", "Prompt Engineering", "LangChain Patterns"]
    },
    {
      title: "Backend & DevOps",
      skills: ["FastAPI", "REST APIs", "Linux CLI", "Python", "Node.js"]
    },
    {
      title: "ML Stack",
      skills: ["PyTorch", "TensorFlow/Keras", "scikit-learn", "LightGBM", "NumPy/Pandas"]
    }
  ];

  return (
    <section 
      id="skills" 
      ref={sectionRef}
      className={`py-24 px-6 transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-12 text-cyan-400 flex items-center gap-3">
          <span className="text-gray-500 font-mono text-xl">03.</span>
          Technical Stack
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          {skillGroups.map((group, i) => (
            <div key={i} className="border border-gray-800 rounded-lg p-6 bg-gray-900/30 hover:border-gray-700 hover:scale-105 transition-all duration-300 cursor-pointer">
              <h3 className="text-lg font-semibold text-white mb-4">{group.title}</h3>
              <ul className="space-y-2">
                {group.skills.map((skill, j) => (
                  <li key={j} className="text-gray-400 flex items-start gap-2">
                    <ChevronRight size={16} className="text-cyan-400 mt-1 flex-shrink-0" />
                    <span>{skill}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}