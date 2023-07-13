import { useLocation, useParams, Link } from "react-router-dom";
import React from 'react';

import Note from "./Note";

const UserPage = ({notes, deleteNote, addComment}) => {
    const { userName } = useParams();
    const x = decodeURI(userName);
    console.log(x, "userPage");

    const location = useLocation();
    console.log(location);

    const userNameHash = userName + location.hash;
    console.log(userNameHash);

   return(

<main>{
    notes.map((noteItem, index) => {
        if (noteItem.userName == userNameHash){
        return (
            <Note
              key={index}
              id={noteItem._id}

              userName={(noteItem.userName).length <= 13
                    ? noteItem.userName
                    : `${(noteItem.content).slice(0, 13)}...`}

              realm={(noteItem.realm).length <= 13
                    ? noteItem.realm
                    : `${(noteItem.realm).slice(0, 13)}...`}
              postType={noteItem.postType}
              // title={noteItem.title}
              title={(noteItem.title).length <= 20
                    ? noteItem.title
                    : `${(noteItem.title).slice(0, 20)}...`}
              content={(noteItem.content).length <= 25
                    ? noteItem.content
                    : `${(noteItem.content).slice(0, 25)}...`}
              onDelete={deleteNote}
            />
              )
            }else{
                return(
                <h1>Sorry, Looks like theres no posts for this</h1>
                )
            }
        }
        )
}</main>
   )
}

export default UserPage