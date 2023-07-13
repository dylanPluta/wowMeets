require('dotenv').config();

const express = require("express")
const app = express()
const mongoose = require('mongoose')
const PostModel = require ('./models/Posts')
const UsersModel = require ('./models/Users')
const CommentsModel = require ('./models/PostComments')
const schedule = require('node-schedule');

const cors = require("cors");

app.use(express.json());
// app.use(cors());
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));

const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const BnetStrategy = require('passport-bnet').Strategy;

const BNET_ID = process.env.BNET_OAUTH_CLIENT_ID;
const BNET_SECRET = process.env.BNET_OAUTH_CLIENT_SECRET;
const OAUTH_CALLBACK_URL = process.env.OAUTH_CALLBACK_URL || "http://localhost:3001/oauth/battlenet/callback/";
// Review full list of available scopes here: https://develop.battle.net/documentation/guides/using-oauth
const OAUTH_SCOPES = process.env.OAUTH_SCOPES || "wow.profile";

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(obj, done) {
    done(null, obj);
});


// Register the BnetStrategy within Passport.
passport.use(
  new BnetStrategy(
    { clientID: BNET_ID,
      clientSecret: BNET_SECRET,
      // scope: OAUTH_SCOPES,
      region: "us",
      state: true,
      callbackURL: OAUTH_CALLBACK_URL },
    function(accessToken, refreshToken, profile, done) {
      process.nextTick(function () {
        return done(null, profile);
      });
    })
);

// configure Express
app.use(cookieParser());
app.use(session({ secret: 'passport-battlenet-wowMeets', // Change this value to a unique value for your application!
                  saveUninitialized: true,
                  resave: true }));

// Initialize Passport! Also use passport.session() middleware, to support
// persistent login sessions (recommended).
app.use(passport.initialize());
app.use(passport.session());

app.get('/oauth/battlenet',
  passport.authenticate('bnet')
);

app.get('/oauth/battlenet/callback',
  passport.authenticate('bnet', { failureRedirect: 'http://localhost:3000/' }),
  function(req, res){
    res.redirect('back');
  }
);

app.get('/LoginApp', function (req,res){
  if(req.isAuthenticated()) {
    console.log(req.user.battletag)
    const userName = req.user.battletag;
    console.log(userName)
    res.json(userName);
  } else {
    const userName = "guest";
    res.json(userName);
  }}
);


app.get('/logout', function(req, res) {
  req.logout(function(err) {
    if (err) { return next(err); }
  res.redirect('http://localhost:3000/');
  });
});

app.use(function (err, req, res, next) {
  console.error(err);
  res.send("<h1>Internal Server Error</h1>");
});

var myToken = "empty"

fetch("https://us.oauth.battle.net/oauth/token", {body: "grant_type=client_credentials", method:'POST', 
headers: {'Authorization': 'Basic ' + btoa(BNET_ID + ':' + BNET_SECRET), "Content-Type": "application/x-www-form-urlencoded"}})
.then(response =>  response.json()
  .then(data => myToken = data.access_token)
  .then( myToken => console.log(myToken, "myToken"))
);

const RealmUrl = "https://us.api.blizzard.com/data/wow/realm/index?namespace=dynamic-us&locale=en_US"

app.get('/getRealm', function(req, res) {
  fetch(RealmUrl,{ method:'GET',  headers : {Authorization: "Bearer " + myToken}})
  .then(response => {
    response.json()
    .then(data => {console.log(data);(res.send(data))});
      // console.log(response);
      console.log(myToken, "myToken again just to make sure its still right")
      })
})


mongoose.connect("mongodb://127.0.0.1:27017/posts", {useNewUrlParser: true})

app.get("/getPosts", (req, res) => {
  PostModel.find({}).then(function(result){
    res.json(result);
  }).catch((err) => {
    res.json(err);
  })
});

app.get("/getComments", (req, res) => {
  CommentsModel.find({}).then(function(result){
    res.json(result);
  }).catch((err) => {
    res.json(err);
  
  })
});
  
app.post("/createPost", async (req, res) => {
  const post = req.body;
  const newPost = new PostModel(post);
  await newPost.save();
  
  res.json(newPost);
});

app.post("/createComment", async (req, res) => {
  const comment = req.body;
  const newComment = new CommentsModel(comment);
  await newComment.save();
  res.json(comment);
});

app.delete('/deletePost/:id', (req, res) => {
  const id = req.params.id;
  console.log(id);
  console.log(PostModel.findById(id))
  PostModel.findByIdAndDelete(id).then( function(err){
    res.json({
       msg:"delete request recieved."
    });
  }).catch(err => res.send("Error"));
}); 

const rule = new schedule.RecurrenceRule();
rule.minute = 1;
  
const job = schedule.scheduleJob(rule, function(){
  console.log('The answer to life, the universe, and everything!');
  const now = Date.now(); // Unix timestamp in milliseconds
  console.log( now, "now" );


  //find posts
  PostModel.find({}).then(function(result){
    const theResult = result;
    console.log(theResult);

  //for every post
  for (var i = 0; i < theResult.length; i++) {
    const theResultRefined = theResult[i]
    CommentsModel.find({}).then(function(result){
      if (result > 0){
        //for all comments
        for (var i = 0; i < result.length; i++) {
          //check if comments and post share id
          if (result[i].postId == theResultRefined._id.toHexString()){
            console.log(result, theResultRefined._id.toHexString())
            console.log("we got a bingo!")
            console.log(result[result.length-1]);
            diff =  now - result[result.length-1].timeDate;
            console.log(theResultRefined._id)
            //check diff            
            if (diff >= 43200000){
              console.log("delete")
              CommentsModel.deleteMany({postId: theResultRefined._id}).then(function(result){
                console.log(result);
              });
              PostModel.findByIdAndDelete(theResultRefined._id).then( function(result){
                console.log(result, "deleted")
              })
            } else {
              console.log("dont delete")
            }

          } else {
            console.log(result[i].postId, theResultRefined._id.toHexString())
            console.log("no  Biingo sir")

            var diff = now - theResultRefined.timeDate;
              console.log(diff, "diff")            
              if (diff >= 43200000){
                console.log("delete")
                console.log(theResultRefined._id.toHexString());
                PostModel.findByIdAndDelete(theResultRefined._id.toHexString()).then( function(err){
                  console.log(theResultRefined._id.toHexString(), "deleted")
                })  
              } else {
                console.log("dont delete")
              }
        

          }
        }} else {
          console.log("no  comment sir")
          var diff = now - theResultRefined.timeDate;
          console.log(diff, "diff")
          if (diff >= 43200000){
            console.log("delete")
            console.log(theResultRefined._id.toHexString());
            PostModel.findByIdAndDelete(theResultRefined._id.toHexString()).then( function(err){
              console.log(theResultRefined._id.toHexString(), "deleted")
            })
          } else {
            console.log("dont delete")
          }
        }
      }
    )
  }}).catch((err) => {
    console.log(err, "error")
  })}
);

app.listen(3001, ()=> {
    console.log("Server Runs");
});