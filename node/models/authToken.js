const mongoose = require('mongoose');

const UserShema = new mongoose.Schema({
    token: String,
    user: String,
});

mongoose.model('authToken', UserShema);