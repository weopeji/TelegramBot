const mongoose = require('mongoose');

const UserShema = new mongoose.Schema({
    user: String,
    type: String,
    phone: String,
});

mongoose.model('secondBotUser', UserShema);