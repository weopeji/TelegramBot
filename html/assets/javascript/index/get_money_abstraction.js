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

    class get_money_abstraction
    {
        constructor() {};

        async render()
        {
            var allPayments     = await callApi({
                methodName: "allPayments",
                data:  global.allData._id,
            });

            console.log(allPayments);

            var _button = $(`
                <div class="get_money_abstraction_button">
                    <span>Запросить</span>
                </div>
            `);

            $('.index_page_body_data').append(_button);

            var settingBlock = $(`
                <div class="settingBlock">
                    <div class="settingBlock_header">
                        <p>Статистика ваших выплат</p>
                        <div class="settingBlock_header_line">
                            <span>Номер</span>
                            <span>ID Проекта/Инвестора</span>
                            <span>Сумма выплаты</span>
                            <span>Запрос</span>
                        </div>
                    </div>
                    <div class="settingBlock_body">

                    </div> 
                </div>
            `);

            settingBlock.css("margin-top", "20px");

            var i = 1;
            for(var element of allPayments)
            {
                var _pay = 0;

                if(element.type == "investing")
                {
                    _pay = element.pay * 0.0875;
                } else {
                    _pay = element.pay * 0.0375;
                }

                var template_text = $(`
                    <div class="settingBlock_body_line">
                        <span class="get_money_abstraction_span_cheackbox">${i}</span>
                        <span>${element.data._id}</span>
                        <span>${_pay}</span>
                        <span><input type="checkbox" name="" id="${element._id}"></span>
                    </div>
                `);

                settingBlock.find('.settingBlock_body').append(template_text);

                i++;
            }

            $('.index_page_body_data').append(settingBlock);
        }
    }

    var components = {
        get_money_abstraction,
    };

    if(!global.Components) { global.Components = components; } 
    else { 
        for(var key in components)
        {
            global.Components[key] = components[key];
        }
    }

}(window))