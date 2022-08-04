import React, { Component } from "react";
import { Query } from "@apollo/client/react/components";
import { gql } from "@apollo/client";
import { Link } from "react-router-dom";

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
      <nav className="navigation">
        <Query query={GET_ALL_CATEGORIES_QUERY}>
          {({ loading, error, data }) => {
            if (loading) return <p>Loading products</p>;
            const { categories } = data;
            return categories.map((category, index) => (
              <Link
                to={`/${category.name}`}
                href="google.com"
                className={index === 0 ? "selected" : ""}
              >
                {category.name}
              </Link>
            ));
          }}
        </Query>
      </nav>
    );
  }
}

export default CategoryComponent;
