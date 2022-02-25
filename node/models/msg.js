const mongoose = require('mongoose');

const UserShema = new mongoose.Schema({
    invDoc: String,
    msgs: JSON,
});

mongoose.model('Msg', UserShema);