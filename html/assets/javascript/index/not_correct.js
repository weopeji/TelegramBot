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
                    <div class="settingBlock_header">
                        <p>Отказанные инвестиции</p>
                        <div class="settingBlock_header_line">
                            <span>Название проекта</span>
                            <span>Причина отказа</span>
                            <span>Коментарий</span>
                            <span>Статус</span>
                            <span>Действие</span>
                            <span>Действие</span>
                        </div>
                    </div>
                    <div class="settingBlock_body">

                    </div>
                </div>
            `);

            _data.forEach(function(element, i) 
            {
                var otk = "Спам";

                if(element.Inv.not_correct.dataType != "spam")
                {
                    otk = "Данные не верны";
                };

                var template_text = $(` 
                    <div class="settingBlock_body_line" data-id="${element.Inv._id}">
                        <span>${element.Project.data.name}</span>
                        <span>${otk}</span>
                        <span>${element.Inv.not_correct.comment}</span>
                        <span>Ожидает действия</span>
                        <span>
                            <div class="settingBlock_body_line_not_correct_complaint">
                                <span>Оставить жалобу</span>
                            </div>
                        </span>
                        <span>
                            <div class="settingBlock_body_line_not_correct_again">
                                <span>Заполнить заного</span>
                            </div>
                        </span>
                    </div>
                `);

                template_text.children('span').eq(0).click( function() {
                    location.href = `https://invester-relocation.site/?page=activ_projects&id=${$(this).attr('data-id')}`;
                });
                template_text.children('span').eq(1).click( function() {
                    location.href = `https://invester-relocation.site/?page=activ_projects&id=${$(this).attr('data-id')}`;
                });
                template_text.children('span').eq(2).click( function() {
                    location.href = `https://invester-relocation.site/?page=activ_projects&id=${$(this).attr('data-id')}`;
                });
                template_text.children('span').eq(3).click( function() {
                    location.href = `https://invester-relocation.site/?page=activ_projects&id=${$(this).attr('data-id')}`;
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