import React from 'react';
import star from "../../images/star_1_.png";

const SingleHotel = (props) => {
    const {title, image, guestsAndBed, facilities, cancellation, ratingAndPrice } = props.hotel;
    return (
        <div>
            <div class = "row">
                <div class="col-12 col-lg-5">
                    <div>
                        <img src={image} class="rounded float-left img-fluid img-thumbnail" alt="" />
                    </div>
                </div>

                <div class="col-12 col-lg-7">
                    <h5>{title}</h5>
                    <span>{guestsAndBed}</span><br/>
                    <span>{facilities}</span><br/>
                    <span>{cancellation}</span><br/>
                    <img src={star} style = {{width:"5%"}} alt="" />
                    <small>{ratingAndPrice}</small>
                </div>
            </div>   
        </div>
    );
};

export default SingleHotel;