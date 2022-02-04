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

        async addScript()
        {
            var script = document.createElement('script');
            script.src = "https://telegram.org/js/telegram-widget.js"
            script.setAttribute("data-telegram-login", "invester_official_bot");
            script.setAttribute("data-size", "large");
            script.setAttribute("data-radius", "20");
            script.setAttribute("data-onauth", "onTelegramAuth(user)");
            script.setAttribute("data-request-access", "write");

            $(".telegram_authorization_buttons").append(script);
        }

        async renderBody()
        {
            var bodyBlock = 
            $(`
                <div class="telegram_authorization">
                    <div class="telegram_authorization_row">
                        <div class="telegram_authorization_image">
                            <i class="fab fa-telegram-plane"></i>
                        </div>
                        <div class="telegram_authorization_text">
                            <h1>investER запрашивает доступ через Telegram</h1>
                            <p>Нам будут известны Ваши имя, публичная ссылка и фотография.</p>
                        </div>
                        <div class="telegram_authorization_buttons">

                        </div>
                    </div>
                </div>
            `);

            $('.index_page_body_data').append(bodyBlock);
        }

        async waitloadScript()
        {
            return new Promise((resolve,reject) =>
            {
                function waitForElm(selector) {
                    return new Promise(resolve => {
                        if (document.querySelector(selector)) {
                            return resolve(document.querySelector(selector));
                        }
                
                        const observer = new MutationObserver(mutations => {
                            if (document.querySelector(selector)) {
                                resolve(document.querySelector(selector));
                                observer.disconnect();
                            }
                        });
                
                        observer.observe(document.body, {
                            childList: true,
                            subtree: true
                        });
                    });
                }

                waitForElm('#telegram-login-invester_official_bot').then((elm) => {
                    resolve();
                });
            })
        }

        async TelegramCallback()
        {
            return new Promise(async (resolve,reject) =>
            {
                global.Telegram.Login.auth(
                    { bot_id: '2062839693', request_access: true },
                    (data) => {
                        resolve(data);
                    }
                );
            });
            // global.onTelegramAuth = (user) => {
            //     console.log(user);
            //     alert('Logged in as ' + user.first_name + ' ' + user.last_name + ' (' + user.id + (user.username ? ', @' + user.username : '') + ')');
            // };
        }

        async getUserFun(callback)
        {
            var statusCheack = await this.TelegramCallback();

            if(statusCheack)
            {
                this.telegramData = statusCheack;
                callback(true);
            } else {
                alert('Чтобы продолжить, вы должны авторизоваться');
                this.getUserFun(callback);
            }
        };

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
                    await _this.addScript();
                    await _this.waitloadScript();
                    _this.getUserFun( function() {
                        resolve(true);
                    })   
                }
            });
        }

        async render()
        {
            await this.renderStyles();
            await this.renderBody();

            var _User       = await this.getUser();
            var _PageType   = _GET("type");

            console.log(this.telegramData);
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