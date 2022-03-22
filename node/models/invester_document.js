const mongoose = require('mongoose');

const UserShema = new mongoose.Schema({
    projectId: String,
    invester: String,
    status: String,
    receipt: String,
    data: JSON,
    pays: JSON,
    date: String,
    urlToLastDocument: String,
    date_append: String,
    date_alert: String,
    not_correct: JSON,
    not_correct_complaint: Boolean,
    request_remove: Boolean,
    acceptWaitFullPay: Boolean,
    confirmationData: Boolean,
});

mongoose.model('InvDoc', UserShema);