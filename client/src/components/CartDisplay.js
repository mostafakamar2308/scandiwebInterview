import React, { Component } from "react";
import { gql } from "@apollo/client";
import { Query } from "@apollo/client/react/components";
import ProductInCart from "./ProductInCart";
import TotalAmount from "./TotalAmount";
import { Link } from "react-router-dom";

export class CartDisplay extends Component {
  render() {
    if (this.props.display) {
      return (
        <div className="cart">
          <div className="cart-details">
            <h1>My Bag: </h1>
            <h3>
              {this.props.cart.reduce((pre, cur) => pre + cur.amount, 0)} items
            </h3>
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
              <Query query={query} key={ele.id}>
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
                        currency={
                          product.prices[this.props.currency].currency.symbol
                        }
                        price={product.prices[this.props.currency].amount}
                        attr={product.attributes}
                        image={product.gallery[0]}
                        amount={ele.amount}
                      />
                    </>
                  );
                }}
              </Query>
            );
          })}
          <div className="cart-amount">
            <TotalAmount
              cart={this.props.cart}
              currency={this.props.currency}
            />
          </div>
          <div className="cart-actions">
            <Link to={"/cart"}>VIEW CART</Link>
            <button>CHECK OUT</button>
          </div>
        </div>
      );
    }
  }
}

export default CartDisplay;
