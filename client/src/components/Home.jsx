import React, { useState, useEffect } from 'react'
import CreateArea from "./CreateArea";
import NoteArea from './NoteArea';
import Select from "react-select";
import { useNavigate } from 'react-router-dom';
import { getUser } from '../api/usersService';
import { getRealms } from '../api/realmService';

const Home = ({ notes, deleteNote, setNotes }) => {

  const [usersName, setUserName] = useState("guest");
  const [realmListState, setRealmListState] = useState([]);
  const realmList = [{ value: "All", label: "All" }];

  const navigate = useNavigate();

  useEffect(() => {
    console.log("useEffectHome");
    getRealmList();
    loadUser();
  }, []);

  useEffect(() => {
    console.log(selectedRealm, "useEffect")
  }, [selectedRealm]);

  async function loadUser() {
    const response = await getUser();

    console.log(response.data + " Home")
    setUserName(response.data.toString())
  }

  async function getRealmList() {
    const response = await getRealms();

    console.log("realmList", response.data.realms[1].name)

    for (var i = 0; i < response.data.realms.length; i++) {
      var object = response.data.realms[i].name.toString();

      realmList.push({ value: object, label: object });
      realmList.sort();
    }
    console.log(realmList);

    setRealmListState(realmList);
    realmListState.sort();
  }

  const [selectedOptions, setSelectedOptions] = useState();
  const [selectedRealm, setSelectedRealm] = useState("empty");

  // Function triggered on selection
  function handleSelect(data) {
    setSelectedOptions(data);
    console.log(selectedRealm, "selectData");
    setSelectedRealm(data.value.toString());
  }

  const postTypeOptions = [
    { value: "All", label: "All" },
    { value: "Trade", label: "Trade" },
    { value: "Duel", label: "Duel" },
    { value: "Quest", label: "Quest" },
    { value: "Raid/ Dungeon", label: "Raid/ Dungeon" },
    { value: "Other", label: "Other" }
  ]

  const [selectedPostTypeOptions, setSelectedPostTypeOptions] = useState();
  const [selectedPostType, setSelectedPostType] = useState("empty");

  // Function triggered on selection
  function handleSelectPostType(data) {
    setSelectedPostTypeOptions(data);
    console.log(selectedPostType, "selectData");
    setSelectedPostType(data.value.toString());
  }

  console.log(selectedRealm)
  console.log(selectedPostType)

  function userSearch() {
    const searchName = document.getElementById("userSearchField");
    console.log(searchName.value)
    navigate('/users/' + encodeURI(searchName.value));
  }


  return (
    <main>
      <div className='row selectArea'>
        <div className=" col-lg-12">
          <p className='selectorPText'>Choose a realm and post tag to look at and post in.</p>
        </div>
        <div className="app col-lg-6 col-md-12">
          <h2 className='selectorText'>Realm</h2>
          <div className="dropdown-container">
            <Select
              options={realmListState}
              placeholder="Select Realm"
              value={selectedOptions}
              onChange={handleSelect}
            />
          </div>
        </div>
        <div className="app col-lg-6 col-md-12">
          <h2 className='selectorText'>Post Tag</h2>
          <div className="dropdown-container">
            <Select
              options={postTypeOptions}
              placeholder="Select Post Tag"
              value={selectedPostTypeOptions}
              onChange={handleSelectPostType}
            />
          </div>
        </div>
        <div className='app col-lg-12'>
          <h2 className='selectorText'>or</h2>
          <h2 className='selectorText'>Search for a user's posts</h2>
          <form>
            <input id="userSearchField" placeholder='search for user' />
            <button type="button" onClick={userSearch}>Submit</button>
          </form>
        </div>
      </div>
      <div>
        {usersName !== "guest" ? (
          selectedRealm !== "empty" && selectedPostType !== "empty" ? (
            <CreateArea usersName={usersName} setNotes={setNotes} selectedRealm={selectedRealm} realmListState={realmListState} selectedPostType={selectedPostType} />
          ) : (
            <h1 className='postArea'>Please select a Realm and Tag to Post.</h1>
          )
        ) : (
          <h1 className='postArea'>Please Login to Post.</h1>
        )}
        <NoteArea notes={notes} deleteNote={deleteNote} selectedRealm={selectedRealm} selectedPostType={selectedPostType} />
      </div>
    </main>
  )

}

export default Home