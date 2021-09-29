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
        var pageID      = _GET('page');
        var userID      = _GET('user');
        var token       = _getCookie('token');

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
            const pay_investors     = new global.Components.pay_investors();
            const myProjects        = new global.Components.myProjects();
            const signature         = new global.Components.signature();

            var _User = await user_block.render(_id);
            global.allData.User = _User;

            var renderPage = 
            {
                "profil": function() {profil_page.render(global.allData)},
                "activ_projects": function() {
                    if(!_GET('id')) {
                        activ_projects.render(global.allData)
                    } else {
                        activ_projects.renderType(global.allData)
                    }
                },
                "acceptPays": function() {acceptPays.render(global.allData)},
                "chats": function() {chats.render(global.allData)},
                "pay_investors": function() {pay_investors.render(global.allData)},
                "myProjects": function() {
                    if(!_GET('id')) {
                        myProjects.render(global.allData)
                    } else {
                        myProjects.renderType(global.allData)
                    }
                },
                "signature": function() {signature.render(global.allData)},
            }

            renderPage[pageID]();

            $('.preloader').fadeOut( function() {
                $(this).remove();
            })
        }


        (() => {
            $('.buttons_menu').click( function() {
                $('.index_page_menu').toggleClass('selected');
                $('.buttons_menu').toggleClass('selected');
            })
        })()
    }

}(window))