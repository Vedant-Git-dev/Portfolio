import { useEffect, useRef, useState } from 'react';
import { Mail, Github, Linkedin, CheckCircle, XCircle, AlertTriangle, Loader2, Send } from 'lucide-react';

// ─── Replace with your actual Render backend URL ──────────────────────────────
const API_URL = 'https://portfolio-2-o9qk.onrender.com';

// ─── Status types and their UI config ────────────────────────────────────────
const STATUS = {
  idle:       null,
  loading:    'loading',
  success:    'success',
  validation: 'validation',  // 400 — bad input
  server:     'server',      // 500 — backend error
  network:    'network',     // fetch itself failed (offline / CORS / Render cold start)
  timeout:    'timeout',     // request took too long
};

const statusConfig = {
  success: {
    icon: CheckCircle,
    color: 'text-green-400',
    border: 'border-green-500/30',
    bg: 'bg-green-500/10',
    title: 'Transmission Successful',
  },
  validation: {
    icon: AlertTriangle,
    color: 'text-yellow-400',
    border: 'border-yellow-500/30',
    bg: 'bg-yellow-500/10',
    title: 'Validation Failed',
  },
  server: {
    icon: XCircle,
    color: 'text-red-400',
    border: 'border-red-500/30',
    bg: 'bg-red-500/10',
    title: 'Server Error',
  },
  network: {
    icon: XCircle,
    color: 'text-orange-400',
    border: 'border-orange-500/30',
    bg: 'bg-orange-500/10',
    title: 'Connection Failed',
  },
  timeout: {
    icon: AlertTriangle,
    color: 'text-yellow-400',
    border: 'border-yellow-500/30',
    bg: 'bg-yellow-500/10',
    title: 'Request Timed Out',
  },
};

// ─── Client-side field validation (mirrors backend) ──────────────────────────
const validateForm = ({ name, email, subject, message }) => {
  const errors = {};
  if (!name || name.trim().length < 2)
    errors.name = 'Name must be at least 2 characters.';

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email.trim()))
    errors.email = 'Please enter a valid email address.';

  if (!subject || subject.trim().length < 3)
    errors.subject = 'Subject must be at least 3 characters.';

  if (!message || message.trim().length < 10)
    errors.message = 'Message must be at least 10 characters.';

  return errors;
};

