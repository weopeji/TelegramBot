(async (global) => {

    var params = window
        .location
        .search
        .replace('?','')
        .split('&')
        .reduce(
            function(p,e){
                var a = e.split('=');
                p[ decodeURIComponent(a[0])] = decodeURIComponent(a[1]);
                return p;
            },
            {}
        );

    for(var _key in params)
    {
        $(`data[type="${_key}"]`).html(params[_key]);
    }

    var _type = params["type"];

    var funsType = {
        "UR": "Юр. Лицо",
        "IP": "ИП",
        "FIZ": "Физ. лицо",
    }

    $('data[type="typeinv"]').html(funsType[_type]);

})(window);