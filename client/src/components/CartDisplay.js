import React, { Component } from "react";

export class CartDisplay extends Component {
  render() {
    if (this.props.display) {
      return (
        <div className="cartContainer" onClick={this.props.changeCartDisplay}>
          <div className="cart">Cart</div>
        </div>
      );
    }
  }
}

export default CartDisplay;
