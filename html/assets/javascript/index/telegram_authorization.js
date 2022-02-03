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

                document.head.append(script);
    
                script.onload = function() {
                    resolve();
                }
            });
        }

        async render()
        {
            await this.renderStyles();
            await this.addScript();
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