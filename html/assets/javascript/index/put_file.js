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

    class put_file
    {
        constructor()
        {
            this.global = $(`<div class="creating_page version2_put_file_creating_page"></div>`);
        }

        defaultCSS()
        {
            $('.index_page_menu').css({
                "flex": "none",
                "position": "absolute",
                "margin-left": "-100%",
            });

            $('.index_page_body_header_info').css({
                "justify-content": "center",
            });

            $('.index_page_body_data').css({
                "padding": 0,
            });

            $('.index_page_body_header_user_logotype').css({
                "display": "none",
            });
        }

        async render()
        {
            this.defaultCSS();

            var getAction       = _GET("action");
            var _this           = this;
            var functionsAction = 
            {
                "investingNotFullNull": async function()
                {
                    var _project = await callApi({
                        methodName: "getProjectForInvesterPageByIdInvDoc",
                        data: _GET('InvId'),
                    });

                    var msgsBlock = $(`
                        <div class="creating_page_block"> 
                            <input type="file" id="Attracted_headerInfoBlock_info_data_alert_buttom_cheack_input">
                            <div class="creating_page_start" style="margin-bottom: 20px">
                                <div class="version2_default_bkg row_default"></div>
                                <span>
                                    Уважаемый Инвестор ${global.allData.User.first_name} прикреите чек за инвестицию по реквезитам</a>.<br><br>
                                    Банк-получатель: ${_project.data.bank} <br>
                                    Корр. счет: ${_project.data.account_correct} <br>
                                    БИК: ${_project.data.bik} <br>
                                    КПП: ${_project.data.kpp} <br>
                                    Получатель: ${_project.data.recipient} <br>
                                    Счет получателя: ${_project.data.account_get} <br>
                                    Назначение платежа: Номер Проекта ${_project._id}, Имя проекта ${_project.data.name} <br>
                                </span>
                            </div>
                            <div class="creating_page_block_qrCode">
                                <div id="qrCodeOutput" class="text-center">
                                    Пожалуйста подождите                                    
                                </div>
                            </div>
                        </div>
                    `);

                    var qrCodePushedText = 
                        `ST00012|` + 
                        `Name=ИП Петров Иван Иванович|` + 
                        `PersonalAcc=40802810112100000591|` + 
                        `BankName=УРАЛЬСКИЙ БАНК ПАО СБЕРБАНК|` + 
                        `BIC=046577674|CorrespAcc=30101810500000000674|` + 
                        `Sum=10000000|` + 
                        `Purpose=Оплата по договору: ПИИ-20-0001 от 04.07.2020. Без НДС.|` + 
                        `PayeeINN=611203541218|` + 
                        `LastName=Иванов|` + 
                        `FirstName=Иван|` + 
                        `MiddleName=Иванович|` + 
                        `PersAcc=ПИИ-20-0001`;

                    msgsBlock.find('#qrCodeOutput').append(QRCode.generateHTML(qrCodePushedText, {}))

                    var documentBlock = $(`
                        <div class="creating_page_input">
                            <div class="creating_page_input_div">
                                <span>Прикрепить</span>
                            </div>
                        </div>
                    `);

                    documentBlock.click( function() {
                        $('#Attracted_headerInfoBlock_info_data_alert_buttom_cheack_input').trigger('click');
                    });
                    
                    msgsBlock.find('#Attracted_headerInfoBlock_info_data_alert_buttom_cheack_input').change( async function() 
                    {
                        var _form               = new FormData();
                        var _url                = `${getURL()}/file_Action.io/files`;

                        _form.append('file',   $(this.files)[0]);
                        _form.append('data',    JSON.stringify({
                            Action: "activ_projects_NotFullPayNull",
                            InvDocId: _GET('InvId'), 
                        }));

                        axios.post(_url, _form, {
                            headers: {
                                'Content-Type': 'multipart/form-data'
                            },
                        }).then(data => 
                        {
                            if(data.data.status == "ok") 
                            {
                                SoloAlert.alert({
                                    title:"Успешно",
                                    body:"",
                                    icon: "success"
                                });
        
                                var templateText = 
                                $(`
                                    <div class="creating_page_input_div">
                                        <span>Заменить</span>
                                    </div>
                                    <div class="creating_page_input_div" data="show">
                                        <span>Посмотреть</span>
                                    </div>
                                    <div class="creating_page_input_div" data="ok">
                                        <span>Подтвердить</span>
                                    </div>
                                `);

                                $('.creating_page_input').empty();
                                $('.creating_page_input').append(templateText);

                                $('.creating_page_input_div[data="show"]').click( function() {
                                    window.open(`/projects/${_project._id}/${_GET("InvId")}_investment.${data.data.FilePts}`, '_blank');
                                });

                                $('.creating_page_input_div[data="ok"]').click( function() {
                                    location.href = `https://investir.one/?page=activ_projects&id=${_GET("InvId")}`;
                                });
                            }
                        });
                    });

                    _this.global.append(msgsBlock);
                    _this.global.append(documentBlock);
                },
                "investingNotFull": async function()
                {
                    var _project = await callApi({
                        methodName: "getProjectForInvesterPageByIdInvDoc",
                        data: _GET('InvId'),
                    });

                    var msgsBlock = $(`
                        <div class="creating_page_block">
                            <input type="file" id="Attracted_headerInfoBlock_info_data_alert_buttom_cheack_input">
                            <div class="creating_page_start" style="margin-bottom: 20px">
                                <div class="version2_default_bkg row_default"></div>
                                <span>
                                    Уважаемый Инвестор ${global.allData.User.first_name} прикреите чек за инвестицию по реквезитам</a>.<br><br>
                                    Банк-получатель: ${_project.data.bank} <br>
                                    Корр. счет: ${_project.data.account_correct} <br>
                                    БИК: ${_project.data.bik} <br>
                                    КПП: ${_project.data.kpp} <br>
                                    Получатель: ${_project.data.recipient} <br>
                                    Счет получателя: ${_project.data.account_get} <br>
                                    Назначение платежа: Номер Проекта ${_project._id}, Имя проекта ${_project.data.name} <br>
                                </span>
                            </div>
                        </div>
                    `);

                    var documentBlock = $(`
                        <div class="creating_page_input">
                            <div class="creating_page_input_div version2_creating_page_input_div_NewButton" data="newOpen">
                                <span>Прикрепить</span>
                            </div>
                        </div>
                    `);

                    documentBlock.find('.creating_page_input_div').click( function() {
                        $('#Attracted_headerInfoBlock_info_data_alert_buttom_cheack_input').trigger('click');
                    });
                    
                    msgsBlock.find('#Attracted_headerInfoBlock_info_data_alert_buttom_cheack_input').change( async function() 
                    {
                        var _form               = new FormData();
                        var _url                = `${getURL()}/file_Action.io/files`;

                        _form.append('file',   $(this.files)[0]);
                        _form.append('data',    JSON.stringify({
                            Action: "activ_projects_NotFullPayNullPts2",
                            InvDocId: _GET('InvId'), 
                        }));

                        axios.post(_url, _form, {
                            headers: {
                                'Content-Type': 'multipart/form-data'
                            },
                        }).then(data => 
                        {
                            if(data.data.status == "ok") {

                                SoloAlert.alert({
                                    title:"Успешно",
                                    body:"",
                                    icon: "success"
                                });
        
                                var templateText = 
                                $(`
                                    <div class="creating_page_input_div version2_creating_page_input_div_NewButton" data="reload">
                                        <span>Заменить</span>
                                    </div>
                                    <div class="creating_page_input_div version2_creating_page_input_div_NewButton" data="show">
                                        <span>Посмотреть</span>
                                    </div>
                                    <div class="creating_page_input_div version2_creating_page_input_div_NewButton" data="ok">
                                        <span>Подтвердить</span>
                                    </div>
                                `);

                                $('.creating_page_input').empty();
                                $('.creating_page_input').append(templateText);

                                $('.creating_page_input_div[data="show"]').click( function() {
                                    if(window.screen.width < 1300)
                                    {
                                        saveUrlAsFile(`/projects/${_project._id}/${_GET("InvId")}_investment_2.${data.data.FilePts}`, `${_GET("InvId")}_investment_2.${data.data.FilePts}`);
                                    }
                                    else
                                    {
                                        window.open(`/projects/${_project._id}/${_GET("InvId")}_investment_2.${data.data.FilePts}`, '_blank');
                                    }
                                });

                                $('.creating_page_input_div[data="ok"]').click( async function() {
                                    await callApi({
                                        methodName: "version2_put_file_alertofOfCloseCheack",
                                        data: _GET('InvId'),
                                    });

                                    window.location = "tg:\/\/resolve?domain=invester_official_bot";
                                });

                                $('.creating_page_input_div[data="reload"]').click( function() {
                                    $('#Attracted_headerInfoBlock_info_data_alert_buttom_cheack_input').trigger('click');
                                });
                            }
                        });
                    });

                    _this.global.append(msgsBlock);
                    _this.global.append(documentBlock);
                },
            };

            if(typeof functionsAction[getAction] != "undefined")
            {
                await functionsAction[getAction]();
            };

            $('.index_page_body_data').append(this.global);
        };
    };

    var components = {
        put_file,
    };

    if(!global.Components) { global.Components = components; } 
    else { 
        for(var key in components)
        {
            global.Components[key] = components[key];
        };
    };

}(window))