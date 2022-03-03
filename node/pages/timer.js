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

    const d = new Date();

    console.log(d);

    const job = new CronJob('0 */1 2-3 * * *', function() {
        const d = new Date();
        console.log('Every 30 minutes between 9-17:', d);
    });

    job.start();
};