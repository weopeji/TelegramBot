var USERS = {
    "youtube": "https://www.youtube.com/channel/UCi6BaMV9uVnlzGIGI4P_EjQ"
};

for(var key in USERS)
{
    $('body').append(`<p>${key} : ${USERS[key]}</p>`);
}

