const mongoose = require('mongoose');

const UserShema = new mongoose.Schema({
    data: JSON,
});

mongoose.model('itemOfSite', UserShema);