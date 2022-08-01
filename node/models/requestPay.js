const mongoose = require('mongoose');

const UserShema = new mongoose.Schema({
    user: String,
    date: String,
    type: String,
    email: String,
    data: JSON,
    pays: JSON,
});

mongoose.model('requestPay', UserShema);