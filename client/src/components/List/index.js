import React from "react";
import { Link } from "react-router-dom";

const List = (props) => {
  const { list } = props;
  let dateOptions = {
    hour: "numeric",
    month: "2-digit",
    day: "2-digit",
    year: "2-digit",
    minute: "2-digit",
  };
  return (
    <section className="listComponent">
      
        <h3>{list.listName}</h3>
        <p>
          {new Date(parseInt(list.listDate)).toLocaleDateString(
            "en-US",
            dateOptions
          )}
        </p>
        <p>Created by: {list.listUser}</p>
      
    </section>
  );
};

export default List;
