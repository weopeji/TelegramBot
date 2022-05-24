const secret = "opeji";
const repo = "/var/www/";

const express           = require('express');
const app               = express();
var server              = require('http').createServer(app).listen(8080);
let crypto              = require('crypto');
const exec              = require('child_process').exec

app.post('/webhook', function(req, res) {
    req.on('data', function(chunk) 
    {
        let sig     = "sha1=" + crypto.createHmac('sha1', secret).update(chunk.toString()).digest('hex');
        var data    = JSON.parse(chunk);

        if (req.headers['x-hub-signature'] == sig) {
            if(data["head_commit"]["message"] == "w")
            {
                exec('cd ' + repo + ' && git pull https://weopeji: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@github.com/weopeji/TelegramBot.git');
            }
            else
            {
                exec('cd ' + repo + ' && git pull https://weopeji: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@github.com/weopeji/TelegramBot.git && pm2 restart app');
            };
        }   
    });

    res.end();
})