# 📧 Gmail SMTP Setup Guide

## ✅ Implementation Complete!

Your contact form is now fully integrated with Gmail SMTP + Nodemailer. Follow these steps to configure it:

---

## 🔧 Step 1: Enable 2-Step Verification

1. Go to [Google Account](https://myaccount.google.com/)
2. Click **Security** in the left sidebar
3. Find **2-Step Verification** and enable it
4. Follow the prompts to set it up (you'll need your phone)

---

## 🔑 Step 2: Generate App Password

1. After enabling 2-Step Verification, go back to **Security**
2. Find **App passwords** (under "How you sign in to Google")
3. Click **App passwords**
4. In the dropdown:
   - Select App: **Mail**
   - Select Device: **Other (Custom name)**
   - Enter name: **CAF Potranto Website**
5. Click **Generate**
6. **Copy the 16-character password** (e.g., `abcd efgh ijkl mnop`)

⚠️ **Important**: This password is shown only once! Save it immediately.

---

## 📝 Step 3: Configure Environment Variables

1. Create a `.env.local` file in your project root (if it doesn't exist)
2. Add these variables:

```env
# Gmail account that will send emails
GMAIL_USER=your-email@gmail.com

# The 16-character App Password you just generated
# Remove spaces when pasting
GMAIL_APP_PASSWORD=abcdefghijklmnop

# Where you want to receive contact form emails
ADMIN_EMAIL=your-admin@cafpotranto.it

# Your website URL
NEXT_PUBLIC_SITE_URL=https://cafpotranto.it
```

3. **Replace the placeholder values** with your actual credentials

---

## ✅ Step 4: Test Your Setup

1. Restart your Next.js dev server:

   ```bash
   npm run dev
   ```

2. Visit: `http://localhost:3000/contact`

3. Fill out the form and submit

4. You should receive:
   - ✅ Admin email (to ADMIN_EMAIL) with form details
   - ✅ Auto-reply email (to the customer)

---

## 🎨 What Was Implemented

### API Route: `/api/send-email`

- ✅ Validates all form fields
- ✅ Rate limiting (5 emails per hour per IP)
- ✅ Sends beautiful HTML emails
- ✅ Auto-reply to customers
- ✅ Admin notification email
- ✅ Error handling

### Contact Form Updates

- ✅ Connected to API endpoint
- ✅ Loading states
- ✅ Success message
- ✅ Error handling
- ✅ Form validation
- ✅ Auto-reset after submission

### Email Features

- 📧 **Admin Email**:
  - All form data formatted nicely
  - Color-coded sections
  - Clickable email/phone links
  - Timestamp
  - Professional design

- 📧 **Customer Auto-Reply**:
  - Personalized greeting
  - Confirmation of request
  - Expected response time
  - Contact information
  - Link back to website

---

## 🔒 Security Features

✅ **Rate Limiting**: Max 5 submissions per hour per IP
✅ **Email Validation**: Checks proper email format
✅ **Required Fields**: All fields must be filled
✅ **Environment Variables**: Sensitive data not in code
✅ **Error Handling**: Graceful failure messages

---

## 📊 Email Limits

- **Gmail Free Account**: 500 emails per day
- **Rate Limit**: 5 submissions per hour per IP
- **More than enough** for a contact form!

---

## 🐛 Troubleshooting

### "Invalid credentials" error

- Check your GMAIL_USER is correct
- Make sure you're using the **App Password**, not your regular Gmail password
- Remove any spaces from the App Password

### "Less secure app access" error

- Make sure 2-Step Verification is enabled
- Use App Passwords (not regular password)

### Emails not being received

- Check spam folder
- Verify ADMIN_EMAIL is correct
- Check server logs for errors

### Rate limit error

- You've sent 5+ emails in the last hour
- Wait 1 hour or clear the rate limit (restart server in dev)

---

## 🎯 Next Steps

1. ✅ Set up environment variables
2. ✅ Test the contact form
3. ✅ Update contact info in emails (optional)
4. ✅ Customize email templates (optional)
5. ✅ Deploy to production

---

## 📝 Production Deployment

When deploying to Vercel/Netlify/etc:

1. Add environment variables in your hosting dashboard:
   - `GMAIL_USER`
   - `GMAIL_APP_PASSWORD`
   - `ADMIN_EMAIL`
   - `NEXT_PUBLIC_SITE_URL`

2. Redeploy your site

3. Test the contact form on production

---

## 💡 Tips

- Use a dedicated Gmail account for your business
- Keep your App Password secure (never commit to Git)
- Monitor your Gmail sending limits
- Consider upgrading to Google Workspace for higher limits

---

## ✨ All Set!

Your contact form is production-ready with Gmail SMTP integration!

Any questions? Check the code comments or reach out!
