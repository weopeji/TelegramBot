const mongoose = require('mongoose');

const UserShema = new mongoose.Schema({
    user: String,
    first_name: String,
    last_name: String,
    username: String,
    googleAuth: String,
    language_code: String,
    is_bot: String,
    type: String,
    img: String,
    alerts: JSON,
    deleteMsgs: Array,
    investor_data: JSON,
    where: JSON,
    putProject: String,
    member: String,
    creatingData: JSON,
});

mongoose.model('User', UserShema);