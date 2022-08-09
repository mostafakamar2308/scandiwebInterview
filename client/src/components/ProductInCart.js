import React, { Component } from "react";

export class ProductInCart extends Component {
  render() {
    return (
      <div className="product-in-cart">
        <div className="product-info">
          <h1 className="product-title">{this.props.name}</h1>
          <h3 className="product-price">
            {this.props.currency}
            {this.props.price}
          </h3>
          {this.props.attr.map((ele) => {
            return (
              <div className="product-attr">
                <div className="attr-name">{ele.name}</div>
                <div className="attr-items">
                  {ele.name === "Color"
                    ? ele.items.map((ele) => (
                        <button
                          className="attr-value"
                          id={ele.value}
                          style={{ background: ele.value }}
                        ></button>
                      ))
                    : ele.items.map((ele) => (
                        <button className="attr-value" id={ele.value}>
                          {ele.value}
                        </button>
                      ))}
                </div>
              </div>
            );
          })}
        </div>
        <div className="product-actions">
          <button id={this.props.id} onClick={this.props.add}>
            +
          </button>
          <div>{this.props.amount}</div>
          <button id={this.props.id} onClick={this.props.remove}>
            -
          </button>
        </div>
        <div className="product-Image">
          <img src={this.props.image} alt={this.props.name} />
        </div>
      </div>
    );
  }
}

export default ProductInCart;
