import { ApolloClient, InMemoryCache } from '@apollo/client';

export const client = new ApolloClient({
  uri: import.meta.env.VITE_GRAPHCMS_ENDPOINT || process.env.GRAPHCMS_ENDPOINT,
  cache: new InMemoryCache(),
  ssrMode: typeof window === 'undefined',
});
