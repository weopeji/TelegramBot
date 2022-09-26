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
            this.global     = $(`<div class="creating_page version2_put_file_creating_page"></div>`);
            this.project    = null;
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

            $('.buttons_menu').css({
                "display": "none",
            });

            $('.index_page_body_header_user').css('display', 'none');

            if(typeof this.project.design_type != 'undefined')
            {
                if(this.project.design_type == 'pp') {
                    $('body').addClass('pp_project');
                    $('body').append(`
                        <div class="logo_business">
                            <div class="page-header__logo">
                                <div class="trapezoid left"></div>
                                <div class="trapezoid right"></div>
                                <a href="/">
                                    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0" y="0" viewBox="0 0 1000 1000"><g><path d="M495.1 212c.8-2 3.2-1.7 4.9-1.3 1.7 2 2.4 4.5 3.5 6.9 3.5 7.6 6.8 15.4 10.3 23 7.2-4.1 14.3-8.2 21.5-12.3 1.7-1.2 3.8.1 4.7 1.7.4 2-.2 4.1-.4 6.1-2.1 12.6-4.1 25.3-6.4 37.9-.2 2.1-2.2 3.6-4.2 3.3h-62.1c-2.1.3-4.1-1.2-4.2-3.3-2.3-13.3-4.4-26.6-6.6-39.9-.3-1.9-.8-4.4 1.3-5.5 1.2-1.1 2.8-.6 4 .2 6.9 4 13.9 7.9 20.8 11.9 4.5-9.6 8.4-19.3 12.9-28.7m-8.1 35.1c-.7 1.8-3.1 2.6-4.8 1.6-6.2-3.3-12.1-7.1-18.2-10.3 1.7 10.6 3.5 21.3 5.2 31.9h57.5c1.7-10.6 3.6-21.2 5.2-31.9-6.2 3.3-12.1 7-18.3 10.4-1.6 1-4.1.2-4.7-1.7-3.7-8.1-7.3-16.3-10.9-24.4-3.8 8-7.2 16.3-11 24.4zM38.5 255.1h374.8c0 1.8 0 3.7.1 5.5-125 .3-249.9 0-374.8.1-.1-1.8-.1-3.7-.1-5.6zM582.7 255.1h377.8v5.6c-125.9 0-251.8-.1-377.8 0v-5.6zM655.5 332H828c22.5.1 45.3 2.1 66.9 8.8 14.4 4.6 28.7 11 40.2 21 11.5 10.1 19.1 24.2 22 39.1 3.1 16.1 2.8 33.2-3.7 48.4-7 16.7-20.4 29.9-35.3 39.7-26.5 17-58.1 24.1-89.1 25.6-18.5.6-37 .2-55.5.3v118.4c17 7 34.2 13.6 51.1 20.7-.1 2.6-.1 5.2 0 7.8-56.3.1-112.7 0-169 0v-8c14.1-6.7 28.1-13.7 42.3-20.3.4-53.9.1-107.8.2-161.7-.1-37.2.1-74.4-.1-111.6-14.2-6.6-28.2-13.6-42.4-20.3-.1-2.6-.1-5.2-.1-7.9m118 27.5v131c18.5-.2 37.3 1.2 55.4-3.5 16.3-3.8 31.7-12.7 41.9-26.1 7.7-9.9 11.7-22.4 11.7-34.9.2-14.3-2.8-29.3-11.8-40.7-7.8-10-19.5-16-31.3-19.9-21.3-6.8-43.8-5.9-65.9-5.9zM40 333h170c19.4-.1 38.9 1.3 57.9 5.7 16.2 3.8 32.2 9.9 45.9 19.5 13.2 9.2 22.8 23.3 26.7 38.9 3.9 15.9 4.5 33-.7 48.7-4.3 13-12.6 24.3-22.7 33.4-12.9 11.8-28.7 20.1-45.2 25.9-21.7 7.7-44.9 10.7-67.8 11-15.3.1-30.6 0-46 0 .1 39.5-.1 79.1.1 118.6 17 6.7 33.9 13.6 50.9 20.4v8h-169v-8c14.2-6.9 28.3-13.7 42.5-20.5v-273c-14.3-7-28.4-13.8-42.6-20.6v-8m118 27.5v131c14.5-.2 29 .7 43.4-1.2 16.8-2.2 33.5-8.2 46.1-19.9 11-9.8 18.3-23.6 19.3-38.3 1-16-1.6-33.3-11.9-46.1-9.6-11.9-24.4-18.1-38.9-21.6-18.9-4.7-38.6-3.8-58-3.9zM424 480.9c15.1-11.3 34.5-15.2 53-14.2 15.5.6 31.8 4.3 43.8 14.6 7.3 6.1 12 15.2 11.9 24.8.4 9.6-4.9 18.6-11.8 24.9-11 9.9-25 15.4-38.6 20.6 19.5 18.4 38.7 37.1 58.2 55.6 10.8-16.1 18.8-33.9 25.5-52.1-10.3-3.8-20.5-7.7-30.7-11.5 0-1.6 0-3.3-.1-4.9 25.9-.1 51.8 0 77.7 0v4.9c-9 3.8-18.1 7.2-26.9 11.4-11.2 20.8-22.1 41.9-36 61.1 11.7 11 23.1 22.3 34.9 33.3 8 4.2 16.4 7.8 24.6 11.8v5.2h-72.4c-6.2-5.9-12.4-11.9-18.6-17.8-15.6 12-34.8 19.4-54.4 20.6-18.4 1.3-37.8-.6-54-10-9.2-5.2-17-13.4-20.3-23.5-4.1-12.3-3.2-26.4 3.5-37.5 8.6-15.1 23.8-25 39.4-31.9-7.1-7.2-14-14.7-19.7-23.2-6.9-10.1-8.8-23.1-6.7-35 1.8-11.2 8.9-20.7 17.7-27.2m37.9 0c-5.5 1.7-9.3 6.6-11.1 11.8-3.2 9.3-1.8 19.9 3.5 28.1 5.2 8 11.9 15 18.7 21.7 10.9-10.4 18.1-25.3 17-40.6-.5-7.3-3.5-14.9-9.7-19.2-5.4-3.4-12.4-3.6-18.4-1.8m-32 124.1c-.4 10.7 1.5 22.2 8.2 30.8 5.7 7.5 14.6 12.2 23.8 13.6 16.1 2.5 33.1-1 47-9.7-22.6-21.9-45.1-43.8-67.9-65.5-7.9 8.2-11.1 19.7-11.1 30.8zM516.2 730c2.5-1.6 6.5-.2 6.8 3 .5 3.3-3.4 5.8-6.3 4.3-3-1.1-3.3-5.7-.5-7.3zM623 730.4h6.5v50.1H623v-50.1zM542 736.9h6.5v7.7c3.4 0 6.9-.1 10.3.1-.1 1.7-.1 3.5-.1 5.2h-10.3c.1 7-.1 14 .1 21 .5 5.1 7.1 5.4 10.5 3 .9 1.5 1.6 3.1 2 4.9-4.1 2.3-9.4 2.9-13.8.9-3.2-1.5-5.2-5.1-5.2-8.6-.2-7 0-14-.1-21.1h-6.1v-5.4h6.1c.1-2.6.1-5.1.1-7.7zM369.4 752.5c6.4-10.3 24.2-11.3 30.6-.5-1.6 1.1-3.2 2.2-4.9 3.2-3.7-5.4-11.7-6.7-17-3-7 4.8-6.8 16.8.4 21.2 5.3 3.4 13 2 16.7-3.2 1.6 1 3.3 2.1 4.9 3.1-5.6 9.3-19.7 9.9-27.5 3.1-6.8-5.7-8-16.6-3.2-23.9zM413.4 748.9c5.3-3.8 12.1-5.1 18.4-4.3 3.6.5 7.3 2.2 9.3 5.2 2.1 2.9 2.4 6.6 2.4 10.1v20.5h-6.1c0-1.5.1-3 .1-4.5-4 5-11.2 5.8-17.1 4.3-4.2-1.1-8-4.7-8-9.3-.5-4.6 2.9-9.1 7.3-10.2 5.7-1.5 11.6-.7 17.4-1 .1-3.4-.8-7.4-4.3-8.8-5.5-2.3-12.1-.7-16.8 2.7-.8-1.5-1.7-3.1-2.6-4.7m8.8 16.4c-4.1 1.1-4.5 7.3-.9 9.3 4.6 2.5 11.3 1.5 14.5-2.8 1.9-2 1.2-4.8 1.3-7.2-4.9.3-10.1-.6-14.9.7zM462.5 744.6h6.1v5.5c6.3-7.7 19.1-7.6 25.9-.7 7.4 7.5 6.7 21.6-2 28-7 5.2-18.1 4.6-23.7-2.4v18.4h-6.4c.1-16.2.1-32.5.1-48.8m14.9 5.9c-4.2 1.2-7.6 5.1-8.3 9.4-1.5 6.7 2.8 14.5 9.9 15.2 8 1.7 15.4-6.3 13.9-14.2-.3-7.5-8.5-12.7-15.5-10.4zM515.4 780.5c0-12-.1-23.9 0-35.9h6.4v35.9h-6.4zM574 748.9c5.4-3.9 12.4-5.2 18.9-4.2 3.8.6 7.5 2.5 9.4 6 1.9 3.1 1.9 6.8 2 10.3v19.5c-2.1 0-4.1 0-6.2.1 0-1.5-.1-3-.1-4.5-4.9 5.8-14.3 6.3-20.5 2.5-6.1-3.5-5.8-13.6.5-16.8 6.2-3 13.3-1.6 19.9-2-.1-3.3-.8-7.1-4-8.7-5.6-2.6-12.3-.8-17.1 2.5-1-1.5-1.9-3.1-2.8-4.7m8.3 25.9c4.9 2.3 11.9 1.1 14.7-3.8 1.3-1.9.6-4.3.8-6.4-4.9.2-9.9-.6-14.7.6-4.4 1-4.9 7.8-.8 9.6z"></path></g></svg>
                                </a>
                            </div>
                        </div>
                    `);
                };
            };
        }

        async render()
        {
            var getAction       = _GET("action");
            var _project        = await callApi({methodName: "getProjectForInvesterPageByIdInvDoc", data: _GET('InvId')});
            var _this           = this;
            var functionsAction = 
            {
                "investingNotFullNull": async function()
                {
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
                                <div class="version2_default_bkg row_default"></div>
                                <div class="creating_page_block_qrCode_textLeft">
                                    <span>
                                        <span style="font-size: 20px;margin-bottom: 10px;font-size: 25px;margin-bottom: -10px;display: block;">Удобно с компьютера</span><br>
                                        Наведите камеру
                                    </span>
                                </div>
                                <div id="qrCodeOutput" class="text-center">

                                </div>
                                <div class="creating_page_block_qrCode_textRight">
                                    <span>
                                        <span style="font-size: 20px;margin-bottom: 10px;font-size: 25px;margin-bottom: -10px;display: block;">Удобно с телефона</span><br>
                                        Скачайте и загрузите картинку при оплате в вашем приложении банка
                                    </span>
                                </div>
                            </div>
                        </div>
                    `);

                    var qrCodePushedText = 
                        `ST00012|` + 
                        `Name=${_project.data.recipient}|` + 
                        `PersonalAcc=${_project.data.account_get}|` + 
                        `BankName=${_project.data.bank}|` + 
                        `BIC=${_project.data.bik}|CorrespAcc=${_project.data.kpp}|` + 
                        `Sum=10000000|` + 
                        `Purpose=Номер Проекта ${_project._id}, Имя проекта ${_project.data.name}|` + 
                        // `PayeeINN=611203541218|` + 
                        // `LastName=Иванов|` + 
                        // `FirstName=Иван|` + 
                        // `MiddleName=Иванович|` + 
                        `PersAcc=ПИИ-20-0001`;

                    msgsBlock.find('#qrCodeOutput').append(QRCode.generateHTML_ME(qrCodePushedText, {}))

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
                                    callApi({
                                        methodName: "version2_put_file_alertofOfCloseCheack",
                                        data: _GET('InvId'),
                                    });

                                    var endBlock = $(`
                                        <div class="creating_page_block">
                                            <input type="file" id="Attracted_headerInfoBlock_info_data_alert_buttom_cheack_input">
                                            <div class="creating_page_start" style="margin-bottom: 20px">
                                                <div class="version2_default_bkg row_default"></div>
                                                <span>
                                                    Вы успешно проивестировали в проект, ваши данные в обработке<br>
                                                    Ожидайте подтверждения оплаты в оповещениях Телеграм бота или в личном кабинете.
                                                </span>
                                            </div>
                                        </div>
                                        <div class="creating_page_input">
                                            <div class="creating_page_input_div version2_creating_page_input_div_NewButton" data="newOpen">
                                                <span>Перейти в Телеграм бот (оповещения)</span>
                                            </div>
                                        </div>
                                    `);

                                    endBlock.find('.version2_creating_page_input_div_NewButton').click( function() {
                                        window.location = "tg:\/\/resolve?domain=invester_official_bot";
                                    });

                                    $(`.creating_page`).empty().append(endBlock);
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

            this.project = _project;
            this.defaultCSS();

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