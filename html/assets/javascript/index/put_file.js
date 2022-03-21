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

    class put_file
    {
        constructor()
        {
            this.global = $(`<div class="creating_page"></div>`);
        }

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

            $('.index_page_body_header_info span').html(`Прикрепить чек`);
        }

        async render()
        {
            this.defaultCSS();

            var getAction       = _GET("action");
            var functionsAction = 
            {
                "investingNotFullNull": function()
                {
                    var msgsBlock = $(`
                        <div class="creating_page_block">
                            <div class="creating_page_start" style="margin-bottom: 20px">
                                <span>
                                    Уважаемый Инвестор ${global.allData.User.first_name} превышен лимит инвестирования в данный пул, выберите другое предложение</a>.
                                </span>
                            </div>
                        </div>
                    `);

                    var documentBlock = $(`
                        <div class="creating_page_input">
                            <div class="creating_page_input_div">
                                <span>Выбрать</span>
                            </div>
                        </div>
                    `);

                    this.global.append(msgsBlock);
                    this.global.append(documentBlock);
                },
            };

            $('.index_page_body_data').append(this.global);
        };
    };

    var components = {
        put_file,
    };

    if(!global.Components) { global.Components = components; } 
    else { 
        for(var key in components)
        {
            global.Components[key] = components[key];
        }
    }

}(window))