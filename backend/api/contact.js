const nodemailer = require('nodemailer');

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      replyTo: email,
      subject: `[Portfolio] ${subject}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #0a0e1a; color: #e5e7eb; border-radius: 12px;">
          <h2 style="color: #22d3ee; margin-bottom: 24px;">📬 New Contact Form Submission</h2>
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
          <hr style="border-color: #1f2937; margin: 20px 0;" />
          <p style="color: #6b7280; font-size: 12px;">Reply directly to respond to ${name}.</p>
        </div>
      `
    });

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Mail error:', error);
    res.status(500).json({ error: 'Failed to send email' });
  }
}