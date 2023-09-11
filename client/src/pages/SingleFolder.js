import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/react-hooks";
import { useParams } from "react-router-dom";
import { QUERY_FOLDER, QUERY_ME, QUERY_LIST } from "../utils/queries";
import { REMOVE_FOLDER } from "../utils/mutations";
import { useQuery } from "@apollo/client";
import {
  BsTrashFill,
  BsPlusCircleFill,
  BsPersonPlusFill,
  BsFillXSquareFill,
} from "react-icons/bs";
import { FaEdit } from "react-icons/fa";
import Loader from "../components/Loader";
import RemoveFolderModal from "../components/removeFolderModal";
import CreateItem from "../components/CreateItem";
import { useNavigate } from "react-router-dom";
import Item from "../components/Item";

function SingleFolder() {
  const [isAllowedToView, setIsAllowedToView] = useState(false);
  const [modalView, setModalView] = useState("createItem");
  const [modalOpen, setModalOpen] = useState(false);
  const [isOwnList, setIsOwnList] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [listName, setFolderName] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [removeModalVisible, setRemoveModalVisible] = useState(false);
  const [modalFolder, setModalFolder] = useState(null);
  const [modalX, setModalX] = useState(0);
  const [modalY, setModalY] = useState(0);
  const [foldersArray, setfoldersArray] = useState([]);
  const [itemsArray, setItemsArray] = useState([]);
  const [filteredItemsArray, setFilteredItemsArray] = useState([]);
  const [formState, setFormState] = useState({ email: "" });
  const navigate = useNavigate();
  const { loading, error: meError, data: meData } = useQuery(QUERY_ME);
  const { folderId: folderId, listId: listId } = useParams();
  const {
    error: folderError,
    data: folderData,
    loading: folderLoading,
  } = useQuery(QUERY_FOLDER, {
    variables: { _id: folderId },
  });
  const {
    error,
    data,
    loading: listLoading,
  } = useQuery(QUERY_LIST, {
    variables: { _id: listId },
  });
  
    const [removeFolder, { error: removeFolderError }] =
    useMutation(REMOVE_FOLDER);


  let dateOptions = {
    hour: "numeric",
    month: "2-digit",
    day: "2-digit",
    year: "2-digit",
    minute: "2-digit",
  };

 

  function handleFolderClick(event, folder) {
    showRemoveFolderModal(folder, event.clientX, event.clientY);
  }

  

  function showRemoveFolderModal(folder, x, y) {
    setModalFolder(folder);
    setModalX(x);
    setModalY(y);
    setRemoveModalVisible(true);
  }


  function hideRemoveFolderModal() {
    setRemoveModalVisible(false);
  }

 

  const handleRemoveFolder = async () => {
    if (formState.name !== "") {
      try {
        const mutationResponse = await removeFolder({
          variables: {
            _id: folderId,
            listId: listId,
          },
        });
        
        navigate(0);
        console.log(mutationResponse);
      } catch (e) {
        console.log(e);
      }
    }
  };

  const handleFolderNameChange = (event) => {
    setFolderName(event.target.value);
  };

//   const handleUpdateList = async () => {
//     console.log(listName);
//     try {
//       const mutationResponse = await updateList({
//         variables: {
//           _id: listId,
//           listName: listName,
//         },
//       });
//       console.log(mutationResponse);
//       navigate(0);
//     } catch (e) {
//       console.log(e);
//     }
//   };

  const getIslistLoaded = () => {
    if (data?.list?.listUser && meData?.me && folderData?.folder?.folderName) {
      console.log(folderData.folder)
      setItemsArray(folderData.folder.folderItems);
      setIsLoading(false);
      if (
        meData.me._id === data.list.listUser._id ||
        data.list.listUsers.filter((e) => e._id === meData.me._id).length > 0
      ) {
        setIsAllowedToView(true);
      }
      if (meData.me._id === data.list.listUser._id) {
        setIsOwnList(true);
      }
      console.log(itemsArray);
    }
  };

  const orderDateOldestFirst = () => {
    let arr = [...folderData.folder.folderItems];
    setItemsArray(arr.reverse());
  };
  const orderDateNewestFirst = () => {
    let arr = [...folderData.folder.folderItems];
    setItemsArray(arr);
  };
  const orderPriceLowestFirst = () => {
    let arr = [...folderData.folder.folderItems];
    setItemsArray(
      arr.sort(function (a, b) {
        return a.itemPrice - b.itemPrice;
      })
    );
  };

  const orderPriceHighestFirst = () => {
    let arr = [...folderData.folder.folderItems];
    setItemsArray(
      arr.sort(function (a, b) {
        return b.itemPrice - a.itemPrice;
      })
    );
  };
  const orderPriorityHighestFirst = () => {
    let arr = [...folderData.folder.folderItems];
    setItemsArray(
      arr.sort(function (a, b) {
        return a.priority - b.priority;
      })
    );
  };
  const orderPriorityLowestFirst = () => {
    let arr = [...folderData.folder.folderItems];
    setItemsArray(
      arr.sort(function (a, b) {
        return b.priority - a.priority;
      })
    );
  };
  useEffect(() => {
    if (data?.list?.listUser) {
      getIslistLoaded();
    }
  }, [listLoading, loading, folderLoading]);

  useEffect(() => {
setFilteredItemsArray(itemsArray.filter(obj => obj.itemName !== null));
  }, [itemsArray])

  if (isAllowedToView) {
    return (
      <section>
        {folderLoading ? (
          <Loader />
        ) : (
          <div className="myListSection sectionMain singleListPage">
            
            <div className="myListLeft">
              <div className="sectionTitleDiv standardShadow">
                {isOwnList ? (
                  <div className="listTitle">
                    {isEditing ? (
                      <div>
                        <input
                          style={{
                            lineHeight: "2em",
                          }}
                          type="text"
                          value={listName}
                          onChange={handleFolderNameChange}
                        />
                        <div className="editListBtnDiv">
                          <button
                            className="insetBtnInverse"
                            // onClick={handleUpdateList}
                          >
                            Save
                          </button>
                          <button
                            className="insetBtnInverse"
                            onClick={() => setIsEditing(false)}
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <h2>
                        Folder: {folderData.folder.folderName}
                        <span className="fullscreenEditList">
                          <FaEdit
                            onClick={() => {
                              setIsEditing(true);
                            }}
                          />
                        </span>
                        <p>List: {data.list.listName}</p>
                      </h2>
                      
                    )}
                    
                        
                  </div>
                ) : (
                  <h2>{data.list.listName}</h2>
                )}
                <p>Created on: 
                  {new Date(parseInt(folderData.folder.folderDate)).toLocaleDateString(
                    "en-US",
                    dateOptions
                  )}
                </p>
                
                
                
                {removeModalVisible && (
                  <RemoveFolderModal
                    folder={modalFolder}
                    x={modalX}
                    y={modalY}
                    handleRemoveFolder={handleRemoveFolder}
                    hideRemoveFolderModal={hideRemoveFolderModal}
                  />
                )}
                {isOwnList ? (
                  <div id="listIcon" className="listIcon">
                    <span className="listIconSpan">
                      <BsPlusCircleFill
                        onClick={() => {
                          setModalOpen(true);
                          setModalView("createItem");
                        }}
                      />
                    </span>
                    <span className="listIconSpan">
                      <BsPersonPlusFill
                        onClick={() => {
                          setModalOpen(true);
                          setModalView("addUser");
                        }}
                      />
                    </span>
                    <span className="listIconSpan">
                      <FaEdit
                        onClick={() => {
                          setIsEditing(true);
                        }}
                      />
                    </span>
                  </div>
                ) : null}
                {isOwnList ? (
                  <div className="listHidden">
                    <CreateItem listId={listId} folderId={folderId}/>
                  </div>
                ) : null}
              </div>
            </div>

            {itemsArray.length > 0 ? (
              <div className="itemMapDiv">
                <div className="itemSortDiv standardShadow">
                  <h3>Sorting Options</h3>

                  <button
                    className="insetBtnInverse"
                    onClick={orderDateNewestFirst}
                  >
                    Oldest First
                  </button>
                  <button
                    className="insetBtnInverse"
                    onClick={orderDateOldestFirst}
                  >
                    Newest First
                  </button>
                  <button
                    className="insetBtnInverse"
                    onClick={orderPriceLowestFirst}
                  >
                    Price low to high
                  </button>
                  <button
                    className="insetBtnInverse"
                    onClick={orderPriceHighestFirst}
                  >
                    Price high to low
                  </button>
                  <button
                    className="insetBtnInverse"
                    onClick={orderPriorityLowestFirst}
                  >
                    Priority low to high
                  </button>
                  <button
                    className="insetBtnInverse"
                    onClick={orderPriorityHighestFirst}
                  >
                    Priority high to low
                  </button>
                  
                </div>
                
                {filteredItemsArray.map((item) => (
                  <div key={item._id}>
                    <Link
                      to={`/lists/${listId}/item/${item._id}`}
                      className="insetBtn"
                    >
                      <Item item={item} />
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <div className="nothingToShow">
                No Items have been added to this folder
              </div>
            )}
          </div>
        )}
      </section>
    );
  } else {
    return (
      <div>
        <h2>You do not have permission to view this folder</h2>
      </div>
    );
  }
}

export default SingleFolder;