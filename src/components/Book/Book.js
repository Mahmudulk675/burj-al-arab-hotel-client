import React, { useContext, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { UserContext } from '../../App';
import { Button } from '@material-ui/core';
import Bookings from '../Bookings/Bookings';


const Book = () => {
    const { bedType } = useParams();
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [selectedDate, setSelectedDate] = useState({
        checkIn: new Date(),
        checkOut: new Date(),
    });
    console.log(loggedInUser);
    const handleCheckIn = (date) => {
        const newDates ={...selectedDate}
        newDates.checkIn = date;
        setSelectedDate(newDates);
      };

      const handleCheckOut = (date) => {
        const newDates ={...selectedDate}
        newDates.checkOut = date;
        setSelectedDate(newDates);
      };

      const handleBooking = ()=>{
          console.log(loggedInUser,selectedDate);
          const newBooking = { ...loggedInUser, ...selectedDate};
          console.log(newBooking);
        
          fetch('http://localhost:5000/addBooking',{
              method:"POST",
              headers:{'Content-Type': 'application/json'},
              body: JSON.stringify(newBooking)
          })
          .then(res => res.json())
          .then(data =>{
              console.log(data);
          })
          console.log(loggedInUser,newBooking);
      }

    return (
        <div style={{ textAlign: 'center' }}>
            <h1>Let's book a {bedType} Room. {loggedInUser.name}</h1>
            <p>Want a <Link to="/home">different room?</Link> </p>


            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container justify="space-around">
                    <KeyboardDatePicker
                        disableToolbar
                        variant="inline"
                        format="MM/dd/yyyy"
                        margin="normal"
                        id="date-picker-inline"
                        label="CheckIn"
                        value={selectedDate.checkIn}
                        onChange={handleCheckIn}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    />
                    <KeyboardDatePicker
                        margin="normal"
                        id="date-picker-dialog"
                        label="CheckOut"
                        format="MM/dd/yyyy"
                        value={selectedDate.checkOut}
                        onChange={handleCheckOut}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    />

                </Grid>
                <Button onClick={handleBooking} variant="contained" color="primary">Order</Button>
            </MuiPickersUtilsProvider>
           <Bookings></Bookings>
        </div>
    );
};

export default Book;