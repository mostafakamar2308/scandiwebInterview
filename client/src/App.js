import "./App.css";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
// import DataDisplayDemo from "./components/DataDisplayDemo";
import Header from "./components/Header";
import All from "./components/AllProducts";
import Tech from "./components/Tech";
import Clothes from "./components/Clothes";

function App() {
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri: "http://localhost:4000/graphql",
  });
  return (
    <ApolloProvider client={client}>
      <Router>
        <Header />
        <Routes>
          <Route exact path="/" element={<Navigate replace to="/all" />} />
          <Route exact path="/all" element={<All />} />
          <Route exact path="/tech" element={<Tech />} />
          <Route exact path="/clothes" element={<Clothes />} />
        </Routes>
      </Router>
    </ApolloProvider>
  );
}

export default App;
