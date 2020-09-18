import React, { useState, createContext, useEffect } from 'react';
import './App.css';
import fakedata from '../src/fakedata/fakedata';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Header from './Component/Header/Header';
import Home from './Component/Home/Home';
import Booking from './Component/Booking/Booking';
import Login from './Component/Login/Login';
import BookingHotels from './Component/BookingHotels/BookingHotels';
import PrivateRoute from './Component/PrivateRoute/PrivateRoute';

export const CategoryContext = createContext();

function App() {
  const [name, setName] = useState("coxs bazar");
  const [place, setPlace] = useState({});
  const [loggedInUser, setLoggedInUser] = useState({});
    useEffect(() =>{
        const matchedPlace = fakedata.find(pd => pd.destination.toLowerCase() === name.toLowerCase());
        setPlace(matchedPlace);
    }, [name])
  return (
    <div>
    <CategoryContext.Provider value={[name, setName, place, setPlace, loggedInUser, setLoggedInUser]} > 
      <Router>
        <Header></Header>
        
        <Switch>
          <Route path = "/home">
            <Home></Home>
          </Route>
          <Route path = "/booking">
            <Booking></Booking>
          </Route>
          <PrivateRoute path= "/bookingHotels">
            <BookingHotels></BookingHotels>
          </PrivateRoute>
          <Route path = "/login">
            <Login></Login>
          </Route>
          <Route exact path = "/" >
            <Home></Home>
          </Route>
          <Route path = "*">
              <h1>Sorry, page not found</h1>
              <h2>404 error</h2>
          </Route>
        </Switch>
      </Router>    
    </CategoryContext.Provider>
    </div>
  );
}
export default App;
