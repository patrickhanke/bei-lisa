import { ApolloClient, InMemoryCache } from '@apollo/client/core/index.js';

export const client = new ApolloClient({
  uri: (import.meta.env?.VITE_GRAPHCMS_ENDPOINT as string | undefined) || process.env.GRAPHCMS_ENDPOINT,
  cache: new InMemoryCache(),
  ssrMode: typeof window === 'undefined',
});
