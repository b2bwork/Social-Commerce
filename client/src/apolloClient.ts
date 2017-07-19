import {ApolloClient , createNetworkInterface } from 'apollo-client';

const client = new ApolloClient({
  networkInterface: createNetworkInterface({
    uri: 'http://localhost:4200'
  }),
});

export function Client(): ApolloClient {
  return client;
}

