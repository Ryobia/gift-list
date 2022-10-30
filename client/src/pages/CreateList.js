import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/react-hooks";
import { ADD_LIST } from "../utils/mutations";
import { useQuery } from "@apollo/react-hooks";
import { QUERY_ME, QUERY_ALL_LISTS } from "../utils/queries";
import { Link } from "react-router-dom";



const CreateList = () => {
  const [addList, { error }] = useMutation(ADD_LIST);
  const { loading, error: meError, data: meData } = useQuery(QUERY_ME);
  const { data: listData} = useQuery(QUERY_ALL_LISTS);

  const handleAddList = async () => {
    console.log(meData.me)
    console.log(listData)
    try {
      const mutationResponse = await addList({
        variables: {
          listUser: meData.me.username,
          listName: 'test'
        },
      });
      console.log(mutationResponse);
    } catch (e) {
      console.log(e);
    }
  }


  return (
      <section className="createGroupSection sectionTitle">
      <div className="sectionTitleDiv">
        <h2>CREATE LIST</h2>
        <button className="insetBtn" onClick={handleAddList}>ADD LIST</button>
      </div>
      </section>
  );
};

export default CreateList;
