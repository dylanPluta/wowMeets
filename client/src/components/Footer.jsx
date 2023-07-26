import React from "react";

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer>
      <p className="copyRight">Copyright ⓒ {year} Dylan Pluta</p>
    </footer>
  );
}

export default Footer;
