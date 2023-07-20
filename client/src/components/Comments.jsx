import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Comment from "./Comment";
import CreateComment from "./CreateComment";
import { getComments, addComments } from "../api/commentsService";
import { getUser } from "../api/usersService";

const Comments = (notes) => {
  const [comments, setComments] = useState([]);
  const [usersName, setUserName] = useState("guest");
  const navigate = useNavigate();

  const { id } = useParams();
  const postComments = comments.find(
    (commentItem) => commentItem.postId.toString() === id,
  );

  useEffect(() => {
    console.log("useEffectComments");
    fetchComments();
    checkForUser();
  }, []);

  async function fetchComments() {
    const response = await getComments(id);
    setComments(response);
  }

  async function addComment(newComment) {
    console.log(usersName);
    if (usersName !== "guest") {
      const response = await addComments(newComment);
      setComments((prevComments) => {
        return [...prevComments, response.data];
      });

      fetchComments();
    } else {
      alert("You need to login first");
    }
  }

  async function checkForUser() {
    const response = await getUser();

    console.log(response.data);
    setUserName(response.data.toString());
  }

  return (
    <main>
      {comments.map((commentItem, index, noteItem) => {
        return (
          <Comment
            key={index}
            id={commentItem._id}
            content={commentItem.content}
            userName={commentItem.userName}
            postId={commentItem.postId}
          />
        );
      })}
      {usersName !== "guest" ? (
        <CreateComment
          onAdd={addComment}
          notes={notes}
          id={id}
          usersName={usersName}
        />
      ) : (
        <h1>Please Login to Comment.</h1>
      )}
    </main>
  );
};

export default Comments;
