(function (global) 
{
    io_connect( function() 
    {
        global.loadResources(['./html/assets/javascript/index/component.js'], () => {
            Main();
        });    
    });

    async function Main()
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

        global.allData = {
            _id: _id,
            pageID: pageID,
        }

        if(_id) 
        {
            const user_block        = new global.Components.user_block();
            const activ_projects    = new global.Components.activ_projects();
            const acceptPays        = new global.Components.acceptPays();
            const chats             = new global.Components.chats();
            //const profil_page       = new global.Components.profil_page();

            var _User = await user_block.render(_id);
            global.allData.User = _User;

            var renderPage = 
            {
                "profil": function() {profil_page.render(global.allData)},
                "activ_projects": function() {activ_projects.render(global.allData)},
                "acceptPays": function() {acceptPays.render(global.allData)},
                "chats": function() {chats.render(global.allData)}
            }

            renderPage[pageID]();


            // const process_status    = new global.Components.process_status();
            
            // const put_document      = new global.Components.put_document();
            // const pay_investors     = new global.Components.pay_investors();
            // const acceptPays        = new global.Components.acceptPays();

            // var renderPage = 
            // {
            //     "process_status": function() {process_status.render(global.allData)},
            //     
            //     "put_document": function() {put_document.render(global.allData)},
            //     "pay_investors": function() {pay_investors.render(global.allData)},
            //     "acceptPays": function() {acceptPays.render(global.allData)},
            // }

            // $('.content').empty();

            // renderPage[pageID]();

            // $('.index_page_body_menu_line span').click( function() {
            //     $('.content').empty();
            //     renderPage[$(this).attr('data')]();
            // })

            $('.preloader').fadeOut( function() {
                $(this).remove();
            })
        }
    }

}(window))