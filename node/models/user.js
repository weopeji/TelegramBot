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
        1: {
            name: String,
            target: String,
            attraction_amount: Number,
            date: Number,
            minimal_amount: Number,
            rate: Number,
            date_payments: String,
            collection_period: String,
        },
        2: {
            organization: String,
        },
        3: {
            1: {
                name: String,
                inn: String,
                ogrn: String,
                addr: String,
                syte: String,
            },
            2: {

            }
        },
        4: {
            file_url: String,
        }
    }
});

mongoose.model('User', UserShema);