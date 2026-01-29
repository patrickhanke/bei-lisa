import React from 'react';
import type { GatsbySSR } from 'gatsby';
import { ApolloProvider } from '@apollo/client';
import { client } from './src/provider/apollo/client';

export const wrapRootElement: GatsbySSR['wrapRootElement'] = ({ element }) => (
  <ApolloProvider client={client}>
    {element}
  </ApolloProvider>
);
