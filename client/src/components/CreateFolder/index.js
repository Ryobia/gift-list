import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { CREATE_FOLDER} from "../../utils/mutations";
import { useParams, useNavigate } from "react-router-dom";

const CreateFolder = () => {
  const { listId: listId } = useParams();
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const [formState, setFormState] = useState({
    name: "",
    details: "",
    link: "",
    price: 0,
  });
  const [createFolder, { error: addItemError }] = useMutation(CREATE_FOLDER);
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleCreateFolder = async (event) => {
    setError(false);
    event.preventDefault();
    if (formState.name) {
      try {
        const mutationResponse = await createFolder({
          variables: {
            listId: listId,
            folderName: formState.name
          },
        });
        navigate(0);
        console.log(mutationResponse);
      } catch (e) {
        setError(true);
        console.log(e);
      }
    }
  };

  return (
    <section>
      <div className="createListComponent desktopStandardShadow">
        <h2>Create New Folder</h2>

        <form onSubmit={handleCreateFolder}>
          <input
            className="form-input"
            placeholder="Name this folder"
            name="name"
            type="name"
            id="name"
            onChange={handleChange}
          />
          
          <button className="insetBtnInverse" type="submit">
            Create Folder
          </button>
        </form>
      </div>
      {error ? 
      <p className="errorText">Something Went Wrong... bummer</p>
      
      :null}
    </section>
  );
};

export default CreateFolder;
