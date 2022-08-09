import React, { Component } from "react";
import { gql } from "@apollo/client";
import { Query } from "@apollo/client/react/components";
import ProductInCart from "./ProductInCart";

export class CartDisplay extends Component {
  render() {
    if (this.props.display) {
      return (
        <div className="cartContainer" onClick={this.props.changeCartDisplay}>
          <div className="cart">
            <div className="cart-details">
              <h1>My Bag: </h1>
              <h3>{this.props.cart.length} items</h3>
            </div>
            {this.props.cart.map((ele) => {
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
                <Query query={query}>
                  {({ loading, error, data }) => {
                    if (loading) return null;
                    if (error) return console.log(error);
                    const { product } = data;
                    return (
                      <>
                        <ProductInCart
                          add={this.props.add}
                          remove={this.props.remove}
                          id={ele.id}
                          name={product.name}
                          currency={product.prices[0].currency.symbol}
                          price={product.prices[0].amount}
                          attr={product.attributes}
                          image={product.gallery[0]}
                          amount={ele.amount}
                        />
                        <hr />
                      </>
                    );
                  }}
                </Query>
              );
            })}
          </div>
        </div>
      );
    }
  }
}

export default CartDisplay;
