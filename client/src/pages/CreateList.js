import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/react-hooks";
import { ADD_LIST } from "../utils/mutations";
import { useQuery } from "@apollo/react-hooks";
import { QUERY_ME, QUERY_ALL_LISTS } from "../utils/queries";
import { Link } from "react-router-dom";

const CreateList = () => {
  const [formState, setFormState] = useState({ name: "" });
  const [addList, { error }] = useMutation(ADD_LIST);
  const { loading, error: meError, data: meData } = useQuery(QUERY_ME);
  const { data: listData } = useQuery(QUERY_ALL_LISTS);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleAddList = async (event) => {
    event.preventDefault();
    if (formState.name !== "") {
      try {
        const mutationResponse = await addList({
          variables: {
            listUser: meData.me.username,
            listName: formState.name,
          },
        });
        console.log(mutationResponse);
      } catch (e) {
        console.log(e);
      }
    }
  };

  return (
    <section className="createGroupSection sectionTitle">
      <div className="sectionTitleDiv">
        <h2>CREATE LIST</h2>
      </div>

      
      <div className="createListDiv">
        <form onSubmit={handleAddList}>
          <input
            className="form-input"
            placeholder="Name your list"
            name="name"
            type="name"
            id="name"
            onChange={handleChange}
          />

          <button className="insetBtnInverse" type="submit">
            Create New List
          </button>
        </form>
      </div>
    </section>
  );
};

export default CreateList;
