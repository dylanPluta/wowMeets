import { useLocation, useParams, Link } from "react-router-dom";
import React, {useState, useEffect} from 'react';

import Note from "./Note";

const UserPage = ({notes, deleteNote, addComment}) => {
    const { userName } = useParams();
    const x = decodeURI(userName);
    console.log(x, "userPage");

    const location = useLocation();
    console.log(location);

    const userNameHash = userName + location.hash;
    console.log(userNameHash);


    const [noteStatus, setNoteStatus] = useState([""]); 

    useEffect(() => {
      const findNote = document.getElementsByClassName('note');
      console.log(findNote);
      if (findNote.length > 0){
        console.log("found Notes")
        setNoteStatus("");
      } else {
        console.log("no NOtes")
        setNoteStatus("No posts to display.");
      }
    },[]);




   return(

<main>
      <h1 className="userPageHeader">{userNameHash}</h1>
    {notes.map((noteItem, index) => {
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
                console.log("no more posts")
                )
            }
            
        }
        )}
        <h1 className='noteStatus'>{noteStatus}</h1>
</main>
   )
}

export default UserPage