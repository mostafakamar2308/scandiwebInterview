import React, { Component } from "react";
import CategoryComponent from "./CategoryComponent";
import logo from "../assets/images/a-logo.png";
import BuyActions from "./BuyActions";

export default class Header extends Component {
  render() {
    return (
      <header className="header">
        <CategoryComponent />
        <div className="logo-container">
          <img src={logo} />
        </div>
        <BuyActions
          cart={this.props.cart}
          currency={this.props.currency}
          changeCurrency={this.props.changeCurrency}
          cartDisplay={this.props.cartDisplay}
        />
      </header>
    );
  }
}
