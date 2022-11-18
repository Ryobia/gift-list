import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/react-hooks";
import { ADD_LIST, ADD_USER_TO_LIST } from "../../utils/mutations";
import { useQuery } from "@apollo/react-hooks";
import { QUERY_ME, QUERY_USER } from "../../utils/queries";
import { useNavigate, useParams } from "react-router-dom";

const AddUserToList = (props) => {
  const [error, setError] = useState(false);
  const { id: listId } = useParams();
  const navigate = useNavigate();
  const [formState, setFormState] = useState({ email: "" });
  const { loading, data } = useQuery(QUERY_USER, {
    variables: { email: formState.email }
  });
  const [addUserToList, { error: addUserError }] = useMutation(ADD_USER_TO_LIST);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };


  const handleAddUserToList = async (event) => {
    setError(false);
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
        setError(true);
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
            placeholder="Enter User's Email"
            name="email"
            type="email"
            id="email"
            onChange={handleChange}
          />

          <button className="insetBtnInverse" type="submit">
            Add User
          </button>
        </form>
      </div>
      {error ?
      <p className="errorText">Unable to find User</p>
        :null}
    </section>
  );
};

export default AddUserToList;
