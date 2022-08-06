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
    currencyIndex: this.props.currency,
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
            <Query query={QUERY_CURRENCIES}>
              {({ data, loading }) => {
                if (loading) return null;
                const { currencies } = data;
                const curr = currencies.filter((currency, index) => {
                  if (index === this.state.currencyIndex) {
                    return <span>{currency.symbol}</span>;
                  }
                });
                console.log(curr[0].symbol);
                return <span>{curr[0].symbol}</span>;
              }}
            </Query>
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
                  return currencies.map((currency, index) => (
                    <button
                      id={index}
                      onClick={(e) => {
                        console.log(e.target);
                        this.props.changeCurrency(e);
                        this.setState({
                          currencyChangeOn: !this.state.currencyChangeOn,
                          currencyIndex: index,
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
