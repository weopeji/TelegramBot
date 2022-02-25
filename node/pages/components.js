var Project                 = null;
var User                    = null;
var fs                      = null;
var wrench                  = null;
var path                    = null;
var bot                     = null;
var request                 = require("request");
var cheerio                 = require("cheerio");
var needle                  = require('needle');
var puppeteer               = require('puppeteer');
var fetch                   = require("node-fetch");
var readline                = require('readline');
var multer                  = require("multer");
var Jimp                    = require("jimp");
const { TelegramClient }    = require("telegram");
const { StringSession }     = require("telegram/sessions"); 
const { spawn, exec }       = require('child_process');
const _app                  = require("../app");
let {PythonShell}           = require('python-shell')
const Instagram             = require('instagram-web-api');
var axios                   = require('axios');
const ParcingPage           = require('./parcing');
var { DateTime, Interval }  = require("luxon");
const { hkdf }              = require("crypto");
const e                     = require("express");
var ffmpeg                  = require('ffmpeg');
const { resolve }           = require("path");
const PDFMerger             = require('pdf-merger-js');
var merger                  = new PDFMerger();


module.exports = {
    init:function(initPlagins)
    {
        privateInit(initPlagins);
    },
    components_page: function(socket,data,callback) {
        privat_index_page(socket,data,callback);
    },
}


