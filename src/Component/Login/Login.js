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

  const { register, watch, errors } = useForm();
  const onSubmit = data => console.log(data);
  console.log(watch("example")); // watch input value by passing the name of it

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
      // console.log("fb signed in", user);
      setUser(user);
      setLoggedInUser(user);
      history.replace(from);

    }).catch(function (error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      var email = error.email;
      var credential = error.credential;
      //  console.log(errorMessage);
      // ...
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
    //   console.log(user.email && user.password);
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
          // Handle Errors here.
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


          //   console.log("sign in user info", res.user);
        })
        .catch(error => {
          // Handle Errors here.
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
      console.log("username updated successfully");
    }).catch(function (error) {
      console.log(error);
    });
  }
  const changeStatus = () => {

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
  console.log(newUser);
  return (
    <div class="container">
      <div class="row">
        <div class="col-12 col-lg-2"></div>
        <div class="col-12 col-lg-8 " style={{ textAlign: 'center' }}>


          {/* {
        user.isSignedIn && <div>
          <p>Welcome {user.name}</p>
          <p>Your email is {user.email}</p>
          <img src={user.photo} alt=""/>
        </div>
      } */}

          {/* submit button with form */}
          {/* <h1>Our own authentication</h1>
      <p>email:{user.email}</p>
      <p>pass:{user.password}</p> */}

          {/* <input type="checkbox" onChange = {()=> setNewUser(!newUser)}name="newUser" id=""/>
      <label htmlFor="newUser">New User Sign up</label> */}

          <form className="ship-form" onSubmit={handleSubmit}>
            { /* <form className = "ship-form" onSubmit={handleSubmit(onSubmit)}></form> */}
            {newUser ? <h3>Create an account</h3> : <h3>Login </h3>}
            {newUser && <input type="text" name='name' onBlur={handleBlur} placeholder="First Name" />}
            {newUser && <input type="text" name='name' onBlur={handleBlur} placeholder="Last Name" />}

            <input name="email" onBlur={handleBlur} defaultValue={loggedInUser.email} ref={register({ required: true })} placeholder="Your email" />
            {errors.email && <span className="error">Email is required</span>}

            {/* <input type="text" name="email" onBlur = {handleBlur} placeholder="Your email" required/> */}

            <input name="password" onBlur={handleBlur} ref={register({ required: true })} placeholder="Your password" />
            {errors.password && <span className="error">Password is required</span>}
            {/* <input type="password" name="password" onBlur = {handleBlur} placeholder="Your password" required/> */}

            {newUser && <input name="confirmPassword" onBlur={handleBlur} ref={register({ required: true })} placeholder="Confirm password" />}
            {errors.confirmPassword && <span className="error">Password is required</span>}

            <input className="submitButton" type="submit" value={newUser ? "Create an account" : "Login"} />

            {newUser ? <p style={{ marginTop:"10px"}}>Already have an account? 
            <span onClick={() => setNewUser("hello")} style={{ color: "green" }}>Login</span>
            </p> : 
            <p style={{ marginTop:"10px"}}>Don't have an account? 
            <span onClick={() => setNewUser("hello")} style={{ color: "green" }}>Create an account</span>
            </p>}


            {/* <p style={{ marginTop:"10px"}}>Don't have an account? 
            <span onClick={() => setNewUser("hello")} style={{ color: "green" }}>Create an account</span>
            </p> */}

          </form>
          <p style={{ color: "red" }}>{user.error}</p>
          {user.success && <p style={{ color: "green" }}>User {newUser ? "created" : "logged in"} successfully!</p>}


          <h5>or</h5>

          {
            user.isSignedIn ? <button onClick={handleSignOut}>Sign out from google</button> :
              <button className='googlefbButton googleButton' onClick={handleGoogleSignIn}>
                <img src={google} style={{ width: "5%", paddingRight: "5px" }} alt="" />
        Continue with Google</button>
          }
          <br /> <br />
          <button className='googlefbButton' onClick={handleFBLogin}>
            <img src={facebook} style={{ width: "5%", paddingRight: "5px" }} alt="" />
        Continue with Facebook</button>


        </div>
        <div class="col-12 col-lg-2"></div>

      </div>
    </div>

  );
}

export default Login;
