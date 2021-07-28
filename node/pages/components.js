var Project     = null;
var User        = null;
var fs          = null;
var wrench      = null;
var path        = null;
var bot         = null;
var request     = require("request");
var cheerio     = require("cheerio");
var needle      = require('needle');
var puppeteer   = require('puppeteer');
var fetch       = require("node-fetch");
var readline    = require('readline');
var multer      = require("multer");
var Jimp        = require("jimp");
var uploader    = require('../helpers/uploader/upload');

const Instagram = require('instagram-web-api');


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
    h           = initPlagins.helper_functions;
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
    "getСorrection": getСorrection,
    "acceptProject": acceptProject,
    "setActive": setActive,
    "setSignature": setSignature,
    "getNewDataProjects": getNewDataProjects,
    "getProject_id": getProject_id,
    "not_acceptProject": not_acceptProject,
    "putRedacting": putRedacting,
    "getID": getID,
    "correct_signature": correct_signature,
    "putFile": putFile,
    "putFileSignature": putFileSignature,
    "setSignatureFile": setSignatureFile,
    "correct_signature_document": correct_signature_document,
}

async function correct_signature_document(socket,data,callback) {
    var _project = await Project.findOne({_id: data});
    var _array = _project.signature_document;
    _array.status = 'on';
    await Project.findOneAndUpdate({_id: data}, {type: "moderation", signature_document: _array});
}

async function setSignatureFile(socket,data,callback) 
{
    var data = data.file;

    var _pts        = data._pts.split('/')[1];
    var _user_id    = data._id;
    var file_id     = data.file_id;

    fs.writeFile(`../projects/${_user_id}/signature_document.${_pts}`, data.files, async (err) => {
        if(err) throw err;
        var _project = await Project.findOneAndUpdate({_id: data._id}, {type: "correction",signature_document: {
            status: "wait",
            document: `signature_document.${_pts}`,
        }});
    });
}

async function putFileSignature(socket,data,callback) {
    var _pts        = data._pts.split('/')[1];
    var _user_id    = data._id;
    var file_id     = data.file_id;

    fs.writeFile(`../projects/${_user_id}/${file_id}.${_pts}`, data.files, (err) => {
        if(err) throw err;
        callback({
            file_name: `${file_id}.${_pts}`,
        });
    });
}

async function putFile(socket,data,callback) 
{
    var _pts        = data._pts.split('/')[1];
    var _user_id    = data._id;
    var file_id     = data.file_id;

    fs.writeFile(`../users/${_user_id}/${file_id}.${_pts}`, data.files, (err) => {
        if(err) throw err;
        callback({
            file_name: `${file_id}.${_pts}`,
        });
    });
}

async function correct_signature(socket,data,callback) {
    var _project = await Project.findOne({_id: data._id});
    var _array = _project.signature;
    _array.data = data.data;
    _array.status = "on";
    await Project.findOneAndUpdate({_id: data}, {signature: _array, type: "moderation"});
}

async function getID(socket,data,callback) {
    var _project = await Project.findOne({_id: data});
    callback(_project.user);
}

async function putRedacting(socket,data,callback) {
    var _project = await Project.findOne({_id: data._id});
    var _data = _project.data;
    data.array.forEach(element => {
        for (var key in _data) {
            if(key == element.name) {
                _data[key] = element.val;
            }
        }
    });
    await Project.findOneAndUpdate({_id: data._id}, {data: _data, type: "moderation", redacting: null});
    callback('ok');
}

async function not_acceptProject(socket,data,callback) 
{
    var _project = await Project.findOneAndUpdate({_id: data._id}, {type: "correction", redacting: data.data});
    callback(_project);
}

async function getProject_id(socket,data,callback) {
    var _project = await Project.findOne({_id: data});
    callback(_project);
}

async function getNewDataProjects(socket,data,callback) {
    var _project = await Project.findOneAndUpdate({_id: data._id}, {
        type: "correction",
        signature: {
            status: 'wait',
            type: data.data,
        }
    });
    callback('ok');
}

async function setSignature(socket,data,callback) 
{
    var base64Data = data.data.replace(/^data:image\/png;base64,/, "");
    const dataBuffer = new Buffer(base64Data,'base64'); 
    var _patch = `../projects/${data._id}/signature.png`;
    fs.writeFile(_patch, dataBuffer, (err) => {
        if(err) throw err;
        callback('ok');
    });
}

async function setActive(socket,data,callback) {
    //var _project = await Project.findOneAndUpdate({_id: data}, {type: "active"});
    callback('ok');
}

