import React, { useState, useEffect } from "react";
import ReactDOM from 'react-dom'
import { useParams, Link, useNavigate } from "react-router-dom";
import Comment from "./Comment";
import CreateComment from "./CreateComment";

import axios from 'axios';
import post from "../api/post";

const Comments = (notes) => {

    const [comments, setComments] = useState([]); 
    const [usersName, setUserName] = useState("guest"); 
    const navigate = useNavigate();


    const { id } = useParams();
    const postComments = comments.find(commentItem => (commentItem.postId)?.toString() === id);
    


    useEffect(() => {
        console.log("useEffectComments");
        fetchComments();
        checkForUser();
      },[]);
    
    async function fetchComments () {
        try {
          axios.get("http://localhost:3001/getComments").then((response)=> {


          const result = response.data.filter(comment => comment.postId == id);

            setComments(result)
            console.log(response.data)
          }, []);
          console.log("fetchComments")
        //   console.log(noteItem)
        //   console.log(postComments)
        // console.log(commentItem)
        console.log(id)

        }catch (err){
          if (err.response) {
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.headers);
          } else {
            console.log(`error: ${err.message}`)
          }
    
        } 
      } 
      

    async function addComment(newComment){
      console.log(usersName);
      if(usersName !== "guest") {
        try {
          axios.post("http://localhost:3001/createComment", newComment ).then((response) => {
            setComments(prevComments => {
              return [...prevComments, response.data];
            });
          });
          console.log("addComment");
                fetchComments();
                
        }catch(err){
          console.log(`Error: ${err.message}`);
        }
      } else {
        alert("You need to login first");
      }
    } 




async function checkForUser() {
      axios.get("http://localhost:3001/LoginApp", {withCredentials: true}).then((response)=> {

    console.log(response.data)
    // userName = response.data;
    setUserName(response.data.toString())

    }, []);
}



    return(
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
                       
            )
            })}  
            {usersName !== "guest" ? (
              <CreateComment onAdd={addComment} notes={notes} id={id} usersName={usersName}/>
      ) : (
        <h1>Please Login to Comment.</h1>
      )}
               
        </main>
    )
}

export default Comments