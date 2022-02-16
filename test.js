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