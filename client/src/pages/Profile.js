import React from "react";
import { Link } from "react-router-dom";
import Auth from '../utils/auth';
import NeedLogin from "../components/NeedLogin";


const Profile = () => {

  if (Auth.loggedIn() === true) {

  return (
      <section className="profileSection sectionTitle">
      <div className="sectionTitleDiv">
        <h2>PROFILE</h2>
      </div>
      </section>
  );
  
} else {
  return (
  <NeedLogin/>
  )
}
};

export default Profile;
