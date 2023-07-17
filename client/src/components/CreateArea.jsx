import React, { useState, useEffect } from "react";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import Zoom from "@material-ui/core/Zoom";
import { addNote } from "../api/postsService";

function CreateArea(props) {
  const [isExpanded, setExpanded] = useState(false);



  var userName = props.usersName;
  var matches = false;

  var currentMilli = Date.now();
  console.log(currentMilli);

  const [note, setNote] = useState({
    userName: userName,
    realm: props.selectedRealm,
    postType: props.selectedPostType,
    title: "",
    content: "",
    timeDate: currentMilli
  });

  useEffect(() => {
    console.log(props.selectedRealm, "useEffect")
    if (note.realm !== props.selectedRealm || note.postType !== props.selectedPostType) {
      setNote({
        userName: userName,
        realm: props.selectedRealm,
        postType: props.selectedPostType,
        title: "",
        content: "",
        timeDate: currentMilli
      })
    }
  }, [props.selectedRealm, props.selectedPostType]);


  function handleChange(event) {


    const { name, value } = event.target;

    setNote(prevNote => {
      return {
        ...prevNote,
        [name]: value
      };
    });
  }



  async function submitNote(event) {

    event.preventDefault();

    console.log(currentMilli)

    if (props.selectedRealm != "empty") {


      matches = true;

      console.log(matches, "does it match?")

      console.log(props.selectedRealm, "handleChange Realm");

      console.log(note);

      const response = await addNote(note);
      if (response && response.data) {
        setNote({
          userName: userName,
          realm: props.selectedRealm,
          postType: props.selectedPostType,
          title: "",
          content: "",
          timeDate: currentMilli
        });
        console.log(response.data, "setnotes")
        props.setNotes(prevNotes => {
          return [...prevNotes, response.data];
        });

      }
    } else {
      console.log(props.selectedRealm)
    }

  }

  function expand() {
    setExpanded(true);
  }







  return (
    <div>
      <form className="create-note">
        <input
          name="title"
          onClick={expand}
          onChange={handleChange}
          value={note.title}
          placeholder={isExpanded ? "Title" : "Make a post..."}
        />

        {isExpanded && (
          <textarea
            name="content"
            onChange={handleChange}
            value={note.content}
            placeholder="Body"
          />
        )}
        <Zoom in={isExpanded}>
          <Fab onClick={submitNote}>
            <AddIcon />
          </Fab>
        </Zoom>
      </form>
    </div>
  );
}

export default CreateArea;
