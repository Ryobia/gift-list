import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { QUERY_LIST } from "../utils/queries";
import { useQuery } from "@apollo/client";
import Loader from "../components/Loader";

const SingleList = () => {
  const [isLoading, setIsLoading] = useState(true);

  const { id: listId } = useParams();
  const {  error, data } = useQuery(QUERY_LIST, {
    variables: { _id: listId },
  });

  let dateOptions = {
    hour: "numeric",
    month: "2-digit",
    day: "2-digit",
    year: "2-digit",
    minute: "2-digit",
  };

  const getIslistLoaded = () => {
    if(data) {
        setIsLoading(false);
    }
  }

  useEffect(() => {
    getIslistLoaded()
    }, [data]);

  return (
    <section className="singleListSection">
      {isLoading ? <Loader /> : 
      <div>
        {new Date(parseInt(data.list.listDate)).toLocaleDateString(
            "en-US",
            dateOptions
          )}
        {data.list.listName}
        {data.list.listUser}
      </div>}
    </section>
  );
};

export default SingleList;
