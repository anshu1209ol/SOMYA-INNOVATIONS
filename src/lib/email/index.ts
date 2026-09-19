/**
 * Email abstraction layer.
 * Pluggable provider — defaults to console logging when no SMTP is configured.
 */

interface EmailOptions {
  to: string
  subject: string
  html: string
  from?: string
}

/**
 * Send an email via the configured provider.
 * Falls back to console.info if no SMTP credentials are set.
 */
export async function sendEmail(options: EmailOptions): Promise<{ success: boolean; error?: string }> {
  const { to, subject, html, from } = options
  const sender = from || process.env.NOTIFICATION_EMAIL_FROM || 'no-reply@somyainnovations.com'

  // Check if SMTP is configured
  const smtpHost = process.env.SMTP_HOST
  if (!smtpHost) {
    console.info(`[Email] (No SMTP configured) To: ${to}, Subject: ${subject}`)
    return { success: true }
  }

  try {
    // Dynamic import to avoid compile-time failure when nodemailer is not installed
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let nodemailer: any
    try {
      nodemailer = await (Function('return import("nodemailer")')() as Promise<any>)
    } catch {
      console.warn('[Email] nodemailer is not installed, email cannot be sent via SMTP')
      return { success: true }
    }
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    })

    await transporter.sendMail({ from: sender, to, subject, html })
    return { success: true }
  } catch (error) {
    console.error('[Email] Send failed:', error)
    return { success: false, error: 'Email delivery failed' }
  }
}


// ─── Email Templates ───────────────────────────────────────────────────────

export function contactReceivedEmail(data: { name: string; email: string; subject: string; message: string; referenceId: string }) {
  return {
    subject: `[SOMYA] New Contact Enquiry — ${data.referenceId}`,
    html: `
      <div style="font-family: sans-serif; color: #11110F; max-width: 600px;">
        <h2 style="color: #641F2A;">New Contact Enquiry</h2>
        <p><strong>Reference:</strong> ${data.referenceId}</p>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Subject:</strong> ${data.subject}</p>
        <hr style="border: 1px solid #F1EBDD;" />
        <p>${data.message}</p>
      </div>
    `,
  }
}

export function quoteRequestEmail(data: { name: string; email: string; serviceCategory: string; referenceId: string }) {
  return {
    subject: `[SOMYA] New Quote Request — ${data.referenceId}`,
    html: `
      <div style="font-family: sans-serif; color: #11110F; max-width: 600px;">
        <h2 style="color: #641F2A;">New Quote Request</h2>
        <p><strong>Reference:</strong> ${data.referenceId}</p>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Service:</strong> ${data.serviceCategory}</p>
      </div>
    `,
  }
}

export function applicationReceivedEmail(data: { name: string; position: string }) {
  return {
    subject: `[SOMYA] Application Received — ${data.position}`,
    html: `
      <div style="font-family: sans-serif; color: #11110F; max-width: 600px;">
        <h2 style="color: #641F2A;">Application Received</h2>
        <p>Dear ${data.name},</p>
        <p>Thank you for your interest in the <strong>${data.position}</strong> position at SOMYA INNOVATIONS.</p>
        <p>We have received your application and will review it shortly.</p>
        <br />
        <p style="color: #68704A;">— SOMYA INNOVATIONS Team</p>
      </div>
    `,
  }
}