function privateInit(initPlagins) 
{
    Project     = initPlagins.Project;
    User        = initPlagins.User;
    fs          = initPlagins.fs;
    wrench      = initPlagins.wrench;
    path        = initPlagins.path;
    bot         = initPlagins.bot;
    h           = initPlagins.helper_functions;
    InvDoc      = initPlagins.InvDoc;
    MsgDB       = initPlagins.MsgDB;
    config      = initPlagins.config;
    PaysAttract = initPlagins.PaysAttract;
    bPays       = initPlagins.bPays;
    Payments    = initPlagins.Payments;
    bPaysAccept = initPlagins.bPaysAccept;
    R_F         = initPlagins.R_F;
    project_key = initPlagins.project_key;
    commission  = initPlagins.commission;
    authToken   = initPlagins.authToken;
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

var action_linker = 
{
    //test
    "test_fun": test_fun,


    //  main
    "tg_alert": tg_alert,
    "tg_alert_user": tg_alert_user,
    "tg_alert_user_numbers": tg_alert_user_numbers,
    "ALL_DATA": ALL_DATA,
    "telegram_auth": telegram_auth,
    "telegram_auth_more": telegram_auth_more,
    "telegram_auth_getToken": telegram_auth_getToken,
    "telegram_auth_recomendation": telegram_auth_recomendation,

    // chats
    "getChats": getChats,
    "getChatsOfId": getChatsOfId,

    // video
    "dataOfVideo": dataOfVideo,
    "dataOfVideoAccept": dataOfVideoAccept,

    //  funs
    "getModerations": getModerations,
    "getActive": getActive,
    "getProject": getProject,
    "getProjectNew": getProjectNew,
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
    "getAddr": getAddr,
    "alertProject": alertProject,
    "getInvestorsProject": getInvestorsProject,
    "notAcceptInvesting": notAcceptInvesting,
    "getUserForId": getUserForId,
    "acceptInvestor": acceptInvestor,
    "invester_status_project": invester_status_project,
    "getAllProjectsBusiness": getAllProjectsBusiness,
    "getPaysProject": getPaysProject,
    "removePayInvestor": removePayInvestor,
    "msgUP": msgUP,
    "all_msgs": all_msgs,
    "Attracted_by_me": Attracted_by_me,
    "Attracted_by_me_investing_pay": Attracted_by_me_investing_pay,
    "Attracted_by_me_b": Attracted_by_me_b,
    "selectedMsgChats": selectedMsgChats,
    "getBussnes": getBussnes,
    "getInvestorDocument": getInvestorDocument,
    "setSignaturePro": setSignaturePro,
    "creatingData": creatingData,
    "setCreatingData": setCreatingData,
    "allUsers": allUsers,
    "allInvestings": allInvestings,
    "getAllProjectsInvesting": getAllProjectsInvesting,
    "reload_type": reload_type,
    "getBitsFile": getBitsFile,
    "getUserID": getUserID,
    "Attracted_by_me_Bussnes_pay": Attracted_by_me_Bussnes_pay,
    "bPays": bPaysFun,
    "toAttractPay": toAttractPay,
    "getPaysBusiness": getPaysBusiness,
    "getInv": getInv,
    "allPayments": allPayments,
    "dellSignatureFile": dellSignatureFile,
    "Attracted_by_pays": Attracted_by_pays,
    "allAttracted": allAttracted,
    "cheackInnCreator": cheackInnCreator,
    "clearAlertMsg": clearAlertMsg,
    "setYouTubeVideo": setYouTubeVideo,
    "getR_F": getR_F,
    "getProjectKey": getProjectKey,
    "setInvesterTypeCreating": setInvesterTypeCreating,
    "setInvesterTypeAppend": setInvesterTypeAppend,
    "setInvesterTypeClassAll": setInvesterTypeClassAll,
    "gettAllProjects": gettAllProjects,
    "redactingLineSettingsPage": redactingLineSettingsPage,
    "redactingLineSettingsPageGlobal": redactingLineSettingsPageGlobal,
    "redactingLineSettingsPageGlobalMultiplicity": redactingLineSettingsPageGlobalMultiplicity,
    "getProjectForInvesterPage": getProjectForInvesterPage,
    "setInvesterDataProjectForInvesterPage": setInvesterDataProjectForInvesterPage,
    "getProjectById": getProjectById,
    "Business_status_projects": Business_status_projects,
    "setRedactingProject": setRedactingProject,
    "redactingProjectByAdmin": redactingProjectByAdmin,
    "obligationsProjectData": obligationsProjectData,
    "commissions_settings": commissions_settings,
    "commissions_settings_accept": commissions_settings_accept,
    "commissions_settings_close": commissions_settings_close,
    "setCorrectionForProject": setCorrectionForProject,
    "activeDataProject": activeDataProject,
    "getPhotoByUser": getPhotoByUser,
    "telegram_recomendation_push": telegram_recomendation_push,
    "telegram_recomendation_push_b": telegram_recomendation_push_b,
    "registrationDocumentAcceptAdmin": registrationDocumentAcceptAdmin,
    "setInvestERDocumentLoad": setInvestERDocumentLoad,
    "setInvestERDocumentLoadOfInvester": setInvestERDocumentLoadOfInvester,
    "endInvestingDataPush": endInvestingDataPush,
    "redactingParcingProject": redactingParcingProject,
    "registrationDocumentClearAdmin": registrationDocumentClearAdmin,
    "business_cheack_accept_in_cabinet": business_cheack_accept_in_cabinet,
};

async function getChatsOfId(socket, data, callback)
{
    var _User       = await User.findOne({_id: data.user});
    var returnBlock = 
    {
        name: null,
        type: null,
    };

    if(_User.type == "business")
    {
        var _FindBlock = await InvDoc.findOne({user: data.id});

        if(!_FindBlock)
        {
            callback('error');
            return;
        };

        for(var findOfInv of _FindBlock.data.data)
        {
            if(findOfInv._id == "fio")
            {
                returnBlock.name = findOfInv.data;
            }
        }

        returnBlock.type = "Инвестор";
    }
    else
    {
        var _FindBlock = await Project.findOne({_id: data.id});

        if(!_FindBlock)
        {
            callback('error');
            return;
        };


    };

    callback(returnBlock);
}

async function business_cheack_accept_in_cabinet(socket, data, callback)
{
    var _InvDoc = await InvDoc.findOne({projectId: data.project, invester: data.id});

    if(_InvDoc)
    {
        var _Pays = _InvDoc.pays;

        for(var i = 0; i < _Pays.length; i++)
        {
            if(i == data.number)
            {
                _Pays[i].status = "accept";
                delete _Pays[i].statusAccept;
            };
        };

        await InvDoc.findOneAndUpdate({projectId: data.project, invester: data.id}, {pays: _Pays});
    };

    callback();
}

async function registrationDocumentClearAdmin(socket, data, callback)
{
    callback(await Project.findOneAndUpdate({_id: data}, {$unset: {registrationDocument:1}}));
}

async function dataOfVideoAccept(socket, data, callback)
{
    var _Project = await Project.findOne({_id: data});

    if(_Project)
    {
        h.alertAdmin({
            type: "video",
            text: "Видео было отправлено на первичную обработку, дождитесь ее результатов",
            projectId: _Project._id,
        });

        await Project.findOneAndUpdate({_id: data}, {video_redacting: "wait"});

        function execPushOfFFMPEG(urlPush)
        {
            return new Promise(async (resolve,reject) =>
            {
                exec(urlPush, (error, stdout, stderr) => {
                    resolve('ok');
                });
            });
        };
            
        var pushDoesVideos = [
            `ffmpeg -y -i "/var/www/projects/${_Project._id}/${_Project.data["file+8"]}" -vf scale=1920:1080 -c:v libx264 -b:v 17000K -aspect 16:9 -r 25 -b:a 256K "/var/www/projects/${_Project._id}/output_ffmpeg.mp4"`,
            `ffmpeg -y -i "/var/www/projects/${_Project._id}/output_ffmpeg.mp4" -c copy -bsf:v h264_mp4toannexb -f mpegts "/var/www/projects/${_Project._id}/intermediate_video.ts"`,
            `ffmpeg -y -i "concat:/var/www/node/assets/videos/intermediate_print.ts|/var/www/projects/${_Project._id}/intermediate_video.ts" -c copy -bsf:a aac_adtstoasc "/var/www/projects/${_Project._id}/default_video_project.mp4"`
        ];
    
        for(var i = 0; i < pushDoesVideos.length; i++)
        {
            await execPushOfFFMPEG(pushDoesVideos[i]); console.log(pushDoesVideos[i] + " ACCEPT");    
        };

        var UpdateProject = await Project.findOneAndUpdate({_id: data}, {video_redacting: "accept"});

        var _urlImgProject = `${h.getURL()}html/project/youtube_cover/?id=${UpdateProject._id}`;
        console.log(_urlImgProject);
        const browser = await puppeteer.launch({
            defaultViewport: {width: 1920, height: 1080},
            args: ['--no-sandbox', '--disable-setuid-sandbox'],
        });
        const page = await browser.newPage();
        await page.goto(_urlImgProject); 
        await page.emulateMedia('screen');
        await page.$('.all_good');
        const element = await page.$('.index_page_block');   
        await element.screenshot({path: `../projects/${UpdateProject._id}/logoYouTube.png`});
        await browser.close();

        h.alertAdmin({
            type: "video",
            text: "Видео было обработано, просмотрите его результаты",
            projectId: _Project._id,
        });
    };
}

async function dataOfVideo(socket, data, callback)
{
    var _Project = await Project.findOne({_id: data});

    try {
		new ffmpeg(`/var/www/projects/${_Project._id}/${_Project.data["file+8"]}`, function (err, video) {
			if (!err) 
            {
                callback({
                    status: "ok",
                    data: video.metadata,
                });
			} else {
				callback({
                    status: "error",
                });
			}
		});
	} catch (e) {
		callback({
            status: "error",
        });
	};
};

async function endInvestingDataPush(socket, data, callback)
{
    var _User               = await User.findOne({_id: data.user});
    var _Project            = await Project.findOne({_id: data.project});
    var pathToLastDocument  = `documentLast_${new Date().getTime()}_${data.user}.pdf`;


    var html        = "https://invester-relocation.site/" + data.url;

    console.log(html);

    const browser = await puppeteer.launch({
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    const page = await browser.newPage();
    await page.goto(html);
    await page.emulateMedia('screen');
    await page.pdf({path: `/var/www/projects/${_Project._id}/application_number_2_document_${data.user}.pdf`});
    await browser.close();



    merger.add(`/var/www/projects/${_Project._id}/file_signature_document.pdf`);
    merger.add(`/var/www/projects/${_Project._id}/application_number_2_document_${data.user}.pdf`); 
    await merger.save(`/var/www/projects/${_Project._id}/` + pathToLastDocument);

    await InvDoc.findOneAndUpdate({_id: data.invId}, {urlToLastDocument: pathToLastDocument});


    h.alertDeleteOfUserOnbot(`${_User.first_name} вы успешно проинвестировали в проект\n ${_Project._id}\n "${_Project.data.name}"\n на сумму ${data.money} руб.\n ${data.date}\n Ожидайте подтверждения бизнесом получения денег. Так как сумма идет банковским платежом, поступление на расчетный счет бизнеса может занять до 3х банковских дней`, _User.user);
    h.full_alert_user(_Project.user, `Поступила оплата по договору номер ${_Project._id}/1 на сумму ${data.money} руб. по договору от ${data.date}, требуется подтверждение`, "put_investring");

    callback();
}

async function setInvestERDocumentLoadOfInvester(socket, data, callback)
{
    var _Project = await Project.findOne({_id: data});

    h.alertAdmin({
        type: "correct_signature",
        text: "Договор бизнеса с инвестором был подписан",
        projectId: data,
    });

    h.alertDeleteOfUserOnbot("Договор с инвестором успешно подписан, модерация продолжается, ожидайте публикации проекта", _Project.user);

    callback();
}

async function setInvestERDocumentLoad(socket, data, callback)
{
    var _Project = await Project.findOne({_id: data});

    h.alertAdmin({
        type: "correct_investerDocument",
        text: "Был подписан документ c investER в проекте!",
        projectId: data,
    });

    h.alertDeleteOfUserOnbot("Вы подписали договор с investER, ожидайте дальнейшей модерации проекта, о ее результатах сообщим здесь", _Project.user);

    callback();
}

async function registrationDocumentAcceptAdmin(socket, data, callback)
{
    var _Project = await Project.findOne({_id: data});
    var _RegistrationDoc = _Project.registrationDocument;

    _RegistrationDoc.status = "wait";

    h.full_alert_user(_Project.user, `Вам поступил договор с ООО "ИНВЕСТИР" Необходимо ознакомится, подписать и отправить`, "file_urist");

    callback(await Project.findOneAndUpdate({_id: data}, {
        registrationDocument: _RegistrationDoc,
    }));
}

async function telegram_recomendation_push_b(socket, data, callback)
{
    var _User = await User.findOne({_id: data.userId});
    if(!_User.member_b)
    {
        if(data.attraction != _User.user)
        {
            await User.findOneAndUpdate({_id: data.userId}, {member_b: data.attraction});
        }
    };

    callback();
}

async function telegram_recomendation_push(socket, data, callback)
{
    var _User = await User.findOne({_id: data.userId});
    if(!_User.member)
    {
        if(data.attraction != _User.user)
        {
            await User.findOneAndUpdate({_id: data.userId}, {member: data.attraction});
        }
    };

    callback();
}

async function getChats(socket, data, callback)
{
    var _User               = await User.findOne({_id: data});
    var _ProjectsUser       = await Project.find({user: _User.user});
    var _UserMsgs           = await MsgDB.find({investor: _User._id});
    var _dataMsgs           = [];

    for(var _Project of _ProjectsUser)
    {
        var _ProjectMsgs = await MsgDB.find({business: _Project._id});

        for(var _msgBlock of _ProjectMsgs)
        {
            var _UserDataBlock      = await User.findOne({_id: _msgBlock.investor});
            var needUserPhoto       = null;
            var _idPhoto            = await bot.getUserProfilePhotos(_UserDataBlock.user);

            if(_idPhoto.total_count > 0)
            {
                var file_id         = _idPhoto.photos[0][0].file_id;
                needUserPhoto       = await bot.getFile(file_id);
            };

            var _dataBlock = {
                msgBlock: _msgBlock,
                name: `${_UserDataBlock.first_name} ${_UserDataBlock.last_name}`,
                img: needUserPhoto,
            };

            _dataMsgs.push(_dataBlock);
        };
    };

    for(var _msgBlock of _UserMsgs)
    {
        var _ProjectMsgBlock  = await Project.findOne({_id: _msgBlock.business});

        var _dataBlock = {
            msgBlock: _msgBlock,
            name: `${_ProjectMsgBlock.data.name}`,
            img: null,
        };

        _dataMsgs.push(_dataBlock);
    };

    callback(_dataMsgs);
}

async function getPhotoByUser(socket, data, callback)
{
    var _User               = await User.findOne({user: data});
    var needUserPhoto       = null;
    var _idPhoto            = await bot.getUserProfilePhotos(_User.user);
    if(_idPhoto.total_count > 0)
    {
        var file_id         = _idPhoto.photos[0][0].file_id;
        needUserPhoto       = await bot.getFile(file_id);
    }
    callback(needUserPhoto);
}

async function activeDataProject(socket, data, callback)
{
    var _Invs           = await InvDoc.find({projectId: data});
    var _Project        = await Project.findOne({_id: data});
    var adminProject    = await User.findOne({user: _Project.user});
    var whoGet          = null;

    if(typeof adminProject.member_b != "undefined")
    {
        whoGet = adminProject.member_b;
    }

    var _UserGet = await User.findOne({user: whoGet});

    var _data = {
        investers: {
            invs: [],
            invsWait: [],
        },
        whoGet: whoGet,
        nameGet: null,
    };

    if(_UserGet)
    {
        _data.nameGet = _UserGet.first_name;
    }

    for(var _invData of _Invs)
    {
        var _blockData = 
        {
            inv: _invData,
            commission: await commission.findOne({invId: _invData._id}),
        };

        if(_invData.status == "accept")
        {
            _data.investers.invs.push(_blockData);
        }
        else
        {
            _data.investers.invsWait.push(_blockData);
        }
    }

    callback(_data);
}

async function setCorrectionForProject(socket, data, callback)
{
    var _Project = await Project.findOne({_id: data});
    h.full_alert_user(_Project.user, `Поступил договор - оферта с Инвестором. Необходимо ознакомится подписать и отправить`, "redactingSettings");
    callback(await Project.findOneAndUpdate({_id: data}, {type: "correction"}));
}

async function telegram_auth_getToken(socket, data, callback)
{
    var _User = await User.findOne({user: data.id});

    if(_User) 
    {
        callback(_User._id);
    } 
    else 
    {
        var _patch = `../users/${data.id}`;

        async function _start() 
        {
            var _path_profile = `../users_profile/${data.id}`;

            async function _start_profil() 
            {
                var newUser = await User.create({
                    user: data.id, 
                    first_name: data.first_name, 
                    last_name: data.last_name,
                    username: data.username,
                    language_code: "ru",
                    is_bot: "false",
                    type: "investor",
                    img: null,
                    googleAuth: null,
                    alerts: null,
                    investor_data: null,
                    where: null,
                });

                if(callback) {callback(newUser._id);};    
            }

            fs.stat(_path_profile, async function(err) {
                if (!err) {_start_profil();}
                else if (err.code === 'ENOENT') {
                    await fs.mkdir(_path_profile, function() {
                        _start_profil();
                    });
                }
            })
        }

        fs.stat(_patch, async function(err) {
            if (!err) {
                _start();
            }
            else if (err.code === 'ENOENT') {
                await fs.mkdir(_patch, function() {
                    _start();
                });
            }
        });
    }
}

async function telegram_auth_more(socket, data, callback)
{
    var _User           = await User.findOne({_id: data.userId});
    await User.findOneAndUpdate({_id: data.userId}, {type: "investor"});
    var _idProject      = data.projectId;
    var userId          = _User.user;
    var msg             = {
        from: {id: _User.user},
        chat: {id: _User.user},
    };
    await User.findOneAndUpdate({user: userId}, {putProject: _idProject});
    _app.defaultShowProject(msg, _idProject);
    callback('ok');
}

async function telegram_auth_recomendation(socket, data, callback)
{
    var _User       = await User.findOne({_id: data.userId});
    await User.findOneAndUpdate({_id: data.userId}, {type: "investor"});
    var msg         = {from: {id: _User.user}};
    var _array      = [];
    var userId      = _User.user;
    var _idProject  = data.projectId;
    var html        = `Чтобы рекомендовать проект и закрепить за собой инвестора\nВам нужно поделится личной ссылкой:\nИли переслать сообщение ниже`;
    var fat         = await bot.sendMessage(userId, html, 
    {
        parse_mode: "HTML",
        "reply_markup": {
            "resize_keyboard": true,
            "keyboard": [["🏦 Инвестиционные предложения"],["💰 Мои инвестиции", "📈 Инвестировать", "💳 Реквезиты"], ["👨‍💼 Рекомендовать","🔁 Сменить роль"]],
        }
    });
    _array.push(fat.message_id);
    var needProject = await Project.findOne({_id: _idProject});

    var videoPresentationPath = `${h.getURL()}/projects/${needProject._id}/${needProject.data["file+8"]}`;
    
    if(needProject.YT_VIDEO)
    {
        var yt_data = JSON.parse(needProject.YT_VIDEO[3]);
        videoPresentationPath = `https://www.youtube.com/watch?v=${yt_data.id}`;
    }


    var html        = `[Профиль компании](${h.getURL()}html/project/profil/?id=${needProject._id})\n[Презентация](${h.getURL()}/projects/${needProject._id}/${needProject.data["file+7"]})\n[Видео презентация](${videoPresentationPath})`;
    var stream    = fs.createReadStream(`../projects/${_idProject}/logo.png`);
    var _url        = `https://invester-relocation.site/?page=telegram_authorization&type=recomendation_push&userId=${needProject._id}`;
    var fat = await bot.sendPhoto(userId, stream, {
        "caption": html,
        "parse_mode": "MarkdownV2",
        "reply_markup": {
            "inline_keyboard": [
                [
                    {
                        text: "Инвестровать",
                        login_url: {
                            'url': _url,
                            'request_write_access': true,
                        },
                    }
                ]
            ],
        }
    });
    _array.push(fat.message_id);

    var stream = fs.createReadStream(`./assets/videos/recomendation_first.gif`);
    var fat = await await bot.sendAnimation(userId, stream, {
        width: 900,
        height: 1920,
    });
    _array.push(fat.message_id);

    await h.DMA(msg, _array);

    callback('ok');
}

async function telegram_auth(socket, data, callback)
{
    var _User = await User.findOne({user: data.id});

    if(_User) {
        callback(_User._id);
    } else {
        var _patch = `../users/${data.id}`;

        async function _start() 
        {
            var _path_profile = `../users_profile/${data.id}`;

            async function _start_profil() 
            {
                var newUser = await User.create({
                    user: data.id, 
                    first_name: data.first_name, 
                    last_name: data.last_name,
                    username: data.username,
                    language_code: "ru",
                    is_bot: "false",
                    type: "investor",
                    img: null,
                    googleAuth: null,
                    alerts: null,
                    investor_data: null,
                    where: null,
                });

                if(callback) {callback(newUser._id);};    
            }

            fs.stat(_path_profile, async function(err) {
                if (!err) {_start_profil();}
                else if (err.code === 'ENOENT') {
                    await fs.mkdir(_path_profile, function() {
                        _start_profil();
                    });
                }
            })
        }

        fs.stat(_patch, async function(err) {
            if (!err) {
                _start();
            }
            else if (err.code === 'ENOENT') {
                await fs.mkdir(_patch, function() {
                    _start();
                });
            }
        });
    }
}

async function commissions_settings_close(socket, data, callback)
{
    callback(await commission.findOneAndUpdate({_id: data}, {status: "wait"}))
}

async function commissions_settings_accept(socket, data, callback)
{
    callback(await commission.findOneAndUpdate({_id: data}, {status: "accept"}))
}

async function commissions_settings(socket, data, callback)
{
    var _Commissions        = await commission.find({});
    var _CommissionsData    = {
        wait: [],
        accept: [],
    };

    for(var _Commission of _Commissions)
    {
        var invCommission       = await InvDoc.findOne({_id: _Commission.invId});
        var projectCommission   = await Project.findOne({_id: invCommission.projectId});

        var _blockCommission = {
            commission: _Commission,
            invDoc: invCommission,
            project: projectCommission,
            commissionInvestER: 0,
        };

        _blockCommission.commissionInvestER = Number(invCommission.data.pay.toString().replace(/\s/g, '')) / 100 * projectCommission.payersData.commission;

        if(_Commission.status == "wait")
        {
            _CommissionsData.wait.push(_blockCommission);
        };

        if(_Commission.status == "accept")
        {
            _CommissionsData.accept.push(_blockCommission);
        };
    };

    callback(_CommissionsData);
}

async function obligationsProjectData(socket, data, callback)
{
    var AllInvs = await InvDoc.find({projectId: data});
    var _data   = {
        project: await Project.findOne({_id: data}),
        Invs: [],
    }

    for(var Inv of AllInvs)
    {
        var _dataBLock = 
        {
            Inv: Inv,
            commission: await commission.findOne({invId: Inv._id}),
        }

        _data.Invs.push(_dataBLock);
    }

    callback(_data);
}

async function redactingProjectByAdmin(socket, data, callback)
{
    var _Project    = await Project.findOne({_id: data.projectid});
    var _data       = _Project.data;

    _data[data.lineId] = data.data;

    await Project.findOneAndUpdate({_id: data.projectid}, {data: _data});

    callback();
}

async function ALL_DATA(socket, data, callback)
{
    var _User           = await User.findOne().or([{ _id: data }, { user: data }]);
    var _Projects       = await Project.find({user: _User.user});
    var _ProjectsActive = [];
    var _allInvdocks    = [];

    for(var _Project of _Projects)
    {
        var _ProjectInvs = await InvDoc.find({projectId: _Project._id});

        for(_ProjectInv of _ProjectInvs)
        {
            _allInvdocks.push(_ProjectInv);
        };

        if(_Project.type == "active")
        {
            _ProjectsActive.push(_Project);
        };
    }

    var AllData = 
    {
        User:               _User,
        allAcceptProjects:  _ProjectsActive,
        invester_data:      await investerData(),
        obligations_data:   await obligationsData(),
        payments_new:       await payments_new(),
        attracted:          await Attracted(),
    }

    async function Attracted()
    {
        return new Promise(async (resolve,reject) =>
        {
            var _blockData      =
            {
                investers: await Payments.find({type: "investing", user: _User.user}),
                business: await Payments.find({type: "business", user: _User.user}),
            };

            resolve(_blockData);
        });
    }

    async function payments_new()
    {
        return new Promise(async (resolve,reject) =>
        {
            var allUserProjects = _Projects;
            var dateNow         = new Date().getTime();
            var _blockData      =
            {
                showBlocks: [],
            }

            for(var project of allUserProjects)
            {
                var InvsOfProject       = await InvDoc.find({projectId: project._id});
                var initNumberProject   = 1;

                for(var invPush of InvsOfProject)
                {
                    var InvesterOfInvs = await User.findOne({user: invPush.invester});

                    if(invPush.pays)
                    {
                        for(var invPushPay of invPush.pays)
                        {
                            if(Number(dateNow) - Number(invPushPay.date) < 7889400000 && invPushPay.status == "wait")
                            {
                                _blockData.showBlocks.push({
                                    date: Number(invPushPay.date),
                                    inv: invPush,
                                    invPay: invPushPay,
                                    initNumberProject: initNumberProject,
                                    InvesterOfInvs: InvesterOfInvs,
                                });
                            }
                        }
                    }

                    initNumberProject++;
                }
            }

            _blockData.showBlocks.sort(function(a, b) {
                if (Number(a.date) > Number(b.date)) {
                    return 1;
                };
                if (Number(a.date) < Number(b.date)) {
                    return -1;
                }
                return 0;
            })

            resolve(_blockData);
        });
    }

    async function obligationsData()
    {
        return new Promise(async (resolve,reject) =>
        {
            var allUserProjects = _Projects;

            var _blockData  = 
            {
                attracted: 0,
                commission: 0,
                commissionPay: 0,
                DebtComission: 0,
                showBlocks: [],
            }

            for(var project of allUserProjects)
            {
                var InvsOfProject   = await InvDoc.find({projectId: project._id});
                var commissionData  = project.payersData.commission;
                var attractedData   = 0;
                var accruedData     = 0;
                var commissionPay   = 0;
                var DebtComission   = 0;
                var repayData       = null;

                for(var invPush of InvsOfProject)
                {

                    if(!repayData)
                    {
                        if(invPush.status == "wait")
                        {
                            repayData = invPush.date;
                        }
                    }

                    var _Commission         = await commission.findOne({invId: invPush._id, status: "accept"});
                    var _CommissionDataneed = 0;

                    if(_Commission)
                    {
                        commissionPay       = commissionPay + Number(invPush.data.pay.toString().replace(/\s/g, '')) / 100 * commissionData;
                        _CommissionDataneed = Number(invPush.data.pay.toString().replace(/\s/g, '')) / 100 * commissionData;
                    }

                    attractedData           = attractedData + Number(invPush.data.pay.toString().replace(/\s/g, ''));
                    accruedData             =  accruedData + Number(invPush.data.pay.toString().replace(/\s/g, '')) / 100 * commissionData;
                    _blockData.attracted    = _blockData.attracted + Number(invPush.data.pay.toString().replace(/\s/g, ''));
                    _blockData.commission   = _blockData.commission + Number(invPush.data.pay.toString().replace(/\s/g, '')) / 100 * commissionData;
                    DebtComission           = DebtComission + ((Number(invPush.data.pay.toString().replace(/\s/g, '')) / 100 * commissionData) - _CommissionDataneed);
                }

                _blockData.showBlocks.push({
                    project: project,
                    invs: InvsOfProject,
                    attracted: attractedData,
                    accrued: accruedData,
                    commissionPay: commissionPay,
                    DebtComission: DebtComission,
                    repayData: repayData,
                });

                _blockData.commissionPay = _blockData.commissionPay + commissionPay;
                _blockData.DebtComission = _blockData.DebtComission + DebtComission;
            }

            resolve(_blockData);
        });
    }

    async function investerData()
    {
        return new Promise(async (resolve,reject) =>
        {
            var _Invs       = await InvDoc.find({invester: _User.user});
            var _acceptInvs = await InvDoc.find({invester: _User.user, status: "accept"});
            var _waitInvs   = await InvDoc.find({invester: _User.user, status: "wait"});

            var _blockData  = {
                Invs: _Invs,
                acceptInvs: _acceptInvs,
                activeInvs: [],
                waitInvs: [],
                invested: 0,
                investedWait: 0,
                paid: 0,
                receipts: 0,
            };

            for(var _Inv of _acceptInvs)
            {
                _blockData.invested = _blockData.invested + Number(_Inv.data.pay.toString().replace(/\s/g, ''));
            }

            for(var _acceptInv of _acceptInvs)
            {
                var _acceptInvBlock = 
                {
                    Inv: _acceptInv,
                    project: await Project.findOne({_id: _acceptInv.projectId}),
                    number: null,
                }

                var allAceptInvInBlock = await InvDoc.find({status: "accept", projectId: _acceptInv.projectId});

                allAceptInvInBlock.forEach((element, i) => {
                    if(element.invester == _User.user)
                    {
                        _acceptInvBlock.number = i + 1;
                    }
                });

                _blockData.activeInvs.push(_acceptInvBlock);

                for(var pay of _acceptInv.pays)
                {
                    if(pay.status == "wait")
                    {
                        _blockData.receipts = _blockData.receipts + Number(pay.pay);
                        break;
                    }
                }
            }

            for(var _waitInv of _waitInvs)
            {
                var _waitInvBlock = 
                {
                    Inv: _waitInv,
                    project: await Project.findOne({_id: _waitInv.projectId}),
                    number: null,
                }

                var allWaitInvInBlock = await InvDoc.find({status: "wait", projectId: _waitInv.projectId});

                allWaitInvInBlock.forEach((element, i) => {
                    if(element.invester == _User.user)
                    {
                        _waitInvBlock.number = i + 1;
                    }
                });

                _blockData.waitInvs.push(_waitInvBlock);
                _blockData.investedWait = _blockData.investedWait + Number(_waitInv.data.pay.toString().replace(/\s/g, ''))
            }

            for(var _Inv of _Invs)
            {
                if(_Inv.pays)
                {
                    for(var pay of _Inv.pays)
                    {
                        if(pay.status == "accept")
                        {
                            _blockData.paid = _blockData.paid + Number(pay.pay);
                        }
                    }
                }
            }

            resolve(_blockData);
        })
    }

    callback(AllData);
}

async function setRedactingProject(socket, data, callback)
{
    var _Project = await Project.findOneAndUpdate({_id: data.projectId}, {
        type: "correction",
        redacting: {
            body: data.redactingData,
            input: data.input,
        }
    });
    
    var _User = await User.findOne({user: _Project.user});

    h.full_alert_user(_User.user, `В проекте номер ${_Project._id} "${_Project.data.name}" запрошено редактирование данных`, "project_redacting");

    callback(_Project);
}

async function getProjectById(socket,data,callback)
{
    callback(await Project.findOne({_id: data}));
}

async function setInvesterDataProjectForInvesterPage(socket,data,callback)
{
    await User.findOneAndUpdate({_id: data.user}, {investor_data: data.data});
    callback();
}

async function getProjectForInvesterPage(socket, data,callback)
{
    var _User       = await User.findOne({_id: data});
    var _Project    = await Project.findOne({_id: _User.putProject});
    callback(_Project);
}

async function redactingLineSettingsPageGlobalMultiplicity(socket,data,callback)
{
    await Project.findOneAndUpdate({_id: data.projectId}, {multiplicity: data.data});
}

async function redactingLineSettingsPageGlobal(socket,data,callback)
{
    var _project = await Project.findOne({_id: data.projectId});
    var needData = _project.payersData;
    needData[data.lineId] = data.data;
    await Project.findOneAndUpdate({_id: data.projectId}, {payersData: needData});
    callback();
}

async function redactingLineSettingsPage(socket,data,callback)
{
    var _project = await Project.findOne({_id: data.projectId});

    if(typeof data.type == "undefined")
    {
        var needData = _project.data;
        needData[data.lineId] = data.data;
        await Project.findOneAndUpdate({_id: data.projectId}, {data: needData});
    } 
    else
    {
        var projectData     = _project.data;
        var idNumber        = "+" + data.lineId.split("_")[data.lineId.split("_").length - 1];
        projectData.moreUsersNotParce[idNumber.toString()][data.lineId] = data.data;
        await Project.findOneAndUpdate({_id: data.projectId}, {data: projectData});
    }
}

async function gettAllProjects(socket,data,callback)
{
    callback(await Project.find({type: "active"}));
}

async function setInvesterTypeClassAll(socket,data,callback)
{
    var _User = await User.findOne({_id: data});
}

async function setInvesterTypeAppend(socket,data,callback)
{
    var _User               = await User.findOne({_id: data.user});
    var InvesterDataArray   = _User.investor_data;

    data.data.forEach(element => {
        InvesterDataArray[element.type] = element.data;
    })

    await User.findOneAndUpdate({_id: data.user}, {investor_data: InvesterDataArray});
    callback();
}

async function setInvesterTypeCreating(socket,data,callback)
{
    var _User               = await User.findOne({_id: data.user});
    var InvesterDataArray   = _User.investor_data;
    InvesterDataArray.type  = data.data;
    await User.findOneAndUpdate({_id: data.user}, {investor_data: InvesterDataArray});
    callback();
}

async function getProjectKey(socket,data,callback)
{
    var PrjectToken = await project_key.create({
        user: data.user,
        projectId: data.projectId,
    });

    callback(PrjectToken._id);
}

async function getR_F(socket,data,callback)
{
    var _project            = await Project.findOne({_id: data});
    var _projectFizBlock    = _project.parce;
    var globalUserData      = _projectFizBlock.fiz.globalUserData;
    var moreUsersData       = _projectFizBlock.fiz.moreUsersData;

    if(_project.data.organization == 1)
    {
        if(!Array.isArray(_project.parce.ispo))
        {
            var globalUserDataParce = await ParcingPage.cheackArbitrFizUser(_project.parce.ispo);
    
            if(globalUserDataParce[0].status == 0)
            {
                _projectFizBlock.ispo = globalUserDataParce;
                await Project.findOneAndUpdate({_id: data}, {parce: _projectFizBlock});
            }
        }
    }

    if(Array.isArray(globalUserData.arBi))
    {
        if(moreUsersData.length > 0)
        {
            var moreUsersDataRedacting      = [];
            var moreUsersDataRedactingError = false;

            for(var moreUsersDataBlock of moreUsersData)
            {
                if(Array.isArray(moreUsersDataBlock.arBi))
                {
                    moreUsersDataRedacting.push(moreUsersDataBlock);
                } else 
                {
                    var moreUsersDataBlockParce = await ParcingPage.cheackArbitrFizUser(moreUsersDataBlock.arBi);

                    if(moreUsersDataBlockParce[0].status == 0)
                    {
                        moreUsersDataBlock.arBi = moreUsersDataBlockParce;
                    } else
                    {
                        moreUsersDataRedactingError = true;
                    }

                    moreUsersDataRedacting.push(moreUsersDataBlock);
                }
            }

            moreUsersData = moreUsersDataRedacting;

            await Project.findOneAndUpdate({_id: data}, {parce: _projectFizBlock});

            if(!moreUsersDataRedactingError)
            {
                callback('ok');
            }
        } else 
        {
            callback('ok');
        }
    } else 
    {
        var globalUserDataParce = await ParcingPage.cheackArbitrFizUser(globalUserData.arBi);

        if(globalUserDataParce[0].status == 0)
        {
            globalUserData.arBi = globalUserDataParce;
            await Project.findOneAndUpdate({_id: data}, {parce: _projectFizBlock});
            callback('error');
        } else {
            callback('error');
        }
    }
}

async function clearAlertMsg(socket,data,callback)
{
    await User.findOneAndUpdate({_id: data}, {alert_msgs: null});
    callback('ok');
}

async function allAttracted(socket,data,callback)
{
    var _User       = await User.findOne({_id: data});

    var getB = async () => 
    {
        var _array      = [];
        var _investorsB = await User.find({member_b: _User.user});
        
        for (const _UserB of _investorsB) 
        {
            var _Projects   = await Project.find({user: _UserB.user});

            _Projects.forEach(el => {
                _array.push(el);
            });
        }

        return _array;
    }
    
    var _data = 
    {
        "investors": await User.find({member: _User.user}),
        "business": await getB(),
    }

    callback(_data);
}

async function Attracted_by_pays(socket,data,callback)
{
    var _User       = await User.findOne({_id: data});
    var AllPays     = await Payments.find({user: _User.user});
    callback(AllPays);
}

async function dellSignatureFile(socket,data,callback)
{
    await Project.findOneAndUpdate({_id: data}, {signature_document: null, type: "moderation"});
    callback();
}

async function allPayments(socket,data,callback)
{
    var _User           = await User.findOne({_id: data});
    var _allPayments    = await Payments.find({user: _User.user});

    callback(_allPayments);
}

async function getInv(socket,data,callback)
{
    console.log(data);
    var _User       = await User.findOne({_id: data._id});
    var _InvDoc     = await InvDoc.findOne({projectId: data.projectId, invester: _User.user});
    callback(_InvDoc);
}

async function getPaysBusiness(socket,data,callback)
{
    var alls = [];

    var _InvDocs   = await InvDoc.find({projectId: data});

    for (const _User of _InvDocs) 
    {
        var _bPaysAccept = await bPaysAccept.findOne({invId: _User._id});

        var _status = null;

        if(_bPaysAccept)
        {
            _status = _bPaysAccept;
        }

        alls.push({
            pay: _User.data.pay,
            needPay: (_User.data.pay * 0.25),
            Inv: _User,
            status: _status,
        })
    }

    callback(alls);
}

async function toAttractPay(socket,data,callback)
{
    var _Users = await User.find({});

    function __Attracted_by_me(_User)
    {
        var _id = _User._id;

        return new Promise((resolve,reject) =>
        {   
            Attracted_by_me(null, _id, function(data) {
                resolve(data);
            })
        });
    }

    function __Attracted_by_me_b(_User)
    {
        var _id = _User._id;

        return new Promise((resolve,reject) =>
        {   
            Attracted_by_me_b(null, _id, function(data) {
                resolve(data);
            })
        });
    }

    function __Attracted_by_me_investing_pay(AM_data_user)
    {
        var _id = AM_data_user;

        return new Promise((resolve,reject) =>
        {   
            Attracted_by_me_investing_pay(null, _id, function(data) {
                resolve(data);
            })
        });
    }

    var all_pays = [];
    

    for (const _User of _Users) 
    {
        var AM = await __Attracted_by_me(_User);
        // var AB = await __Attracted_by_me_b(_User);
        
        for (const AM_data of AM) 
        {
            var AM_data_fun = await __Attracted_by_me_investing_pay(AM_data.user);

            var _User_Pays = {
                AM_data_fun: AM_data_fun,
                AM_data: AM_data,
            };

            all_pays.push(_User_Pays);
        }   
    }

    callback(all_pays);
}

async function bPaysFun(socket,data,callback)
{
    var _bPays  = await bPays.find({});
    callback(_bPays);
}

async function getUserID(socket,data,callback)
{
    var _User = await User.findOne({user: data});
    callback(_User._id);
}

async function test_fun(socket,data,callback)
{
    var html = `Тестовая функция авторизации! Не использовать!`;

    var fat = await h.send_html( -1001205415519, html, {
        "inline_keyboard": [
            [
                { // ""
                    text: "Инвестровать",
                    login_url: {
                        'url': 'https://invester-relocation.site/',
                        'request_write_access': true,
                    },
                }
            ]
        ],
    });
}

async function tg_alert_user_numbers(socket,data,callback)
{
    // var _User       = await User.findOne({user: data.user});

    // let options = 
    // {
    //     mode: 'text',
    //     scriptPath: '../python/system_alerts_user',
    //     args: [_User.username, data.text]
    // };

    // console.log(options);

    // await PythonShell.run('main.py', options, function (err, results) {
    //     if (err) throw err;
    // })
}

async function tg_alert_user(socket,data,callback)
{
    // let options = 
    // {
    //     mode: 'text',
    //     scriptPath: '../python/system_alerts_user',
    //     args: [data.user, data.text]
    // };

    // await PythonShell.run('main.py', options, function (err, results) {
    //     if (err) throw err;
    // })
}

async function tg_alert(socket,data,callback)
{
    // let options = 
    // {
    //     mode: 'text',
    //     scriptPath: '../python/system_alerts',
    //     args: data
    // };

    // await PythonShell.run('main.py', options, function (err, results) {
    //     if (err) throw err;
    // })
}

async function getBitsFile(socket,data,callback)
{
    console.log(filesMoreData);

    if(typeof filesMoreData[data] != "undefined")
    {
        var _element = filesMoreData[data];
        
        callback(_element);
    } else {
        callback(null);
    }
}

async function reload_type(socket,data,callback)
{
    var _type   = data.type;
    var _id     = data._id;

    await User.findOneAndUpdate({_id: _id}, {type: _type});
    callback();
}

async function getAllProjectsInvesting(socket,data,callback)
{
    var _getAllProjectsInvesting = await Project.find({type: "active"});
    callback(_getAllProjectsInvesting);
}

async function allInvestings(socket,data,callback)
{
    var allProjects     = await Project.find({});
    var allData         = [];

    for(_project of allProjects)
    {
        var InvsOfProject   = await InvDoc.find({projectId: _project._id});
        var addBlock        = {
            project: _project,
            invs: [],
        };

        if(InvsOfProject.length > 0)
        {
            InvsOfProject.forEach(invElement => {
                addBlock.invs.push(invElement);
            });

            allData.push(addBlock);
        }
    }

    callback(allData);
}

async function allUsers(socket,data,callback)
{
    var _Users      = await User.find({});
    callback(_Users);
}

async function setCreatingData(socket,data,callback)
{
    var _User       = await User.findOne({_id: data.user});
    var creatingData = data;
    await User.findOneAndUpdate({_id:data.user}, {creatingData: creatingData});

    callback(`https://invester-relocation.site/html/project/creating/#${_User._id}`);
}

async function creatingData(socket,data,callback)
{
    var url = "https://suggestions.dadata.ru/suggestions/api/4_1/rs/findById/party";
    var token = "cd3a829357362fec55fc201c3f761002def9906f";
    var query = data;
    
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
            callback("error");
        } else {
            var _data = _dataFirst.suggestions[0].data;
            callback(_data);
        }
    });
}

