import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'
import viteTsConfigPaths from 'vite-tsconfig-paths'
import { staticGraphQLPlugin } from './build-plugins'

export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  const env = loadEnv(mode, process.cwd(), '')
  
  return {
    plugins: [
      staticGraphQLPlugin({
        endpoint: env.GATSBY_PATSTORE_GRAPHQL_API_URL || env.VITE_GRAPHCMS_ENDPOINT || '',
        appId: env.GATSBY_PATSTORE_APP_ID || '',
        restKey: env.GATSBY_PATSTORE_REST_KEY || '',
        masterKey: env.GATSBY_PATSTORE_MASTER_KEY || '',
        projectId: env.GATSBY_PATSTORE_PROJECT_ID || '',
        outputDir: 'src/static-data',
        dataFileName: 'build-time-data.json',
        filesDir: 'src/static-data',
      }),
      TanStackRouterVite({
        routesDirectory: './app/routes',
        generatedRouteTree: './app/routeTree.gen.ts',
      }),
      react({
        jsxImportSource: '@emotion/react',
        babel: {
          plugins: ['@emotion/babel-plugin'],
        },
      }),
      viteTsConfigPaths({
        projects: ['./tsconfig.json'],
      }),
    ],
    resolve: {
      alias: {
        '@': '/app',
      },
    },
    publicDir: 'src',
  }
})
