import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://task-manager-1-x390.onrender.com/graphql', 
  cache: new InMemoryCache(),
});

export default client;
