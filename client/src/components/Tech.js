import React, { Component } from "react";
import { gql } from "@apollo/client";
import { Query } from "@apollo/client/react/components";
import ProductonDisplay from "./ProductonDisplay";
import CartDisplay from "./CartDisplay";

const GET_TECH_PRODUCTS = gql`
  query getAllProducts {
    category(input: { title: "tech" }) {
      name
      products {
        name
        id
        brand
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

export class Tech extends Component {
  render() {
    return (
      <div className="All-container product-container">
        {this.props.cartDisplay && (
          <div className="cartContainer" onClick={this.props.changeCartDisplay}>
            <CartDisplay
              cart={this.props.cart}
              display={this.props.cartDisplay}
              changeCartAttr={this.props.changeCartAttr}
              changeCartDisplay={this.props.changeCartDisplay}
              add={this.props.addToCart}
              remove={this.props.removeFromCart}
              currency={this.props.currency}
            />
          </div>
        )}
        <h1>Tech</h1>
        <div className="products">
          <Query query={GET_TECH_PRODUCTS}>
            {({ loading, error, data }) => {
              if (loading) return <p>Loading Products</p>;
              const { category } = data;
              return category.products.map((product) => (
                <ProductonDisplay
                  title={product.name}
                  brand={product.brand}
                  add={this.props.addToCart}
                  inStock={product.inStock}
                  id={product.id}
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

export default Tech;