async function setSignaturePro(socket,data,callback)
{
    var _User   = await User.findOne({_id: data.user});
    var _arrayData = _User.investor_data;

    _arrayData.document = data.data;

    await InvDoc.create({
        projectId: _User.putProject,
        invester: _User.user,
        status: "wait",
        data: _arrayData,
        receipt: null,
        pays: null,
    });

    callback();
}

async function getInvestorDocument(socket,data,callback)
{
    var _Investor   = await User.findOne({_id: data.id});
    callback(_Investor);
}

async function getBussnes(socket,data,callback)
{
    var _Project = await Project.findOne({_id: data});
    callback(_Project);
}

async function selectedMsgChats(socket,data,callback)
{
    var _User = await User.findOne({_id: data});
    
    if(_User.type == "investor")
    {
        var AllMsgs = await MsgDB.find({investor: _User._id});

        callback(AllMsgs);
    } else if(_User.type == "business")
    {
        var allChats = [];

        var allProjects = await Project.find({user: _User.user});

        for (const _project of allProjects) {
            var AllMsgs = await MsgDB.find({business: _project._id});
            AllMsgs.forEach(el => {
                allChats.push(el);
            })
        }

        callback(allChats);
    }
}

async function Attracted_by_me_investing_pay(socket,data,callback)
{
    var _InvDocs        = await InvDoc.find({invester: data});

    var AllPays         = [];

    for (const el of _InvDocs) 
    {
        var Pay     = el.data.pay;
        var YouPay  = el.data.pay * 0.0875;

        var status = "Ожидает оплаты";

        var _PaysAttract = await PaysAttract.findOne({idInv: el._id});

        if(_PaysAttract)
        {
            status = "Оплачено";
        }

        AllPays.push({
            Pay: Pay,
            YouPay: YouPay,
            status: status,
        })
    }

    callback(AllPays);
}

