import axios from 'axios';
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";

const Login = () => {

    // var userName = null;
    const [userName, setUserName] = useState([]); 

    axios.get("http://localhost:3001/LoginApp", {withCredentials: true}).then((response)=> {

    console.log(response.data)
    // userName = response.data;
    setUserName(response.data)
    }, []);



    if(userName !== "guest") {
        console.log(userName + " is Authenticated");
        return(

            <main>
              <h1>Hello,     
              <Link to={'users/' + userName}>
              {userName}
              </Link>
              </h1>

                  {/* <th>Account ID</th> */}


                  {/* <td>${req.user.id}</td> */}

              <br />
              <a href="http://localhost:3001/logout">Logout</a>
            </main>

          )
        ;
        // res.send(output);
      } else {
        console.log(userName + " is not Authenticated");
        return(

            <main>
              <h1>Hello, {userName} </h1>
              {/* <h2>{userName}</h2> */}
              <br />
              <a href="http://localhost:3001/oauth/battlenet">Login with Bnet</a>
            </main>
        )
        ;
        // res.send(output);
      }
}

    // return(
    //     <main>
    //     <h1>{userName}</h1>
    //     <a href="http://localhost:3001/oauth/battlenet">Login with Bnet</a>;
    // </main>
    // )


export default Login 






















// const Login = () => {

//     // const [loggedIn, setLoggedIn] = useState(false);

//         var loggedIn = false;

//     var userName = "steve";

    
//     useEffect(() => {
//         checkLogin();
//         console.log("is Authenticated : " + loggedIn + "A");
//    },[]);

 
//    function checkLogin() {

//     try{
//     axios.get("http://localhost:3001/LoginApp").then((response)=> {
        
//         loggedIn = response.data;

//         console.log(response.data + " B");


//         userName = "Bob"; 

//         console.log("hello, "+ "Bob");



//     });
//         }catch (err){
//           if (err.response) {
//           console.log(err.response.data);
//           console.log(err.response.status);
//           console.log(err.response.headers);
//           } else {
//             console.log(`error: ${err.message}`)
//           }
    
//         } 
//     }



//     // return(
//     //     <main>
//     //         <h1>beans</h1>
//     //     </main>
//     // )





//     if(loggedIn) {
//         console.log("is Authenticated : " + loggedIn + "C");
//         return(

//             <main>
//               <h1>Express Passport-Bnet OAuth Example</h1>

//                   {/* <th>Account ID</th> */}
//                   <h2>Battletag</h2>

//                   {/* <td>${req.user.id}</td> */}
//                   <h3>{userName}</h3>
//               <br />
//               <a href="/logout">Logout</a>
//             </main>

//           )
//         ;
//         // res.send(output);
//       } else {
//         console.log("is Authenticated : " + loggedIn + "C");
//         return(

//             <main>
//               <h1>Express Passport-Bnet OAuth Example</h1>
//               <br />
//               <a href="http://localhost:3001/oauth/battlenet">Login with Bnet</a>
//             </main>
//         )
//         ;
//         // res.send(output);
//       }
// }

// export default Login