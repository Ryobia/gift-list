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
      <div>
        <h2>{list.listName}</h2>
        <p>
          {new Date(parseInt(list.listDate)).toLocaleDateString(
            "en-US",
            dateOptions
          )}
        </p>
        <p>Created by: {list.listUser.firstName} {list.listUser.lastName}</p>
      </div>
      
    </section>
  );
};

export default List;
