import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/react-hooks";
import { ADD_LIST } from "../../utils/mutations";
import { useQuery } from "@apollo/react-hooks";
import { QUERY_ME, QUERY_ALL_LISTS } from "../../utils/queries";
import { Link, useNavigate } from "react-router-dom";

const CreateList = () => {
  const navigate = useNavigate();
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
            listUser: meData.me._id,
            listName: formState.name,
          },
        });
        navigate(0);
        console.log(mutationResponse);
      } catch (e) {
        console.log(e);
      }
    }
  };

  return (
    <section>
      <div className="createListComponent standardShadow">
        <h2>CREATE NEW LIST</h2>

      
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
