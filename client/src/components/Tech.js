import React, { Component } from "react";
import { gql } from "@apollo/client";
import { Query } from "@apollo/client/react/components";
import ProductonDisplay from "./ProductonDisplay";

const GET_TECH_PRODUCTS = gql`
  query getAllProducts {
    category(input: { title: "tech" }) {
      name
      products {
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

export class Tech extends Component {
  render() {
    return (
      <div className="All-container product-container">
        <h1>Tech</h1>
        <div className="products">
          <Query query={GET_TECH_PRODUCTS}>
            {({ loading, error, data }) => {
              if (loading) return <p>Loading Products</p>;
              const { category } = data;
              return category.products.map((product) => (
                <ProductonDisplay
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

export default Tech;
