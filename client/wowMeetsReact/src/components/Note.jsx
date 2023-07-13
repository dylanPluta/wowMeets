import React from "react";
import { Link, link } from "react-router-dom";

function Note(props) {

  return (
    <div className="note">
      <h4>{props.realm}</h4>
      <h3>{props.postType}</h3>
      <h2>{props.userName}</h2>
      <h1>{props.title}</h1>
      <p>{props.content}</p>
      
      <Link to={window.location.origin + "/posts/"+ props.id}>
        <p>read More...</p>
      </Link>
    </div>
  );
}

export default Note;
