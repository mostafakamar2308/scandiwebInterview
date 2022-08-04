import React, { Component } from "react";

export class ProductonDisplay extends Component {
  render() {
    return (
      <div>
        <img src={this.props.image} />
        <h2>{this.props.title}</h2>
        <h4>
          {this.props.currency} {this.props.price}
        </h4>
      </div>
    );
  }
}

export default ProductonDisplay;
