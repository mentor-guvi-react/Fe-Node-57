const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { connectDb } = require('./db');
const { registrationModel, BookingModel } = require('./Schema');

connectDb()

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Server is Running success');
})

app.post('/registration', async (req, res) => {
    console.log(req.body);
    const dbresponse = await registrationModel.create({
        username: req.body.username,
        password: req.body.password,
        phonenumber: req.body.phonenumber,
        email: req.body.email,
        address: req.body.address
    });
    console.log(dbresponse, ' dbresponse');
    if (dbresponse._id) {
        res.send(dbresponse);
    }
    else {
        res.send('error');
    }
})

app.get('/login', async (req, res) => {
    const dbresponse = await registrationModel.findOne({
        username: req.query.username,
        password: req.query.password
    });

    if (dbresponse?._id) {
        res.send(dbresponse.username);
    }
    else {
        res.send('error');
    }
})



app.post('/createBooking', async (req, res) => {
    const { selectedDate = '', selectedHotel = '', selectedSeats = '', selectedSlot = '', username = '' } = req.body


    if (selectedDate.length && selectedHotel.length && selectedSeats > 0 &&
        selectedSlot.length && username.length
    ) {
        const response = await BookingModel.create({
            selectedDate, selectedHotel, selectedSeats, selectedSlot, username, isCancelled: false
        });

        if (response._id) {
            res.send('Booking Created Success')
        }
        else {
            res.send('error');
        }
        return
    }
    res.send('error');
})


app.get('/mybookings', async (req, res) => {
    const username = req?.query?.username || '';

    const response = await BookingModel.find({
        username,
        isCancelled: false
    })
    console.log(response, 'response');
    if (response?.length) {
        res.send(response)
    }
    else {
        res.send('error');
    }
})


app.post('/cancelBooking', async (req, res) => {
    const { bookingId } = req.body
    const filter = { _id: bookingId }
    const update = { isCancelled: true }
    const dbResponse = await BookingModel.findOneAndUpdate(filter, update)
    if (dbResponse?._id) {
        res.send("Cancelled Booking")
    }
    else {
        res.send('error');
    }
})



app.listen(4001, () => {
    console.log('Server is running on port 4001');
});