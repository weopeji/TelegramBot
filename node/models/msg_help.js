const mongoose = require('mongoose');

const UserShema = new mongoose.Schema({
    user: String,
    msgs: JSON,
});

mongoose.model('MsgHelp', UserShema);