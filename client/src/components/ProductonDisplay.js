import React, { Component } from "react";

export class ProductonDisplay extends Component {
  render() {
    return (
      <div
        className={`product ${
          this.props.inStock ? "ProductinStock" : "Productout-ofStock"
        }`}
      >
        <div className="product-image">
          <img src={this.props.image} />
          <h1 className={this.props.inStock ? "inStock" : "out-ofStock"}>
            "Out Of Stock"
          </h1>
        </div>
        <h2>{this.props.title}</h2>
        <h4>
          {this.props.currency} {this.props.price}
        </h4>
      </div>
    );
  }
}

export default ProductonDisplay;
