var USERS = {
    "userID": "invester.official@gmail.com"
};

var _data = USERS.json().toString();

$('body').append(_data);