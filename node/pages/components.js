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


module.exports = {
    init:function(initPlagins)
    {
        privateInit(initPlagins);
    },
    components_page: function(socket,data,callback) {
        privat_index_page(socket,data,callback);
    },
}


function privateInit(initPlagins) {
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


    //  funs
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
    "getAddr": getAddr,
    "alertProject": alertProject,
    "invester_status_projects": invester_status_projects,
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
}

async function redactingLineSettingsPage(socket,data,callback)
{
    var _project = await Project.findOne({_id: data.projectId});
    var needData = _project.data;
    needData[data.lineId] = data.data;
    await Project.findOneAndUpdate({_id: data.projectId}, {data: needData});
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
    var _project = await Project.findOne({_id: data});

    if(!_project.parce.fiz)
    {
        var _token = _project.parce.token;
        var _getR_F = await R_F.findOne({_id: _token});
        var _data = JSON.parse(_getR_F.data).response.task;
       
        var config = {
            method: 'get',
            url: `https://api-ip.fssp.gov.ru/api/v1.0/result?token=er77gLcQvTO5&task=${_data}`,
            headers: { }
        };
        
        axios(config)
        .then(async function (response) {
            var _dataLast   = JSON.stringify(response.data);
            var _last       = JSON.parse(_dataLast.toString()).response.result

            if(_last.length > 0)
            {
                var _fiz = _project.parce;
                _fiz.fiz = _last;

                await Project.findOneAndUpdate({_id: data}, {parce: _fiz});
                await R_F.remove({_id: _token});

                callback("ok");
            } else {
                callback("error");
            }
        })
        .catch(function (error) {
            console.log(error);
        });
    } else {
        callback("ok");
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
    let options = 
    {
        mode: 'text',
        scriptPath: '../python/parcingArbitraj',
        args: "5029069967",
    };

    await PythonShell.run('main.py', options, function (err, results) {
        if (err) throw err;

        console.log(JSON.parse(results));
        console.log(results);
    })
}

async function tg_alert_user_numbers(socket,data,callback)
{
    var _User       = await User.findOne({user: data.user});

    let options = 
    {
        mode: 'text',
        scriptPath: '../python/system_alerts_user',
        args: [_User.username, data.text]
    };

    console.log(options);

    await PythonShell.run('main.py', options, function (err, results) {
        if (err) throw err;
    })
}

async function tg_alert_user(socket,data,callback)
{
    let options = 
    {
        mode: 'text',
        scriptPath: '../python/system_alerts_user',
        args: [data.user, data.text]
    };

    await PythonShell.run('main.py', options, function (err, results) {
        if (err) throw err;
    })
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
    var _Inestings = await InvDoc.find({});
    callback(_Inestings);
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

    callback({
        invester: _User,
        InvDoc: _InvDoc,
        project: _Project,
    });
}

async function acceptInvestor(socket,data,callback) 
{
    var _Project        = await Project.findOne({_id: data.projectId});
    var _InvDoc         = await InvDoc.findOne({invester: data.id, projectId: data.projectId});
    var _User           = await User.findOne({user: _Project.user});
    var moneyPay        = _InvDoc.data.pay;
    var mouncePay       = _Project.data.date;
    var payments        = 
    {
        "Ежедневно": 1,
        "Ежемесячно": 30,
        "Ежеквартально": 90,
        "Ежегодно": 360,
    };
    var date_payments   = payments[_Project.data.date_payments];
    var _rate           = (_Project.data.rate / 12 / 30) * date_payments;
    var manyPays        = (mouncePay * 30) / date_payments;
    var needPayment     = moneyPay * (_rate / 100);

    var pays = [];
    
    for(var i = 0; i < manyPays; i++)
    {
        var needDate = new Date(new Date().getTime() + (date_payments * (i + 1) * 86400000)).getTime();

        pays.push({
            pay: needPayment,
            date: needDate,
            receipt: null,
            status: "wait",
        });
    }

    h.full_alert_user(data.id, `Ваша инвестиция была подтверждена! Номер проекта ${_Project._id}`, "acceptInvestor");

    var _InvDocNeed = await InvDoc.findOneAndUpdate({invester: data.id, projectId: data.projectId}, {status: "accept", pays: pays, date: new Date().getTime()});

    if(_User.member)
    {
        await Payments.create({
            user: _User.member,
            type: "investing",
            pay: _InvDoc.data.pay,
            status: "wait",
            data: {
                _id: _InvDoc.invester
            },
        })
    }

    if(_User.member_b)
    {
        await Payments.create({
            user: _User.member_b,
            type: "business",
            pay: _InvDoc.data.pay,
            status: "wait",
            data: {
                _id: _Project._id
            },
        })
    }

    callback(_InvDocNeed);
}

async function getUserForId(socket,data,callback) {
    var _User = await User.findOne({_id: data});
    callback(_User);
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
        if(element.receipt) {
            if(element.status == "wait") {
                trueInvs.push(element);
            }
        }
    });

    callback(trueInvs);
   
}

async function getInvestorsProject(socket,data,callback) {
    var _InvDoc = await InvDoc.find({projectId: data});
    callback(_InvDoc);
}

