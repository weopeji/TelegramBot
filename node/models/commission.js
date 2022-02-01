const mongoose = require('mongoose');

const UserShema = new mongoose.Schema({
    invId: String,
    recipient: String,
});

mongoose.model('commission', UserShema);