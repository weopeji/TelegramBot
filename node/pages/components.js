var request                 = require("request");
var puppeteer               = require('puppeteer');
var fetch                   = require("node-fetch");
var { spawn, exec }         = require('child_process');
var _app                    = require("../app");
var {PythonShell}           = require('python-shell');
var axios                   = require('axios');
var ParcingPage             = require('./parcing');
var { DateTime, Interval }  = require("luxon");
var ffmpeg                  = require('ffmpeg');
var PDFMerger               = require('pdf-merger-js');
var uuidv4                  = require("uuid/v4");
var nodemailer              = require('nodemailer');
var FormData                = require('form-data');
var merger                  = new PDFMerger();

var Project                 = null;
var User                    = null;
var fs                      = null;
var wrench                  = null;
var path                    = null;
var bot                     = null;

module.exports = {
    init:function(initPlagins)
    {
        privateInit(initPlagins);
    },
    components_page: function(socket,data,callback) {
        privat_index_page(socket,data,callback);
    },
};

function privateInit(initPlagins)
{
    Project         = initPlagins.Project;
    User            = initPlagins.User;
    fs              = initPlagins.fs;
    wrench          = initPlagins.wrench;
    path            = initPlagins.path;
    bot             = initPlagins.bot;
    h               = initPlagins.helper_functions;
    InvDoc          = initPlagins.InvDoc;
    MsgDB           = initPlagins.MsgDB;
    config          = initPlagins.config;
    PaysAttract     = initPlagins.PaysAttract;
    bPays           = initPlagins.bPays;
    Payments        = initPlagins.Payments;
    bPaysAccept     = initPlagins.bPaysAccept;
    R_F             = initPlagins.R_F;
    project_key     = initPlagins.project_key;
    commission      = initPlagins.commission;
    authToken       = initPlagins.authToken;
    teletube_video  = initPlagins.teletube_video;
    io              = initPlagins.io;
    requestPay      = initPlagins.requestPay;
    MsgHelp         = initPlagins.MsgHelp;
};

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
};

var action_linker = 
{
    //version2
    "version2_activ_projects_business_setPay": version2_activ_projects_business_setPay,
    "version2_investerData_invdoc_notMoney": version2_investerData_invdoc_notMoney,
    "version2_notFullPay_data": version2_notFullPay_data,
    "version2_notFullPay_relocation_data": version2_notFullPay_relocation_data,
    "version2_wait_projects_WaitNotFullInvs": version2_wait_projects_WaitNotFullInvs,
    "version2_acceptPays_notFullPay_business": version2_acceptPays_notFullPay_business,
    "version2_activ_projects_accept_notFullPayNull_inv": version2_activ_projects_accept_notFullPayNull_inv,
    "vesrion2_set_last_socket": vesrion2_set_last_socket,
    "version2_put_file_alertofOfCloseCheack": version2_put_file_alertofOfCloseCheack,
    "version2_setUserAlertsOfacceptGetDataOfUser": version2_setUserAlertsOfacceptGetDataOfUser,
    "version2_getInvDocByRedactingId": version2_getInvDocByRedactingId,
    "version2_investerData_invdoc_notMoney_redacting": version2_investerData_invdoc_notMoney_redacting,
    "version2_acceptInvOfComplaintBusinnes": version2_acceptInvOfComplaintBusinnes,
    "version2_activ_projects_pageRender": version2_activ_projects_pageRender,
    "version2_userSetDefault": version2_userSetDefault,
    "version2_Attracted_pay": version2_Attracted_pay,
    "version2_acceptEmail": version2_acceptEmail,
    "version2_renderAllPaymentsRequest": version2_renderAllPaymentsRequest,
    "version2_owner_getChatsOfId": version2_owner_getChatsOfId,
    "version2_owner_msgUP": version2_owner_msgUP,

    // teletube
    "teletube_add": teletube_add,
    "teletube_get": teletube_get,
    
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
    "telegram_recomendation_cabinet": telegram_recomendation_cabinet,

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
    "getUserByProjectOfId": getUserByProjectOfId,
    "allUsersGetOne": allUsersGetOne,
    "waitInvestingsData": waitInvestingsData,
    "allUserGetOneSetting": allUserGetOneSetting,
    "obligations_accept_commission_put": obligations_accept_commission_put,
    "business_addpayment_for_inv": business_addpayment_for_inv,
    "payments_new_get": payments_new_get,
    "alertForBusinesOfInvester": alertForBusinesOfInvester,
    "not_correct": not_correct,
    "not_correct_complaint": not_correct_complaint,
    "not_correct_complaint_again": not_correct_complaint_again,
    "getComplaint": getComplaint,
    "removeInvOfComplaintAdministrator": removeInvOfComplaintAdministrator,
    "acceptInvOfComplaintAdministrator": acceptInvOfComplaintAdministrator,
    "requestInvestingOfRemove": requestInvestingOfRemove,
    "requestInvestingOfRemoveCLOSE": requestInvestingOfRemoveCLOSE,
    "setNewTypeProject": setNewTypeProject,
    "requestLastMoneyInProject": requestLastMoneyInProject,
    "setInvesterDataProjectForInvesterPageGetIdNullMoney": setInvesterDataProjectForInvesterPageGetIdNullMoney,
    "setNewTypeProjectNumberMore": setNewTypeProjectNumberMore,
    "getProjectForInvesterPageAllInvs": getProjectForInvesterPageAllInvs,
    "getProjectForInvesterPageByIdInvDoc": getProjectForInvesterPageByIdInvDoc,
    "accept_confirmationData": accept_confirmationData,
};

async function version2_owner_msgUP(socket,data,callback)
{
    var _User       = await User.findOne({_id: data.user});
    var _MsgHelp    = await MsgHelp.findOne({user: _User.user});
    var _array      = [];

    if(!_MsgHelp)
    {
        _MsgHelp = await MsgHelp.create(
        {
            user: _User.user,
            msgs: [],
        });
    } 
    else
    {
        _array = _MsgHelp.msgs;
    };

    var dataMail = {
        text: data.msg,
        type: "user",
        time: new Date().getTime().toString(),
    }

    _array.push(dataMail);

    callback(await MsgHelp.findOneAndUpdate({_id: _MsgHelp._id,},{msgs: _array}));
};

async function version2_owner_getChatsOfId(socket, data, callback)
{
    var _User       = await User.findOne({_id: data.user});
    var _MsgHelp    = await MsgHelp.findOne({user: _User.user});
    var returnBlock = 
    {
        name: null,
        type: null,
        photo: null,
        msgs: null,
    };

    if(_MsgHelp)
    {
        returnBlock.msgs = _MsgHelp.msgs;
    };

    callback(returnBlock);
};

async function version2_renderAllPaymentsRequest(socket, data, callback)
{
    var _User       = await User.findOne({_id: data});
    var requestPays = await requestPay.find({user: _User.user});
    callback(requestPays);
}

async function version2_acceptEmail(socket, data, callback)
{
    console.log(data);

    var transporter             = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: "we.opeji@gmail.com",
            pass: "3107Ab3107",
        },
    });

    var result = await transporter.sendMail({
        from: '"Node js" <nodejs@example.com>',
        to: data.email,
        subject: 'Message from Node js',
        text: `https://investir.one/?user=${data.user}&page=get_money_abstraction&accept=true`,
        html: `https://investir.one/?user=${data.user}&page=get_money_abstraction&accept=true`,
    });

    console.log(result);

    callback();
};

async function version2_Attracted_pay(socket, data, callback)
{
    if(data.type == "ur")
    {      
        var _User       = await User.findOne({_id: data.user});
        var allPaysUser = await Payments.find({user: _User.user});
        var dataFiles   = new FormData();
        var getsData    = data.data;

        var CreateDocument = await axios({
            method: 'post',
            url: `https://www.api.demo.lightdoc.io/v1/documents`,
            headers: {
                'accept': '*/*',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + config.edo_token,
            },
            data: {
                "id": uuidv4(),
                "name": `Договор от ${new Date().toUTCString()}}`,
                "isSequential": false,
                "signers": [
                    {
                        "firstName": config.edo_data.first_name,
                        "lastName": config.edo_data.second_name,
                        "patronymic": config.edo_data.last_name,
                        "email": config.edo_data.email,
                        "approveType": "Bes"
                    },
                    {
                        "firstName": getsData.first_name,
                        "lastName": getsData.second_name,
                        "patronymic": getsData.last_name,
                        "email": data.email,
                        "approveType": "Bes"
                    },
                ],
            }
        });

        dataFiles.append('files', fs.createReadStream('/var/www/node/assets/videos/12.docx'));
        dataFiles.append('files', fs.createReadStream('/var/www/node/assets/videos/123.txt'));
        getsData.documentID = CreateDocument.data.documentID;

        var uploadFile = await axios({
            method: 'post',
            url: `https://www.api.demo.lightdoc.io/v1/documents/${CreateDocument.data.documentID}/files`,
            headers: {
                'accept': '*/*',
                'Content-Type': 'multipart/form-data',
                'Authorization': 'Bearer ' + config.edo_token,
                ...dataFiles.getHeaders()
            },
            data: dataFiles
        });

        while(true)
        {
            try {
                var signedDocument = await axios({
                    method: 'post',
                    url: `https://www.api.demo.lightdoc.io/v1/documents/${CreateDocument.data.documentID}/action?action=Send`,
                    headers: {
                        'accept': '*/*',
                        'Content-Type': 'multipart/form-data',
                        'Authorization': 'Bearer ' + config.edo_token,
                    },
                    data: '',
                });

                break;
            } catch(e) {};
        }

        await requestPay.create({
            user: _User.user,
            date: new Date().getTime().toString(),
            type: data.type,
            email: data.email,
            data: getsData,
            pays: allPaysUser,
        });

        await Payments.find({user: _User.user}).remove();
    };

    callback();
};

