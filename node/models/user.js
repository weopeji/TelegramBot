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
    lastProject: String,
    member: String,
    member_b: String,
    creatingData: JSON,
    attractType: String,
    reqvesits: JSON,
    reqezits_data: JSON,
    alerts_main: JSON,
    alert_msgs: String,
    first_parse: JSON,
    business_msgPut: String,
});

mongoose.model('User', UserShema);