import React from 'react';

const SingleHotel = (props) => {
    const {title} = props.hotel;
    return (
        <div>
            <h1>{title}</h1>
        </div>
    );
};

export default SingleHotel;