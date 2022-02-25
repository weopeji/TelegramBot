const mongoose = require('mongoose');

const UserShema = new mongoose.Schema({
    user: String,
    type: String,
    pay: String,
    payCommission: String,
    status: String,
    data: JSON,
    date: String,
});

mongoose.model('Payments', UserShema);