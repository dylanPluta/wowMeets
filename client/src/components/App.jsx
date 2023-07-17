import React, { useState, useEffect } from "react";
import Login from "./Login";
import Home from "./Home";
import About from "./About";
import { Route, Routes, useNavigate } from 'react-router-dom';
import Layout from './Layout';
import PostPage from './PostPage';
import UserPage from './UserPage';
import { getPosts, deletePost, addNote } from "../api/postsService";


function App() {
  const [notes, setNotes] = useState([]);
  const navigate = useNavigate();

  async function fetchPosts() {
    console.log('fetchPosts');
    const result = await getPosts();
    if (result && result.data) setNotes(result.data);
  }

  async function deleteNote(id) {
    console.log('deleteNote: ', id);
    const result = await deletePost(id);
    if (result.status < 400) {
      setNotes(previousNotes => previousNotes.filter((note, index) => index !== id));
      fetchPosts();
      navigate('/');
    }
  }

  useEffect(() => {
    console.log("useEffect")
    fetchPosts();
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index path='Login' element={< Login />} />
        <Route path="/" element={<Home notes={notes} setNotes={setNotes} deleteNote={deleteNote} />}>
        </Route>
        <Route path="about" element={<About />} />
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