async function Attracted_by_me_Bussnes_pay(socket,data,callback)
{
    var _InvDocs        = await InvDoc.find({projectId: data});

    var AllPays         = [];

    for (const el of _InvDocs) 
    {
        var Pay     = el.data.pay;
        var YouPay  = el.data.pay * 0.0375;

        var status = "Ожидает оплаты";

        var _PaysAttract = await PaysAttract.findOne({idInv: el._id});

        if(_PaysAttract)
        {
            status = "Оплачено";
        }

        AllPays.push({
            Pay: Pay,
            YouPay: YouPay,
            status: status,
        })
    }

    callback(AllPays);
}

async function Attracted_by_me_b(socket,data,callback)
{
    var _User               = await User.findOne({_id: data});
    var Attracted_by_me     = await User.find({member_b: _User.user});

    var AllProjects = [];

    for (const value of Attracted_by_me) {
        var _Project = await Project.find({user: value.user});
        if(_Project.length > 0) {
            AllProjects.push(_Project);
        }
    }

    callback(AllProjects);
}

async function Attracted_by_me(socket,data,callback)
{
    var _User               = await User.findOne({_id: data});
    var Attracted_by_me     = await User.find({member: _User.user});
    callback(Attracted_by_me);
}

async function all_msgs(socket,data,callback)
{
    var _MsgDB = await MsgDB.findOne({investor: data.user, business: data.to});
    callback(_MsgDB);
}

