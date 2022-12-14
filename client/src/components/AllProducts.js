import { gql, throwServerError } from "@apollo/client";
import { Query } from "@apollo/client/react/components";
import React, { Component } from "react";
import CartDisplay from "./CartDisplay";
import ProductonDisplay from "./ProductonDisplay";
const GET_ALL_PRODUCTS = gql`
  query getAllProducts {
    category(input: { title: "all" }) {
      name

      products {
        brand
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
        <h1>All</h1>
        <div className="products">
          <Query query={GET_ALL_PRODUCTS}>
            {({ loading, error, data }) => {
              if (loading) return <p>Loading Products</p>;
              const { category } = data;
              return category.products.map((product) => (
                <ProductonDisplay
                  id={product.id}
                  brand={product.brand}
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
