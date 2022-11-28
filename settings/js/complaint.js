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

    class complaint
    {
        constructor() {};
        
        async render()
        {
            var getComplaint = await callApi({
                methodName: "getComplaint",
                data: null,
            });

            var templateText = $(`
                <div class="settingBlock">
                     <div class="version2_settingBlock_mobile_line">
                        <span>Название</span>
                    </div>
                    <div class="version2_default_bkg row_default"></div>
                    <div class="settingBlock_header">
                        <div class="settingBlock_header_line">
                            <span>№</span>
                            <span>Название проекта</span>
                            <span>Инвестор</span>
                            <span>Сумма Инвестиции</span>
                            <span>*</span>
                            <span>Чат</span>
                            <span>*</span>
                        </div>
                    </div>
                    <div class="settingBlock_body">
                       
                    </div>
                </div>
            `);

            getComplaint.forEach((element, i) => 
            {
                var fio         = null;

                element.Inv.data.data.forEach(elementInv => {
                    if(elementInv._id == "fio")
                    {
                        fio = elementInv.data;
                    }
                });

                var _block = $(`
                    <div class="settingBlock_body_line" data-id="${element.Inv._id}">
                        <span>${i + 1}</span>
                        <span>${element.Project.data.name}</span>
                        <span>${fio}</span>
                        <span>${element.Inv.data.pay} ₽</span>
                        <span>
                            <div class="settingBlock_body_line_ComplaintSettings" data="user">
                                <i class="fal fa-user"></i>
                            </div>
                        </span>
                        <span>
                            <div class="settingBlock_body_line_ComplaintSettings" data="chat_invester">
                                <i class="fal fa-comment-alt-check"></i>
                            </div>
                        </span>
                        <span>
                            <div class="settingBlock_body_line_ComplaintSettings" data="ok">
                                <i class="far fa-check"></i>
                            </div>
                            <div class="settingBlock_body_line_ComplaintSettings" data="not">
                                <i class="fal fa-times"></i>
                            </div>
                        </span>
                    </div>
                `);

                _block.find('.settingBlock_body_line_ComplaintSettings[data="ok"]').css('background', 'green').click( async function() 
                {
                    var _IdInv      = $(this).parent().parent().attr('data-id');
                    var _thisBlock  = $(this).parent().parent();

                    note({
                        content: "Пожалуйста подождите",
                        type: "info",
                        time: 2,
                    });

                    await callApi({
                        methodName: "acceptInvOfComplaintAdministrator",
                        data: _IdInv,
                    });

                    note({
                        content: "Успешно",
                        type: "info",
                        time: 2,
                    });

                    _thisBlock.remove();
                });

                _block.find('.settingBlock_body_line_ComplaintSettings[data="not"]').css('margin-left', '10px').css('background', 'red').click( async function() 
                {
                    var _IdInv      = $(this).parent().parent().attr('data-id');
                    var _thisBlock  = $(this).parent().parent();

                    note({
                        content: "Пожалуйста подождите",
                        type: "info",
                        time: 2,
                    });

                    await callApi({
                        methodName: "removeInvOfComplaintAdministrator",
                        data: _IdInv,
                    });

                    note({
                        content: "Успешно",
                        type: "info",
                        time: 2,
                    });

                    _thisBlock.remove();
                });

                _block.find('.settingBlock_body_line_ComplaintSettings[data="user"]').click( function() {
                    window.open(`/?page=activ_projects&id=${$(this).parent().parent().attr('data-id')}`, '_blank');
                });

                _block.find('.settingBlock_body_line_ComplaintSettings[data="chat_invester"]').click( function() {
                    window.open(`https://cashflo.ru/?page=chats&id=${$(this).parent().parent().attr('data-id')}`, "_blank");
                });

                templateText.find('.settingBlock_body').append(_block);
            });

            templateText.css('width', 'calc(92% - 40px');
            templateText.css('margin', '0 auto');

            $('.index_page_body_data').append(templateText);
        };
    };

    var components = {
        complaint,
    };

    if(!global.Components) { global.Components = components; } 
    else { 
        for(var key in components)
        {
            global.Components[key] = components[key];
        }
    }

}(window))