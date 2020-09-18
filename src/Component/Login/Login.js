import React, { useState, useContext } from 'react';
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { CategoryContext } from '../../App';
import { useHistory, useLocation, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import "./Login.css";
import google from "../../images/google.png";
import facebook from "../../images/fb.png";

firebase.initializeApp(firebaseConfig);

function Login() {
  const [newUser, setNewUser] = useState(false);
  const [user, setUser] = useState({
    isSignedIn: false,
    name: '',
    email: '',
    photo: '',
    password: '',
  })

  const [name, setName, place, setPlace, loggedInUser, setLoggedInUser] = useContext(CategoryContext);
  const googleProvider = new firebase.auth.GoogleAuthProvider();
  const fbprovider = new firebase.auth.FacebookAuthProvider();
  let history = useHistory();
  let location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  const handleFBLogin = () => {
    firebase.auth().signInWithPopup(fbprovider).then(function (result) {
      var token = result.credential.accessToken;
      let user = result.user;
      setUser(user);
      setLoggedInUser(user);
      history.replace(from);

    }).catch(function (error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      var email = error.email;
      var credential = error.credential;
    });
  }

  const handleGoogleSignIn = () => {
    firebase.auth().signInWithPopup(googleProvider)
      .then(res => {
        const { displayName, photoURL, email } = res.user;
        const singedInUser = {
          isSignedIn: true,
          name: displayName,
          email: email,
          photo: photoURL
        }
        setUser(singedInUser);
        setLoggedInUser(singedInUser);
        history.replace(from);
      })
      .catch(err => {
        console.log(err);
        console.log(err.message);
      })
  }
  const handleSignOut = () => {
    firebase.auth().signOut()
      .then(res => {
        const signedOutUser = {
          isSignedIn: false,
          name: '',
          photo: '',
          email: '',
          password: '',
          error: '',
          success: false
        }
        setUser(signedOutUser);
      })
      .catch(err => {
      })
  }
  const handleSubmit = (event) => {
    if (newUser && user.email && user.password) {
      firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
        .then(res => {
          const newUserInfo = { ...user };
          newUserInfo.error = "";
          newUserInfo.success = true;
          setUser(newUserInfo);
          updateUserName(user.name);
          setLoggedInUser(newUserInfo);
          history.replace(from);
        })
        .catch(error => {
          const newUserInfo = { ...user };
          newUserInfo.error = error.message;
          newUserInfo.success = false;
          setUser(newUserInfo);
        });
    }
    if (!newUser && user.email && user.password) {
      firebase.auth().signInWithEmailAndPassword(user.email, user.password)
        .then(res => {
          const newUserInfo = { ...user };
          newUserInfo.error = "";
          newUserInfo.success = true;
          setUser(newUserInfo);
          setLoggedInUser(newUserInfo);
          history.replace(from);
        })
        .catch(error => {
          const newUserInfo = { ...user };
          newUserInfo.error = error.message;
          newUserInfo.success = false;
          setUser(newUserInfo);
        });
    }
    event.preventDefault();
  };

  const updateUserName = name => {
    const user = firebase.auth().currentUser;
    user.updateProfile({
      displayName: name
    }).then(function () {
      
    }).catch(function (error) {
      console.log(error);
    });
  }
  
  const handleBlur = (event) => {
    let isFieldValid = true;
    if (event.target.name === "email") {
      isFieldValid = /\S+@\S+\.\S+/.test(event.target.value);
    }
    if (event.target.name === "password") {
      const isPasswordValid = event.target.value.length > 6;
      const passHasNumber = /\d{1}/.test(event.target.value);
      isFieldValid = isPasswordValid && passHasNumber;
    }
    if (isFieldValid) {
      const newUserInfo = { ...user };
      newUserInfo[event.target.name] = event.target.value;
      setUser(newUserInfo);
    }
  }
  
  return (
    <div class="container">
      <div class="row">
        <div class="col-12 col-lg-2"></div>
        <div class="col-12 col-lg-8 " style={{ textAlign: 'center' }}>

          <form className="booking-form" onSubmit={handleSubmit}>
              {newUser ? <h3>Create an account</h3> : <h3>Login </h3>}
              {newUser && <input type="text" name='name' onBlur={handleBlur} placeholder="First Name" />}
              {newUser && <input type="text" name='name' onBlur={handleBlur} placeholder="Last Name" required/>}

              <input type= "email" name="email" onBlur={handleBlur} defaultValue={loggedInUser.email}  placeholder="Your email" required/>

              <input type = "password" name="password" onBlur={handleBlur}  placeholder="Your password" required/>

              {newUser && <input type = "password" name="confirmPassword" onBlur={handleBlur} placeholder="Confirm password" required/>}

              <input className="submitButton" type="submit" value={newUser ? "Create an account" : "Login"} />

              {newUser ? <p style={{ marginTop:"10px"}}>Already have an account? 
              <span onClick={()=> setNewUser(!newUser)} style={{ color: "green" }}> Login</span>
              </p> : 
              <p style={{ marginTop:"10px"}}>Don't have an account? 
              <span onClick={() => setNewUser(!newUser)} style={{ color: "green" }}> Create an account</span>
              </p>}
          </form>

          <h5>or</h5>
          {
            user.isSignedIn ? <button onClick={handleSignOut}>Sign out from google</button> :
              <button className='googlefbButton googleButton' onClick={handleGoogleSignIn}>
                <img src={google} style={{ width: "5%", paddingRight: "5px" }} alt="" />
                Continue with Google
              </button>
          }
          <br/><br/>
          
          <button className='googlefbButton' onClick={handleFBLogin}>
            <img src={facebook} style={{ width: "5%", paddingRight: "5px" }} alt="" />
              Continue with Facebook
          </button>
        </div>
        <div class="col-12 col-lg-2"></div>
      </div>
    </div>
  );
}

export default Login;
