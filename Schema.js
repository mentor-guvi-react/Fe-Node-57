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

const HotelSchema = new Schema({
    chennai: { type: Array },
    mumbai: { type: Array },
    delhi: { type: Array },
})

const registrationModel = mongoose.model('registration', registrationSchema);
const BookingModel = mongoose.model('booking', BookingSchema);
const HotelModel = mongoose.model('chennai', HotelSchema);


module.exports = { registrationModel, BookingModel, HotelModel };