import React, { Component } from "react";
import cart from "../assets/images/cart-vector.png";
import upArrow from "../assets/images/up-arrow.png";
import downArrow from "../assets/images/down-arrow.png";
import { Query } from "@apollo/client/react/components";
import { gql } from "@apollo/client";

const QUERY_CURRENCIES = gql`
  query getAllProducts {
    currencies {
      label
      symbol
    }
  }
`;
export class BuyActions extends Component {
  state = {
    currencyChangeOn: false,
    currency: "$",
  };
  render() {
    return (
      <div className="buy-actions">
        <div className="currency">
          <button
            onClick={() =>
              this.setState({ currencyChangeOn: !this.state.currencyChangeOn })
            }
          >
            {this.state.currency}
            <img
              src={this.state.currencyChangeOn ? upArrow : downArrow}
              alt="arrow"
            ></img>
          </button>
          {this.state.currencyChangeOn && (
            <div className="currency-container">
              <Query query={QUERY_CURRENCIES}>
                {({ data, loading }) => {
                  if (loading) return <button>Loading currencies</button>;
                  const { currencies } = data;
                  return currencies.map((currency) => (
                    <button
                      onClick={() => {
                        this.setState({
                          currencyChangeOn: !this.state.currencyChangeOn,
                          currency: currency.symbol,
                        });
                      }}
                    >
                      {currency.symbol} {currency.label}
                    </button>
                  ));
                }}
              </Query>
            </div>
          )}
        </div>
        <button>
          <img src={cart}></img>
        </button>
      </div>
    );
  }
}

export default BuyActions;
