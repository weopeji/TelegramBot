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

            var settingBlock1 = $(`
                <div class="settingBlock" style="margin-bottom: 20px">
                    <div class="version2_default_bkg row_default"></div>
                    <div class="settingBlock_header">
                        <div class="invester_status_projects_status_first">
                            <div class="invester_status_projects_status_first_line">
                                <span>Сумма заявок</span>
                                <a>2</a>
                                <span>3</span>
                                <a>4</a>
                            </div>
                            <div class="invester_status_projects_status_first_line">
                                <span>1</span>
                                <a>2</a>
                                <span>3</span>
                                <a>4</a>
                            </div>
                        </div>
                    </div>
                </div>
            `);

            var settingBlock2 = $(`
                <div class="settingBlock">
                    <div class="version2_settingBlock_header">
                        <p></p>
                    </div>
                    <div class="version2_default_bkg row_default"></div>
                    <div class="settingBlock_header">
                        <div class="settingBlock_header_line">
                            <span>№</span>
                            <span>№ Проекта</span>
                            <span>Название</span>
                            <!-- <span>Место в очереди</span> -->
                            <span>Сумма входа</span>
                        </div>
                    </div>
                    <div class="settingBlock_body">

                    </div>
                </div>
            `);

            var i       = 0;
            var _this   = this;

            for(var element of _data.invester_data.activeInvs)
            {
                var maxDate             = new Date(Number(element.Inv.date));
                var maxDateFormatted    =  this.pad(maxDate.getDate(), 2, '0') + '.' + this.pad(maxDate.getMonth() + 1, 2, '0') + '.' + maxDate.getFullYear();

                if(element.project.data.date != "Бессрочно")
                {
                    break;
                }

                var template_text = $(`
                    <div class="settingBlock_body_line" data="${element.Inv.invester}" data-more="${element.Inv._id}">
                        <span>${i + 1}</span>
                        <span>${element.project._id}</span>
                        <span>${element.project.data.name}</span>
                        <!-- <span>${element.project._id}/${element.number} от ${maxDateFormatted}</span> -->
                        <span>${element.Inv.data.pay} руб</span>
                    </div>
                `);

                template_text.click( function () {
                    location.href = `/?page=activ_projects&id=${$(this).attr('data-more')}`;
                })

                settingBlock2.find('.settingBlock_body').append(template_text);

                i++;
                _this.ActionAllMoney = _this.ActionAllMoney + Number(element.Inv.data.pay.toString().RedactingNumber());
            };

            $('.index_page_body_data').append(settingBlock1);
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