async function msgUP(socket,data,callback)
{
    var _MsgDB = await MsgDB.findOne({investor: data.user, business: data.to});

    await User.findOneAndUpdate({_id: data.user}, {alert_msgs: "true"});

    var _Project        = await Project.findOne({_id: data.to});

    await User.findOneAndUpdate({user: _Project.user}, {alert_msgs: "true"});

    if(!_MsgDB) {
        var _array  = [];
        _array.push({
            text: data.msg,
            type: data.type,
        })
        await MsgDB.create(
        {
            investor: data.user,
            business: data.to,
            msgs: _array,
        });
    } else {
        var _array = _MsgDB.msgs;
        _array.push({
            text: data.msg,
            type: data.type,
        }) 
        await MsgDB.findOneAndUpdate({
            _id: _MsgDB._id,
        },
        {
            msgs: _array,
        });
    }
}

async function removePayInvestor(socket,data,callback)
{
    await InvDoc.deleteOne({invester: data});
    callback();
}

async function getPaysProject(socket,data,callback)
{
    var _InvDocs    = await InvDoc.find({projectId: data});

    var allPays = 0;

    _InvDocs.forEach(el => {
        allPays = allPays + Number(el.data.pay);
    });

    callback(allPays);
}

async function getAllProjectsBusiness(socket, data, callback)
{
    var _User       = await User.findOne({_id: data});
    var _Projects   = await Project.find({user: _User.user});

    callback(_Projects);
}

