const mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');

const ProjectShema = new mongoose.Schema({
    number: Number,
    user: String,
    user_accsess: JSON,
    type: String,
    data: JSON,
    parce: JSON,
    redacting: JSON,
    signature: JSON,
    signature_document: JSON,
    payerCent: String,
    YT_VIDEO: JSON,
    urlLocation: String,
    payersData: JSON,
    registrationDocument: JSON,
    multiplicity: String,
    channel_id: String,
    data_creating: String,
    video_redacting: String,
    last_redacting: JSON,
    notFullpay: Number,
    closeMoney: Boolean,
    requestInvestingMoney: String,
    design_type: String,
    businessSite: String,
});

autoIncrement.initialize(mongoose.connection);
ProjectShema.plugin(autoIncrement.plugin, 'Project');

mongoose.model('Project', ProjectShema);