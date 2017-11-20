import { ApolloClient, createNetworkInterface } from 'react-apollo';
import { SubscriptionClient, addGraphQLSubscriptions } from 'subscriptions-transport-ws';
import fetch from 'isomorphic-fetch';

import { apiUrl, subscriptionUrl } from 'config';

let apolloClient = null;

// Polyfill fetch() on the server (used by apollo-client)
if (!process.browser) {
  global.fetch = fetch;
}

function create(wsClient) {
  const networkInterface = createNetworkInterface({
    uri: apiUrl, // Server URL (must be absolute)
    opts: { // Additional fetch() options like `credentials` or `headers`
      credentials: 'same-origin'
    }
  });

  const combinedNetworkInterface = wsClient
    ? addGraphQLSubscriptions(networkInterface, wsClient)
    : networkInterface;

  return new ApolloClient({
    ssrMode: !process.browser, // Disables forceFetch on the server (so queries are only run once)
    networkInterface: combinedNetworkInterface,
    dataIdFromObject: o => o.id
  });
}

export default function initApollo() {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (!process.browser) {
    return create();
  }

  // Reuse client on the client-side
  if (!apolloClient) {
    const wsClient = new SubscriptionClient(subscriptionUrl, {
      reconnect: true,
      timeout: 50000
    });

    apolloClient = create(wsClient);
  }

  return apolloClient;
}
