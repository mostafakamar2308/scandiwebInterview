import { gql } from "graphql-request";
import React, { Component } from "react";
import request from "graphql-request";
import CartDisplay from "./CartDisplay";
import parse from "html-react-parser";

export class ProductPage extends Component {
  state = { product: {}, selectedImage: 0 };
  componentDidMount() {
    const path = window.location.pathname;
    const query = gql`
      query getProduct {
        product(id: "${path.slice(1)}") {
          name
          description
          id
          inStock
          gallery
          category
          brand
          attributes {
            items {
              id
              value
            }
            id
            name
          }
          prices {
            amount
            currency {
              symbol
            }
          }
        }
      }
    `;
    request("http://localhost:4000/graphql", query).then((data) => {
      console.log(data);
      const { product } = data;
      this.setState({ product: product });
    });
  }

  render() {
    return (
      <div className="product-container">
        {this.props.cartDisplay && (
          <div className="cartContainer" onClick={this.props.changeCartDisplay}>
            <CartDisplay
              cart={this.props.cart}
              display={this.props.cartDisplay}
              changeCartDisplay={this.props.changeCartDisplay}
              add={this.props.addToCart}
              remove={this.props.removeFromCart}
              currency={this.props.currency}
            />
          </div>
        )}
        <div className="product-page">
          <div className="image-container">
            <div className="images">
              {this.state.product.gallery &&
                this.state.product.gallery.map((ele, index) => (
                  <img
                    alt="pic"
                    src={ele}
                    id={index}
                    onClick={(e) => {
                      this.setState({
                        ...this.state,
                        selectedImage: Number(e.target.id),
                      });
                    }}
                  />
                ))}
            </div>
            <div className="selected-image">
              {this.state.product.gallery &&
                this.state.product.gallery.map((ele, index) => {
                  if (index === this.state.selectedImage)
                    return <img alt="pic" src={ele} />;
                })}
            </div>
          </div>
          <div className="product-details">
            <h1>{this.state.product.name}</h1>
            <p>{this.state.product.brand}</p>
            {this.state.product.attributes &&
              this.state.product.attributes.map((ele) => {
                return (
                  <div className="product-attr" key={ele.name}>
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
            <div className="price">
              <h3>Price</h3>
              <h2>
                {this.state.product.prices &&
                  this.state.product.prices[this.props.currency].currency
                    .symbol}
                {this.state.product.prices &&
                  this.state.product.prices[this.props.currency].amount}
              </h2>
            </div>
            {this.state.product.inStock ? (
              <button
                className="add-btn"
                onClick={this.props.addToCart}
                id={this.state.product.id}
              >
                ADD TO CART
              </button>
            ) : (
              <button className="no-stock">Out of Stock</button>
            )}
            <div className="product-description">
              {this.state.product.description &&
                parse(this.state.product.description)}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProductPage;
