const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// POST /api/contact
app.post('/api/contact', async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Portfolio Contact <onboarding@resend.dev>',
        to: process.env.EMAIL_TO,
        reply_to: email,
        subject: `[Portfolio] ${subject}`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #0a0e1a; color: #e5e7eb; border-radius: 12px;">
            <h2 style="color: #22d3ee; margin-bottom: 24px;">New Contact Form Submission</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px 0; color: #9ca3af; width: 80px;">Name</td>
                <td style="padding: 10px 0; color: #f9fafb; font-weight: 600;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; color: #9ca3af;">Email</td>
                <td style="padding: 10px 0; color: #22d3ee;">${email}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; color: #9ca3af;">Subject</td>
                <td style="padding: 10px 0; color: #f9fafb;">${subject}</td>
              </tr>
            </table>
            <hr style="border-color: #1f2937; margin: 20px 0;" />
            <p style="color: #9ca3af; margin-bottom: 8px; font-size: 13px; text-transform: uppercase; letter-spacing: 1px;">Message</p>
            <p style="color: #e5e7eb; line-height: 1.7; white-space: pre-wrap;">${message}</p>
          </div>
        `,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Resend error:', data);
      return res.status(500).json({ error: 'Failed to send message.' });
    }

    res.json({ success: true });
  } catch (err) {
    console.error('Server error:', err);
    res.status(500).json({ error: 'Server error. Please try again.' });
  }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));