async function version2_userSetDefault(socket, data, callback)
{
    try {
        if(data.page == "chats")
        {
            await User.findOneAndUpdate({_id: data.id}, {socket: socket.id});
        }
        else
        {
            await User.findOneAndUpdate({_id: data.id}, {$unset: { socket: "" }});
        }
    } catch (e) {
        console.log(e);
    };
}

async function version2_activ_projects_pageRender(socket, data, callback)
{
    try {
        var _User               = await User.findOne({_id: data});
        var _AlertsByUser       = _User.alerts_main;
        var newAlertsArray1     = _AlertsByUser.filter(function(f) { return f.type !== 'pay_of_invNotFullPay_acceptBusiness' });
        var newAlertsArray      = newAlertsArray1.filter(function(f) { return f.type !== 'accept_business_investring' });

        await User.findOneAndUpdate({_id: _User._id}, {alerts_main: newAlertsArray});
    } catch (e) {}

    callback();
}
 
async function version2_acceptInvOfComplaintBusinnes(socket, data, callback)
{
    try {
        var _InvDoc = await InvDoc.findOneAndUpdate({_id: data}, {
            status: "accept",
            applicationRequest: false,
        });

        var _Project = await Project.findOne({_id: _InvDoc.projectId});

        h.full_alert_user(_InvDoc.invester, `Бизнес принял инвестицию`, "pushMoneyOfInvesting", _InvDoc._id);
        h.full_alert_user(_Project.user, `Вы приняли инвестицию`, "pushMoneyOfInvesting", _InvDoc._id);
    } catch (e) {}

    callback();
}

async function version2_getInvDocByRedactingId(socket, data, callback)
{
    try {
        var _InvDoc = await InvDoc.findOne({_id: data});
        callback(_InvDoc);
    } catch (e) {
        callback("error");
    };
}

async function version2_setUserAlertsOfacceptGetDataOfUser(socket, data, callback)
{
    try {
        await User.findOneAndUpdate({_id: data}, {acceptGetDataOfUser: true});
    }
    catch(e) {};

    callback();
}

async function version2_put_file_alertofOfCloseCheack(socket, data, callback)
{
    try {
        var _InvDoc     = await InvDoc.findOne({_id: data});
        var _Project    = await Project.findOne({_id: _InvDoc.projectId});

        await h.full_alert_user(_Project.user, `Инвестор прикрепил чек за инвестицию, проверьте и подтвердите оплату у себя в личном кабинете`, "pay_of_invNotFullPay_business");
        // await h.alertDeleteOfUserOnbot("Вы успешно прекрипили чек за инвестицию, ожидайте подтверждения от бизнеса!", _InvDoc.invester);
    }

    catch (e) {};

    callback();
}

async function vesrion2_set_last_socket(socket, data, callback)
{
    try {
        await User.findOneAndUpdate({_id: data.userId}, {socket: data.socket});
    } 
    catch (e) {};

    callback();
}

async function version2_activ_projects_accept_notFullPayNull_inv(socket, data, callback)
{
    try {
        var _InvDoc         = await InvDoc.findOneAndUpdate({_id: data}, {applicationRequest: false});
        var _Project        = await Project.findOne({_id: _InvDoc.projectId});
        var _UserInv        = await User.findOne({user: _InvDoc.invester});
        var _UserProject    = await User.findOne({user: _Project.user});

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
    
            h.full_alert_user(_UserInv.member, `Вам поступил бонус за инвестора в размере ${Number(_InvDoc.data.pay) * Number(Number(_Project.payersData.commission) / 100) * Number(Number(_Project.payersData.investors_commission) / 100)}`, "payment_member");
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
    
                    h.full_alert_user(_UserProject.member_b, `Вам поступил бонус за бизнес в размере ${Number(_InvDoc.data.pay) * Number(Number(_Project.payersData.commission) / 100) * Number(Number(_Project.payersData.business_commission) / 100)}`, "payment_member");
                };
            } 
            else
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

                h.full_alert_user(_UserProject.member_b, `Вам поступил бонус за бизнес в размере ${Number(_InvDoc.data.pay) * Number(Number(_Project.payersData.commission) / 100) * Number(Number(_Project.payersData.business_commission) / 100)}`, "payment_member");
            }
        };

        await h.full_alert_user(_InvDoc.invester, `Бизнес подтвердил вашу инвестицию`, "pay_of_invNotFullPay_acceptBusiness", _InvDoc._id);
    } 
    catch(e) {}

    callback();
}

async function version2_acceptPays_notFullPay_business(socket, data, callback)
{
    try {
        var _User       = await User.findOne({_id: data});
        var _Projects   = await Project.find({user: _User.user});
        var AllInvs     = [];

        for(var _Project of _Projects) 
        {
            var AllProjectInvs          = await InvDoc.find({projectId: _Project._id, applicationRequest: true, status: "accept"});
            var ActionAllProjectInvs    = [];

            AllProjectInvs.forEach((element) => {
                if(typeof element.data.pts_2 != "undefined") {
                    ActionAllProjectInvs.push(element);
                }
            });

            ActionAllProjectInvs.forEach((element) => {
                AllInvs.push({
                    project: _Project,
                    inv: element,
                });
            });
        }

        callback(AllInvs);
    }
    catch(e) {
        callback("error");
    }
}

async function version2_wait_projects_WaitNotFullInvs(socket, data, callback)
{
    try {
        var _User           = await User.findOne({_id: data});
        var _InvsByWait     = await InvDoc.find({invester: _User.user, applicationRequest: true, status: "accept"});
        var ActionData      = [];

        for(var element of _InvsByWait)
        {
            var ActionInit      = 0;
            var _Project        = await Project.findOne({_id: element.projectId});
            var _AllInvsByUser  = await InvDoc.find({projectId: _Project._id});

            _AllInvsByUser.forEach((element2, i2) => {
                if(element2._id.toString() == element._id.toString()) {
                    ActionInit = i2 + 1;
                };
            });

            if( typeof element.data.pts_2 == "undefined")
            {
                ActionData.push({
                    ActionInit: ActionInit,
                    Project: _Project,
                    Inv: element,
                });
            }
        }

        callback(ActionData);
    } 
    catch(e) {
        callback("error");
    }
}

async function version2_notFullPay_relocation_data(socket, data, callback)
{
    try {
        for(var InvDocId of data) {
            var _InvDoc = await InvDoc.findOneAndUpdate({_id: InvDocId}, {applicationRequest: true});
            await h.full_alert_user(_InvDoc.invester, `Бизнес проект запросил оплату по вашей заявке, ее нужно произвести в течении 3х рабочих дней, в противном случае ваша завка будет анулирована и аккаунт будет заблокирован`, "pay_of_invNotFullPay", _InvDoc._id);
        };
    } catch(e) {};

    callback();
}

async function version2_notFullPay_data(socket, data, callback)
{
    try {
        var _Project    = await Project.findOne({_id: data});
        var _InvDocs    = await InvDoc.find({projectId: _Project._id});

        callback({
            project: _Project,
            invs: _InvDocs,
        });
    }
    catch(e) {
        callback("error");
    };
}

