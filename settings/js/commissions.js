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
                    <div class="version2_settingBlock_header">
                        <p>Ожидают подтверждения</p>
                    </div>
                    <div class="version2_default_bkg row_default"></div>
                    <div class="settingBlock_header">
                        <div class="settingBlock_header_line">
                            <span>Номер проекта</span>
                            <span>Название проекта</span>
                            <span>Инвестор</span>
                            <span>Сумма Инвестиции</span>
                            <span>Комиссия InvestER</span>
                            <span>Чек</span>
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
                    <div class="settingBlock_body_line" data="${commissionsElement.commission._id}" data-project="${commissionsElement.project._id}">
                        <span>${commissionsElement.project._id}</span>
                        <span>${commissionsElement.project.data.name}</span>
                        <span>${fioBlock}</span>
                        <span>${commissionsElement.invDoc.data.pay.toString().ReplaceNumber()} руб</span>
                        <span>${commissionsElement.commissionInvestER.toString().ReplaceNumber()} руб</span>
                        <span class="settingBlock_body_line_shower"><a target="_blank" href="https://investir.one/projects/${commissionsElement.invDoc.projectId}/${commissionsElement.commission.recipient}">Посмотреть</a></span>
                        <span class="settingBlock_body_line_button">Подтвердить</span>
                        <span><a href="google.com">Написать</a></span>
                    </div>
                `);

                _block.children('span').eq(1).click( function() {
                    location.href = `/settings/?page=block&id=${$(this).parent().attr('data-project')}&more=redacting`;
                });

                _block.find(".settingBlock_body_line_button").click( async function() {
                    await callApi({
                        methodName: "commissions_settings_accept",
                        data: $(this).parent().attr('data'),
                    });
                    alert('Успешно!');
                    location.reload();
                })

                templateText.find('.settingBlock_body').append(_block);
            })

            $('.index_page_body_data').append(templateText);

            var templateText = $(`
                <div class="settingBlock">
                    <div class="version2_settingBlock_header">
                        <p>Подтвержденные</p>
                    </div>
                    <div class="version2_default_bkg row_default"></div>
                    <div class="settingBlock_header">
                        <div class="settingBlock_header_line">
                            <span>Номер проекта</span>
                            <span>Название проекта</span>
                            <span>Инвестор</span>
                            <span>Сумма Инвестиции</span>
                            <span>Комиссия InvestER</span>
                            <span>Чек</span>
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
            templateText.css('margin-top', '20px');

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
                    <div class="settingBlock_body_line" data="${commissionsElement.commission._id}" data-project="${commissionsElement.project._id}">
                        <span>${commissionsElement.project._id}</span>
                        <span>${commissionsElement.project.data.name}</span>
                        <span>${fioBlock}</span>
                        <span>${commissionsElement.invDoc.data.pay.toString().ReplaceNumber()} руб</span>
                        <span>${commissionsElement.commissionInvestER.toString().ReplaceNumber()} руб</span>
                        <span class="settingBlock_body_line_shower"><a target="_blank" href="https://investir.one/projects/${commissionsElement.invDoc.projectId}/${commissionsElement.commission.recipient}">Посмотреть</a></span>
                        <span class="settingBlock_body_line_button">Отказать</span>
                        <span><a href="google.com">Написать</a></span>
                    </div>
                `);

                _block.children('span').eq(1).click( function() {
                    location.href = `/settings/?page=block&id=${$(this).parent().attr('data-project')}&more=redacting`;
                });

                _block.find(".settingBlock_body_line_button").click( async function() {
                    await callApi({
                        methodName: "commissions_settings_close",
                        data: $(this).parent().attr('data'),
                    });
                    alert('Успешно!');
                    location.reload();
                })

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