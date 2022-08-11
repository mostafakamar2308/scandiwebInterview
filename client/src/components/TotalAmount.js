import { gql } from "@apollo/client";
import { request } from "graphql-request";
import React, { Component } from "react";

export class TotalAmount extends Component {
  // constructor(props) {
  //   super(props);
  //    this.total = this.total.bind(this);
  // }

  state = {
    totalAmount: [],
  };

  componentDidMount() {
    this.total();
  }
  componentDidUpdate(prevProps, prevState) {
    if (JSON.stringify(prevProps.cart) !== JSON.stringify(this.props.cart)) {
      this.total();
    }
  }
  total() {
    let totalArr = [];
    this.props.cart.forEach((ele) => {
      const query = gql`
        query getPrice {
          product(id: "${ele.id}") {
            prices {
              amount
              currency {
                symbol
              }
            }}}
      `;
      request("http://localhost:4000/graphql", query).then((data) => {
        console.log(data);
        const { product } = data;
        totalArr.push(product.prices[0].amount);
      });
      // <Query key={ele.id} query={query}>
      //   {({ loading, error, data }) => {
      //     if (loading) return null;
      //     if (error) {
      //       console.log(error);
      //       return null;
      //     }
      //     if (data) {
      //       console.log(data);
      //       const { product } = data;
      //       console.log(product);
      //       totalArr.push(product.prices[0].amount);
      //     }
      //   }}
      // </Query>;
    });
    this.setState({ totalAmount: totalArr });
  }

  render() {
    return (
      <div>
        <h3>Total</h3>
        {/* <p>{this.state.totalArr.reduce((pre, cur) => pre + cur, 0)}</p> */}
        <p>{this.state.totalAmount.reduce((pre, cur) => pre + cur, 0)}</p>
      </div>
    );
  }
}

export default TotalAmount;
