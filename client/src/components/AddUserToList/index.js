import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/react-hooks";
import {
  ADD_USER_TO_LIST,
} from "../../utils/mutations";
import { useQuery } from "@apollo/react-hooks";
import { QUERY_USER, QUERY_LIST } from "../../utils/queries";
import { useNavigate, useParams } from "react-router-dom";

const AddUserToList = (props) => {
  const { data: userData } = props;
  const [error, setError] = useState(false);
  const { id: listId } = useParams();
  const navigate = useNavigate();
  const [formState, setFormState] = useState({ email: "" });
  const [friendList, setFriendList] = useState([]);
  const [availableFriends, setAvailableFriends] = useState([]);
  const [unusedFriends, setUnusedFriends] = useState([]);
  const { loading, data } = useQuery(QUERY_USER, {
    variables: { email: formState.email },
  });
  const [addUserToList, { error: addUserError }] =
    useMutation(ADD_USER_TO_LIST);
    const {
      error: listError,
      data: listData,
      loading: listLoading,
    } = useQuery(QUERY_LIST, {
      variables: { _id: listId },
    });


  const handleComponentLoad = () => {
      setFriendList(props.data.friends)
      setAvailableFriends(listData.list.listUsers)
      
  }
    
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleAddUserToList = async (_id) => {
    setError(false);
    if (formState.name !== "") {
      try {
        const mutationResponse = await addUserToList({
          variables: {
            _id: listId,
            userId: data.user ? data.user._id : _id,
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

  useEffect(() => {
    handleComponentLoad();
    if (availableFriends && friendList?.length > 0) {
      setUnusedFriends(friendList.filter(f => {
        return !availableFriends.some(y => y._id === f._id)
      }))
      }
  },[listLoading, availableFriends]);

  useEffect(() => {
    console.log(unusedFriends);
    console.log(availableFriends);
    console.log(friendList);
  }, [unusedFriends]);

  return (
    <section>
      <div className="createListComponent desktopStandardShadow">
        
        <div className="dropdown">
          <span>ADD FROM FRIENDS</span>
          {unusedFriends.length > 0 ? (
          <div className="dropdown-content">
            {unusedFriends.map((friend) => (
              <p
                key={friend._id}
                onClick={() => {setFormState({ email: friend.email }); handleAddUserToList(friend._id)}}
              >
                {friend.email}
              </p>
            ))}
            
          </div>
          ) :
           <div className="dropdown-content">
              <span>All friends already added to list</span>
           </div>
           }
        </div>

        <div></div>

        <form onSubmit={handleAddUserToList}>
          <input
            className="form-input"
            placeholder="Enter User's Email"
            name="email"
            type="email"
            id="email"
            value={formState.email}
            onChange={handleChange}
          />

          <button className="insetBtnInverse" type="submit">
            Add User
          </button>
        </form>
      </div>
      {error ? <p className="errorText">Unable to find User</p> : null}
    </section>
  );
};

export default AddUserToList;
