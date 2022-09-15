const mongoose = require('mongoose');

const UserShema = new mongoose.Schema({
    user: String,
    type: String,
    phone: String,
    payment: JSON,
});

mongoose.model('secondBotUser', UserShema);