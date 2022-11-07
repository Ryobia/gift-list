import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { QUERY_LIST, QUERY_ALL_ITEMS } from "../utils/queries";
import { REMOVE_ITEM } from "../utils/mutations";
import { useQuery, useMutation } from "@apollo/client";
import { BsTrashFill } from "react-icons/bs";
import Loader from "../components/Loader";
import CreateItem from "../components/CreateItem";
import Item from "../components/Item";

const SingleList = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [itemsArray, setItemsArray] = useState([]);
  const { id: listId } = useParams();
  const { error, data } = useQuery(QUERY_LIST, {
    variables: { _id: listId },
  });
  const navigate = useNavigate();
  const [removeItem, { error: removeItemError }] = useMutation(REMOVE_ITEM);

  let dateOptions = {
    hour: "numeric",
    month: "2-digit",
    day: "2-digit",
    year: "2-digit",
    minute: "2-digit",
  };

  const handleRemoveItem = async (_id) => {
    console.log(_id);
    try {
      const response = await removeItem({
        variables: {
          _id: _id,
          listId: listId,
        },
      });
      navigate(0);
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  const getIslistLoaded = () => {
    if (data) {
      setItemsArray(data.list.items);
      setIsLoading(false);
      console.log(data);
    }
  };

  useEffect(() => {
    getIslistLoaded();
  }, [data]);

  return (
    <section>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="myListSection sectionMain">
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
            </div>
            <CreateItem listId={listId} />
          </div>
          {data ? (
            <div className="itemMapDiv">
              {itemsArray.map((item) => (
                <div key={item._id}>
                  <Link
                    to={`/lists/${listId}/${item._id}`}
                    className="insetBtn"
                  >
                    <Item item={item} />
                  </Link>
                  <span
                    onClick={() => handleRemoveItem(item._id)}
                    className="reactTrash"
                  >
                    <BsTrashFill />
                  </span>
                </div>
              ))}
            </div>
          ) : null}
        </div>
      )}
    </section>
  );
};

export default SingleList;
