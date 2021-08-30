import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import client from "../apollo-client";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { reducer } from "../src/redux";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={createStore(reducer)}>
      <ApolloProvider client={client}>
        <Component {...pageProps} />
      </ApolloProvider>
    </Provider>
  );
}
export default MyApp;
