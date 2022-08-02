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
            this.allMoney   = 0;
            this.payType    = null;
        };

        async render()
        {
            try {
                $('.index_page_body_header_user_textDecoration span').html("Запрос выплаты");
            } catch(e) {};

            var _this           = this;
            var allPayments     = await callApi({
                methodName: "allPayments",
                data:  global.allData._id,
            });

            var templateText = $(`
                <div class="get_money_abstraction_page">
                    <div class="get_money_abstraction_page_header">
                        <div class="version2_default_bkg row_default"></div>
                        <div class="get_money_abstraction_page_header_row">
                            <span>Выбранная сумма вывода:</span>
                            <a>0 ₽</a>
                        </div>
                    </div>
                    <div class="get_money_abstraction_page_moreData">

                    </div>
                    <div class="get_money_abstraction_page_buttons">
                        <div class="get_money_abstraction_page_buttons_button" data="fiz">
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
                        <div class="get_money_abstraction_page_buttons_button get_money_abstraction_page_buttons_button_ur">
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

            templateText.find('.get_money_abstraction_page_header_inputSave').click( async function() {
                await callApi({
                    methodName: "version2_acceptEmail",
                    data:  {
                        user: global.allData._id,
                        email: $('input[data="email"]').val().toString().trim(),
                    },
                });

                SoloAlert.alert({
                    title:"Успешно! Подтвердите ваш email, перейдя по ссылке в сообщении",
                    body:"",
                    icon: "success"
                });
            });

            templateText.find('.get_money_abstraction_page_buttons_button_ur').click(async () => 
            {
                _this.payType           = "ur";
                var templateTextPushed  = $(`
                    <div class="get_money_abstraction_page_header" style="margin-top: 20px;">
                        <div class="version2_default_bkg row_default"></div>
                        <div class="get_money_abstraction_page_header_row">
                            <input type="text" placeholder="Введите ваш email, для подписание документа" data="email">
                        </div>
                    </div>
                    <div class="get_money_abstraction_page_header" style="margin-top: 20px;">
                        <div class="version2_default_bkg row_default"></div>
                        <div class="get_money_abstraction_page_header_row">
                            <input type="text" placeholder="Введите ваше Имя" data="first_name">
                        </div>
                    </div>
                    <div class="get_money_abstraction_page_header" style="margin-top: 20px;">
                        <div class="version2_default_bkg row_default"></div>
                        <div class="get_money_abstraction_page_header_row">
                            <input type="text" placeholder="Введите вашу Фамилию" data="second_name">
                        </div>
                    </div>
                    <div class="get_money_abstraction_page_header" style="margin-top: 20px;">
                        <div class="version2_default_bkg row_default"></div>
                        <div class="get_money_abstraction_page_header_row">
                            <input type="text" placeholder="Введите ваше Отчество" data="last_name">
                        </div>
                    </div>
                    <div class="get_money_abstraction_page_buttonPushed">
                        <span class="get_money_abstraction_page_buttonPushed_button">Подтвердить</span>
                    </div>
                `);

                templateTextPushed.find('.get_money_abstraction_page_buttonPushed_button').click( async function() {
                    await callApi({
                        methodName: "version2_Attracted_pay",
                        data:  {
                            type: "ur",
                            user: global.allData._id,
                            email: $(this).parent().find('input[data="email"]').val().toString().trim(),
                            data: {
                                first_name: $(this).parent().find('input[data="first_name"]').val().toString().trim(),
                                second_name: $(this).parent().find('input[data="second_name"]').val().toString().trim(),
                                last_name: $(this).parent().find('input[data="last_name"]').val().toString().trim(),
                            },
                        },
                    });

                    SoloAlert.alert({
                        title:"Успешно! Проверьте свою почту и подпишите документ!",
                        body:"",
                        icon: "success"
                    });
                });

                $('.get_money_abstraction_page_buttons').fadeOut( function () {
                    $('.get_money_abstraction_page_moreData').append(templateTextPushed);
                    $('.get_money_abstraction_page_moreData').fadeIn();
                });
            });

            for(var element of allPayments)
            {
                var investerPay                     = Number(element.pay.toString().replace(/\s/g, ''));
                var commissionCompany               = Number(investerPay / 100 * Number(element.data.ProjectData.commission));
                var commissionAttraction            = Number(commissionCompany / 100 * Number(element.data.ProjectData.attraction_commission));
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
                
                this.allMoney                       = this.allMoney + Number(commissionAttractionNeedPay.toString());
            };

            templateText.find('.get_money_abstraction_page_header a').html(`${this.allMoney.toString().ReplaceNumber()} ₽`);

            $('.index_page_body_data').append(templateText);
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