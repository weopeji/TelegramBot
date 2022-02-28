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

    class payments_new
    {
        constructor() {};

        async render()
        {
            var _data = await callApi({
                methodName: "ALL_DATA",
                data: global.allData.User._id,
            });

            var settingBlock = $(`
                <div class="settingBlock">
                    <div class="settingBlock_header">
                        <p>Выплаты</p>
                        <div class="settingBlock_header_line">
                            <span>№</span>
                            <span>Дата выплаты</span>
                            <span>Сумма</span>
                            <span>№ Договора</span>
                            <span>Инвестор</span>
                            <span>Реквезиты</span>
                        </div>
                    </div>
                    <div class="settingBlock_body">

                    </div>
                </div>
            `); 

            console.log(_data);

            _data.payments_new.showBlocks.forEach(function(element, i) 
            {
                var fio         = null;
                var bank        = null;
                var bik         = null;
                var nomer       = null;
                var nomer_kor   = null;

                element.inv.data.data.forEach(elementInv => {
                    if(elementInv._id == "fio")
                    {
                        fio = elementInv.data;
                    }

                    if(elementInv._id == "bank")
                    {
                        bank = elementInv.data;
                    };

                    if(elementInv._id == "bik")
                    {
                        bik = elementInv.data;
                    };

                    if(elementInv._id == "nomer")
                    {
                        nomer = elementInv.data;
                    };

                    if(elementInv._id == "nomer_kor")
                    {
                        nomer_kor = elementInv.data;
                    };
                });

                var template_text = $(`
                    <div class="settingBlock_body_line" data="${element.inv.invester}" data-project="${element.inv._id}">
                        <span>${i + 1}</span>
                        <span>${DateFormatted(element.date)}</span>
                        <span>${Math.ceil(element.invPay.pay).toString().ReplaceNumber()} руб</span>
                        <span>${element.inv.projectId}/${element.initNumberProject} от ${DateFormatted(element.inv.date)}</span>
                        <span>${fio}</span>
                        <span>
                            <div class="settingBlock_body_line_drop_menu">
                                <p>Банк получателя: <span>${bank}</span></p>
                                <p>БИК: <span>${bik}</span></p>
                                <p>Номер расчетного счета: <span>${nomer}</span></p>
                                <p>Номер кор счета: <span>${nomer_kor}</span></p>
                                <p>Имя получателя: <span>${fio}</span></p>
                            </div>
                            Посмотреть
                        </span>
                    </div>
                `);

                if(element.date <= new Date().getTime().toString())
                {
                    template_text.css('color', "red");
                }

                template_text.children("span").eq(0).click( function() {
                    location.href = `./?page=activ_projects&id=${$(this).parent().attr('data-project')}`;
                });
                template_text.children("span").eq(1).click( function() {
                    location.href = `./?page=activ_projects&id=${$(this).parent().attr('data-project')}`;
                });
                template_text.children("span").eq(2).click( function() {
                    location.href = `./?page=activ_projects&id=${$(this).parent().attr('data-project')}`;
                });
                template_text.children("span").eq(3).click( function() {
                    location.href = `./?page=activ_projects&id=${$(this).parent().attr('data-project')}`;
                });
                template_text.children("span").eq(4).click( function() {
                    location.href = `./?page=activ_projects&id=${$(this).parent().attr('data-project')}`;
                });

                template_text.children("span").eq(5).find('.settingBlock_body_line_drop_menu').css({
                    "right": "calc(100% + 40px)",
                    "top": "0px",
                    "height": "fit-content",
                });
                template_text.children("span").eq(5).css("position", "relative");
                template_text.children("span").eq(5).click( function() {
                    $(".settingBlock_body_line_drop_menu").fadeOut();
                    if($(this).find('.settingBlock_body_line_drop_menu').css('display') == "block")
                    {
                        (this).find('.settingBlock_body_line_drop_menu').fadeOut();
                    } else
                    {
                        $(this).find('.settingBlock_body_line_drop_menu').fadeIn();
                    }
                });

                settingBlock.find('.settingBlock_body').append(template_text);
            })

            $('.index_page_body_data').append(settingBlock);
        }
    }

    var components = {
        payments_new,
    };

    if(!global.Components) { global.Components = components; } 
    else { 
        for(var key in components)
        {
            global.Components[key] = components[key];
        }
    }

}(window))