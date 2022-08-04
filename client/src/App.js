import "./App.css";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
// import DataDisplayDemo from "./components/DataDisplayDemo";
import Header from "./components/Header";

function App() {
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri: "http://localhost:4000/graphql",
  });
  return (
    <ApolloProvider client={client}>
      {/* <div className="App">Hello World</div>
      <DataDisplayDemo /> */}
      <Header />
    </ApolloProvider>
  );
}

export default App;