async function invester_status_project(socket,data,callback)
{
    var _InvDoc     = await InvDoc.findOne({invester: data.id, projectId: data.project});
    var _User       = await User.findOne({user: data.id});
    var _Project    = await Project.findOne({_id: data.project});
    var AllInvs     = await InvDoc.find({projectId: data.project});
    var initNumber  = 0;
    
    for(var i = 0; i < AllInvs.length; i++)
    {
        if(AllInvs[i]._id.toString().trim() == _InvDoc._id.toString().trim())
        {
            initNumber = i + 1;
        };
    };

    callback({
        invester: _User,
        InvDoc: _InvDoc,
        project: _Project,
        initNumber: initNumber,
    });
}

async function acceptInvestor(socket,data,callback) 
{
    var _Project            = await Project.findOne({_id: data.projectId});
    var _InvDoc             = await InvDoc.findOne({invester: data.id, projectId: data.projectId});

    var InvPay              = Number(_InvDoc.data.pay.toString().replace(/\s/g, ''));       // 100 000
    var ProjectDate         = Number(_Project.data.date.toString().replace(/\s/g, ''));     // 2 мес \ Бессрочно
    var jsDate              = new Date(Number(_InvDoc.date));
    var NowToday            = DateTime.fromJSDate(jsDate).setZone("Europe/Moscow");

    var InvPays             = [];
    
    var paymentsFunction    = 
    {
        "Ежедневно": async function()
        {
            var RateBlock       = Number(_Project.data.rate / 365);
            var LastData        = NowToday.plus({ months: ProjectDate });
            var HowManyDays     = Interval.fromDateTimes(NowToday, LastData).length('days');
            var EveryPayment    = Number(InvPay / 100 * RateBlock).toFixed(0);

            for(var i = 0; i < HowManyDays; i++)
            {
                InvPays.push({
                    pay: EveryPayment,
                    date: NowToday.plus({ days: i + 1 }),
                    receipt: null,
                    status: "wait",
                });
            }
        },
        "Ежемесячно": async function()
        {
            var RateBlock       = Number(_Project.data.rate / 12);
            var LastData        = NowToday.plus({ months: ProjectDate });
            var HowManyDays     = Interval.fromDateTimes(NowToday, LastData).length('month');
            var EveryPayment    = Number(InvPay / 100 * RateBlock).toFixed(0);

            for(var i = 0; i < HowManyDays; i++)
            {
                InvPays.push({
                    pay: EveryPayment,
                    date: NowToday.plus({ months: i + 1 }),
                    receipt: null,
                    status: "wait",
                });
            }
        },
        "Ежеквартально": async function()
        {
            var RateBlock               = Number(_Project.data.rate / 12 * 3);
            var LastData                = NowToday.plus({ months: ProjectDate });
            var HowManyDays             = Interval.fromDateTimes(NowToday, LastData).length('month');
            var EveryPayment            = Number(InvPay / 100 * RateBlock).toFixed(0);
            var HowManyDaysRedacting    = Number(HowManyDays / 3);

            for(var i = 1; i <= HowManyDaysRedacting; i++)
            {
                InvPays.push({
                    pay: EveryPayment,
                    date: NowToday.plus({ months: i * 3 }),
                    receipt: null,
                    status: "wait",
                });
            };

            if(!Number.isInteger(HowManyDaysRedacting))
            {
                var drobNumber = HowManyDaysRedacting % 1;

                InvPays.push({
                    pay: EveryPayment * drobNumber,
                    date: LastData,
                    receipt: null,
                    status: "wait",
                });
            }
        },
        "Ежегодно": async function()
        {
            var RateBlock       = Number(_Project.data.rate);
            var LastData        = NowToday.plus({ months: ProjectDate });
            var HowManyDays     = Interval.fromDateTimes(NowToday, LastData).length('year');
            var EveryPayment    = Number(InvPay / 100 * RateBlock).toFixed(0);

            for(var i = 0; i < HowManyDays; i++)
            {
                InvPays.push({
                    pay: EveryPayment,
                    date: NowToday.plus({ year: i + 1 }),
                    receipt: null,
                    status: "wait",
                });
            }

            if(!Number.isInteger(HowManyDays))
            {
                var drobNumber = HowManyDays % 1;

                InvPays.push({
                    pay: EveryPayment * drobNumber,
                    date: LastData,
                    receipt: null,
                    status: "wait",
                });
            }
        },
        "Раз в 6 месяцев": async function()
        {
            var RateBlock               = Number(_Project.data.rate / 12 * 6);
            var LastData                = NowToday.plus({ months: ProjectDate });
            var HowManyDays             = Interval.fromDateTimes(NowToday, LastData).length('month');
            var EveryPayment            = Number(InvPay / 100 * RateBlock).toFixed(0);
            var HowManyDaysRedacting    = Number(HowManyDays / 6);

            for(var i = 1; i <= HowManyDaysRedacting; i++)
            {
                InvPays.push({
                    pay: EveryPayment,
                    date: NowToday.plus({ months: i * 6 }),
                    receipt: null,
                    status: "wait",
                });
            }

            if(!Number.isInteger(HowManyDaysRedacting))
            {
                var drobNumber = HowManyDaysRedacting % 1;

                InvPays.push({
                    pay: EveryPayment * drobNumber,
                    date: LastData,
                    receipt: null,
                    status: "wait",
                });
            }
        },
        "В конце срока": async function()
        {
            var RateBlock       = Number(_Project.data.rate / 12 * ProjectDate);
            var EveryPayment    = Number(InvPay / 100 * RateBlock).toFixed(0);

            InvPays.push({
                pay: EveryPayment,
                date: NowToday.plus({ months: ProjectDate }),
                receipt: null,
                status: "wait",
            });
        },
    };

    paymentsFunction[_Project.data.date_payments]();

    // h.full_alert_user(data.id, `Ваша инвестиция была подтверждена! Номер проекта ${_Project._id}`, "acceptInvestor");

    var _InvDocNeed             = await InvDoc.findOneAndUpdate({invester: data.id, projectId: data.projectId}, {status: "accept", pays: InvPays});
    var _UserInv                = await User.findOne({user: _InvDoc.invester});
    var _UserProject            = await User.findOne({user: _Project.user});

    if(_UserInv.member)
    {
        await Payments.create({
            user: _UserInv.member,
            type: "investing",
            pay: _InvDoc.data.pay,
            status: "wait",
            data: {
                _id: _InvDoc._id,
                _InvInvester: _InvDoc.invester,
                ProjectData: _Project.payersData,
            },
            date: new Date().getTime().toString(),
        });
    };

    if(_UserProject.member_b)
    {
        if(typeof _UserProject.member_b_project != "undefined")
        {
            if(_UserProject.member_b_project == _Project._id)
            {
                await Payments.create({
                    user: _UserProject.member_b,
                    type: "business",
                    pay: _InvDoc.data.pay,
                    status: "wait",
                    data: {
                        _id: _Project._id,
                        ProjectData: _Project.payersData,
                    },
                    date: new Date().getTime().toString(),
                });
            };
        };
    };

    callback(_InvDocNeed);
}

async function getUserForId(socket,data,callback) 
{
    var _User       = await User.findOne({_id: data});
    if(_User)
    {
        var needUser    = {
            _User: _User,
        };
        var _idPhoto    = await bot.getUserProfilePhotos(_User.user);
        if(_idPhoto.total_count > 0)
        {
            var file_id         = _idPhoto.photos[0][0].file_id;
            needUser.Path_im    = await bot.getFile(file_id);
        }
        callback(needUser);
    } else
    {
        callback('error');
    }
}

async function notAcceptInvesting(socket,data,callback) 
{
    var _User           = await User.findOne({_id: data});
    var allProjects     = await Project.find({user: _User.user});

    var _arrayProjects  = [];
    var allInv          = [];
    var _arrayAllInvs   = [];
    var trueInvs        = [];

    allProjects.forEach(function(project) {
        _arrayProjects.push(project._id);
    });

    for (const value of _arrayProjects) {
        var InvDocs = await InvDoc.find({projectId: value});
        if(InvDocs.length > 0) {
            allInv.push(InvDocs);
        }
    }

    allInv.forEach(el => {
        el.forEach(el2 => {
            _arrayAllInvs.push(el2);
        })
    });

    _arrayAllInvs.forEach(element => {
        if(element.status == "wait") {
            trueInvs.push(element);
        }
    });

    callback(trueInvs);
   
}

async function getInvestorsProject(socket,data,callback) {
    var _InvDoc = await InvDoc.find({projectId: data});
    callback(_InvDoc);
}

async function Business_status_projects(socket, data, callback)
{
    var _User           = await User.findOne({_id: data._id});
    var _allProjects    = await Project.find({user: _User.user});
    var _allInvdocks    = [];

    for(var _project of _allProjects)
    {
        var InvDocs = await InvDoc.find({projectId: _project._id});
        InvDocs.forEach(element => {
            _allInvdocks.push(element);
        })
    }

    callback(_allInvdocks);
}

function alertProject(socket,data,callback) 
{
    exec(`python "../python/app.py" "♦️ ${data}"`);
}   

async function getAddr(socket,data,callback) 
{
    var _url = "https://cleaner.dadata.ru/api/v1/clean/address";
    var token = "cd3a829357362fec55fc201c3f761002def9906f";
    var secret = "17df8cdd3e4ace2be6c66bd1ee208d26e54d9843";
    var query = data;

    var options = {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Token " + token,
            "X-Secret": secret
        },
        body: JSON.stringify([query])
    }

    fetch(_url, options)
        .then(response => response.text())
        .then(result => callback(result))
        .catch(error => console.log("error", error));
}

async function correct_signature_document(socket,data,callback) {
    var _project = await Project.findOne({_id: data._id});
    var _array = _project.signature_document;
    _array.status = 'on';
    _array.img = data.img;

    h.alertAdmin({
        type: "correct_signature",
        text: "Получена подпись проекта!",
        projectId: _project._id,
    })

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

    console.log(data.files);

    fs.writeFile(`../users/${_user_id}/${file_id}.${_pts}`, data.files, (err) => {
        if(err) throw err;
        callback({
            file_name: `${file_id}.${_pts}`,
        });
    });
}

