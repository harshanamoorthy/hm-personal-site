# Quick Start - Deploy to Cloudflare Pages

## Step 1: Prepare Your Repository

```bash
# Navigate to the project directory
cd harshana-site

# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial portfolio site with TLS Analyzer"

# Create main branch
git branch -M main
```

## Step 2: Push to GitHub

```bash
# Create a new repository on GitHub (github.com/new)
# Then connect it:
git remote add origin https://github.com/YOUR_USERNAME/harshana-site.git
git push -u origin main
```

## Step 3: Deploy to Cloudflare Pages

1. Go to https://dash.cloudflare.com
2. Click **Workers & Pages** in the left sidebar
3. Click **Create Application** → **Pages** → **Connect to Git**
4. Authorize GitHub and select your `harshana-site` repository
5. Configure build settings:
   - **Project name**: harshana-site (or your preferred name)
   - **Production branch**: main
   - **Framework preset**: Astro
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
6. Click **Save and Deploy**

## Step 4: Access Your Site

- Your site will be live at `harshana-site.pages.dev` (or your chosen name)
- First deployment takes 2-3 minutes
- Future deployments are automatic on every push to `main`

## Optional: Add Custom Domain

1. In your Cloudflare Pages project, go to **Custom domains**
2. Click **Set up a custom domain**
3. Enter your domain (e.g., `harshana.dev`)
4. Follow the DNS configuration instructions
5. SSL certificate is automatically provisioned

## Test Locally First

```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Open http://localhost:4321
# Test the TLS Analyzer with domains like:
# - google.com
# - cloudflare.com
# - github.com
```

## Troubleshooting

### Build fails on Cloudflare Pages
- Check Node.js version (should be 18+)
- Verify `package.json` has all dependencies
- Check build logs in Cloudflare dashboard

### TLS Analyzer not working
- Check CORS settings
- Verify API endpoint is accessible: https://pqc-test-center.appviewx.com/public-scan
- Check browser console for errors

### Styling issues
- Ensure Tailwind CSS is properly configured
- Check that `global.css` is imported in Layout.astro
- Clear browser cache

## What's Next?

1. **Customize Content**: Update About, Experience pages with your info
2. **Add More Tools**: Build Certificate Chain Visualizer, PQC Playground
3. **Blog Integration**: Add MDX or CMS for Insights section
4. **Workers AI**: Add PKI chatbot assistant
5. **Analytics**: Integrate Cloudflare Web Analytics

## Support

- Astro Discord: https://astro.build/chat
- Cloudflare Discord: https://discord.cloudflare.com
- Documentation: See README.md

---

🚀 Happy deploying!
