import React, { useContext, useState, useEffect } from 'react';
import { CategoryContext } from '../../App';
import fakeHoteldata from '../../fakedata/fakeHoteldata.js';
import SingleHotel from '../SingleHotel/SingleHotel';
import MapContainer from '../MapContainer/MapContainer';

const BookingHotels = () => {
    const [name, setName, place, setPlace, loggedInUser, setLoggedInUser] = useContext(CategoryContext);
// console.log(name);
    const [hotels, setHotels] = useState([]);
    useEffect(() =>{
        // console.log({category});
        const threeHotels = fakeHoteldata.filter(pd => pd.category.toLowerCase() === name.toLowerCase());
        setHotels(threeHotels);
    }, [name])

    // console.log(hotels);
    return (
        <div>
            <hr style={{height:"2px",borderWidth:"0", backgroundColor:"gray", color:"gray"}}></hr>
            <div class="container">
                <div class="row">
                    <div class="col-12 col-lg-7">
                        <h4>Stay in {name}</h4>
                        {hotels.map(hotel => <SingleHotel hotel = {hotel}></SingleHotel>)}
                    </div>
                    <div class="col-12 col-lg-5">
                        <MapContainer map={name}></MapContainer>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default BookingHotels;