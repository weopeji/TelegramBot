const mongoose = require('mongoose');

const UserShema = new mongoose.Schema({
    projectID: String,
    data: JSON,
});

mongoose.model('R_F', UserShema);