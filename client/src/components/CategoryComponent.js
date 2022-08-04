import React, { Component } from "react";
import { Query } from "@apollo/client/react/components";
import { gql } from "@apollo/client";

//the query function to get all categories available.
const GET_ALL_CATEGORIES_QUERY = gql`
  query getAllProducts {
    categories {
      name
    }
  }
`;

export class CategoryComponent extends Component {
  render() {
    return (
      <Query query={GET_ALL_CATEGORIES_QUERY}>
        {({ loading, error, data }) => {
          if (loading) return <p>Loading products</p>;
          const { categories } = data;
          return categories.map((category) => (
            <a href="google.com">{category.name}</a>
          ));
        }}
      </Query>
    );
  }
}

export default CategoryComponent;
