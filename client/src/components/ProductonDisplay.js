import React, { Component } from "react";
import cart from "../assets/images/Empty Cart.png";

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
        <div className="product-details">
          <h2>{this.props.title}</h2>
          <h4>
            {this.props.currency} {this.props.price}
          </h4>
          <button className="add-to-cart">
            <img src={cart}></img>
          </button>
        </div>
      </div>
    );
  }
}

export default ProductonDisplay;
