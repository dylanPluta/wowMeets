import axios from 'axios';
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";

const Login = () => {
    const [userName, setUserName] = useState([]); 

    axios.get("http://localhost:3001/LoginApp", {withCredentials: true}).then((response)=> {

    console.log(response.data)
    setUserName(response.data)
    }, []);



    if(userName !== "guest") {
        console.log(userName + " is Authenticated");
        return(

            <main>
              <h1>Hello,     
              <Link className="hypeLink" to={'users/' + userName}>
              {" " + userName}
              </Link>
              </h1>

              <br />
              <Link className="hypeLink" to="http://localhost:3001/logout">
              Logout
              </Link>
                      <p className='inlineLink'>     |     </p>
              <Link className="hypeLink" to="/about">
              About
              </Link>
            </main>

          )
        ;
        // res.send(output);
      } else {
        console.log(userName + " is not Authenticated");
        return(

            <main>
              <h1>Hello, <a className="hypeLink"> {userName}</a> </h1>
              {/* <h2>{userName}</h2> */}
              <br />
              <Link className="hypeLink" to="http://localhost:3001/oauth/battlenet">
              Login with Battle.Net
              </Link>
            </main>
        )
        ;
      }
}


export default Login 

