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
  //pass the element displayed as a state to change when you click on it
  state = {
    selected: "all",
  };

  //the function which changes the selected state
  handleChangeInPage = (e) => {
    this.setState({ selected: e.target.textContent });
  };
  render() {
    return (
      <nav className="navigation">
        <Query query={GET_ALL_CATEGORIES_QUERY}>
          {({ loading, error, data }) => {
            if (loading) return <p>Loading Categories</p>;
            const { categories } = data;
            return categories.map((category, index) => (
              <Link
                to={`/${category.name}`}
                key={index}
                onClick={this.handleChangeInPage}
                className={
                  category.name === this.state.selected ? "selected" : ""
                }
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
