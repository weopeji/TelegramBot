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
                    <div class="settingBlock_header">
                        <p>Отказано со стороны бизнеса</p>
                        <div class="settingBlock_header_line">
                            <span>Название проекта</span>
                            <span>Инвестор</span>
                            <span>Сумма Инвестиции</span>
                            <span>*</span>
                            <span>*</span>
                            <span>*</span>
                            <span>*</span>
                        </div>
                    </div>
                    <div class="settingBlock_body">
                       
                    </div>
                </div>
            `);

            getComplaint.forEach(element => 
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
                        <span>${element.Project.data.name}</span>
                        <span>${fio}</span>
                        <span>${element.Inv.data.pay} ₽</span>
                        <span>
                            <div class="settingBlock_body_line_ComplaintSettings" data="user">
                                <i class="fal fa-user"></i>
                            </div>
                        </span>
                        <span>
                            <div class="settingBlock_body_line_ComplaintSettings" data="chat">
                                <i class="fal fa-comment-alt-check"></i>
                            </div>
                        </span>
                        <span>
                            <div class="settingBlock_body_line_ComplaintSettings" data="ok">
                                <i class="far fa-check"></i>
                            </div>
                        </span>
                        <span>
                            <div class="settingBlock_body_line_ComplaintSettings" data="not">
                                <i class="fal fa-times"></i>
                            </div>
                        </span>
                    </div>
                `);

                _block.find('.settingBlock_body_line_ComplaintSettings[data="ok"]').css('background', 'green');
                _block.find('.settingBlock_body_line_ComplaintSettings[data="not"]').css('background', 'red');

                _block.find('.settingBlock_body_line_ComplaintSettings[data="user"]').click( function() {
                    window.open(`/?page=activ_projects&id=${$(this).parent().parent().attr('data-id')}`, '_blank');
                });

                _block.find('.settingBlock_body_line_ComplaintSettings[data="chat"]').click( function() {
                    window.open(`/`, '_blank');
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