async function correct_signature(socket,data,callback) 
{
    var _project = await Project.findOne({_id: data._id});
    var _array = _project.signature;
    _array.data = data.data;
    _array.status = "on";

    h.alertAdmin({
        type: "correct_investerDocument",
        text: "Дополнительные документы проекта были добавленны",
        projectId: _project._id,
    });
    
    h.alertDeleteOfUserOnbot("Дополнительные документы проекта успешно загружены, ождайте результатов модерации", _project.user);

    await Project.findOneAndUpdate({_id: data}, {signature: _array, type: "moderation"});
}

async function getID(socket,data,callback) {
    var _project = await Project.findOne({_id: data});
    callback(_project.user);
}

async function putRedacting(socket,data,callback) {

    var _project    = await Project.findOne({_id: data._id});
    var _data       = _project.data;

    data.array.forEach(element => 
    {
        var _error      = true;

        for (var key in _data) 
        {
            if(key == element.name) {
                _data[key]  = element.val;
                _error      = false;
            }
        }

        if(_error)
        {
            var _name = element.name;

            if(_name.split('*')[0] != "BB")
            {
                _data[_name] = element.val;
            } else 
            {
                var allBlackMoreUsers           = _data.moreUsersNotParce;
                var numberBlock                 = "+" + _name.split('_')[_name.split('_').length - 1];

                for(var _key in allBlackMoreUsers)
                {
                    if(_key == numberBlock.toString())
                    {
                        allBlackMoreUsers[_key][_name] = element.val;
                    }
                }

                _data.moreUsersNotParce = allBlackMoreUsers;
            }
        }
    });

    var _Project = await Project.findOneAndUpdate({_id: data._id}, {data: _data, type: "moderation", redacting: null, last_redacting: data.array});

    h.alertAdmin({
        type: "creating_project",
        text: "Проект был отредактирован пользователем",
        projectId: _Project._id,
    });

    h.alertDeleteOfUserOnbot("Данные проекта были успешно изменены! Ожидайте дальнейшей модерации", _project.user);

    callback('ok');
}

async function not_acceptProject(socket,data,callback) 
{
    var _project = await Project.findOneAndUpdate({_id: data._id}, {type: "correction", redacting: data.data});
    h.full_alert_user(_project.user, `В проекте под номером ${_project._id} нужно исправить данные!`, "redactingSettings");
    callback();
}

async function getProject_id(socket,data,callback) {
    var _project = await Project.findOne({_id: data});
    callback(_project);
}

async function getNewDataProjects(socket,data,callback) 
{
    var _project = await Project.findOne({_id: data._id});

    h.full_alert_user(_project.user, `К проекту номер ${_project._id} "${_project.data.name}" запрошенны дополнительные документы`, `correction_signature`);

    var _project = await Project.findOneAndUpdate({_id: data._id}, 
    {
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
    var _project = await Project.findOneAndUpdate({_id: data}, {type: "active"});
    callback('ok');
}

async function acceptProject(socket,data,callback) 
{
    var _project = await Project.findOne({_id: data});

    var _urlImgProject = `${h.getURL()}html/project/cover/?id=${data}&liner=true`;
    console.log(_urlImgProject);
    const browser = await puppeteer.launch({
        args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=3840,3840'],
        defaultViewport: null,
    });
    const page = await browser.newPage();   
    await page._client.send('Emulation.clearDeviceMetricsOverride');
    await page.goto(_urlImgProject);
    await page.emulateMedia('screen');
    const element = await page.$('.cover_block');
    await page.waitForSelector('.all_good');
    await element.screenshot({
        path: `../projects/${data}/logo_instagram.jpg`,
    });
    await browser.close();

    var videoPresentationPath = `${h.getURL()}/projects/${_project._id}/${_project.data["file+8"]}`;
    
    if(_project.YT_VIDEO)
    {
        var yt_data = JSON.parse(_project.YT_VIDEO[3]);
        videoPresentationPath = `https://www.youtube.com/watch?v=${yt_data.id}`;
    }

    var html = `[Профиль компании](${h.getURL()}html/project/profil/#${_project._id}/)\n[Презентация](${h.getURL()}/projects/${_project._id}/${_project.data["file+7"]})\n[Видео презентация](${videoPresentationPath})`;
    
    const stream = fs.createReadStream(`../projects/${data}/logo_instagram.jpg`);

    var dataPhotoPush = await bot.sendPhoto(-1001205415519, stream, {
        "caption": html,
        "parse_mode": "MarkdownV2",
        "reply_markup": {
            "inline_keyboard": [
                [
                    {
                        text: "Рекомендовать",
                        login_url: {
                            'url': `https://invester-relocation.site/?page=telegram_authorization&type=recomendation&userId=${data}`,
                            'request_write_access': true,
                        },
                    }
                ],
                [
                    {
                        text: "Подробнее",
                        login_url: {
                            'url': `https://invester-relocation.site/?page=telegram_authorization&type=more&userId=${data}`,
                            'request_write_access': true,
                        },
                    }
                ]
            ],
        }
    });
    
    const client = new Instagram({ username: "investER_official", password: "e<<@H&_ArB~5ef7" });

    ;(async () => 
    {
        const photo = `https://invester-relocation.site/projects/${data}/logo_instagram.jpg`;

        var _caption = `
            *
            ${_project.data.name}
            ${_project.data.target}
            Ставка: ${_project.data.rate}
            Выплаты: ${_project.data.date_payments}
            Вход от: ${_project.data.minimal_amount}
            Сбор до: ${_project.data.date}
            *
            Подробнее по ссылке в шапке профиля
        `;
    
        client
            .login()
            .then(async () => {
                try {
                    const { media } = await client.uploadPhoto({ photo: photo, caption: _caption, post: 'feed' });
                    console.log(`https://www.instagram.com/p/${media.code}/`);
                } catch (e) {
                    console.log(e);
                }
                
            })
    })();

    var UserProject     = await User.findOne({user: _project.user});

    if(typeof UserProject.member_b_project == "undefined")
    {
        await User.findOneAndUpdate({user: _project.user}, {member_b_project: _project._id});
    };

    await Project.findOneAndUpdate({_id: data}, 
    {
        type: "active", 
        channel_id: dataPhotoPush.message_id,
        data_creating: new Date().getTime(),
    });


    h.full_alert_user(_project.user, `Ваш проект номер ${_project._id} "${_project.data.name}" был опубликован в investER!`, "acceptProject");

    h.alertAdmin({
        type: "creating_project",
        text: `Проект ${_project.data.name} был опубликован в канале!`,
        projectId: _project._id,
    });
}


var _AllParce = 
{
    "parceProject": async function(inn)
    {
        inn = inn.data;

        return new Promise((resolve,reject) =>
        {   
            var options = 
            {
                method: "POST",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Authorization": "Token " + config.dadata_token
                },
                body: JSON.stringify({query: inn})
            }
            
            fetch("https://suggestions.dadata.ru/suggestions/api/4_1/rs/findById/party", options)
            .then(response => response.text())
            .then(result => 
            {

                console.log(result);

                var _dataFirst = JSON.parse(result.toString());
        
                if(_dataFirst.suggestions.length == 0) 
                {
                    resolve('error');
                } else 
                {
                    resolve(_dataFirst.suggestions[0].data);
                }
            });
        });
    },
    "parceProjectFiz": async function(_data) {
        return new Promise((resolve,reject) =>
        {
            var fio             = _data.initials.split(' ');
            var query           = _data.region;
            var url             = "https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address";
            var token           = "cd3a829357362fec55fc201c3f761002def9906f";
            var first_name      = fio[1];
            var second_name     = fio[2];
            var last_name       = fio[0];
            var birth_date      = _data.date_user;

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
                var _dataFirst = JSON.parse(result.toString()).suggestions[0].data.region_kladr_id;

                _dataFirst = _dataFirst.replace(/0/g, '');

                var config = {
                    method: 'get',
                    url: `https://api-ip.fssp.gov.ru/api/v1.0/search/physical?token=er77gLcQvTO5&firstname=${encodeURI(first_name)}&secondname=${encodeURI(second_name)}&lastname=${encodeURI(last_name)}&birthdate=${birth_date}&region=${_dataFirst}`,
                    headers: { }
                };    
                
                axios(config)
                .then(async function (response) {
                    var adaw = await R_F.create({
                        data: JSON.stringify(response.data),
                    })
                    resolve(adaw._id);
                })
                .catch(function (error) {
                    console.log(error);
                });
            });
        });
    },
    "_ParceProjectIspo": function (_data) 
    {
        return new Promise((resolve,reject) => 
        {
            console.log(_data.addr);

            var query           = _data.addr;
            var url             = "https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address";
            var token           = "cd3a829357362fec55fc201c3f761002def9906f";
            var _name           = _data.name_company;

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
                var _dataFirst = null;

                if(_data.addr[0] == "1")
                {
                    _dataFirst = 50;
                } else {
                    console.log(JSON.parse(result.toString()));

                    if(typeof JSON.parse(result.toString()) != "undefined")
                    {
                        if(typeof JSON.parse(result.toString()).suggestions != "undefined")
                        {
                            _dataFirst = JSON.parse(result.toString()).suggestions[0].data.region_kladr_id;
                            _dataFirst = _dataFirst.replace(/0/g, '');
                        } else
                        {
                            _dataFirst = 50;
                        }
                    } else
                    {
                        _dataFirst = 50;
                    }
                }
                
                if(_dataFirst.length == 1)
                {
                    _dataFirst = _dataFirst.toString() + "0";
                }

                var config = {
                    method: 'get',
                    url: `https://api-ip.fssp.gov.ru/api/v1.0/search/legal?token=er77gLcQvTO5&name=${encodeURI(_name)}&region=${_dataFirst}`,
                    headers: {}
                };    
                
                axios(config)
                .then(async function (response) {
                    var adaw = await R_F.create({
                        data: JSON.stringify(response.data),
                    })
                    resolve(adaw._id);
                })
                .catch(function (error) {
                    console.log(error);
                });
            });
        });
    },
    "_ParcingArbitraj": async function(inn)
    {
        let options = 
        {
            mode: 'text',
            scriptPath: '../python/parcingArbitraj',
            args: inn,
        };

        return new Promise((resolve,reject) => {
            try {
                PythonShell.run('main.py', options, function (err, results) {
                    if (err) throw err;
                    resolve(JSON.parse(results));  
                });
            }
            catch{
                reject();  
            }
        })
    },
    "uploadVideo": async function(_patch, _projectPath, name, target, projectId)
    {
        let options = 
        {
            mode: 'text',
            scriptPath: '../python/YouTube_Upload',
            args: [_patch + '/' + _projectPath, name, target, projectId],
        };

        return new Promise((resolve,reject) => {
            try {
                PythonShell.run('main.py', options, function (err, results) {
                    if (err) throw err;
                    resolve(results); 
                })
            }
            catch{
                reject();  
            }
        })
    }
}

