var CronJob = require('cron').CronJob;

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

    cron.schedule('*/1 * * * *', function(){
        console.log('ok');
    });
};