# 🚀 Full Stack Deployment Guide

## Backend Deployment (Render - Free)

### Step 1: Deploy Backend to Render

1. Go to **[render.com](https://render.com)** and sign up/login with GitHub
2. Click **"New +"** → **"Web Service"**
3. Connect your **CardioPredict** repository
4. Configure:
   - **Name**: `cardiopredict-backend`
   - **Region**: Oregon (US West)
   - **Branch**: `main`
   - **Root Directory**: `backend`
   - **Runtime**: `Python 3`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn main:app --host 0.0.0.0 --port $PORT`
   - **Plan**: `Free`

5. Click **"Create Web Service"**
6. Wait 5-10 minutes for deployment
7. Copy your backend URL: `https://cardiopredict-backend.onrender.com`

### Important Notes:
- Free tier sleeps after 15 min inactivity (first request takes 30-50s to wake up)
- 750 hours/month free
- Auto-deploys on git push

---

## Frontend Deployment (Vercel - Free)

### Step 2: Deploy Frontend to Vercel

1. Go to **[vercel.com/new](https://vercel.com/new)**
2. Sign in with GitHub
3. Click **"Import Project"**
4. Select **"CardioPredict"** repository
5. Configure:
   - **Framework Preset**: `Next.js`
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`

6. **Add Environment Variable**:
   - Key: `NEXT_PUBLIC_BACKEND_URL`
   - Value: `https://cardiopredict-backend.onrender.com` (your Render URL)

7. Click **"Deploy"**
8. Wait 2-3 minutes
9. Your app is live! 🎉

---

## Quick Deploy Commands

### Backend (Render)
```bash
# Already configured via render.yaml
# Just push to GitHub and connect in Render dashboard
git push
```

### Frontend (Vercel)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
cd frontend
vercel --prod
```

---

## Update Backend URL After Deployment

After backend is deployed on Render, update the frontend:

1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Update `NEXT_PUBLIC_BACKEND_URL` with your Render backend URL
3. Redeploy frontend (automatic or manual)

---

## 🔧 Troubleshooting

**Backend sleeping on Render?**
- First request after 15 min takes 30-50s (this is normal on free tier)
- Consider upgrading to paid plan for always-on service

**CORS errors?**
- Backend `main.py` already has CORS configured for all origins
- Check if backend URL is correct in Vercel environment variables

**Build fails?**
- Check logs in Render/Vercel dashboard
- Verify all dependencies are in `requirements.txt` and `package.json`

---

## 📊 Free Tier Limits

**Render:**
- 750 hours/month
- 512 MB RAM
- Sleeps after 15 min inactivity
- 100 GB bandwidth/month

**Vercel:**
- 100 GB bandwidth/month
- Unlimited deployments
- Automatic HTTPS
- Global CDN

---

## 🌐 Your Live URLs

After deployment, you'll have:
- **Frontend**: `https://cardiopredict.vercel.app`
- **Backend**: `https://cardiopredict-backend.onrender.com`
- **API Docs**: `https://cardiopredict-backend.onrender.com/docs`

---

## 🔄 Auto-Deploy

Both platforms auto-deploy when you push to GitHub:
```bash
git add .
git commit -m "Update feature"
git push
```

✅ Render and Vercel will automatically rebuild and deploy!
