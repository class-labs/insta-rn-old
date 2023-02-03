import { ReactNode } from 'react';
import {
  ApolloClient,
  ApolloProvider as Provider,
  createHttpLink,
  InMemoryCache,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: process.env.GRAPHQL_API + '/graphql',
});

const authLink = setContext(() => {
  const token = 'q0486hx91';
  return {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

type Props = {
  children: ReactNode;
};

export function ApolloProvider(props: Props) {
  return <Provider client={client}>{props.children}</Provider>;
}
