console.log ( '%c%s', 'color: red; font: 2.2rem/1 Tahoma;', "WARNING" );
console.log ( '%c%s', 'color: white; font: 0.8rem/1 Tahoma;', "Эта функция предназначена только для" );
console.log ( '%c%s', 'color: yellow; font: 0.8rem/1 Tahoma;', "РАЗРАБОТЧИКОВ" );
console.log ( '%c%s', 'color: white; font: 0.8rem/1 Tahoma;', "Если кто-то пообещал бесплатные деньги или любую другую выгоду за копирование чего-либо, он попытается получить доступ к вашей учетной записи, чтобы обмануть вас." );

var imSocket = null;

window.global_data = {
    data_url_localhost: 'http://localhost:3000',
    data_url_server: 'https://skin-win.ru',
    data_url_localhost_non: 'http://localhost',
};

//========= Cookies ===================================================================

function getURL() 
{
    if (location.hostname === "localhost" || location.hostname === "127.0.0.1") {
        return window.global_data.data_url_localhost_non + "/tbot";
    } else {
        return window.global_data.data_url_server;
    }
}

function delCookie(name) {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    location.reload();
}

function getCookie(name) {

    var dc = document.cookie;
    var prefix = name + "=";
    var begin = dc.indexOf("; " + prefix);
    if (begin == -1) {
        begin = dc.indexOf(prefix);
        if (begin != 0) return null;
    }
    else
    {
        begin += 2;
        var end = document.cookie.indexOf(";", begin);
        if (end == -1) {
        end = dc.length;
        }
    }
    return decodeURIComponent(dc.substring(begin + prefix.length, end));

}

function _getCookie(name) {
    var matches = document.cookie.match(new RegExp(
      "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
  }

function setCookie(name, value, days, path) {
    
    path = path || '/';
    days = days || 10;

    value = encodeURIComponent(value);

    var last_date = new Date();
    last_date.setDate(last_date.getDate() + days);
    var value = escape(value) + ((days==null) ? "" : "; expires="+last_date.toUTCString());
    document.cookie = name + "=" + value + "; path=" + path; // вешаем куки
}

function _GET(key) {

    var s = window.location.search;
    s = s.match(new RegExp(key + '=([^&=]+)'));
    return s ? s[1] : false;

}

//======== mains ======================================================================

async function postData(url, data) {
    const response = await fetch(url, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            //'Content-Type': 'application/json'
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: data
    });
    return await response.json();
}

function io_connect(callback) 
{
    delete imSocket;
    imSocket = null;
    var url = null;
    if (location.hostname === "localhost" || location.hostname === "127.0.0.1" || location.hostname === "localhost.ru") {
        url = global_data.data_url_localhost;
        imSocket = io(url, {transports: ['polling']});
    } else {
        url = global_data.data_url_server;
        imSocket = io(url, {transports: ['websocket', 'polling']});
        // imSocket = io(url, {
        //     path: '/socket.io'
        // });
    }
    imSocket.on('connect', function() {
        console.log("Сервер подключен к: " + url);
        if(callback) {
            callback();
        }
    });
}

function getURL() 
{
    if (location.hostname === "localhost" || location.hostname === "127.0.0.1") {
        return window.global_data.data_url_localhost_non;
    } else {
        return window.global_data.data_url_server;
    }
}

function updateURL(url) {
    if (history.pushState) {
        var baseUrl = window.location.protocol + "//" + window.location.host + window.location.pathname;
        var newUrl = baseUrl + '?' + url;
        history.pushState(null, null, newUrl);
    }
    else {
        console.warn('History API не поддерживается');
    }
}

function truncate(input, num) {
    if (input.length > num)
       return input.substring(0,num) + '...';
    else
       return input;
};

function socketPost(param, action, data, callback) {
    data = data || {};
    imSocket.emit(param, {
        action: action,
        data: data
    },function(response){
        if(callback) callback(response);
    });
}

function include(url) {
    var script = document.createElement('script');
    script.src = url;
    document.getElementsByTagName('head')[0].appendChild(script);
}


// Components ==========================

function PostComponents(action, json, callback)
{
    imSocket.emit('components', {
        action: action,
        data: json
    },function(response){
        callback(response)
    });
}

function indexOf(array, item) {
    return $$1.inArray(item, array);
}

function myLoadScript(sScriptSrc, oCallback,id)
{
    var oHead = document.getElementsByTagName('head')[0];
    var oScript = document.createElement('script');
    oScript.type = 'text/javascript';
	oScript.charset="utf-8";
    oScript.src = sScriptSrc;

    if(typeof id != "undefined")
    {
        oScript.id = id;
    }

    oScript.onload = oCallback;
    oScript.onreadystatechange = function()
    {
        if ((this.readyState == 'complete') || (this.readyState == 'loaded')) {
            oCallback();
        }
    }
    oHead.appendChild(oScript);
}

function loadResources(array,callback)
{
    var sync_array = [];
    array.forEach(function(item){
        sync_array.push(function(item, callback){
            myLoadScript(item,function(){
                callback(null,true);
            });
        }.bind(null,item))
    });

    if(sync_array.length > 0)
    {
        async.parallel(sync_array,function(err, results) {
            callback(true)
        });
    }else
    {
        callback(true)
    }
}


var setValue = function(elem, value, inc, shift, speed){
    var interval = false; 
    if (inc) {
        interval = setInterval(function(){
            if (elem.innerHTML*1+shift >= value) {
                elem.innerHTML = value;
                clearInterval(interval);
            } else {
                elem.innerHTML = elem.innerHTML*1+shift;
            }
        }, speed);
    } else {
        interval = setInterval(function(){
            if (elem.innerHTML*1-shift <= value) {
                elem.innerHTML = value;
                clearInterval(interval);
            } else {
                elem.innerHTML = elem.innerHTML*1-shift;
            }
        }, speed);
    }
};