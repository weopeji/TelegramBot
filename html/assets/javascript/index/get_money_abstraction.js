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
        constructor() {
            this.allMoney = 0;
        };

        async render()
        {
            try {
                $('.index_page_body_header_user_textDecoration span').html("Запрос выплаты");
            } catch(e) {};

            var allPayments     = await callApi({
                methodName: "allPayments",
                data:  global.allData._id,
            });

            var templateText = $(`
                <div class="get_money_abstraction_page">
                    <div class="get_money_abstraction_page_header">
                        <div class="version2_default_bkg row_default"></div>
                        <div class="get_money_abstraction_page_header_row">
                            <span>Вы выводите сумму:</span>
                            <a>0 ₽</a>
                        </div>
                    </div>
                    <div class="get_money_abstraction_page_buttons">
                        <div class="get_money_abstraction_page_buttons_button">
                            <div class="version2_default_bkg row_default"></div>
                            <div class="get_money_abstraction_page_buttons_button_row">
                                <div class="get_money_abstraction_page_buttons_button_icon">
                                    <i class="fal fa-users"></i>
                                </div>
                                <div class="get_money_abstraction_page_buttons_button_text">
                                    <span>Физ. лицо, Самозанятый</span>
                                </div>
                            </div>
                        </div>
                        <div class="get_money_abstraction_page_buttons_button">
                            <div class="version2_default_bkg row_default"></div>
                            <div class="get_money_abstraction_page_buttons_button_row">
                                <div class="get_money_abstraction_page_buttons_button_icon">
                                    <i class="fal fa-city"></i>
                                </div>
                                <div class="get_money_abstraction_page_buttons_button_text">
                                    <span>ИП, Юр. лицо</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `);

            for(var element of allPayments)
            {
                var investerPay                     = Number(element.pay.toString().replace(/\s/g, ''));
                var commissionMoneys                = Number(investerPay / 100 * element.data.ProjectData.commission);
                var commissionCompany               = Number(commissionMoneys / 100 * element.data.ProjectData.company_commission);
                var commissionAttraction            = Number(commissionMoneys - commissionCompany);
                var commissionAttractionInvester    = Number(commissionAttraction / 100 * element.data.ProjectData.investors_commission);
                var commissionAttractionBusiness    = Number(commissionAttraction / 100 * element.data.ProjectData.business_commission);
                var commissionAttractionNeedPay     = 0;
                this.allMoney                       = this.allMoney + Number(commissionAttractionNeedPay.toString());
            };

            templateText.find('.get_money_abstraction_page_header a').html(`${this.allMoney.toString().ReplaceNumber()} ₽`);

            $('.index_page_body_data').append(templateText);

            // var settingBlock = $(`
            //     <div class="settingBlock">
            //         <div class="settingBlock_header">
            //             <div class="settingBlock_header_line">
            //                 <span>№</span>
            //                 <span>Тип привлечения</span>
            //                 <span>Номер Проекта/Инвестора</span>
            //                 <span>Сумма выплаты</span>
            //             </div>
            //         </div>
            //         <div class="settingBlock_body">

            //         </div> 
            //     </div>
            // `);

            // settingBlock.css("margin-top", "20px");

            // var initNumber = 1;

            // for(var element of allPayments)
            // {
            //     var investerPay                     = Number(element.pay.toString().replace(/\s/g, ''));
            //     var commissionMoneys                = Number(investerPay / 100 * element.data.ProjectData.commission);
            //     var commissionCompany               = Number(commissionMoneys / 100 * element.data.ProjectData.company_commission);
            //     var commissionAttraction            = Number(commissionMoneys - commissionCompany);
            //     var commissionAttractionInvester    = Number(commissionAttraction / 100 * element.data.ProjectData.investors_commission);
            //     var commissionAttractionBusiness    = Number(commissionAttraction / 100 * element.data.ProjectData.business_commission);
            //     var commissionAttractionNeedPay     = 0;
            //     var AttractionType                  = "Инвестор";
            //     var AttractionId                    = null;

            //     if(element.type == "investing")
            //     {
            //         commissionAttractionNeedPay = commissionAttractionInvester;
            //         AttractionId                = element.data._InvInvester;
            //     } else 
            //     {
            //         commissionAttractionNeedPay = commissionAttractionBusiness;
            //         AttractionType              = "Бизнес";
            //         AttractionId                = element.data._id;
            //     }

            //     var template_text = $(`
            //         <div class="settingBlock_body_line">
            //             <span>${initNumber}</span>
            //             <span>${AttractionType}</span>
            //             <span>${AttractionId}</span>
            //             <span>${commissionAttractionNeedPay.toString().ReplaceNumber()} руб</span>
            //         </div>
            //     `);

            //     settingBlock.find('.settingBlock_body').append(template_text);

            //     initNumber++;
            // }

            // $('.index_page_body_data').append(settingBlock);
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