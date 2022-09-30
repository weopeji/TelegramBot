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

    class activ_projects
    {
        constructor() {};

        pad(s, width, character) {
            return new Array(width - s.toString().length + 1).join(character) + s;
        }

        async business_render(_data) 
        {
            var _dataPhoto = await callApi({
                methodName: "getPhotoByUser",
                data: _data.invester.user,
            });

            var photoPathPut = "null";

            if(_dataPhoto)
            {
                photoPathPut = _dataPhoto.file_path;
            };

            $('.info_active_block_right').append(`
                <div class="info_active_block_photo">
                    <img src="https://api.telegram.org/file/bot2062839693:AAE0hzj8SVXyexq29s5x7aRLC5x8O77c-pQ/${photoPathPut}" alt="">
                </div>
                <span>${_data.invester.first_name}</span>
                <p>Invester</p>
                <div class="info_active_block_massage_button">
                    <span>Перейти к диалогу</span>
                </div>
            `);

            if(_data.InvDoc.status == "accept")
            {
                var bank        = null;
                var bik         = null;
                var nomer       = null;
                var nomer_kor   = null;
                var fio         = null;

                _data.InvDoc.data.data.forEach(elementInv => {

                    if(elementInv._id == "fio")
                    {
                        fio = elementInv.data;
                    };

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
                })
                
                var headerPaysBlock = $(`
                    <div class="settingBlock" style="margin-top: 65px;">
                        <div class="version2_settingBlock_header">
                            <p>Выплаты по проекту</p>
                        </div>
                        <div class="version2_default_bkg row_default"></div>
                        <div class="settingBlock_header">
                            <div class="settingBlock_header_line">
                                <span>#</span>
                                <span>Дата</span>
                                <span>Сумма</span>
                                <!-- <span>Выбор</span> -->
                                <span>Статус</span>
                            </div>
                        </div>
                        <!--<div class="headerPaysBlock_header">
                            <span class="headerPaysBlock_header_span">
                                <div class="headerPaysBlock_header_span_button_reqvesits">
                                    <span>Посмотреть реквезиты</span>
                                    <div class="settingBlock_body_line_drop_menu">
                                        <p>Банк получателя: <span>${bank}</span></p>
                                        <p>БИК: <span>${bik}</span></p>
                                        <p>Номер расчетного счета: <span>${nomer}</span></p>
                                        <p>Номер кор счета: <span>${nomer_kor}</span></p>
                                        <p>Имя получателя: <span>${fio}</span></p>
                                    </div>
                                </div>
                            </span>
                            <div class="headerPaysBlock_header_line">
                                <span>#</span>
                                <span>Дата</span>
                                <span>Сумма</span>
                                <span>Статус</span>
                            </div>
                        </div>-->
                        <div class="settingBlock_body">

                        </div>
                    </div>
                `);

                _data.InvDoc.pays.forEach((el, i) => 
                {
                    var _pay                = Math.ceil(el.pay);
                    var morePay             = "";
                    var maxDate             = new Date(el.date);
                    var maxDateFormatted    = this.pad(maxDate.getDate(), 2, '0') + '.' + this.pad(maxDate.getMonth() + 1, 2, '0') + '.' + maxDate.getFullYear();
                    var byttonBlock         = `<span class="version2ButtonGradient1 settingBlock_wait settingBlock_block settingBlock_accept">Подтвердить</span>`;
                    var inputBlock          = `<input type="checkbox" class="version2_activ_projects_lineCheackBox" data-target="${i}">`;

                    if(_data.project.data.date != "Бессрочно") {
                        if((i + 1) == _data.InvDoc.pays.length) {
                            morePay = ` + ${_data.InvDoc.data.pay} руб.`;
                        };
                    };

                    if(el.status == "accept") {
                        byttonBlock = "Подтверждено";
                        inputBlock  = "*";
                    }

                    var _block = $(`
                        <div class="settingBlock_body_line">
                            <span>${i + 1}</span>
                            <span>${maxDateFormatted}</span>
                            <span>${_pay.toString().replace(/(\d)(?=(\d{3})+([^\d]|$))/g, '$1 ')} руб ${morePay.toString().replace(/(\d)(?=(\d{3})+([^\d]|$))/g, '$1 ')}</span>
                            <!--<span>
                                ${inputBlock}
                            </span> -->
                            <span class="headerPaysBlock_button" data-target="${i}">
                                ${byttonBlock}
                            </span>
                        </div>
                    `);

                    _block.find(`input[type="checkbox"]`).change(function() {

                        var cheackInitNumber = 0;

                        $('.settingBlock_body_line').each((i, elementLine) => {
                            if($(elementLine).find(`input[type="checkbox"]`).is(":checked")) {
                                cheackInitNumber++;
                            }
                        });

                        if(cheackInitNumber == 0)
                        {
                            $('.settingBlock_body_line').find('.settingBlock_accept').html(`Подтвердить`);
                        }
                        else
                        {
                            $('.settingBlock_body_line').find('.settingBlock_accept').html(`Подтвердить ${cheackInitNumber}`);
                        }
                    })

                    _block.find(".settingBlock_accept").click( function()
                    {
                        var targetNumber        = $(this).parent().attr("data-target");
                        var idProject           = _GET("id");
                        var cheackInitArray     = [];

                        $('.settingBlock_body_line').each((i, elementLine) => {
                            if($(elementLine).find(`input[type="checkbox"]`).is(":checked")) {
                                cheackInitArray.push(i);
                            }
                        });

                        if(cheackInitArray.length == 0)
                        {
                            cheackInitArray.push(targetNumber);
                        }

                        SoloAlert.confirm({
                            title: "Подтверждение",
                            body: "Вы уверены, что хотите подтвердить выплату?",
                            theme: "dark",
                            html: "",
                            useTransparency: true,
                        }).then(async () => 
                        {
                            await callApi({
                                methodName: "version2_activ_projects_business_setPay",
                                data: {
                                    id: idProject,
                                    target: cheackInitArray,
                                },
                            });

                            SoloAlert.alert({
                                title:"Успешно",
                                body:"",
                                icon: "success"
                            }).then(() => {
                                location.reload();
                            });
                        })
                    });

                    headerPaysBlock.find('.settingBlock_body').append(_block);
                });

                $('.index_page_body_data').append(headerPaysBlock);

                if(_data.project.data.date == "Бессрочно" || typeof _data.project.notFullpay != "undefined")
                {
                    if(Number(_data.project.notFullpay) != 0)
                    {
                        var appendPayBlock = $(`
                            <div class="appendPayBlock">
                                <div class="appendPayBlock_line">
                                    <span>Сумма инвестиции</span>
                                    <input type="text">
                                </div>
                                <div class="appendPayBlock_line">
                                    <span>Чек</span>
                                    <input type="file">
                                    <button>Выбрать файл</button>
                                </div>
                                <div class="appendPayBlock_line">
                                    <span>Действие</span> 
                                    <button>Принять</button>
                                </div>
                            </div>
                        `);

                        if(_getCookie('payment_money'))
                        {
                            appendPayBlock.find('input[type="text"]').val(_getCookie('payment_money').toString().ReplaceNumber());
                        }

                        appendPayBlock.find('input[type="text"]').on('keyup input', function() 
                        {
                            setCookie('payment_money', $(this).val().toString().replace(/\s/g, ''));
                            var _val = $(this).val();
                            _val = _val.replace(/[^\d;]/g, '')
                            _val = _val.replace(/\s/g, '');
                            var format = String(_val).replace(/(\d)(?=(\d{3})+([^\d]|$))/g, '$1 ');
                            $(this).val(format);
                        });

                        if(_data.InvDoc.pays.length > 0)
                        {
                            if(_data.InvDoc.pays[_data.InvDoc.pays.length - 1].status == "wait_data")
                            {
                                var moreButtonBlock = $(`
                                    <div class="appendPayBlock_line_button">
                                        <span>Посмотреть</span>
                                    </div>
                                `);

                                moreButtonBlock.click( function() {
                                    window.open(`/projects/${_data.InvDoc.projectId}/${_data.InvDoc.pays[_data.InvDoc.pays.length - 1].receipt}`, '_blank');
                                });

                                appendPayBlock.find('.appendPayBlock_line').eq(1).find('button').html("Заменить");
                                appendPayBlock.find('.appendPayBlock_line').eq(1).append(moreButtonBlock);
                            };
                        };

                        appendPayBlock.find('button').eq(0).css('margin-left', 0);
                        appendPayBlock.find('button').eq(1).css('margin-left', 0);

                        appendPayBlock.find('button').eq(0).click( function() {
                            $(this).parent().parent().find('input[type="file"]').trigger('click');
                        });

                        appendPayBlock.find('button').eq(1).click( async function() 
                        {
                            var _payment    = $(this).parent().parent().find('input[type="text"]').val();

                            if(_payment.length > 0)
                            {
                                var reqData = await callApi({
                                    methodName: "business_addpayment_for_inv",
                                    data: {
                                        id: _GET('id'),
                                        data: {
                                            payment: _payment.toString().replace(/\s/g, ''),
                                        },
                                    },
                                });

                                if(reqData == "ok")
                                {
                                    alert('Успешно!');
                                    delCookie('payment_money');
                                    location.reload();
                                }
                                else
                                {
                                    alert('Вы не добавили чек!');
                                }
                            } 
                            else
                            {
                                alert('Введите все данные!');
                            };
                        });

                        appendPayBlock.find('input[type="file"]').change( async function() 
                        {
                            var _form               = new FormData();
                            var _url                = `${getURL()}/file_chart.io/files`;

                            _form.append('_Inv',    _GET('id'));
                            _form.append('_pts',    $(this.files)[0].type);
                            _form.append('files',   $(this.files)[0]);
            
                            axios.post(_url, _form, {
                                headers: {
                                    'Content-Type': 'multipart/form-data'
                                },
                            }).then(data => 
                            {
                                if(data.data.status == "ok") {
                                    alert("Чек прикоеплен!");
                                    location.reload();
                                }
                            });
                        });

                        if(typeof _data.project.notFullpay != "undefined")
                        {
                            if(typeof _data.project.closeMoney == "undefined")
                            {
                                appendPayBlock = $(`
                                    <div class="Attracted_headerInfoBlock_info_data_alert">
                                        <span>Проект ожидает полного сбора</span>
                                    </div>
                                `);

                                $('.headerPaysBlock').remove();
                            }
                            else
                            {
                                if(typeof _data.InvDoc.data.pts == "undefined")
                                {
                                    appendPayBlock = $(`
                                        <div class="Attracted_headerInfoBlock_info_data_alert">
                                            <span>Ожидает чека от инвестора</span>
                                        </div>
                                    `);

                                    $('.headerPaysBlock').remove();
                                }
                                else
                                {
                                    if(_data.project.notFullpay == 0)
                                    {
                                        if(typeof _data.InvDoc.confirmationData == "undefined")
                                        {
                                            appendPayBlock = $(`
                                                <div class="Attracted_headerInfoBlock">
                                                    <div class="Attracted_headerInfoBlock_block accept_block_tap_more">
                                                        <div class="Attracted_headerInfoBlock_block_i">
                                                            <i class="fad fa-check"></i>
                                                        </div>
                                                        <div class="Attracted_headerInfoBlock_block_text">
                                                            <p>Подтвердить</p>
                                                        </div>
                                                    </div>
                                                    <div class="Attracted_headerInfoBlock_block remove_block_tap">
                                                        <div class="Attracted_headerInfoBlock_block_i">
                                                            <i class="fad fa-times"></i>
                                                        </div>
                                                        <div class="Attracted_headerInfoBlock_block_text Attracted_headerInfoBlock_block_text_moneys">
                                                            <p>Отказать</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            `);

                                            appendPayBlock.find('.accept_block_tap_more').click( function() {
                                                SoloAlert.confirm({
                                                    title: "Подтверждение",
                                                    body: "Вы уверены, что хотите подтвердить оплату?",
                                                    theme: "dark",
                                                    html: "",
                                                    useTransparency: true,
                                                }).then(async (value) => 
                                                {
                                                    if(value)
                                                    {
                                                        await callApi({
                                                            methodName: "accept_confirmationData",
                                                            data: _GET('id'),
                                                        });

                                                        SoloAlert.alert({
                                                            title:"Успешно",
                                                            body:"",
                                                            icon: "success"
                                                        }).then(() => {
                                                            location.reload();
                                                        });
                                                    }
                                                })
                                            })

                                            $('.headerPaysBlock').remove();
                                        }
                                    }
                                    else
                                    {
                                        if(typeof _data.InvDoc.data.pts_2 == "undefined")
                                        {
                                            appendPayBlock = $(`
                                                <div class="Attracted_headerInfoBlock_info_data_alert">
                                                    <span>Ожидает второго чека от инвестора</span>
                                                </div>
                                            `);

                                            $('.headerPaysBlock').remove();
                                        }
                                        else
                                        {
                                            if(typeof _data.InvDoc.confirmationData == "undefined")
                                            {
                                                appendPayBlock = $(`
                                                    <div class="Attracted_headerInfoBlock">
                                                        <div class="Attracted_headerInfoBlock_block accept_block_tap_more">
                                                            <div class="Attracted_headerInfoBlock_block_i">
                                                                <i class="fad fa-check"></i>
                                                            </div>
                                                            <div class="Attracted_headerInfoBlock_block_text">
                                                                <p>Подтвердить</p>
                                                            </div>
                                                        </div>
                                                        <div class="Attracted_headerInfoBlock_block remove_block_tap">
                                                            <div class="Attracted_headerInfoBlock_block_i">
                                                                <i class="fad fa-times"></i>
                                                            </div>
                                                            <div class="Attracted_headerInfoBlock_block_text Attracted_headerInfoBlock_block_text_moneys">
                                                                <p>Отказать</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                `);
        
                                                appendPayBlock.find('.accept_block_tap_more').click( function() {
                                                    SoloAlert.confirm({
                                                        title: "Подтверждение",
                                                        body: "Вы уверены, что хотите подтвердить оплату?",
                                                        theme: "dark",
                                                        html: "",
                                                        useTransparency: true,
                                                    }).then(async (value) => 
                                                    {
                                                        if(value)
                                                        {
                                                            await callApi({
                                                                methodName: "accept_confirmationData",
                                                                data: _GET('id'),
                                                            });
        
                                                            SoloAlert.alert({
                                                                title:"Успешно",
                                                                body:"",
                                                                icon: "success"
                                                            }).then(() => {
                                                                location.reload();
                                                            });
                                                        }
                                                    })
                                                })
        
                                                $('.headerPaysBlock').remove();
                                            } 
                                        }
                                    }
                                }
                            }
                        };
                    }
                    else
                    {
                        // NoT Full Pay Null ===========================================================

                        if(typeof _data.InvDoc.applicationRequest != "undefined")
                        {
                            if(_data.InvDoc.applicationRequest)
                            {
                                if(typeof _data.InvDoc.data.pts_2 == "undefined")
                                {
                                    appendPayBlock = $(`
                                        <div class="Attracted_headerInfoBlock_info_data_alert">
                                            <span>Ожидает второго чека от инвестора</span>
                                        </div>
                                    `);

                                    $('.settingBlock').remove();
                                    $('.headerPaysBlock').remove();
                                }
                                else
                                {
                                    appendPayBlock = $(`
                                        <div class="Attracted_headerInfoBlock">
                                            <div class="version2_default_bkg row_default"></div>
                                            <h1>Подтвердите, что сумма платежа верна или нет</h1>
                                            <div class="Attracted_headerInfoBlock_block accept_block_tap_more">
                                                <div class="Attracted_headerInfoBlock_block_i">
                                                    <i class="fad fa-check"></i>
                                                </div>
                                                <span>Да</span>
                                            </div>
                                            <div class="Attracted_headerInfoBlock_block remove_block_tap">
                                                <div class="Attracted_headerInfoBlock_block_i">
                                                    <i class="fad fa-times"></i>
                                                </div>
                                                <span>Нет</span>
                                            </div>
                                        </div>
                                    `);

                                    appendPayBlock.find('.accept_block_tap_more').click( function() {
                                        SoloAlert.confirm({
                                            title: "Подтверждение",
                                            body: "Вы уверены, что хотите подтвердить оплату?",
                                            theme: "dark",
                                            html: "",
                                            useTransparency: true,
                                        }).then(async (value) => 
                                        {
                                            if(value)
                                            {
                                                await callApi({
                                                    methodName: "version2_activ_projects_accept_notFullPayNull_inv",
                                                    data: _GET('id'),
                                                });

                                                SoloAlert.alert({
                                                    title:"Успешно",
                                                    body:"",
                                                    icon: "success"
                                                }).then(() => {
                                                    location.reload();
                                                });
                                            };
                                        });
                                    });

                                    $('.settingBlock').remove();
                                    $('.headerPaysBlock').remove();
                                };
                            }
                            else
                            {
                                var appendPayBlock = $(`
                                    <div class="appendPayBlock">
                                        <div class="version2_default_bkg row_default"></div>
                                        <div class="appendPayBlock_line">
                                            <span>Сумма выплаты</span>
                                            <input id="money_of_Push" type="text">
                                        </div>
                                        <div class="appendPayBlock_line">
                                            <span>Действие</span> 
                                            <button>Принять</button>
                                        </div>
                                    </div>
                                `);

                                appendPayBlock.find('button').eq(0).css('margin-left', 0);
                                appendPayBlock.find('button').eq(1).css('margin-left', 0);

                                appendPayBlock.find('#money_of_Push').on('keyup input', function() {
                                    var _val = $(this).val();
                                    _val = _val.replace(/[^\d;]/g, '')
                                    _val = _val.replace(/\s/g, '');
                                    var format = String(_val).replace(/(\d)(?=(\d{3})+([^\d]|$))/g, '$1 ');
                                    $(this).val(format);
                                });

                                appendPayBlock.find('button').eq(0).click( async function() {
                                    SoloAlert.confirm({
                                        title: "Подтверждение",
                                        body: "Вы уверены, что хотите подтвердить выплату инвестору?",
                                        html: "",
                                        useTransparency: true,
                                    }).then(async (value) => 
                                    {
                                        if(value)
                                        {
                                            await callApi({
                                                methodName: "business_addpayment_for_inv",
                                                data: {
                                                    id: _GET('id'),
                                                    pay: $('#money_of_Push').val().trim().toString().replace(/\s/g, ''),
                                                },
                                            });

                                            SoloAlert.alert({
                                                title:"Успешно",
                                                body:"",
                                                icon: "success"
                                            }).then(() => {
                                                location.reload();
                                            })
                                        }
                                    });
                                });
                            }
                        };
                    };

                    $('.index_page_body_data').append(appendPayBlock);
                };
            } else {
                if(_data.InvDoc.status != "not_correct" && _data.InvDoc.status != "remove")
                {
                    var textButtonPush = "Нажимая кнопку подтвердить, вы подтверждаете, что сумма и дата платежа верна";

                    if(typeof _data.project.notFullpay != "undefined")
                    {
                        textButtonPush = `Нажимая кнопку подтвердить, вы подтверждаете, что сумма и дата платежа верна, так же сумма должна быть равной ${_data.project.notFullpay}% от общей суммы`;
                    };

                    $('.index_page_body_data').append(`
                        <div class="Attracted_headerInfoBlock_info_data_alert">
                            <span>${textButtonPush}</span>
                        </div>
                        <div class="Attracted_headerInfoBlock">
                            <div class="Attracted_headerInfoBlock_block accept_block_tap">
                                <div class="Attracted_headerInfoBlock_block_i">
                                    <i class="fad fa-check"></i>
                                </div>
                                <div class="Attracted_headerInfoBlock_block_text">
                                    <p>Подтвердить</p>
                                </div>
                            </div>
                            <div class="Attracted_headerInfoBlock_block remove_block_tap">
                                <div class="Attracted_headerInfoBlock_block_i">
                                    <i class="fad fa-times"></i>
                                </div>
                                <div class="Attracted_headerInfoBlock_block_text Attracted_headerInfoBlock_block_text_moneys">
                                    <p>Отказать</p>
                                </div>
                            </div>
                        </div>
                    `);
                }
            }
        }

        async invester_render(_data)
        {
            var settingBlock = $(`.info_active_block`);

            settingBlock.find('.info_active_block_right').append(`
                <div class="info_active_block_photo">
                        
                </div>
                <span>${_data.project.data.name}</span>
                <p>business</p>
            `);

            if(typeof _data.InvDoc.applicationRequest != "undefined")
            {
                if(!_data.InvDoc.applicationRequest)
                {
                    settingBlock.find('.info_active_block_right').append(`
                        <div class="info_active_block_massage_button">
                            <span>Перейти к диалогу</span>
                        </div>
                    `);
                };
            };

            $('.index_page_body_data').append(settingBlock);

            if(_data.InvDoc.status == "accept")
            {
                var bank        = null;
                var bik         = null;
                var nomer       = null;
                var nomer_kor   = null;

                _data.InvDoc.data.data.forEach(elementInv => {

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
                })

                var headerPaysBlock = $(`
                    <div class="settingBlock" style="margin-top: 70px;">
                        <div class="version2_settingBlock_header">
                            <p>Выплаты по проекту</p>
                        </div>
                        <div class="version2_default_bkg row_default"></div>
                        <div class="settingBlock_header">
                            <div class="settingBlock_header_line">
                                <span>#</span>
                                <span>Дата</span>
                                <span>Сумма</span>
                                <span>Статус</span>
                            </div>
                        </div>
                        <div class="settingBlock_body">

                        </div>
                    </div>
                `);

                var _status = {
                    "wait": "Ожидает оплату",
                    "accept": "Оплачено",
                }

                _data.InvDoc.pays.forEach((el, i) => {
                    var maxDate = new Date(el.date);
                    var maxDateFormatted =  this.pad(maxDate.getDate(), 2, '0') + '.' + this.pad(maxDate.getMonth() + 1, 2, '0') + '.' + maxDate.getFullYear();

                    var morePay = "";

                    if(_data.project.data.date != "Бессрочно")
                    {
                        if((i + 1) == _data.InvDoc.pays.length)
                        {
                            morePay = ` + ${_data.InvDoc.data.pay} руб.`
                        }
                    }
                
                    var _block = $(`
                        <div class="settingBlock_body_line">
                            <span>
                                <div class="version2_settingBlock_mobile_line">
                                    <span>№</span>
                                </div>
                                ${i + 1}
                            </span>
                            <span>
                                <div class="version2_settingBlock_mobile_line">
                                    <span>Дата</span>
                                </div>
                                ${maxDateFormatted}
                            </span>
                            <span>
                                <div class="version2_settingBlock_mobile_line">
                                    <span>Сумма</span>
                                </div>
                                ${Number(el.pay).toString().replace(/(\d)(?=(\d{3})+([^\d]|$))/g, '$1 ')} руб ${morePay.replace(/(\d)(?=(\d{3})+([^\d]|$))/g, '$1 ')}
                            </span>
                            <span class="headerPaysBlock_body_line_inv" data="${el.receipt}" data-project="${_data.InvDoc.projectId}">
                                <span class="version2_invDocPage_acceptButton_info">
                                    ${_status[el.status]}
                                </span>
                            </span>
                        </div>
                    `);

                    
                    if(el.status == "accept")
                    {
                        _block.find(".headerPaysBlock_body_line_inv").children().css("background", "#965FFD");
                    } 
                    else
                    {
                        if(Number(el.date) <= Number(new Date().getTime().toString()))
                        {
                            _block.addClass('alertForLineBlock');
                            _block.find('.headerPaysBlock_body_line_inv span').html('Просрочено')
                        };
                    };

                    headerPaysBlock.find('.settingBlock_body').append(_block);
                });

                if(typeof _data.project.notFullpay != "undefined")
                {
                    if(Number(_data.project.notFullpay) == 0) 
                    {
                        if(typeof _data.InvDoc.applicationRequest == "undefined")
                        {
                            headerPaysBlock = $(`
                                <div class="Attracted_headerInfoBlock_info_data_alert">
                                    <span>Проект ожидает полного сбора</span>
                                </div>
                            `);
    
                            $('.headerPaysBlock').remove();
                        }
                        else
                        {
                            if(typeof _data.InvDoc.data.pts_2 == "undefined")
                            {
                                headerPaysBlock = $(`
                                    <div class="Attracted_headerInfoBlock_info_data_alert">
                                        <input type="file" id="Attracted_headerInfoBlock_info_data_alert_buttom_cheack_input">
                                        <div class="Attracted_headerInfoBlock_info_data_alert_buttom_cheack">
                                            <span>Оплатить инвестицию на сайте бизнес - проекта</span>
                                        </div>
                                    </div>
                                `);

                                headerPaysBlock.find('.Attracted_headerInfoBlock_info_data_alert_buttom_cheack').click( function() {
                                    location.href = `https://investir.one/?page=put_file&action=investingNotFull&InvId=${_data.InvDoc._id}`;
                                });

                                $('.headerPaysBlock').remove();
                            }
                            else
                            {
                                if(_data.InvDoc.applicationRequest)
                                {
                                    headerPaysBlock = $(`
                                        <div class="Attracted_headerInfoBlock_info_data_alert">
                                            <span>Ожидает подтверждения бизнесом</span>
                                        </div>
                                    `);

                                    $('.headerPaysBlock').remove();
                                }
                            }
                        }
                    }
                    else
                    {
                        if(typeof _data.project.closeMoney == "undefined")
                        {
                            headerPaysBlock = $(`
                                <div class="Attracted_headerInfoBlock_info_data_alert">
                                    <span>Проект ожидает полного сбора</span>
                                </div>
                            `);
    
                            $('.headerPaysBlock').remove();
                        }
                        else
                        {
                            if(Number(_data.project.notFullpay) != 0)
                            {
                                if(typeof _data.InvDoc.data.pts_2 == "undefined")
                                {
                                    headerPaysBlock = $(`
                                        <div class="Attracted_headerInfoBlock_info_data_alert">
                                            <input type="file" id="Attracted_headerInfoBlock_info_data_alert_buttom_cheack_input">
                                            <div class="Attracted_headerInfoBlock_info_data_alert_buttom_cheack">
                                                <span>Оплатить инвестицию на сайте бизнес - проекта</span>
                                            </div>
                                        </div>
                                    `);
    
                                    headerPaysBlock.find('.Attracted_headerInfoBlock_info_data_alert_buttom_cheack').click( function() {
                                        location.href = `https://investir.one/?page=put_file&action=investingNotFull&InvId=${_data.InvDoc._id}`;
                                    });
    
                                    $('.headerPaysBlock').remove();
                                }
                                else
                                {
                                    if(typeof _data.InvDoc.confirmationData == "undefined")
                                    {
                                        headerPaysBlock = $(`
                                            <div class="Attracted_headerInfoBlock_info_data_alert">
                                                <span>Ожидает подтверждения бизнесом</span>
                                            </div>
                                        `);
    
                                        $('.headerPaysBlock').remove();
                                    }
                                }
                            }
                            else
                            {
                                if(typeof _data.InvDoc.data.pts == "undefined")
                                {
                                    headerPaysBlock = $(`
                                        <div class="Attracted_headerInfoBlock_info_data_alert">
                                            <input type="file" id="Attracted_headerInfoBlock_info_data_alert_buttom_cheack_input">
                                            <div class="Attracted_headerInfoBlock_info_data_alert_buttom_cheack">
                                                <span>Оплатить инвестицию на сайте бизнес - проекта</span>
                                            </div>
                                        </div>
                                    `);
        
                                    headerPaysBlock.find('.Attracted_headerInfoBlock_info_data_alert_buttom_cheack').click( function() {
                                        location.href = `https://investir.one/?page=put_file&action=investingNotFullNull&InvId=${_data.InvDoc._id}`;
                                    });
        
                                    $('.headerPaysBlock').remove();
                                }
                                else
                                {
                                    if(typeof _data.InvDoc.confirmationData == "undefined")
                                    {
                                        headerPaysBlock = $(`
                                            <div class="Attracted_headerInfoBlock_info_data_alert">
                                                <span>Ожидает подтверждения бизнесом</span>
                                            </div>
                                        `);
    
                                        $('.headerPaysBlock').remove();
                                    }
                                }
                            }
                        }
                    }
                };
                
                $('.index_page_body_data').append(headerPaysBlock);
            };
        };

        async renderType(allData)
        {
            var InvId = _GET('id');

            if(_GET('hash'))
            {
                InvId = _GET("idInv");
            };

            try {
                var _data = await callApi({
                    methodName: "invester_status_project",
                    data: InvId,
                });
    
                var blockProject = await callApi({
                    methodName: "getProjectById",
                    data: _data.InvDoc.projectId,
                });
    
                var _dateText   = "Ожидание";
                var _this       = this;
    
                if(_data.InvDoc.date)
                {
                    var maxDate     = new Date(Number(_data.InvDoc.date));
                    var needDate    = `${this.pad(maxDate.getDate(), 2, '0')}.${this.pad(maxDate.getMonth() + 1, 2, '0')}.${maxDate.getFullYear()}`;
                    _dateText       = needDate;
                }
    
                var _status = 
                {
                    "wait": "Ожидает подтверждения",
                    "accept": "Подтверждено",
                    "not_correct": `<span style="color: red">Отказано</span>`,
                    "remove": `<span style="color: red">Закрыто</span>`,
                };
    
                if(typeof blockProject.notFullpay != "undefined")
                {
                    if(Number(blockProject.notFullpay) == 0)
                    {
                        if(typeof _data.InvDoc.applicationRequest == "undefined")
                        {
                            _status["accept"] = "Заявка подана";
                        }
                        else
                        {
                            if(_data.InvDoc.applicationRequest)
                            {
                                if(typeof _data.InvDoc.data.pts_2 == "undefined")
                                {
                                    _status["accept"] = "Ожидает оплаты";
                                }
                                else
                                {
                                    _status["accept"] = "Ожидает подтверждения бизнеса";
                                };
                            }
                        }
                    };
                };
    
                var settingBlock = $(`
                    <div class="info_active_block">
                        <div class="info_active_block_right">
                            <div class="version2_default_bkg row_default"></div>
                        </div>
                        <div class="info_active_block_left">
                            <div class="version2_default_bkg row_default"></div>
                            <p class="info_active_block_left_header">Информация по платежу</p>
                            <div class="info_active_block_left_info">
                                <div class="info_active_block_left_info_line">
                                    <span>Название:</span>
                                    <a>${blockProject.data.name}</a>
                                </div>
                                <div class="info_active_block_left_info_line">
                                    <span>Номер проекта:</span>
                                    <a>${_data.InvDoc.projectId}</a>
                                </div>
                                <div class="info_active_block_left_info_line">
                                    <span>Номер договора:</span>
                                    <a>${_data.InvDoc.projectId}/${_data.initNumber}</a>
                                </div>
                            </div>
                            <div class="info_active_block_left_info">
                                <div class="info_active_block_left_info_line">
                                    <span>Статус:</span>
                                    <a>${_status[_data.InvDoc.status]}</a>
                                </div>
                                <div class="info_active_block_left_info_line">
                                    <span>Сумма инвестиции:</span>
                                    <a>${_data.InvDoc.data.pay.replace(/(\d)(?=(\d{3})+([^\d]|$))/g, '$1 ')} руб</a>
                                </div>
                                <div class="info_active_block_left_info_line">
                                    <span>Дата:</span>
                                    <a>${_dateText}</a>
                                </div>
                            </div>
                            <div class="info_active_block_left_buttons">
                                <span class="show_document">Посмотреть договор на сайте бизнес - проекта</span>
                                <span class="show_block">Скачать чек об оплате</span>
                            </div>
                        </div>
                    </div>
                `);
    
                var errorButtonShow = false;
    
                if(typeof _data.project.notFullpay != "undefined")
                {
                    if(Number(_data.project.notFullpay) == 0)
                    {
                        if(typeof _data.InvDoc.data.pts_2 == "undefined")
                        {
                            settingBlock.find('.show_block').remove();
                        }
                        else
                        {
                            settingBlock.find('.show_block').click( function() {
                                if(window.screen.width < 1300)
                                {
                                    saveUrlAsFile(`./projects/${_data.InvDoc.projectId}/${_data.InvDoc._id}_investment_2.${_data.InvDoc.data.pts_2}`, `${_data.InvDoc._id}_investment_2.${_data.InvDoc.data.pts_2}`);
                                }
                                else
                                {
                                    window.open(`./projects/${_data.InvDoc.projectId}/${_data.InvDoc._id}_investment_2.${_data.InvDoc.data.pts_2}`, '_blank');
                                } 
                            });
                            errorButtonShow = true;
                        }
                    }
                    else
                    {
                        var buttonsType = 
                        [
                            function() 
                            {
                                var buttonsTypeBlock = $(`
                                    <div class="buttonsTypeBlock_row_not_full_payData">
                                        <i class="fad fa-badge-check"></i>
                                        <span>Чек номер 1</span>
                                        <button type="button">Посмотреть</button>
                                    </div>
                                `);
    
                                buttonsTypeBlock.find('button').click( function() {
                                    window.open(`./projects/${_data.InvDoc.projectId}/${_data.InvDoc._id}_investment.${_data.InvDoc.data.pts}`, '_blank');
                                });
    
                                return buttonsTypeBlock;
                            },
                            function() 
                            {
                                var iconButton          = `<i class="fad fa-badge-check"></i>`;
                                var buttonBlockNeedPush = `<button type="button">Посмотреть</button>`;
    
                                if(typeof _data.InvDoc.data.pts_2 == "undefined")
                                {
                                    iconButton          = `<i class="fad fa-window-close"></i>`;
                                    buttonBlockNeedPush = "";
                                }
    
                                var buttonsTypeBlock    = $(`
                                    <div class="buttonsTypeBlock_row_not_full_payData">
                                        ${iconButton}
                                        <span>Чек номер 2</span>
                                        ${buttonBlockNeedPush}
                                    </div>
                                `);
    
                                if(typeof _data.InvDoc.data.pts_2 != "undefined")
                                {
                                    buttonsTypeBlock.find('button').click( function() {
                                        window.open(`./projects/${_data.InvDoc.projectId}/${_data.InvDoc._id}_investment.${_data.InvDoc.data.pts}`, '_blank');
                                    });
                                }
    
                                return buttonsTypeBlock;
                            },
                        ]
                        
    
                        var templateText = $(`
                            <div class="info_active_block_left_buttons_notFullpay_line_row">
                                <div class="info_active_block_left_buttons_notFullpay_line" data="first">
    
                                </div>
                                <div class="info_active_block_left_buttons_notFullpay_line" data="second">
                                    
                                </div>
                            </div>
                        `);
    
                        templateText.find('[data="first"]').append(buttonsType[0]());
                        templateText.find('[data="second"]').append(buttonsType[1]());
    
                        settingBlock.find('.show_block').remove();
                        settingBlock.find('.info_active_block_left_buttons').append(templateText);
                    }
                };
    
                $('.index_page_body_data').append(settingBlock);
    
                if(allData.User.type == "business") {
                    await this.business_render(_data);
                } else {
                    await this.invester_render(_data);
                }
    
                if(!errorButtonShow)
                {
                    $('.show_block').click( function() {
                        if(window.screen.width < 1300)
                        {
                            saveUrlAsFile(`./projects/${_data.InvDoc.projectId}/${_data.InvDoc._id}_investment.${_data.InvDoc.data.pts}`, `${_data.InvDoc._id}_investment.${_data.InvDoc.data.pts}`);
                        }
                        else
                        {
                            window.open(`./projects/${_data.InvDoc.projectId}/${_data.InvDoc._id}_investment.${_data.InvDoc.data.pts}`, '_blank');
                        } 
                    });
                }
    
                $('.info_active_block_massage_button').click(function() {
                    window.open(`./?page=chats&id=${_data.InvDoc._id}`, '_blank');
                });
    
                $('.show_document').click( async function() {
                    if(window.screen.width < 1300)
                    {                        
                        var tamplateText = $(`
                            <div class="version2_preloaderDocumetBLock">
                                <div class="version2_preloaderDocumetBLock_row">
                                    <div class="version2_preloaderDocumetBLock_header">
                                        <span><</span>
                                    </div>
                                    <div class="version2_preloaderDocumetBLock_img">
                                        <img src="/html/assets/images/2.0.0/documents/image-001.png" alt="">
                                    </div>
                                    <div class="version2_preloaderDocumetBLock_img">
                                        <img src="/html/assets/images/2.0.0/documents/image-002.png" alt="">
                                    </div>
                                    <div class="version2_preloaderDocumetBLock_img">
                                        <img src="/html/assets/images/2.0.0/documents/image-003.png" alt="">
                                    </div>
                                    <div class="version2_invester_data_mobile_documents_document">
                                        <h1>Приложение номер 2 - Тестирование</h1>
                                        <p>Фио инвестора <data type="fio">${findOfArrayOn_id(_data.InvDoc.data.data, "fio")}</data></p>
                                        <p>Дата <data type="date">${new Date()}</data></p>
                                        <p>Сумма инвестиции <data type="summ">${_data.InvDoc.data.pay}</data></p>
                                        <p>Банк <data type="bank">${_data.project.data.bank}</data></p>
                                        <p>Инн <data type="inn"></data>${findOfArrayOn_id(_data.InvDoc.data.data, "inn")}</p>
                                        <p>Огрн <data type="ogrn">${findOfArrayOn_id(_data.InvDoc.data.data, "ogrnip")}</data></p>
                                    </div>
                                    <div class="version2_preloaderDocumetBLock_header">
                                        <span><</span>
                                    </div>
                                </div>
                            </div>
                        `);
    
                        tamplateText.find('.version2_preloaderDocumetBLock_header').click( function() {
                            $('.version2_preloaderDocumetBLock').fadeOut( function() {
                                $(this).remove();
                            });
                        });
    
                        $('body').append(tamplateText);
                        $('.version2_preloaderDocumetBLock').fadeIn();
                    }
                    else
                    {
                        if(typeof _data.project.businessSite != 'undefined') {
                            window.open(`https://${_data.project.businessSite}/projects/${_data.InvDoc.projectId}/${_data.InvDoc.urlToLastDocument}`, '_blank');
                        } else {
                            window.open(`https://investir.one/projects/${_data.InvDoc.projectId}/${_data.InvDoc.urlToLastDocument}`, '_blank');
                        }
                    }
                });
    
                $('.accept_block_tap').click( async function () 
                {
                    await callApi({
                        methodName: "acceptInvestor",
                        data: _GET('id'),
                    });
    
                    alert('Оплата подтвержденна!');
                    location.reload();
                })
    
                $('.remove_block_tap').click( async function () 
                {
                    _this.renderCloseBlock(_data);
                });
            } 
            catch(e)
            {
                alert(e.toString());
            }
        }

        async renderCloseBlock(_data)
        {
            var template_text = $(`
                <div class="renderCloseBlockBusiness">
                    <div class="renderCloseBlockBusiness_row">
                        <div class="renderCloseBlockBusiness_block">
                            <div class="version2_default_bkg row_default"></div>
                            <h1>Выберите причину отказа <div class="renderCloseBlockBusiness_block_button_close">+</div></h1>
                            <div class="renderCloseBlockBusiness_block_text">
                                <div class="renderCloseBlockBusiness_block_text_line" data="spam">
                                    <div class="renderCloseBlockBusiness_block_text_line_circule">
                                        <div class="renderCloseBlockBusiness_block_text_line_circule_block">
                                            <div class="renderCloseBlockBusiness_block_text_line_circule_block_row"></div>
                                        </div>
                                        <p>Спам</p>
                                    </div>
                                </div>
                                <div class="renderCloseBlockBusiness_block_text_line" data="not_correct">
                                    <div class="renderCloseBlockBusiness_block_text_line_circule">
                                        <div class="renderCloseBlockBusiness_block_text_line_circule_block">
                                            <div class="renderCloseBlockBusiness_block_text_line_circule_block_row"></div>
                                        </div>
                                        <p>Данные в договоре не верны</p>
                                    </div>
                                    <div class="renderCloseBlockBusiness_block_text_line_drop_menu">
                                        <div class="renderCloseBlockBusiness_block_text_line_drop_menu_line">
                                            <input type="checkbox" name="" id="notCorrect_date">
                                            <span>Не верна дата</span>
                                        </div>
                                        <div class="renderCloseBlockBusiness_block_text_line_drop_menu_line">
                                            <input type="checkbox" name="" id="notCorrect_pay">
                                            <span>Не верна cумма</span>
                                        </div>
                                        <div class="renderCloseBlockBusiness_block_text_line_drop_menu_line">
                                            <input type="checkbox" name="" id="notCorrect_photo">
                                            <span>Не верен чек</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="renderCloseBlockBusiness_block_text_line" data="money">
                                    <div class="renderCloseBlockBusiness_block_text_line_circule">
                                        <div class="renderCloseBlockBusiness_block_text_line_circule_block">
                                            <div class="renderCloseBlockBusiness_block_text_line_circule_block_row"></div>
                                        </div>
                                        <p>В течении 3х банковских дней деньги не посутпили</p>
                                    </div>
                                </div>
                            </div>
                            <div class="renderCloseBlockBusiness_block_input">
                                <input type="text" placeholder="Коментарий" id="notCorrect_value">
                                <div class="renderCloseBlockBusiness_block_input_button">
                                    <span>Отказать</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> 
            `);

            template_text.find('.renderCloseBlockBusiness_block_button_close').click( function() {
                $('.renderCloseBlockBusiness').fadeOut();
            })

            template_text.find('.renderCloseBlockBusiness_block_text_line').click( function() {
                $('.renderCloseBlockBusiness_block_text_line').removeClass('selected');
                $(this).addClass('selected');
            });

            template_text.find('.renderCloseBlockBusiness_block_input_button').click( function() 
            {
                if(!$('.renderCloseBlockBusiness_block_text_line').hasClass('selected'))
                {
                    note({
                        content: "Вы должны выбрать одну из причин отказа",
                        type: "info",
                        time: 5
                    });
                } 
                else
                {
                    if($('.renderCloseBlockBusiness_block_text_line.selected').attr('data') == "not_correct")
                    {
                        var _errorCheacked = true;

                        if(
                            $('#notCorrect_date').is(':checked')  ||
                            $('#notCorrect_pay').is(':checked')   ||
                            $('#notCorrect_photo').is(':checked')
                        ){
                            _errorCheacked = false;
                        };

                        if(_errorCheacked)
                        {
                            note({
                                content: "Вы должны выбрать хотябы один из вариантов",
                                type: "info",
                                time: 5
                            });

                            return;
                        }
                    };

                    if($('#notCorrect_value').val().length <= 0)
                    {
                        note({
                            content: "Вы должны ввести коментарий",
                            type: "info",
                            time: 5
                        });

                        return;
                    };

                    callApi({
                        methodName: "removePayInvestor",
                        data: {
                            InvId: _data.InvDoc,
                            data: 
                            {
                                dataType: $('.renderCloseBlockBusiness_block_text_line.selected').attr('data'),
                                comment: $('#notCorrect_value').val(),
                                notCorrect_date: $('#notCorrect_date').is(':checked'),
                                notCorrect_pay: $('#notCorrect_pay').is(':checked'),
                                notCorrect_photo: $('#notCorrect_photo').is(':checked'),
                            },
                        },
                    });

                    note({
                        content: "Успешно!",
                        type: "info",
                        time: 2,
                        callback: function()
                        {
                            location.href = "/?page=acceptPays";
                        },
                    });
                };
            });

            $('body').append(template_text);
        }

        async render(allData) 
        {
            var _data = await callApi({
                methodName: "ALL_DATA",
                data: global.allData.User._id,
            });

            await callApi({
                methodName: "version2_activ_projects_pageRender",
                data: global.allData.User._id,
            });

            if(allData.User.type == "business")
            {
                var _data = await callApi({
                    methodName: "Business_status_projects",
                    data: allData,
                });

                console.log(_data);

                var settingBlock = $(`
                    <div class="settingBlock">
                        <div class="settingBlock_header">
                            <p>История оплат</p>
                            <div class="settingBlock_header_line">
                                <span>#</span>
                                <span>Название проекта</span>
                                <span>Номер проекта</span>
                                <span>Номер Инвестора</span>
                                <span>Статус</span>
                            </div>
                        </div>
                        <div class="settingBlock_body">

                        </div>
                    </div>
                `);

                var i = 0;

                for(var element of _data)
                {
                    var _projectGet = await callApi({
                        methodName: "getProjectById",
                        data: element.projectId,
                    });

                    var _status = {
                        "wait": `
                            <span class="settingBlock_wait settingBlock_block">Ожидает подтверждения</span>
                        `,
                        "accept": `
                            <span class="settingBlock_accept_color settingBlock_block">Оплата подтверждена</span>
                        `,
                    }
                    var template_text = `
                        <div class="settingBlock_body_line" data="${element.invester}" data-more="${element._id}">
                            <span>${i + 1}</span>
                            <span>${_projectGet.data.name}</span>
                            <span>${element.projectId}</span>
                            <span>${element.invester}</span>
                            <span>${_status[element.status]}</span>
                        </div>
                    `;

                    settingBlock.find('.settingBlock_body').append(template_text);

                    i++;
                }

                $('.index_page_body_data').append(settingBlock);

                $('.settingBlock_body_line').click( function () {
                    location.href = window.location.href + `&id=${$(this).attr('data-more')}`;
                })
            } else 
            {
                var settingBlock = $(`
                    <div class="settingBlock">
                        <div class="version2_settingBlock_header">
                            <p>Активные проекты</p>
                        </div>
                        <div class="version2_default_bkg row_default"></div>
                        <div class="settingBlock_header">
                            <div class="settingBlock_header_line">
                                <span>№</span>
                                <span>№ Проекта</span>
                                <span>Название</span>
                                <span>Договор</span>
                                <span>Сумма входа</span>
                                <span>Сумма платежа</span>
                            </div>
                        </div>
                        <div class="settingBlock_body">

                        </div>
                    </div>
                `);

                var AlertPush = false;

                if(typeof window.allData.User.alerts_main != 'undefined')
                {
                    for(var alertBlock of window.allData.User.alerts_main)
                    {
                        if(alertBlock.type == "accept_business_investring")
                        {
                            AlertPush = true;
                        }
                    }
                }
                
                if(AlertPush)
                {
                    settingBlock.find(".version2_settingBlock_header").append(`
                        <div class="version2_settingBlock_header_allertMini">
                            
                        </div>
                    `);
                }

                var i                   = 0;
                var allMoneyInvesting   = 0;
                var ActionAllMoney      = 0;
                var ActionAllMoneyinit  = 0;
                var ActionHowPays       = 0;
                var errorBlock          = true;
                var fullWaitInvs        = _data.invester_data.investedWait;

                for(var element of _data.invester_data.activeInvs)
                {
                    var maxDate             = new Date(Number(element.Inv.date));
                    var maxDateFormatted    = this.pad(maxDate.getDate(), 2, '0') + '.' + this.pad(maxDate.getMonth() + 1, 2, '0') + '.' + maxDate.getFullYear();
                    var lastPay             = 0;

                    if(element.project.data.date != "Бессрочно")
                    {
                        for(var payInv of element.Inv.pays)
                        {
                            if(payInv.status == "wait")
                            {
                                lastPay = payInv.pay.toString().ReplaceNumber() + " руб";
                                break;
                            }
                        }
                    }
                    else
                    {
                        if(typeof element.Inv.applicationRequest == "undefined")
                        {
                            ActionAllMoneyinit      = ActionAllMoneyinit + 1;
                            ActionAllMoney          = ActionAllMoney + Number(element.Inv.data.pay.toString().RedactingNumber());
                            continue;
                        }
                        else
                        {
                            if(element.Inv.applicationRequest)
                            {
                                if(typeof element.Inv.data.pts_2 == "undefined")
                                {
                                    ActionAllMoneyinit      = ActionAllMoneyinit + 1;
                                    ActionAllMoney          = ActionAllMoney + Number(element.Inv.data.pay.toString().RedactingNumber());
                                }
                                else
                                {
                                    fullWaitInvs = fullWaitInvs + Number(element.Inv.data.pay.toString().RedactingNumber());
                                }
                                
                                continue;
                            }
                        };

                        lastPay = "% от прибыли";
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
                            <span>
                                <div class="version2_settingBlock_mobile_line">
                                    <span>Название</span>
                                </div>
                                ${element.project.data.name}
                            </span>
                            <span>
                                <div class="version2_settingBlock_mobile_line">
                                    <span>Договор</span>
                                </div>
                                ${element.project._id}/${element.number} от ${maxDateFormatted}
                            </span>
                            <span>
                                <div class="version2_settingBlock_mobile_line">
                                    <span>Сумма входа</span>
                                </div>
                                ${element.Inv.data.pay} руб
                            </span>
                            <span>
                                <div class="version2_settingBlock_mobile_line">
                                    <span>Сумма платежа</span>
                                </div>
                                ${lastPay}
                            </span>
                        </div>
                    `);

                    template_text.click( function () {
                        location.href = `/?page=activ_projects&id=${$(this).attr('data-more')}`;
                    })

                    settingBlock.find('.settingBlock_body').append(template_text);
                    ActionHowPays = ActionHowPays + 1;
                    allMoneyInvesting = allMoneyInvesting + Number(element.Inv.data.pay.toString().RedactingNumber());
                    errorBlock = false;
                    i++;
                };

                if(errorBlock)
                {
                    var template_text_error = $(`
                        <div class="version2_errorPushBlockDefault">
                            <span>У вас нет Активных проектов</span>
                        </div>
                    `);

                    settingBlock.find('.settingBlock_body').append(template_text_error)
                }

                var settingBlock1 = $(`
                    <div class="settingBlock version2_settingBlock_notMorePAndM" style="margin-bottom: 20px; margin-top: 0;">
                        <div class="version2_default_bkg row_default"></div>
                        <div class="settingBlock_header version2_info_block_moreDataStatus">
                            <div class="invester_status_projects_status_first">
                                <div class="invester_status_projects_status_first_line">
                                    <div class="version2_invester_status_projects_status_first_line_more">
                                        <span>Проинвестировано</span>
                                        <a>${allMoneyInvesting.toString().ReplaceNumber()} ₽</a>
                                    </div>
                                    <div class="version2_invester_status_projects_status_first_line_more">
                                        <span>Получено</span>
                                        <a>${_data.invester_data.paid.toString().ReplaceNumber()} ₽</a>
                                    </div>
                                </div>
                                <div class="invester_status_projects_status_first_line">
                                    <div class="version2_invester_status_projects_status_first_line_more">
                                        <span>Ожидают подтверждения</span>
                                        <a>${fullWaitInvs.toString().ReplaceNumber()} ₽</a>
                                    </div>
                                    <div class="version2_invester_status_projects_status_first_line_more">
                                        <span>Ближайшие поступления на</span>
                                        <a>${_data.invester_data.receipts.toString().ReplaceNumber()} ₽</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="settingBlock version2_settingBlock_notMorePAndM" style="margin-bottom: 20px">
                        <div class="version2_default_bkg row_default"></div>
                        <div class="settingBlock_header version2_info_block_moreDataStatus">
                            <div class="invester_status_projects_status_first">
                                <div class="invester_status_projects_status_first_line">
                                    <div class="version2_invester_status_projects_status_first_line_more">
                                        <span>Кол-во заявок</span>
                                        <a>${ActionAllMoneyinit}</a>
                                    </div>
                                    <div class="version2_invester_status_projects_status_first_line_more">
                                        <span>Сумма</span>
                                        <a>${ActionAllMoney.toString().ReplaceNumber()} ₽</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="settingBlock version2_settingBlock_notMorePAndM" style="margin-bottom: 20px">
                        <div class="version2_default_bkg row_default"></div>
                        <div class="settingBlock_header version2_info_block_moreDataStatus">
                            <div class="invester_status_projects_status_first">
                                <div class="invester_status_projects_status_first_line">
                                    <div class="version2_invester_status_projects_status_first_line_more">
                                        <span>Привлечено инвесторов</span>
                                        <a>${_data.attracted.investers.length}</a>
                                    </div>
                                    <div class="version2_invester_status_projects_status_first_line_more">
                                        <span>Бонус</span>
                                        <a>0 ₽</a>
                                    </div>
                                </div>
                                <div class="invester_status_projects_status_first_line">
                                    <div class="version2_invester_status_projects_status_first_line_more">
                                        <span>Привлечено бизнес проектов</span>
                                        <a>${_data.attracted.business.length}</a>
                                    </div>
                                    <div class="version2_invester_status_projects_status_first_line_more">
                                        <span>Бонус</span>
                                        <a>0 ₽</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="settingBlock version2_settingBlock_notMorePAndM version2_settingBlock_notMorePAndM_more" style="margin-bottom: 70px">
                        <div class="version2_default_bkg row_default"></div>
                        <div class="settingBlock_header version2_info_block_moreDataStatus_bigText">
                            <div class="invester_status_projects_status_first">
                                <div class="invester_status_projects_status_first_line">
                                    <span>Проивестировано в проекты</span>
                                    <a>${ActionHowPays}</a>
                                </div>
                            </div>
                        </div> 
                    </div>
                `);

                $('.index_page_body_data').append(settingBlock1);
                $('.index_page_body_data').append(settingBlock);
            } 
        }
    }

    class put_document
    {
        constructor() {};

        async render(allData) 
        {
            var _data = await callApi({
                methodName: "invester_status_projects",
                data: allData,
            });
            
            var statusBlock = "invester_status_project_yellow";

            var text = `
                <div class="invester_status_project ${statusBlock}">
                    <p>Вставте документ</p>
                    <input type="file" placeholder="Документ">
                </div>
            `;

            $('.content').append(text);   
        }
    }

    class process_status 
    {
        constructor() {};

        async render(allData) 
        {
            var _data = await callApi({
                methodName: "invester_status_projects",
                data: allData,
            });

            if(_data.length > 0) {
                _data.forEach(function(element) 
                {
                    var statusBlock     = "";
                    var statusInfo      = "";
    
                    if(!element.document) {
                        statusBlock = "invester_status_project_yellow";
                        statusInfo  = "Не подписан документ";
                    } else {
                        statusInfo  = "Деньги не переведенны";
                    }
    
                    var text = `
                        <div class="invester_status_project ${statusBlock}">
                            <p>Проект номер: ${element.projectId}</p>
                            <p>${statusInfo}</p>
                        </div>
                    `;
    
                    $('.content').append(text);
                })
            } else {
                var statusBlock = "invester_status_project_red";

                var text = `
                    <div class="invester_status_project ${statusBlock}">
                        <p>Вы не подавали заявку на инвестирование</p>
                    </div>
                `;

                $('.content').append(text);
            }
        }
    }

    class pay_investors {
        constructor() {};

        rednderCheackInvesting(_id) {
            $('.content').empty(text);

            var statusBlock = "invester_status_project_red";

            var text = `
                <div class="invester_status_project ${statusBlock} cheackInvestingUser">
                    <p>Оплаченно</p>
                </div>
            `;

            $('.content').append(text);
        }

        async render() 
        {
            var _id = _GET('id');
            var _data = await callApi({
                methodName: "getInvestorsProject",
                data: _id,
            });

            var _needData = [];

            _data.forEach(el => {
                if(el.receipt) {
                    _needData.push(el);
                }
            });

        
            var settingBlock = $(`
                <div class="settingBlock">
                    <div class="settingBlock_header">
                        <p>Не выплачено</p>
                        <div class="settingBlock_header_line">
                            <span>#</span>
                            <span>ID</span>
                            <span>Инвестор ID</span>
                            <span>Кнопка</span>
                        </div>
                    </div>
                    <div class="settingBlock_body">

                    </div>
                </div>
            `);

            $('.index_page_body_data').append(settingBlock);
        
        }
    }

    class acceptPays 
    {
        constructor() {};

        async render() 
        {
            $('.index_page_body_data').append($(`
                <div class="Attracted_headerInfoBlock_info_data_alert">
                    <div class="version2_default_bkg row_default"></div>
                    <div class="Attracted_headerInfoBlock_info_data_alert_row">
                        <span>Поступившие инвестиции необходимо подтвердить в течении 3х банковских дней</span>
                    </div>
                </div>
            `).css('font-size', '20px'));

            var _id = global.allData._id;

            var _data = await callApi({
                methodName: "notAcceptInvesting",
                data: _id,
            });

            var ActionInvs = await callApi({
                methodName: "version2_acceptPays_notFullPay_business",
                data: _id,
            });

            var settingBlock = $(`
                <div class="settingBlock">
                    <div class="version2_settingBlock_header">
                        <p>Доступные проекты</p>
                    </div>
                    <div class="version2_default_bkg row_default"></div>
                    <div class="settingBlock_header">
                        <div class="settingBlock_header_line">
                            <span>#</span>
                            <span>Номер проекта</span>
                            <span>Название проекта</span>
                            <span>Сумма инвестиции</span>
                            <span>Инвестор ID</span>
                            <span>Оставшееся время</span>
                            <span>Кнопка</span>
                        </div>
                    </div>
                    <div class="settingBlock_body">

                    </div>
                </div>
            `);

            var errorBlock  = true;

            ActionInvs.forEach((element, i) => {

                var needMiliseconds = getTimeRemaining(element.inv.date_append.toString());
                var timeText        = "";

                if(needMiliseconds.hours >= 24)
                {
                    timeText = `${parseInt(Number(needMiliseconds.hours / 24))} дня и ${Number(needMiliseconds.hours % 24)} ч`;
                }
                else if(needMiliseconds.hours < 24 && needMiliseconds.hours >= 0)
                {
                    timeText = `${needMiliseconds.hours} ч`;
                }
                else
                {
                    timeText = `Просрочено`;
                }

                var template_text = $(`
                    <div class="settingBlock_body_line" data_more="${element.inv._id}">
                        <span>${i + 1}</span>
                        <span>${element.inv.projectId}</span>
                        <span>${element.project.data.name}</span>
                        <span>${element.inv.data.pay.toString().ReplaceNumber()} ₽</span>
                        <span>${element.inv.invester}</span>
                        <span>${timeText}</span>
                        <span>
                            <span class="settingBlock_wait settingBlock_block settingBlock_accept" data="${element.inv.invester}">Открыть</span>
                        </span>
                    </div>
                `);


                errorBlock = false;
                settingBlock.find('.settingBlock_body').append(template_text);
            });

            if(errorBlock)
            {
                var template_text_error = $(`
                    <div class="version2_errorPushBlockDefault">
                        <span>У вас нет поступлений</span>
                    </div>
                `);

                settingBlock.find('.settingBlock_body').append(template_text_error)
            }

            _data.forEach(function(element, i) 
            {
                var needMiliseconds = getTimeRemaining(element.Inv.date_append.toString());
                var timeText        = "";

                if(needMiliseconds.hours >= 24)
                {
                    timeText = `${parseInt(Number(needMiliseconds.hours / 24))} дня и ${Number(needMiliseconds.hours % 24)} ч`;
                }
                else if(needMiliseconds.hours < 24 && needMiliseconds.hours >= 0)
                {
                    timeText = `${needMiliseconds.hours} ч`;
                }
                else
                {
                    timeText = `Просрочено`;
                }

                var template_text = $(`
                    <div class="settingBlock_body_line" data="${element.Inv.invester}"  data_more="${element.Inv._id}">
                        <span>${i + 1}</span>
                        <span>${element.Inv.projectId}</span>
                        <span>${element.project.data.name}</span>
                        <span>${element.Inv.data.pay.toString().ReplaceNumber()} руб</span>
                        <span>${element.Inv.invester}</span>
                        <span>${timeText}</span>
                        <span>
                            <span class="settingBlock_wait settingBlock_block settingBlock_accept" data="${element.Inv.invester}">Открыть</span>
                        </span>
                    </div>
                `);

                settingBlock.find('.settingBlock_body').append(template_text);
            });

            $('.index_page_body_data').append(settingBlock);

            $('.settingBlock_body_line').click( function () {
                location.href = `/?page=activ_projects&id=${$(this).attr('data_more')}`;
            });
        }
    }

    class myProjects
    {
        constructor() {};

        async render(data_rt) 
        {
            var _data = await callApi({
                methodName: "getAllProjectsBusiness",
                data: data_rt._id,
            });

            if(_data.length == 1)
            {
                location.href = `/?page=myProjects&id=${_data[0]._id}`;
            }
            else
            {
                var settingBlock = $(`
                    <div class="settingBlock">
                        <div class="version2_default_bkg row_default"></div>
                        <div class="settingBlock_header">
                            <div class="settingBlock_header_line">
                                <span>#</span>
                                <span>Номер проекта</span>
                                <span>Название</span>
                                <span>Смотреть проект</span>
                            </div>
                        </div>
                        <div class="settingBlock_body">

                        </div>
                    </div>
                `);

                settingBlock.css({
                    "marginTop": "0",
                })

                _data.forEach(function(element, i) {
                    var template_text = `
                        <div class="settingBlock_body_line" data="${element._id}">
                            <span>${i + 1}</span>
                            <span>${element._id}</span>
                            <span>${element.data.name}</span>
                            <span><span class="version2ButtonGradient1 settingBlock_wait settingBlock_block settingBlock_accept" data="${element._id}">Посмотреть</span></span>
                        </div>
                    `;

                    settingBlock.find('.settingBlock_body').append(template_text);
                })

                $('.index_page_body_data').append(settingBlock);

                $('.settingBlock_body_line').click( function() {
                    location.href = `/?page=myProjects&id=${$(this).attr('data')}`;
                })
            }
        }

        async renderMenuByBlock(Project_data)
        {
            var settingBlock = $(`
                <div class="settingBlock">
                    <div class="version2_settingBlock_header">
                        <p>Инвестора</p>
                    </div>
                    <div class="version2_default_bkg row_default"></div>
                    <div class="settingBlock_header">
                        <div class="settingBlock_header_line">
                            <span>№</span> 
                            <span>Номер договора</span>
                            <span>Инвестор</span>
                            <span>Дата договора</span>
                            <span>Сумма</span>
                            <span>Договор</span>
                            <span>Реквизиты</span>
                            <span>Сообщение</span>
                        </div>
                    </div>
                    <div class="settingBlock_body">

                    </div>
                </div>
            `);

            Project_data.moreGetData.invsPush.forEach(function(element, i) 
            {
                var UserNameInvester = null;
                var bank        = null;
                var bik         = null;
                var nomer       = null;
                var nomer_kor   = null;


                element.inv.data.data.forEach(elementMoreData => {
                    if(elementMoreData._id == "fio")
                    {
                        UserNameInvester = elementMoreData.data;
                    };

                    if(elementMoreData._id == "bank")
                    {
                        bank = elementMoreData.data;
                    };

                    if(elementMoreData._id == "bik")
                    {
                        bik = elementMoreData.data;
                    };

                    if(elementMoreData._id == "nomer")
                    {
                        nomer = elementMoreData.data;
                    };

                    if(elementMoreData._id == "nomer_kor")
                    {
                        nomer_kor = elementMoreData.data;
                    };
                });

                var template_text = $(`
                    <div class="settingBlock_body_line" data-id="${element.inv.projectId}" data="${element.inv.invester}" data-project="${element.inv._id}" data-document="${element.inv.urlToLastDocument}">
                        <span>${i + 1}</span>
                        <span>${element.inv.projectId}/${i + 1}</span>
                        <span>${UserNameInvester}</span>
                        <span>${DateFormatted(element.inv.date)}</span>
                        <span>${element.inv.data.pay} ₽</span>
                        <span><i class="fal fa-cloud-download"></i></span>
                        <span>
                            <div class="settingBlock_body_line_drop_menu">
                                <p>Банк получателя: <span>${bank}</span></p>
                                <p>БИК: <span>${bik}</span></p>
                                <p>Номер расчетного счета: <span>${nomer}</span></p>
                                <p>Номер кор счета: <span>${nomer_kor}</span></p>
                                <p>Имя получателя: <span>${UserNameInvester}</span></p>
                            </div>
                            <i class="fal fa-cloud-download"></i>
                        </span>
                        <span><i class="fal fa-comments-alt"></i></span>
                    </div>
                `);

                template_text.children('span').eq(0).click( function() {
                    location.href = `./?page=activ_projects&id=${$(this).parent().attr('data-project')}`;
                })
                template_text.children('span').eq(1).click( function() {
                    location.href = `./?page=activ_projects&id=${$(this).parent().attr('data-project')}`;
                }) 
                template_text.children('span').eq(2).click( function() {
                    location.href = `./?page=activ_projects&id=${$(this).parent().attr('data-project')}`;
                })
                template_text.children('span').eq(3).click( function() {
                    location.href = `./?page=activ_projects&id=${$(this).parent().attr('data-project')}`;
                })
                template_text.children('span').eq(4).click( function() {
                    location.href = `./?page=activ_projects&id=${$(this).parent().attr('data-project')}`;
                })
                template_text.children('span').eq(5).click( function() {
                    window.open(`./projects/${$(this).parent().attr('data-id')}/${$(this).parent().attr('data-document')}`, "_blank");
                })

                template_text.children('span').eq(6).css("position", "relative");
                template_text.children('span').eq(6).click( function() 
                {
                    $(".settingBlock_body_line_drop_menu").fadeOut();
                    if($(this).find('.settingBlock_body_line_drop_menu').css('display') == "block")
                    {
                        (this).find('.settingBlock_body_line_drop_menu').fadeOut();
                    } else
                    {
                        $(this).find('.settingBlock_body_line_drop_menu').fadeIn();
                    }
                });


                template_text.children('span').eq(7).click( function() {
                    location.href = `https://investir.one/?page=chats&id=${$(this).parent().attr('data-project')}`;
                });

                settingBlock.find('.settingBlock_body').append(template_text);
            })

            $('.index_page_body_data').append(settingBlock);
        }

        async renderType()
        {
            var Project_data = await callApi({
                methodName: "getProjectNew",
                data: _GET('id'),
            });

            var _header = $(`
                <div class="version2_myProjects_header">
                    <div class="version2_default_bkg row_default"></div>
                    <div class="version2_myProjects_header_row">
                        <div class="info_block_project">
                            <div class="info_block_project_row">
                                <span>№ ${Project_data.project._id}</span>
                                <span>${Project_data.project.data.name}</span>
                                <span>${Project_data.project.type}</span>
                            </div>
                        </div>
                        <div class="settingBlock" style="margin-bottom: 20px; margin-top: 0;">
                            <div class="settingBlock_header">
                                <div class="invester_status_projects_status_first">
                                    <div class="invester_status_projects_status_first_line">
                                        <span>Сумма сбора</span>
                                        <a>${Project_data.project.data.attraction_amount.toString().ReplaceNumber()} ₽</a>
                                        <span>Собрано</span>
                                        <a>${Project_data.moreGetData.paysInvesters.toString().ReplaceNumber()} ₽</a>
                                    </div>
                                    <div class="invester_status_projects_status_first_line">
                                        <span>Выплачено</span>
                                        <a>${Project_data.moreGetData.paysAcceptInvs.toString().ReplaceNumber()} ₽</a>
                                        <span>Долг</span>
                                        <a>${Number(Project_data.moreGetData.commissionForPtoject).toFixed(0).toString().ReplaceNumber()} ₽</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="version2_infoBlock_twoBlockCheack">
                    <div class="settingBlock version2_infoBlock_twoBlockCheack_first" style="margin-bottom: 65px">
                        <div class="version2_default_bkg row_default"></div>
                        <div class="settingBlock_header">
                            <div class="invester_status_projects_status_first">
                                <div class="invester_status_projects_status_first_line">
                                    <span>Кол-во инвесторов</span>
                                    <a>${Project_data.moreGetData.invsPush.length}</a>
                                </div>
                            </div>
                        </div> 
                    </div>
                    <div class="settingBlock version2_infoBlock_twoBlockCheack_second" style="margin-bottom: 65px">
                        <div class="version2_default_bkg row_default"></div>
                        <div class="settingBlock_header settingBlock_header_rowFlex">
                            <div class="invester_status_projects_status_first">
                                <div class="invester_status_projects_status_first_line">
                                    <span>Кол-во заявок</span>
                                    <a>${Project_data.moreGetData.notTakeHow}</a>
                                </div>
                                <div class="invester_status_projects_status_first_line">
                                    <span>На сумму</span>
                                    <a>${Project_data.moreGetData.notTakeHowMoney.toString().ReplaceNumber()} ₽</a>
                                </div>
                            </div>
                        </div> 
                    </div>
                </div>
            `);

            $('.index_page_body_data').append(_header);

            await this.renderMenuByBlock(Project_data);
        }
    }

    class user_block 
    {
        constructor() {};

        async render(_id) 
        {
            var _User = await callApi({
                methodName: "getUserForId",
                data: _id,
            });

            callApi({
                methodName: "version2_userSetDefault",
                data: {
                    id: _id,
                    page: _GET("page"),
                },
            });

            if(_User != "error")
            {
                var _ImgPath    = _User.Path_im;
                var _Alerts     = _User.alerts;
                _User           = _User._User;
    
                console.log(_User);
    
                if(_ImgPath)
                {
                    $('.index_page_body_header_user_avatar_img img').attr('src', `https://api.telegram.org/file/bot2062839693:AAE0hzj8SVXyexq29s5x7aRLC5x8O77c-pQ/${_ImgPath.file_path}`);
                }
                
                $('.index_page_body_header_user_avatar_name span').html(_User.first_name);
                $('.index_page_body_header_user_avatar_name p').html(_User.type);
    
                var buttons = 
                {
                    "investor": 
                    `
                        <div class="index_page_menu_block_line" data="activ_projects">
                            <i class="fal fa-chart-line"></i>
                            <span>Главная</span>
                        </div>
                        <div class="index_page_menu_block_line" data="wait_projects">
                            <i class="fal fa-inventory"></i>
                            <span>Ожидают</span>
                        </div>
                        <div class="index_page_menu_block_line" data="applications">
                            <i class="fal fa-browser"></i>
                            <span>Заявки</span>
                        </div>
                        <div class="index_page_menu_block_line" data="Attracted_by_me">
                            <i class="fal fa-users"></i>
                            <span>Привлечено</span>
                        </div>
                        <div class="index_page_menu_block_line" data="not_correct">
                            <i class="fal fa-times"></i>
                            <span>Отказано</span>
                        </div>
                        <div class="index_page_menu_block_line" data="chats">
                            <i class="fal fa-comments"></i>
                            <span>Мессенджер</span>
                            <div class="index_page_menu_block_line_alert">
                                <i class="fad fa-bell"></i>
                            </div>
                        </div>
                    `,
                    "business": `
                        <div class="index_page_menu_block_line" data="myProjects">
                            <i class="fas fa-calendar-star"></i>
                            <span>Мои проекты</span>
                        </div>
                        <div class="index_page_menu_block_line" data="payments_new">
                            <i class="fal fa-credit-card"></i>
                            <span>Выплаты</span>
                        </div>
                        <div class="index_page_menu_block_line" data="obligations">
                            <i class="fas fa-hands-helping"></i>
                            <span>Обязательства</span>
                        </div>
                        <div class="index_page_menu_block_line" data="acceptPays">
                        <i class="fas fa-check-square"></i> 
                            <span>Поступления</span>
                        </div>
                        <div class="index_page_menu_block_line" data="chats">
                            <i class="fas fa-comments-alt"></i>
                            <span>Мессенджер</span>
                            <div class="index_page_menu_block_line_alert">
                                <i class="fad fa-bell"></i>
                            </div>
                        </div>
                    `,
                    "attraction": `
                        <div class="index_page_menu_block_line" data="Attracted_by_me">
                            <i class="fal fa-users"></i>
                            <span>Мной привлечено</span>
                        </div>
                        <div class="index_page_menu_block_line" data="chats">
                            <i class="fal fa-comments"></i>
                            <span>Мессенджер</span>
                            <div class="index_page_menu_block_line_alert">
                                <i class="fad fa-bell"></i>
                            </div>
                        </div>
                    `,
                }
    
                $('.index_page_menu_block_row').append(buttons[_User.type]);
    
                $(`.index_page_menu_block_line[data="${global.allData.pageID}"]`).addClass('selected');
                $('.index_page_body_header_info span').html($('.index_page_menu_block_line.selected').text());
    
                $('.index_page_menu_block_line').click( function() {
                    location.href = `/?page=${$(this).attr('data')}`;
                });
    
                if(_User.type == "business")
                {
                    
                } else 
                {
                    if(window.screen.width > 1300)
                    {
                        $(".index_page_menu").css({ 
                            height: "329px",
                        }); 
                    }
                }
    
                if(_User.alerts_main)
                {
                    // var Action_wait_projects = 0;

                    // _User.alerts_main.forEach(function(alert) 
                    // {
                    //     if(alert.type == "pay_of_invNotFullPay") Action_wait_projects = Action_wait_projects + 1;
                    // });

                    // if(Action_wait_projects != 0)
                    // {
                    //     $('.index_page_menu_block_line[data="wait_projects"]').append(`
                    //         <div class="index_page_menu_block_line_alertMini">
                    //             <span>${Action_wait_projects}</span>
                    //         </div>
                    //     `);
                    // }
                };

                if(typeof _Alerts != "undefined")
                {
                    var allIninAlertsNumber = 0;

                    if(typeof _Alerts.wait_projects != "undefined" && _Alerts.wait_projects > 0)
                    {
                        $('.index_page_menu_block_line[data="wait_projects"]').append(`
                            <div class="index_page_menu_block_line_alertMini">
                                <span>${_Alerts.wait_projects}</span>
                            </div>
                        `);

                        allIninAlertsNumber = allIninAlertsNumber + Number(_Alerts.wait_projects.toString().trim());
                    };

                    if(typeof _Alerts.not_correct != "undefined" && _Alerts.not_correct > 0)
                    {
                        $('.index_page_menu_block_line[data="not_correct"]').append(`
                            <div class="index_page_menu_block_line_alertMini">
                                <span>${_Alerts.not_correct}</span>
                            </div>
                        `);

                        allIninAlertsNumber = allIninAlertsNumber + Number(_Alerts.not_correct.toString().trim());
                    };

                    if(typeof _Alerts.chats != "undefined" && _Alerts.chats > 0)
                    {
                        $('.index_page_menu_block_line[data="chats"]').append(`
                            <div class="index_page_menu_block_line_alertMini">
                                <span>${_Alerts.chats}</span>
                            </div>
                        `);

                        allIninAlertsNumber = allIninAlertsNumber + Number(_Alerts.chats.toString().trim());
                    };

                    if(typeof _Alerts.activ_projects != "undefined" && _Alerts.activ_projects > 0)
                    {
                        $('.index_page_menu_block_line[data="activ_projects"]').append(`
                            <div class="index_page_menu_block_line_alertMini">
                                <span>${_Alerts.activ_projects}</span>
                            </div>
                        `);

                        allIninAlertsNumber = allIninAlertsNumber + Number(_Alerts.activ_projects.toString().trim());
                    };

                    if(allIninAlertsNumber > 0)
                    {
                        if(window.screen.width < 1300)
                        {
                            $('.index_page_body_header_alertNewBlock').css({
                                "display": "flex",
                            }).find('span').html(allIninAlertsNumber);
                        }
                    }
                };
            };

            $('.index_page_body_header_user_avatar_img').click( function() {
                if(_getCookie("black_styles"))
                {
                    delCookie('black_styles');
                    location.reload();
                }
                else
                {
                    setCookie("black_styles", "true");
                    location.reload();
                }
            })

            return _User;
        }
    }

    class chats 
    {
        constructor() {};

        async render(data) 
        {
            if(_GET('owner')) 
            {
                var templateText = `
                    <div class="chat_block">
                        <div class="chat_block_chat">
                            <div class="chat_block_chat_header">
                                <span>Чат</span>
                            </div>
                            <div class="chat_block_chat_body">
                                <div class="chat_block_chat_body_row">

                                    <div class="chat_block_chat_body_msgs">

                                    </div>

                                    <div class="chat_block_chat_body_row_input">
                                        <input type="text">
                                        <span>Отправить</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="chat_block_info">
                            <div class="info_active_block_photo">
                            
                            </div>
                            <span>Тех поддержка</span>
                            <p>Администрация</p>
                        </div>
                    </div>
                `;

                $('.index_page_body_data').append(templateText);
            } else {
                if(_GET('id')) {

                    var all_msgs = await callApi({
                        methodName: "all_msgs",
                        data: {
                            user: _GET('user'),
                            to: _GET('id'),
                        },
                    });
    
                    var clearAlertMsg = await callApi({
                        methodName: "clearAlertMsg",
                        data: global.allData._id,
                    });
    
                    console.log(all_msgs);
    
    
                    var templateText = `
                        <div class="chat_block">
                            <div class="chat_block_chat">
                                <div class="chat_block_chat_header">
                                    <span>Чат</span>
                                </div>
                                <div class="chat_block_chat_body">
                                    <div class="chat_block_chat_body_row">
    
                                        <div class="chat_block_chat_body_msgs">
    
                                        </div>
    
                                        <div class="chat_block_chat_body_row_input">
                                            <input type="text">
                                            <span>Отправить</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="chat_block_info">
                                <div class="info_active_block_photo">
                                
                                </div>
                                <span>Кирилл Максимов</span>
                                <p>Invester</p>
                            </div>
                        </div>
                    `;
        
                    $('.index_page_body_data').append(templateText);
    
                    if(all_msgs) {
                        if(all_msgs.msgs.length > 0) {
                            all_msgs.msgs.forEach(function(el) 
                            {
                                var myBlock = `
                                    <div class="chat_block_chat_body_msgs_line">
                                        <div class="chat_block_chat_body_msgs_line_my">
                                            <span>${el.text}</span>
                                        </div>
                                    </div>
                                `;
    
                                var notMyblock = `
                                    <div class="chat_block_chat_body_msgs_line chat_block_chat_body_msgs_line_left">
                                        <div class="chat_block_chat_body_msgs_line_my">
                                            <span>${el.text}</span>
                                        </div>
                                    </div>
                                `;
    
                                if(global.allData.User.type == "business")
                                {
                                    if(el.type == "investor")
                                    {
                                        $('.chat_block_chat_body_msgs').append(notMyblock);
                                    } else {
                                        $('.chat_block_chat_body_msgs').append(myBlock);
                                    }
                                } else {
                                    if(el.type == "investor")
                                    {
                                        $('.chat_block_chat_body_msgs').append(myBlock);
                                    } else {
                                        $('.chat_block_chat_body_msgs').append(notMyblock);
                                    }
                                }
    
                                
                            })
            
                            $('.chat_block_chat_body_msgs').animate({scrollTop: $('.chat_block_chat_body_msgs').height()}, 'fast');
                        }
                    }
        
                    var Project_data = await callApi({
                        methodName: "getProject",
                        data: _GET('id'),
                    });
    
                    var _User = await callApi({
                        methodName: "getUserForId",
                        data: _GET('user'),
                    });
        
                    var headerShow = {
                        "investor": function() {
                            $('.chat_block_info span').html(Project_data.data.name);
                            $('.chat_block_info p').html("business");
                        },
                        "business": function() {
                            $('.chat_block_info span').html(_User.first_name);
                            $('.chat_block_info p').html("investor");
                        },
                    }
        
                    headerShow[_User._User.type]();
        
                    $('.chat_block_chat_body_row_input input').focus( async function() {
                        $(window).keyup(async function(event){
                            if(event.keyCode == 13) {
                                event.preventDefault();
                                var myBlock = `
                                    <div class="chat_block_chat_body_msgs_line">
                                        <div class="chat_block_chat_body_msgs_line_my">
                                            <span>${$('.chat_block_chat_body_row_input input').val()}</span>
                                        </div>
                                    </div>
                                `;
        
                                $('.chat_block_chat_body_msgs').append(myBlock);
        
                                $('.chat_block_chat_body_msgs').animate({scrollTop: $('.chat_block_chat_body_msgs').height()}, 'fast');
        
                                await callApi({
                                    methodName: "msgUP",
                                    data: {
                                        user: _GET('user'),
                                        to: _GET('id'),
                                        type: _User.type,
                                        msg: $('.chat_block_chat_body_row_input input').val(),
                                    },
                                });
        
                                $('.chat_block_chat_body_row_input input').val('');
                            }
                        });
                    });
        
                    $('.chat_block_chat_body_row_input span').click( async function() {
        
                        var myBlock = `
                            <div class="chat_block_chat_body_msgs_line">
                                <div class="chat_block_chat_body_msgs_line_my">
                                    <span>${$('.chat_block_chat_body_row_input input').val()}</span>
                                </div>
                            </div>
                        `;
        
                        $('.chat_block_chat_body_msgs').append(myBlock);
        
                        $('.chat_block_chat_body_msgs').animate({scrollTop: $('.chat_block_chat_body_msgs').height()}, 'fast');
        
                        await callApi({
                            methodName: "msgUP",
                            data: {
                                user: _GET('user'),
                                to: _GET('id'),
                                type: _User.type,
                                msg: $('.chat_block_chat_body_row_input input').val(),
                            },
                        });
        
                        $('.chat_block_chat_body_row_input input').val('');
                    });
                } else 
                {
                    console.log('start');
    
                    var selectedMsgChats = await callApi({
                        methodName: "selectedMsgChats",
                        data: data._id,
                    });
    
                    console.log(selectedMsgChats);
    
                    var block = $(`
                        <div class="msg_block_getting">
    
                        </div>
                    `);
    
                    selectedMsgChats.forEach(el => {
    
                        var template_text = $(`
                            <div class="msg_block_getting_line" data="${el.business}" data-more="${el.investor}">
                                <div class="msg_block_getting_line_img">
                                    <div class="msg_block_getting_line_img_block"></div>
                                </div>
                                <div class="msg_block_getting_line_text">
                                    <span>VIBERY.STORE</span>
                                    <p>${el.msgs[el.msgs.length - 1].text}</p>
                                </div>
                            </div>
                        `);
                        
                        block.append(template_text);
                    })
    
                    $('.index_page_body_data').append(block);
    
                    $('.msg_block_getting_line').click( function() {
                        location.href = `https://investir.one/?user=${$(this).attr('data-more')}&page=chats&id=${$(this).attr('data')}`;
                    })
    
                }
            }
        }
    }

    class signature
    {
        constructor() {};

        async render() 
        {
            $('.index_page').addClass('signature');

            var _body = $(`
                <div class="signature_canvas">
                    <div class="signature_canvas_row">
                        <span class="signature_canvas_span">Подпишите документ</span>
                        <div class="row_canvas">
                            <canvas width="700" height="400"></canvas>
                        </div>
                        <div class="index_page_buttons">
                            <span class="clean">Очистить</span>
                            <span class="put">Посмотреть подписываемый документ<i class="fas fa-arrow-right" aria-hidden="true"></i></span>
                            <span class="accept_signature">Отправить</span>
                        </div>
                    </div>
                </div>
            `);

            $('.index_page_body_data').append(_body);

            var canvas          = document.querySelector("canvas");
            var signaturePad    = new SignaturePad(canvas);

            $('.clean').click( function() {
                signaturePad.clear();
            });

            $('.put').click( function() {
                window.open(`https://investir.one/html/project/document/#${_GET('id')}#/?id=${global.allData.User._id}`, '_blank');
            });

            $('.accept_signature').click( async function() 
            {
                alert('Документ подписан!');

                const _dataImg = signaturePad.toDataURL();

                var _data = callApi({
                    methodName: "setSignaturePro",
                    data: {
                        id: _GET('id'),
                        user: _GET('user'),
                        data: _dataImg,
                    },
                });

                location.href = "https://t.me/invester_official_bot?start=setSignaturePro_1";
            })
        }
    }

    class Attracted_by_me
    {
        constructor() {
            this.allMoneyMembers    = 0;
            this._paysInvesters     = [];
            this._paysBusiness      = [];
            this.allAttracted       = null;
        };

        async renderHeader(_data) 
        {
            var headerInfoBlock = 
            $(`
                <div class="Attracted_by_me_headerRefUrlsBlock">
                    <div class="Attracted_by_me_headerRefUrlsBlock_blocks">
                        <div class="Attracted_by_me_headerRefUrlsBlock_blocks_line">
                            <div class="version2_default_bkg row_default"></div>
                            <div class="Attracted_by_me_headerRefUrlsBlock_blocks_line_row">
                                <span class="Attracted_by_me_headerRefUrlsBlock_blocks_line_row_first_span">Ваша реферальная ссылка для Инвесторов</span>
                                <span class="Attracted_by_me_headerRefUrlsBlock_blocks_line_row_first_span_two">https://t.me/invester_official_bot?start=adder_${_data.User.user}</span>
                                <div class="Attracted_by_me_headerRefUrlsBlock_blocks_line_copy">
                                    <i class="fas fa-copy"></i>
                                </div>
                            </div>
                        </div>
                        <div class="Attracted_by_me_headerRefUrlsBlock_blocks_line">
                            <div class="version2_default_bkg row_default"></div>
                            <div class="Attracted_by_me_headerRefUrlsBlock_blocks_line_row">
                                <span class="Attracted_by_me_headerRefUrlsBlock_blocks_line_row_first_span">Ваша реферальная ссылка для Бизнеса</span>
                                <span class="Attracted_by_me_headerRefUrlsBlock_blocks_line_row_first_span_two">https://t.me/invester_official_bot?start=adder-b_${_data.User.user}</span>
                                <div class="Attracted_by_me_headerRefUrlsBlock_blocks_line_copy">
                                    <i class="fas fa-copy"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="Attracted_headerInfoBlock">
                    <div class="Attracted_headerInfoBlock_block">
                        <div class="version2_default_bkg row_default"></div>
                        <div class="Attracted_headerInfoBlock_block_row">
                            <div class="Attracted_headerInfoBlock_block_i">
                                <img src="/html/assets/images/2.0.0/Rectangle 6.png" alt="">
                            </div>
                            <div class="Attracted_headerInfoBlock_block_text">
                                <span>Мной привлечено инвесторов</span>
                                <p>${this.allAttracted.investors.length}</p>
                            </div>
                        </div>
                    </div>
                    <div class="Attracted_headerInfoBlock_block Attracted_headerInfoBlock_block_right">
                        <div class="version2_default_bkg row_default"></div>
                        <div class="Attracted_headerInfoBlock_block_row">
                            <div class="Attracted_headerInfoBlock_block_i">
                                <img src="/html/assets/images/2.0.0/Ellipse 18.png" alt="">
                            </div>
                            <div class="Attracted_headerInfoBlock_block_text Attracted_headerInfoBlock_block_text_moneys" data="wait">
                                <span>Общая сумма бонусов начисленных</span>
                                <p>0</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="Attracted_headerInfoBlock">
                    <div class="Attracted_headerInfoBlock_block">
                        <div class="version2_default_bkg row_default"></div>
                        <div class="Attracted_headerInfoBlock_block_row">
                            <div class="Attracted_headerInfoBlock_block_i">
                                <img src="/html/assets/images/2.0.0/business.png" alt="">
                            </div>
                            <div class="Attracted_headerInfoBlock_block_text">
                                <span>Мной привлечено бизнесс проектов</span>
                                <p>${this.allAttracted.business.length}</p>
                            </div>
                        </div>
                    </div>
                    <div class="Attracted_headerInfoBlock_block Attracted_headerInfoBlock_block_right">
                        <div class="version2_default_bkg row_default"></div>
                        <div class="Attracted_headerInfoBlock_block_row">
                            <div class="Attracted_headerInfoBlock_block_i">
                                <img src="/html/assets/images/2.0.0/Ellipse 18.png" alt="">
                            </div>
                            <div class="Attracted_headerInfoBlock_block_text Attracted_headerInfoBlock_block_text_moneys" data="accept">
                                <span>Общая сумма бонусов выплаченных</span>
                                <p>0</p>
                            </div>
                        </div>
                    </div>
                </div>
            `);

            headerInfoBlock.find(".Attracted_by_me_headerRefUrlsBlock_blocks_line_copy").click( function() {
                var $tmp = $("<textarea>");
                $("body").append($tmp);
                $tmp.val($(this).parent().find('span').eq(1).text()).select();
                document.execCommand("copy");
                $tmp.remove();
                alert('Ваша ссылка скопирована в буфер обмена!');
            });

            var moreGetButtons = $(`
                <div class="moreGetButtons" data="get">
                    <div class="version2_default_bkg row_default"></div>
                    <span data="get">
                        Запросить выплату
                        <div class="moreGetButtons_buttonOpen">
                            <i class="fal fa-plus"></i>
                        </div>
                    </span>
                </div>
            `);

            moreGetButtons.find('span[data="get"]').click( function () {
                location.href = "./?page=get_money_abstraction"
            });

            $('.index_page_body_data').append(headerInfoBlock);
            $('.index_page_body_data').append(moreGetButtons);
        }

        async renderInvesters(_pays) 
        {      
            var settingBlock = $(`
                <div class="settingBlock">
                    <div class="version2_settingBlock_header">
                        <p>Привлеченные инвестора</p>
                    </div>
                    <div class="version2_default_bkg row_default"></div>
                    <div class="settingBlock_header">
                        <div class="settingBlock_header_line">
                            <span>№</span>
                            <span>username</span>
                            <span>Имя</span>
                        </div>
                    </div>
                    <div class="settingBlock_body">

                    </div> 
                </div>
            `);

            settingBlock.css("margin-top", "70px");

            var initNumber  = 1;
            var errorBlock  = true;

            for(var element of this.allAttracted.investors)
            {
                var template_text = `
                    <div class="settingBlock_body_line">
                        <span>
                            <div class="version2_settingBlock_mobile_line">
                                <span>№</span>
                            </div>
                            ${initNumber}
                        </span>
                        <span>
                            <div class="version2_settingBlock_mobile_line">
                                <span>username</span>
                            </div>
                            ${element.username}
                        </span>
                        <span>
                            <div class="version2_settingBlock_mobile_line">
                                <span>Имя</span>
                            </div>
                            ${element.first_name}
                        </span>
                    </div>
                `;

                initNumber++;
                errorBlock = false;
                settingBlock.find('.settingBlock_body').append(template_text);
            }

            if(errorBlock)
            {
                var template_text_error = $(`
                    <div class="version2_errorPushBlockDefault">
                        <span>У вас нет привлеченных инвесторов</span>
                    </div>
                `);

                settingBlock.find('.settingBlock_body').append(template_text_error)
            }

            $('.index_page_body_data').append(settingBlock);

            return;
        }

        async renderBussnes(_dataMore)
        {
            var settingBlock = $(`
                <div class="settingBlock">
                    <div class="version2_settingBlock_header">
                        <p>Привлеченные бизнес проекты</p>
                    </div>
                    <div class="version2_default_bkg row_default"></div>
                    <div class="settingBlock_header">   
                        <div class="settingBlock_header_line">
                            <span>№</span>
                            <span>Номер проекта</span>
                            <span>Название проекта</span>
                            <span>Сумма выплаты</span>
                        </div>
                    </div>
                    <div class="settingBlock_body">

                    </div> 
                </div>
            `);

            settingBlock.css("margin-top", "70px");

            var initNumber  = 1;
            var errorBlock  = true;

            for(var element of this.allAttracted.business)
            {  
                var template_text = `
                    <div class="settingBlock_body_line">
                        <span>
                            <div class="version2_settingBlock_mobile_line">
                                <span>№</span>
                            </div>
                            ${initNumber}
                        </span>
                        <span>
                            <div class="version2_settingBlock_mobile_line">
                                <span>Номер проекта</span>
                            </div>
                            ${element._id}
                        </span>
                        <span>
                            <div class="version2_settingBlock_mobile_line">
                                <span>Название проекта</span>
                            </div>
                            ${element.data.name}
                        </span>
                        <span>
                            <div class="version2_settingBlock_mobile_line">
                                <span>Сумма выплаты</span>
                            </div>
                            ${((element.payersData.commission) * (element.payersData.attraction_commission / 100) * (element.payersData.business_commission / 100)).toFixed(3)} %
                        </span>
                    </div>
                `;

                initNumber = initNumber + 1;
                errorBlock = false;
                settingBlock.find('.settingBlock_body').append(template_text);
            }

            if(errorBlock)
            {
                var template_text_error = $(`
                    <div class="version2_errorPushBlockDefault">
                        <span>У вас нет привлеченных бизнес проектов</span>
                    </div>
                `);

                settingBlock.find('.settingBlock_body').append(template_text_error)
            }

            $('.index_page_body_data').append(settingBlock);

            return;
        }

        async allProjectsRender() {
            var _data = await callApi({
                methodName: "getAllProjectsInvesting",
                data: null,
            });

            console.log(_data);

            var settingBlock = $(`
                <div class="settingBlock">
                    <div class="version2_settingBlock_header">
                        <p>Вознаграждения по проектам</p>
                    </div>
                    <div class="version2_default_bkg row_default"></div>
                    <div class="settingBlock_header">
                        <div class="settingBlock_header_line">
                            <span>№</span>
                            <span>ID Предложения</span>
                            <span>Имя предложения</span>
                            <span>Сумма выплаты за инвестора</span>
                        </div>
                    </div>
                    <div class="settingBlock_body">

                    </div> 
                </div>
            `);

            settingBlock.css("margin-top", "70px");

            var initNumber = 1;

            for(var element of _data)
            {
                var procentAttraction   = Number(element.payersData.commission / 100 * element.payersData.attraction_commission);
                var procentInvester     = Number(procentAttraction / 100 * element.payersData.investors_commission);

                var template_text = $(`
                    <div class="settingBlock_body_line" data="${element.channel_id}">
                        <span>
                            <div class="version2_settingBlock_mobile_line">
                                <span>№</span>
                            </div>
                            ${initNumber}
                        </span>
                        <span>
                            <div class="version2_settingBlock_mobile_line">
                                <span>ID Предложения</span>
                            </div>
                            ${element._id}
                        </span>
                        <span>
                            <div class="version2_settingBlock_mobile_line">
                                <span>Имя предложения</span>
                            </div>
                            ${element.data.name}
                        </span>
                        <span>
                            <div class="version2_settingBlock_mobile_line">
                                <span>Сумма выплаты за инвестора</span>
                            </div>
                            ${Math.floor(Number(procentInvester))} %
                        </span>
                    </div>
                `);

                template_text.click( function() {
                    window.location = `tg://resolve?domain=invester_official&post=${$(this).attr('data')}`;
                });

                initNumber = initNumber + 1;
                settingBlock.find('.settingBlock_body').append(template_text);
            }

            $('.index_page_body_data').append(settingBlock);
        }

        async renderAllPayments()
        {
            var _WaitMoneys     = 0;
            var _AcceptMoneys   = 0;
            var allPayments     = await callApi({
                methodName: "allPayments",
                data:  global.allData._id,
            });

            var settingBlock = $(`
                <div class="settingBlock">
                    <div class="version2_settingBlock_header">
                        <p>Статистика ваших поступлений</p>
                    </div>
                    <div class="version2_default_bkg row_default"></div>
                    <div class="settingBlock_header">
                        <div class="settingBlock_header_line">
                            <span>№</span>
                            <span>Тип привлечения</span>
                            <span>Номер Проекта/Инвестора</span>
                            <span>Сумма выплаты</span>
                            <span>Дата</span>
                        </div>
                    </div>
                    <div class="settingBlock_body">

                    </div> 
                </div>
            `);

            settingBlock.css("margin-top", "70px");

            var initNumber  = 1;
            var errorBlock  = true;

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

                var template_text = $(`
                    <div class="settingBlock_body_line">
                        <span>
                            <div class="version2_settingBlock_mobile_line">
                                <span>№</span>
                            </div>
                            ${initNumber}
                        </span>
                        <span>
                            <div class="version2_settingBlock_mobile_line">
                                <span>Тип привлечения</span>
                            </div>
                            ${AttractionType}
                        </span>
                        <span>
                            <div class="version2_settingBlock_mobile_line">
                                <span>Номер Проекта/Инвестора</span>
                            </div>
                            ${AttractionId}
                        </span>
                        <span>
                            <div class="version2_settingBlock_mobile_line">
                                <span>Сумма выплаты</span>
                            </div>
                            ${commissionAttractionNeedPay.toString().ReplaceNumber()} руб
                        </span>
                        <span>
                            <div class="version2_settingBlock_mobile_line">
                                <span>Дата</span>
                            </div>
                            ${DateFormatted(element.date)}
                        </span>
                    </div>
                `);

                settingBlock.find('.settingBlock_body').append(template_text);

                initNumber++;

                if(element.status == "wait")
                {
                    _WaitMoneys     = _WaitMoneys + commissionAttractionNeedPay;
                }

                if(element.status == "accept")
                {
                    _AcceptMoneys   = _AcceptMoneys + commissionAttractionNeedPay;
                }

                errorBlock = false;
            }

            if(errorBlock)
            {
                var template_text_error = $(`
                    <div class="version2_errorPushBlockDefault">
                        <span>У вас нет выплат</span>
                    </div>
                `);

                settingBlock.find('.settingBlock_body').append(template_text_error)
            }

            $('.Attracted_headerInfoBlock_block_text_moneys[data="wait"] p').html(_WaitMoneys.toString().ReplaceNumber() + " ₽");
            $('.Attracted_headerInfoBlock_block_text_moneys[data="accept"] p').html(_AcceptMoneys.toString().ReplaceNumber() + " ₽");

            $('.index_page_body_data').append(settingBlock);
        }

        async renderAllPaymentsRequest() 
        {
            var _data = await callApi({
                methodName: "version2_renderAllPaymentsRequest",
                data: global.allData.User._id,
            });

            var settingBlock = $(`
                <div class="settingBlock">
                    <div class="version2_settingBlock_header">
                        <p>Статистика ваших выплат</p>
                    </div>
                    <div class="version2_default_bkg row_default"></div>
                    <div class="settingBlock_header">
                        <div class="settingBlock_header_line">
                            <span>№</span>
                            <span>Тип</span>
                            <span>Email</span>
                            <span>Статус</span>
                        </div>
                    </div>
                    <div class="settingBlock_body">

                    </div> 
                </div>
            `);

            settingBlock.css("margin-top", "70px");

            var initNumber  = 1;
            var errorBlock  = true;

            for(var element of _data)
            {
                var type = "Юр.лицо";

                var template_text = $(`
                    <div class="settingBlock_body_line">
                        <span>
                            <div class="version2_settingBlock_mobile_line">
                                <span>№</span>
                            </div>
                            ${initNumber}
                        </span>
                        <span>
                            <div class="version2_settingBlock_mobile_line">
                                <span>Тип</span>
                            </div>
                            ${type}
                        </span>
                        <span>
                            <div class="version2_settingBlock_mobile_line">
                                <span>Email</span>
                            </div>
                            ${element.email}
                        </span>
                        <span>
                            <div class="version2_settingBlock_mobile_line">
                                <span>Статус</span>
                            </div>
                            Ожидает подписи
                        </span>
                    </div>
                `);

                settingBlock.find('.settingBlock_body').append(template_text);
                initNumber++;
                errorBlock = false;
            };

            if(errorBlock)
            {
                var template_text_error = $(`
                    <div class="version2_errorPushBlockDefault">
                        <span>У вас нет выплат</span>
                    </div>
                `);

                settingBlock.find('.settingBlock_body').append(template_text_error)
            }

            $('.index_page_body_data').append(settingBlock);
        }

        async render(data) 
        {
            var _data = await callApi({
                methodName: "ALL_DATA",
                data: global.allData.User._id,
            });

            var _pays       = await callApi({
                methodName: "Attracted_by_pays",
                data: data._id,
            });

            var allAttracted = await callApi({
                methodName: "allAttracted",
                data: data._id,
            }); 

            var _this = this;

            console.log(_pays);
            console.log(allAttracted);

            this.allAttracted = allAttracted;

            _pays.forEach(el=> {
                if(el.type == "investing")
                {
                    _this._paysInvesters.push(el);
                } else {
                    _this._paysBusiness.push(el);
                }
            })

            await this.renderHeader(_data);
            await this.allProjectsRender();
            await this.renderInvesters();
            await this.renderBussnes();
            await this.renderAllPayments();
            await this.renderAllPaymentsRequest();
        }
    }

    class reward
    {
        constructor() {};

        async render() {
            var settingBlock = $(`
                <div class="settingBlock">
                    <div class="version2_settingBlock_header">
                        <p>Доступные вознаграждения</p>
                    </div>
                    <div class="version2_default_bkg row_default"></div>
                    <div class="settingBlock_header">
                        <div class="settingBlock_header_line">
                            <span>#</span>
                            <span>Номер проекта</span>
                            <span>Дата</span>
                            <span>Статус</span>
                        </div>
                    </div>
                    <div class="settingBlock_body">

                    </div>
                </div>
            `);

            $('.index_page_body_data').append(settingBlock);
        }
    }

    class ref_url
    {
        constructor() {
            this.global = $(`
                <div class="creating_page"></div>
            `);
        };

        async render() {
            $('.index_page_menu').css({
                "flex": "none",
                "position": "absolute",
                "margin-left": "-100%",
            });

            $('.index_page_body_header_info').css({
                "justify-content": "center",
            });

            $('.index_page_body_header_info span').html("ВАША ССЫЛКА НА ПРИВЛЕЧЕНИЕ БИЗНЕС ПРОЕКТОВ");

            var msgsBlock = $(`
                <div class="creating_page_block">
                    <div class="creating_page_start">
                        <span>
                            https://t.me/invester_official_bot?start=adder-b_${global.allData.User.user}
                        </span>
                    </div>
                </div>
            `);

            msgsBlock.css('margin', '0 auto');

            this.global.append(msgsBlock);

            $('.index_page_body_data').append(this.global);
        }
    }

    class wait_projects
    {
        constructor() {};

        async render()
        {
            var _data = await callApi({
                methodName: "ALL_DATA",
                data: global.allData.User._id,
            });

            var ActionWaitInvs = await callApi({
                methodName: "version2_wait_projects_WaitNotFullInvs",
                data: global.allData.User._id,
            });

            var settingBlock = $(`
                <div class="settingBlock">
                    <div class="version2_settingBlock_header">
                        <p>Ожидайют действия инвестора</p>
                    </div>
                    <div class="version2_default_bkg row_default"></div>
                    <div class="settingBlock_header">
                        <div class="settingBlock_header_line">
                            <span>№</span>
                            <span>№ Проекта</span>
                            <span>Название</span>
                            <span>Договор</span>
                            <span>Сумма</span>
                        </div>
                    </div>
                    <div class="settingBlock_body">

                    </div>
                </div>
            `);

            if(typeof ActionWaitInvs != "undefined" && ActionWaitInvs.length > 0)
            {
                settingBlock.find(".version2_settingBlock_header").append(`
                    <div class="version2_settingBlock_header_allertMini">
                        
                    </div>
                `);
            }

            var i           = 0;
            var errorBlock  = true;

            for(var element of ActionWaitInvs) 
            {
                var template_text = $(`
                    <div class="settingBlock_body_line" data-more="${element.Inv._id}">
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
                            ${element.Project._id}
                        </span>
                        <span>
                            <div class="version2_settingBlock_mobile_line">
                                <span>Название</span>
                            </div>
                            ${element.Project.data.name}
                        </span>
                        <span>
                            <div class="version2_settingBlock_mobile_line">
                                <span>Договор</span>
                            </div>
                            ${element.Project._id}/${element.ActionInit} от ${DateFormatted(element.Inv.date.toString())}
                        </span>
                        <span>
                            <div class="version2_settingBlock_mobile_line">
                                <span>Сумма</span>
                            </div>
                            ${element.Inv.data.pay} ₽
                        </span>
                    </div>
                `);

                template_text.click( function () {
                    location.href = `/?page=activ_projects&id=${$(this).attr('data-more')}`;
                });

                settingBlock.find('.settingBlock_body').append(template_text);
                errorBlock = false;
                i++;
            };

            if(errorBlock)
            {
                var template_text_error = $(`
                    <div class="version2_errorPushBlockDefault">
                        <span>У вас нет проектов в ожидании действия</span>
                    </div>
                `);

                settingBlock.find('.settingBlock_body').append(template_text_error)
            }

            $('.index_page_body_data').append(settingBlock);


            var settingBlock = $(`
                <div class="settingBlock" style="margin-top: 70px;">
                    <div class="version2_settingBlock_header">
                        <p>Ожидают подтверждения бизнесом</p>
                    </div>
                    <div class="version2_default_bkg row_default"></div>
                    <div class="settingBlock_header">
                        <div class="settingBlock_header_line">
                            <span>№</span>
                            <span>№ Проекта</span>
                            <span>Название</span>
                            <span>Договор</span>
                            <span>Сумма</span>
                            <span>Статус</span>
                        </div>
                    </div>
                    <div class="settingBlock_body">

                    </div>
                </div>
            `);

            var i               = 0;
            var errorBlock2     = true;

            for(var element of _data.invester_data.waitInvs)
            {
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
                        <span>
                            <div class="version2_settingBlock_mobile_line">
                                <span>Название</span>
                            </div>
                            ${element.project.data.name}
                        </span>
                        <span>
                            <div class="version2_settingBlock_mobile_line">
                                <span>Договор</span>
                            </div>
                            ${element.project._id}/${element.number}
                        </span>
                        <span>
                            <div class="version2_settingBlock_mobile_line">
                                <span>Сумма</span>
                            </div>
                            ${element.Inv.data.pay} ₽
                        </span>
                        <span>
                            <div class="version2_settingBlock_mobile_line">
                                <span>Статус</span>
                            </div>
                            Ожидает подтверждения
                        </span>
                    </div>
                `);

                template_text.click( function () {
                    location.href = `/?page=activ_projects&id=${$(this).attr('data-more')}`;
                });

                settingBlock.find('.settingBlock_body').append(template_text);
                errorBlock2 = false;
                i++;
            };

            for(var element of _data.invester_data.activeInvs)
            {
                if(typeof element.Inv.data.pts_2 != "undefined")
                {
                    if(element.Inv.applicationRequest)
                    {
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
                                <span>
                                    <div class="version2_settingBlock_mobile_line">
                                        <span>Название</span>
                                    </div>
                                    ${element.project.data.name}
                                </span>
                                <span>
                                    <div class="version2_settingBlock_mobile_line">
                                        <span>Договор</span>
                                    </div>
                                    ${element.project._id}/${element.number}
                                </span>
                                <span>
                                    <div class="version2_settingBlock_mobile_line">
                                        <span>Сумма</span>
                                    </div>
                                    ${element.Inv.data.pay} ₽
                                </span>
                                <span>
                                    <div class="version2_settingBlock_mobile_line">
                                        <span>Статус</span>
                                    </div>
                                    Ожидает подтверждения
                                </span>
                            </div>
                        `);

                        template_text.click( function () {
                            location.href = `/?page=activ_projects&id=${$(this).attr('data-more')}`;
                        });

                        settingBlock.find('.settingBlock_body').append(template_text);
                        errorBlock2 = false;
                        i++;
                    }
                }
            };

            if(errorBlock2)
            {
                var template_text_error = $(`
                    <div class="version2_errorPushBlockDefault">
                        <span>У вас нет проектов в ожидании</span>
                    </div>
                `);

                settingBlock.find('.settingBlock_body').append(template_text_error)
            }

            $('.index_page_body_data').append(settingBlock);
        }
    }

    var components = {
        Attracted_by_me,
        activ_projects,
        put_document,
        pay_investors,
        acceptPays,
        user_block,
        chats,
        myProjects,
        signature,
        reward,
        process_status,
        ref_url,
        wait_projects,
    };

    if(!global.Components) { global.Components = components; } 
    else { 
        for(var key in components)
        {
            global.Components[key] = components[key];
        }
    }

}(window))