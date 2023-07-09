import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import api from '../api/post';
import Login from "./Login";
import Register from "./Register";
import Home from "./Home";
import Details from "./Details";
import About from "./About";
import {Route, Routes, useNavigate} from 'react-router-dom';
import Layout  from './Layout';
import NoteArea from './NoteArea';
import PostPage from './PostPage';
import UserPage from './UserPage';

import axios from 'axios';

function App() {
  const [notes, setNotes] = useState([]); 
  const navigate = useNavigate();


  useEffect(() => {
    // const fetchPosts = async () => {
    //   try {
    //     const response = await api.get(`posts`);
    //     setNotes(response.data);      
    //     console.log("useEffect")
    //   }catch (err){
    //     if (err.response) {
    //     console.log(err.response.data);
    //     console.log(err.response.status);
    //     console.log(err.response.headers);
    //     } else {
    //       console.log(`error: ${err.message}`)
    //     }

    //   } 
    // } 
    console.log("useEffect")
    fetchPosts();
  },[]);
  

  async function fetchPosts () {
    try {
      axios.get("http://localhost:3001/getPosts").then((response)=> {
        setNotes(response.data)
      }, []);

      // const response = await api.get(`posts`);
      // setNotes(response.data);      
      console.log("fetchPosts")
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



  

  async function deleteNote(id) {
    try {
 
      axios.delete('http://localhost:3001/deletePost/' + id)
      .then(() => {
        console.log("tryToDelete")
       setNotes(prevNotes => {
        return prevNotes.filter((noteItem, index) => {
          return index !== id;
      });  
      });
      fetchPosts();
      console.log("deleteNote " + id);
      navigate('/');
    });

      } catch (err){
      console.log(`Error: ${err.message}`);
    }
 
  }








  return (
  

        <Routes>
          <Route path="/" element={<Layout />}>
          <Route index path='Login' element={< Login />}/>
          <Route path="/" element={<Home notes={notes} setNotes={setNotes} deleteNote={deleteNote}/>}>
            </Route>
          <Route path="about" element={<About />}/>
          <Route path="/posts/:id" element={<PostPage
            notes={notes}
            deleteNote={deleteNote}
          />} />
          <Route path="/users/:userName" element={<UserPage
            notes={notes}
            
          />} />
          </Route>

        </Routes>

  );
}

export default App;





export async function addNote(newNote){
  try {
    // const response = await api.post(`/posts`, newNote)
    const result = await axios.post("http://localhost:3001/createPost", newNote )
      return result;
    
    // setNotes(prevNotes => {
    //   return [...prevNotes, response.data];
    // });

    console.log("addNote");
          fetchPosts();
          // navigate('/');
  }catch(err){
    console.log(`Error: ${err.message}`);
  }
}