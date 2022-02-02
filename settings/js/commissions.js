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

            // allUsers.forEach( function (user, i) {
            //     var userLine = $(`
            //         <div class="settingBlock_body_line" data="${user._id}" data-more="41">
            //             <span>${i + 1}</span>
            //             <span>${user.user}</span>
            //             <span>${user.first_name + " " + user.last_name}</span>
            //             <span>${user.type}</span>
            //         </div>
            //     `);

            //     templateText.find('.settingBlock_body').append(userLine);
            // })

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