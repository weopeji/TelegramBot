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

    class applications
    {
        constructor() 
        {
            this.ActionAllMoney = 0;
        };

        pad(s, width, character) {
            return new Array(width - s.toString().length + 1).join(character) + s;
        }

        async render() 
        {
            var _data = await callApi({
                methodName: "ALL_DATA",
                data: global.allData.User._id,
            });

            var settingBlock2 = $(`
                <div class="settingBlock">
                    <div class="version2_default_bkg row_default"></div>
                    <div class="settingBlock_header">
                        <div class="settingBlock_header_line">
                            <span>№</span>
                            <span>№ Проекта</span>
                            <span>Название</span>
                            <span>Сумма входа</span>
                        </div>
                    </div>
                    <div class="settingBlock_body">

                    </div>
                </div>
            `);

            settingBlock2.css({
                "margin-top": "0",
            });

            var i           = 0;
            var _this       = this;
            var errorBlock  = true;

            console.log(_data.invester_data.activeInvs);

            for(var element of _data.invester_data.activeInvs)
            {
                var maxDate             = new Date(Number(element.Inv.date));
                var maxDateFormatted    =  this.pad(maxDate.getDate(), 2, '0') + '.' + this.pad(maxDate.getMonth() + 1, 2, '0') + '.' + maxDate.getFullYear();

                if(element.project.data.date != "Бессрочно")
                {
                    continue;
                }

                if(typeof element.Inv.data.pts_2 != "undefined")
                {
                    continue;
                }

                if(typeof element.Inv.applicationRequest != "undefined")
                {
                    if(!element.Inv.applicationRequest)
                    {
                        continue;
                    }
                }

                var template_text = $(`
                    <div class="settingBlock_body_line" data="${element.Inv.invester}" data-more="${element.Inv._id}">
                        <span>
                            <div class="version2_settingBlock_mobile_line">
                                <span>№</span>
                            </div>
                            ${i + 1}
                        </span>
                        <span>
                            <div class="version2_settingBlock_mobile_line">
                                <span>№ Проекта</span>
                            </div>
                            ${element.project._id}
                        </span>
                        <span class="settingBlock_body_line_hoverTextDecoration">
                            <div class="version2_settingBlock_mobile_line">
                                <span>Название</span>
                            </div>
                            ${element.project.data.name}
                        </span>
                        <span>
                            <div class="version2_settingBlock_mobile_line">
                                <span>Сумма входа</span>
                            </div>
                            ${element.Inv.data.pay} руб
                        </span>
                    </div>
                `);

                template_text.css({
                    "cursor": "pointer",
                });

                template_text.find('.settingBlock_body_line_hoverTextDecoration').css({
                    "text-decoration": "underline",
                });

                template_text.click( function () {
                    location.href = `/?page=activ_projects&id=${$(this).attr('data-more')}`;
                })

                settingBlock2.find('.settingBlock_body').append(template_text);
                errorBlock = false;
                i++;
                _this.ActionAllMoney = _this.ActionAllMoney + Number(element.Inv.data.pay.toString().RedactingNumber());
            };

            if(errorBlock)
            {
                var template_text_error = $(`
                    <div class="version2_errorPushBlockDefault">
                        <span>У вас нет заявок</span>
                    </div>
                `);

                settingBlock2.find('.settingBlock_body').append(template_text_error)
            }

            $('.index_page_body_data').append(settingBlock2);
        }
    }

    var components = {
        applications,
    };

    if(!global.Components) { global.Components = components; } 
    else { 
        for(var key in components)
        {
            global.Components[key] = components[key];
        }
    }

}(window))