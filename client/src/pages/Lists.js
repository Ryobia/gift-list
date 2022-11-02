import React from "react";
import { Link } from "react-router-dom";
import CreateList from "../components/CreateList";
import List from "../components/List";
import { QUERY_ALL_LISTS, QUERY_ME } from "../utils/queries";
import { useMutation } from "@apollo/react-hooks";
import { useQuery } from "@apollo/react-hooks";

const Lists = () => {

  const { loading, error: meError, data: meData } = useQuery(QUERY_ME);
  const { loading: listLoading, error: listError, data: listData } = useQuery(QUERY_ALL_LISTS);
  let me = [];
  
  if (meError) {
    console.log(meError);
  } else if (meData) {
    me = meData.me.lists;
    console.log(me)
  }

  return (
    <section className="myListSection sectionMain">
      <div className="myListLeft">
        <div className="sectionTitleDiv">
          <h2>MY LISTS</h2>
        </div>
        <CreateList />
      </div>
      {listData ? (
      <div className="listDiv">
        {me.map((list) => (
        <Link className="insetBtn" to={`/lists/${list._id}`}>
          <List list={list} key={list._id}/>
        </Link>
        ))}
      </div>
      ): (
        <div>
          <h3>No Lists to Display</h3>
        </div>
      )}
    </section>
  );
};

export default Lists;
