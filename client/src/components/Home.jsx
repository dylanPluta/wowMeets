import React, { useState, useEffect } from "react";
import CreateArea from "./CreateArea";
import NoteArea from "./NoteArea";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import { getUser } from "../api/usersService";
import { getRealms } from "../api/realmService";

import {  TextField, IconButton } from "@material-ui/core";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";

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
    console.log(selectedRealm, "useEffect");
  }, [selectedRealm]);

  async function loadUser() {
    const response = await getUser();

    console.log(response.data + " Home");
    setUserName(response.data.toString());
  }

  async function getRealmList() {
    const response = await getRealms();

    console.log("realmList", response.data.realms[1].name);

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
  function handleSelect() {
    // setSelectedOptions(data);
    console.log(selectedRealm, "selectData");
    // setSelectedRealm(data.value.toString());
  }

  const postTypeOptions = [
    { value: "All", label: "All" },
    { value: "Trade", label: "Trade" },
    { value: "Duel", label: "Duel" },
    { value: "Quest", label: "Quest" },
    { value: "Raid/ Dungeon", label: "Raid/ Dungeon" },
    { value: "Other", label: "Other" },
  ];

  const [selectedPostTypeOptions, setSelectedPostTypeOptions] = useState();
  const [selectedPostType, setSelectedPostType] = useState("empty");

  // Function triggered on selection
  function handleSelectPostType(data) {
    setSelectedPostTypeOptions(data);
    console.log(selectedPostType, "selectData");
    setSelectedPostType(data.value.toString());
  }

  console.log(selectedRealm);
  console.log(selectedPostType);

  function userSearch() {
    const searchName = document.getElementById("userSearchField");
    console.log(searchName.value);
    navigate("/users/" + encodeURI(searchName.value));
  }



  return (
    <main>
      <div className="row selectArea">
        <div className=" col-lg-12">
          <p className="selectorPText">
            Choose a realm and post tag to look at and post in.
          </p>
        </div>
        <div className="app col-lg-6 col-md-12">

          {/* <Autocomplete 
            id="free-solo-demo"
            sx={{ width: 300 }}
            className="textInputField"
            // onChange={handleSelect}
            onChange={(event, value) =>{setSelectedRealm(value.label);
              handleSelect();
            } }
            getOptionLabel = {option => option.label}
            options={realmListState}
            value={selectedOptions} 
            renderInput={(params) => <TextField {...params} placeholder="  Select Realm" />}
          /> */}









          <h2 className="selectorText">Realm</h2>
          <div className="dropdown-container">
            <Select
              options={realmListState}
              placeholder={<div className="selectPlaceholder">Select Realm</div>}
              value={selectedOptions}
              onChange={handleSelect}
            />
          </div>
        </div>
        <div className="app col-lg-6 col-md-12">
          <h2 className="selectorText">Post Tag</h2>
          <div className="dropdown-container">
            <Select
              options={postTypeOptions}
              placeholder={<div className="selectPlaceholder">Select Post Tag</div>}
              value={selectedPostTypeOptions}
              onChange={handleSelectPostType}
            />
          </div>
        </div>
        <div className="app col-lg-12">
          <h2 className="selectorText">or</h2>
          <h2 className="selectorText">Search for a user's posts</h2>

          <TextField className="textInputField"
            placeholder="  Search For User"
            id="userSearchField" 
            InputProps={{
            endAdornment: (
            <InputAdornment>
              <IconButton 
                   
                onClick={userSearch}
                disableFocusRipple
                disableRipple
                style={{ backgroundColor: "transparent" }}
                aria-label="twitter"
              >
              <div class=" css-1hb7zxy-IndicatorsContainer">
                <span class=" css-1u9des2-indicatorSeparator">
                </span>
                <div class=" indicatorContainorFix" aria-hidden="true">
                <SearchIcon className="searchIcon" />
                </div></div>

              </IconButton>
            </InputAdornment>
            )
            }}
          />
        </div>
      </div>
      <div>
        {usersName !== "guest" ? (
          selectedRealm !== "empty" && selectedPostType !== "empty" ? (
            <CreateArea
              usersName={usersName}
              setNotes={setNotes}
              selectedRealm={selectedRealm}
              realmListState={realmListState}
              selectedPostType={selectedPostType}
            />
          ) : (
            <h1 className="postArea">Please select a Realm and Tag to Post.</h1>
          )
        ) : (
          <h1 className="postArea">Please Login to Post.</h1>
        )}
        <NoteArea
          notes={notes}
          deleteNote={deleteNote}
          selectedRealm={selectedRealm}
          selectedPostType={selectedPostType}
        />
      </div>
    </main>
  );
};

export default Home;
