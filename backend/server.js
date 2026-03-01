'use strict';

require('dotenv').config();
const express = require('express');
const { Resend } = require('resend');
const cors = require('cors');

// ─── App Init ────────────────────────────────────────────────────────────────
const app = express();
const PORT = process.env.PORT || 3001;

// ─── Resend Client ────────────────────────────────────────────────────────────
if (!process.env.RESEND_API_KEY) {
  console.error('❌  RESEND_API_KEY is not set. Emails will not send.');
}
const resend = new Resend(process.env.RESEND_API_KEY);

// ─── Allowed Origins ─────────────────────────────────────────────────────────
const ALLOWED_ORIGINS = [
  'http://localhost:5173',
  'http://localhost:3000',
  process.env.FRONTEND_URL,
].filter(Boolean);

// ─── Middleware ───────────────────────────────────────────────────────────────
app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    if (ALLOWED_ORIGINS.includes(origin)) return callback(null, true);
    return callback(new Error(`CORS policy: origin ${origin} not allowed`));
  },
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
  optionsSuccessStatus: 200,
}));

app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// ─── Input Sanitization ───────────────────────────────────────────────────────
const sanitize = (str = '') =>
  String(str)
    .replace(/[\r\n\t]/g, ' ')
    .trim()
    .slice(0, 1000);

// ─── Input Validation ────────────────────────────────────────────────────────
const validateContactInput = ({ name, email, subject, message }) => {
  const errors = [];

  if (!name || name.trim().length < 2)
    errors.push('Name must be at least 2 characters.');

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email.trim()))
    errors.push('A valid email address is required.');

  if (!subject || subject.trim().length < 3)
    errors.push('Subject must be at least 3 characters.');

  if (!message || message.trim().length < 10)
    errors.push('Message must be at least 10 characters.');

  return errors;
};

// ─── Routes ──────────────────────────────────────────────────────────────────

app.get('/', (_req, res) => {
  res.status(200).json({
    success: true,
    message: 'Portfolio Contact API is running.',
    timestamp: new Date().toISOString(),
  });
});

app.post('/contact', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // 1. Validate
    const errors = validateContactInput({ name, email, subject, message });
    if (errors.length > 0) {
      return res.status(400).json({ success: false, message: errors.join(' ') });
    }

    // 2. Sanitize
    const safeName    = sanitize(name);
    const safeEmail   = sanitize(email);
    const safeSubject = sanitize(subject);
    const safeMessage = sanitize(message);
    const timestamp   = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

    // 3. Build HTML email
    const htmlBody = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <style>
          body { font-family: Arial, sans-serif; background: #f4f4f4; margin: 0; padding: 0; }
          .container { max-width: 600px; margin: 40px auto; background: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
          .header { background: #0a0e1a; padding: 24px 32px; }
          .header h1 { color: #22d3ee; margin: 0; font-size: 20px; letter-spacing: 1px; }
          .body { padding: 32px; }
          .field { margin-bottom: 20px; }
          .label { font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #888; margin-bottom: 4px; }
          .value { font-size: 15px; color: #222; word-break: break-word; }
          .message-box { background: #f9f9f9; border-left: 3px solid #22d3ee; padding: 16px; border-radius: 4px; }
          .footer { background: #f4f4f4; padding: 16px 32px; font-size: 12px; color: #aaa; text-align: center; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header"><h1>📬 New Portfolio Contact</h1></div>
          <div class="body">
            <div class="field"><div class="label">From</div><div class="value">${safeName}</div></div>
            <div class="field"><div class="label">Email</div><div class="value"><a href="mailto:${safeEmail}" style="color:#22d3ee;">${safeEmail}</a></div></div>
            <div class="field"><div class="label">Subject</div><div class="value">${safeSubject}</div></div>
            <div class="field"><div class="label">Message</div><div class="message-box value">${safeMessage.replace(/\n/g, '<br/>')}</div></div>
            <div class="field"><div class="label">Received At</div><div class="value">${timestamp} IST</div></div>
          </div>
          <div class="footer">Sent via Vedant Pardeshi's Portfolio Contact Form</div>
        </div>
      </body>
      </html>
    `;

    // 4. Send via Resend
    const { data, error } = await resend.emails.send({
      // FROM_EMAIL must be a Resend-verified domain address.
      // For testing without a domain, use: onboarding@resend.dev
      // (Resend only delivers to your own account email in test mode)
      from: `Portfolio Contact <${process.env.FROM_EMAIL}>`,
      to: [process.env.TO_EMAIL],   // Your inbox (e.g. vedantpardeshi26@gmail.com)
      reply_to: safeEmail,          // Hitting Reply goes to the sender
      subject: `[Portfolio] ${safeSubject}`,
      html: htmlBody,
    });

    if (error) {
      console.error('[/contact] Resend API error:', error);
      return res.status(500).json({
        success: false,
        message: 'Error sending email. Please try again or contact me directly.',
      });
    }

    console.log(`[/contact] Email sent successfully. Resend ID: ${data.id}`);
    return res.status(200).json({ success: true, message: 'Email sent successfully' });

  } catch (err) {
    console.error('[/contact] Unexpected error:', err.message);
    return res.status(500).json({
      success: false,
      message: 'Error sending email. Please try again or contact me directly.',
    });
  }
});

// ─── 404 ─────────────────────────────────────────────────────────────────────
app.use((_req, res) => {
  res.status(404).json({ success: false, message: 'Route not found.' });
});

// ─── Global Error Handler ────────────────────────────────────────────────────
app.use((err, _req, res, _next) => {
  console.error('[Global Error]', err.message);
  res.status(500).json({ success: false, message: 'Internal server error.' });
});

// ─── Start ───────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`✅ Portfolio Contact API running on port ${PORT}`);
  console.log(`   Health  → http://localhost:${PORT}/`);
  console.log(`   Contact → http://localhost:${PORT}/contact`);
});