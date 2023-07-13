import React from "react";
import wowLogo from '../images/wowMeetLogo.png'
import LoginArea from './Login';


function Header() {
  return (
  
    <div>
    <header>
    <div className="row">
      <div className="col-lg-6 col-md-12">
        <h1 className="siteHeader">
        <a href="/"><img src={wowLogo} className="headerIcon"></img></a>
        wow Meets
        </h1>
      </div>
      <div className="col-lg-6 col-md-12 loginHeader">
        <LoginArea />
      </div>
    </div>
    </header>
    <div className="siteDivider">
    </div>
    </div>
  );
}

export default Header;
