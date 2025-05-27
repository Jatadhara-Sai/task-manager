import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_URL || 'https://task-manager-1-x390.onrender.com',
  cache: new InMemoryCache(),
});

export default client;
