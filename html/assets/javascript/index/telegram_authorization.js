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
                            <h1>investiR запрашивает доступ через Telegram</h1>
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
            return new Promise(async (resolve,reject) =>
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
                    resolve(NeedToken);
                }
            });
        }

        async render()
        {
            await this.renderStyles();
            await this.renderBody();

            var _PageType   = _GET("type");
            var _token      = await this.getUser();
            var timeRender  = 500;

            var funsType = {
                "recomendation": async function()
                {
                    return new Promise(async (resolve,reject) =>
                    {
                        var protoUrl    = "tg:\/\/resolve?domain=invester_official_bot";

                        setTimeout( async function() {
                            callApi({
                                methodName: "telegram_auth_recomendation",
                                data: {
                                    projectId: _GET("userId"),
                                    userId: _token,
                                },
                            });
                            window.location = protoUrl;
                            
                            resolve();
                        }, timeRender);
                    })
                },
                "more": async function()
                {
                    return new Promise(async (resolve,reject) =>
                    {
                        var protoUrl    = "tg:\/\/resolve?domain=invester_official_bot";

                        var moreData = await callApi({
                            methodName: "telegram_auth_more",
                            data: {
                                projectId: _GET("userId"),
                                userId: _token,
                            },
                        });

                        if(moreData == "error")
                        {
                            setTimeout( async function() {
                                window.location = protoUrl;
                                resolve();
                            }, timeRender);
                        }
                        else
                        {
                            if(moreData.type == "location") {
                                location.href = `https://${moreData.data.url}/?user=${moreData.data.userId}&page=invester_data`;
                            }
                            else {
                                location.href = `/?user=${moreData.data.userId}&page=invester_data`;
                            }
                        };
                    })
                },
                "recomendation_push": async function()
                {
                    return new Promise(async (resolve,reject) =>
                    {
                        var protoUrl    = "tg:\/\/resolve?domain=invester_official";

                        setTimeout( async function() {
                            callApi({
                                methodName: "telegram_recomendation_push",
                                data: {
                                    userId: _token,
                                    attraction: _GET("userId"),
                                },
                            });
                            window.location = protoUrl;
                            resolve();
                        }, timeRender);
                    });
                },
                "recomendation_push_b": async function()
                {
                    return new Promise(async (resolve,reject) =>
                    {
                        var protoUrl    = `https://investir.one/?user=${_token}&page=creating`;

                        setTimeout( async function() {
                            callApi({
                                methodName: "telegram_recomendation_push_b",
                                data: {
                                    userId: _token,
                                    attraction: _GET("userId"),
                                },
                            });
                            window.location = protoUrl;
                            resolve();
                        }, timeRender);
                    });
                },
                "cabinet": async function()
                {
                    return new Promise(async (resolve,reject) =>
                    {
                        var protoUrl    = "tg:\/\/resolve?domain=invester_official_bot";

                        setTimeout( async function() {
                            callApi({
                                methodName: "telegram_recomendation_cabinet",
                                data: {
                                    userId: _token,
                                },
                            });
                            window.location = protoUrl;
                            resolve();
                        }, timeRender);
                    });
                },
                "setInvestingPage": async function()
                {
                    return new Promise(async (resolve,reject) =>
                    {
                        window.location = `https://investir.one/?page=invester_data&user=${_GET("idUser")}`;
                    });
                }
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