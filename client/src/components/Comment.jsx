import React from "react";

function Comment(props) {
  return (
    <div className="Comment">
      <h1>{props.userName}</h1>
      <p>{props.content}</p>
      <hr />
    </div>
  );
}

export default Comment;
