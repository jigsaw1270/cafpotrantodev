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
    // Max 5 payment confirmation emails per hour per IP
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
            "Troppi tentativi. Riprova più tardi. (Limite: 5 conferme di pagamento all'ora)",
        },
        { status: 429 }
      );
    }

    const body = await request.json();

    // Log received data for debugging
    console.log('📨 Received payment confirmation data:', body);

    // Validate required fields
    const {
      orderId,
      paymentMethod,
      paymentStatus,
      formType,
      formData,
      serviceData,
      totals,
      urgency,
      premiumSupport,
      appliedCoupon,
      acceptDataProcessing,
      acceptTermsAndConditions,
      attachments, // Base64 encoded files with metadata
    } = body;

    if (
      !formData ||
      !serviceData ||
      !totals ||
      !acceptDataProcessing ||
      !acceptTermsAndConditions ||
      !paymentStatus
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

    // Prepare attachments for email
    const emailAttachments = attachments
      ? attachments.map((attachment: any) => ({
          filename: attachment.filename,
          content: attachment.content, // Base64 content
          encoding: 'base64',
          contentType: attachment.contentType,
        }))
      : [];

    // Email to admin with attachments
    const adminMailOptions = {
      from: process.env.GMAIL_USER,
      to: process.env.ADMIN_EMAIL || process.env.GMAIL_USER,
      subject: `✅ PAGAMENTO CONFERMATO - Ordine ${orderId}`,
      attachments: emailAttachments,
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
                background: linear-gradient(135deg, #28a745, #20c997);
                color: white;
                padding: 30px 20px;
                text-align: center;
              }
              .header h1 {
                margin: 0;
                font-size: 24px;
              }
              .payment-success {
                background: #d4edda;
                border: 2px solid #28a745;
                color: #155724;
                padding: 20px;
                margin: 20px;
                border-radius: 8px;
                text-align: center;
                font-size: 18px;
                font-weight: 600;
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
                border-left: 4px solid #28a745;
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
                background: #28a745;
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
              .attachments {
                background: #e8f4f8;
                border-left: 4px solid #00A8CC;
                padding: 15px;
                margin: 20px 0;
                border-radius: 4px;
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
                <h1>✅ PAGAMENTO CONFERMATO!</h1>
                <p style="margin: 10px 0 0; font-size: 14px; opacity: 0.9;">
                  CAF Potranto - Ordine Completato
                </p>
              </div>
              
              <div class="payment-success">
                🎉 PAGAMENTO RICEVUTO CON SUCCESSO!<br>
                <span style="font-size: 14px; font-weight: normal;">
                  Metodo: ${paymentMethod} | Status: ${paymentStatus}
                </span>
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
                    <span class="value">${paymentMethod}</span>
                  </div>
                  <div class="field">
                    <span class="label">Status Pagamento:</span>
                    <span class="value" style="color: #28a745; font-weight: 600;">${paymentStatus}</span>
                  </div>
                </div>

                ${
                  attachments && attachments.length > 0
                    ? `
                <div class="section">
                  <div class="section-title">📎 Documenti Allegati</div>
                  <div class="attachments">
                    <p style="margin: 0 0 10px; font-weight: 600;">
                      Il cliente ha allegato ${attachments.length} file${attachments.length > 1 ? '' : ''}:
                    </p>
                    ${attachments
                      .map(
                        (file: any) => `
                      <div style="margin: 5px 0; padding: 8px; background: white; border-radius: 4px; border: 1px solid #ddd;">
                        📄 <strong>${file.filename}</strong> (${(file.size / 1024 / 1024).toFixed(2)} MB)
                      </div>
                    `
                      )
                      .join('')}
                    <p style="margin: 10px 0 0; font-size: 12px; color: #666;">
                      ⚠️ I file sono allegati a questa email e possono essere scaricati.
                    </p>
                  </div>
                </div>
                `
                    : ''
                }

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
                      <td><strong>TOTALE PAGATO</strong></td>
                      <td style="text-align: right;"><strong>€${totals.total.toFixed(2)}</strong></td>
                    </tr>
                  </table>
                </div>
              </div>

              <div class="footer">
                <p><strong>CAF - PATRONATO SINDACATO</strong></p>
                <p>Assistenza Fiscale - Sportello Immigrazione - Agenzia Multiservizi</p>
                <p style="margin-top: 15px; font-size: 11px;">
                  📅 Pagamento confermato il: ${new Date().toLocaleString(
                    'it-IT',
                    {
                      dateStyle: 'full',
                      timeStyle: 'short',
                    }
                  )}
                </p>
              </div>
            </div>
          </body>
        </html>
      `,
    };

    // Confirmation email to customer (without attachments for privacy)
    const customerMailOptions = {
      from: process.env.GMAIL_USER,
      to: email,
      subject: `🎉 Pagamento Confermato - ${orderId} - CAF Potranto`,
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
                background: linear-gradient(135deg, #28a745, #20c997);
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
              .success-box {
                background: #d4edda;
                border: 2px solid #28a745;
                color: #155724;
                padding: 25px;
                border-radius: 8px;
                text-align: center;
                margin: 25px 0;
                font-size: 18px;
                font-weight: 600;
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
                border-left: 4px solid #28a745;
                padding: 20px;
                margin: 25px 0;
                border-radius: 4px;
              }
              .total-box {
                background: #28a745;
                color: white;
                padding: 20px;
                border-radius: 8px;
                text-align: center;
                margin: 25px 0;
                font-size: 18px;
                font-weight: 600;
              }
              .next-steps {
                background: #d1ecf1;
                border-left: 4px solid #17a2b8;
                padding: 15px;
                margin: 20px 0;
                border-radius: 4px;
              }
              .contact-info {
                margin: 15px 0;
                padding: 15px;
                background: white;
                border-radius: 6px;
                border: 1px solid #e0e0e0;
              }
              .footer {
                background: #f9f9f9;
                padding: 30px;
                text-align: center;
                color: #666;
                font-size: 14px;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>🎉 Pagamento Confermato!</h1>
                <p style="margin: 10px 0 0; font-size: 16px; opacity: 0.9;">
                  Grazie per aver scelto CAF Potranto
                </p>
              </div>
              
              <div class="content">
                <div class="success-box">
                  ✅ Il tuo pagamento è stato elaborato con successo!
                </div>

                <p style="font-size: 18px;">Gentile <strong>${customerName}</strong>,</p>
                
                <p style="font-size: 16px;">
                  Il tuo pagamento è stato confermato e ora possiamo procedere con la lavorazione del tuo servizio.
                </p>

                <div class="order-box">
                  <strong>📋 ID Ordine: ${orderId}</strong><br>
                  <span style="font-size: 14px; opacity: 0.8;">
                    Metodo di pagamento: ${paymentMethod}
                  </span>
                </div>

                <div class="service-box">
                  <h3 style="margin: 0 0 10px; color: #28a745;">🔧 Servizio</h3>
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
                  💰 Totale Pagato: €${totals.total.toFixed(2)}
                  ${appliedCoupon ? `<br><span style="font-size: 14px; opacity: 0.9;">Sconto ${appliedCoupon.code} applicato</span>` : ''}
                </div>

                <div class="next-steps">
                  <h4 style="margin: 0 0 10px; color: #17a2b8;">📋 Cosa Succede Ora:</h4>
                  <ol style="margin: 0; padding-left: 20px;">
                    <li>Il nostro team inizierà a lavorare sul tuo servizio entro 2-4 ore lavorative</li>
                    <li>Riceverai aggiornamenti via email su ogni fase del processo</li>
                    <li>Ti contatteremo se dovessimo avere bisogno di ulteriori informazioni</li>
                    <li>Riceverai il servizio completato secondo i tempi concordati</li>
                  </ol>
                </div>

                ${
                  attachments && attachments.length > 0
                    ? `
                <div style="background: #e8f4f8; border-left: 4px solid #00A8CC; padding: 15px; margin: 20px 0; border-radius: 4px;">
                  <h4 style="margin: 0 0 10px; color: #00A8CC;">📎 Documenti Allegati</h4>
                  <p style="margin: 0; font-size: 14px;">
                    Abbiamo ricevuto ${attachments.length} file che hai allegato. 
                    Il nostro team li esaminerà durante la lavorazione del servizio.
                  </p>
                </div>
                `
                    : ''
                }

                <p style="font-size: 16px;">
                  Se hai domande o hai bisogno di assistenza, 
                  non esitare a contattarci usando i riferimenti qui sotto.
                </p>

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
                  Questa è una email automatica di conferma pagamento. 
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
        message:
          'Pagamento confermato! Email di conferma inviate con successo.',
        orderId: orderId,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Payment confirmation email error:', error);

    return NextResponse.json(
      {
        success: false,
        message:
          "Errore durante l'invio della conferma di pagamento. Il pagamento è stato processato correttamente.",
      },
      { status: 500 }
    );
  }
}
