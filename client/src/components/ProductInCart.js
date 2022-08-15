import React, { Component } from "react";

export class ProductInCart extends Component {
  state = {
    selectedAttr: [
      ...this.props.cart.attr.map((ele) => {
        return { name: ele.name || ele.id, value: ele.value };
      }),
    ],
  };
  changeAttr(id, changedAttr) {
    let newAttrs = [
      ...this.state.selectedAttr.map((attr) => {
        if (attr.name === changedAttr) {
          return { name: changedAttr, value: id };
        }
        return attr;
      }),
    ];
    this.props.changeCartAttr(newAttrs);
    this.setState({
      ...this.state,
      selectedAttr: newAttrs,
    });
  }
  render() {
    return (
      <div className="product-in-cart">
        <div className="product-info">
          <div>
            <h1 className="product-title">{this.props.name}</h1>
            <h2 className="product-brand">{this.props.brand}</h2>
            <h3 className="product-price">
              {this.props.currency}
              {this.props.price}
            </h3>
          </div>
          {this.props.attr.map((ele, attrIndex) => {
            return (
              <div className="product-attr" key={ele.name}>
                <div className="attr-name">{ele.name}</div>
                <div className="attr-items">
                  {ele.name === "Color"
                    ? ele.items.map((elem, index) => (
                        <button
                          className={`attr-value ${
                            this.state.selectedAttr[attrIndex].value ===
                              elem.value && "selected-color"
                          }`}
                          id={elem.value}
                          onClick={(e) =>
                            this.changeAttr(e.target.id, ele.name)
                          }
                          style={{ background: elem.value }}
                        ></button>
                      ))
                    : ele.items.map((elem, index) => {
                        return (
                          <button
                            className={`attr-value ${
                              this.state.selectedAttr[attrIndex].value ===
                                elem.value && "selected-attr"
                            }`}
                            onClick={(e) =>
                              this.changeAttr(e.target.id, ele.name)
                            }
                            id={elem.value}
                          >
                            {elem.value}
                          </button>
                        );
                      })}
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
          <div className="product-Image-actions">
            <button onClick={this.props.prevImage}>{"<"}</button>
            <button onClick={this.props.nextImage}>{">"}</button>
          </div>
        </div>
      </div>
    );
  }
}

export default ProductInCart;
