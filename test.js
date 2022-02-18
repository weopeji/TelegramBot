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