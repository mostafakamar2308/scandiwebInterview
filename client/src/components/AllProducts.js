import { gql } from "@apollo/client";
import { Query } from "@apollo/client/react/components";
import React, { Component } from "react";
import ProductonDisplay from "./ProductonDisplay";
const GET_ALL_PRODUCTS = gql`
  query getAllProducts {
    category(input: { title: "all" }) {
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

export class All extends Component {
  render() {
    return (
      <div className="All-container product-container">
        <h1>All</h1>
        <div className="products">
          <Query query={GET_ALL_PRODUCTS}>
            {({ loading, error, data }) => {
              if (loading) return <p>Loading Products</p>;
              const { category } = data;
              return category.products.map((product) => (
                <ProductonDisplay
                  title={product.name}
                  inStock={product.inStock}
                  image={product.gallery[0]}
                  price={product.prices[0].amount}
                  currency={product.prices[0].currency.symbol}
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
