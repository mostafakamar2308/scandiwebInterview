import React, { Component } from "react";
import CategoryComponent from "./CategoryComponent";

export default class Header extends Component {
  render() {
    return (
      <header>
        <CategoryComponent />
      </header>
    );
  }
}
