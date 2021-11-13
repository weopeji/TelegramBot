const mongoose = require('mongoose');

const UserShema = new mongoose.Schema({
    projectId: String,
    pay: String,
});

mongoose.model('bPays', UserShema);