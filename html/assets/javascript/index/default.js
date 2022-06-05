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

    if(_getCookie('black_styles'))
    {
        let $       = document;
        let head    = $.getElementsByTagName('head')[0];
        let link    = $.createElement('link');
        link.rel    = 'stylesheet';
        link.type   = 'text/css';
        link.href   = './html/assets/css/2.0.0/black/index.css';
        head.appendChild(link);
    }
    else
    {
        let $       = document;
        let head    = $.getElementsByTagName('head')[0];
        let link    = $.createElement('link');
        link.rel    = 'stylesheet';
        link.type   = 'text/css';
        link.href   = './html/assets/css/2.0.0/white/index.css';
        head.appendChild(link);
    };

    io_connect( function() 
    {
        global.loadResources(['./html/assets/javascript/index/component.js'], () => {
            global.loadResources(['./html/assets/javascript/index/creating_page.js'], () => {
                global.loadResources(['./html/assets/javascript/index/invester_data.js'], () => {
                    global.loadResources(['./html/assets/javascript/index/show_all_projects.js'], () => {
                        global.loadResources(['./html/assets/javascript/index/get_money_abstraction.js'], () => {
                            global.loadResources(['./html/assets/javascript/index/obligations.js'], () => {
                                global.loadResources(['./html/assets/javascript/index/payments_new.js'], () => {
                                    global.loadResources(['./html/assets/javascript/index/telegram_authorization.js'], () => {
                                        global.loadResources(['./html/assets/javascript/index/chat.js'], () => {
                                            global.loadResources(['./html/assets/javascript/index/not_correct.js'], () => {
                                                global.loadResources(['./html/assets/javascript/index/put_file.js'], () => {
                                                    global.loadResources(['./html/assets/javascript/index/applications.js'], () => {
                                                        Main();
                                                    });
                                                });
                                            });
                                        });
                                    });
                                });
                            });
                        });
                    });
                }); 
            }); 
        });    
    });

    async function Main()
    {
        var pageID                      = _GET('page');
        var userID                      = _GET('user');
        var token                       = _getCookie('token');

        const user_block                = new global.Components.user_block();
        const activ_projects            = new global.Components.activ_projects();
        const acceptPays                = new global.Components.acceptPays();
        const chat                      = new global.Components.chat();
        const pay_investors             = new global.Components.pay_investors();
        const myProjects                = new global.Components.myProjects();
        const signature                 = new global.Components.signature();
        const Attracted_by_me           = new global.Components.Attracted_by_me();
        const reward                    = new global.Components.reward();
        const ref_url                   = new global.Components.ref_url();
        const show_all_projects         = new global.Components.show_all_projects();
        const get_money_abstraction     = new global.Components.get_money_abstraction();
        const invester_data             = new global.Components.invester_data();
        const creating_page             = new global.Components.creating_page();
        const wait_projects             = new global.Components.wait_projects();
        const obligations               = new global.Components.obligations();
        const payments_new              = new global.Components.payments_new();
        const telegram_authorization    = new global.Components.telegram_authorization();
        const not_correct               = new global.Components.not_correct();
        const put_file                  = new global.Components.put_file();
        const applications              = new global.Components.applications();

        if(!userID) 
        {
            if(_GET("hash"))
            {
                if(_GET("id"))
                {
                    var userData = 
                    {
                        id: _GET("id"),
                        first_name: decodeURI(_GET("first_name")),
                        last_name: decodeURI(_GET("last_name")),
                        username: decodeURI(_GET("username")),
                    }

                    if(!userData.id)
                    {
                        window.close();
                        return;
                    }
                    else
                    {
                        var NeedToken = await callApi({
                            methodName: "telegram_auth_getToken",
                            data: userData,
                        });
                        setCookie("token", NeedToken);
                    }
                }
            }
            else
            {
                if(!token) 
                {
                    if(pageID != "telegram_authorization")
                    {
                        location.href = "https://invester-relocation.site/?page=telegram_authorization";
                        return;
                    } else {
                        telegram_authorization.render();
                        $('.preloader').fadeOut( function() {
                            $(this).remove();
                        })
                        return;
                    }
                }
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
            var _User           = await user_block.render(_id);
            global.allData.User = _User;


            if(!_User)
            {
                return;
            };

            if(typeof _User.acceptGetDataOfUser == "undefined")
            {
                // var templateText = $(`
                //     <div class="autch_block">
                //         <div class="autch_block_row">
                //             <p>Вы даете согласие на сбор сведений об инвестициях в вашем личном кабинете?.</p>
                //             <div class="autch_block_buttons">
                //                 <div class="autch_block_buttons_block autch_block_buttons_block_close">
                //                     <span>Отказать</span>
                //                 </div>
                //                 <div class="autch_block_buttons_block autch_block_buttons_block_accept">
                //                     <span>Принять</span>
                //                 </div>
                //             </div>
                //         </div>
                //     </div>
                // `);

                // templateText.find('.autch_block_buttons_block_close').click( function() {
                //     location.reload();
                // });
    
                // templateText.find('.autch_block_buttons_block_accept').click( async function() {
                //     $('.autch_block').remove();
                //     await callApi({
                //         methodName: "version2_setUserAlertsOfacceptGetDataOfUser",
                //         data: _id,
                //     });
                // })

                // $('body').append(templateText);
            }

            var renderPage = 
            {
                "profil": function() {profil_page.render(global.allData)},
                "activ_projects": function() {
                    alert('ok3');
                    if(!_GET('id')) {
                        activ_projects.render(global.allData);
                    } else {
                        if(_GET("hash"))
                        {
                            activ_projects.render(global.allData);
                        }
                        else
                        {
                            activ_projects.renderType(global.allData);
                        }
                    }
                },
                "acceptPays": function() {acceptPays.render(global.allData)},
                "chats": function() {chat.render(global.allData)},
                "pay_investors": function() {pay_investors.render(global.allData)},
                "myProjects": function() {
                    if(!_GET('id')) 
                    {
                        myProjects.render(global.allData)
                    } else {
                        if(_GET("hash"))
                        {
                            myProjects.render(global.allData)
                        }
                        else
                        {
                            myProjects.renderType(global.allData)
                        }
                    }
                },
                "signature": function() {signature.render(global.allData)},
                "Attracted_by_me": function() {Attracted_by_me.render(global.allData)},
                "reward": function() {reward.render(global.allData)},
                "creating": function() {creating_page.render(global.allData)},
                "ref_url": function() {ref_url.render(global.allData)},
                "invester_data": function() {invester_data.render(global.allData)},
                "show_all_projects": function() {show_all_projects.render(global.allData)},
                "get_money_abstraction": function() {get_money_abstraction.render(global.allData)},
                "wait_projects": function() {wait_projects.render(global.allData)},
                "obligations": function() {obligations.render(global.allData)},
                "payments_new": function() {payments_new.render(global.allData)},
                "telegram_authorization": function() {telegram_authorization.render(global.allData)},
                "not_correct": function() {not_correct.render(global.allData)},
                "put_file": function() {put_file.render(global.allData)},
                "applications": function() {applications.render(global.allData)},
            }

            if(pageID)
            {
                renderPage[pageID]();
            } else 
            {
                renderPage["chats"]();
            }

            $('.preloader').fadeOut();
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
                location.href = "/?page=chats";
            })
        })()    
    }

}(window))