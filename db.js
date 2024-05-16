const mongoose = require('mongoose');

const dbUri = `mongodb+srv://mentorguvi:AsG5HtQYGlXeB4m4@cluster0.fnm85l5.mongodb.net/57`

const connectDb = async () => {
    if (mongoose.connection.readyState === 1) return;
    await mongoose.connect(dbUri);
    console.log(mongoose.connection.readyState);
}

module.exports = { connectDb, mongoose };