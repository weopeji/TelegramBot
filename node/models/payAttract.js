const mongoose = require('mongoose');

const UserShema = new mongoose.Schema({
    user: String,
    pay: String,
    idInv: String,
});

mongoose.model('PaysAttract', UserShema);