async function version2_investerData_invdoc_notMoney(socket, data, callback)
{
    try {
        var _User               = await User.findOne({_id: data.user});
        var _Project            = await Project.findOne({_id: _User.putProject});
        var _arrayData          = data.inv;
        _arrayData.pay          = data.money;
        var html                = "https://investir.one/" + data.url;

        var invCreate   = await InvDoc.create({
            projectId: _User.putProject,
            invester: _User.user,
            status: "accept",
            data: _arrayData,
            receipt: null,
            pays: [],
            date: new Date().getTime().toString(),
            date_append: new Date().getTime().toString(),
            urlToLastDocument: null,
        });

        var pathToLastDocument      = `documentLast_${new Date().getTime()}_${invCreate._id}.pdf`;
        var projectIdUrlDocument    = `/var/www/projects/${_Project._id}/application_number_2_document_${invCreate._id}.pdf`;
        var defaultProjectPdfDoc    = `/var/www/projects/${_Project._id}/file_signature_document.pdf`;

        const browser = await puppeteer.launch({
            args: ['--no-sandbox', '--disable-setuid-sandbox'],
        });
        const page = await browser.newPage();
        await page.goto(html);
        await page.emulateMedia('screen');
        await page.pdf({path: projectIdUrlDocument});
        await browser.close();

        await merger.add(defaultProjectPdfDoc);
        await merger.add(projectIdUrlDocument); 
        await merger.save(`/var/www/projects/${_Project._id}/` + pathToLastDocument);
    
        await InvDoc.findOneAndUpdate({_id: invCreate._id}, {urlToLastDocument: pathToLastDocument});

        await h.alertDeleteOfUserOnbot(`${_User.first_name} Вы успешно оставили заявку в проекте\n ${_Project._id}\n "${_Project.data.name}"\n на сумму ${data.money} руб.\n по договору от ${DateTime.fromMillis(Number(new Date().getTime().toString())).toFormat('dd.MM.yyyy')}`, _User.user);

        await h.alertAdmin({
            type: "notFullPayMoneyPush",
            text: `Поступила заявка на сумму ${data.money} руб.`,
            projectId: _Project._id,
        });
    } catch(e) {
        console.log(e);
    };

    callback();
}

async function version2_investerData_invdoc_notMoney_redacting(socket, data, callback) {
    try {
        var _User                   = await User.findOne({_id: data.user});
        var _InvDoc                 = await InvDoc.findOne({_id: data.invId});
        var _Project                = await Project.findOne({_id: _User.putProject});
        var _arrayData              = data.inv;

        _arrayData.pay              = data.money;
        _arrayData.pts_2            = _InvDoc.data.pts_2;
        
        var html                    = "https://investir.one/" + data.url;
        var invCreate               = await InvDoc.findOneAndUpdate({_id: data.invId}, {
            data: _arrayData,
            status: "accept",
            applicationRequest: true,
        });
        var pathToLastDocument      = `documentLast_${new Date().getTime()}_${invCreate._id}.pdf`;
        var projectIdUrlDocument    = `/var/www/projects/${_Project._id}/application_number_2_document_${invCreate._id}.pdf`;
        var defaultProjectPdfDoc    = `/var/www/projects/${_Project._id}/file_signature_document.pdf`;

        const browser = await puppeteer.launch({
            args: ['--no-sandbox', '--disable-setuid-sandbox'],
        });
        const page = await browser.newPage();
        await page.goto(html);
        await page.emulateMedia('screen');
        await page.pdf({path: projectIdUrlDocument});
        await browser.close();

        await merger.add(defaultProjectPdfDoc);
        await merger.add(projectIdUrlDocument); 
        await merger.save(`/var/www/projects/${_Project._id}/` + pathToLastDocument);
        await InvDoc.findOneAndUpdate({_id: invCreate._id}, {urlToLastDocument: pathToLastDocument});
        await h.alertDeleteOfUserOnbot(`${_User.first_name} Вы успешно отредактировали заявку в проекте\n ${_Project._id}\n "${_Project.data.name}"\n на сумму ${data.money} руб`, _User.user);
        await h.alertAdmin({
            type: "notFullPayMoneyPush",
            text: `Поступила заявка на сумму ${data.money} руб. После редактирования данных`,
            projectId: _Project._id,
        });
    } catch(e) {
        console.log(e);
    };

    callback();
}

async function version2_activ_projects_business_setPay(socket, data, callback)
{
    try {
        var _InvDoc     = await InvDoc.findOne({_id: data.id});
        var _InvDocPays = _InvDoc.pays;
        data.target.forEach((element) => {
            _InvDocPays[element].status = "accept";
        })
        await InvDoc.findOneAndUpdate({_id: data.id}, {pays: _InvDocPays});
    } catch(e) {}
    
    callback();
}

async function accept_confirmationData(socket, data, callback)
{
    callback(await InvDoc.findOneAndUpdate({_id: data}, {confirmationData: true}));
}

async function getProjectForInvesterPageByIdInvDoc(socket, data, callback)
{
    var _InvDoc     = await InvDoc.findOne({_id: data});
    var _Project    = await Project.findOne({_id: _InvDoc.projectId});

    callback(_Project);
}

async function getProjectForInvesterPageAllInvs(socket, data, callback)
{
    var _Project = await Project.findOne({_id: data});
    callback(await InvDoc.find({projectId: _Project._id}));
}

async function setNewTypeProjectNumberMore(socket, data, callback)
{
    callback(await Project.findOneAndUpdate({_id: data.id}, {requestInvestingMoney: data.data}));
}

async function setInvesterDataProjectForInvesterPageGetIdNullMoney(socket, data, callback)
{
    var _User = await User.findOne({_id: data.idUser});
    var _arrayData  = _User.investor_data.inv;
    var _dateNeed   = data.date;
    _arrayData.pay  = data.money;

    if(!_dateNeed || _dateNeed == "null")
    {
        _dateNeed = new Date().getTime();
    };

    var invCreate = await InvDoc.create({
        projectId: _User.putProject,
        invester: _User.user,
        status: "accept",
        data: _arrayData,
        receipt: null,
        pays: null,
        date: _dateNeed,
        date_append: new Date().getTime().toString(),
    });

    callback(invCreate._id);
}

async function requestLastMoneyInProject(socket, data, callback)
{
    var AllInvsofProject    = await InvDoc.find({projectId: data, status: "accept"});
    var _Project            = await Project.findOneAndUpdate({_id: data}, {closeMoney: true});

    for(var InvsofProject of AllInvsofProject)
    {
        h.full_alert_user(InvsofProject.invester, `Проект ${_Project._id} "${_Project.data.name}" завершил сбор заявок, вам нужно оплатить последнюю сумму в размере ${100 - Number(_Project.notFullpay)}% от общей суммы`, "pushMoneyOfInvesting", InvsofProject._id);
    };

    callback();
}

async function setNewTypeProject(socket, data, callback)
{
    callback(await Project.findOneAndUpdate({_id: data.id}, {notFullpay: data.data}));
};

async function requestInvestingOfRemoveCLOSE(socket, data, callback)
{
    callback(await InvDoc.findOneAndUpdate({_id: data}, {$unset: {request_remove: 1}}));
};

async function requestInvestingOfRemove(socket, data, callback)
{
    callback(await InvDoc.findOneAndUpdate({_id: data}, {request_remove: true}));
};

async function acceptInvOfComplaintAdministrator(socket, data, callback)
{
    var _InvDoc     = await InvDoc.findOne({_id: data});
    var _Project    = await Project.findOne({_id: _InvDoc.projectId});

    if(typeof _Project.notFullpay != "undefined")
    {
        if(Number(_Project.notFullpay) == 0)
        {
            await InvDoc.findOneAndUpdate({_id: data}, {applicationRequest: false, status: "accept"});
            h.full_alert_user(_Project.user, `Администрация по жалобе за инвестицию приняла решение в пользу инвестора`, "acceptInvOfComplaintAdministrator", _InvDoc._id);
            h.full_alert_user(_InvDoc.invester, `Администрация по жалобе за инвестицию приняла решение в вашу пользу`, "acceptInvOfComplaintAdministrator", _InvDoc._id);
        };

        callback();
    } 
    else
    {
        var _InvDoc     = await InvDoc.findOneAndUpdate({_id: data}, {$unset: {not_correct_complaint: 1, not_correct_complaint: 1}});
    
        await acceptInvestor(socket, _InvDoc._id, function() {
    
            h.full_alert_user(_Project.user, `Администрация по жалобе за инвестицию приняла решение в пользу инвестора`, "acceptInvOfComplaintAdministrator");
    
            callback();
        });
    }
}

async function removeInvOfComplaintAdministrator(socket, data, callback)
{
    var _InvDoc     = await InvDoc.findOneAndUpdate({_id: data}, {not_correct_complaint: false, status: "remove"});
    var _Project    = await Project.findOne({_id: _InvDoc.projectId});
 
    h.full_alert_user(_Project.user, `Администрация по жалобе за инвестицию приняла решение в вашу пользу`, "acceptInvOfComplaintAdministrator", _InvDoc._id);
    h.full_alert_user(_InvDoc.invester, `Вы получили отказ по жалобе за инвестицию, проинвестируйте еще раз`, "acceptInvOfComplaintAdministrator", _InvDoc._id);
    callback();
};

