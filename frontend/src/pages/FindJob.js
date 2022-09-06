import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Animation from "../components/Animation";
import '../css/providerRegister.css'


const FindJob = () => {

  //redirect to signup page
  let navigate = useNavigate();
  function handleClick() {
    navigate("/signupproviderone");
  }

  /*images are from: ttps://www.pexels.com/*/
  return (
    <div className="findjob">
      <Animation />
      <div className="findjobleft">
        <h1 >Earn Money Easily {'\&'} Flexibly!</h1>
        <button className={"Button"} type="submit" onClick={handleClick}>Join Us!</button>
      </div>
    </div>
  );
}
export default FindJob;