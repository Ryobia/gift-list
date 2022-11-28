import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { ADD_ITEM } from "../../utils/mutations";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import { QUERY_ME } from "../../utils/queries";

const CreateItem = () => {
  const { id: listId } = useParams();
  const [error, setError] = useState(false);

  const navigate = useNavigate();
  const [formState, setFormState] = useState({
    name: "",
    details: "",
    link: "",
    price: 0,
  });
  const [addItem, { error: addItemError }] = useMutation(ADD_ITEM);
  const { loading, error: meError, data: meData } = useQuery(QUERY_ME);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleAddItem = async (event) => {
    setError(false);
    console.log(parseInt(formState.price, 10))
    event.preventDefault();
    if (formState.name !== "" && parseInt(formState.price, 10) !== NaN) {
      try {
        const mutationResponse = await addItem({
          variables: {
            listId: listId,
            itemUser: meData.me._id,
            itemName: formState.name,
            itemLink: formState.link,
            itemDetails: formState.details,
            itemPrice: parseInt(formState.price, 10),
          },
        });
        navigate(0);
        console.log(mutationResponse);
      } catch (e) {
        setError(true);
        console.log(e);
      }
    }
    setError(true)
  };

  return (
    <section>
      <div className="createListComponent">
        <h2>ADD NEW ITEM</h2>

        <form onSubmit={handleAddItem}>
          <label htmlFor="name">Item Name</label>
          <input
            className="form-input"
            placeholder="Name this item"
            name="name"
            type="name"
            id="name"
            onChange={handleChange}
          />
          <label htmlFor="details">Item Details</label>
          <textarea
            className="form-input form-textarea"
            placeholder="Item Details... Include coupon codes etc. here"
            name="details"
            type="name"
            id="details"
            onChange={handleChange}
          />
          <label htmlFor="link">Item Link</label>
          <input
            className="form-input"
            placeholder="Paste link to item here"
            name="link"
            type="name"
            id="link"
            onChange={handleChange}
          />
          <label htmlFor="price">Item Price</label>
          <input
            className="form-input"
            placeholder="Price"
            name="price"
            type="number"
            id="price"
            onChange={handleChange}
          />

          <button className="insetBtnInverse" type="submit">
            Add Item
          </button>
        </form>
      </div>
      {error ? 
      <p className="errorText">Price must only contain numbers (no $ etc.) <br></br>
      Item Name cannot be left blank</p>
      
      :null}
    </section>
  );
};

export default CreateItem;
