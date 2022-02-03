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
        constructor() {};

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

            $('.index_page_body_header_info span').html("Telegram Авторизация");
        }

        async addScript()
        {
            return new Promise((resolve,reject) =>
            {
                var script = document.createElement('script');
                script.src = "https://telegram.org/js/telegram-widget.js?15"
                script.setAttribute("data-telegram-login", "invester_official_bot");
                script.setAttribute("data-size", "large");
                script.setAttribute("data-radius", "20");
                script.setAttribute("data-onauth", "onTelegramAuth(user)");
                script.setAttribute("data-request-access", "write");

                $('.telegram_authorization_buttons').append(script);
    
                script.onload = function() {
                    resolve();
                }
            });
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

        async TelegramCallback()
        {
            global.onTelegramAuth(user) {
                alert('Logged in as ' + user.first_name + ' ' + user.last_name + ' (' + user.id + (user.username ? ', @' + user.username : '') + ')');
            }
        }

        async render()
        {
            await this.renderStyles();
            await this.renderBody();
            await this.addScript();
            await this.TelegramCallback();
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