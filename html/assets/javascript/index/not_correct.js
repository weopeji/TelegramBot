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

    class not_correct
    {
        constructor() {};

        async render()
        {
            var _data = await callApi({
                methodName: "not_correct",
                data: global.allData._id,
            });

            var settingBlock = $(`
                <div class="settingBlock">
                    <div class="version2_settingBlock_header">
                        <p>Отказанные инвестиции</p>
                    </div>
                    <div class="version2_default_bkg row_default"></div>
                    <div class="settingBlock_header">
                        <div class="settingBlock_header_line">
                            <span>*</span>
                            <span>Название проекта</span>
                            <span>Причина отказа</span>
                            <span>Коментарий</span>
                            <span>Статус</span>
                            <span>*</span>
                        </div>
                    </div>
                    <div class="settingBlock_body">

                    </div>
                </div>
            `);

            _data.forEach(function(element, i) 
            {
                var typePush =
                {
                    "spam": "Спам",
                    "money": "Оплата не поступила",
                    "not_correct": "Данные не верны"
                };

                var typeButtins =
                {
                    "spam": function() 
                    {
                        var actionBlock = $(`
                            <div class="settingBlock_body_line_not_correct_complaint">
                                <span>Оставить жалобу</span>
                            </div>
                        `);

                        actionBlock.click( async function() 
                        {
                            var invId = $(this).parent().parent().attr('data-id');

                            note({
                                content: "Успешно!",
                                type: "info",
                                time: 2,
                            });

                            $(this).parent().parent().children('span').eq(3).html('<span style="color: green; width: fit-content;">Ожидает модерации</span>');
                            $(this).remove();
        
                            await callApi({
                                methodName: "not_correct_complaint",
                                data: invId,
                            });
                        });

                        return actionBlock;
                    },
                    "not_correct": function() 
                    {
                        var actionBlock = $(`
                            <div class="settingBlock_body_line_not_correct_again">
                                <span>Заполнить заного</span>
                            </div>
                        `);

                        actionBlock.click( async function() 
                        {
                            var IdInv = $(this).parent().parent().attr('data-id');

                            note({
                                content: "Успешно!",
                                type: "info",
                                time: 2,
                            });

                            $(this).parent().parent().children('span').eq(3).html('<span style="color: green; width: fit-content;">На перезаполнении</span>');
                            $(this).remove();
        
                            await callApi({
                                methodName: "not_correct_complaint_again",
                                data: IdInv,
                            });
                        });

                        return actionBlock;
                    },
                    "money": function() 
                    {
                        var actionBlock = $(`
                            <div class="settingBlock_body_line_not_correct_msg">
                                <span>Перейти к диалогу</span>
                            </div>
                        `);

                        actionBlock.click( function() {
                            window.open(`/?page=chats&id=${$(this).parent().parent().attr('data-id')}`, '_blank');
                        });

                        return actionBlock;
                    },
                };

                var template_text = $(` 
                    <div class="settingBlock_body_line" data-id="${element.Inv._id}">
                        <span>
                            <div class="version2_settingBlock_mobile_line">
                                <span>№</span>
                            </div>
                            ${i + 1}
                        </span>
                        <span>
                            <div class="version2_settingBlock_mobile_line">
                                <span>Название проекта</span>
                            </div>
                            ${element.Project.data.name}
                        </span>
                        <span>
                            <div class="version2_settingBlock_mobile_line">
                                <span>Причина отказа</span>
                            </div>
                            ${typePush[element.Inv.not_correct.dataType]}
                        </span>
                        <span>
                            <div class="version2_settingBlock_mobile_line">
                                <span>Коментарий</span>
                            </div>
                            ${element.Inv.not_correct.comment}
                        </span>
                        <span>
                            <div class="version2_settingBlock_mobile_line">
                                <span>Статус</span>
                            </div>
                            Ожидает действия инвестора
                        </span>
                        <span>
                            <div class="version2_settingBlock_mobile_line">
                                <span>*</span>
                            </div>
                        </span>
                    </div>
                `);

                template_text.children('span').eq(5).append(typeButtins[element.Inv.not_correct.dataType]);

                if(typeof element.Inv.not_correct_complaint != "undefined")
                {
                    template_text.children('span').eq(5).children().remove();

                    if(element.Inv.not_correct_complaint)
                    {
                        template_text.children('span').eq(3).html('<span style="color: green; width: fit-content;">Ожидает модерации</span>');
                    }
                    else
                    {
                        template_text.children('span').eq(3).html('<span style="color: red; width: fit-content;">Отказано администрацией</span>');
                    };
                };

                template_text.children('span').eq(0).click( function() {
                    location.href = `https://invester-relocation.site/?page=activ_projects&id=${$(this).parent().attr('data-id')}`;
                });
                template_text.children('span').eq(1).click( function() {
                    location.href = `https://invester-relocation.site/?page=activ_projects&id=${$(this).parent().attr('data-id')}`;
                });
                template_text.children('span').eq(2).click( function() {
                    location.href = `https://invester-relocation.site/?page=activ_projects&id=${$(this).parent().attr('data-id')}`;
                });
                template_text.children('span').eq(3).click( function() {
                    location.href = `https://invester-relocation.site/?page=activ_projects&id=${$(this).parent().attr('data-id')}`;
                });

                settingBlock.find('.settingBlock_body').append(template_text);
            });

            $('.index_page_body_data').append(settingBlock);
        }
    }

    var components = {
        not_correct,
    };

    if(!global.Components) { global.Components = components; } 
    else { 
        for(var key in components)
        {
            global.Components[key] = components[key];
        }
    }

}(window))