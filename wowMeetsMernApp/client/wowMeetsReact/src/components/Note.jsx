import React from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import dltLeaf from "../images/leafX.png"
import { Link, link } from "react-router-dom";

function Note(props) {
  
  function handleClick() {
    props.onDelete(props.id);
  }


  return (
    <div className="note">
    <h4>{props.realm}</h4>
    <h3>{props.postType}</h3>
    <h2>{props.userName}</h2>
      <h1>{props.title}</h1>
      <p>{props.content}</p>
      <p>{props.jsonDate}</p>

    <Link to={'posts/' + props.id}>
     <p>read More...</p>
    </Link>


      {/* <button className="dltBtn" onClick={handleClick}>
        <DeleteIcon />
      </button> */}
    </div>
  );
}

export default Note;