async function getComplaint(socket, data, callback)
{
    var _InvDocs    = await InvDoc.find({not_correct_complaint: true});
    var allData     = [];

    for(_InvDoc of _InvDocs)
    {
        allData.push({
            Project: await Project.findOne({_id: _InvDoc.projectId}),
            Inv: _InvDoc,
        });
    };

    callback(allData);
}

async function not_correct_complaint_again(socket, data, callback)
{
    var _InvDoc = await InvDoc.findOne({_id: data});
    await User.findOneAndUpdate({user: _InvDoc.invester}, {putProject: _InvDoc.projectId});
    callback(_InvDoc._id);    
}

async function not_correct_complaint(socket, data, callback)
{
    var _InvDoc = await InvDoc.findOneAndUpdate({_id: data}, {not_correct_complaint: true});
    var _Project = await Project.findOne({_id: _InvDoc.projectId});
    h.full_alert_user(_Project.user, `По поданной инвестиции поступила жалоба, ожидайте решения администрации`, "not_correct_complaint");
    h.alertAdmin({
        type: "not_correct_complaint",
        text: `В проекте ${_Project._id} "${_Project.data.name}" инвестор подал жалобу за отказ бизнеса, примите решение`,
        projectId: _Project._id,
    });
    callback();
}

async function not_correct(socket, data, callback)
{
    var _User               = await User.findOne({_id: data});
    var allNotCorrectInvs   = await InvDoc.find({status: "not_correct", invester: _User.user});
    var allData             = [];
    var _AlertsByUser       = _User.alerts_main;
    var newAlertsArray      = _AlertsByUser.filter(function(f) { return f.type !== 'removePayInvestor' });

    for(var allNotCorrectInv of allNotCorrectInvs)
    {
        allData.push({
            Project: await Project.findOne({_id: allNotCorrectInv.projectId}),
            Inv: allNotCorrectInv,
        });
    };

    await User.findOneAndUpdate({_id: _User._id}, {alerts_main: newAlertsArray});

    callback(allData);
}

async function telegram_recomendation_cabinet(socket, data, callback)
{
    var _User = await User.findOne({_id: data.userId});

    await _app.defaultShow({
        from: {id: _User.user},
        chat: {id: _User.user},
    });

    callback();
}

async function alertForBusinesOfInvester(socket, data, callback)
{
    var _InvDoc     = await InvDoc.findOne({_id: data});
    var _Project    = await Project.findOne({_id: _InvDoc.projectId});
    var _UserAlert  = await User.findOne({user: _Project.user});

    await InvDoc.findOneAndUpdate({_id: data}, {date_alert: new Date().getTime().toString()});

    h.full_alert_user(_UserAlert.user, `Инвестер в проекте номер ${_Project._id} "${_Project.data.name}" напоминает вам об оплате долга за инвестицию`, "allert_of_invester", _InvDoc._id);

    callback();
}

async function business_addpayment_for_inv(socket, data, callback)
{
    var _InvDoc     = await InvDoc.findOne({_id: data.id});
    var allPayments = _InvDoc.pays;

    allPayments.push({
        pay: data.pay,
        date: new Date().getTime(),
        status: "accept",
    });

    var _invDoc     = await InvDoc.findOneAndUpdate({_id: data.id}, {pays: allPayments});
    var _Project    = await Project.findOne({_id: _invDoc.projectId});

    h.full_alert_user(_invDoc.invester, `Поступила выплата в проекте номер ${_Project._id} "${_Project.data.name}" на сумму ${data.pay} руб.`, "accept_business_investring", _InvDoc._id);

    callback();
};

async function obligations_accept_commission_put(socket, data, callback)
{
    var _InvDoc     = await InvDoc.findOne({_id: data});
    var _Project    = await Project.findOne({_id: _InvDoc.projectId});

    h.alertAdmin({
        type: "accpetCommissionByBusiness",
        text: `Проект ${_Project._id} "${_Project.data.name}" произвел оплату комисиии в пользу invester`,
        projectId: _Project._id,
    });

    callback(await commission.findOneAndUpdate({invId: data}, {status: "wait"}));
}

async function waitInvestingsData(socket, data, callback)
{
    var _InvDocs        = await InvDoc.find({status: "wait"});
    var _AllInvDocks    = [];

    for(var _InvDoc of _InvDocs)
    {
        _AllInvDocks.push({
            inv: _InvDoc,
        });
    };

    _AllInvDocks.sort(function(a, b) {
        if (Number(a.inv.date_append) > Number(b.inv.date_append)) {
            return 1;
        };
        if (Number(a.inv.date_append) < Number(b.inv.date_append)) {
            return -1;
        }
        return 0;
    });

    callback(_AllInvDocks);
}

async function allUserGetOneSetting(socket, data, callback)
{
    var _InvDoc     = await InvDoc.findOne({_id: data});
    var _User       = await User.findOne({user: _InvDoc.invester});
    var InvsGet     = await InvDoc.find({invester: _User.user});
    var ProjectsGet = await Project.find({user: _User.user});
    var _Photo  = null;
    var _idPhoto            = await bot.getUserProfilePhotos(_User.user);
    if(_idPhoto.total_count > 0)
    {
        var file_id         = _idPhoto.photos[0][0].file_id;
        _Photo              = await bot.getFile(file_id);
        _Photo              = `https://api.telegram.org/file/bot2062839693:AAE0hzj8SVXyexq29s5x7aRLC5x8O77c-pQ/` + _Photo.file_path;
    };

    var getOneProject       = await Project.findOne({_id: _InvDoc.projectId});
    var InvsOfProject       = await InvDoc.find({projectId: getOneProject._id});
    var howPaysNeed         = 0;
    var howPaysWait         = 0;
    var howPaysAccept       = 0;
    var howPaysnot_accept   = 0;
    var howPays             = 0;

    for(var InvsOfProjectGet of InvsOfProject)
    {
        if(InvsOfProjectGet.status = "wait" && new Date().getTime().toString() - InvsOfProjectGet.date_append.toString() >= 259200000)
        {
            howPaysNeed = howPaysNeed + 1;
        };

        if(InvsOfProjectGet.status = "wait")
        {
            howPaysWait = howPaysWait + 1;
        };

        if(InvsOfProjectGet.status = "accept")
        {
            howPaysAccept = howPaysAccept + 1;
        };

        if(InvsOfProjectGet.status = "not_accept")
        {
            howPaysnot_accept = howPaysnot_accept + 1;
        };

        howPays = howPays + 1;
    }

    callback({
        User: _User,
        Photo: _Photo,
        InvsGet: InvsGet.length,
        ProjectsGet: ProjectsGet.length,
        Project: {
            howPaysNeed: howPaysNeed,
            howPaysWait: howPaysWait,
            howPaysAccept: howPaysAccept,
            howPaysnot_accept: howPaysnot_accept,
            howPays: howPays,
            Project: getOneProject,
        },
    });
}

async function allUsersGetOne(socket, data, callback)
{
    var _User   = await User.findOne({_id: data});
    var InvsGet = await InvDoc.find({invester: _User.user});
    var ProjectsGet = await Project.find({user: _User.user});
    var _Photo  = null;
    var _idPhoto            = await bot.getUserProfilePhotos(_User.user);
    if(_idPhoto.total_count > 0)
    {
        var file_id         = _idPhoto.photos[0][0].file_id;
        _Photo              = await bot.getFile(file_id);
        _Photo              = `https://api.telegram.org/file/bot2062839693:AAE0hzj8SVXyexq29s5x7aRLC5x8O77c-pQ/` + _Photo.file_path;
    };

    callback({
        User: _User,
        Photo: _Photo,
        InvsGet: InvsGet.length,
        ProjectsGet: ProjectsGet.length,
    });
}

async function getUserByProjectOfId(socket, data, callback)
{
    var _Project    = await Project.findOne({_id: data});
    var _User       = await User.findOne({user: _Project.user});

    callback({
        whoGet: _User.user,
        nameGet: _User.first_name,
    });
}

