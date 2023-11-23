import React from "react";
import targetLogo from "../../src/images/target.png";
import walmartLogo from "../../src/images/walmart.jpg";
import amazonLogo from "../../src/images/amazon.png";
import { Link } from "react-router-dom";

const WhatToAd = () => {
  return (
    <section className="whatToAddList">
      <a className="whatToAddBtn" href="">
        <div className="">
          <h1>Your Store/Website Here!</h1>
        </div>
      </a>

      <a
        className="whatToAddBtn"
        href="https://www.target.com/"
        target="_blank"
      >
        <img height="100%" width="50%" src={targetLogo} />
      </a>

      <a
        className="whatToAddBtn"
        href="https://www.amazon.com/ref=nav_logo"
        target="_blank"
      >
        <img height="100%" width="70%" src={amazonLogo} />
      </a>

      <a
        className="whatToAddBtn"
        href="https://www.walmart.com/"
        target="_blank"
      >
        <img height="100%" width="50%" src={walmartLogo} />
      </a>
    </section>
  );
};

export default WhatToAd;
