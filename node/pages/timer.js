var CronJob = require('node-cron');

module.exports = {
    startTimer,
}

function alertsOfWaitAcceptInvesting()
{
    var DateNow         = new Date().getTime().toString();
}

function startTimer()
{
    console.log("Start");

    CronJob.schedule('*/1 * * * *', function(){
        console.log('ok');
    });
};