import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { QUERY_LIST, QUERY_ME } from "../utils/queries";
import { useQuery, useMutation } from "@apollo/client";
import { BsTrashFill, BsPlusCircleFill, BsPersonPlusFill, BsFillXSquareFill } from "react-icons/bs";
import Loader from "../components/Loader";
import AddUserToList from "../components/AddUserToList";
import CreateItem from "../components/CreateItem";
import Item from "../components/Item";

const SingleList = () => {
  const [isAllowedToView, setIsAllowedToView] = useState(false);
  const [orderItems, setOrderItems] = useState('oldest');
  const [modalView, setModalView] = useState('createItem');
  const [modalOpen, setModalOpen] = useState(false);
  const [isOwnList, setIsOwnList] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [itemsArray, setItemsArray] = useState([]);
  const { loading, error: meError, data: meData } = useQuery(QUERY_ME);
  const { id: listId } = useParams();
  const { error, data } = useQuery(QUERY_LIST, {
    variables: { _id: listId },
  });

  let dateOptions = {
    hour: "numeric",
    month: "2-digit",
    day: "2-digit",
    year: "2-digit",
    minute: "2-digit",
  };


  const getIslistLoaded = () => {
    if (data) {
      setItemsArray(data.list.items);
      setIsLoading(false);
      if (
        meData.me.username === data.list.listUser ||
        data.list.listUsers.filter((e) => e.email === meData.me.email)
          .length > 0
      ) {
        setIsAllowedToView(true);
      }
      if (meData.me.username === data.list.listUser) {
        setIsOwnList(true);
      }
    }
  };

  const orderDateNewestFirst = () => {
    let arr = data.list.items.reverse();
    console.log(arr)
  }

  useEffect(() => {
    getIslistLoaded();
  }, [data, meData]);

  if (isAllowedToView) {
    return (
      <section>
        {isLoading ? (
          <Loader />
        ) : (
          <div className="myListSection sectionMain singleListPage">
            {modalOpen ? 
            <div id="open-modal" className="modal-window">
              <div>
              <span className="cancelModal" onClick={() => setModalOpen(false)}><BsFillXSquareFill className="insetBtnInverse "/></span>
                {modalView === 'addUser' ? (
              <AddUserToList listId={listId} />
                ) : modalView === 'createItem' ? (
              <CreateItem listId={listId} />
                ):null}
              </div>
            </div>
            :null}
            <div className="myListLeft">
              <div className="sectionTitleDiv">
                <h2>{data.list.listName}</h2>
                <p>
                  {new Date(parseInt(data.list.listDate)).toLocaleDateString(
                    "en-US",
                    dateOptions
                  )}
                </p>
                <p>List Owner: {data.list.listUser}</p>
                <p>
                  Members of this list:
                  <span>
                    {data.list.listUsers.map((user) => (
                      <span key={user._id}>{" - " + user.firstName +" " + user.lastName}</span>
                    ))}
                  </span>
                </p>
              {isOwnList ? 
                <div id="listIcon" className="listIcon">
                <span ><BsPlusCircleFill onClick={() => {setModalOpen(true); setModalView('createItem')}}/></span>
                <span ><BsPersonPlusFill onClick={() => {setModalOpen(true); setModalView('addUser')}}/></span>
                </div>
              :null}
              </div>
              {isOwnList ? 
              <div className="listHidden">
              <AddUserToList listId={listId} />
              <CreateItem listId={listId} />
              </div>
              :null}
            </div>
            {itemsArray.length > 0 ? (
              <div className="itemMapDiv">
                {/* <div className="itemSortDiv">
                  <h3>Sorting Options</h3>

                  <button className="insetBtnInverse" onClick={orderDateNewestFirst} disabled={orderItems === 's'}>Oldest First</button>
                  <button className="insetBtnInverse">Newest First</button>
                  <button className="insetBtnInverse">Price low to high</button>
                  <button className="insetBtnInverse">Price high to low</button>
                    </div> */}
                {itemsArray.map((item) => (
                  <div key={item._id}>
                    <Link
                      to={`/lists/${listId}/${item._id}`}
                      className="insetBtn"
                    >
                      <Item item={item} />
                    </Link>
             
                  </div>
                ))}
              </div>
            ) : <div>No Items have been added to this list</div>}
          </div>
        )}
      </section>
    );
  } else {
    return (
    <div>
      <h2>You do not have permission to view this list</h2>
    </div>
      );
  }
};

export default SingleList;
