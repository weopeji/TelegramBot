const mongoose = require('mongoose');

const UserShema = new mongoose.Schema({
    investor: String,
    business: String,
    msgs: JSON,
});

mongoose.model('Msg', UserShema);