async function acceptProject(socket,data,callback) 
{
    var _project = await Project.findOne({_id: data});

    var _urlImgProject = `${h.getURL()}html/project/cover/?id=${data}`;
    console.log(_urlImgProject);
    const browser = await puppeteer.launch({
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    const page = await browser.newPage();
    await page.goto(_urlImgProject);
    await page.emulateMedia('screen');
    const element = await page.$('.cover_block');   
    await element.screenshot({path: `../projects/${data}/logo.png`});
    await browser.close();

    var html = `[Профиль компании](${h.getURL()}html/project/profil/#${_project._id})\n[Презентация](${h.getURL()}/projects/${_project._id}/${_project.data["file+7"]})\n[Видео презентация](${h.getURL()}/projects/${_project._id}/${_project.data["file+8"]})`;
    var _url = `https://t.me/TestTalegrammBot?start=project_${data}`;
    const stream = fs.createReadStream(`../projects/${data}/logo.png`);
    bot.sendPhoto(-1001563744679, stream, {
        "caption": html,
        "parse_mode": "MarkdownV2",
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
    });

    // const client = new Instagram({ username: "investER_official", password: "336688ea" });
 
    // ;(async () => {
    //     Jimp.read(`../projects/${data}/logo.png`, async function (err, image) {
    //         if (err) {
    //             console.log(err)
    //         } else {
    //             await image.write(`../projects/${data}/logo.jpg`);
    //             // URL or path of photo
    //             const photo = `http://localhost/tbot/projects/${data}/logo.jpg`;
    //             console.log(photo);
            
    //             await client.login()

    //             var _caption = `
    //                 *
    //                 ${_project.data.name}
    //                 ${_project.data.target}
    //                 Ставка: ${_project.data.rate}
    //                 Вход от: ${_project.data.minimal_amount}
    //                 Сбор до: ${_project.data.date}
    //             `;
            
    //             const { media } = await client.uploadPhoto({ photo: photo, caption: _caption, post: 'feed' })
    //             console.log(`https://www.instagram.com/p/${media.code}/`)
    //         }
    //     })
        
    // })();

    (() => {
        uploader.uploadVideo('2314', '1245', 'investER', 'pp.mp4');
    })()
}

async function parceProject(type, data, callback) 
{
    var url = "https://suggestions.dadata.ru/suggestions/api/4_1/rs/findById/party";
    var token = "cd3a829357362fec55fc201c3f761002def9906f";
    var query = data.inn;
    
    var options = {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": "Token " + token
        },
        body: JSON.stringify({query: query})
    }
    
    fetch(url, options)
    .then(response => response.text())
    .then(result => 
    {
        var _dataFirst = JSON.parse(result.toString());

        if(_dataFirst.suggestions.length == 0) 
        {
            callback('error');
            return;
        }
        var _data = _dataFirst.suggestions[0].data;

        if(type == "1")
        {
            var _conf = 
            {
                name: _data.name.full_with_opf,
                info: `https://www.rusprofile.ru/id/${query}`,
                inn: _data.inn,
                ogrn: _data.ogrn,
                kpp: _data.kpp,
                addr: _data.address.value,
                do: null,
                founder: _data.management.name,
            } 

            callback(_conf);
        }

        if(type == "2")
        {   
            var _conf = 
            {
                name: _data.name.full_with_opf,
                info: `https://www.rusprofile.ru/id/${query}`,
                inn: _data.inn,
                ogrn: _data.ogrn,
                kpp: _data.kpp,
                addr: _data.address.value,
                do: null,
                founder: _data.management.name,
                credit_story: null,
                practic: null,
                production: null,
            };

            callback(_conf);
        }

    });
}

async function setProject(socket,data,callback) 
{
    var _User       = await User.findOne({user: data.user});

    async function start_load(_parce) 
    {
        var _project    = await Project.create({
            user: data.user,
            type: "moderation",
            data: data.data,
            parce: _parce,
            redacting: null,
            signature: null,
            signature_document: null,
        });
        
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
    }

    if(data.data.organization == "3") {
        start_load();
        callback({status: "ok"});
    } else {
        parceProject(data.data.organization, data.data, async function(_parce) 
        {
            if(_parce == 'error') {
                callback('error');
                return;
            }
            start_load(_parce);
            callback({status: "ok"});
        });
    }
    
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

async function getСorrection(socket,data,callback) {
    var _projects   = await Project.find({type: "correction"});
    callback(_projects);
}