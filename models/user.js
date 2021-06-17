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
    new_project: {
        name: String,
        target: String,
        attraction_amount: Number,
        date: Number,
        minimal_amount: Number,
        rate: Number,
        date_payments: String,
        collection_period: String,
        organization: String,
    }
});

mongoose.model('User', UserShema);