async function invester_status_projects(socket,data,callback)
{
    var _User = await User.findOne({_id: data._id});
    var _InvDoc = await InvDoc.find({invester: _User.user});
    callback(_InvDoc)
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
        type: "correct_signature",
        text: "Юр данные проекта были добавлены!",
        projectId: _project._id,
    })
    

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
    var need_string = `"♦️ Проект исправлен №${_project._id} Название: ${_project.data.name} Сумма: ${_project.data.attraction_amount} Cтавка: ${_project.data.rate} Необходимо промодерировать"`;
    console.log(need_string);
    await exec(`python "../python/app.py" ${need_string}`);
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

    h.full_alert_user(_project.user, `К проекту номер ${_project._id} запрошенны дополнительные документы`, `correction_signature`);

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

    var _urlImgProject = `${h.getURL()}html/project/cover/?id=${data}`;
    console.log(_urlImgProject);
    const browser = await puppeteer.launch({
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    const page = await browser.newPage();
    await page.setViewport({
        width: 1920,
        height: 1080,
    });      
    await page.goto(_urlImgProject);
    await page.emulateMedia('screen');
    const element = await page.$('.cover_block');   
    const bounding_box = await element.boundingBox();
    console.log(bounding_box);
    await element.screenshot({
        path: `../projects/${data}/logo_instagram.jpg`,
        clip: {
            x: bounding_box.x,
            y: bounding_box.y,
            width: 1024,
            height: 1024,
        },
    });
    await browser.close();

    var videoPresentationPath = `${h.getURL()}/projects/${_project._id}/${_project.data["file+8"]}`;
    if(_project.YT_VIDEO)
    {
        var yt_data = JSON.parse(_project.YT_VIDEO[3]);
        videoPresentationPath = `https://www.youtube.com/watch?v=${yt_data.id}`;
    }

    var html = `[Профиль компании](${h.getURL()}html/project/profil/#${_project._id})\n[Презентация](${h.getURL()}/projects/${_project._id}/${_project.data["file+7"]})\n[Видео презентация](${videoPresentationPath})`;
    
    const stream = fs.createReadStream(`../projects/${data}/logo.png`);

    bot.sendPhoto(-1001205415519, stream, {
        "caption": html,
        "parse_mode": "MarkdownV2",
        "reply_markup": {
            "inline_keyboard": [
                [
                    {
                        text: "Рекомендовать",
                        url: `https://t.me/invester_official_bot?start=member_${data}`,
                    }
                ],
                [
                    {
                        text: "Инвестровать",
                        url: `https://t.me/invester_official_bot?start=project_${data}`,
                    }
                ]
            ],
        }
    });

    const client = new Instagram({ username: "investER_official", password: "e<<@H&_ArB~5ef7" });


    ;(async () => 
    {
        // URL or path of photo
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

    await Project.findOneAndUpdate({_id: data}, {type: "active"});
}


var _AllParce = 
{
    "parceProject": async function(inn)
    {
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
            var query          = _data.region;
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
    "_ParceProjectIspo": function (_data) {
        return new Promise((resolve,reject) =>
        {
            var fio             = _data.initials.split(' ');
            var query          = _data.region;
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
                    url: `https://api-ip.fssp.gov.ru/api/v1.0/search/legall?token=er77gLcQvTO5&firstname=${encodeURI(first_name)}&secondname=${encodeURI(second_name)}&lastname=${encodeURI(last_name)}&birthdate=${birth_date}&region=${_dataFirst}`,
                    headers: { }
                };    
                
                axios(config)
                .then(function (response) {
                    resolve(JSON.stringify(response.data));
                })
                .catch(function (error) {
                    console.log(error);
                });
            });
        });
    },
    "_ParcingArbitraj": async function(inn)
    {
        return null;  
        // let options = 
        // {
        //     mode: 'text',
        //     scriptPath: '../python/parcingArbitraj',
        //     args: inn,
        // };

        // return new Promise((resolve,reject) => {
        //     try {
        //         PythonShell.run('main.py', options, function (err, results) {
        //             if (err) throw err;
        //             resolve(JSON.parse(results));  
        //         });
        //     }
        //     catch{
        //         reject();  
        //     }
        // })
    },
    "uploadVideo": async function(_patch, _projectPath, name, target)
    {
        let options = 
        {
            mode: 'text',
            scriptPath: '../python/YouTube_Upload',
            args: [_patch + '/' + _projectPath, name, target],
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
    var _patch          = `/var/www/projects/${_project._id}`;
    var YT_VIDEO        = await _AllParce.uploadVideo(_patch, _project.data["file+8"], data.name, data.description);
    await Project.findOneAndUpdate({_id: _project._id}, {YT_VIDEO: YT_VIDEO});
    callback('ok');
}

async function cheackInnCreator(socket,data,callback)
{
    var _ParceProject       = await _AllParce.parceProject(data.data.inn);
    if(_ParceProject == 'error') { callback('error'); return; };
    callback('ok');
}

async function setProject(socket,data,callback) 
{
    var _User           = await User.findOne({user: data.user});
    var user_path       = `../users/${_User.user}`;
    var _DataProject    = 
    {
        user: data.user,
        type: "moderation",
        data: data.data,
        parce: null,
        redacting: null,
        signature: null,
        signature_document: null,
    };

    if(data.data.organization != 3)
    {
        console.log("Not FIZ");

        var _ParceProject       = await _AllParce.parceProject(data.data.inn);
        if(_ParceProject == 'error') { callback('error'); return; };
        var _ParceProjectAr     = await _AllParce._ParcingArbitraj(data.data.inn);
        // var _ParceProjectIspo   = await _AllParce._ParceProjectIspo(data.data);
        _DataProject.parce      = {
            "pr": _ParceProject,
            "ar": _ParceProjectAr,
            // "ispo": _ParceProjectIspo,
        };
    } else {
        console.log("FIZ");

        var _ParceProject       = await _AllParce.parceProjectFiz(data.data);
        _DataProject.parce      = {
            "fiz": null,
            "token": _ParceProject,
        };
    }

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


    // h.alertAdmin({
    //     type: "creating_project",
    //     text: "Новый проект подан на модерацию",
    //     projectId: _Project._id,
    // })

    callback({status: "ok"});    
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

async function getUser(socket,data,callback) {
    var _user = await User.findOne({_id: data});
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