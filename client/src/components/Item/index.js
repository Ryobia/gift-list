import React from "react";
import { Link } from "react-router-dom";


const Item = (props) => {
  const { item } = props;
  let dateOptions = {
    hour: "numeric",
    month: "2-digit",
    day: "2-digit",
    year: "2-digit",
    minute: "2-digit",
  };

  return (
    <section className="itemComponent">
      <span className="itemDiv">
            <h2>{item.itemName}</h2>
            <h2>Price: {item.itemPrice}</h2>
            <p>Added: 
          {' ' + new Date(parseInt(item.itemDate)).toLocaleDateString(
            "en-US",
            dateOptions
          )}
        </p>
      
      <h4>{item.itemDetails}</h4>
        
      </span>
      
    </section>
  );
};

export default Item;
