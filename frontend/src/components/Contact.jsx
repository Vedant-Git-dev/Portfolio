import { useEffect, useRef, useState } from 'react';
import { Mail, Github, Linkedin } from 'lucide-react';

export default function Contact() {
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
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

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate submission
    setTimeout(() => {
      setIsSubmitting(false);
      setShowMessage(true);
      
      // Hide message after 5 seconds
      setTimeout(() => {
        setShowMessage(false);
      }, 5000);
    }, 1000);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section 
      id="contact" 
      ref={sectionRef}
      className={`py-32 px-6 transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="mb-16 text-center">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="h-px w-12 bg-cyan-400"></div>
            <span className="text-cyan-400 text-sm font-mono tracking-widest">COMMUNICATION LINK</span>
            <div className="h-px w-12 bg-cyan-400"></div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-white">Open to </span>
            <span className="text-cyan-400">Collaborate?</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Whether you need a custom ML model, data pipeline, or strategic AI consulting, I'm here to turn complex data into clear results.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Contact Info */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-white mb-6">Direct Channels</h3>
            
            {/* Email */}
            <a 
              href="mailto:vedantpardeshi26@gmail.com"
              className="flex items-start gap-4 p-4 bg-gradient-to-br from-gray-800/30 to-gray-900/30 border border-gray-800 rounded-xl hover:border-cyan-400/30 transition-all group"
            >
              <div className="w-12 h-12 bg-cyan-400/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-cyan-400/20 transition-all">
                <Mail className="w-6 h-6 text-cyan-400" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-sm text-gray-500 uppercase tracking-wide mb-1">Email Frequency</div>
                <div className="text-white font-medium break-all">vedantpardeshi26@gmail.com</div>
              </div>
            </a>

            {/* GitHub */}
            <a 
              href="https://github.com/Vedant-Git-dev"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-4 p-4 bg-gradient-to-br from-gray-800/30 to-gray-900/30 border border-gray-800 rounded-xl hover:border-cyan-400/30 transition-all group"
            >
              <div className="w-12 h-12 bg-cyan-400/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-cyan-400/20 transition-all">
                <Github className="w-6 h-6 text-cyan-400" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-sm text-gray-500 uppercase tracking-wide mb-1">Code Repository</div>
                <div className="text-white font-medium break-all">github.com/Vedant-Git-dev</div>
              </div>
            </a>

            {/* LinkedIn */}
            <a 
              href="https://www.linkedin.com/in/vedant-pardeshi"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-4 p-4 bg-gradient-to-br from-gray-800/30 to-gray-900/30 border border-gray-800 rounded-xl hover:border-cyan-400/30 transition-all group"
            >
              <div className="w-12 h-12 bg-cyan-400/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-cyan-400/20 transition-all">
                <Linkedin className="w-6 h-6 text-cyan-400" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-sm text-gray-500 uppercase tracking-wide mb-1">Professional Network</div>
                <div className="text-white font-medium break-all">linkedin.com/in/vedant-pardeshi</div>
              </div>
            </a>

            {/* Status */}
            <div className="p-4 bg-gradient-to-br from-cyan-900/20 to-gray-900/30 border border-cyan-400/20 rounded-xl">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                <span className="text-cyan-400 font-semibold">System Status: Online</span>
              </div>
              <p className="text-sm text-gray-400">Available for freelance & contract work</p>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <div className="bg-gradient-to-br from-gray-800/30 to-gray-900/30 border border-gray-800 rounded-2xl p-8">
              <div className="flex items-center gap-2 mb-6">
                <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <h3 className="text-xl font-bold text-white">Send Transmission</h3>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2 uppercase tracking-wide">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-cyan-400 focus:outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2 uppercase tracking-wide">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-cyan-400 focus:outline-none transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-2 uppercase tracking-wide">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Project Inquiry"
                    className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-cyan-400 focus:outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-2 uppercase tracking-wide">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="4"
                    placeholder="How can I help you?"
                    className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-cyan-400 focus:outline-none transition-all resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-6 py-4 bg-white text-gray-900 rounded-lg hover:bg-gray-100 transition-all text-sm font-medium flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Transmitting...
                    </>
                  ) : (
                    <>
                      Send Transmission
                      <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </>
                  )}
                </button>

                {/* Success Message */}
                {showMessage && (
                  <div className="mt-4 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                    <div className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                      <div>
                        <h4 className="text-yellow-500 font-semibold mb-1">Build in Progress</h4>
                        <p className="text-gray-400 text-sm">The contact form functionality is currently under development. Please reach out via direct channels above.</p>
                      </div>
                    </div>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}