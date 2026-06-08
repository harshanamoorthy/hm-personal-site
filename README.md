# Harshana Moorthy - Personal Portfolio & Lab

Professional portfolio site with interactive security tools, built with Astro, React, and deployed on Cloudflare Pages.

## 🚀 Tech Stack

- **Astro** - Static site framework for content-heavy pages
- **React** - Interactive components (lab tools)
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first styling with AVX brand colors
- **Cloudflare Pages** - Deployment and hosting
- **Cloudflare Workers** - Serverless API endpoints (future)

## 📁 Project Structure

```
harshana-site/
├── src/
│   ├── components/
│   │   └── TLSAnalyzer.tsx        # Interactive TLS analysis tool
│   ├── layouts/
│   │   └── Layout.astro           # Main layout with nav & footer
│   ├── pages/
│   │   ├── index.astro            # Homepage
│   │   ├── about.astro            # About page
│   │   ├── experience.astro       # Career timeline
│   │   ├── lab.astro              # Interactive lab tools
│   │   └── insights.astro         # Blog (placeholder)
│   └── styles/
│       └── global.css             # Tailwind + AVX brand colors
├── public/                        # Static assets
└── astro.config.mjs               # Astro configuration
```

## 🎨 Brand Colors (AVX)

- **Primary**: #4B00FF (Indigo)
- **Accent**: #FF3827 (Red Orange)
- **Surface**: #EFE9E1 (Cream)
- **Text**: #1A1A2E (Near Black)

## 🛠️ Local Development

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Setup

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The dev server will be running at `http://localhost:4321`

## 🌐 Deploy to Cloudflare Pages

### Option 1: Git-Connected Deployment (Recommended)

1. **Push to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

2. **Connect to Cloudflare Pages**:
   - Go to [Cloudflare Dashboard](https://dash.cloudflare.com)
   - Navigate to **Workers & Pages** → **Create Application** → **Pages**
   - Click **Connect to Git**
   - Select your repository
   - Configure build settings:
     - **Framework preset**: Astro
     - **Build command**: `npm run build`
     - **Build output directory**: `dist`
   - Click **Save and Deploy**

3. **Automatic Deployments**: Every push to `main` triggers a new deployment

### Option 2: Manual Deployment via Wrangler

```bash
# Install Wrangler CLI
npm install -g wrangler

# Login to Cloudflare
wrangler login

# Build the project
npm run build

# Deploy
npx wrangler pages deploy dist --project-name=harshana-site
```

## 🔧 Configuration

### Custom Domain

In Cloudflare Pages:
1. Go to your project → **Custom domains**
2. Add your domain (e.g., `harshana.dev`)
3. Follow DNS setup instructions

### Environment Variables

For future Workers integrations, add environment variables in:
- Cloudflare Dashboard → Your Project → Settings → Environment variables

## 🧪 Lab Tools

### TLS Analyzer (Active)
- Analyzes domain TLS configuration
- Certificate chain validation
- Post-quantum cryptography readiness
- Uses AppViewX PQC Test Center API

### Coming Soon
- Certificate Chain Visualizer
- PQC Algorithm Playground
- PKI Architecture Designer

## 📦 Adding New Lab Projects

### As React Component (Simple)
```typescript
// src/components/NewTool.tsx
export default function NewTool() {
  return <div>Your tool here</div>
}

// Add to src/pages/lab.astro
import NewTool from '../components/NewTool';
<NewTool client:load />
```

### As Separate Next.js App (Complex)
1. Create new Next.js app in `lab/tool-name/`
2. Deploy separately to Cloudflare Pages
3. Link from main site

## 🔒 CORS & API Integration

If calling external APIs from the browser, you may need a proxy via Cloudflare Workers:

```typescript
// functions/api/proxy.ts
export async function onRequest(context) {
  const response = await fetch('https://external-api.com', {
    headers: { 'Authorization': context.env.API_KEY }
  });
  return response;
}
```

## 📝 Content Updates

### Adding Blog Posts
1. Create markdown files in `src/content/posts/`
2. Add frontmatter (title, date, description)
3. Import and render in `insights.astro`

### Updating Experience
Edit `src/pages/experience.astro` - timeline is static HTML for now

## 🎯 Future Enhancements

- [ ] Blog/CMS integration (Contentful or MDX)
- [ ] Workers AI for PKI chatbot
- [ ] R2 for case study PDFs
- [ ] KV for caching API responses
- [ ] Certificate chain visualizer (D3.js)
- [ ] PQC algorithm playground
- [ ] Contact form with Workers
- [ ] Analytics integration

## 📚 Resources

- [Astro Docs](https://docs.astro.build)
- [Cloudflare Pages Docs](https://developers.cloudflare.com/pages)
- [Tailwind CSS](https://tailwindcss.com)
- [AppViewX PQC Test Center](https://pqc-test-center.appviewx.com)

## 🤝 Contributing

This is a personal portfolio, but suggestions are welcome! Open an issue or reach out.

## 📄 License

© 2026 Harshana Moorthy. All rights reserved.

---

**Built with** 💜 using Astro and Cloudflare
