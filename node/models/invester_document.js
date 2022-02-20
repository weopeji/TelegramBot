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
});

mongoose.model('InvDoc', UserShema);