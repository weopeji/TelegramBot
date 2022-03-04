var CronJob                         = require('node-cron');
var mongoose                        = require('mongoose');
var InvDoc                          = mongoose.model('InvDoc');
var Project                         = mongoose.model('Project');
var User                            = mongoose.model('User');
var h                               = require('../helpers/functions');
var commission                      = mongoose.model('commission');

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
        if(Number(allWaitInvDoc.date_append) + 259200000 <= Number(new Date().getTime().toString()))
        {
            allWaitInvDocsNeed.push(allWaitInvDoc);
        };
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

        h.full_alert_user(_Project.user, `Время подтверждения инвестиции прошло! Примите действия с инвестицией в проекте ${_Project._id} "${_Project.data.name}"`, "alertsOfWaitAcceptInvesting");
    };
};

async function alertOfCommissionBusines()
{
    var allAcceptInvDocs        = await InvDoc.find({status: "accept"});
    var allWaitInvDocsNeed      = [];
    var allAlertsProjectsId     = [];

    for(var allAcceptInvDoc of allAcceptInvDocs)
    {
        var _Commission = await commission.findOne({invId: allAcceptInvDoc._id});
        var _error      = false;

        if(!_Commission) 
        {
            if(Number(allAcceptInvDoc.date_append) + 864000000 <= Number(new Date().getTime().toString()))
            {
                _error = true;
            };
        };
        
        if(_error)
        {
            allWaitInvDocsNeed.push(allAcceptInvDoc);
        };
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

        h.full_alert_user(_Project.user, `Время оплаты комиссии прошло! Оплатите комиссию по проекту ${_Project._id} "${_Project.data.name}"`, "alertOfCommissionBusines");
    };
};

async function alertOfWaitPaynBusines()
{
    var allAcceptInvDocs        = await InvDoc.find({status: "accept"});
    var allWaitInvDocsNeed      = [];
    var allAlertsProjectsId     = [];

    for(var allAcceptInvDoc of allAcceptInvDocs)
    {
        var _error = false;

        for(var _PayOfInv of allAcceptInvDoc.pays)
        {
            if(Number(_PayOfInv.date) <= Number(new Date().getTime().toString()))
            {
                _error = true;
            };
        };

        if(_error)
        {
            allWaitInvDocsNeed.push(allAcceptInvDoc);
        };
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

        h.full_alert_user(_Project.user, `Время оплаты выплаты прошло! Оплатите выплату за инвестицию по проекту ${_Project._id} "${_Project.data.name}"`, "alertOfWaitPaynBusines");
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

    // CronJob.schedule('*/20 * * * * *', async function() {
    //     alertOfCommissionBusines();
    // });

    // CronJob.schedule('*/20 * * * * *', async function() {
    //     alertOfWaitPaynBusines();
    // });
};