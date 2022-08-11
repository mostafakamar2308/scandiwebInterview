import { gql } from "@apollo/client";
import { Query } from "@apollo/client/react/components";
import React, { Component } from "react";
import CartDisplay from "./CartDisplay";
import ProductonDisplay from "./ProductonDisplay";
import { Route, Routes } from "react-router";
const GET_ALL_PRODUCTS = gql`
  query getAllProducts {
    category(input: { title: "all" }) {
      name
      products {
        id
        name
        inStock
        gallery
        prices {
          amount
          currency {
            symbol
          }
        }
      }
    }
  }
`;

export class All extends Component {
  render() {
    return (
      <div className="All-container product-container">
        <CartDisplay
          cart={this.props.cart}
          display={this.props.cartDisplay}
          changeCartDisplay={this.props.changeCartDisplay}
          add={this.props.addToCart}
          remove={this.props.removeFromCart}
        />
        <h1>All</h1>
        <div className="products">
          <Query query={GET_ALL_PRODUCTS}>
            {({ loading, error, data }) => {
              if (loading) return <p>Loading Products</p>;
              const { category } = data;
              return category.products.map((product) => (
                <ProductonDisplay
                  id={product.id}
                  add={this.props.addToCart}
                  title={product.name}
                  inStock={product.inStock}
                  image={product.gallery[0]}
                  price={product.prices[this.props.currency].amount}
                  currency={product.prices[this.props.currency].currency.symbol}
                />
              ));
            }}
          </Query>
        </div>
      </div>
    );
  }
}

export default All;
