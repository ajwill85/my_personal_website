/**
 * AWS Lambda function to handle contact form submissions via SES
 * This function is deployed to Lambda and exposed via API Gateway
 */

// The Lambda Node.js runtime provides @aws-sdk/client-ses. Load it on first use
// so local checks of validation and rendering do not need that package installed.
let sesClient;

function getSesClient() {
  if (!sesClient) {
    const { SESClient } = require('@aws-sdk/client-ses');
    sesClient = new SESClient({
      region: process.env.AWS_REGION || process.env.AWS_DEFAULT_REGION || 'us-east-1'
    });
  }
  return sesClient;
}

function createSendEmailCommand(input) {
  const { SendEmailCommand } = require('@aws-sdk/client-ses');
  return new SendEmailCommand(input);
}

const ALLOWED_ORIGINS = [
  'https://ajwill.ai',
  'https://www.ajwill.ai',
];

const FIELD_LIMITS = {
  fullName: 100,
  email: 254,
  company: 120,
  budget: 80,
  message: 5000,
};

const MAX_BODY_CHARS = 20000;

const EMAIL_PATTERN = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

function corsHeaders(event) {
  const origin = event.headers?.origin || event.headers?.Origin || '';
  const allowOrigin = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    'Access-Control-Allow-Origin': allowOrigin,
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json',
    Vary: 'Origin',
  };
}

function jsonResponse(statusCode, headers, payload) {
  return {
    statusCode,
    headers,
    body: JSON.stringify(payload),
  };
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function readField(value, { required, maxLength, allowNewlines }) {
  if (value == null || value === '') {
    if (required) {
      return { ok: false, error: 'Missing required fields' };
    }
    return { ok: true, value: '' };
  }

  if (typeof value !== 'string') {
    return { ok: false, error: 'Invalid request' };
  }

  const trimmed = value.trim();
  if (required && trimmed.length === 0) {
    return { ok: false, error: 'Missing required fields' };
  }

  if (trimmed.length > maxLength) {
    return { ok: false, error: 'A field is too long' };
  }

  const controlPattern = allowNewlines
    ? /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/
    : /[\u0000-\u001F\u007F]/;
  if (controlPattern.test(trimmed)) {
    return { ok: false, error: 'Invalid request' };
  }

  return { ok: true, value: trimmed };
}

function validateSubmission(body) {
  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return { ok: false, error: 'Invalid request' };
  }

  const fullName = readField(body.fullName, {
    required: true,
    maxLength: FIELD_LIMITS.fullName,
    allowNewlines: false,
  });
  if (!fullName.ok) return fullName;

  const email = readField(body.email, {
    required: true,
    maxLength: FIELD_LIMITS.email,
    allowNewlines: false,
  });
  if (!email.ok) return email;
  if (!EMAIL_PATTERN.test(email.value)) {
    return { ok: false, error: 'Invalid email address' };
  }

  const company = readField(body.company, {
    required: false,
    maxLength: FIELD_LIMITS.company,
    allowNewlines: false,
  });
  if (!company.ok) return company;

  const budget = readField(body.budget, {
    required: false,
    maxLength: FIELD_LIMITS.budget,
    allowNewlines: false,
  });
  if (!budget.ok) return budget;

  const message = readField(body.message, {
    required: true,
    maxLength: FIELD_LIMITS.message,
    allowNewlines: true,
  });
  if (!message.ok) return message;

  return {
    ok: true,
    value: {
      fullName: fullName.value,
      email: email.value,
      company: company.value,
      budget: budget.value,
      message: message.value,
    },
  };
}

