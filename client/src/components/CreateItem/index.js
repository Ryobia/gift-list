import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/react-hooks";
import { ADD_ITEM } from "../../utils/mutations";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import { QUERY_ME } from "../../utils/queries";
import { Link } from "react-router-dom";

const CreateItem = () => {
  const { id: listId } = useParams();

  const [formState, setFormState] = useState({ name: "", details: "", price: 0 });
  const [addItem, { error }] = useMutation(ADD_ITEM);
  const { loading, error: meError, data: meData } = useQuery(QUERY_ME);
  

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleAddItem = async (event) => {
    event.preventDefault();
    console.log(formState)
    if (formState.name !== "") {
      try {
        const mutationResponse = await addItem({
          variables: {
            listId: listId,
            itemUser: meData.me.username,
            itemName: formState.name,
            itemDetails: formState.details,
            itemPrice: parseInt(formState.price, 10)
          },
        });
        console.log(mutationResponse);
      } catch (e) {
        console.log(e);
      }
    }
  };

  return (
    <section>
      <div className="createListComponent">
        <h2>ADD NEW ITEM</h2>

      
        <form onSubmit={handleAddItem}>
          <input
            className="form-input"
            placeholder="Name this item"
            name="name"
            type="name"
            id="name"
            onChange={handleChange}
          />
          <textarea
            className="form-input form-textarea"
            placeholder="Item Details..."
            name="details"
            type="name"
            id="details"
            onChange={handleChange}
          />
          <input
            className="form-input"
            placeholder="Price"
            name="price"
            type="int"
            id="price"
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

export default CreateItem;
