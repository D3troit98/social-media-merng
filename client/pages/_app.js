import "semantic-ui-css/semantic.min.css";
import "@/styles/globals.css";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import Layout from "@/components/Layout";
import { StateContext } from "@/context/auth";
import { setContext } from "@apollo/client/link/context";

const authLink = setContext(() => {
  const token = localStorage.getItem("jwtToken");
  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const httpLink = createHttpLink({
  uri: "http://localhost:5000/graphql",
});
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});





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
