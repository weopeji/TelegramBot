const mongoose = require('mongoose');

const UserShema = new mongoose.Schema({
    data: JSON,
});

mongoose.model('teletube_video', UserShema);