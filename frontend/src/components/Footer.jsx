export default function Footer() {
  return (
    <footer className="py-12 px-6 border-t border-gray-800">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Left - Name and tagline */}
          <div className="text-center md:text-left">
            <div className="flex items-center gap-2 justify-center md:justify-start mb-2">
              <div className="w-8 h-8 bg-cyan-400 rounded flex items-center justify-center text-gray-900 font-bold">
                V
              </div>
              <span className="text-white font-bold">Vedant Pardeshi</span>
            </div>
            <p className="text-gray-500 text-sm font-mono">
              AI/ML Engineer | Machine Learning Engineer
            </p>
          </div>

          {/* Center - Quick Links */}
          <div className="flex gap-8">
            <a href="#home" className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">Home</a>
            <a href="#about" className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">About</a>
            <a href="#projects" className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">Projects</a>
            <a href="#contact" className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">Contact</a>
          </div>

          {/* Right - Copyright */}
          <div className="text-center md:text-right">
            <p className="text-gray-500 text-sm">
              © 2025 Vedant Pardeshi. All systems nominal.
            </p>
          </div>
        </div>

        {/* Bottom row */}
        <div className="mt-8 pt-8 border-t border-gray-800/50 text-center">
          <p className="text-gray-500 text-xs font-mono">
            Made with <span className="text-red-500">❤</span> & Code
          </p>
        </div>
      </div>
    </footer>
  );
}