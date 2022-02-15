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