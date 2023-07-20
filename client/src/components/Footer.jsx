import React from "react";

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer>
      <p className="copyRight">Copyright ⓒ wowMeets {year}</p>
    </footer>
  );
}

export default Footer;
