import {ApolloClient, InMemoryCache } from '@apollo/client';
import fetch from 'isomorphic-fetch';


export const client = new ApolloClient({
    uri: process.env.GRAPHCMS_ENDPOINT,
    // headers: {
    //   "Authorization": process.env.GRAPHCMS_ACCESS_TOKEN,
    // },
  cache: new InMemoryCache(),
  fetch
});

