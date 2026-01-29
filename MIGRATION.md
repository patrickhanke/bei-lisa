# Migration from Gatsby to TanStack Start

This project has been migrated from Gatsby to TanStack Start.

## What Changed

### Framework
- **From:** Gatsby (Static Site Generator)
- **To:** TanStack Start (Full-stack React framework with TanStack Router)

### Key Changes
1. **Routing:** Gatsby's file-based routing → TanStack Router with file-based routes in `app/routes/`
2. **Images:** Gatsby Image → Standard `<img>` tags (can be upgraded to a modern image optimization library)
3. **GraphQL:** Gatsby's GraphQL layer removed (Apollo Client still available for external APIs)
4. **Build System:** Gatsby → Vite + Vinxi
5. **SEO:** react-helmet → TanStack Start's `useHead` hook

### Project Structure
```
app/
├── routes/           # TanStack Router routes
│   ├── __root.tsx   # Root layout
│   ├── index.tsx    # Home page
│   ├── impressum.tsx
│   └── datenschutz.tsx
├── components/       # React components
├── styles/          # CSS files
├── lib/             # Utilities (Apollo Client, etc.)
├── client.tsx       # Client entry point
├── ssr.tsx          # Server entry point
└── router.tsx       # Router configuration

src/                 # Legacy Gatsby source (keep for reference)
```

### Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server

### Components Not Fully Migrated
The following Gatsby-specific components were replaced with standard implementations:
- `StaticImage` → `<img>` tags with static paths
- `GatsbyImage` → Standard images
- `Link` from Gatsby → `Link` from TanStack Router
- `useStaticQuery` → Removed (use props or context instead)

### Environment Variables
Update your `.env` files:
- `GATSBY_*` variables should become `VITE_*` for client-side access
- Server-side variables work without prefix

### What Still Works
- ✅ Emotion (CSS-in-JS)
- ✅ Framer Motion (animations)
- ✅ Apollo Client (for external GraphQL APIs)
- ✅ React Google Maps
- ✅ All existing styling and responsive design
- ✅ React Icons

### Known Limitations
1. Images are not optimized (consider adding `vite-plugin-imagetools` or similar)
2. Some Gatsby plugins need manual equivalents (e.g., manifest, offline support)
3. The build output is different (SSR-capable instead of fully static)

### Next Steps
1. Test the application thoroughly
2. Consider adding image optimization
3. Add PWA support if needed (Workbox + Vite plugin)
4. Update deployment configuration for Node.js hosting
