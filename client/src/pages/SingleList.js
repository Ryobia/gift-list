import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { QUERY_LIST, QUERY_ME } from "../utils/queries";
import { useQuery } from "@apollo/client";
import { BsTrashFill, BsPlusCircleFill, BsPersonPlusFill, BsFillXSquareFill } from "react-icons/bs";
import Loader from "../components/Loader";
import AddUserToList from "../components/AddUserToList";
import CreateItem from "../components/CreateItem";
import Item from "../components/Item";

const SingleList = () => {
  const [isAllowedToView, setIsAllowedToView] = useState(false);
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
    if (data && meData?.me) {
      setItemsArray(data.list.items);
      setIsLoading(false);
      if (
        meData.me._id === data.list.listUser._id ||
        data.list.listUsers.filter((e) => e._id === meData.me._id)
          .length > 0
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
    let arr = [...data.list.items];
    setItemsArray(arr.reverse())
  }
  const orderDateNewestFirst = () => {
    let arr = [...data.list.items];
    setItemsArray(arr)
  }
  const orderPriceLowestFirst = () => {
    let arr = [...data.list.items];
    setItemsArray(arr.sort(function (a,b) {
      return a.itemPrice - b.itemPrice;
    }))
  }
  
  const orderPriceHighestFirst = () => {
    let arr = [...data.list.items];
    setItemsArray(arr.sort(function (a,b) {
      return b.itemPrice - a.itemPrice;
    }))
  }
  const orderPriorityHighestFirst = () => {
    let arr = [...data.list.items];
    setItemsArray(arr.sort(function (a,b) {
      return a.priority - b.priority;
    }))
  }
  const orderPriorityLowestFirst = () => {
    let arr = [...data.list.items];
    setItemsArray(arr.sort(function (a,b) {
      
      return b.priority - a.priority;
    }))
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
              <span className="cancelModal"><BsFillXSquareFill onClick={() => setModalOpen(false)} className="insetBtnInverse "/></span>
                {modalView === 'addUser' ? (
              <AddUserToList data={meData.me} />
                ) : modalView === 'createItem' ? (
              <CreateItem listId={listId} />
                ):null}
              </div>
            </div>
            :null}
            <div className="myListLeft">
              <div className="sectionTitleDiv standardShadow">
                <h2>{data.list.listName}</h2>
                <p>
                  {new Date(parseInt(data.list.listDate)).toLocaleDateString(
                    "en-US",
                    dateOptions
                  )}
                </p>
                <p>List Owner: {data.list.listUser.firstName} {data.list.listUser.lastName}</p>
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
              <AddUserToList data={meData.me} />
              <CreateItem listId={listId} />
              </div>
              :null}
            </div>
            {itemsArray.length > 0 ? (
              <div className="itemMapDiv">
                <div className="itemSortDiv standardShadow">
                  <h3>Sorting Options</h3>

                  <button className="insetBtnInverse" onClick={orderDateNewestFirst}>Oldest First</button>
                  <button className="insetBtnInverse" onClick={orderDateOldestFirst}>Newest First</button>
                  <button className="insetBtnInverse" onClick={orderPriceLowestFirst}>Price low to high</button>
                  <button className="insetBtnInverse" onClick={orderPriceHighestFirst}>Price high to low</button>
                  <button className="insetBtnInverse" onClick={orderPriorityLowestFirst}>Priority low to high</button>
                  <button className="insetBtnInverse" onClick={orderPriorityHighestFirst}>Priority high to low</button>
                    </div>
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