async function setYouTubeVideo(socket,data,callback)
{
    var _project        = await Project.findOne({_id: data.projectId});

    h.alertAdmin({
        type: "video",
        text: "Видео было отправлено на YouTube, ожидайте его публикации",
        projectId: _project._id,
    });

    var _patch          = `/var/www/projects/${_project._id}`;
    var YT_VIDEO        = await _AllParce.uploadVideo(_patch, "default_video_project.mp4", data.name, data.description, _project._id);

    if(YT_VIDEO != null) {
        await Project.findOneAndUpdate({_id: _project._id}, {YT_VIDEO: YT_VIDEO});

        h.alertAdmin({
            type: "video",
            text: "Видео было опубликовано на YouTube",
            projectId: _project._id,
        });

        callback('Загруженно!');
    } else {

        h.alertAdmin({
            type: "video",
            text: "Видео не опубликовалось на YouTube, квота могла быть исчерпана",
            projectId: _project._id,
        });
        callback('Не верный формат!');
    }
}

async function cheackInnCreator(socket,data,callback)
{
    var _ParceProject       = await _AllParce.parceProject(data.data.inn);
    if(_ParceProject == 'error') { callback('error'); return; };
    callback('ok');
}

async function setProject(socket,data,callback) 
{
    var _User                       = await User.findOne({user: data.user});
    var html                        = _User.first_name + '\nПроект успешно подан на модерацию.\nВы получите уведомление в боте о ее результатах.';
    var user_path                   = `../users/${_User.user}`;
    var _dataProject                = data.data;
    var redactinProject             = {}; // ParcingPage
    var redactinMoreUsers           = {};
    var sortMoreUsers               = {};
    var _DataProject    = 
    {
        user: data.user,
        type: "moderation",
        data: null,
        parce: null,
        redacting: null,
        signature: null,
        signature_document: null,
        payersData: 
        {
            commission: 0,
            company_commission: 5,
            attraction_commission: 50,
            investors_commission: 70,
            business_commission: 30,
        }
    };

    h.alertDeleteOfUserOnbot(html, _User.user);

    for(var _key in _dataProject)
    {
        if(_key.split("*")[0] == "BB")
        {
            redactinMoreUsers[_key] = _dataProject[_key].data;
        } else
        {
            redactinProject[_key]   = _dataProject[_key].data;
        }
    }

    for(var _key in redactinMoreUsers)
    {
        var _targetNumber = _key.split('_')[_key.split('_').length - 1];
        if(typeof sortMoreUsers["+" + _targetNumber.toString()] == "undefined")
        {
            sortMoreUsers["+" + _targetNumber.toString()] = {};
        }
        sortMoreUsers["+" + _targetNumber.toString()][_key] = redactinMoreUsers[_key];
    }

    var ParceUsersBlock = await ParcingPage.ParceUsersBlock(redactinProject, sortMoreUsers);

    if(_dataProject.organization != 3)
    {
        _DataProject.parce = 
        {
            "pr": await ParcingPage.ParceProject(redactinProject.inn),
            "ar": await ParcingPage.ParcingArbitrage(redactinProject.inn),
            "ispo": null,
            "fiz": ParceUsersBlock,
        };

        if(_dataProject.organization == 1)
        {
            _DataProject.parce.ispo = await _AllParce._ParceProjectIspo(redactinProject);
        };
    } else {
        _DataProject.parce = 
        {
            "fiz": ParceUsersBlock,
        };
    }

    _DataProject.data                   = redactinProject;
    _DataProject.data.moreUsersNotParce = sortMoreUsers;
    _DataProject.data.organization      = _dataProject.organization;

    var _Project        = await Project.create(_DataProject);
    var _patch          = `/var/www/projects/${_Project._id}`;
    await wrench.copyDirSyncRecursive(user_path, _patch);
    await fs.readdir(user_path, (err, files) => {
        if (err) throw err;
      
        for (const file of files) {
            fs.unlink(path.join(user_path, file), err => {
                if (err) throw err;
            });
        }
    }); 
    await savePuppeter(_Project._id);

    h.alertAdmin({
        type: "creating_project",
        text: "Новый проект подан на модерацию",
        projectId: _Project._id,
    });

    callback({status: "ok"});    
}

async function redactingParcingProject(socket, data, callback)
{
    var _Project            = await Project.findOne({_id: data});
    
    h.alertAdmin({
        type: "creating_project",
        text: `К проекту номер ${data} запрошен перепарсинг данных, ожидайте оповещения об его окончании`,
        projectId: _Project._id,
    });

    
    var _ProjectParce       = _Project.parce;
    var _ProjectMoreUsers   = {};

    if(typeof _Project.data.moreUsersData != "undefined")
    {
        _ProjectMoreUsers = _Project.data.moreUsersData;
    }

    var ParceUsersBlock = await ParcingPage.ParceUsersBlock(_Project.data, _ProjectMoreUsers);

    if(_Project.data.organization != 3)
    {
        _ProjectParce = 
        {
            "pr": await ParcingPage.ParceProject(_Project.data.inn),
            "ar": await ParcingPage.ParcingArbitrage(_Project.data.inn),
            "ispo": null,
            "fiz": ParceUsersBlock,
        };

        if(_Project.data.organization == 1)
        {
            _ProjectParce.ispo = await _AllParce._ParceProjectIspo(_Project.data);
        };
    } else {
        _ProjectParce =
        {
            "fiz": ParceUsersBlock,
        };
    };

    await Project.findOneAndUpdate({_id: data}, {parce: _ProjectParce});

    h.alertAdmin({
        type: "creating_project",
        text: `В проекте номер ${data} перепарсинг прошел успешно!`,
        projectId: _Project._id,
    });
}

async function savePuppeter(putProject)
{
    var _urlImgProject = `${h.getURL()}html/project/cover/?id=${putProject}`;
    console.log(_urlImgProject);
    const browser = await puppeteer.launch({
        defaultViewport: {width: 1920, height: 1080},
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    const page = await browser.newPage();
    await page.goto(_urlImgProject); 
    await page.emulateMedia('screen');
    const element = await page.$('.cover_block');   
    await element.screenshot({path: `../projects/${putProject}/logo.png`});
    await browser.close();

    return true;
}

async function getUser(socket,data,callback) 
{
    var _user = await User.findOne({_id: data});
    if(_user)
    {
        await User.findOneAndUpdate({_id: data}, {type: "business"});
    }
    callback(_user);
}

async function getProject(socket,data,callback) 
{
    var _project    = await Project.findOne({_id: data});
    callback(_project);
}

async function getProjectNew(socket, data, callback)
{
    var _project        = await Project.findOne({_id: data});
    var acceptInvsPush  = await InvDoc.find({projectId: _project._id, status: "accept"})
    var all_data = {
        project: _project,
        moreGetData: {
            acceptInvs: acceptInvsPush,
            paysAcceptInvs: 0,
            paysInvesters: 0,
            commissionForPtoject: 0,
            invsPush: [],
        },
    };

    all_data.moreGetData.acceptInvs.forEach(acceptInv => {
        acceptInv.pays.forEach(payElement => {
            if(payElement.status == "accept")
            {
                all_data.moreGetData.paysAcceptInvs = all_data.moreGetData.paysAcceptInvs + Number(payElement.pay.toString().replace(/\s/g, ''));
            };
        });
    });

    all_data.moreGetData.acceptInvs.forEach(acceptInv => {
        all_data.moreGetData.paysInvesters = all_data.moreGetData.paysInvesters + Number(acceptInv.data.pay.toString().replace(/\s/g, ''));
    });

    for(var aceptInv of acceptInvsPush)
    {
        var _dataBlock = 
        {
            invester: await User.findOne({user: aceptInv.invester}),
            inv: aceptInv,
        };

        var summOfPush = 0;

        aceptInv.pays.forEach((pushSumm, init) => {
            if(pushSumm.status == "wait")
            {
                all_data.moreGetData.commissionForPtoject = all_data.moreGetData.commissionForPtoject + Number(pushSumm.pay);

                if(init == aceptInv.pays.length - 1)
                {
                    all_data.moreGetData.commissionForPtoject = all_data.moreGetData.commissionForPtoject + Number(aceptInv.data.pay.toString().replace(/\s/g, ''));
                }
            };
        });

        all_data.moreGetData.invsPush.push(_dataBlock);
    };

    callback(all_data);
}

async function getActive(socket,data,callback) {
    var _projects   = await Project.find({type: "active"});
    callback(_projects);
}

async function getModerations(socket,data,callback) {
    var _projects   = await Project.find({ $or: [{type: "moderation"}, {type: "correction"}]});
    callback(_projects);
}

async function getСorrection(socket,data,callback) {
    var _projects   = await Project.find({type: "correction"});
    callback(_projects);
}