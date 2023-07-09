import React from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import dltLeaf from "../images/leafX.png"
import { Link, link } from "react-router-dom";

function Comment(props) {
  

  return (
    <div className="Comment">
      <h1>{props.userName}</h1>
      <p>{props.content}</p>
      <hr/>
    </div>
  );
}

export default Comment;
