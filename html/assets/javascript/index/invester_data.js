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

    class invester_data
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

            $('.index_page_body_header_info span').html("ЗАЯВКА НА ИНВЕСТИРОВАНИЕ ПРОЕКТА");
        }

        async render() 
        {
            this.defaultCSS();

            var msgsBlock = $(`
                <div class="creating_page_block">
                    <div class="creating_page_start" style="margin-bottom: 20px">
                        <span>
                            Уважаемый Инвестор.... вводя данные вы подтверждаете, что <br> ознакомились и принимаете все условия <a href="https://google.com">"Пользовательского соглашения"</a>.
                        </span>
                    </div>
                    <div class="creating_page_start">
                        <span>
                            Добро пожаловать в мастер Инвестиции в проект! <br>
                            На этом этапе вам необходимо  ознакомится с договором и внести данные для договора. Заполните данные, выберите нужный пункт 
                        </span>
                    </div>
                </div>
            `);

            var inputText = $(`
                <div class="creating_page_input">
                    <div class="creating_page_input_div">
                        <span>Юр. Лицо</span>
                    </div>
                    <div class="creating_page_input_div">
                        <span>Ип</span>
                    </div>
                    <div class="creating_page_input_div">
                        <span>Физ. Лицо</span>
                    </div>
                </div>
            `);

            var _this = this;

            inputText.find('.creating_page_input_button span').click( function (event) {
                _this.nextRender();
                return(false);
            });

            this.global.append(msgsBlock);
            this.global.append(inputText);

            $('.index_page_body_data').append(this.global);
        }
    }

    var components = {
        invester_data,
    };

    if(!global.Components) { global.Components = components; } 
    else { 
        for(var key in components)
        {
            global.Components[key] = components[key];
        }
    }

}(window))