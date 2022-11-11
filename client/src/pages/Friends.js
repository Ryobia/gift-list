import React, { useState, useEffect } from "react";
import Loader from "../components/Loader";
import { Link } from "react-router-dom";
import { QUERY_ME, QUERY_USER } from "../utils/queries";
import { useQuery } from "@apollo/react-hooks";
import Auth from "../utils/auth";
import NeedLogin from "../components/NeedLogin";

const Friends = () => {
  const [isLoading, setIsLoading] = useState(true);

  const {loading: loadUser, data: userData} = useQuery(QUERY_USER, {
    variables: { username: 'tester'}
  });

  const { loading, error: meError, data: meData } = useQuery(QUERY_ME);

  const getIsMeLoaded = () => {
    if (meData) {
      setIsLoading(false);
      console.log(meData)
    }
  };

  useEffect(() => {
    getIsMeLoaded();
  }, [meData]);

  if (Auth.loggedIn() === true) {
    return (
      <section>
        {isLoading ? (
          <Loader />
        ) : (
          <section className="friendSection sectionTitle">
            <div className="myListLeft">
              <div className="sectionTitleDiv">
                <h2>FRIENDS</h2>
              </div>
            </div>
          </section>
        )}
      </section>
    );
  } else {
    return <NeedLogin />;
  }
};

export default Friends;
