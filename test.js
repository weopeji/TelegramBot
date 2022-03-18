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
            'url': `https://invester-relocation.site/?page=telegram_authorization&type=recomendation&userId=${data}`,
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