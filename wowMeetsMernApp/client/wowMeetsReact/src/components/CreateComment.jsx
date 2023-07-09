import React, { useState } from "react";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import Zoom from "@material-ui/core/Zoom";


function CreateComment(props) {
  const [isExpanded, setExpanded] = useState(false);

  var userName = props.usersName;
  

  const [comment, setComment] = useState({
    userName: userName,
    content: "",
    postId:props.id
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setComment(prevComment => {
      return {
        ...prevComment,
        [name]: value
      };
    });
  }

  function submitComment(event) {
    props.onAdd(comment);
    console.log(userName + " yo");
    let result = Array.isArray(userName);
    console.log(result + " is Array");
    setComment({
      userName: userName,
      content: "",
      postId: props.id
    });
    console.log(props.id);
    event.preventDefault();
  }

  function expand() {
    setExpanded(true);
  }

console.log("createCommentRender")

  return (
    <div>
      <form className="create-note">
        {/* {isExpanded && (
          <input
            name="title"
            onChange={handleChange}
            value={note.title}
            placeholder="Title"
          />
        )} */}

        <textarea
          name="content"
           onClick={expand}
          onChange={handleChange}
          value={comment.content}
          placeholder="Make a comment..."
          rows={isExpanded ? 3 : 1}
        />
        <Zoom in={isExpanded}>
          <Fab onClick={submitComment}>
            <AddIcon />
          </Fab>
        </Zoom>
      </form>
    </div>
  );
}

export default CreateComment;
