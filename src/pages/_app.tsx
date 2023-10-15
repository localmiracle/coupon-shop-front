import { Provider } from 'react-redux';
import { ApolloProvider } from '@apollo/client';
import { useApollo } from '@/utils/apollo/client';
import store from './../redux/store';
import { AppProps } from 'next/app';
import '../styles/globals.css'


const MyApp = ({ Component, pageProps }: AppProps) => {
  const apolloClient = useApollo(pageProps.initialApolloState);

  return (
    <Provider store={store}>
    <ApolloProvider client={apolloClient}>
        <Component {...pageProps} />
    </ApolloProvider>
  </Provider>
  );
};

export default MyApp;