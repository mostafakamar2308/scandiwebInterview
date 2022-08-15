import React, { Component } from "react";
import { gql } from "@apollo/client";
import request from "graphql-request";
import { Query } from "@apollo/client/react/components";
import ProductInCart from "./ProductInCart";

export class Cart extends Component {
  constructor(props) {
    super(props);
    this.total = this.total.bind(this);
    this.nextImage = this.nextImage.bind(this);
    this.prevImage = this.prevImage.bind(this);
  }

  state = {
    cart: this.props.cart,
    totalAmount: [],
    currencySymbol: "$",
    pic: 0,
  };

  componentDidMount() {
    this.total(this.props.cart, this.props.currency);
  }
  componentDidUpdate(prevProps, prevState) {
    if (
      JSON.stringify(prevState.totalAmount) !=
        JSON.stringify(this.state.totalAmount) ||
      JSON.stringify(prevProps.cart) != JSON.stringify(this.props.cart) ||
      JSON.stringify(prevProps.currency) != JSON.stringify(this.props.currency)
    ) {
      this.total(this.props.cart, this.props.currency);
    }
  }
  total(cart, cur) {
    Promise.all(
      cart.map((ele) => {
        const query = gql`
        query getPrice {
          product(id: "${ele.id}") {
            prices {
              amount
              currency {
                symbol
              }
            }}}
      `;
        return request("http://localhost:4000/graphql", query).then((data) => {
          console.log(cur, data);
          const { product } = data;
          return product.prices[this.props.currency].amount * ele.amount;
        });
      })
    ).then((data) => {
      this.setState({ ...this.state, totalAmount: data });
    });
  }
  nextImage() {
    this.setState({
      ...this.state,
      pic: this.state.pic < 4 ? this.state.pic + 1 : 0,
    });
  }
  prevImage() {
    this.setState({
      ...this.state,
      pic: this.state.pic > 0 ? this.state.pic - 1 : 4,
    });
  }

  render() {
    return (
      <div className="cart-page">
        <div className="cart-details">
          <h1>Cart </h1>
        </div>
        <hr />
        {this.props.cart &&
          this.props.cart.map((ele) => {
            const query = gql`
          query getProduct {
            product(id: "${ele.id}") {
              name
              gallery
              prices {
                amount
                currency {
                  symbol
                }
              }
              attributes {
                id
                name
                items {
                  displayValue
                  value
                }
              }
            }
          }
        `;
            return (
              <Query query={query} key={ele.id}>
                {({ loading, error, data }) => {
                  if (loading) return null;
                  if (error) return console.log(error);
                  const { product } = data;
                  return (
                    <>
                      <ProductInCart
                        cart={
                          this.props.cart.filter(
                            (product) => product.id === ele.id
                          )[0]
                        }
                        add={this.props.add}
                        remove={this.props.remove}
                        id={ele.id}
                        name={product.name}
                        currency={
                          product.prices[this.props.currency].currency.symbol
                        }
                        changeCartAttr={this.props.changeCartAttr}
                        price={product.prices[this.props.currency].amount}
                        attr={product.attributes}
                        image={product.gallery[this.state.pic]}
                        nextImage={this.nextImage}
                        prevImage={this.prevImage}
                        amount={ele.amount}
                      />
                      <hr />
                    </>
                  );
                }}
              </Query>
            );
          })}
        <div className="cart-amount">
          <div>
            <p>Tax 21%:</p>{" "}
            <h3>
              {(
                this.state.totalAmount
                  .reduce((pre, cur) => pre + cur, 0)
                  .toFixed(2) * 0.21
              ).toFixed(2)}
            </h3>
          </div>
          <div>
            <p>Quantity:</p>
            <h3>{this.props.cart.reduce((pre, cur) => pre + cur.amount, 0)}</h3>
          </div>
          <div>
            <p>Total:</p>{" "}
            <h3>
              {(
                Number(
                  this.state.totalAmount
                    .reduce((pre, cur) => pre + cur, 0)
                    .toFixed(2)
                ) +
                0.21 *
                  Number(
                    this.state.totalAmount
                      .reduce((pre, cur) => pre + cur, 0)
                      .toFixed(2)
                  )
              ).toFixed(2)}
            </h3>
          </div>
          <button className="check-out">ORDER</button>
        </div>
      </div>
    );
  }
}

export default Cart;