async function getChatsOfId(socket, data, callback)
{
    var _User               = await User.findOne({_id: data.user});
    var _FindBlock          = await InvDoc.findOne({_id: data.id});
    var _AlertsByUser       = _User.alerts_main;
    var newAlertsArray      = _AlertsByUser.filter(function(f) { return f.idChat !== _FindBlock._id.toString()});

    await User.findOneAndUpdate({_id: data.user}, {alerts_main: newAlertsArray});

    if(!_FindBlock)
    {
        callback('error');
        return;
    };

    var returnBlock = 
    {
        name: null,
        type: null,
        photo: null,
        msgs: null,
        Inv: _FindBlock,
    };

    if(_User.type == "business")
    {
        var _idPhoto            = await bot.getUserProfilePhotos(_FindBlock.invester);

        if(_idPhoto.total_count > 0)
        {
            var file_id         = _idPhoto.photos[0][0].file_id;
            returnBlock.photo   = await bot.getFile(file_id);
            returnBlock.photo   = `https://api.telegram.org/file/bot2062839693:AAE0hzj8SVXyexq29s5x7aRLC5x8O77c-pQ/` + returnBlock.photo.file_path;
        };

        for(var findOfInv of _FindBlock.data.data)
        {
            if(findOfInv._id == "fio")
            {
                returnBlock.name = findOfInv.data;
            };
        };

        returnBlock.type = "Инвестор";
    }
    else
    {
        var _Project = await Project.findOne({_id: _FindBlock.projectId});
        returnBlock.name = _Project.data.name;
        returnBlock.type = "Бизнес";
    };

    var _MsgDB = await MsgDB.findOne({invDoc: _FindBlock._id});

    if(_MsgDB)
    {
        returnBlock.msgs = _MsgDB.msgs;
    };

    callback(returnBlock);
}

