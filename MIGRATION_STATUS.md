# Migration Status: Gatsby to TanStack Start

## ✅ Completed Tasks

### 1. Dependencies Installed
- ✅ @tanstack/start
- ✅ @tanstack/react-router
- ✅ @tanstack/router-devtools
- ✅ @tanstack/router-plugin
- ✅ vite and vinxi
- ✅ All Gatsby dependencies removed

### 2. Project Structure Created
- ✅ `app/` directory structure
- ✅ `app/router.tsx` - Router configuration
- ✅ `app/client.tsx` - Client entry point
- ✅ `app/ssr.tsx` - Server entry point
- ✅ `app/routes/__root.tsx` - Root route with layout
- ✅ Configuration files (app.config.ts, vite.config.ts)

### 3. Routes Migrated
- ✅ `app/routes/index.tsx` - Home page (simplified version)
- ✅ `app/routes/impressum.tsx` - Impressum page
- ✅ `app/routes/datenschutz.tsx` - Datenschutz page

### 4. Components Migrated
- ✅ SEO component (using TanStack Start's useHead)
- ✅ Header component (with TanStack Router Link)
- ✅ Footer component
- ✅ Styles (emotion styled components)
- ✅ GoogleMap, TeamCard, KontaktIcon, Preislisten (copied)

### 5. Styles & Assets
- ✅ CSS files copied to app/styles/
- ✅ Font paths updated
- ✅ Images remain in src/images/ (accessible via /src/images/)

### 6. Configuration Files Updated
- ✅ package.json scripts updated
- ✅ tsconfig.json updated for TanStack Start
- ✅ .gitignore updated
- ✅ Added "type": "module" to package.json

### 7. Apollo Client
- ✅ Updated for TanStack Start environment
- ✅ Located at `app/lib/apollo-client.ts`

## ⚠️ Known Issues

### Critical Issue: Package Version Incompatibility
The current version of `@tanstack/start` (1.120.20) has an incompatibility with `@tanstack/router-generator`. The error message:
```
SyntaxError: The requested module '@tanstack/router-generator' does not provide an export named 'CONSTANTS'
```

**Solutions:**
1. Wait for `@tanstack/start` to update to a compatible version
2. Use a different version combination that works
3. Consider using plain TanStack Router without Start (more manual setup but stable)

### Workaround Options:

#### Option A: Use TanStack Router (without Start)
This removes the SSR capabilities but gives you a working client-side app:
```bash
npm uninstall @tanstack/start vinxi
npm install @tanstack/react-router@latest
# Update to use standard Vite instead of Vinxi
```

#### Option B: Wait and Monitor
Check for updates to @tanstack/start that fix the compatibility issue:
```bash
npm outdated
npm update @tanstack/start
```

## 📝 Additional Work Needed (Once Server Starts)

### Image Optimization
- Gatsby Image components replaced with standard `<img>` tags
- Consider adding:
  - `vite-plugin-imagetools` for optimization
  - Or `@unpic/react` for modern image handling

### Testing Required
- [ ] Test all routes (/, /impressum, /datenschutz)
- [ ] Test responsive design (desktop/mobile)
- [ ] Test all animations and interactions
- [ ] Test Google Maps integration
- [ ] Test Apollo Client GraphQL queries (if any)

### PWA Features (if needed)
- [ ] Add service worker (Workbox)
- [ ] Add manifest.json
- [ ] Configure offline support

### Deployment
- [ ] Update deployment config for Node.js server (not static hosting)
- [ ] Configure environment variables
- [ ] Set up production build pipeline

## 🔄 Alternative: Plain TanStack Router Migration

If you prefer a working solution immediately, I can migrate to plain TanStack Router (without Start), which:
- ✅ Works with current packages
- ✅ Fully client-side rendered
- ✅ Uses standard Vite
- ❌ No SSR capabilities
- ❌ No server functions

Let me know if you'd like me to pivot to this approach!

## 📚 Resources
- [TanStack Start Docs](https://tanstack.com/start)
- [TanStack Router Docs](https://tanstack.com/router)
- [Migration Guide](./MIGRATION.md)
