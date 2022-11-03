import React from "react";
import { Link } from "react-router-dom";
import CreateList from "../components/CreateList";
import { BsTrashFill } from "react-icons/bs";
import List from "../components/List";
import { QUERY_ME } from "../utils/queries";
import { useQuery } from "@apollo/react-hooks";
import { useMutation } from "@apollo/client";
import { REMOVE_LIST } from "../utils/mutations";
const Lists = () => {
  const { loading, error: meError, data: meData } = useQuery(QUERY_ME);
  let me = [];
  const [removeList, {error}] = useMutation(REMOVE_LIST);

  const handleRemoveList = async (_id) => {
    try {
        const response = await removeList({
          variables: {
            _id: _id
          },
        });
        
}
    catch (err) {
        console.log(err)
    }
  }

  if (meError) {
    console.log(meError);
  } else if (meData) {
    me = meData.me.lists;
    console.log(me);
  }

  return (
    <section className="myListSection sectionMain">
      <div className="myListLeft">
        <div className="sectionTitleDiv">
          <h2>MY LISTS</h2>
        </div>
        <CreateList />
      </div>
      {meData ? (
        <div className="listDiv">
          {me.map((list) => (
            <div>
              <Link
                key={list._id}
                className="insetBtn"
                to={`/lists/${list._id}`}
              >
                <List list={list} key={list._id} />
              </Link>
              <span onClick={() => handleRemoveList(list._id)} className="reactTrash">
                <BsTrashFill />
              </span>
            </div>
          ))}
        </div>
      ) : (
        <div>
          <h3>No Lists to Display</h3>
        </div>
      )}
    </section>
  );
};

export default Lists;
