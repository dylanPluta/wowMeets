import React from "react";
import HighlightIcon from "@material-ui/icons/Highlight";
import wowLogo from '../images/wowMeetLogo.png'
import LoginArea from './Login';

function Header() {
  return (
  
    <div>
    <header>
    <div class="row">
      <div class="col-lg-6 col-md-12">
      <h1 className="siteHeader">
        {/* <HighlightIcon /> */}
        <a href="/"><img src={wowLogo} className="headerIcon"></img></a>
        wow Meets
      </h1>
      </div>
      <div class="col-lg-6 col-md-12 loginHeader">
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
