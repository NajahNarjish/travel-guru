import React from 'react';
import { Map, GoogleApiWrapper } from 'google-maps-react';

const MapContainer = (props) => {
    const mapStyles = {
        width: '100%',
        height: '100%',
      };
      
    return (
        <Map
          google={props.google}
          zoom={8}
          style={mapStyles}
          initialCenter={{ lat: 21.451, lng: 91.933}}
        />   
    );
};

export default GoogleApiWrapper({
    apiKey: 'TOKEN HERE'
  })(MapContainer);
  
