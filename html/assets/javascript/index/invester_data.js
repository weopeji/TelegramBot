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

    
    function findOfArrayOn_id(arr, value) {
        for (var i = 0; i < arr.length; i++)
            if (arr[i]["_id"] == value)
                return arr[i].data;
    }

    class invester_data
    {
        constructor() 
        {
            this.project            = null;
            this.inv                = null;
            this.money              = null;
            this.date               = null;
            this.urlForDocument     = null;
            this.allInvsOfProject   = [];
            this.DT                 = null;
            this.redactingInvDoc    = null;
        };

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

            if(this.project)
            {
                $('body').css("background-image", "url(./html/assets/images/2.0.0/pp/image 2.png) !important");
            };
        };

        async renderFirstData() 
        {
            var _this       = this;
            var ActionBlock = $(`
                <div class="version2_invester_data_h1">
                    <h1>Инвестирование в проект «${_this.project.data.name}»</h1>
                </div>
                <div class="version2_creating_block">
                    <div class="version2_creating_block_info version2_default_shadow_block">
                        <div class="version2_default_bkg row_default"></div>
                        <div class="version2_creating_block_info_row">
                            <h1>Уважаемый пользователь ${global.allData.User.first_name}!</h1>
                            <p>
                                Вы находитесь на сайте инвестиционного проекта партнера ${_this.project.data.name}
                                <br>
                                Для того, чтобы проинвестировать в проект, Вам необходимо указатьсвои данные
                            </p>
                        </div>
                    </div>
                </div>
                <div class="version2_creating_block mt25">
                    <div class="version2_creating_block_info version2_default_shadow_block">
                        <div class="version2_default_bkg row_default"></div>
                        <div class="version2_creating_block_info_row">
                            <p class="pt25">
                                <a href="https://google.com">"Пользовательское соглашение на обработку перснальных данных"</a>
                                <br>
                                <a href="https://google.com">"Договор оферты"</a>и<a href="https://google.com">"Политика конфиденциальности"</a>
                            </p>
                        </div>
                    </div>
                </div>
                <div class="version2_invester_data_typeButtons">
                    <div class="version2_invester_data_typeButtons_type">
                        <div class="version2_invester_data_typeButtons_type_button" data="UR">
                            <!-- <div class="version2_default_bkg row_default"></div> -->
                            <span>Юридическое лицо</span>
                        </div>
                        <div class="version2_invester_data_typeButtons_type_button" data="FIZ">
                            <!-- <div class="version2_default_bkg row_default"></div> -->
                            <span>Физическое лицо</span>
                        </div>
                        <div class="version2_invester_data_typeButtons_type_button version2_invester_data_typeButtons_type_button_last" data="IP">
                            <!-- <div class="version2_default_bkg row_default"></div> -->
                            <span>ИП</span>
                        </div>
                    </div>
                    <div class="version2_invester_data_typeButtons_document">
                        <div class="version2_default_bkg row_default"></div>
                        <span><i class="far fa-file-alt"></i>Ознакомиться с договором проекта</span>
                    </div>
                </div>
            `);

            var _this = this;

            ActionBlock.find('.version2_invester_data_typeButtons_type_button').click(async function() {
                _this.render_next($(this).attr('data'));
            });

            $(`.creating_page`).append(ActionBlock);
        }

        async render(data, notPush) 
        {
            $('.index_page_body_data').append(`<div class="creating_page" style="width: auto;"></div>`);

            var _this = this;

            if(_GET("InvRedacting"))
            {
                _this.redactingInvDoc = await callApi({
                    methodName: "version2_getInvDocByRedactingId",
                    data: _GET("InvRedacting"),
                });
            };

            if(typeof notPush == "undefined")
            {
                var _project = await callApi({
                    methodName: "getProjectForInvesterPage",
                    data: _GET('user'),
                });
    
                var _AllInvsOfProject = await callApi({
                    methodName: "getProjectForInvesterPageAllInvs" ,
                    data: _project._id,
                });
    
                _this.allInvsOfProject   = _AllInvsOfProject;
                _this.project            = _project;
            };

            await this.defaultCSS();
            await this.renderFirstData();
        }

        async cheackGetDocuments()
        {
            $('.creating_page').empty();

            $('.version2_invester_data_backBlock_circule').off('click').click( function(e) {
                _this.renderOldBlock(true);
            });

            var _this = this;

            if(window.screen.width < 1300)
            {
                var documentBlock = $(`
                    <div class="version2_invester_data_mobile_documents">
                        <div class="version2_invester_data_mobile_documents_row">
                            <div class="version2_invester_data_mobile_documents_img">
                                <img src="/html/assets/images/2.0.0/documents/image-001.png" alt="">
                            </div>
                            <div class="version2_invester_data_mobile_documents_img">
                                <img src="/html/assets/images/2.0.0/documents/image-002.png" alt="">
                            </div>
                            <div class="version2_invester_data_mobile_documents_img">
                                <img src="/html/assets/images/2.0.0/documents/image-003.png" alt="">
                            </div>
                            <div class="version2_invester_data_mobile_documents_document">
                                <h1>Приложение номер 2 - Тестирование</h1>

                                <p>Фио инвестора <data type="fio">${findOfArrayOn_id(_this.inv.data, "fio")}</data></p>
                                <p>Дата <data type="date">${new Date()}</data></p>
                                <p>Сумма инвестиции <data type="summ">${_this.money}</data></p>
                                <p>Банк <data type="bank">${_this.project.data.bank}</data></p>
                                <p>Инн <data type="inn"></data>${findOfArrayOn_id(_this.inv.data, "inn")}</p>
                                <p>Огрн <data type="ogrn">${findOfArrayOn_id(_this.inv.data, "ogrnip")}</data></p>
                            </div>
                        </div>
                    </div>
                    <div class="creating_page_input" style="width: 360px;">
                        <div class="creating_page_input_div" data="pay">
                            <span style="text-align: center">Оплатить</span> 
                        </div>
                    </div>
                `);

                documentBlock.find(".creating_page_input_div").click( function() {
                    _this.cheackGet();
                })

                if(typeof _this.project.notFullpay != "undefined")
                {
                    if(Number(_this.project.notFullpay) == 0)
                    {
                        documentBlock.find(".creating_page_input_div").find('span').html('Подтвердить инвестицию');
                    };
                };

                $('.creating_page').append(documentBlock);
            }
            else
            {
                var documentBlock = $(`
                    <div class="creating_page_input creating_page_input_document_img">
                        <img src="./html/assets/images/documentPNG.png" alt="">
                        <div class="creating_page_input_document_img_hover">
                            <div class="creating_page_input_document_img_hover_row">
                                <span>Ознакомится с договором</span>
                                <span>Ознакомится с приложением №2</span>
                            </div>
                        </div>
                    </div>
                    <div class="creating_page_input" style="width: 360px;">
                        <div class="creating_page_input_div" data="pay">
                            <span style="text-align: center">Оплатить</span> 
                        </div>
                    </div>
                `);

                documentBlock.eq(0).find("span").eq(0).click( function() 
                {
                    if(window.screen.width < 1300)
                    {
                        DownLoadFileAjax(`/projects/${_this.project._id}/${_this.project.signature_document.user_document}`, `${_this.project.signature_document.user_document}`);
                    }
                    else
                    {
                        window.open(`/projects/${_this.project._id}/${_this.project.signature_document.user_document}` , '_blank');
                    };
                });

                var html = `/html/project/application_number_2/?`;

                html += `fio=${findOfArrayOn_id(_this.inv.data, "fio")}&`;
                html += `number=2&`;
                html += `summ=${_this.money}&`;
                
                if(_this.inv.type == "UR")
                {
                    html += `inn=${findOfArrayOn_id(_this.inv.data, "inn")}&`;
                    html += `ogrn=${findOfArrayOn_id(_this.inv.data, "ogrnip")}&`;
                    html += `do=${findOfArrayOn_id(_this.inv.data, "cpecial")}&`;
                    html += `fio_dolg=${findOfArrayOn_id(_this.inv.data, "fio_dolg")}&`
                } 
                else if (_this.inv.type == "IP")
                {
                    html += `inn=${findOfArrayOn_id(_this.inv.data, "inn")}&`;
                    html += `ogrn=${findOfArrayOn_id(_this.inv.data, "ogrnip")}&`;
                }

                html += `type=${_this.inv.type}&`;
                html += `bank=${_this.project.data.bank}`;

                _this.urlForDocument = html;

                documentBlock.eq(0).find("span").eq(1).click( function() 
                {
                    if(window.screen.width < 1300)
                    {
                        DownLoadFileAjax(html, `document.html`);
                    }
                    else
                    {
                        window.open(html, '_blank');
                    };
                })

                documentBlock.find(".creating_page_input_div").click( function() {
                    _this.cheackGet();
                })

                if(typeof _this.project.notFullpay != "undefined")
                {
                    if(Number(_this.project.notFullpay) == 0)
                    {
                        documentBlock.find(".creating_page_input_div").find('span').html('Подтвердить инвестицию');
                    };
                };

                $('.creating_page').append(documentBlock);
            }
        }

        async cheackGet()
        {
            $('.creating_page').empty();

            $('.version2_invester_data_backBlock_circule').off('click').click( function(e) {
                _this.cheackGetDocuments();
            });

            var _this       = this;
            var pushMoney   = _this.money + " ₽";

            if(typeof this.project.notFullpay != "undefined")
            {
                pushMoney = `${Number(Number(_this.money.toString().trim().replace(/\s/g, '')) / 100 * Number(this.project.notFullpay)).toString().replace(/(\d)(?=(\d{3})+([^\d]|$))/g, '$1 ')} ₽ (${this.project.notFullpay}%)`;
            };

            var msgsBlock = $(`
                <div class="creating_page_block">
                    <div class="creating_page_start" style="margin-bottom: 20px">
                        <div class="version2_default_bkg row_default"></div>
                        <span style="position: relative; z-index: 2;">
                            Уважаемый Инвестор ${findOfArrayOn_id(_this.inv.data, "fio")} переведите ${pushMoney} По реквезитам ниже и Пришлите чек оплаты для окончания инвестирования. <br><br>

                            Реквезиты перечисления: <br><br>
                            Банк-получатель: ${this.project.data.bank} <br>
                            Корр. счет: ${this.project.data.account_correct} <br>
                            БИК: ${this.project.data.bik} <br>
                            КПП: ${this.project.data.kpp} <br>
                            Получатель: ${this.project.data.recipient} <br>
                            Счет получателя: ${this.project.data.account_get} <br>
                            Назначение платежа: Номер Проекта ${this.project._id}, Имя проекта ${this.project.data.name} <br>
                        </span>
                    </div>
                </div>
            `);

            var _block = $(`
                <div class="creating_page_input">
                    <div class="creating_page_input_div" data="pay">
                        <input type="file" id="triggerClick">
                        <span data="first" style="text-align: center">Загрузить</span>
                    </div>
                </div>
            `);

            if(typeof _this.project.notFullpay != "undefined")
            {
                if(Number(_this.project.notFullpay) == 0)
                {
                    msgsBlock.find('.creating_page_start span').html(` 
                        <div class="version_2_row_creating_page_input" style="position: relative; z-index: 2;">
                            Уважаемый Инвестор ${findOfArrayOn_id(_this.inv.data, "fio")}
                            Подтверждая инвестицию, вы подтверждаете, что по окончанию сбора средств вы выплатите зарезервированную вами сумму,
                            Отказавшись вы получите запрет на использование платформы в будущем, на определенный срок
                        </div>
                    `.toString().trim());

                    _block.find('span').html("Подтвердить");
                };
            };

            _block.find('span').click( async function () 
            {
                if(typeof _this.project.notFullpay != "undefined" && Number(_this.project.notFullpay) == 0)
                {
                    $('.preloader').fadeIn();

                    if(_GET("InvRedacting"))
                    {
                        await callApi({
                            methodName: "version2_investerData_invdoc_notMoney_redacting",
                            data: {
                                user:  _GET('user'),
                                inv: _this.inv,
                                money: _this.money,
                                url: _this.urlForDocument,
                                invId: _GET("InvRedacting"),
                            },
                        });
                    }
                    else
                    {
                        await callApi({
                            methodName: "version2_investerData_invdoc_notMoney",
                            data: {
                                user:  _GET('user'),
                                inv: _this.inv,
                                money: _this.money,
                                url: _this.urlForDocument,
                            },
                        });
                    }

                    window.open("tg:\/\/resolve?domain=invester_official_bot",'_self').close()
                }
                else
                {
                    if(!_this.date)
                    {
                        var autch_block = $(`
                            <div class="autch_block">
                                <div class="autch_block_row">
                                    <p>Дата вашей инвестиции совпадает с текущей датой?</p>
                                    <div class="autch_block_buttons">
                                        <div class="autch_block_buttons_block autch_block_buttons_block_close">
                                            <span>Не совпадает</span>
                                        </div>
                                        <div class="autch_block_buttons_block autch_block_buttons_block_accept">
                                            <span>Совпадает</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        `);
    
                        autch_block.find('.autch_block_buttons_block_close').click( function() {
                            $('.autch_block').find(".autch_block_row").remove();
    
                            function pad(s, width, character) {
                                return new Array(width - s.toString().length + 1).join(character) + s;
                            }
    
                            var maxDate     = new Date(Number(_this.project.data_creating.toString()));
                            var maxmaxDate  = new Date();
    
                            var _blockAppend = 
                            $(`
                                <div class="autch_block_row">
                                    <p>Выберите дату инвестирования:</p>
                                    <div class="autch_block_row_input_date">
                                        <input type="date" placeholder="Дата" id='needDateNow' max="${maxmaxDate.getFullYear()}-${pad(maxmaxDate.getMonth() + 1, 2, '0')}-${pad(maxmaxDate.getDate(), 2, '0')}" min="${maxDate.getFullYear()}-${pad(maxDate.getMonth() + 1, 2, '0')}-${pad(maxDate.getDate(), 2, '0')}">
                                    </div>
                                    <div class="autch_block_buttons">
                                        <div class="autch_block_buttons_block autch_block_buttons_block_close">
                                            <span>Назад</span> 
                                        </div>
                                        <div class="autch_block_buttons_block autch_block_buttons_block_accept">
                                            <span>Подтвердить</span>
                                        </div>
                                    </div>
                                </div>
                            `);
    
                            _blockAppend.find('.autch_block_buttons').css('margin-top', "25px");
    
                            _blockAppend.find('.autch_block_buttons_block_close').click( function() {
                                $('.autch_block').remove();
                            })
    
                            _blockAppend.find('.autch_block_buttons_block_accept').click( function() {
                                var valueNeed = $('#needDateNow').val();
    
                                if(valueNeed.length > 0)
                                {
                                    _this.date = new Date(valueNeed).getTime();
                                    $('.autch_block').remove();
                                    $('#triggerClick').trigger("click");
                                } else 
                                {
                                    alert('Выберите дату!');
                                }
                            })
    
                            $('.autch_block').append(_blockAppend);
                        });
    
                        autch_block.find('.autch_block_buttons_block_accept').click( async function() {
                            $('.autch_block').remove();
                            $('#triggerClick').trigger("click");
                        })
    
                        $('body').append(autch_block);
                    } else 
                    {
                        $('#triggerClick').trigger("click");
                    }
                }
            })

            var _this = this;

            _block.find('input[type=file]').change( async function() 
            {
                var _thisFile = $(this);

                if($(this.files).length > 0)
                {
                    await callApi({
                        methodName: "setInvesterDataProjectForInvesterPage",
                        data: {
                            user:  _GET('user'),
                            data: {
                                inv: _this.inv,
                                date: _this.date,
                            },
                        },
                    });

                    var filename    = $(this.files)[0].name;
                    var aux         = filename.split('.');
                    var extension   = aux[aux.length -1].toUpperCase();
    
                    var _form       = new FormData();
                    var _url        = `${getURL()}/file_cheack_get.io/files`;
                    _form.append('files', $(this.files)[0]);
                    _form.append('_User', _GET('user'));
                    _form.append('_id', _this.project._id);
                    _form.append('_pts', extension);
                    _form.append('_pay', _this.money);
                    _form.append('_date', _this.date);

                    if($(this).attr('token')) 
                    {
                        _form.append('token', $(this).attr('token'));
                    }

                    var _file       = _form;

                    var uploadBlock = 
                    $(`
                        <div class="process_upload_block">
                            <div class="process_upload_block_row">
                                <div class="process_upload_block_line"></div>
                            </div>
                        </div>
                    `);

                    $('.index_page_body_header').append(uploadBlock);
        
                    axios.post(_url, _file, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        },
                        onUploadProgress: function(progressEvent) 
                        {
                            const totalLength = progressEvent.lengthComputable ? progressEvent.total : progressEvent.target.getResponseHeader('content-length') || progressEvent.target.getResponseHeader('x-decompressed-content-length');
                            if (totalLength !== null) {
                                var progressBarData = Math.round( (progressEvent.loaded * 100) / totalLength );
                                $('.process_upload_block_line').css("width", progressBarData + "%");
                            }
                        }
                    }).then(data => 
                    {
                        if(data.data.status == "ok") 
                        {
                            _thisFile.attr('token', data.data.inv);

                            alert("Чек прикоеплен!");
                            $('.process_upload_block').remove();
                            $('.creating_page_input span[data="first"]').html('Заменить');
    
                            $('.creating_page_input_div[data="show"]').remove();
                            $('.creating_page_input_div[data="accept"]').remove();
            
                            var moreBlock = $(`
                                <div class="creating_page_input_div_row">
                                    <div class="creating_page_input_div" data="show">
                                        <span style="text-align: center">Посмотреть</span>
                                    </div>
                                    <div class="creating_page_input_div" data="accept">
                                        <span style="text-align: center">Подтвердить</span>
                                    </div>
                                </div>
                            `);
            
                            moreBlock.find(`[data="show"]`).click( function() {
                                window.open(`https://investir.one/projects/${_this.project._id}/${data.data.inv}_investment.${extension}`, '_blank');
                            });
            
                            moreBlock.find(`[data="accept"]`).click( async function() 
                            {
                                await callApi({
                                    methodName: "endInvestingDataPush",
                                    data: {
                                        user: _GET('user'),
                                        project: _this.project._id,
                                        money: _this.money.toString().replace(/(\d)(?=(\d{3})+([^\d]|$))/g, '$1 '),
                                        date: _this.date,
                                        url: _this.urlForDocument,
                                        invId: data.data.inv,
                                    },
                                });

                                var protoUrl    = "tg:\/\/resolve?domain=invester_official_bot";
                                window.location = protoUrl;
                            });
            
                            $('.creating_page_input').append(moreBlock);
                        };
                    });
                };
            });

            $('.creating_page').append(msgsBlock);
            $('.creating_page').append(_block);
        }

        async renderOldBlock(moneyPush)
        {
            var _this           = this;

            $('.version2_invester_data_backBlock_circule').off('click').click( function(e) {
                $('.version2_invester_data_backBlock_circule').remove();
                _this.render_next(_this.DT, _this.inv);
            });

            try {
                var _projectMoney   = _this.project.data.minimal_amount.toString().trim().replace(/\s/g, '');
                var fullMoneysInvs  = 0;
                var fullMoneyCheack = Number(_this.project.data.attraction_amount.toString().replace(/\s/g, ''));
    
                if(typeof _this.project.requestInvestingMoney != "undefined")
                {
                    fullMoneyCheack = fullMoneyCheack + Number(_this.project.requestInvestingMoney.toString().replace(/\s/g, '')); 
                }
    
                for(var InvPushMoney of _this.allInvsOfProject)
                {
                    fullMoneysInvs = fullMoneysInvs + Number(InvPushMoney.data.pay.toString().replace(/\s/g, ''));
                };
    
                $('.creating_page').empty();
    
                var multiplicityData = _this.project.multiplicity;
                var multiplicityText = "";

                if(typeof _this.project.multiplicity != "undefined")
                {
                    multiplicityText = `<br>Сумма должна быть кратна: ${multiplicityData.toString().replace(/(\d)(?=(\d{3})+([^\d]|$))/g, '$1 ')} руб.`;
                };
    
                var msgsBlock = $(`
                    <div class="creating_page_block">
                        <div class="creating_page_start" style="margin-bottom: 20px">
                            <div class="version2_default_bkg row_default"></div>
                            <span style="position: relative; z-index: 2;">
                                Уважаемый Инвестор ${global.allData.User.first_name} Введите сумму инвестирования</a>.<br>
                                Минимальная сумма входа: ${_projectMoney.toString().replace(/(\d)(?=(\d{3})+([^\d]|$))/g, '$1 ')} руб.
                                ${multiplicityText} <br>
                                <span class="version2_invester_data_moneyFull">Сумма не должна превышать ${Number(fullMoneyCheack - fullMoneysInvs).toString().replace(/(\d)(?=(\d{3})+([^\d]|$))/g, '$1 ')} руб.</span>
                            </span>
                        </div>
                    </div>
                `);
    
                var _block = $(`
                    <div class="creating_page_input">
                        <div class="version2_default_bkg row_default"></div>
                        <input type="text" class="creating_page_input_div" data="pay" placeholder="Сумма">
                        <div class="creating_page_input_button">
                            <span>Отправить</span>
                        </div>
                    </div>
                `);

                if(_GET("InvRedacting"))
                {
                    _block.find(`input[type="text"]`).val(_this.redactingInvDoc.data.pay);
                }

                if(moneyPush)
                {
                    _block.find(`input[type="text"]`).val(this.money);
                }
    
                _block.find(`input`).on('keyup input', function() 
                {
                    var _val = $(this).val();
                    _val = _val.replace(/[^\d;]/g, '')
                    _val = _val.replace(/\s/g, '');
                    var format = String(_val).replace(/(\d)(?=(\d{3})+([^\d]|$))/g, '$1 ');
                    $(this).val(format);
                });
    
                var _this               = this;
                var errorMoneyCheack    = false;
    
                if(typeof _this.project.notFullpay != "undefined")
                {
                    if(Number(_this.project.notFullpay) == 0) {
                        msgsBlock.find(".version2_invester_data_moneyFull").remove();
                        errorMoneyCheack = true;
                        msgsBlock.find('.creating_page_start span').append("Ваше место в очереди будет: " + Number(Number(_this.allInvsOfProject.length) + Number(1)));
                    };
                };
    
                _block.find('.creating_page_input_button span').click( function() 
                {
                    var money   = $('.creating_page_input input').val();
                    var _money  = money.toString().replace(/\s/g, '');
    
                    if(!errorMoneyCheack) {
                        if(typeof _this.project.requestInvestingMoney != "undefined")
                        {
                            if(Number(fullMoneyCheack) < Number(fullMoneysInvs) + Number(_money))
                            {
                                alert(`Сумма превышает на ${Number(Number(fullMoneysInvs) + Number(_money) - Number(fullMoneyCheack)).toString().replace(/(\d)(?=(\d{3})+([^\d]|$))/g, '$1 ')}`);
                                return;
                            }
                        };
                    }
    
                    if(Number(_money) < Number(_projectMoney))
                    {
                        alert('Сумма недостаточна!');
                    } 
                    else {
                        if(typeof _this.project.multiplicity != "undefined")
                        {
                            if(Number(_money) % _this.project.multiplicity == 0)
                            {
                                _this.money = money;
                                _this.cheackGetDocuments();
                            } else {
                                alert(`Сумма должна быть кратной ${_this.project.multiplicity}`);
                            }
                        } else {
                            _this.money = money;
                            _this.cheackGetDocuments();
                        }
                    }
                });
    
                $('.creating_page').append(msgsBlock);
                $('.creating_page').append(_block);
            }
            catch(e) {
                alert(e);
            }
        }

        async render_backBlock()
        {
            var _this       = this;

            var backBlock   = $(`
                <div class="version2_invester_data_backBlock">
                    <div class="version2_invester_data_backBlock_circule version2_default_bkg row_default">
                        <i class="fal fa-angle-left"></i>
                    </div>
                </div>
            `);

            backBlock.find(".version2_invester_data_backBlock_circule").click( function() {
                $('.index_page_body_data').empty();
                _this.render(null, true);
            });

            $('.index_page_body_data').prepend(backBlock);
        }

        async render_next(DT, InvPush) 
        {
            this.DT = DT;

            this.render_backBlock();

            var render_nextfuns = 
            {
                "UR": function() 
                {
                    var _block = $(`
                        <div class="creating_page_input">
                            <div class="version2_default_bkg row_default"></div>
                            <div class="version_2_creating_page_input_row">
                                <input type="text" class="creating_page_input_div" data="fio" placeholder="Название Юр. Лица">
                                <input type="text" class="creating_page_input_div" data="inn" placeholder="ИНН">
                                <input type="text" class="creating_page_input_div" data="kpp" placeholder="КПП">
                                <input type="text" class="creating_page_input_div" data="ogrnip" placeholder="ОГРН">
                                <input type="text" class="creating_page_input_div" data="cpecial" placeholder="Должность">
                                <input type="text" class="creating_page_input_div" data="fio_dolg" placeholder="ФИО должностного лица">
                                <input type="text" class="creating_page_input_div" data="addr" placeholder="Юридический адрес">
                                <input type="text" class="creating_page_input_div" data="bank" placeholder="Банк получателя">
                                <input type="text" class="creating_page_input_div" data="bik" placeholder="БИК">
                                <input type="text" class="creating_page_input_div" data="nomer" placeholder="Номер расчетного счета">
                                <input type="text" class="creating_page_input_div" data="nomer_kor" placeholder="Номер корреспондентского счета">
                                <input type="text" class="creating_page_input_div" data="info_more" placeholder="На основе чего вы действуете?">
                                <div class="creating_page_input_button">
                                    <span>Отправить</span> 
                                </div>
                            </div>
                        </div>
                    `);

                    _block.find('input[data="inn"]').bind("change keyup input click", function() {
                        if (this.value.match(/[^0-9]/g)) {
                            this.value = this.value.replace(/[^0-9]/g, '');
                        }
                    });
                    _block.find('input[data="ogrnip"]').bind("change keyup input click", function() {
                        if (this.value.match(/[^0-9]/g)) {
                            this.value = this.value.replace(/[^0-9]/g, '');
                        }
                    });

                    _block.find('input[data="nomer"]').bind("change keyup input click", function() {
                        if (this.value.match(/[^0-9]/g)) {
                            this.value = this.value.replace(/[^0-9]/g, '');
                        }
                    });
                    _block.find('input[data="bik"]').bind("change keyup input click", function() {
                        if (this.value.match(/[^0-9]/g)) {
                            this.value = this.value.replace(/[^0-9]/g, '');
                        }
                    });
                    _block.find('input[data="nomer_kor"]').bind("change keyup input click", function() {
                        if (this.value.match(/[^0-9]/g)) {
                            this.value = this.value.replace(/[^0-9]/g, '');
                        }
                    });

                    $('.creating_page').append(_block);
                },
                "IP": function()
                {
                    var _block = $(`
                        <div class="creating_page_input">
                            <div class="version2_default_bkg row_default"></div>
                            <div class="version_2_creating_page_input_row">
                                <input type="text" class="creating_page_input_div" data="fio" placeholder="ФИО">
                                <input type="text" class="creating_page_input_div" data="inn" placeholder="ИНН">
                                <input type="text" class="creating_page_input_div" data="ogrnip" placeholder="ОГРНИП">
                                <input type="text" class="creating_page_input_div" data="addr" placeholder="адрес">
                                <input type="text" class="creating_page_input_div" data="bank" placeholder="Банк получателя">
                                <input type="text" class="creating_page_input_div" data="bik" placeholder="БИК">
                                <input type="text" class="creating_page_input_div" data="nomer" placeholder="Номер расчетного счета">
                                <input type="text" class="creating_page_input_div" data="nomer_kor" placeholder="Номер корреспондентского счета">
                                <input type="text" class="creating_page_input_div" data="info_more" placeholder="На основе чего вы действуете?">

                                <div class="creating_page_input_button">
                                    <span>Отправить</span>
                                </div>
                            </div>
                        </div>
                    `);

                    _block.find('input[data="inn"]').bind("change keyup input click", function() {
                        if (this.value.match(/[^0-9]/g)) {
                            this.value = this.value.replace(/[^0-9]/g, '');
                        }
                    });
                    _block.find('input[data="ogrnip"]').bind("change keyup input click", function() {
                        if (this.value.match(/[^0-9]/g)) {
                            this.value = this.value.replace(/[^0-9]/g, '');
                        }
                    });


                    _block.find('input[data="nomer"]').bind("change keyup input click", function() {
                        if (this.value.match(/[^0-9]/g)) {
                            this.value = this.value.replace(/[^0-9]/g, '');
                        }
                    });
                    _block.find('input[data="bik"]').bind("change keyup input click", function() {
                        if (this.value.match(/[^0-9]/g)) {
                            this.value = this.value.replace(/[^0-9]/g, '');
                        }
                    });
                    _block.find('input[data="nomer_kor"]').bind("change keyup input click", function() {
                        if (this.value.match(/[^0-9]/g)) {
                            this.value = this.value.replace(/[^0-9]/g, '');
                        }
                    });

                    $('.creating_page').append(_block);
                },
                "FIZ": function()
                {
                    var _block = $(`
                        <div class="creating_page_input">
                            <div class="version2_default_bkg row_default"></div>
                            <div class="version_2_creating_page_input_row">
                                <input type="text" class="creating_page_input_div" data="fio" placeholder="* ФИО полностью">
                                <input type="text" class="creating_page_input_div" data="cpecial" placeholder="* Номер паспорта и серия">
                                <input type="text" class="creating_page_input_div" data="how_get" placeholder="* Кем выдан">
                                <input type="text" class="creating_page_input_div" data="propiska" placeholder="* Адрес регистрации (прописка)">
                                <input type="text" class="creating_page_input_div" data="bank" placeholder="* Банк получателя">
                                <input type="text" class="creating_page_input_div" data="bik" placeholder="* БИК">
                                <input type="text" class="creating_page_input_div" data="nomer" placeholder="* Номер расчетного счета">
                                <input type="text" class="creating_page_input_div" data="nomer_kor" placeholder="* Номер корреспондентского счета">
                                <input type="text" class="creating_page_input_div" data="info_more" placeholder="* На основе чего вы действуете?">

                                <div class="version2_creating_page_input_inputCheackBoxRezident">
                                    <span>* Являетесь ли вы резидентом?</span>
                                    <div class="version2_creating_page_input_inputCheackBoxRezident_buttons">
                                        <div class="version2_creating_page_input_inputCheackBoxRezident_buttons_button">
                                            <div class="version2_default_bkg row_default"></div>
                                            <span>Да</span>
                                        </div>
                                        <div class="version2_creating_page_input_inputCheackBoxRezident_buttons_button">
                                            <div class="version2_default_bkg row_default"></div>
                                            <span>Нет</span>
                                        </div>
                                    </div>
                                </div>
    
                                <div class="creating_page_input_button">
                                    <span>Отправить</span>
                                </div>
                            </div>
                        </div>
                    `);

                    _block.find('input[data="cpecial"]').mask('9999 999999');

                    _block.find('input[data="nomer"]').bind("change keyup input click", function() {
                        if (this.value.match(/[^0-9]/g)) {
                            this.value = this.value.replace(/[^0-9]/g, '');
                        }
                    });
                    _block.find('input[data="bik"]').bind("change keyup input click", function() {
                        if (this.value.match(/[^0-9]/g)) {
                            this.value = this.value.replace(/[^0-9]/g, '');
                        }
                    });
                    _block.find('input[data="nomer_kor"]').bind("change keyup input click", function() {
                        if (this.value.match(/[^0-9]/g)) {
                            this.value = this.value.replace(/[^0-9]/g, '');
                        }
                    });

                    $('.creating_page').append(_block);
                }
            }

            $('.creating_page').empty();

            render_nextfuns[DT]();

            $('input.creating_page_input_div').keydown(function(e) {
                if(e.keyCode === 13) {
                    var indexInput      = $(this).index();
                    var indexInteger    = indexInput + 1;

                    if(indexInteger > $('input.creating_page_input_div').length - 1)
                    {
                        indexInteger = 0;
                    }

                    $('input.creating_page_input_div').eq(indexInteger).focus();
                }
            });

            var _this = this;

            $('.creating_page_input_button').click( function() 
            {
                var _array = {
                    type: DT,
                    data: [],
                };
                var _error = false;
        
                $('.creating_page_input').find("input").each((i, element) => 
                {
                    if($(element).val().length == 0)
                    {
                        _error = true;
                    }
                    _array.data.push({
                        _id: $(element).attr('data'),
                        data: $(element).val(),
                    });
                });

                if(_error)
                {
                    alert('Введите все данные!');
                    _this.inv = _array;
                } 
                else 
                {
                    _this.inv = _array;
                    _this.renderOldBlock();
                }
            });

            if(_GET("InvRedacting"))
            {
                $('.creating_page_input_div').each( function(i, element) 
                {
                    if(typeof $(element).attr("data") != "undefined")
                    {
                        if(typeof findOfArrayOn_id(_this.redactingInvDoc.data.data, $(element).attr("data")) != "undefined")
                        {
                            $(element).val(findOfArrayOn_id(_this.redactingInvDoc.data.data, $(element).attr("data")));
                        };
                    };
                });
            };

            if(InvPush)
            {
                $('.creating_page_input_div').each( function(i, element) 
                {
                    if(typeof $(element).attr("data") != "undefined")
                    {
                        if(typeof findOfArrayOn_id(_this.inv.data, $(element).attr("data")) != "undefined")
                        {
                            $(element).val(findOfArrayOn_id(_this.inv.data, $(element).attr("data")));
                        };
                    };
                });
            }
        };
    };

    var components = {
        invester_data,
    };

    if(!global.Components) { global.Components = components; } 
    else { 
        for(var key in components)
        {
            global.Components[key] = components[key];
        }
    }

}(window))