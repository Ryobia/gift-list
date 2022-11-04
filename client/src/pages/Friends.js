import React from "react";
import { Link } from "react-router-dom";
import Auth from '../utils/auth';
import NeedLogin from "../components/NeedLogin";


const Friends = () => {

  if (Auth.loggedIn() === true) {

  return (
      <section className="friendSection sectionTitle">
      <div className="sectionTitleDiv">
        <h2>FRIENDS</h2>
      </div>
      </section>
  );
  } else {
    return (
    <NeedLogin/>
    )
  }
};

export default Friends;
