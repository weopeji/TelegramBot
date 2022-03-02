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

    class wait_investings
    {
        constructor() {
            this.globalBlock = $(`
                <div class="usersAdminBlock">

                </div>
            `)
        };

        async renderUser()
        {
            var templateText = $(`
                <div class="usersAdminBlock_user">
                    <div class="usersAdminBlock_user_row">
                        <div class="usersAdminBlock_user_img">
                            <div class="usersAdminBlock_user_img_row">
                                <img src="" alt="">
                            </div>
                        </div>
                        <span class="usersAdminBlock_user_h1">Выберите инвестицию</span>
                    </div>
                    <div class="usersAdminBlock_user_row">
                        <span class="usersAdminBlock_user_h1"></span>
                    </div>
                </div>
            `);

            templateText.find('.usersAdminBlock_user_row').css('margin-bottom', '20px');

            this.globalBlock.append(templateText);
        };

        async showUser(_id)
        {
            var allUserGetOneSetting = await callApi({
                methodName: "allUserGetOneSetting",
                data: _id,
            });

            $('.usersAdminBlock_user_row').eq(0).find('.usersAdminBlock_user_img_row img').attr('src', allUserGetOneSetting.Photo);
            $('.usersAdminBlock_user_row').eq(0).find('.usersAdminBlock_user_h1').html(allUserGetOneSetting.User.first_name);
            $('.usersAdminBlock_user_row').find('.usersAdminBlock_user_first_parse').remove();
            $('.usersAdminBlock_user_row').eq(1).find('.usersAdminBlock_user_h1').html(allUserGetOneSetting.Project.Project.data.name);

            var first_parseBlock = $(`
                <div class="usersAdminBlock_user_first_parse">
                    <div class="usersAdminBlock_user_first_parse_line">
                        <span>Кол-во инвестиций:</span>
                        <a>${allUserGetOneSetting.InvsGet}</a>
                    </div>
                    <div class="usersAdminBlock_user_first_parse_line">
                        <span>Кол-во проектов:</span>
                        <a>${allUserGetOneSetting.ProjectsGet}</a>
                    </div>
                </div>
            `);

            $('.usersAdminBlock_user_row').eq(0).append(first_parseBlock);

            if(typeof allUsersGetOne.User.first_parse != "undefined")
            {
                var phone   = allUsersGetOne.User.first_parse.phone;
                var watsapp = allUsersGetOne.User.first_parse.watsapp;
                var mail    = allUsersGetOne.User.first_parse.mail;

                var first_parseBlock = $(`
                    <div class="usersAdminBlock_user_first_parse">
                        <div class="usersAdminBlock_user_first_parse_line">
                            <span>Телефон:</span>
                            <a>${phone}</a>
                        </div>
                        <div class="usersAdminBlock_user_first_parse_line">
                            <span>WatsApp:</span>
                            <a>${watsapp}</a>
                        </div>
                        <div class="usersAdminBlock_user_first_parse_line">
                            <span>e-mail</span>
                            <a>${mail}</a>
                        </div>
                    </div>
                `);

                $('.usersAdminBlock_user_row').eq(0).append(first_parseBlock);
            };

            var first_parseBlock = $(`
                <div class="usersAdminBlock_user_first_parse">
                    <div class="usersAdminBlock_user_first_parse_line">
                        <span>Общее кол-во инвестиций:</span>
                        <a>${allUserGetOneSetting.Project.howPays}</a>
                        <span>Кол-во просроченых:</span>
                        <a>${allUserGetOneSetting.Project.howPaysNeed}</a>
                        <span>Кол-во ожидающих подтверждения:</span>
                        <a>${allUserGetOneSetting.Project.howPaysWait}</a>
                        <span>Кол-во подтвержденных:</span>
                        <a>${allUserGetOneSetting.Project.howPaysAccept}</a>
                        <span>Кол-во обработанных не до конца:</span>
                        <a>${allUserGetOneSetting.Project.howPaysnot_accept}</a>
                    </div>
                </div>
            `);

            $('.usersAdminBlock_user_row').eq(1).append(first_parseBlock);
        }

        async renderBody()
        {
            var _this               = this;
            var waitInvestingsData  = await callApi({
                methodName: 'waitInvestingsData',
                data:null,
            });


            var templateText = $(`
                <div class="settingBlock">
                    <div class="settingBlock_header">
                        <p>Инвестиции ожидающие подтверждения</p>
                        <div class="settingBlock_header_line">
                            <span>#</span>
                            <span>ID Проекта</span>
                            <span>Сумма инвестции</span>
                            <span>Таймер</span>
                            <span>Действие</span>
                        </div>
                    </div>
                    <div class="settingBlock_body">
                       
                    </div>
                </div>
            `);

            templateText.css('width', 'calc(92% - 40px');
            templateText.css('margin', '0 auto');
            templateText.css('flex', '3');
            templateText.css('margin-right', '20px');
            templateText.css('height', 'fit-content');

            waitInvestingsData.forEach( function (invDoc, i) 
            {                    
                var needMiliseconds = getTimeRemaining(invDoc.inv.date_append.toString())

                var userLine = $(`
                    <div class="settingBlock_body_line" data="${invDoc.inv._id}">
                        <span>${i + 1}</span>
                        <span>${invDoc.inv.projectId}</span>
                        <span>${invDoc.inv.data.pay} руб</span>
                        <span class="timerForwaitInvestingsData"></span>
                        <span>Посотреть</span>
                    </div>
                `);

                if(needMiliseconds.hours >= 24)
                {
                    userLine.find('.timerForwaitInvestingsData').html(`осталось ${Number(needMiliseconds.hours / 24).toFixed(0)} дня и ${Number(needMiliseconds.hours % 24)} ч`);
                }
                else if(needMiliseconds.hours < 24 && needMiliseconds.hours >= 1)
                {
                    userLine.find('.timerForwaitInvestingsData').html(`осталось ${needMiliseconds.hours} ч`);
                    userLine.find('.timerForwaitInvestingsData').css('color', 'red');

                    setInterval( function() {

                    }, 1000);
                }

                userLine.children('span').eq(4).click(async function() {
                    var _id = $(this).parent().attr('data');
                    await _this.showUser(_id);
                });

                templateText.find('.settingBlock_body').append(userLine);
            });

            this.globalBlock.append(templateText);
        }

        async render()
        {
            await this.renderUser();
            await this.renderBody();

            $('.index_page_body_data').append(this.globalBlock);
        }
    };

    var components = {
        wait_investings,
    };

    if(!global.Components) { global.Components = components; } 
    else { 
        for(var key in components)
        {
            global.Components[key] = components[key];
        }
    }

}(window))