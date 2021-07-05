var Project     = null;
var User        = null;
var fs          = null;
var wrench      = null;
var path        = null;
var request     = null;
var cheerio     = null;
var puppeteer   = null;
var bot         = null;


module.exports = {
    init:function(initPlagins)
    {
        privateInit(initPlagins);
    },
    components_page: function(socket,data,callback) {
        privat_index_page(socket,data,callback);
    }
}


function privateInit(initPlagins) {
    Project     = initPlagins.Project;
    User        = initPlagins.User;
    fs          = initPlagins.fs;
    wrench      = initPlagins.wrench;
    path        = initPlagins.path;
    bot         = initPlagins.bot;
    request     = require("request");
    cheerio     = require("cheerio");
    needle      = require('needle');
    puppeteer   = require('puppeteer');
}


var privat_index_page = function(socket,data,callback) {
    var action = data.action;
    if(typeof action_linker[action] != "undefined") {
        action_linker[action](socket,data.data,callback,data)   
    } else {
        callback({
            error: {
                code:0 //no action
            }
        });
    }
}

var action_linker = {
    "getModerations": getModerations,
    "getActive": getActive,
    "getProject": getProject,
    "getUser": getUser,
    "setProject": setProject,
    "acceptProject": acceptProject,
    "setActive": setActive,
}

async function setActive(socket,data,callback) {
    var _project = await Project.findOneAndUpdate({_id: data}, {type: "active"});
    callback('ok');
}

async function acceptProject(socket,data,callback) 
{
    var _urlImgProject = `http://localhost/tbot/html/project/cover/?id=${data}`;
    const browser = await puppeteer.launch({
        args: ["--no-sandbox",
            "--disable-setuid-sandbox"]
    });
    const page = await browser.newPage();
    await page.goto(_urlImgProject);
    await page.emulateMedia('screen');
    const element = await page.$('.cover_block');   
    await element.screenshot({path: `../projects/${data}/logo.png`});
    await browser.close();

    var html = ``;
    var _url = `https://t.me/TestTalegrammBot?start=project_${data}`;
    const stream = fs.createReadStream(`../projects/${data}/logo.png`);
    bot.sendPhoto(-1001563744679, stream, {
        "caption": html,
        "reply_markup": {
            "inline_keyboard": [
                [
                    {
                        text: "Инвестровать",
                        url: _url,
                    }
                ]
            ],
        }
    })
}

async function parceProject(type, data, callback) 
{
    if(type == "1")
    {   
        var url =  `https://www.rusprofile.ru/id/${data.inn}`;
        
        await needle.get(url, async function(err, res){
            if (err) throw err;

            var $ = await cheerio.load(res.body);

            var _conf = 
            {
                name: await $('.company-name').html(),
                info: url,
                inn: await $('#clip_inn').html(),
                kpp: await $('#clip_kpp').html(),
                ogrn: await $('#clip_ogrn').html(),
                addr: null,
                do: null,
                founder: await $('.company-info__text .link-arrow gtm_main_fl span').html(),
                credit_story: null,
                practic: null,
                production: null,
            };

            callback(_conf);
        });
    }
}

async function setProject(socket,data,callback) 
{
    var _User       = await User.findOne({user: data.user});
    parceProject(data.data.organization, data.data, async function(_parce) {
        var _project    = await Project.create({
            user: data.user,
            type: "moderation",
            data: data.data,
            parce: _parce,
        });
    
        console.log(_project);
    
        var _patch = `../projects/${_project._id}`;
        var user_path = `../users/${_User.user}`;
    
        await wrench.copyDirSyncRecursive(user_path, _patch);
    
        await fs.readdir(user_path, (err, files) => {
            if (err) throw err;
          
            for (const file of files) {
                fs.unlink(path.join(user_path, file), err => {
                    if (err) throw err;
                });
            }
        });
    
        callback({status: "ok"});
    });
}

async function getUser(socket,data,callback) {
    var _user = await User.findOne({user: data});
    callback(_user);
}

async function getProject(socket,data,callback) {
    var _project = await Project.findOne({_id: data});
    callback(_project);
}

async function getActive(socket,data,callback) {
    var _projects   = await Project.find({type: "active"});
    callback(_projects);
}

async function getModerations(socket,data,callback) {
    var _projects   = await Project.find({type: "moderation"});
    callback(_projects);
}