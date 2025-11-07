import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Rate limiting store (in production, use Redis or similar)
const rateLimit = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const limit = rateLimit.get(ip);

  if (!limit || now > limit.resetTime) {
    rateLimit.set(ip, { count: 1, resetTime: now + 3600000 }); // 1 hour
    return true;
  }

  if (limit.count >= 5) {
    // Max 5 emails per hour per IP
    return false;
  }

  limit.count++;
  return true;
}

export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0] ||
      request.headers.get('x-real-ip') ||
      'unknown';

    // Check rate limit
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Troppi tentativi. Riprova più tardi. (Limite: 5 email all'ora)",
        },
        { status: 429 }
      );
    }

    let body;
    try {
      body = await request.json();
    } catch (parseError) {
      console.error('JSON parse error:', parseError);
      return NextResponse.json(
        {
          success: false,
          message: 'Dati del modulo non validi. Riprova.',
        },
        { status: 400 }
      );
    }

    // Log received data for debugging
    console.log('📨 Received form data:', body);

    // Sanitize and validate input data
    const sanitizeString = (str: string) => {
      if (typeof str !== 'string') return '';
      return str
        .trim()
        .replace(/[\r\n\t]/g, ' ')
        .substring(0, 1000); // Limit length and clean
    };

    // Validate required fields
    let { name, email, phone, location, address, message } = body;

    // Sanitize all input fields
    name = sanitizeString(name);
    email = sanitizeString(email);
    phone = sanitizeString(phone);
    location = sanitizeString(location);
    address = sanitizeString(address);
    message = sanitizeString(message);

    if (!name || !email || !phone || !location || !address || !message) {
      console.log('❌ Validation failed. Missing fields:', {
        name: !!name,
        email: !!email,
        phone: !!phone,
        location: !!location,
        address: !!address,
        message: !!message,
      });
      return NextResponse.json(
        {
          success: false,
          message: 'Tutti i campi sono obbligatori',
          missingFields: {
            name: !name,
            email: !email,
            phone: !phone,
            location: !location,
            address: !address,
            message: !message,
          },
        },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        {
          success: false,
          message: 'Formato email non valido',
        },
        { status: 400 }
      );
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    // Get location name
    const locationNames: Record<string, string> = {
      'milano-lorenteggio': 'Milano Lorenteggio - Via Lorenteggio 172',
      'milano-padova': 'Milano Padova - Via Padova 288',
      monza: 'Monza - Via Amati 12/G',
    };

    const locationName = locationNames[location] || location;

    // Email to admin
    const adminMailOptions = {
      from: process.env.GMAIL_USER,
      to: process.env.ADMIN_EMAIL || process.env.GMAIL_USER,
      subject: `🔔 Nuova Richiesta Contatto - ${locationName}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body {
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                line-height: 1.6;
                color: #333;
                margin: 0;
                padding: 0;
                background-color: #f4f4f4;
              }
              .container {
                max-width: 600px;
                margin: 20px auto;
                background: white;
                border-radius: 10px;
                overflow: hidden;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
              }
              .header {
                background: linear-gradient(135deg, #00A8CC, #142850);
                color: white;
                padding: 30px 20px;
                text-align: center;
              }
              .header h1 {
                margin: 0;
                font-size: 24px;
              }
              .content {
                padding: 30px;
              }
              .field {
                margin-bottom: 20px;
                border-left: 4px solid #00A8CC;
                padding-left: 15px;
              }
              .label {
                font-weight: 600;
                color: #142850;
                font-size: 14px;
                text-transform: uppercase;
                letter-spacing: 0.5px;
                margin-bottom: 5px;
              }
              .value {
                font-size: 16px;
                color: #333;
                margin-top: 5px;
              }
              .message-box {
                background: #f9f9f9;
                border-radius: 8px;
                padding: 15px;
                margin-top: 10px;
                white-space: pre-wrap;
                word-wrap: break-word;
              }
              .footer {
                background: #f9f9f9;
                padding: 20px;
                text-align: center;
                color: #666;
                font-size: 12px;
              }
              .highlight {
                background: #fff3cd;
                padding: 2px 6px;
                border-radius: 3px;
                font-weight: 600;
              }
              .divider {
                height: 1px;
                background: #e0e0e0;
                margin: 20px 0;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>📬 Nuova Richiesta di Contatto</h1>
                <p style="margin: 10px 0 0; font-size: 14px; opacity: 0.9;">
                  CAF Potranto - Sistema di Gestione Contatti
                </p>
              </div>
              
              <div class="content">
                <p style="font-size: 16px; margin-bottom: 25px;">
                  Hai ricevuto una nuova richiesta di contatto dal sito web.
                </p>

                <div class="field">
                  <div class="label">👤 Nome Completo</div>
                  <div class="value">${name}</div>
                </div>

                <div class="field">
                  <div class="label">📧 Email</div>
                  <div class="value">
                    <a href="mailto:${email}" style="color: #00A8CC; text-decoration: none;">${email}</a>
                  </div>
                </div>

                <div class="field">
                  <div class="label">📱 Telefono</div>
                  <div class="value">
                    <a href="tel:${phone}" style="color: #00A8CC; text-decoration: none;">${phone}</a>
                  </div>
                </div>

                <div class="divider"></div>

                <div class="field">
                  <div class="label">📍 Sede Richiesta</div>
                  <div class="value">
                    <span class="highlight">${locationName}</span>
                  </div>
                </div>

                <div class="field">
                  <div class="label">🏠 Indirizzo</div>
                  <div class="value">${address}</div>
                </div>

                <div class="divider"></div>

                <div class="field">
                  <div class="label">💬 Messaggio</div>
                  <div class="message-box">${message}</div>
                </div>
              </div>

              <div class="footer">
                <p><strong>CAF - PATRONATO SINDACATO</strong></p>
                <p>Assistenza Fiscale - Sportello Immigrazione - Agenzia Multiservizi</p>
                <p style="margin-top: 15px; font-size: 11px;">
                  📅 Ricevuto il: ${new Date().toLocaleString('it-IT', {
                    dateStyle: 'full',
                    timeStyle: 'short',
                  })}
                </p>
              </div>
            </div>
          </body>
        </html>
      `,
    };

    // Auto-reply to client
    const clientMailOptions = {
      from: process.env.GMAIL_USER,
      to: email,
      subject: '✅ Conferma Ricezione - CAF Potranto',
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body {
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                line-height: 1.6;
                color: #333;
                margin: 0;
                padding: 0;
                background-color: #f4f4f4;
              }
              .container {
                max-width: 600px;
                margin: 20px auto;
                background: white;
                border-radius: 10px;
                overflow: hidden;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
              }
              .header {
                background: linear-gradient(135deg, #00A8CC, #142850);
                color: white;
                padding: 40px 20px;
                text-align: center;
              }
              .header h1 {
                margin: 0;
                font-size: 28px;
              }
              .content {
                padding: 40px 30px;
              }
              .button {
                display: inline-block;
                padding: 14px 30px;
                background: linear-gradient(135deg, #00A8CC, #142850);
                color: white;
                text-decoration: none;
                border-radius: 6px;
                margin-top: 20px;
                font-weight: 600;
              }
              .info-box {
                background: #f0f9ff;
                border-left: 4px solid #00A8CC;
                padding: 20px;
                margin: 25px 0;
                border-radius: 4px;
              }
              .footer {
                background: #f9f9f9;
                padding: 30px;
                text-align: center;
                color: #666;
                font-size: 14px;
              }
              .contact-info {
                margin: 15px 0;
                padding: 10px;
                background: white;
                border-radius: 4px;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>✅ Grazie per averci contattato!</h1>
                <p style="margin: 10px 0 0; font-size: 16px; opacity: 0.9;">
                  Il tuo messaggio è stato ricevuto con successo
                </p>
              </div>
              
              <div class="content">
                <p style="font-size: 18px;">Gentile <strong>${name}</strong>,</p>
                
                <p style="font-size: 16px;">
                  Abbiamo ricevuto la tua richiesta per la sede di <strong>${locationName}</strong>.
                </p>

                <div class="info-box">
                  <p style="margin: 0; font-size: 15px;">
                    📞 <strong>Il nostro team ti risponderà entro 24-48 ore lavorative.</strong>
                  </p>
                </div>

                <p style="font-size: 16px;">
                  Nel frattempo, puoi visitare il nostro sito per maggiori informazioni 
                  sui nostri servizi o chiamarci direttamente se la tua richiesta è urgente.
                </p>

                <div style="text-align: center;">
                  <a href="${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}" class="button">
                    Visita il Nostro Sito
                  </a>
                </div>

                <div class="contact-info">
                  <p style="margin: 5px 0;"><strong>📧 Email:</strong> info@cafpotranto.it</p>
                  <p style="margin: 5px 0;"><strong>📱 Telefono:</strong> +39 06 1234 5678</p>
                  <p style="margin: 5px 0;"><strong>📍 Indirizzo:</strong> Roma, Italia</p>
                </div>
              </div>

              <div class="footer">
                <p style="font-size: 16px; font-weight: 600; margin-bottom: 10px;">
                  CAF - PATRONATO SINDACATO
                </p>
                <p>Assistenza Fiscale - Sportello Immigrazione - Agenzia Multiservizi</p>
                <p style="margin-top: 20px; font-size: 12px; color: #999;">
                  Questa è una email automatica, non rispondere a questo messaggio.
                </p>
              </div>
            </div>
          </body>
        </html>
      `,
    };

    // Send both emails
    await Promise.all([
      transporter.sendMail(adminMailOptions),
      transporter.sendMail(clientMailOptions),
    ]);

    return NextResponse.json(
      {
        success: true,
        message: 'Email inviata con successo! Ti risponderemo presto.',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Email error:', error);

    return NextResponse.json(
      {
        success: false,
        message:
          "Errore durante l'invio dell'email. Riprova più tardi o contattaci direttamente.",
      },
      { status: 500 }
    );
  }
}
