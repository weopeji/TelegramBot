const mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');

const ProjectShema = new mongoose.Schema({
    number: Number,
    user: String,
    type: String,
    data: JSON,
    parce: JSON,
    redacting: JSON,
    signature: JSON,
});

autoIncrement.initialize(mongoose.connection);
ProjectShema.plugin(autoIncrement.plugin, 'Project');

mongoose.model('Project', ProjectShema);