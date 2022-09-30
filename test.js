$('.structCreator_new_block').each((i, element) => {
    $(element).find('input[type="checkbox"]').click();
})

window.PostComponents(
    "test_fun",
    null,
    (response) => {
        resolve(response)
    }
)

var keyboard = [
    {
        text: "Рекомендовать",
        login_url: {
            'url': `https://investir.one/?page=telegram_authorization&type=recomendation&userId=${data}`,
            'request_write_access': true,
        },
    }
];

h.alertAdmin({
    type: "creating_project",
    text: "Новый проект подан на модерацию",
    projectId: _Project._id,
});

h.full_alert_user(_project.user, `В проекте под номером ${_project._id} нужно исправить данные!`, "redactingSettings");

h.alertDeleteOfUserOnbot(html, _User.user);

login_url: {
    'url': _url,
    'request_write_access': true,
},

var HowManyDays     = Number(4.838356164383562);

for(var i = 0; i < Number(HowManyDays); i++)
{
   console.log(i);
}

note({
    content: "Something going <b>wrong</b>",
    type: "info" "error",
    time: 15,
    callback: function()
    {

    },
});

note({
    content: "",
    type: "info",
    time: 2,
});

note({
    content: "",
    type: "info",
    time: 2,
    callback: function()
    {

    },
});



// alerts ромб



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





// files


var _form               = new FormData();
var _url                = `${getURL()}/file_Action.io/files`;

_form.append('file',   $(this.files)[0]);
_form.append('data',    JSON.stringify({
    Action: "activ_projects_NotFullPayNull",
    InvDocId: _GET('id'), 
}));

axios.post(_url, _form, {
    headers: {
        'Content-Type': 'multipart/form-data'
    },
}).then(data => 
{
    if(data.data.status == "ok") {
        alert("Чек прикоеплен!");
        location.reload();
    }
});

$('header').append($('<link rel="stylesheet" href="./html/assets/css/2.0.0/black/index.css">'));


<div class="version2_settingBlock_header">
    <p>Доступные проекты</p>
</div>

<div class="version2_default_bkg row_default"></div>

<div class="version2_settingBlock_mobile_line">
    <span>Название</span>
</div>

<div class="version2_errorPushBlockDefault">
    <span>У вас нет проектов в ожидании</span>
</div>


SoloAlert.confirm({
    title: "Подтверждение",
    body: "Бизнес отпрасил запрос на закрытие и перезаполнение инвестиции",
    theme: "dark",
    html: "",
    useTransparency: true,
}).then(async (value) => 
{
    if(value)
    {
        await callApi({
            methodName: "not_correct_complaint_again",
            data: _GET("id"),
        });

        _this.pushMsgOfUser(`Инвестиция была отменена инвестором`);
        _this.removeButtonsAll();

        SoloAlert.alert({
            title:"Успешно",
            body:"",
            icon: "success"
        });
    }
    else
    {
        await callApi({
            methodName: "requestInvestingOfRemoveCLOSE",
            data: _GET("id"),
        });

        _this.pushMsgOfUser(`Предложение было отклонено инвестором`);
        _this.removeButtonsAll();

        SoloAlert.alert({
            title:"Успешно",
            body:"",
            icon: "success"
        });
    }
})


if(window.screen.width < 1300)
{
    saveUrlAsFile(`/projects/${_project._id}/${_GET("InvId")}_investment_2.${data.data.FilePts}`, `${_GET("InvId")}_investment_2.${data.data.FilePts}`);
}
else
{
    window.open(`/projects/${_project._id}/${_GET("InvId")}_investment_2.${data.data.FilePts}`, '_blank');
}



settingBlock.find(".version2_settingBlock_header").append(`
    <div class="version2_settingBlock_header_allertMini">
        
    </div>
`);

<bb>
    <bb_circule></bb_circule>
    <bb_circule></bb_circule>
    <bb_circule></bb_circule>
</bb>

href="http://d91738w5.beget.tech/wp-content/themes/pro-remont-kvartir.ru/img/22969520.svg#icon"
href="https://bash-remont.ru/wp-content/themes/pro-remont-kvartir.ru/img/22969520.svg#icon"