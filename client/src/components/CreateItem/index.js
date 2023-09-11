import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { ADD_ITEM, ADD_ITEM_TO_FOLDER } from "../../utils/mutations";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import { QUERY_ME } from "../../utils/queries";

const CreateItem = () => {
  const { listId: listId, folderId: folderId } = useParams();
  const [error, setError] = useState(false);
  const [prio, setPrio] = useState(5);
  const navigate = useNavigate();
  const [formState, setFormState] = useState({
    name: "",
    details: "",
    link: "",
    price: 0,
  });
  const [addItem, { error: addItemError }] = useMutation(ADD_ITEM);
  const [addItemToFolder, { error: addToFolderError }] = useMutation(ADD_ITEM_TO_FOLDER);
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
            priority: prio,
          },
        });
        if (folderId){
          const addToFolderResponse = await addItemToFolder({
            variables: {
              itemId: mutationResponse.data.addItem._id,
              folderId: folderId
            }
          });
          console.log(addToFolderResponse)
        };
        navigate(0);
        console.log(mutationResponse);
      } catch (e) {
        setError(true);
        console.log(e);
      }
    } else {
    setError(true)
    }
  };

  return (
    <section>
      <div className="createListComponent desktopStandardShadow">
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
            step=".01"
            id="price"
            onChange={handleChange}
          />
          <div className="addItemPrio">
                <p>Set Priority (1 = I want this the most):</p>
                <div className="addItemPrioOption">
                  <span className={prio === 1 ? 'prioActive' : ''} onClick={() => setPrio(1)} id="1">1</span>
                  <span className={prio === 2 ? 'prioActive' : ''} onClick={() => setPrio(2)} id="2">2</span>
                  <span className={prio === 3 ? 'prioActive' : ''} onClick={() => setPrio(3)} id="3">3</span>
                  <span className={prio === 4 ? 'prioActive' : ''} onClick={() => setPrio(4)} id="4">4</span>
                  <span className={prio === 5 ? 'prioActive' : ''} onClick={() => setPrio(5)} id="5">5</span>
                </div>
              </div>
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
