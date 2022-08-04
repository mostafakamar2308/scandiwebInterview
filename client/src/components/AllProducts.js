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
      <div>
        <h1>All</h1>
        <Query query={GET_ALL_PRODUCTS}>
          {({ loading, error, data }) => {
            if (loading) return <p>Loading Products</p>;
            const { category } = data;
            return category.products.map((product) => (
              <ProductonDisplay
                title={product.name}
                image={product.gallery[0]}
                price={product.prices[0].amount}
                currency={product.prices[0].currency.symbol}
              />
            ));
          }}
        </Query>
      </div>
    );
  }
}

export default All;
