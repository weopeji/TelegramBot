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

    class payments_new
    {
        constructor() {};

        async render()
        {
            var _data = await callApi({
                methodName: "ALL_DATA",
                data: global.allData.User._id,
            });

            var settingBlock = $(`
                <div class="settingBlock">
                    <div class="settingBlock_header">
                        <p>Выплаты</p>
                        <div class="settingBlock_header_line">
                            <span>№</span>
                            <span>Дата выплаты</span>
                            <span>Сумма</span>
                            <span>№ Договора</span>
                            <span>Инвестор</span>
                            <span>Реквезиты</span>
                        </div>
                    </div>
                    <div class="settingBlock_body">

                    </div>
                </div>
            `);

            _data.payments_new.showBlocks.forEach(function(element, i) 
            {
                var template_text = `
                    <div class="settingBlock_body_line" data="${element._id}">
                        <span>${i + 1}</span>
                        <span>${DateFormatted(element.date)}</span>
                        <span>${element.invPay.pay.toString().ReplaceNumber()} руб</span>
                        <span>${element.inv.projectId}/${element.initNumberProject} от ${DateFormatted(element.inv.date)}</span>
                        <span>${element.InvesterOfInvs.first_name}</span>
                        <span>Посмотреть</span>
                    </div>
                `;

                settingBlock.find('.settingBlock_body').append(template_text);
            })

            $('.index_page_body_data').append(settingBlock);
        }
    }

    var components = {
        payments_new,
    };

    if(!global.Components) { global.Components = components; } 
    else { 
        for(var key in components)
        {
            global.Components[key] = components[key];
        }
    }

}(window))