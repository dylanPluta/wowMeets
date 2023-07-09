import React from 'react'
import Note from "./Note";
import { Link } from "react-router-dom";

const NoteArea = ({notes, deleteNote, selectedRealm, selectedPostType}) => {
    return(
      
        <main className='NoteArea'>
            {
              notes.map((noteItem, index) => {
                if (selectedRealm == "All"){
                  if (selectedPostType == "All"){
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
                  title={(noteItem.title).length <= 20
                    ? noteItem.title
                    : `${(noteItem.title).slice(0, 20)}...`}
                  content={(noteItem.content).length <= 25
                    ? noteItem.content
                    : `${(noteItem.content).slice(0, 25)}...`}
                  onDelete={deleteNote}
                />
                  )
                }

                
                  if (noteItem.postType == selectedPostType){
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
                  title={(noteItem.title).length <= 20
                    ? noteItem.title
                    : `${(noteItem.title).slice(0, 20)}...`}
                  content={(noteItem.content).length <= 25
                    ? noteItem.content
                    : `${(noteItem.content).slice(0, 25)}...`}
                  onDelete={deleteNote}
                />
              )
                  }
                
                }
                
                
                 else
                if (noteItem.realm == selectedRealm){
                  if (selectedPostType == "All"){
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
                  title={(noteItem.title).length <= 20
                    ? noteItem.title
                    : `${(noteItem.title).slice(0, 20)}...`}
                  content={(noteItem.content).length <= 25
                    ? noteItem.content
                    : `${(noteItem.content).slice(0, 25)}...`}
                  onDelete={deleteNote}
                />
                  )
                }
                
                
                else {
                  if (noteItem.postType == selectedPostType){
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
                  title={(noteItem.title).length <= 20
                    ? noteItem.title
                    : `${(noteItem.title).slice(0, 20)}...`}
                  content={(noteItem.content).length <= 25
                    ? noteItem.content
                    : `${(noteItem.content).slice(0, 25)}...`}
                  onDelete={deleteNote}
                />
              )
                  }
                }
                }
              }
            )}
        </main>
        
    )
}

export default NoteArea