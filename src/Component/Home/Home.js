import React, { useContext, useState, useEffect } from 'react';
import fakedata from '../../fakedata/fakedata.js';
import "./Home.css";
import { CategoryContext } from '../../App.js';
import { Link} from 'react-router-dom';


const Home = () => {
    const [name, setName, place, setPlace, loggedInUser, setLoggedInUser] = useContext(CategoryContext);
   
    return (
        <div>
            <div class="container">
                <div class="row mt-5">
                    <div class="col-12 col-lg-4">
                        <h1>{place.destination}</h1>
                        <p>{place.description}</p>
                            <Link to= "/booking">
                                <button class="btn btn-primary" style = {{backgroundColor:"#F9A51A"}}>Booking</button>
                            </Link>       
                    </div>
                    <div class="col-12 col-lg-8">
                        <div class="row">
                            <div class="col-12 col-lg-4">
                                <Link to= "/booking">
                                    <div className = "cardBackground coxsbazar" onClick={() => setName("Coxs bazar")}><h3 >COX'S Bazar</h3></div>
                                </Link>
                            </div>
                            <div class="col-12 col-lg-4">
                                <Link to= "/booking">
                                    <div className = "cardBackground sreemangal" onClick={() => setName("Sreemangal")}><h3 >Sreemangal</h3></div> 
                                </Link>  
  
                            </div>
                            <div class="col-12 col-lg-4">
                                <Link to= "/booking">
                                    <div className = "cardBackground sundarbans" onClick={() => setName("Sundarbans")}><h3 >Sundarbans</h3></div>
                                </Link>   
                            </div>
                        </div>
                    </div>
                </div>
            </div>      
        </div>
    );
};

export default Home;