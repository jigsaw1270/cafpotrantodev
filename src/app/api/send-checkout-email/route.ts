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

  if (limit.count >= 10) {
    // Max 10 checkout emails per hour per IP
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
            "Troppi tentativi. Riprova più tardi. (Limite: 10 ordini all'ora)",
        },
        { status: 429 }
      );
    }

    const body = await request.json();

    // Log received data for debugging
    console.log('📨 Received checkout data:', body);

    // Validate required fields
    const {
      formType,
      formData,
      serviceData,
      totals,
      urgency,
      premiumSupport,
      appliedCoupon,
      acceptDataProcessing,
      acceptTermsAndConditions,
      selectedPaymentMethod,
    } = body;

    if (
      !formData ||
      !serviceData ||
      !totals ||
      !acceptDataProcessing ||
      !acceptTermsAndConditions
    ) {
      console.log('❌ Validation failed. Missing required fields');
      return NextResponse.json(
        {
          success: false,
          message: 'Dati del modulo incompleti',
        },
        { status: 400 }
      );
    }

    // Validate email format
    const email = formData.email;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
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

    // Generate order ID
    const orderId = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    // Prepare customer name and details based on form type
    const customerName =
      formType === 'private'
        ? `${formData.firstName} ${formData.lastName}`
        : formData.companyName;

    const customerDetails =
      formType === 'private'
        ? {
            type: 'Privato',
            name: `${formData.firstName} ${formData.lastName}`,
            email: formData.email,
            phone: formData.phone,
            address: `${formData.address}, ${formData.city} ${formData.postalCode}`,
          }
        : {
            type: 'Azienda',
            company: formData.companyName,
            vatNumber: formData.vatNumber,
            pecOrSdi: formData.pecOrSdi,
            email: formData.email,
            phone: formData.phone,
            address: formData.address
              ? `${formData.address}, ${formData.city} ${formData.postalCode}`
              : 'Non specificato',
          };

    // Email to admin
    const adminMailOptions = {
      from: process.env.GMAIL_USER,
      to: process.env.ADMIN_EMAIL || process.env.GMAIL_USER,
      subject: `🛒 Nuovo Ordine Checkout - ${orderId}`,
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
                max-width: 700px;
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
              .order-id {
                background: #f0f9ff;
                border: 2px solid #00A8CC;
                padding: 15px;
                border-radius: 8px;
                text-align: center;
                margin-bottom: 25px;
                font-size: 18px;
                font-weight: 600;
                color: #142850;
              }
              .section {
                margin-bottom: 30px;
                border-left: 4px solid #00A8CC;
                padding-left: 15px;
              }
              .section-title {
                font-weight: 600;
                color: #142850;
                font-size: 16px;
                text-transform: uppercase;
                letter-spacing: 0.5px;
                margin-bottom: 15px;
              }
              .field {
                margin-bottom: 10px;
              }
              .label {
                font-weight: 600;
                color: #666;
                display: inline-block;
                width: 150px;
              }
              .value {
                color: #333;
              }
              .totals-table {
                width: 100%;
                border-collapse: collapse;
                margin-top: 15px;
                background: #f9f9f9;
                border-radius: 8px;
                overflow: hidden;
              }
              .totals-table th,
              .totals-table td {
                padding: 12px 15px;
                text-align: left;
                border-bottom: 1px solid #e0e0e0;
              }
              .totals-table th {
                background: #00A8CC;
                color: white;
                font-weight: 600;
              }
              .total-row {
                background: #142850 !important;
                color: white !important;
                font-weight: 600;
                font-size: 16px;
              }
              .addon {
                background: #fff3cd;
                padding: 8px 12px;
                border-radius: 4px;
                margin: 5px 0;
                display: inline-block;
                font-size: 14px;
              }
              .footer {
                background: #f9f9f9;
                padding: 20px;
                text-align: center;
                color: #666;
                font-size: 12px;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>🛒 Nuovo Ordine Ricevuto</h1>
                <p style="margin: 10px 0 0; font-size: 14px; opacity: 0.9;">
                  CAF PatronatoAZ - Sistema di Checkout
                </p>
              </div>
              
              <div class="content">
                <div class="order-id">
                  📋 ID Ordine: <strong>${orderId}</strong>
                </div>

                <div class="section">
                  <div class="section-title">👤 Informazioni Cliente</div>
                  <div class="field">
                    <span class="label">Tipo Cliente:</span>
                    <span class="value"><strong>${customerDetails.type}</strong></span>
                  </div>
                  ${
                    formType === 'private'
                      ? `
                    <div class="field">
                      <span class="label">Nome:</span>
                      <span class="value">${customerDetails.name}</span>
                    </div>
                  `
                      : `
                    <div class="field">
                      <span class="label">Azienda:</span>
                      <span class="value">${customerDetails.company}</span>
                    </div>
                    <div class="field">
                      <span class="label">Partita IVA:</span>
                      <span class="value">${customerDetails.vatNumber}</span>
                    </div>
                    <div class="field">
                      <span class="label">PEC/SDI:</span>
                      <span class="value">${customerDetails.pecOrSdi}</span>
                    </div>
                  `
                  }
                  <div class="field">
                    <span class="label">Email:</span>
                    <span class="value"><a href="mailto:${customerDetails.email}">${customerDetails.email}</a></span>
                  </div>
                  <div class="field">
                    <span class="label">Telefono:</span>
                    <span class="value"><a href="tel:${customerDetails.phone}">${customerDetails.phone}</a></span>
                  </div>
                  <div class="field">
                    <span class="label">Indirizzo:</span>
                    <span class="value">${customerDetails.address}</span>
                  </div>
                </div>

                <div class="section">
                  <div class="section-title">🔧 Servizio Richiesto</div>
                  <div class="field">
                    <span class="label">Servizio:</span>
                    <span class="value"><strong>${serviceData.name}</strong></span>
                  </div>
                  <div class="field">
                    <span class="label">Metodo Pagamento:</span>
                    <span class="value">${selectedPaymentMethod || 'Non specificato'}</span>
                  </div>
                </div>

                ${
                  urgency || premiumSupport
                    ? `
                <div class="section">
                  <div class="section-title">⚡ Servizi Aggiuntivi</div>
                  ${urgency ? '<div class="addon">🚨 Urgenza (+€15.00)</div>' : ''}
                  ${premiumSupport ? '<div class="addon">👨‍💼 Assistenza Premium (+€10.00)</div>' : ''}
                </div>
                `
                    : ''
                }

                ${
                  appliedCoupon
                    ? `
                <div class="section">
                  <div class="section-title">🎫 Coupon Applicato</div>
                  <div class="field">
                    <span class="label">Codice:</span>
                    <span class="value">${appliedCoupon.code}</span>
                  </div>
                  <div class="field">
                    <span class="label">Sconto:</span>
                    <span class="value">${appliedCoupon.discount}%</span>
                  </div>
                </div>
                `
                    : ''
                }

                <div class="section">
                  <div class="section-title">💰 Riepilogo Prezzi</div>
                  <table class="totals-table">
                    <tr>
                      <th>Descrizione</th>
                      <th style="text-align: right;">Importo</th>
                    </tr>
                    <tr>
                      <td>Prezzo Base Servizio</td>
                      <td style="text-align: right;">€${serviceData.basePrice.toFixed(2)}</td>
                    </tr>
                    <tr>
                      <td>Diritti di Segreteria</td>
                      <td style="text-align: right;">€${serviceData.secretarialFees.toFixed(2)}</td>
                    </tr>
                    ${
                      urgency
                        ? `
                    <tr>
                      <td>Urgenza</td>
                      <td style="text-align: right;">€15.00</td>
                    </tr>
                    `
                        : ''
                    }
                    ${
                      premiumSupport
                        ? `
                    <tr>
                      <td>Assistenza Premium</td>
                      <td style="text-align: right;">€10.00</td>
                    </tr>
                    `
                        : ''
                    }
                    <tr>
                      <td>Subtotale</td>
                      <td style="text-align: right;">€${totals.subtotal.toFixed(2)}</td>
                    </tr>
                    ${
                      totals.discount > 0
                        ? `
                    <tr>
                      <td>Sconto</td>
                      <td style="text-align: right; color: #28a745;">-€${totals.discount.toFixed(2)}</td>
                    </tr>
                    `
                        : ''
                    }
                    <tr>
                      <td>IVA (${serviceData.vatPercentage}%)</td>
                      <td style="text-align: right;">€${totals.vat.toFixed(2)}</td>
                    </tr>
                    <tr class="total-row">
                      <td><strong>TOTALE</strong></td>
                      <td style="text-align: right;"><strong>€${totals.total.toFixed(2)}</strong></td>
                    </tr>
                  </table>
                </div>

                <div class="section">
                  <div class="section-title">✅ Consensi</div>
                  <div class="field">✅ Trattamento dati personali accettato</div>
                  <div class="field">✅ Condizioni contrattuali e di recesso accettate</div>
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

    // Confirmation email to customer
    const customerMailOptions = {
      from: process.env.GMAIL_USER,
      to: email,
      subject: `✅ Conferma Ordine - ${orderId} - CAF PatronatoAZ`,
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
              .order-box {
                background: #f0f9ff;
                border: 2px solid #00A8CC;
                padding: 20px;
                border-radius: 8px;
                text-align: center;
                margin: 25px 0;
                font-size: 16px;
              }
              .service-box {
                background: #f9f9f9;
                border-left: 4px solid #00A8CC;
                padding: 20px;
                margin: 25px 0;
                border-radius: 4px;
              }
              .total-box {
                background: #142850;
                color: white;
                padding: 20px;
                border-radius: 8px;
                text-align: center;
                margin: 25px 0;
                font-size: 18px;
                font-weight: 600;
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
              .footer {
                background: #f9f9f9;
                padding: 30px;
                text-align: center;
                color: #666;
                font-size: 14px;
              }
              .contact-info {
                margin: 15px 0;
                padding: 15px;
                background: white;
                border-radius: 6px;
                border: 1px solid #e0e0e0;
              }
              .next-steps {
                background: #fff3cd;
                border-left: 4px solid #ffc107;
                padding: 15px;
                margin: 20px 0;
                border-radius: 4px;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>✅ Ordine Confermato!</h1>
                <p style="margin: 10px 0 0; font-size: 16px; opacity: 0.9;">
                  Grazie per aver scelto CAF PatronatoAZ
                </p>
              </div>
              
              <div class="content">
                <p style="font-size: 18px;">Gentile <strong>${customerName}</strong>,</p>
                
                <p style="font-size: 16px;">
                  Il tuo ordine è stato ricevuto e confermato con successo. 
                  Ecco i dettagli del tuo ordine:
                </p>

                <div class="order-box">
                  <strong>📋 ID Ordine: ${orderId}</strong><br>
                  <span style="font-size: 14px; opacity: 0.8;">
                    Conserva questo numero per future comunicazioni
                  </span>
                </div>

                <div class="service-box">
                  <h3 style="margin: 0 0 10px; color: #142850;">🔧 Servizio Richiesto</h3>
                  <p style="margin: 5px 0; font-size: 16px;"><strong>${serviceData.name}</strong></p>
                  ${
                    urgency || premiumSupport
                      ? `
                  <p style="margin: 10px 0 5px; font-weight: 600; color: #666;">Servizi Aggiuntivi:</p>
                  ${urgency ? '<span style="background: #fff3cd; padding: 4px 8px; border-radius: 4px; font-size: 12px; margin-right: 5px;">🚨 Urgenza</span>' : ''}
                  ${premiumSupport ? '<span style="background: #fff3cd; padding: 4px 8px; border-radius: 4px; font-size: 12px;">👨‍💼 Assistenza Premium</span>' : ''}
                  `
                      : ''
                  }
                </div>

                <div class="total-box">
                  💰 Totale: €${totals.total.toFixed(2)}
                  ${appliedCoupon ? `<br><span style="font-size: 14px; opacity: 0.9;">Sconto ${appliedCoupon.code} applicato</span>` : ''}
                </div>

                <div class="next-steps">
                  <h4 style="margin: 0 0 10px;">📋 Prossimi Passi:</h4>
                  <ol style="margin: 0; padding-left: 20px;">
                    <li>Il nostro team esaminerà la tua richiesta entro 2-4 ore lavorative</li>
                    <li>Riceverai un'email con le istruzioni per il pagamento</li>
                    <li>Una volta confermato il pagamento, procederemo con il servizio</li>
                    <li>Ti terremo aggiornato via email su ogni fase del processo</li>
                  </ol>
                </div>

                <p style="font-size: 16px;">
                  Se hai domande urgenti o hai bisogno di assistenza, 
                  non esitare a contattarci usando i riferimenti qui sotto.
                </p>

                <div style="text-align: center;">
                  <a href="${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}" class="button">
                    Visita il Nostro Sito
                  </a>
                </div>

                <div class="contact-info">
                  <h4 style="margin: 0 0 10px; color: #142850;">📞 Informazioni di Contatto</h4>
                  <p style="margin: 5px 0;"><strong>📧 Email:</strong> CAFMONZA12@GMAIL.COM</p>
                  <p style="margin: 5px 0;"><strong>📱 Milano Lorenteggio:</strong> +39 02 6146 0044</p>
                  <p style="margin: 5px 0;"><strong>📱 Milano Padova:</strong> +39 02 3675 5609</p>
                  <p style="margin: 5px 0;"><strong>📱 Monza:</strong> +39 039 598 6985</p>
                </div>
              </div>

              <div class="footer">
                <p style="font-size: 16px; font-weight: 600; margin-bottom: 10px;">
                  CAF - PATRONATO SINDACATO
                </p>
                <p>Assistenza Fiscale - Sportello Immigrazione - Agenzia Multiservizi</p>
                <p style="margin-top: 20px; font-size: 12px; color: #999;">
                  Questa è una email automatica di conferma. 
                  Se hai bisogno di assistenza, rispondi a questa email o contattaci direttamente.
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
      transporter.sendMail(customerMailOptions),
    ]);

    return NextResponse.json(
      {
        success: true,
        message: 'Ordine confermato! Controlla la tua email per i dettagli.',
        orderId: orderId,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Checkout email error:', error);

    return NextResponse.json(
      {
        success: false,
        message:
          "Errore durante l'invio della conferma. L'ordine è stato registrato, ma controlla i tuoi contatti.",
      },
      { status: 500 }
    );
  }
}
