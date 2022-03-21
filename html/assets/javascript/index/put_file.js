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
            var _this           = this;
            var functionsAction = 
            {
                "investingNotFullNull": async function()
                {
                    var _project = await callApi({
                        methodName: "getProjectForInvesterPageByIdInvDoc",
                        data: _GET('InvId'),
                    });

                    var msgsBlock = $(`
                        <div class="creating_page_block">
                            <div class="creating_page_start" style="margin-bottom: 20px">
                                <span>
                                    Уважаемый Инвестор ${global.allData.User.first_name} прикреите чек за инвестицию по реквезитам</a>.<br><br>
                                    Банк-получатель: ${_project.data.bank} <br>
                                    Корр. счет: ${_project.data.account_correct} <br>
                                    БИК: ${_project.data.bik} <br>
                                    КПП: ${_project.data.kpp} <br>
                                    Получатель: ${_project.data.recipient} <br>
                                    Счет получателя: ${_project.data.account_get} <br>
                                    Назначение платежа: Номер Проекта ${_project._id}, Имя проекта ${_project.data.name} <br>
                                </span>
                            </div>
                        </div>
                    `);

                    var documentBlock = $(`
                        <div class="creating_page_input">
                            <div class="creating_page_input_div">
                                <span>Прикрепить</span>
                            </div>
                        </div>
                    `);

                    _this.global.append(msgsBlock);
                    _this.global.append(documentBlock);
                },
            };

            if(typeof functionsAction[getAction] != "undefined")
            {
                await functionsAction[getAction]();
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