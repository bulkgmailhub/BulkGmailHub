import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import nodemailer from 'nodemailer';
import { createServer as createViteServer } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

// Enable JSON body parser
app.use(express.json());

// Gmail SMTP Transporter
const getTransporter = () => {
  const user = process.env.GMAIL_USER || 'bulkgmailhub@gmail.com';
  const pass = (process.env.GMAIL_APP_PASSWORD || 'frkv usud tdyx xzrm').replace(/\s+/g, '');

  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user,
      pass,
    },
  });
};

// API Health Check
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// API Endpoint to send order notification emails to both Customer & Admin
app.post('/api/order/notify', async (req: Request, res: Response) => {
  try {
    const { order } = req.body;

    if (!order || !order.orderId || !order.customerEmail) {
      return res.status(400).json({ error: 'Invalid order payload. Missing order details or customer email.' });
    }

    const transporter = getTransporter();
    const adminEmail = process.env.GMAIL_USER || 'bulkgmailhub@gmail.com';

    // Format items list for HTML
    const itemsHtml = (order.items || [])
      .map(
        (item: any, idx: number) => `
        <tr style="border-bottom: 1px solid #e2e8f0;">
          <td style="padding: 12px 16px; font-weight: 600; color: #0f172a;">
            ${item.serviceTitle || item.title || 'Email Accounts Package'}
            <div style="font-size: 12px; color: #64748b; font-weight: normal; margin-top: 2px;">
              Tier: ${item.tierName || 'Standard'} (${item.quantityCount || item.quantity || 1} accounts)
            </div>
          </td>
          <td style="padding: 12px 16px; text-align: center; color: #334155; font-size: 14px;">
            ${item.quantityCount || item.quantity || 1}
          </td>
          <td style="padding: 12px 16px; text-align: right; font-weight: 700; color: #dc2626; font-size: 14px;">
            $${Number(item.price || 0).toFixed(2)} USD
          </td>
        </tr>
      `
      )
      .join('');

    const formattedDate = new Date(order.createdAt || Date.now()).toLocaleString('en-US', {
      timeZone: 'UTC',
      dateStyle: 'medium',
      timeStyle: 'short',
    }) + ' UTC';

    // 1. Email to Customer (Order Confirmation)
    const customerMailOptions = {
      from: `"BulkGmailHub Orders" <${adminEmail}>`,
      to: order.customerEmail,
      subject: `Order Confirmed: #${order.orderId} - BulkGmailHub`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Order Confirmation #${order.orderId}</title>
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; margin: 0; padding: 24px; color: #1e293b;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);">
            
            <!-- Header -->
            <div style="background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); padding: 28px 24px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 800; letter-spacing: -0.5px;">
                BulkGmail<span style="color: #ef4444;">Hub</span>
              </h1>
              <p style="color: #94a3b8; font-size: 13px; margin: 6px 0 0 0;">
                Order Confirmation &amp; Account Delivery Receipt
              </p>
            </div>

            <!-- Status Banner -->
            <div style="background-color: #ecfdf5; border-bottom: 1px solid #d1fae5; padding: 14px 24px; text-align: center;">
              <span style="display: inline-block; background-color: #10b981; color: #ffffff; font-size: 11px; font-weight: 700; padding: 3px 10px; border-radius: 9999px; text-transform: uppercase; letter-spacing: 0.5px; margin-right: 6px;">
                Order Received
              </span>
              <span style="color: #065f46; font-size: 13px; font-weight: 600;">
                Order #${order.orderId}
              </span>
            </div>

            <!-- Body Content -->
            <div style="padding: 24px;">
              <p style="font-size: 15px; line-height: 1.5; color: #334155; margin-top: 0;">
                Thank you for your purchase with <strong>BulkGmailHub</strong>! We have received your order details and crypto payment submission.
              </p>

              <!-- Order Summary Card -->
              <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 16px; margin: 20px 0;">
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="font-size: 12px; color: #64748b; padding-bottom: 6px;">Order ID:</td>
                    <td style="font-size: 13px; font-weight: 700; color: #0f172a; text-align: right; padding-bottom: 6px;">#${order.orderId}</td>
                  </tr>
                  <tr>
                    <td style="font-size: 12px; color: #64748b; padding-bottom: 6px;">Date &amp; Time:</td>
                    <td style="font-size: 12px; color: #334155; text-align: right; padding-bottom: 6px;">${formattedDate}</td>
                  </tr>
                  <tr>
                    <td style="font-size: 12px; color: #64748b; padding-bottom: 6px;">Payment Method:</td>
                    <td style="font-size: 12px; color: #334155; text-align: right; padding-bottom: 6px;">${order.cryptoCurrency || 'Cryptocurrency'}</td>
                  </tr>
                  <tr>
                    <td style="font-size: 12px; color: #64748b; padding-bottom: 6px;">Delivery Email:</td>
                    <td style="font-size: 12px; font-weight: 600; color: #0f172a; text-align: right; padding-bottom: 6px;">${order.customerEmail}</td>
                  </tr>
                  ${
                    order.txid
                      ? `<tr>
                    <td style="font-size: 12px; color: #64748b;">Transaction TXID:</td>
                    <td style="font-size: 11px; font-family: monospace; color: #475569; text-align: right; word-break: break-all;">${order.txid}</td>
                  </tr>`
                      : ''
                  }
                </table>
              </div>

              <!-- Items Table -->
              <h3 style="font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px; color: #64748b; margin: 24px 0 10px 0; font-weight: 700;">
                Items in Your Order
              </h3>
              <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
                <thead>
                  <tr style="background-color: #f1f5f9; text-align: left;">
                    <th style="padding: 10px 16px; font-size: 12px; color: #475569; font-weight: 700;">Service</th>
                    <th style="padding: 10px 16px; font-size: 12px; color: #475569; font-weight: 700; text-align: center;">Accounts</th>
                    <th style="padding: 10px 16px; font-size: 12px; color: #475569; font-weight: 700; text-align: right;">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  ${itemsHtml}
                </tbody>
                <tfoot>
                  <tr style="background-color: #f8fafc; font-weight: 700;">
                    <td colspan="2" style="padding: 12px 16px; text-align: right; font-size: 13px; color: #334155;">Total Amount:</td>
                    <td style="padding: 12px 16px; text-align: right; font-size: 16px; color: #dc2626;">$${Number(order.totalPrice || 0).toFixed(2)} USD</td>
                  </tr>
                </tfoot>
              </table>

              <!-- Delivery & Warranty Notice -->
              <div style="background-color: #eff6ff; border-left: 4px solid #3b82f6; padding: 14px 16px; border-radius: 0 8px 8px 0; margin-bottom: 24px;">
                <p style="margin: 0; font-size: 13px; color: #1e40af; line-height: 1.5;">
                  <strong>⚡ Estimated Delivery:</strong> 5 to 15 minutes after blockchain confirmation. Your account list format will be <code>Email:Password:Recovery:AppPassword</code>.
                </p>
                <p style="margin: 6px 0 0 0; font-size: 12px; color: #3b82f6;">
                  <strong>🛡️ 72-Hour Warranty:</strong> All accounts include free replacement for any login or initial verification issues.
                </p>
              </div>

              <!-- Quick Support Buttons -->
              <div style="text-align: center; padding: 10px 0;">
                <p style="font-size: 13px; color: #64748b; margin-bottom: 14px;">
                  Need instant confirmation or custom delivery formats? Reach our live team:
                </p>
                <a href="https://t.me/bulkgmailhub" target="_blank" style="display: inline-block; background-color: #0284c7; color: #ffffff; text-decoration: none; padding: 10px 20px; border-radius: 8px; font-weight: 700; font-size: 13px; margin: 0 4px 8px 4px;">
                  Message on Telegram (@bulkgmailhub)
                </a>
                <a href="https://wa.me/15722739250" target="_blank" style="display: inline-block; background-color: #16a34a; color: #ffffff; text-decoration: none; padding: 10px 20px; border-radius: 8px; font-weight: 700; font-size: 13px; margin: 0 4px 8px 4px;">
                  Message on WhatsApp
                </a>
              </div>

            </div>

            <!-- Footer -->
            <div style="background-color: #f1f5f9; padding: 16px 24px; text-align: center; border-top: 1px solid #e2e8f0;">
              <p style="margin: 0; font-size: 12px; color: #64748b;">
                BulkGmailHub — Bulk Verified Gmail, Aged Accounts, Hotmail, Yahoo &amp; EDU Emails.
              </p>
              <p style="margin: 4px 0 0 0; font-size: 11px; color: #94a3b8;">
                Support Email: <a href="mailto:bulkgmailhub@gmail.com" style="color: #dc2626; text-decoration: none;">bulkgmailhub@gmail.com</a>
              </p>
            </div>

          </div>
        </body>
        </html>
      `,
    };

    // 2. Email to Admin (Instant Order Notification to bulkgmailhub@gmail.com)
    const adminMailOptions = {
      from: `"BulkGmailHub System" <${adminEmail}>`,
      to: adminEmail,
      subject: `🚨 [NEW ORDER] #${order.orderId} - $${Number(order.totalPrice || 0).toFixed(2)} USD - ${order.customerEmail}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>New Order Alert #${order.orderId}</title>
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #0f172a; margin: 0; padding: 24px; color: #f8fafc;">
          <div style="max-width: 650px; margin: 0 auto; background-color: #1e293b; border-radius: 16px; overflow: hidden; border: 1px solid #334155; box-shadow: 0 10px 15px -3px rgba(0,0,0,0.5);">
            
            <!-- Header -->
            <div style="background-color: #dc2626; padding: 20px 24px; text-align: left;">
              <div style="display: inline-block; background-color: rgba(0,0,0,0.2); padding: 4px 10px; border-radius: 6px; font-size: 11px; font-weight: 800; text-transform: uppercase; color: #fff; margin-bottom: 6px;">
                🚨 New Customer Order Received
              </div>
              <h1 style="color: #ffffff; margin: 0; font-size: 22px; font-weight: 800;">
                Order #${order.orderId} — $${Number(order.totalPrice || 0).toFixed(2)} USD
              </h1>
            </div>

            <div style="padding: 24px;">
              
              <!-- Customer Profile Card -->
              <div style="background-color: #0f172a; border: 1px solid #334155; border-radius: 12px; padding: 18px; margin-bottom: 20px;">
                <h3 style="margin: 0 0 12px 0; font-size: 13px; text-transform: uppercase; color: #94a3b8; letter-spacing: 0.5px;">
                  Customer Information
                </h3>
                <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
                  <tr>
                    <td style="padding: 4px 0; color: #94a3b8; width: 140px;">Delivery Email:</td>
                    <td style="padding: 4px 0; color: #38bdf8; font-weight: 700;">
                      <a href="mailto:${order.customerEmail}" style="color: #38bdf8; text-decoration: none;">${order.customerEmail}</a>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 4px 0; color: #94a3b8;">Contact Channel:</td>
                    <td style="padding: 4px 0; color: #f8fafc; font-weight: 600; text-transform: capitalize;">
                      ${order.contactMethod || 'N/A'}: <span style="color: #4ade80;">${order.contactHandle || 'Not provided'}</span>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 4px 0; color: #94a3b8;">Order Date (UTC):</td>
                    <td style="padding: 4px 0; color: #cbd5e1;">${formattedDate}</td>
                  </tr>
                  <tr>
                    <td style="padding: 4px 0; color: #94a3b8;">Crypto Selected:</td>
                    <td style="padding: 4px 0; color: #fbbf24; font-weight: 600;">${order.cryptoCurrency || 'N/A'}</td>
                  </tr>
                  <tr>
                    <td style="padding: 4px 0; color: #94a3b8;">Wallet Address:</td>
                    <td style="padding: 4px 0; font-family: monospace; font-size: 11px; color: #94a3b8; word-break: break-all;">${order.cryptoAddress || 'N/A'}</td>
                  </tr>
                  <tr>
                    <td style="padding: 4px 0; color: #94a3b8;">TXID (Hash):</td>
                    <td style="padding: 4px 0; font-family: monospace; font-size: 11px; color: #4ade80; font-weight: 700; word-break: break-all;">
                      ${order.txid || 'N/A'}
                    </td>
                  </tr>
                  ${
                    order.notes
                      ? `<tr>
                    <td style="padding: 4px 0; color: #94a3b8;">Customer Notes:</td>
                    <td style="padding: 4px 0; color: #e2e8f0; font-style: italic;">"${order.notes}"</td>
                  </tr>`
                      : ''
                  }
                </table>
              </div>

              <!-- Order Items -->
              <h3 style="margin: 0 0 10px 0; font-size: 13px; text-transform: uppercase; color: #94a3b8; letter-spacing: 0.5px;">
                Ordered Packages
              </h3>
              <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; background-color: #0f172a; border-radius: 8px; border: 1px solid #334155; overflow: hidden;">
                <thead>
                  <tr style="border-bottom: 1px solid #334155; background-color: rgba(255,255,255,0.03);">
                    <th style="padding: 10px 14px; font-size: 12px; color: #94a3b8; text-align: left;">Product</th>
                    <th style="padding: 10px 14px; font-size: 12px; color: #94a3b8; text-align: center;">Qty</th>
                    <th style="padding: 10px 14px; font-size: 12px; color: #94a3b8; text-align: right;">Price</th>
                  </tr>
                </thead>
                <tbody>
                  ${(order.items || [])
                    .map(
                      (item: any) => `
                    <tr style="border-bottom: 1px solid #334155;">
                      <td style="padding: 10px 14px; color: #f8fafc; font-size: 13px; font-weight: 600;">
                        ${item.serviceTitle || item.title}
                        <div style="font-size: 11px; color: #94a3b8; font-weight: normal;">Tier: ${item.tierName || 'Standard'}</div>
                      </td>
                      <td style="padding: 10px 14px; color: #cbd5e1; font-size: 13px; text-align: center;">
                        ${item.quantityCount || item.quantity || 1}
                      </td>
                      <td style="padding: 10px 14px; color: #ef4444; font-size: 13px; font-weight: 700; text-align: right;">
                        $${Number(item.price || 0).toFixed(2)}
                      </td>
                    </tr>
                  `
                    )
                    .join('')}
                </tbody>
                <tfoot>
                  <tr style="background-color: rgba(255,255,255,0.05);">
                    <td colspan="2" style="padding: 12px 14px; text-align: right; color: #cbd5e1; font-size: 13px; font-weight: 700;">TOTAL REVENUE:</td>
                    <td style="padding: 12px 14px; text-align: right; color: #4ade80; font-size: 16px; font-weight: 800;">$${Number(order.totalPrice || 0).toFixed(2)} USD</td>
                  </tr>
                </tfoot>
              </table>

              <!-- Action Prompt -->
              <div style="background-color: rgba(220, 38, 38, 0.15); border: 1px solid rgba(220, 38, 38, 0.4); border-radius: 8px; padding: 14px; text-align: center;">
                <p style="margin: 0; font-size: 13px; color: #fca5a5; font-weight: 600;">
                  ⚠️ Action Required: Verify TXID on explorer &amp; dispatch accounts to <strong>${order.customerEmail}</strong>.
                </p>
              </div>

            </div>

            <div style="background-color: #0f172a; padding: 14px 24px; text-align: center; border-top: 1px solid #334155; font-size: 11px; color: #64748b;">
              BulkGmailHub Automated Notification System
            </div>

          </div>
        </body>
        </html>
      `,
    };

    // Send both emails in parallel
    const [customerResult, adminResult] = await Promise.allSettled([
      transporter.sendMail(customerMailOptions),
      transporter.sendMail(adminMailOptions),
    ]);

    const isCustomerSent = customerResult.status === 'fulfilled';
    const isAdminSent = adminResult.status === 'fulfilled';

    if (!isCustomerSent) {
      console.error('Failed to send customer notification email:', (customerResult as PromiseRejectedResult).reason);
    }
    if (!isAdminSent) {
      console.error('Failed to send admin notification email:', (adminResult as PromiseRejectedResult).reason);
    }

    return res.json({
      success: true,
      orderId: order.orderId,
      notifications: {
        customerEmail: isCustomerSent ? 'sent' : 'failed',
        adminEmail: isAdminSent ? 'sent' : 'failed',
      },
    });
  } catch (error: any) {
    console.error('Error in /api/order/notify:', error);
    return res.status(500).json({
      success: false,
      error: error.message || 'Internal server error while processing notifications.',
    });
  }
});

// Vite middleware & static serving
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`BulkGmailHub Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
