const mongoose = require('mongoose');

const UserShema = new mongoose.Schema({
    projectId: String,
    document: String,
    invester: String,
    status: String,
    data: JSON,
});

mongoose.model('InvDoc', UserShema);