// ─── Transmission Status Banner ───────────────────────────────────────────────
function StatusBanner({ status, message, onDismiss }) {
  if (!status || status === STATUS.loading) return null;
  const cfg = statusConfig[status];
  if (!cfg) return null;
  const Icon = cfg.icon;

  return (
    <div
      className={`mt-4 p-4 rounded-xl border ${cfg.bg} ${cfg.border} transition-all duration-500 animate-in fade-in slide-in-from-bottom-2`}
      role="alert"
    >
      <div className="flex items-start gap-3">
        <Icon className={`w-5 h-5 flex-shrink-0 mt-0.5 ${cfg.color}`} />
        <div className="flex-1 min-w-0">
          <div className={`font-semibold text-sm mb-0.5 ${cfg.color}`}>{cfg.title}</div>
          <p className="text-gray-300 text-sm leading-relaxed">{message}</p>

          {/* Extra guidance for specific failure modes */}
          {status === 'network' && (
            <p className="text-gray-500 text-xs mt-2">
              The server may be waking up from sleep (Render free tier).{' '}
              <button
                className="underline text-orange-400 hover:text-orange-300"
                onClick={onDismiss}
              >
                Try again in 30 seconds.
              </button>
            </p>
          )}
          {status === 'timeout' && (
            <p className="text-gray-500 text-xs mt-2">
              Render free services sleep after inactivity. Please wait ~30 s and retry, or email me directly at{' '}
              <a
                href="mailto:vedantpardeshi26@gmail.com"
                className="underline text-yellow-400 hover:text-yellow-300"
              >
                vedantpardeshi26@gmail.com
              </a>
              .
            </p>
          )}
          {(status === 'server' || status === 'validation') && (
            <p className="text-gray-500 text-xs mt-2">
              You can also reach me directly at{' '}
              <a
                href="mailto:vedantpardeshi26@gmail.com"
                className="underline text-red-400 hover:text-red-300"
              >
                vedantpardeshi26@gmail.com
              </a>
              .
            </p>
          )}
        </div>
        <button
          onClick={onDismiss}
          aria-label="Dismiss"
          className="text-gray-600 hover:text-gray-400 transition-colors flex-shrink-0"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}

// ─── Field Error Inline ───────────────────────────────────────────────────────
function FieldError({ error }) {
  if (!error) return null;
  return (
    <p className="mt-1 text-xs text-red-400 flex items-center gap-1">
      <AlertTriangle className="w-3 h-3 flex-shrink-0" />
      {error}
    </p>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function Contact() {
  const [isVisible, setIsVisible] = useState(false);
  const [status, setStatus] = useState(STATUS.idle);
  const [statusMessage, setStatusMessage] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  const [formData, setFormData] = useState({
    name: '', email: '', subject: '', message: '',
  });
  const sectionRef = useRef(null);

  // ── Intersection observer for section fade-in ──────────────────────────────
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setIsVisible(true); }),
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => { if (sectionRef.current) observer.unobserve(sectionRef.current); };
  }, []);

  // ── Auto-dismiss success banner after 8 s ─────────────────────────────────
  useEffect(() => {
    if (status === STATUS.success) {
      const t = setTimeout(() => setStatus(STATUS.idle), 8000);
      return () => clearTimeout(t);
    }
  }, [status]);

  // ── Handle input change + clear field error on edit ───────────────────────
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (fieldErrors[name]) {
      setFieldErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  // ── Submit ─────────────────────────────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1. Client-side validation
    const errors = validateForm(formData);
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      setStatus('validation');
      setStatusMessage('Please fix the highlighted fields before sending.');
      return;
    }

    setFieldErrors({});
    setStatus(STATUS.loading);

    // 2. Send with a 20 s timeout (Render cold-start can be slow)
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 20000);

    try {
      const response = await fetch(`${API_URL}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);
      const data = await response.json();

      if (response.ok && data.success) {
        // ✅ Success
        setStatus('success');
        setStatusMessage("Your message is on its way! I'll get back to you as soon as possible.");
        setFormData({ name: '', email: '', subject: '', message: '' });

      } else if (response.status === 400) {
        // ❌ Validation error from server
        setStatus('validation');
        setStatusMessage(data.message || 'The server rejected the request. Please check your input.');

      } else {
        // ❌ 5xx or unexpected server error
        setStatus('server');
        setStatusMessage(
          data.message ||
          `Server returned an error (HTTP ${response.status}). Please try again or contact me directly.`
        );
      }

    } catch (err) {
      clearTimeout(timeoutId);

      if (err.name === 'AbortError') {
        // ⏱ Timeout
        setStatus('timeout');
        setStatusMessage(
          'The request timed out after 20 seconds. The backend may be waking up from sleep on Render free tier.'
        );
      } else {
        // 🌐 Network / CORS / DNS failure
        setStatus('network');
        setStatusMessage(
          `Could not reach the server. Check your internet connection or the backend may be temporarily unavailable. (${err.message})`
        );
      }
    }
  };

  const isLoading = status === STATUS.loading;
  const inputBase =
    'w-full px-4 py-3 bg-gray-900/50 border rounded-lg text-white placeholder-gray-500 focus:outline-none transition-all';

  const inputClass = (field) =>
    `${inputBase} ${
      fieldErrors[field]
        ? 'border-red-500/60 focus:border-red-400'
        : 'border-gray-700 focus:border-cyan-400'
    }`;

  return (
    <section
      id="contact"
      ref={sectionRef}
      className={`py-32 px-6 transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="max-w-6xl mx-auto">
        {/* ── Section Header ─────────────────────────────────────────────── */}
        <div className="mb-16 text-center">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="h-px w-12 bg-cyan-400" />
            <span className="text-cyan-400 text-sm font-mono tracking-widest">COMMUNICATION LINK</span>
            <div className="h-px w-12 bg-cyan-400" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-white">Open to </span>
            <span className="text-cyan-400">Collaborate?</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Whether you need a custom ML model, data pipeline, or strategic AI consulting, I'm here
            to turn complex data into clear results.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* ── Left – Direct Channels ───────────────────────────────────── */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-white mb-6">Direct Channels</h3>

            <a
              href="mailto:vedantpardeshi26@gmail.com"
              className="flex items-start gap-4 p-4 bg-gradient-to-br from-gray-800/30 to-gray-900/30 border border-gray-800 rounded-xl hover:border-cyan-400/30 transition-all group"
            >
              <div className="w-12 h-12 bg-cyan-400/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-cyan-400/20 transition-all">
                <Mail className="w-6 h-6 text-cyan-400" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-sm text-gray-500 uppercase tracking-wide mb-1">Email</div>
                <div className="text-white font-medium break-all">vedantpardeshi26@gmail.com</div>
              </div>
            </a>

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

            {/* Status pill */}
            <div className="p-4 bg-gradient-to-br from-cyan-900/20 to-gray-900/30 border border-cyan-400/20 rounded-xl">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
                <span className="text-cyan-400 font-semibold">System Status: Online</span>
              </div>
              <p className="text-sm text-gray-400">Available for freelance &amp; contract work</p>
            </div>
          </div>

          {/* ── Right – Contact Form ──────────────────────────────────────── */}
          <div>
            <div className="bg-gradient-to-br from-gray-800/30 to-gray-900/30 border border-gray-800 rounded-2xl p-8">
              {/* Form header */}
              <div className="flex items-center gap-2 mb-6">
                <Send className="w-5 h-5 text-cyan-400" />
                <h3 className="text-xl font-bold text-white">Send Transmission</h3>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                {/* Name + Email row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2 uppercase tracking-wide">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      disabled={isLoading}
                      className={inputClass('name')}
                    />
                    <FieldError error={fieldErrors.name} />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2 uppercase tracking-wide">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      disabled={isLoading}
                      className={inputClass('email')}
                    />
                    <FieldError error={fieldErrors.email} />
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-sm text-gray-400 mb-2 uppercase tracking-wide">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Project Inquiry"
                    disabled={isLoading}
                    className={inputClass('subject')}
                  />
                  <FieldError error={fieldErrors.subject} />
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm text-gray-400 mb-2 uppercase tracking-wide">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="4"
                    placeholder="How can I help you?"
                    disabled={isLoading}
                    className={`${inputClass('message')} resize-none`}
                  />
                  <FieldError error={fieldErrors.message} />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full px-6 py-4 bg-white text-gray-900 rounded-lg hover:bg-gray-100 transition-all text-sm font-medium flex items-center justify-center gap-2 group disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Transmitting…
                    </>
                  ) : (
                    <>
                      Send Transmission
                      <svg
                        className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 7l5 5m0 0l-5 5m5-5H6"
                        />
                      </svg>
                    </>
                  )}
                </button>

                {/* ── Transmission Status Banner ──────────────────────────── */}
                <StatusBanner
                  status={status}
                  message={statusMessage}
                  onDismiss={() => setStatus(STATUS.idle)}
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}