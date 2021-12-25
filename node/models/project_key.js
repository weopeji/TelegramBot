const mongoose = require('mongoose');

const UserShema = new mongoose.Schema({
    projectId: String,
    user: String,
});

mongoose.model('project_key', UserShema);