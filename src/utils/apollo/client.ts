import { ApolloClient, InMemoryCache } from "@apollo/client";
import merge from "deepmerge";
import { useMemo } from "react";

let apolloClient: ApolloClient<any>;

function createApolloClient() {
  return new ApolloClient({
    // uri: "https://shop-smart-api-1c3c0f010f3b.herokuapp.com/query",
    uri: "http://localhost:8080",
    cache: new InMemoryCache(),
    
  });
}

export function initializeApollo(initialState = {}) {
  const _apolloClient = apolloClient ?? createApolloClient();

  if (initialState) {
    // Получение кэша Apollo Client
    const existingCache = _apolloClient.extract();
    // Объединение начального состояния с существующим кэшем
    const data = merge(initialState, existingCache);

    // Восстановление состояния кэша
    _apolloClient.cache.restore(data);
  }

  if (!apolloClient) apolloClient = _apolloClient;
  return _apolloClient;
}

export function useApollo(initialState: any) {
  const store = useMemo(() => initializeApollo(initialState), [initialState]);
  return store;
}
