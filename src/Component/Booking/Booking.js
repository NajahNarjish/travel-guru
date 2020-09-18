import React, { useContext } from 'react';
import { CategoryContext } from '../../App';
import "./Booking.css";

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 200,
    },
  }));

const Booking = () => {
    const classes = useStyles();
    const [name, setName, place, setPlace] = useContext(CategoryContext);

    const history = useHistory();

    const handleStartBooking = () => {
        console.log("booking started");
        history.push("/bookingHotels");
    }

    
    return (
        <div>
            <div class="container">
                <div class="row mt-5">
                    <div class="col-12 col-lg-6">
                        <h1>{place.destination}</h1>
                        <p>{place.description}</p>
                    </div>
                    <div class="col-12 col-lg-6">
                        <div className="bookingForm">
                            <form>
                                <div class="form-group">
                                    <label for="origin">Origin</label>
                                   
                                    <input type="text" class="form-control" id="origin" placeholder="origin" style={{backgroundColor:"#F2F2F2"}}/>
                                </div>
                                <div class="form-group">
                                    <label for="Destination">Destination</label>
                                    <input type="text" class="form-control" id="Destination" placeholder="Destination" style={{backgroundColor:"#F2F2F2"}} value={place.destination}/>
                                </div>
                                    <TextField
                                        id="date"
                                        label="From"
                                        type="date"
                                        defaultValue="2017-05-24"
                                        className={classes.textField}
                                        InputLabelProps={{
                                        shrink: true,
                                        }}
                                    />
                                    <TextField
                                        id="date"
                                        label="To"
                                        type="date"
                                        defaultValue="2017-05-24"
                                        className={classes.textField}
                                        InputLabelProps={{
                                        shrink: true,
                                        }}
                                    /> 
                                   
                                    <button onClick = {handleStartBooking} class="btn btn-primary" style = {{backgroundColor:"#F9A51A", width: "400px", margin:"10px"}}>Start Booking</button>     
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Booking;