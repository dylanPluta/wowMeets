import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getUser } from "../api/usersService";
import { BASE_URL } from "../api/axiosConfig";

const Login = () => {
  const [userName, setUserName] = useState([]);

  async function loadUser() {
    const response = await getUser();

    console.log(response.data);
    setUserName(response.data);
  }

  useEffect(() => {
    loadUser();
  }, []);

  if (userName !== "guest") {
    console.log(userName + " is Authenticated");

    return (
      <main>
        <h1>
          Hello,
          <Link className="hypeLink" to={"users/" + userName}>
            {" " + userName}
          </Link>
        </h1>
        <br />
        <Link className="hypeLink" to={BASE_URL + "/logout"}>
          Logout
        </Link>
        <p className="inlineLink"> | </p>
        <Link className="hypeLink" to="/about">
          About
        </Link>
      </main>
    );
  } else {
    console.log(userName + " is not Authenticated");

    return (
      <main>
        <h1>
          Hello, <a className="hypeLink"> {userName}</a>{" "}
        </h1>
        <br />
        <Link className="hypeLink" to={BASE_URL + "/oauth/battlenet"}>
          Login with Battle.Net
        </Link>
        <p className="inlineLink"> | </p>
        <Link className="hypeLink" to="/about">
          About
        </Link>
      </main>
    );
  }
};

export default Login;