function renderEmail(fields) {
  const companyText = fields.company || 'Not provided';
  const budgetText = fields.budget || 'Not provided';
  const subject = `New Contact Form Submission from ${fields.fullName}`;
  const text = `
New contact form submission:

Name: ${fields.fullName}
Email: ${fields.email}
Company: ${companyText}
Budget: ${budgetText}

Message:
${fields.message}

---
This email was sent from your portfolio contact form.
  `.trim();

  const html = `
              <html>
                <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                  <h2 style="color: #C2A376;">New Contact Form Submission</h2>
                  <table style="width: 100%; max-width: 600px; border-collapse: collapse;">
                    <tr>
                      <td style="padding: 10px; font-weight: bold; width: 120px;">Name:</td>
                      <td style="padding: 10px;">${escapeHtml(fields.fullName)}</td>
                    </tr>
                    <tr style="background-color: #f9f9f9;">
                      <td style="padding: 10px; font-weight: bold;">Email:</td>
                      <td style="padding: 10px;"><a href="mailto:${escapeHtml(fields.email)}">${escapeHtml(fields.email)}</a></td>
                    </tr>
                    <tr>
                      <td style="padding: 10px; font-weight: bold;">Company:</td>
                      <td style="padding: 10px;">${escapeHtml(companyText)}</td>
                    </tr>
                    <tr style="background-color: #f9f9f9;">
                      <td style="padding: 10px; font-weight: bold;">Budget:</td>
                      <td style="padding: 10px;">${escapeHtml(budgetText)}</td>
                    </tr>
                  </table>
                  <div style="margin-top: 20px; padding: 15px; background-color: #f5f5f5; border-left: 4px solid #C2A376;">
                    <h3 style="margin-top: 0; color: #C2A376;">Message:</h3>
                    <p style="white-space: pre-wrap;">${escapeHtml(fields.message)}</p>
                  </div>
                  <hr style="margin-top: 30px; border: none; border-top: 1px solid #ddd;">
                  <p style="font-size: 12px; color: #666;">This email was sent from your portfolio contact form.</p>
                </body>
              </html>
            `;

  return { subject, text, html };
}

function buildHandler(client, createCommand = createSendEmailCommand) {
  return async (event) => {
    const headers = corsHeaders(event);

    // Handle preflight OPTIONS request
    if (event.httpMethod === 'OPTIONS') {
      return {
        statusCode: 200,
        headers,
        body: ''
      };
    }

    try {
      if (typeof event.body !== 'string' || event.body.length === 0 || event.body.length > MAX_BODY_CHARS) {
        return jsonResponse(400, headers, { error: 'Invalid request' });
      }

      let body;
      try {
        body = JSON.parse(event.body);
      } catch {
        return jsonResponse(400, headers, { error: 'Invalid request' });
      }

      const validated = validateSubmission(body);
      if (!validated.ok) {
        return jsonResponse(400, headers, { error: validated.error });
      }

      const rendered = renderEmail(validated.value);
      const fromEmail = process.env.FROM_EMAIL || process.env.SES_FROM_EMAIL;
      const toEmail = process.env.TO_EMAIL || 'contact@example.com';
      if (!fromEmail) {
        console.error('Sender address is not configured');
        return jsonResponse(500, headers, { error: 'Failed to send email' });
      }

      const command = createCommand({
        Source: fromEmail,
        Destination: {
          ToAddresses: [toEmail],
        },
        Message: {
          Subject: {
            Data: rendered.subject,
            Charset: 'UTF-8',
          },
          Body: {
            Text: {
              Data: rendered.text,
              Charset: 'UTF-8',
            },
            Html: {
              Data: rendered.html,
              Charset: 'UTF-8',
            },
          },
        },
      });

      await client.send(command);

      return jsonResponse(200, headers, {
        success: true,
        message: 'Email sent successfully'
      });
    } catch (error) {
      console.error('Error sending email:', error);
      return jsonResponse(500, headers, {
        error: 'Failed to send email',
        details: error.message
      });
    }
  };
}

exports.handler = (event) => buildHandler(getSesClient())(event);
exports.buildHandler = buildHandler;
exports.escapeHtml = escapeHtml;
exports.validateSubmission = validateSubmission;
exports.renderEmail = renderEmail;
exports.FIELD_LIMITS = FIELD_LIMITS;
