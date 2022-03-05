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
                        </div>
                    </div>
                    <div class="settingBlock_body">
                       
                    </div>
                </div>
            `);

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