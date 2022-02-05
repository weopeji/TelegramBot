(function (global) {
    "use strict";

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

    class telegram_authorization
    {
        constructor() {
            this.telegramData = null;
        };

        async renderStyles()
        {
            $('.index_page_menu').css({
                "flex": "none",
                "position": "absolute",
                "margin-left": "-100%",
            });

            $('.index_page_body_header_info').css({
                "justify-content": "center",
            });

            $('.index_page_body_header_user_avatar').remove();

            $('.index_page_body_header_info span').html("Telegram Авторизация");
        }

        async renderBody()
        {
            var bodyBlock = 
            $(`
                <div class="telegram_authorization">
                    <div class="telegram_authorization_row">
                        <a href="tg://resolve?domain=invester_official_bot" class="telegram_authorization_image">
                            <i class="fab fa-telegram-plane"></i>
                        </a>
                        <div class="telegram_authorization_text">
                            <h1>investER запрашивает доступ через Telegram</h1>
                        </div>
                        <div class="telegram_authorization_buttons">

                        </div>
                    </div>
                </div>
            `);

            $('.index_page_body_data').append(bodyBlock);
        }

        async getUser()
        {
            var _this = this;

            return new Promise(async (resolve,reject) =>
            {
                var _token = _getCookie('token');

                if(typeof _token != "undefined")
                {
                    resolve(true);
                } else
                {
                    resolve(false);
                }
            });
        }

        async render()
        {
            await this.renderStyles();
            await this.renderBody();

            var _User       = await this.getUser();
            var _PageType   = _GET("type");
            var _token      = _getCookie('token');
            var timeRender  = 1000;

            var funsType = {
                "recomendation": async function()
                {
                    return new Promise(async (resolve,reject) =>
                    {
                        var protoUrl = "tg:\/\/resolve?domain=invester_official_bot";

                        setTimeout( async function() {
                            if(_User)
                            {
                                callApi({
                                    methodName: "telegram_auth_recomendation",
                                    data: {
                                        projectId: _GET("userId"),
                                        userId: _token,
                                    },
                                });
                                window.location = protoUrl;
                            } else {
                                window.location = protoUrl + `&start=member_${_GET("userId")}`;
                            }
                            resolve();
                        }, timeRender);
                    })
                },
                "more": async function()
                {
                    return new Promise(async (resolve,reject) =>
                    {
                        var protoUrl = "tg:\/\/resolve?domain=invester_official_bot";

                        setTimeout( async function() {
                            if(_User)
                            {
                                callApi({
                                    methodName: "telegram_auth_more",
                                    data: {
                                        projectId: _GET("userId"),
                                        userId: _token,
                                    },
                                });
                                window.location = protoUrl;
                            } else {
                                window.location = protoUrl + `&start=project_${_GET("userId")}`;
                            }
                            resolve();
                        }, timeRender);
                    })
                },
            }

            if(_PageType)
            {
                await funsType[_PageType]();
            };
        }
    }

    var components = {
        telegram_authorization,
    };

    if(!global.Components) { global.Components = components; } 
    else { 
        for(var key in components)
        {
            global.Components[key] = components[key];
        }
    }

}(window))