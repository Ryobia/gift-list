import React from "react";
import { Link } from "react-router-dom";

const WhatToAd = () => {
  return (
    <section className="whatToAddList">
      
        <a className="whatToAddBtn" href="https://www.target.com/">
          <div className="">
            <h1>TARGET</h1>
          </div>
        </a>

        <a className="whatToAddBtn" href="https://www.amazon.com/ref=nav_logo">
          <div className="">
            <h1>Good 'ol Amazon</h1>
          </div>
        </a>

        <a className="whatToAddBtn" href="https://www.walmart.com/">
          <div className="">
            <h1>Wally World</h1>
          </div>
        </a>

        <a className="whatToAddBtn" href="">
          <div className="">
            <h1>Your Store/Website Here!</h1>
          </div>
        </a>
      
    </section>
  );
};

export default WhatToAd;
