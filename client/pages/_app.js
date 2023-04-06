import "semantic-ui-css/semantic.min.css";
import "@/styles/globals.css";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import Layout from "@/components/Layout";
import { StateContext } from "@/context/auth";
const client = new ApolloClient({
  uri: "http://localhost:5000/graphql",
  cache: new InMemoryCache(),
});
import { AuthProvider, AuthContext } from "@/context/auth";

export default function App({ Component, pageProps }) {
  return (
    <StateContext>
      <ApolloProvider client={client}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ApolloProvider>
    </StateContext>
  );
}
