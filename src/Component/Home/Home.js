import React, { useContext, useState, useEffect } from 'react';
import fakedata from '../../fakedata/fakedata.js';
import "./Home.css";
import { CategoryContext } from '../../App.js';
import { Link, useHistory } from 'react-router-dom';
import Booking from '../Booking/Booking.js';

const Home = () => {
    const [name, setName] = useContext(CategoryContext);

    var destinations = [
        {   destination: 'COXS BAZAR',
            description: "It is the world's longest sea beach. Amazing nature wonder",
            image: "https://i.imgur.com/QKABM6x.jpg"
        },
        {   destination: 'SREEMANGAL',
            description: "Sremangal is in shylhet",
            image: "https://i.imgur.com/HsbnV0Z.png"
        },
        {   destination: 'SUNDARBANS',
            description: "mangroove jungle",
            image: "https://i.imgur.com/0qU6FaW.png"
        }
    ];

    const [place, setPlace] = useState({});
    useEffect(() =>{
        const matchedPlace = destinations.find(pd => pd.destination.toLowerCase() === name.toLowerCase());
        console.log(matchedPlace);
        setPlace(matchedPlace);
        console.log(place);
    }, [name])
    return (
        <div >
            <div class="container">
                <div class="row mt-5">
                    <div class="col-12 col-lg-4">
                        <h1>{place.destination}</h1>
                        <p>{place.description}</p>
                        <Booking place = {place}>
                            <Link to= "/booking">
                                <button class="btn btn-primary" style = {{backgroundColor:"#F9A51A"}}>Booking</button>
                            </Link>
                        </Booking>
                    </div>
                    <div class="col-12 col-lg-8">
                        <div class="row">
                            <div class="col-12 col-lg-4">
                                <div className = "cardBackground coxsbazar" onClick={() => setName("coxs bazar")}><h3 >COX'S Bazar</h3></div>
                            </div>
                            <div class="col-12 col-lg-4">
                                <div className = "cardBackground sreemangal" onClick={() => setName("sreemangal")}><h3 >Sreemangal</h3></div>
                                
                            </div>
                            <div class="col-12 col-lg-4">
                                <div className = "cardBackground sundarbans" onClick={() => setName("sundarbans")}><h3 >Sundarbans</h3></div>   
                            </div>

                        </div>
                     

                    </div>
                </div>
            </div>


            
            
        </div>
    );
};

export default Home;