import { gql } from "@apollo/client";
import { request } from "graphql-request";
import React, { Component } from "react";

const queryOfCur = gql`
  query getAllProducts {
    currencies {
      symbol
    }
  }
`;
export class TotalAmount extends Component {
  constructor(props) {
    super(props);
    this.total = this.total.bind(this);
  }

  state = {
    cart: this.props.cart,
    totalAmount: [],
    currencySymbol: "$",
  };

  componentDidMount() {
    this.total(this.props.cart, this.props.currency);
  }
  componentDidUpdate(prevProps, prevState) {
    if (
      JSON.stringify(prevState.totalAmount) !=
        JSON.stringify(this.state.totalAmount) ||
      JSON.stringify(prevProps.cart) != JSON.stringify(this.props.cart) ||
      JSON.stringify(prevProps.currency) != JSON.stringify(this.props.currency)
    ) {
      this.total(this.props.cart, this.props.currency);
    }
  }
  total(cart, cur) {
    Promise.all(
      cart.map((ele) => {
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
        return request("http://localhost:4000/graphql", query).then((data) => {
          console.log(cur, data);
          const { product } = data;
          return product.prices[this.props.currency].amount * ele.amount;
        });
      })
    ).then((data) => {
      this.setState({ ...this.state, totalAmount: data });
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
  }
  render() {
    return (
      <>
        <h3>Total</h3>
        {/* <p>{this.state.totalArr.reduce((pre, cur) => pre + cur, 0)}</p> */}
        <p className="amount">
          {this.state.cart.length > 0
            ? (
                Number(
                  this.state.totalAmount
                    .reduce((pre, cur) => pre + cur, 0)
                    .toFixed(2)
                ) +
                0.21 *
                  Number(
                    this.state.totalAmount
                      .reduce((pre, cur) => pre + cur, 0)
                      .toFixed(2)
                  )
              ).toFixed(2)
            : 0}
        </p>
      </>
    );
  }
}

export default TotalAmount;
