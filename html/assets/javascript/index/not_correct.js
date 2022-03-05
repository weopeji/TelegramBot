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
                            <span>*</span>
                            <span>*</span>
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

                if(typeof element.Inv.not_correct_complaint != "undefined")
                {
                    if(element.Inv.not_correct_complaint)
                    {
                        template_text.children('span').eq(4).children().remove();
                        template_text.children('span').eq(5).children().remove();
                        template_text.children('span').eq(3).html('<span style="color: green; width: fit-content;">Ожидает модерации</span>');
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

                template_text.find('.settingBlock_body_line_not_correct_complaint').click( async function() 
                {
                    var IdInv = $(this).parent().parent().attr('data-id');

                    console.log($(this).parent().parent().children('span').eq(4).children())
                    console.log($(this).parent().parent().children('span').eq(5).children())

                    $(this).parent().parent().children('span').eq(4).children().remove();
                    $(this).parent().parent().children('span').eq(5).children().remove();

                    await callApi({
                        methodName: "not_correct_complaint",
                        data: IdInv,
                    });

                    note({
                        content: "Успешно!",
                        type: "info",
                        time: 3,
                    });

                    $(this).parent().parent().children('span').eq(3).html('<span style="color: green; width: fit-content;">Ожидает модерации</span>');
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