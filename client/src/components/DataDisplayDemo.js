import React from "react";
import { useQuery, gql } from "@apollo/client";
const displayItemById = gql`
  query getAllProducts {
    product(id: "ps-5") {
      inStock
      gallery
      description
      attributes {
        type
      }
    }
  }
`;
function DataDisplayDemo() {
  const { data } = useQuery(displayItemById);
  console.log(data);
  return (
    data && (
      <div>
        <p>{data.product.discription}</p>
        <div>
          {data.product.gallery.map((ele) => (
            <img src={ele} alt="ps-5" />
          ))}
        </div>
      </div>
    )
  );
}

export default DataDisplayDemo;
