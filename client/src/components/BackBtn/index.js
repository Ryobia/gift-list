import React, {useState, useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";

const BackBtn = () => {
const navigate = useNavigate();
  return (
    <section className="backBtnSection" >
        <div className="" onClick={() => navigate(-1)}>
            <h3>Back</h3>
        </div>

    </section>
  );
};

export default BackBtn;