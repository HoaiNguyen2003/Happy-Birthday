# Deployment Guide

## Platform: Vercel (Auto-deploy via GitHub)
## Repository: https://github.com/HoaiNguyen2003/Happy-Birthday
## Custom Domain: Optional (via Vercel dashboard)

This static website is set up to automatically deploy to Vercel whenever you push changes to your GitHub repository.

### Initial Setup (One-time)
1. Go to [Vercel](https://vercel.com) and click **Sign Up** or **Log In** using your **GitHub** account.
2. Once logged in to Vercel, click **Add New...** -> **Project** on your dashboard.
3. You will see a list of your GitHub repositories. Find the **Happy-Birthday** repository and click **Import**.
4. In the configuration screen:
   - **Framework Preset**: Leave it as **Other** (it will auto-detect as a static project).
   - **Root Directory**: Leave it as `./` (or blank) since `index.html` is at the root of the repository.
   - **Build and Output Settings**: No changes needed (defaults are fine).
5. Click **Deploy**. Vercel will build and host your website in about 10-20 seconds. It will provide you with a permanent, free URL like `https://happy-birthday-xxx.vercel.app`.

### Deploying Changes (Future Updates)
Every time you make edits to your code (for example, modifying text, updating letters, or adding songs):
1. Run these commands from your local command line (or VSCode terminal) to push changes to GitHub:
   ```bash
   git add .
   git commit -m "Describe your changes"
   git push origin main
   ```
2. As soon as the push succeeds, Vercel will automatically trigger a new deployment in the cloud. Within 15 seconds, your live site will be updated with your changes!
