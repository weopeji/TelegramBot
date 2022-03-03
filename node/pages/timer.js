var CronJob                         = require('node-cron');
var mongoose                        = require('mongoose');
var InvDoc                          = mongoose.model('InvDoc');
var Project                         = mongoose.model('Project');
var User                            = mongoose.model('User');
var h                               = require('../helpers/functions');

module.exports = {
    startTimer,
}

async function alertsOfWaitAcceptInvesting()
{
    var allWaitInvDocs      = await InvDoc.find({status: "wait"});
    var allWaitInvDocsNeed  = [];
    var allAlertsProjectsId = [];

    for(var allWaitInvDoc of allWaitInvDocs)
    {
        console.log(`${Number(allWaitInvDoc.date_append) + 259200000 <= Number(new Date().getTime().toString())} ${Number(allWaitInvDoc.date_append) + 259200000} ${Number(new Date().getTime().toString())}`);
        if(Number(allWaitInvDoc.date_append) + 259200000 <= Number(new Date().getTime().toString()))
        {
            allWaitInvDocsNeed.push(allWaitInvDoc);
        }
    };

    for(var allWaitInvDocsNeedBlock of allWaitInvDocsNeed)
    {
        var _error = false;

        for(var allAlertsProjectsIdBlock of allAlertsProjectsId)
        {
            if(allAlertsProjectsIdBlock == allWaitInvDocsNeedBlock.projectId)
            {
                _error = true;
            };
        };

        if(!_error)
        {
            allAlertsProjectsId.push(allWaitInvDocsNeedBlock.projectId);
        };
    };

    for(var allAlertsProjectsIdBlock of allAlertsProjectsId)
    {
        var _Project    = await Project.findOne({_id: allAlertsProjectsIdBlock});

        h.full_alert_user(_Project.user, `Время подтверждения инвестиции прошло! Присите действия с инвестицией в проекте ${_Project._id} "${_Project.data.name}"`, "alertsOfWaitAcceptInvesting");
    };
};

function startTimer()
{
    console.log("Start");

    // CronJob.schedule('* 6,13 * * *', async function() {
    //     alertsOfWaitAcceptInvesting();
    // });

    CronJob.schedule('*/20 * * * * *', async function() {
        alertsOfWaitAcceptInvesting();
    });
};