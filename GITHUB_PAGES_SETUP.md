# GitHub Pages Deployment Guide

## 🚀 Deploy Frontend to GitHub Pages

### Step 1: Enable GitHub Pages

1. Go to your GitHub repository: `https://github.com/suchith2510/skilllink`
2. Click on **Settings** tab
3. Scroll down to **Pages** section (in the left sidebar)
4. Under **Source**, select **Deploy from a branch**
5. Choose **gh-pages** branch and **/(root)** folder
6. Click **Save**

### Step 2: Set up Backend (Separate Deployment)

Since GitHub Pages only hosts static files, you need to deploy your backend separately:

**Option A: Vercel (Recommended)**
1. Deploy only the backend to Vercel
2. Update the `VITE_API_URL` in your environment variables

**Option B: Railway, Render, or Heroku**
- Deploy your backend to any Node.js hosting service

### Step 3: Update API URL

Once your backend is deployed, update the API URL in `frontend/src/config.js`:

```javascript
const API_BASE_URL = import.meta.env.VITE_API_URL || 
  (import.meta.env.DEV ? 'http://localhost:3000' : 'https://your-backend-url.vercel.app');
```

### Step 4: Push Changes

The GitHub Actions workflow will automatically:
1. Build your frontend when you push to main
2. Deploy to GitHub Pages
3. Your site will be available at: `https://suchith2510.github.io/skilllink/`

### Step 5: Environment Variables (Optional)

If you want to use environment variables, create a `.env` file in the frontend directory:

```env
VITE_API_URL=https://your-backend-url.vercel.app
```

## 🔧 Manual Deployment

If you prefer manual deployment:

```bash
# Build the frontend
cd frontend
npm run build

# The built files will be in frontend/dist/
# You can manually upload these to GitHub Pages
```

## 📝 Important Notes

- **GitHub Pages only hosts static files** (HTML, CSS, JS)
- **Backend must be deployed separately** (Vercel, Railway, etc.)
- **CORS issues**: Make sure your backend allows requests from your GitHub Pages domain
- **Base path**: The site will be available at `/skilllink/` not `/`

## 🎯 Your Site URL

After deployment, your site will be available at:
`https://suchith2510.github.io/skilllink/` 