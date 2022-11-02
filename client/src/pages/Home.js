import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <main>
      <section className="homeSection">
      <Link to="/lists">
        <div className="insetBtn">
          <h1>MY LISTS</h1>
        </div>
        </Link>
        <Link to="/profile">
        <div className="insetBtn">
          <h1>PROFILE</h1>
        </div>
        </Link>
        <Link to="/friends">
        <div className="insetBtn">
          <h1>FRIENDS</h1>
        </div>
        </Link>
      </section>
    </main>
  );
};

export default Home;
