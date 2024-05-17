const { mongoose } = require('./db');


const Schema = mongoose.Schema;


const registrationSchema = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    phonenumber: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true }
})


const BookingSchema = new Schema({
    selectedDate: { type: String, required: true },
    selectedHotel: { type: String, required: true },
    selectedSeats: { type: Number, required: true },
    selectedSlot: { type: String, required: true },
    username: { type: String, required: true },
    isCancelled: { type: Boolean, default: false }
})

const registrationModel = mongoose.model('registration', registrationSchema);
const BookingModel = mongoose.model('booking', BookingSchema);


module.exports = { registrationModel, BookingModel };