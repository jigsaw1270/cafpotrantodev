# Cloudinary Image Upload Setup Guide

## 📸 Overview

This project now uses **Cloudinary** for production image uploads, solving Vercel serverless filesystem limitations.

**Benefits:**
- ✅ Works perfectly on Vercel serverless
- ✅ Automatic image optimization (WebP, AVIF)
- ✅ CDN delivery for fast loading
- ✅ Automatic resizing and transformations
- ✅ 25GB storage + 25GB bandwidth (free tier)

---

## 🚀 Quick Setup (5 Minutes)

### Step 1: Create Cloudinary Account

1. Go to: https://cloudinary.com/users/register/free
2. Sign up with your email (100% free for starter tier)
3. Verify your email address

### Step 2: Get Your Credentials

1. After login, go to **Dashboard**: https://cloudinary.com/console
2. You'll see your credentials at the top:
   ```
   Cloud name: dxxxxxxxx
   API Key: 123456789012345
   API Secret: aBcDeFgHiJkLmNoPqRsTuVwXyZ
   ```
3. **Keep these safe!** (Don't commit to git)

### Step 3: Configure Vercel Backend

1. Go to Vercel Backend Settings:
   https://vercel.com/jigsaw1270s-projects/backend/settings/environment-variables

2. Add these 3 environment variables:
   ```
   CLOUDINARY_CLOUD_NAME = your_cloud_name
   CLOUDINARY_API_KEY = your_api_key
   CLOUDINARY_API_SECRET = your_api_secret
   ```

3. Click **Save**

4. **Redeploy** the backend:
   ```bash
   cd backend
   vercel --prod
   ```

### Step 4: (Optional) Configure Local Development

If you want to test Cloudinary locally, add to `backend/.env`:

```bash
# Cloudinary (Production Image Storage)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

**Note:** If these are not set locally, the system will automatically use local disk storage (./uploads) for development.

---

## 🎯 How It Works

### Automatic Mode Detection

The system automatically detects which storage to use:

- **Cloudinary Configured?** → Uses Cloudinary (production mode)
- **No Cloudinary?** → Uses local disk storage (development mode)

### Image Processing

All uploaded images are automatically:
- ✅ Resized to max 1200x1200 (maintains aspect ratio)
- ✅ Optimized with `quality: auto`
- ✅ Converted to best format (`WebP`, `AVIF`)
- ✅ Delivered via Cloudinary CDN

### Folder Structure

Images are organized in Cloudinary:
```
cafpotranto/
  ├── categories/      (category images)
  ├── subservices/     (subservice images)
  └── general/         (other uploads)
```

---

## 🧪 Testing

### Test Category Creation

1. Go to admin panel: https://cafpotrantoadmin.vercel.app
2. Create a new category with an image
3. Check the console logs for:
   ```
   📸 Image Upload Mode: Cloudinary (Production)
   📤 Uploading to Cloudinary...
   ✅ Cloudinary upload successful: https://res.cloudinary.com/...
   ```

### Verify in Cloudinary

1. Go to: https://cloudinary.com/console/media_library
2. Navigate to `cafpotranto/categories/`
3. You should see your uploaded images

---

## 🔧 Troubleshooting

### Issue: "Image upload failed"

**Check:**
1. ✅ Environment variables are set in Vercel
2. ✅ Backend is redeployed after adding variables
3. ✅ Cloudinary credentials are correct (no spaces)

**Verify:**
```bash
# Check backend logs on Vercel
vercel logs https://backend-one-blue-24.vercel.app
```

### Issue: "Using local storage instead of Cloudinary"

**Solution:** Cloudinary env vars are not set. Add them to Vercel and redeploy.

### Issue: "CORS error when uploading"

**Solution:** Already handled in `backend/src/server.js` CORS config.

---

## 📊 Cloudinary Dashboard

Access your dashboard: https://cloudinary.com/console

**Key Sections:**
- **Media Library** - View all uploaded images
- **Analytics** - Usage statistics
- **Settings > Upload** - Configure upload presets (optional)
- **Settings > Security** - API keys and restrictions

---

## 💰 Pricing

**Free Tier Includes:**
- 25 GB storage
- 25 GB bandwidth/month
- 25,000 transformations/month
- Unlimited images

**This is MORE than enough for most businesses!**

Upgrade only if you exceed limits (unlikely for small-medium projects).

---

## 🛡️ Security Notes

1. **Never commit credentials to git** ✅ (Already in .gitignore)
2. **Use environment variables** ✅ (Implemented)
3. **Restrict API keys** (Optional in Cloudinary dashboard)

---

## 🎓 Next Steps (Optional)

### 1. Configure Upload Presets

Create reusable transformation presets in Cloudinary dashboard:
- Product images: 800x800, quality 85
- Thumbnails: 200x200, quality 70

### 2. Add Backup Strategy

Cloudinary has built-in backups, but you can:
- Enable auto-backup to S3 (in Cloudinary settings)
- Periodically export media library

### 3. Monitor Usage

Check your usage monthly at:
https://cloudinary.com/console/analytics

---

## 📚 Documentation

- Cloudinary Docs: https://cloudinary.com/documentation
- Node.js SDK: https://cloudinary.com/documentation/node_integration
- Upload Widget: https://cloudinary.com/documentation/upload_widget

---

## ✅ Checklist

Before going to production:

- [ ] Cloudinary account created
- [ ] Credentials added to Vercel backend
- [ ] Backend redeployed
- [ ] Test category creation works
- [ ] Verify image appears in Cloudinary dashboard
- [ ] Test image loads on frontend
- [ ] (Optional) Add credentials to local .env for testing

---

## 🆘 Need Help?

If you encounter issues:

1. Check Vercel deployment logs
2. Check Cloudinary dashboard for failed uploads
3. Verify environment variables are set correctly
4. Test locally with Cloudinary credentials in `.env`

---

**Status:** ✅ Implementation Complete | 📦 Ready for Production
