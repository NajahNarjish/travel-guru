import React, { useState, createContext } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Header from './Component/Header/Header';
import Home from './Component/Home/Home';
import Booking from './Component/Booking/Booking';

export const CategoryContext = createContext();



function App() {
  const [name, setName] = useState("coxs bazar");
  console.log(name);
  return (
    <div className = "body">
    <CategoryContext.Provider value={[name, setName]} > 
      <Router>
        <Header></Header>
        
        <Switch>
          <Route path = "/home">
            <Home></Home>
          </Route>
          <Route path = "/booking">
            <Booking></Booking>
          </Route>
          {/* <PrivateRoute path = "/orders">
            <Inventory></Inventory>
          </PrivateRoute>
          <Route path = "/login">
            <Login></Login>
          </Route>
          <PrivateRoute path = "/shipment">
            <Shipment></Shipment>
          </PrivateRoute>
           */}
          <Route exact path = "/">
            <Home></Home>
          </Route>
          {/* <Route path = "/product/:productKey">
            <ProductDetail></ProductDetail>
          </Route>  */}
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
