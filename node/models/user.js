const mongoose = require('mongoose');

const UserShema = new mongoose.Schema({
    user: String,
    first_name: String,
    last_name: String,
    username: String,
    language_code: String,
    is_bot: String,
    type: String,
    where: JSON,
});

mongoose.model('User', UserShema);