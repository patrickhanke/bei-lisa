# Bei Lisa - TanStack Router Migration

## ✅ Migration Complete!

Your project has been successfully migrated from Gatsby to **TanStack Router** with Vite!

### 🚀 Dev Server Running
The development server is now running at: **http://localhost:5174/**

## What Was Done

### Framework Migration
- **From:** Gatsby (Static Site Generator)
- **To:** TanStack Router + Vite (Modern React SPA)

### Key Changes

1. **Routing System**
   - TanStack Router with file-based routes in `app/routes/`
   - Automatic route generation
   - Type-safe routing

2. **Build System**
   - Gatsby → Vite (much faster dev server and builds)
   - Hot Module Replacement (HMR) for instant updates

3. **Components Migrated**
   - ✅ All pages (home, impressum, datenschutz)
   - ✅ Header, Footer, SEO components
   - ✅ All styling with Emotion preserved
   - ✅ Framer Motion animations
   - ✅ React Google Maps
   - ✅ All icons and UI components

4. **Images**
   - Gatsby Image → Standard `<img>` tags
   - Images accessible from `/src/images/`

5. **SEO**
   - react-helmet for meta tags
   - Structured data (JSON-LD) preserved
   - All SEO features maintained

## Project Structure

```
bei-lisa/
├── app/
│   ├── routes/              # TanStack Router routes
│   │   ├── __root.tsx      # Root layout
│   │   ├── index.tsx       # Home page
│   │   ├── impressum.tsx
│   │   └── datenschutz.tsx
│   ├── components/          # React components
│   ├── styles/             # CSS files
│   ├── lib/                # Utilities (Apollo Client)
│   ├── client.tsx          # App entry point
│   └── router.tsx          # Router configuration
├── src/                    # Assets (images, fonts)
├── index.html              # HTML entry
└── vite.config.ts          # Vite configuration
```

## Available Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Format code
npm run format
```

## Development

### Hot Module Replacement
Vite provides instant updates when you save files - no page reload needed!

### Router Devtools
The TanStack Router Devtools are available in the bottom-right corner of your app during development.

### Type Safety
All routes are type-safe. The router generates TypeScript types automatically.

## Features Preserved

✅ All existing styling (Emotion CSS-in-JS)
✅ Framer Motion animations
✅ Responsive design (desktop/mobile)
✅ Apollo Client for GraphQL
✅ Google Maps integration
✅ SEO optimization
✅ Custom fonts
✅ All icons (React Icons)

## Deployment

### Build Output
The build creates a static SPA in the `dist/` folder:
```bash
npm run build
```

### Hosting Options
This is now a standard SPA that can be hosted on:
- Vercel
- Netlify
- GitHub Pages
- Any static hosting service
- Any web server (Nginx, Apache, etc.)

### Important: SPA Routing
Configure your host to redirect all requests to `index.html` for client-side routing to work:

**Vercel** (`vercel.json`):
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

**Netlify** (`_redirects` in `dist/`):
```
/*  /index.html  200
```

## Environment Variables

For client-side environment variables, prefix with `VITE_`:
```
VITE_API_URL=https://api.example.com
VITE_GOOGLE_MAPS_API_KEY=your_key
```

Access in code:
```ts
const apiUrl = import.meta.env.VITE_API_URL
```

## What's Different from Gatsby

### Advantages
- ⚡ Much faster development server (Vite vs Webpack)
- 🔥 Instant hot reload
- 📦 Smaller bundle sizes
- 🎯 Type-safe routing
- 🚀 Modern build tooling

### Trade-offs
- No SSG/SSR (purely client-side)
- No automatic image optimization (can add vite-plugin-imagetools)
- No GraphQL data layer (use Apollo Client directly or React Query)

## Next Steps

### Recommended Enhancements

1. **Image Optimization**
   ```bash
   npm install vite-plugin-imagetools
   ```

2. **PWA Support** (if needed)
   ```bash
   npm install vite-plugin-pwa
   ```

3. **Bundle Analysis**
   ```bash
   npm install rollup-plugin-visualizer
   ```

## Troubleshooting

### Port Already in Use
Vite automatically tries another port if 5173 is busy.

### Images Not Loading
Make sure image paths start with `/src/images/`

### Styles Not Working
Ensure `@emotion/react` is in your dependencies and the jsxImportSource is configured.

## Resources

- [TanStack Router Docs](https://tanstack.com/router)
- [Vite Docs](https://vitejs.dev)
- [Emotion Docs](https://emotion.sh)

## Support

The migration is complete and tested. The dev server is running successfully!

Visit http://localhost:5174/ to see your site in action.
