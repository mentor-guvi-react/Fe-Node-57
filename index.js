const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { connectDb } = require('./db');
const { registrationModel } = require('./Schema');

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




app.listen(4001, () => {
    console.log('Server is running on port 4001');
});