const mongoose = require('mongoose');

const UserShema = new mongoose.Schema({
    projectId: String,
    token: String,
});

mongoose.model('project_key', UserShema);