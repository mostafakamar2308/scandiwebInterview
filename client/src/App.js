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
import { Component } from "react";

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: "http://localhost:4000/graphql",
});
class App extends Component {
  constructor(props) {
    super(props);
    this.onCurrencyChange = this.onCurrencyChange.bind(this);
  }
  state = {
    currency: 0,
    cart: {},
  };

  onCurrencyChange(e) {
    this.setState({ ...this.state, currency: Number(e.target.id) });
  }
  render() {
    return (
      <ApolloProvider client={client}>
        <Router>
          <Header
            currency={this.state.currency}
            cart={this.state.cart}
            changeCurrency={this.onCurrencyChange}
          />
          <Routes>
            <Route exact path="/" element={<Navigate replace to="/all" />} />
            <Route
              exact
              path="/all"
              element={
                <All cart={this.state.cart} currency={this.state.currency} />
              }
            />
            <Route
              exact
              path="/tech"
              element={
                <Tech cart={this.state.cart} currency={this.state.currency} />
              }
            />
            <Route
              exact
              path="/clothes"
              element={
                <Clothes
                  cart={this.state.cart}
                  currency={this.state.currency}
                />
              }
            />
          </Routes>
        </Router>
      </ApolloProvider>
    );
  }
}

export default App;
