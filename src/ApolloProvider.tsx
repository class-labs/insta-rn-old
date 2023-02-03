import { ReactNode, useState } from 'react';
import {
  ApolloClient,
  ApolloProvider as Provider,
  createHttpLink,
  InMemoryCache,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import { useAuth } from './support/Auth';

type Props = {
  children: ReactNode;
};

export function ApolloProvider(props: Props) {
  const { getAuthToken } = useAuth();
  const [client] = useState(() => {
    const httpLink = createHttpLink({
      uri: process.env.GRAPHQL_API + '/graphql',
    });

    const authLink = setContext((_, { headers }) => {
      // TODO: Remove this hard-coded token
      const token = getAuthToken() ?? 'q0486hx91';
      return {
        headers: {
          ...headers,
          authorization: `Bearer ${token}`,
        },
      };
    });

    return new ApolloClient({
      link: authLink.concat(httpLink),
      cache: new InMemoryCache(),
    });
  });
  return <Provider client={client}>{props.children}</Provider>;
}
