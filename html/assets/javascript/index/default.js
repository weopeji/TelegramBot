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

    async function set_back_button()
    {
        $('.index_page_body_header_user_textDecoration').preappend($(`
            <div class="index_page_body_header_user_textDecoration_backButton">
                <i class="fal fa-chevron-left"></i>
            </div>
        `).click( function() {
            var historyPages = $.cookie('history_pages');
            if(
                historyPages &&
                JSON.parse(historyPages).length >= 2
            ) 
            {
                location.href = JSON.parse(historyPages)[JSON.parse(historyPages).length - 2];
            };
        }));

        $('.index_page_body_header_user_textDecoration span').css({
            "margin-left": "10px",
        });
    };

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
        var _id                         = _getCookie('token');

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
                        location.href = "https://investir.one/?page=telegram_authorization";
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
        };

        global.allData = 
        {
            _id: _id,
            pageID: pageID,
            history_pages: user_block.history_pages(),
        };

        if(_id) 
        {
            var _User           = await user_block.render(_id);
            global.allData.User = _User;

            if(!_User)
            {
                return;
            };

            if(typeof _User.block !== 'undefined')
            {
                var templateText = $(`
                    <div class="blocked_block">
                        <span>Ваш Аккаунт заблокирован</span>
                    </div>
                `);

                $('body').append(templateText); 
                return;
            }

            var renderPage = 
            {
                "profil": function() {
                    try {
                        $('.index_page_body_header_user_textDecoration span').html("Профиль");
                    } catch(e) {};
                    
                    profil_page.render(global.allData)
                },
                "activ_projects": function() 
                {
                    try {
                        $('.index_page_body_header_user_textDecoration span').html("Главная");
                    } catch(e) {};

                    try {
                        if(!_GET('id')) 
                        {
                            activ_projects.render(global.allData);
                        } else {
                            if(_GET("hash"))
                            {
                                if(_GET("idInv"))
                                {
                                    activ_projects.renderType(global.allData);
                                    set_back_button();
                                }
                                else
                                {
                                    activ_projects.render(global.allData);
                                }
                            }
                            else
                            {
                                activ_projects.renderType(global.allData);
                                set_back_button();
                            }
                        }
                    } 
                    catch(e)
                    {
                        alert(e.toString());
                    }
                },
                "acceptPays": function() {
                    try {
                        $('.index_page_body_header_user_textDecoration span').html("Поступления");
                    } catch(e) {};

                    acceptPays.render(global.allData)
                },
                "chats": function() {
                    try {
                        $('.index_page_body_header_user_textDecoration span').html("Чаты");
                    } catch(e) {};

                    chat.render(global.allData)
                },
                "pay_investors": function() {
                    try {
                        $('.index_page_body_header_user_textDecoration span').html("");
                    } catch(e) {};

                    pay_investors.render(global.allData)
                },
                "myProjects": function() {
                    try {
                        $('.index_page_body_header_user_textDecoration span').html("Мои проекты");
                    } catch(e) {};

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
                "signature": function() {
                    signature.render(global.allData)
                },
                "Attracted_by_me": function() {
                    try {
                        $('.index_page_body_header_user_textDecoration span').html("Привлечено");
                    } catch(e) {};

                    Attracted_by_me.render(global.allData)
                },
                "reward": function() {reward.render(global.allData)},
                "creating": function() {creating_page.render(global.allData)},
                "ref_url": function() {ref_url.render(global.allData)},
                "invester_data": async function() {
                    await invester_data.render(global.allData)
                },
                "show_all_projects": function() {show_all_projects.render(global.allData)},
                "get_money_abstraction": function() {get_money_abstraction.render(global.allData)},
                "wait_projects": function() {
                    try {
                        $('.index_page_body_header_user_textDecoration span').html("Ожидают");
                    } catch(e) {};

                    wait_projects.render(global.allData)
                },
                "obligations": function() {obligations.render(global.allData)},
                "payments_new": function() {
                    try {
                        $('.index_page_body_header_user_textDecoration span').html("Выплаты");
                    } catch(e) {};

                    payments_new.render(global.allData)
                },
                "telegram_authorization": function() {telegram_authorization.render(global.allData)},
                "not_correct": function() {
                    try {
                        $('.index_page_body_header_user_textDecoration span').html("Отказано");
                    } catch(e) {};

                    not_correct.render(global.allData)
                },
                "put_file": function() {put_file.render(global.allData)},
                "applications": function() {
                    try {
                        $('.index_page_body_header_user_textDecoration span').html("Заявки");
                    } catch(e) {};

                    applications.render(global.allData)
                },
                "telegram": function() {
                    window.location = "tg:\/\/resolve?domain=investir_official";
                },
            };

            if(pageID) {
                await renderPage[pageID]();
            } else {
                await renderPage["chats"]();
            }

            if(pageID == "invester_data") {
                setTimeout(() => {
                    $('.preloader').fadeOut();
                }, 1000);
            } else {
                $('.preloader').fadeOut();
            };
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

            $('.menu_reload_type_menu_line').click( async function() 
            {
                await callApi({
                    methodName: "reload_type",
                    data: {
                        type: $(this).attr('data'),
                        _id: global.allData._id,
                    },
                });
                location.href = "/?page=chats";
            })
        })()    
    }

}(window))