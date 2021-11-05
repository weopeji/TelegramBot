var USERS = {
    "userID": "invester.official@gmail.com"
};

for(var key in USERS)
{
    $('body').append(`<p>${key}:${USERS[key]}</p>`);
}

