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
            var tamplateText = $(`
                <div class="creating_page_start">
                    <span>
                        Добро пожаловать в мастер создания проекта! <br>
                        Введите свой инн для продолжения...
                    </span>
                </div>
            `);

            this.global.append(tamplateText);
        }

        async render() 
        {
            this.defaultCSS();    
            this.startDefault();

            $('.index_page_body_data').append(this.global);
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