async function business_cheack_accept_in_cabinet(socket, data, callback)
{
    var _InvDoc     = await InvDoc.findOne({_id: data.id});
    var _Project    = await Project.findOne({_id: _InvDoc.projectId});
    var dataPay     = 0;

    if(_InvDoc)
    {
        var _Pays = _InvDoc.pays;

        for(var i = 0; i < _Pays.length; i++)
        {
            if(i == data.number)
            {
                dataPay = _Pays[i].pay;
                _Pays[i].status = "accept";
                delete _Pays[i].statusAccept;
            };
        };

        await InvDoc.findOneAndUpdate({_id: _InvDoc._id}, {pays: _Pays});
    };

    h.full_alert_user(_InvDoc.invester, `Поступила выплата в проекте номер ${_Project._id} "${_Project.data.name}" на сумму ${dataPay} руб.`, "accept_business_investring", _InvDoc._id);

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
        const element = await page.$('.cover_block');   
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

async function pushMsgsForInvesorsByLastInvesting(_Project)
{
    var attraction_amount   = Number(_Project.data.attraction_amount.toString().replace(/\s/g, ''));
    var allInvDosc          = await InvDoc.find({projectId: _Project._id, status: "accept"});
    var allMoneyOfProject   = 0;

    for(var InvDocFind of allInvDosc)
    {
        allMoneyOfProject = allMoneyOfProject + Number(InvDocFind.data.pay.toString().replace(/\s/g, ''));
    }

    console.log(attraction_amount <= allMoneyOfProject + " " + attraction_amount + " " + allMoneyOfProject);

    if(attraction_amount <= allMoneyOfProject)
    {
        await Project.findOneAndUpdate({_id: _Project._id}, {closeMoney: true});

        for(var InvsofProject of allInvDosc)
        {
            h.full_alert_user(InvsofProject.invester, `Проект ${_Project._id} "${_Project.data.name}" завершил сбор заявок, вам нужно оплатить последнюю сумму в размере ${100 - Number(_Project.notFullpay)}% от общей суммы`, "pushMoneyOfInvesting", InvsofProject._id);
        };
    };
}

async function endInvestingDataPush(socket, data, callback)
{
    var _User               = await User.findOne({_id: data.user});
    var _Project            = await Project.findOne({_id: data.project});
    var pathToLastDocument  = `documentLast_${new Date().getTime()}_${data.user}.pdf`;
    var html                = "https://investir.one/" + data.url;
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

    if(typeof data.accept != "undefined")
    {
        await InvDoc.findOneAndUpdate({_id: data.invId}, {status: "accept", urlToLastDocument: pathToLastDocument, pays: []});
        pushMsgsForInvesorsByLastInvesting(_Project);
    }else
    {
        await InvDoc.findOneAndUpdate({_id: data.invId}, {status: "wait", urlToLastDocument: pathToLastDocument});
    };

    var _datePush = new Date().getTime();

    if(typeof data.date != "undefined")
    {
        if(data.date)
        {
            _datePush = data.date.toString();
        }
    }

    h.alertDeleteOfUserOnbot(`${_User.first_name} вы успешно проинвестировали в проект\n ${_Project._id}\n "${_Project.data.name}"\n на сумму ${data.money} руб.\n по договору от ${DateTime.fromMillis(Number(_datePush)).toFormat('dd.MM.yyyy')}\n Ожидайте подтверждения бизнесом получения денег. Так как сумма идет банковским платежом, поступление на расчетный счет бизнеса может занять до 3х банковских дней`, _User.user);
    h.full_alert_user(_Project.user, `Поступила оплата в проекте номер ${_Project._id} "${_Project.data.name}" на сумму ${data.money} руб. по договору от ${DateTime.fromMillis(Number(_datePush)).toFormat('dd.MM.yyyy')} требуется подтверждение`, "put_investring");

    
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
        type: "correct_investerDocument_more",
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

    h.full_alert_user(_Project.user, `Вам поступил договор с ООО "ИНВЕСТИР" Необходимо ознакомится, подписать и отправить`, "file_urist", _Project._id);

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
    var _InvsDocs           = await InvDoc.find({invester: _User.user});
    var ActionData          = {
        defaultChats: {
            "business": {},
            "other": {},
        },
        User: _User,
    };
    
    for(var _Project of _ProjectsUser)
    {
        var InvsOfProject   = await InvDoc.find({projectId: _Project._id});

        for(var InvDocOfInv of InvsOfProject)
        {
            var FindMsgs = await MsgDB.find({invDoc: InvDocOfInv._id});

            for(var _msgBlock of FindMsgs)
            {
                var needUserPhoto       = null;
                var nameBlock           = _Project.data.name;
                var numberInvDoc        = 0;
                var needNumberInvDoc    = 0;

                var _UserDataBlock      = await User.findOne({user: InvDocOfInv.invester});
                var _idPhoto            = await bot.getUserProfilePhotos(_UserDataBlock.user);
    
                if(_idPhoto.total_count > 0)
                {
                    var file_id         = _idPhoto.photos[0][0].file_id;
                    needUserPhoto       = await bot.getFile(file_id);
                };

                for(var searchFio of InvDocOfInv.data.data)
                {
                    if(searchFio._id == "fio")
                    {
                        nameBlock = searchFio.data;
                    };
                };

                for(var cheackInitNumberInvDoc of InvsOfProject)
                {
                    numberInvDoc++;

                    if(cheackInitNumberInvDoc._id.toString() == InvDocOfInv._id.toString())
                    {
                        needNumberInvDoc = numberInvDoc;
                    };
                }
                
                var _dataBlock = 
                {
                    invId: InvDocOfInv._id,
                    msgBlock: _msgBlock,
                    name: nameBlock,
                    img: needUserPhoto,
                    Project: _Project,
                    invDoc: {
                        data: InvDocOfInv,
                        number: needNumberInvDoc,
                    },
                };
    
                if(typeof ActionData.defaultChats["business"]["id_" + InvDocOfInv.invester] != "undefined")
                {
                    ActionData.defaultChats["business"]["id_" + InvDocOfInv.invester].push(_dataBlock);
                }
                else
                {
                    ActionData.defaultChats["business"]["id_" + InvDocOfInv.invester] = [_dataBlock];
                };
            };
        };
    };
    
    for(var InvDocOfInv of _InvsDocs)
    {
        var FindMsgs        = await MsgDB.find({invDoc: InvDocOfInv._id});
        var _Project        = await Project.findOne({_id: InvDocOfInv.projectId});
        var InvsOfProject   = await InvDoc.find({projectId: _Project._id});

        for(var _msgBlock of FindMsgs)
        {
            var needUserPhoto       = null;
            var nameBlock           = _Project.data.name;
            var numberInvDoc        = 0;
            var needNumberInvDoc    = 0;
            var InvDocOfInv         = await InvDoc.findOne({_id: _msgBlock.invDoc});

            for(var cheackInitNumberInvDoc of InvsOfProject)
            {
                numberInvDoc++;

                if(cheackInitNumberInvDoc._id.toString() == InvDocOfInv._id.toString())
                {
                    needNumberInvDoc = numberInvDoc;
                };
            }

            var _dataBlock = {
                invId: InvDocOfInv._id,
                msgBlock: _msgBlock,
                name: nameBlock,
                img: needUserPhoto,
                Project: _Project,
                invDoc: {
                    data: InvDocOfInv,
                    number: needNumberInvDoc,
                },
            };

            if(typeof ActionData.defaultChats["other"]["id_" + _Project._id.toString()] == "undefined")
            {
                ActionData.defaultChats["other"]["id_" + _Project._id.toString()] = [];
            };

            ActionData.defaultChats["other"]["id_" + _Project._id.toString()].push(_dataBlock);
        };
    };

    callback(ActionData);
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
    h.full_alert_user(_Project.user, `Поступил договор - оферта с Инвестором. Необходимо ознакомится подписать и отправить`, "moreInvesterDocument", _Project._id);
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
    var _idProject      = data.projectId;
    var _User           = await User.findOneAndUpdate({_id: data.userId}, {type: "investor", putProject: _idProject});
    var _Project        = await Project.findOne({_id: _idProject});

    if(typeof _User.first_parse != "undefined")
    {
        if(typeof _Project.businessSite != "undefined") {
            callback({
                type: "location",
                data: {
                    userId: _User._id,
                    url: _Project.businessSite,
                },
            });
        } else {
            callback({
                type: "global",
                data: {
                    userId: _User._id,
                },
            });
        }
    }
    else
    {
        _app.defaultShowProject({
            from: {id: _User.user},
            chat: {id: _User.user},
        });
        
        callback('error');
    }
}

async function telegram_auth_recomendation(socket, data, callback)
{
    var _User       = await User.findOne({_id: data.userId});
    
    var msg             = {
        from: {id: _User.user},
        chat: {id: _User.user},
    };

    await _app.recomendationFunctionPush(msg, _User.user);

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
    var _Commission = await commission.findOneAndUpdate({_id: data}, {status: "accept"});
    var _InvDoc     = await InvDoc.findOne({_id: _Commission.invId});
    var _Project    = await Project.findOne({_id: _InvDoc.projectId});

    h.full_alert_user(_Project.user, `Оплата комисси investER подтверждена в проекте ${_Project._id} "${_Project.data.name}"`, "accept_commission_investring", _Project._id);

    callback()
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
    var AllInvs         = await InvDoc.find({projectId: data, status: "accept", applicationRequest: false});
    var allInvByCheack  = await InvDoc.find({projectId: data});
    
    var _data   = {
        project: await Project.findOne({_id: data}),
        Invs: [],
    }

    for(var Inv of AllInvs)
    {
        var initNuberProject        = 0;
        var initNumberProjectCheack = 1;

        for(allInvByCheackStat of allInvByCheack)
        {
            if(allInvByCheackStat._id.toString() == Inv._id.toString())
            {
                initNuberProject = initNumberProjectCheack;
            }

            initNumberProjectCheack++;
        }

        var _dataBLock = 
        {
            initNuberProject: initNuberProject,
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

async function payments_new_get(socket, data, callback)
{
    var _User           = await User.findOne().or([{ _id: data }, { user: data }]);
    var _Projects       = await Project.find({user: _User.user});

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
                var InvsOfProject       = await InvDoc.find({projectId: project._id, status: "accept", applicationRequest: false});

                for(var invPush of InvsOfProject)
                {
                    var InvesterOfInvs              = await User.findOne({user: invPush.invester});
                    var initNumberProject           = 1;
                    var initNumberProjectMose       = 1;
                    var allInvsByCheackInvDocInit   = await InvDoc.find({projectId: project._id});

                    for(var allInvByCheackInvDocInit of allInvsByCheackInvDocInit)
                    {
                        if(allInvByCheackInvDocInit._id.toString() == invPush._id.toString())
                        {
                            initNumberProject = initNumberProjectMose;
                        }

                        initNumberProjectMose++;
                    }

                    _blockData.showBlocks.push({
                        inv: invPush,
                        initNumberProject: initNumberProject,
                        InvesterOfInvs: InvesterOfInvs,
                        project: project,
                    });
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

            _blockData.showBlocks.slice(0, 30);

            resolve(_blockData);
        });
    }

    callback({
        payments_new: await payments_new(),
    })
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
        attracted:          await Attracted(),
    }

    async function Attracted()
    {
        return new Promise(async (resolve,reject) =>
        {
            var _blockData      =
            {
                investers: await User.find({member: _User.user}),
                business: await Payments.find({type: "business", user: _User.user}),
            };

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
                var InvsOfProject   = await InvDoc.find({projectId: project._id, status: "accept", applicationRequest: false});
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
                        repayData = invPush.date;
                    };

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
                    if(element._id.toString() == _acceptInv._id.toString())
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

    h.full_alert_user(_User.user, `В проекте номер ${_Project._id} "${_Project.data.name}" запрошено редактирование данных`, `project_redacting`, _Project._id);

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

    if(_project.data.organization == 1)
    {
        if(!Array.isArray(_project.parce.ispo))
        {
            var globalUserDataParce = null;

            if(_project.parce.ispo)
            {
                globalUserDataParce = await ParcingPage.cheackArbitrFizUser(_project.parce.ispo);
            }
            
            if(globalUserDataParce[0].status == 0 && globalUserDataParce)
            {
                _projectFizBlock.ispo = globalUserDataParce;
                await Project.findOneAndUpdate({_id: data}, {parce: _projectFizBlock});
            }
        }
    }

    callback('ok');
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
                        'url': 'https://investir.one/',
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

    callback(`https://investir.one/html/project/creating/#${_User._id}`);
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
    var _User       = await User.findOne({_id: data.user});
    var _InvDoc     = await InvDoc.findOne({_id: data.id});
    var _MsgDB      = await MsgDB.findOne({invDoc: _InvDoc._id});
    var _array      = [];

    if(!_MsgDB)
    {
        _MsgDB = await MsgDB.create(
        {
            invDoc: _InvDoc._id,
            msgs: [],
        });
    } 
    else
    {
        _array = _MsgDB.msgs;
    }

    var dataMail = {
        id: _InvDoc._id,
        text: data.msg,
        type: _User.type,
        time: new Date().getTime().toString(),
    }

    _array.push(dataMail);

    var neeuserAlertId = _InvDoc.invester;

    if(neeuserAlertId == _User.user)
    {
        var _ProjectOfAlert = await Project.findOne({_id: _InvDoc.projectId});
        neeuserAlertId      = _ProjectOfAlert.user;
    };

    var UserAlertOfMsg = await User.findOne({user: neeuserAlertId});

    if(typeof UserAlertOfMsg.socket != "undefined")
    {
        io.to(UserAlertOfMsg.socket).emit('request_mail', dataMail);
    }
    else
    {
        h.full_alert_user(neeuserAlertId, `У вас новое сообщение в месенджере!`, "new_msg", _InvDoc._id.toString());
    };

    callback(await MsgDB.findOneAndUpdate({_id: _MsgDB._id,},{msgs: _array}));
}

async function removePayInvestor(socket,data,callback)
{
    var _InvDoc = await InvDoc.findOneAndUpdate({_id: data.InvId}, {status: "not_correct", not_correct: data.data});
    h.full_alert_user(_InvDoc.invester, `Бизнес отклонил вашу инвестицию, вы можете инвестировать заного или отправить жалобу!`, "removePayInvestor");
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
    var _InvDoc     = await InvDoc.findOne({_id: data});
    var _User       = await User.findOne({user: _InvDoc.invester});
    var _Project    = await Project.findOne({_id: _InvDoc.projectId});
    var AllInvs     = await InvDoc.find({projectId: _InvDoc.projectId});
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
    var _InvDoc             = await InvDoc.findOne({_id: data.toString()});
    var _Project            = await Project.findOne({_id: _InvDoc.projectId});


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
            var EveryPayment    = Number(InvPay / 100 * RateBlock).toFixed(2);

            for(var i = 0; i < Math.trunc(HowManyDays); i++)
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

            for(var i = 0; i < Math.trunc(HowManyDays); i++)
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
            var EveryPayment            = Number(InvPay / 100 * RateBlock).toFixed(2);
            var HowManyDaysRedacting    = Number(HowManyDays / 3);

            for(var i = 1; i <= Math.trunc(HowManyDaysRedacting); i++)
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
                    pay: Number(EveryPayment * drobNumber).toFixed(2),
                    date: LastData,
                    receipt: null,
                    status: "wait",
                });
            }
        },
        "Ежегодно": async function()
        {
            var RateBlock           = Number(_Project.data.rate);
            var LastData            = NowToday.plus({ months: ProjectDate });
            var HowManyDays         = Interval.fromDateTimes(NowToday, LastData).length('year');
            var HowManyDaysMounth   = Interval.fromDateTimes(NowToday, LastData).length('month');
            var EveryPayment        = Number(InvPay / 100 * RateBlock).toFixed(2);

            for(var i = 0; i < Math.trunc(HowManyDays); i++)
            {
                InvPays.push({
                    pay: EveryPayment,
                    date: NowToday.plus({ year: i + 1 }),
                    receipt: null,
                    status: "wait",
                });
            };

            if(!Number.isInteger(HowManyDays))
            {
                var drobNumber          = HowManyDaysMounth % 12;
                var RateBlockMounth     = Number(_Project.data.rate / 12);
                var EveryPaymentMounth  = Number(InvPay / 100 * RateBlockMounth).toFixed(0);


                InvPays.push({
                    pay: Number(EveryPaymentMounth * drobNumber).toFixed(2),
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
            var EveryPayment            = Number(InvPay / 100 * RateBlock).toFixed(2);
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
                    pay: Number(EveryPayment * drobNumber).toFixed(2),
                    date: LastData,
                    receipt: null,
                    status: "wait",
                });
            }
        },
        "В конце срока": async function()
        {
            var RateBlock       = Number(_Project.data.rate / 12 * ProjectDate);
            var EveryPayment    = Number(InvPay / 100 * RateBlock).toFixed(2);

            InvPays.push({
                pay: EveryPayment,
                date: NowToday.plus({ months: ProjectDate }),
                receipt: null,
                status: "wait",
            });
        },
    };

    if(_Project.data.date != "Бессрочно" && typeof _Project.notFullpay == "undefined")
    {
        paymentsFunction[_Project.data.date_payments]();
    };

    var _InvDocNeed             = await InvDoc.findOneAndUpdate({_id: _InvDoc._id}, {status: "accept", pays: InvPays});
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

        h.full_alert_user(_UserInv.member, `Вам поступил бонус за инвестора в размере ${Number(_InvDoc.data.pay) * Number(Number(_Project.payersData.commission) / 100) * Number(Number(_Project.payersData.investors_commission) / 100)}`, "payment_member");
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

                h.full_alert_user(_UserProject.member_b, `Вам поступил бонус за бизнес в размере ${Number(_InvDoc.data.pay) * Number(Number(_Project.payersData.commission) / 100) * Number(Number(_Project.payersData.business_commission) / 100)}`, "payment_member");
            };
        };
    };

    h.full_alert_user(_InvDoc.invester, `В проекте под номером ${_Project._id} "${_Project.data.name}" Ваша инвестиция была подтверждена!`, "accept_investing", _InvDoc._id);

    pushMsgsForInvesorsByLastInvesting(_Project);

    callback(_InvDocNeed);
}

