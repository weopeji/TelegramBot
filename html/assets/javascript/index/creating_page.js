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

    class creating_page
    {
        constructor() 
        {
            this.global = $(`
                <div class="creating_page"></div>
            `);
        };

        defaultCSS()
        {
            $('.index_page_menu').css({
                "flex": "none",
                "position": "absolute",
                "margin-left": "-100%",
            });

            $('.index_page_body_header_info').css({
                "justify-content": "center",
            });

            $('.index_page_body_header_info span').html("СОЗДАНИЕ ПРОЕКТА");
        }

        async startDefault()
        {
            var msgsBlock = $(`
                <div class="creating_page_block">
                    <div class="creating_page_start">
                        <span>
                            Добро пожаловать в мастер создания проекта! <br>
                            Введите свой инн для продолжения...
                        </span>
                    </div>
                </div>
            `);

            var inputText = $(`
                <div class="creating_page_input">
                    <input type="text">
                    <div class="creating_page_input_button">
                        <span>Отправить</span>
                    </div>
                </div>
            `);

            this.global.append(msgsBlock);
        }

        async startAnimation()
        {
            $('.creating_page_start').animate("opacity", "1");
        }

        async render() 
        {
            this.defaultCSS();    
            this.startDefault();

            $('.index_page_body_data').append(this.global);

            this.startAnimation();
        }
    }

    var components = {
        creating_page,
    };

    if(!global.Components) { global.Components = components; } 
    else { 
        for(var key in components)
        {
            global.Components[key] = components[key];
        }
    }

}(window))