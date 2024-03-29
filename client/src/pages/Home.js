import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <main>
      <div className="homeInfo standardShadow">
        <h2>
          Anonylists is your one-stop shop for making and sharing your
          Holiday/Birthday wishlists!
        </h2>
        <p>
          Anonylists was made to help you, your friends and your family
          coordinate buying gifts and keeping them a surprise.
        </p>
        <Link className="highlightText" to="/lists">
          {" "}
          Get started today for free by clicking here!
        </Link>
      </div>
      <section className="standardShadow whatToAdSection">
        <Link to="/whattoadd">
          <div className="whatToAdLink">
            <h1>Need Help Deciding What To Add To Your List?</h1>
            <h4>CLICK HERE!</h4>
          </div>
        </Link>
      </section>
      <section className="homeSection">
        <Link className="standardShadow" to="/lists">
          <div className="homeInsetBtn ">
            <h1>MY LISTS</h1>
          </div>
        </Link>
        <Link className="standardShadow" to="/profile">
          <div className="homeInsetBtn">
            <h1>PROFILE</h1>
          </div>
        </Link>
        <Link className="standardShadow" to="/friends">
          <div className="homeInsetBtn">
            <h1>FRIENDS</h1>
          </div>
        </Link>
      </section>
    </main>
  );
};

export default Home;