async function getUserForId(socket,data,callback) 
{
    var _User               = await User.findOne({_id: data});
    var _InvsByWait         = await InvDoc.find({invester: _User.user, applicationRequest: true, status: "accept"});
    var _InvsByNotCorrect   = await InvDoc.find({invester: _User.user, status: "not_correct"});
    var _InvsByChats        = [];
    
    try {
        _InvsByChats = _User.alerts_main.filter(el => el.type == "new_msg");
    } catch (e) {}

    var _AlertinvsByWait    = [];
    var Ale_activ_projects  = [];

    if(typeof _User.alerts_main != "undefined")
    {
        Ale_activ_projects = _User.alerts_main.filter(el => el.type == "accept_business_investring")
    }

    for(var _Inv of _InvsByWait)
    {
        if(typeof _Inv.data.pts_2 == "undefined")
        {
            _AlertinvsByWait.push(_Inv);
        }
    }

    if(_User)
    {
        var needUser    = 
        {
            _User: _User,
            alerts: 
            {
                wait_projects: _AlertinvsByWait.length,
                not_correct: _InvsByNotCorrect.length,
                chats: _InvsByChats.length,
                activ_projects: Ale_activ_projects.length,
            }
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
    var allInvsOfPush   = [];

    for(var _Project of allProjects) 
    {
        var InvDocs = await InvDoc.find({projectId: _Project._id, status: "wait"});

        for(_InvOfFind of InvDocs)
        {
            allInvsOfPush.push({
                Inv: _InvOfFind,
                project: _Project,
            });
        };
    };

    callback(allInvsOfPush);
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

    await Project.findOneAndUpdate({_id: data}, {signature: _array, type: "moderation"});

    var _UserByAlerts       = await User.findOne({user: _project.user});
    var alertsOfUser        = _UserByAlerts.alerts_main;
    var needsArrayAlerts    = [];
    var errorOfAlerts       = false;
    
    for(var _key in alertsOfUser)
    {
        if(alertsOfUser[_key].type != "correction_signature")
        {
            needsArrayAlerts.push(alertsOfUser[_key]);
        } 
        else
        {
            errorOfAlerts = true;
        }
    };
    
    if(errorOfAlerts)
    {
        await User.findOneAndUpdate({user: _project.user}, {alerts_main: needsArrayAlerts});
    };

    h.alertAdmin({
        type: "correct_investerDocument",
        text: "Дополнительные документы проекта были добавленны",
        projectId: _project._id,
    });
    
    h.alertDeleteOfUserOnbot("Дополнительные документы проекта успешно загружены, ождайте результатов модерации", _project.user);
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




    var _UserByAlerts       = await User.findOne({user: _project.user});
    var alertsOfUser        = _UserByAlerts.alerts_main;
    var needsArrayAlerts    = [];
    var errorOfAlerts       = false;

    for(var _key in alertsOfUser)
    {
        if(alertsOfUser[_key].type != "project_redacting")
        {
            needsArrayAlerts.push(alertsOfUser[_key]);
        } 
        else
        {
            errorOfAlerts = true;
        }
    };

    if(errorOfAlerts)
    {
        await User.findOneAndUpdate({user: _project.user}, {alerts_main: needsArrayAlerts});
    };





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

    h.full_alert_user(_project.user, `К проекту номер ${_project._id} "${_project.data.name}" запрошенны дополнительные документы`, `correction_signature`, _project._id);

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
    var _project        = await Project.findOne({_id: data});

    if(
        !_project.signature             ||
        !_project.signature_document    ||
        typeof _project.registrationDocument == "undefined"
    )
    {
        callback('error');
        return;
    };

    try
    {
        var _urlImgProject  = `${h.getURL()}html/project/cover/?id=${data}&liner=true`;
        console.log(_urlImgProject);
        const browser       = await puppeteer.launch({
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

        var hgetUrlByBusinnes       = h.getURL();

        if(typeof _project.businessSite != 'undefined') {
            hgetUrlByBusinnes = `https://${_project.businessSite}/`;
        };

        var videoPresentationPath   = `${hgetUrlByBusinnes}/projects/${_project._id}/${_project.data["file+8"]}`;
        
        if(_project.YT_VIDEO)
        {
            var yt_data = JSON.parse(_project.YT_VIDEO[3]);
            videoPresentationPath = `https://www.youtube.com/watch?v=${yt_data.id}`;
        };
    
        var html        = `<a href="${hgetUrlByBusinnes}html/project/profil/#${_project._id}/">[<u>Профиль компании</u>]</a>\n<a href="${hgetUrlByBusinnes}/projects/${_project._id}/${_project.data["file+7"]}">[<u>Презентация</u>]</a>\n<a href="${videoPresentationPath}">[<u>Видео презентация</u>]</a>`;
        var stream      = fs.createReadStream(`../projects/${data}/logo_instagram.jpg`);
    
        var dataPhotoPush = await bot.sendPhoto(-1001205415519, stream, {
            "caption": html,
            "parse_mode": "html",
            "reply_markup": {
                "inline_keyboard": [
                    [
                        {
                            text: "Рекомендовать",
                            login_url: {
                                'url': `https://investir.one/?page=telegram_authorization&type=recomendation&userId=${data}`,
                                'request_write_access': true,
                            },
                        },
                        {
                            text: "Личный кабинет",
                            login_url: {
                                'url': `https://investir.one/?page=telegram_authorization&type=cabinet`,
                                'request_write_access': true,
                            },
                        }
                    ],
                    [
                        {
                            text: "🚀 Оплатить 🚀",
                            login_url: {
                                'url': `https://investir.one/?page=telegram_authorization&type=more&userId=${data}`,
                                'request_write_access': true,
                            },
                        }
                    ]
                ],
            }
        });
    
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
    
    
        h.full_alert_user(_project.user, `Ваш проект номер ${_project._id} "${_project.data.name}" был опубликован в investER!`, "acceptProject", dataPhotoPush.message_id);
    
        h.alertAdmin({
            type: "creating_project",
            text: `Проект ${_project.data.name} был опубликован в канале!`,
            projectId: _project._id,
        });

        callback('ok');
    }
    catch(e)
    {
        console.log(e);
        callback('error_add');
    }    
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
            try
            {
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
                        resolve("error");
                    });
                });
            } catch(e)
            {
                resolve("error");
            }
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
    var alertForUser                = h.alertDeleteOfUserOnbot(html, _User.user);
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
        },
    };

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

    _DataProject.data                   = redactinProject;
    _DataProject.data.moreUsersNotParce = sortMoreUsers;
    _DataProject.data.organization      = _dataProject.organization;

    // ======================================================================================

    var _Project = await Project.create(_DataProject);

    // ======================================================================================

    async function alertErrorOfParcing(data)
    {
        await h.alertAdmin({
            type: "creating_project",
            text: `Новый проект подан, c ошибкой парсинга: ${data}\n\nНомер проекта: ${_Project._id}`,
            projectId: _Project._id,
        });

        return;
    }

    await wrench.copyDirSyncRecursive(user_path, `/var/www/projects/${_Project._id}`);

    try {
        await fs.readdir(user_path, async (err, files) => {
            if (err) {
                await alertErrorOfParcing("Папка не создалась");
                return;
            }
            for (const file of files) {
                fs.unlink(path.join(user_path, file), err => {
                    if (err) throw err;
                });
            }
        }); 
    } catch(e) {
        await alertErrorOfParcing("Папка не создалась");
    };
    
    await h.savePuppeter(_Project._id); 

    try
    {
        var ParceDataProject    = {};

        if(_dataProject.organization == 1)
        {
            try
            {
                ParceDataProject["pr"] = await ParcingPage.ParceProject(redactinProject.inn);
                if(ParceDataProject["pr"] == "error")
                {
                    await alertErrorOfParcing("Первичный парсинг");
                }
                await Project.findOneAndUpdate({_id: _Project._id}, {parce: ParceDataProject});
            } catch(e) {
                await alertErrorOfParcing("Первичный парсинг");
                console.log(e);
            };

            try
            {
                ParceDataProject["ar"]  = await ParcingPage.ParcingArbitrage(redactinProject.inn);
                if(ParceDataProject["ar"] == "error")
                {
                    await alertErrorOfParcing("Арбитражная практика");
                }
                await Project.findOneAndUpdate({_id: _Project._id}, {parce: ParceDataProject});
            } catch(e) {
                await alertErrorOfParcing("Арбитражная практика");
                console.log(e);
            };

            try
            {
                ParceDataProject["ispo"]  = await _AllParce._ParceProjectIspo(redactinProject)
                if(ParceDataProject["ispo"] == "error")
                {
                    await alertErrorOfParcing("Исполнительное производство");
                }
                await Project.findOneAndUpdate({_id: _Project._id}, {parce: ParceDataProject});
            } catch(e) {
                await alertErrorOfParcing("Исполнительное производство");
                console.log(e);
            };

            try
            {
                ParceDataProject["fiz"]  = await ParcingPage.ParceUsersBlock(redactinProject, sortMoreUsers);
                if(ParceDataProject["fiz"] == "error")
                {
                    await alertErrorOfParcing("Данные собственников");
                }
                await Project.findOneAndUpdate({_id: _Project._id}, {parce: ParceDataProject});
            } catch(e) {
                await alertErrorOfParcing("Данные собственников");
                console.log(e);
            };
        }
        else if(_dataProject.organization == 2)
        {
            try
            {
                ParceDataProject["pr"]  = await ParcingPage.ParceProject(redactinProject.inn);
                if(ParceDataProject["pr"] == "error")
                {
                    await alertErrorOfParcing("Первичный парсинг");
                }
                await Project.findOneAndUpdate({_id: _Project._id}, {parce: ParceDataProject});
            } catch(e) {
                await alertErrorOfParcing("Первичный парсинг");
                console.log(e);
            };

            try
            {
                ParceDataProject["ar"]  = await ParcingPage.ParcingArbitrage(redactinProject.inn);
                if(ParceDataProject["ar"] == "error")
                {
                    await alertErrorOfParcing("Арбитражная практика");
                }
                await Project.findOneAndUpdate({_id: _Project._id}, {parce: ParceDataProject});
            } catch(e) {
                await alertErrorOfParcing("Арбитражная практика");
                console.log(e);
            };

            try
            {
                ParceDataProject["fiz"]  = await ParcingPage.ParceUsersBlock(redactinProject, sortMoreUsers);
                if(ParceDataProject["fiz"] == "error")
                {
                    await alertErrorOfParcing("Данные собственников");
                }
                await Project.findOneAndUpdate({_id: _Project._id}, {parce: ParceDataProject});
            } catch(e) {
                await alertErrorOfParcing("Данные собственников");
                console.log(e);
            };
        } 
        else if(_dataProject.organization == 3)
        {
            try
            {
                ParceDataProject["fiz"]  = await ParcingPage.ParceUsersBlock(redactinProject, sortMoreUsers);
                if(ParceDataProject["fiz"] == "error")
                {
                    await alertErrorOfParcing("Данные собственников");
                }
                await Project.findOneAndUpdate({_id: _Project._id}, {parce: ParceDataProject});
            } catch(e) {
                await alertErrorOfParcing("Данные собственников");
                console.log(e);
            };
        };
    }
    catch(e)
    {
        alertErrorOfParcing("Неизвестная ошибка парсинга");
    };

    h.alertAdmin({
        type: "creating_project",
        text: `Новый проект подан на модерацию\n\nНомер проекта: ${_Project._id}`,
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

    try {
        var _ProjectParce       = _Project.parce;
        var _ProjectMoreUsers   = {};
    
        if(typeof _Project.data.moreUsersData != "undefined")
        {
            _ProjectMoreUsers = _Project.data.moreUsersData;
        }
    
        // var ParceUsersBlock = await ParcingPage.ParceUsersBlock(_Project.data, _ProjectMoreUsers);
    
        if(_Project.data.organization != 3)
        {
            _ProjectParce = 
            {
                "pr": await ParcingPage.ParceProject(_Project.data.inn),
                "ar": await ParcingPage.ParcingArbitrage(_Project.data.inn),
                "ispo": null,
                // "fiz": ParceUsersBlock,
            };
    
            if(_Project.data.organization == 1)
            {
                _ProjectParce.ispo = await ParcingPage.ParceProjectIspo(_Project.data.inn.toString().trim());
            };
        } else {
            _ProjectParce =
            {
                // "fiz": ParceUsersBlock,
            };
        };
    
        await Project.findOneAndUpdate({_id: data}, {parce: _ProjectParce});
    
        h.alertAdmin({
            type: "creating_project",
            text: `В проекте номер ${data} перепарсинг прошел успешно!`,
            projectId: _Project._id,
        });
    }
    catch(e)
    {
        h.alertAdmin({
            type: "creating_project",
            text: `В проекте номер ${data} перепарсинг прошел c ошибками, отправьте его обратно!`,
            projectId: _Project._id,
        });
    }
    
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
            notTakeHow: 0,
            notTakeHowMoney: 0,
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
        if(typeof acceptInv.applicationRequest != "undefined")
        {
            if(!acceptInv.applicationRequest)
            {
                all_data.moreGetData.paysInvesters = all_data.moreGetData.paysInvesters + Number(acceptInv.data.pay.toString().replace(/\s/g, ''));
            }
        }
        else
        {
            all_data.moreGetData.notTakeHow         = all_data.moreGetData.notTakeHow + 1;
            all_data.moreGetData.notTakeHowMoney    = all_data.moreGetData.notTakeHowMoney + Number(acceptInv.data.pay.toString().replace(/\s/g, ''));
        }
    });

    for(var aceptInv of acceptInvsPush)
    {
        if(typeof aceptInv.applicationRequest != "undefined")
        {
            if(!aceptInv.applicationRequest)
            {
                var _dataBlock = 
                {
                    invester: await User.findOne({user: aceptInv.invester}),
                    inv: aceptInv,
                }; 

                var openSummInvDoc      = Number(aceptInv.data.pay.toString().replace(/\s/g, ''));
                var openCloseSumminvDoc = 0;
                var pushOpenSummInvDoc  = 0;

                aceptInv.pays.forEach((pushSumm, init) => {
                    if(pushSumm.status == "accept")
                    {
                        openCloseSumminvDoc = openCloseSumminvDoc + Number(pushSumm.pay.toString().replace(/\s/g, ''));
                    };
                });

                if(openCloseSumminvDoc <= openSummInvDoc)
                {
                    pushOpenSummInvDoc = Number(Number(openSummInvDoc) - Number(openCloseSumminvDoc));
                };

                all_data.moreGetData.commissionForPtoject = all_data.moreGetData.commissionForPtoject + pushOpenSummInvDoc;

                all_data.moreGetData.invsPush.push(_dataBlock);
            }
        }
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

async function teletube_add(socket, data, callback)
{
    await teletube_video.create({
        data: data,
    });

    callback();
};

async function teletube_get(socket, data, callback)
{
    callback(await teletube_video.find({}));
};