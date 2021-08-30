(function (global) 
{
    io_connect( function() 
    {
        global.loadResources(['./html/assets/javascript/index/component.js'], () => {
            Main();
        });    
    });

    function Main()
    {
        var pageID = _GET('page');
        var userID = _GET('user');
        var token = _getCookie('token');

        if(!userID) {
            if(!token) {
                alert("Войдите на сайт!"); 
                return;
            }
        } else {
            setCookie('token', userID);
        }

        var _id = _getCookie('token');

        var allData = {
            _id: _id,
        }

        if(_id) 
        {
            const process_status    = new global.Components.process_status();

            var renderPage = 
            {
                "process_status": function() {process_status.render(allData)},
            }

            renderPage[pageID]();
        }
    }

}(window))