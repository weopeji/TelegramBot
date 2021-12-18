(function (global) 
{
    const callApi = ({ methodName, data }) => {    
        return new Promise((resolve, reject) => 
        {
            global.PostComponents(
                methodName,
                data,
                (response) => {
                    resolve(response)
                }
            )
        });
    }

    io_connect( function() 
    {
        global.loadResources(['./html/assets/javascript/index/component.js'], () => {
            global.loadResources(['./html/assets/javascript/index/creating_page.js'], () => {
                global.loadResources(['./html/assets/javascript/index/invester_data.js'], () => {
                    Main();
                }); 
            }); 
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

        global.allData = 
        {
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
            const Attracted_by_me   = new global.Components.Attracted_by_me();
            const reward            = new global.Components.reward();
            const ref_url           = new global.Components.ref_url();

            const invester_data     = new global.Components.invester_data();
            const creating_page     = new global.Components.creating_page();

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
                "Attracted_by_me": function() {Attracted_by_me.render(global.allData)},
                "reward": function() {reward.render(global.allData)},
                "creating": function() {creating_page.render(global.allData)},
                "ref_url": function() {ref_url.render(global.allData)},
                "invester_data": function() {invester_data.render(global.allData)},
            }

            if(pageID)
            {
                renderPage[pageID]();
            } else 
            {
                renderPage["chats"]();
            }

            $('.preloader').fadeOut( function() {
                $(this).remove();
            })
        }


        (() => 
        {
            $('.buttons_menu').click( function() {
                $('.index_page_menu').toggleClass('selected');
                $('.buttons_menu').toggleClass('selected');
            });

            $('.menu_reload_type').click( function() {
                $('.menu_reload_type_menu').fadeToggle();
            });

            $('.menu_reload_type_menu_line').click( async function() {
                var _type = $(this).attr('data');
                var _data = await callApi({
                    methodName: "reload_type",
                    data: {
                        type: _type,
                        _id: global.allData._id,
                    },
                });
                location.reload();
            })
        })()    
    }

}(window))