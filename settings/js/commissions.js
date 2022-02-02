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

    class commissions
    {
        constructor() {};
        
        async render()
        {
            var commissionsData = await callApi({
                methodName: "commissions_settings",
                data: null,
            });

            var templateText = $(`
                <div class="settingBlock">
                    <div class="settingBlock_header">
                        <p>Ожидают подтверждения</p>
                        <div class="settingBlock_header_line">
                            <span>#</span>
                            <span>Номер проекта</span>
                            <span>Инвестор</span>
                            <span>Сумма Инвестиции</span>
                            <span>Комиссия InvestER</span>
                            <span>Действие</span>
                            <span>Сообщение</span>
                        </div>
                    </div>
                    <div class="settingBlock_body">
                       
                    </div>
                </div>
            `);

            templateText.css('width', 'calc(92% - 40px');
            templateText.css('margin', '0 auto');

            commissionsData.wait.forEach( function (commissionsElement, i) 
            {
                var fioBlock = null;

                commissionsElement.invDoc.data.data.forEach(commissionsElementInvDataElement => {
                    if(commissionsElementInvDataElement._id == "fio")
                    {
                        fioBlock = commissionsElementInvDataElement.data;
                    }
                })

                var _block = $(`
                    <div class="settingBlock_body_line" data="${commissionsElement.commission._id}">
                        <span>${i + 1}</span>
                        <span>${commissionsElement.project._id}</span>
                        <span>${fioBlock}</span>
                        <span>${commissionsElement.invDoc.data.pay.toString().ReplaceNumber()}</span>
                        <span>${commissionsElement.commissionInvestER}</span>
                        <span>Подтвердить</span>
                        <span>Написать</span>
                    </div>
                `);

                templateText.find('.settingBlock_body').append(_block);
            })

            $('.index_page_body_data').append(templateText);

            var templateText = $(`
                <div class="settingBlock">
                    <div class="settingBlock_header">
                        <p>Подтвержденные</p>
                        <div class="settingBlock_header_line">
                            <span>#</span>
                            <span>Номер проекта</span>
                            <span>Инвестор</span>
                            <span>Сумма Инвестиции</span>
                            <span>Комиссия InvestER</span>
                            <span>Действие</span>
                            <span>Сообщение</span>
                        </div>
                    </div>
                    <div class="settingBlock_body">
                       
                    </div>
                </div>
            `);

            templateText.css('width', 'calc(92% - 40px');
            templateText.css('margin', '0 auto');

            commissionsData.accept.forEach( function (commissionsElement, i) 
            {
                var fioBlock = null;

                commissionsElement.invDoc.data.data.forEach(commissionsElementInvDataElement => {
                    if(commissionsElementInvDataElement._id == "fio")
                    {
                        fioBlock = commissionsElementInvDataElement.data;
                    }
                })

                var _block = $(`
                    <div class="settingBlock_body_line" data="${commissionsElement.commission._id}">
                        <span>${i + 1}</span>
                        <span>${commissionsElement.project._id}</span>
                        <span>${fioBlock}</span>
                        <span>${commissionsElement.invDoc.data.pay.toString().ReplaceNumber()}</span>
                        <span>${commissionsElement.commissionInvestER}</span>
                        <span>Подтвердить</span>
                        <span>Написать</span>
                    </div>
                `);

                templateText.find('.settingBlock_body').append(_block);
            })

            $('.index_page_body_data').append(templateText);
        }
    }

    var components = {
        commissions,
    };

    if(!global.Components) { global.Components = components; } 
    else { 
        for(var key in components)
        {
            global.Components[key] = components[key];
        }
    }

}(window))