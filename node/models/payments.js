const mongoose = require('mongoose');

const UserShema = new mongoose.Schema({
    user: String,
    type: String,
    pay: String,
    status: String,
    data: JSON,
});

mongoose.model('Payments', UserShema);