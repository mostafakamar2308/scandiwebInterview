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
    this.onCartDisplay = this.onCartDisplay.bind(this);
    this.addToCart = this.addToCart.bind(this);
  }
  state = {
    currency: 0,
    cartDisplay: false,
    cart: [
      {
        id: "jacket-canada-goosee",
        amount: 1,
      },
    ],
  };

  onCurrencyChange(e) {
    this.setState({ ...this.state, currency: Number(e.target.id) });
  }
  addToCart(e) {
    let addedItemId = e.target.parentNode.id;
    console.log(e.target.parentNode.id);
    let cartContainItem = this.state.cart.filter(
      (ele) => ele.id === addedItemId
    );
    console.log(cartContainItem);
    if (cartContainItem.length > 0) {
      this.setState({
        ...this.state,
        cart: [
          ...this.state.cart.filter((ele) => ele.id !== addedItemId),
          { id: addedItemId, amount: cartContainItem[0].amount + 1 },
        ],
      });
    } else {
      this.setState({
        ...this.state,
        cart: [...this.state.cart, { id: addedItemId, amount: 1 }],
      });
    }
    console.log(this.state);
  }
  onCartDisplay(e) {
    if (
      e.target.className === "cartContainer" ||
      e.target.className === "cart-btn" ||
      e.target.parentNode.className === "cart-btn"
    ) {
      this.setState({ ...this.state, cartDisplay: !this.state.cartDisplay });
    }
  }
  render() {
    return (
      <ApolloProvider client={client}>
        <Router>
          <Header
            currency={this.state.currency}
            cart={this.state.cart}
            changeCurrency={this.onCurrencyChange}
            cartDisplay={this.onCartDisplay}
          />
          <Routes>
            <Route exact path="/" element={<Navigate replace to="/all" />} />
            <Route
              exact
              path="/all"
              element={
                <All
                  cart={this.state.cart}
                  currency={this.state.currency}
                  changeCartDisplay={this.onCartDisplay}
                  cartDisplay={this.state.cartDisplay}
                  addToCart={this.addToCart}
                />
              }
            />
            <Route
              exact
              path="/tech"
              element={
                <Tech
                  cart={this.state.cart}
                  currency={this.state.currency}
                  changeCartDisplay={this.onCartDisplay}
                  addToCart={this.addToCart}
                  cartDisplay={this.state.cartDisplay}
                />
              }
            />
            <Route
              exact
              path="/clothes"
              element={
                <Clothes
                  cart={this.state.cart}
                  currency={this.state.currency}
                  changeCartDisplay={this.onCartDisplay}
                  addToCart={this.addToCart}
                  cartDisplay={this.state.cartDisplay}
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
