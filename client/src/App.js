import "./App.css";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import request, { gql } from "graphql-request";
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
import ProductPage from "./components/ProductPage";
import Cart from "./components/Cart";

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: "http://localhost:4000/graphql",
});
let attr = [];
class App extends Component {
  constructor(props) {
    super(props);
    this.onCurrencyChange = this.onCurrencyChange.bind(this);
    this.onCartDisplay = this.onCartDisplay.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.changeCartAttr = this.changeCartAttr.bind(this);
    this.addAttributedProduct = this.addAttributedProduct.bind(this);
  }
  state = {
    currency: 0,
    cartDisplay: false,
    cart: [],
  };
  changeCartAttr(selectedAttrs) {
    this.setState({
      ...this.state,
      cart: this.state.cart.map((ele) => {
        return { ...ele, attr: selectedAttrs };
      }),
    });
  }

  onCurrencyChange(e) {
    this.setState({ ...this.state, currency: Number(e.target.id) });
  }
  async checkAttr(id) {
    const query = gql`
    query getProduct {
    product(id: "${id}"){
    attributes{
    id
    items{value}}
    }
    }
    `;
    const data = await request("http://localhost:4000/graphql", query);
    const { product } = data;
    return product.attributes.length > 0
      ? product.attributes.map((ele) => {
          return {
            id: ele.id,
            value: ele.items[0].value,
          };
        })
      : null;
  }
  assignPromiseToVal(res) {
    console.log(res);
    attr = res;
  }
  addAttributedProduct(e, attributes) {
    let addedItemId = e.target.id || e.target.parentNode.id;
    this.checkAttr(addedItemId)
      .then(this.assignPromiseToVal)
      .then((data) => {
        let cartContainItem = this.state.cart.filter(
          (ele) => ele.id === addedItemId
        );
        if (cartContainItem.length > 0) {
          console.log(this.state.cart);
          this.setState({
            ...this.state,
            cart: [
              ...this.state.cart.filter((ele) => ele.id !== addedItemId),
              {
                id: addedItemId,
                amount: cartContainItem[0].amount + 1,
                attr: attributes,
              },
            ],
          });
        } else {
          this.setState({
            ...this.state,
            cart: [
              ...this.state.cart,
              { id: addedItemId, amount: 1, attr: attributes },
            ],
          });
        }
      });
  }
  addToCart(e) {
    let addedItemId = e.target.id || e.target.parentNode.id;
    this.checkAttr(addedItemId)
      .then(this.assignPromiseToVal)
      .then((data) => {
        let cartContainItem = this.state.cart.filter(
          (ele) => ele.id === addedItemId
        );
        if (cartContainItem.length > 0) {
          console.log(this.state.cart);
          this.setState({
            ...this.state,
            cart: [
              ...this.state.cart.filter((ele) => ele.id !== addedItemId),
              {
                id: addedItemId,
                amount: cartContainItem[0].amount + 1,
                attr: attr,
              },
            ],
          });
        } else {
          this.setState({
            ...this.state,
            cart: [
              ...this.state.cart,
              { id: addedItemId, amount: 1, attr: attr },
            ],
          });
        }
      });
  }

  removeItem(e) {
    let removedItemId = e.target.id || e.target.parentNode.id;
    let cartContainItem = this.state.cart.filter(
      (ele) => ele.id === removedItemId
    );
    if (cartContainItem[0].amount > 1) {
      this.setState({
        ...this.state,
        cart: [
          ...this.state.cart.filter((ele) => ele.id !== removedItemId),
          { id: removedItemId, amount: cartContainItem[0].amount - 1 },
        ],
      });
    } else {
      this.setState({
        ...this.state,
        cart: [...this.state.cart.filter((ele) => ele.id !== removedItemId)],
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
              path="/all/*"
              element={
                <All
                  cart={this.state.cart}
                  currency={this.state.currency}
                  changeCartDisplay={this.onCartDisplay}
                  cartDisplay={this.state.cartDisplay}
                  changeCartAttr={this.changeCartAttr}
                  addToCart={this.addToCart}
                  removeFromCart={this.removeItem}
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
                  changeCartAttr={this.changeCartAttr}
                  cartDisplay={this.state.cartDisplay}
                  addToCart={this.addToCart}
                  removeFromCart={this.removeItem}
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
                  cartDisplay={this.state.cartDisplay}
                  changeCartAttr={this.changeCartAttr}
                  addToCart={this.addToCart}
                  removeFromCart={this.removeItem}
                />
              }
            />
            <Route
              exact
              path="/cart"
              element={
                <Cart
                  cart={this.state.cart}
                  display={this.state.cartDisplay}
                  add={this.addToCart}
                  remove={this.removeItem}
                  currency={this.state.currency}
                  changeCartAttr={this.changeCartAttr}
                />
              }
            />
            <Route
              exact
              path={`/:id`}
              element={
                <ProductPage
                  cart={this.state.cart}
                  cartDisplay={this.state.cartDisplay}
                  changeCartDisplay={this.onCartDisplay}
                  addToCart={this.addAttributedProduct}
                  changeCartAttr={this.changeCartAttr}
                  remove={this.removeItem}
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
