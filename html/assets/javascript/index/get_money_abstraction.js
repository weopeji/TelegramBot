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

    class get_money_abstraction
    {
        constructor() {};

        async render()
        {
            var allPayments     = await callApi({
                methodName: "allPayments",
                data:  global.allData._id,
            });

            console.log(allPayments);

            var _button = $(`
                <div class="get_money_abstraction_button">
                    <span>Запросить</span>
                </div>
            `);

            $('.index_page_body_data').append(_button);

            var settingBlock = $(`
                <div class="settingBlock">
                    <div class="settingBlock_header">
                        <p>Статистика ваших выплат</p>
                        <div class="settingBlock_header_line">
                            <span>№</span>
                            <span>Тип привлечения</span>
                            <span>Номер Проекта/Инвестора</span>
                            <span>Сумма выплаты</span>
                        </div>
                    </div>
                    <div class="settingBlock_body">

                    </div> 
                </div>
            `);

            settingBlock.css("margin-top", "20px");

            var initNumber = 1;

            for(var element of allPayments)
            {
                var investerPay                     = Number(element.pay.toString().replace(/\s/g, ''));
                var commissionMoneys                = Number(investerPay / 100 * element.data.ProjectData.commission);
                var commissionCompany               = Number(commissionMoneys / 100 * element.data.ProjectData.company_commission);
                var commissionAttraction            = Number(commissionMoneys - commissionCompany);
                var commissionAttractionInvester    = Number(commissionAttraction / 100 * element.data.ProjectData.investors_commission);
                var commissionAttractionBusiness    = Number(commissionAttraction / 100 * element.data.ProjectData.business_commission);
                var commissionAttractionNeedPay     = 0;
                var AttractionType                  = "Инвестор";
                var AttractionId                    = null;

                if(element.type == "investing")
                {
                    commissionAttractionNeedPay = commissionAttractionInvester;
                    AttractionId                = element.data._InvInvester;
                } else 
                {
                    commissionAttractionNeedPay = commissionAttractionBusiness;
                    AttractionType              = "Бизнес";
                    AttractionId                = element.data._id;
                }

                var template_text = $(`
                    <div class="settingBlock_body_line">
                        <span>${initNumber}</span>
                        <span>${AttractionType}</span>
                        <span>${AttractionId}</span>
                        <span>${commissionAttractionNeedPay.toString().ReplaceNumber()} руб</span>
                    </div>
                `);

                settingBlock.find('.settingBlock_body').append(template_text);

                initNumber++;
            }

            $('.index_page_body_data').append(settingBlock);
        }
    }

    var components = {
        get_money_abstraction,
    };

    if(!global.Components) { global.Components = components; } 
    else { 
        for(var key in components)
        {
            global.Components[key] = components[key];
        }
    }

}(window))