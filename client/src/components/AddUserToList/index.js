import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/react-hooks";
import { ADD_LIST, ADD_USER_TO_LIST } from "../../utils/mutations";
import { useQuery } from "@apollo/react-hooks";
import { QUERY_ME, QUERY_USER } from "../../utils/queries";
import { useNavigate, useParams } from "react-router-dom";

const AddUserToList = (props) => {
  const { id: listId } = useParams();
  const navigate = useNavigate();
  const [formState, setFormState] = useState({ name: "" });
  const { loading, data } = useQuery(QUERY_USER, {
    variables: { username: formState.name }
  });
  const [addUserToList, { error }] = useMutation(ADD_USER_TO_LIST);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };


  const handleAddUserToList = async (event) => {
    event.preventDefault();
    if (formState.name !== "") {
      try {
        const mutationResponse = await addUserToList({
          variables: {
            _id: listId,
            userId: data.user._id,
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
      <div className="createListComponent">
        <h2>ADD USER TO THIS LIST</h2>

      
        <form onSubmit={handleAddUserToList}>
          <input
            className="form-input"
            placeholder="Enter Username "
            name="name"
            type="name"
            id="name"
            onChange={handleChange}
          />

          <button className="insetBtnInverse" type="submit">
            Add User
          </button>
        </form>
          <p>*User must be in your friends list*</p>
      </div>
    </section>
  );
};

export default AddUserToList;
