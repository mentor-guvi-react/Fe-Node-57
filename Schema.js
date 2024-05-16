const { mongoose } = require('./db');


const Schema = mongoose.Schema;


const registrationSchema = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    phonenumber: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true }
})

const registrationModel = mongoose.model('registration', registrationSchema);


module.exports = { registrationModel };