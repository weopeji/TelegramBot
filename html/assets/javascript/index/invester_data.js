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
            this.global = $(`
                <div class="creating_page"></div>
            `);
            this.project            = null;
            this.inv                = null;
            this.money              = null;
            this.date               = null;
            this.urlForDocument     = null;
            this.allInvsOfProject   = [];
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
        }

        async renderFirstData() {
            var ActionBlock = $(`
                <div class="version2_invester_data_h1">
                    <h1>Инвестирование в проект</h1>
                </div>
                <div class="version2_creating_block">
                    <div class="version2_creating_block_info version2_default_shadow_block">
                        <div class="version2_default_bkg row_default"></div>
                        <div class="version2_creating_block_info_row">
                            <h1>Уважаемый пользователь ${global.allData.User.first_name}!</h1>
                            <p>Вводя данные, вы подтверждаете что ознакомились с условиями “Пользовательского соглашения” и “Политики обработки данных”</p>
                        </div>
                    </div>
                </div>
                <div class="version2_creating_block mt25">
                    <div class="version2_creating_block_info version2_default_shadow_block">
                        <div class="version2_default_bkg row_default"></div>
                        <div class="version2_creating_block_info_row">
                            <p class="pt25">Для того чтобы проинвестировать в проект Вам необходимо указать свои данные</p>
                        </div>
                    </div>
                </div>
            `);


            this.global.append(ActionBlock);
        }

        async render() 
        {
            var _this = this;

            var _project = await callApi({
                methodName: "getProjectForInvesterPage",
                data: _GET('user'),
            });

            _this.project            = _project;

            await this.defaultCSS();
            await this.renderFirstData();

            $('.index_page_body_data').append(this.global);



            
            // var _AllInvsOfProject = await callApi({
            //     methodName: "getProjectForInvesterPageAllInvs" ,
            //     data: _project._id,
            // });

            // this.allInvsOfProject   = _AllInvsOfProject;

            // this.defaultCSS();

            // var fullMoneysInvs  = 0;
            // var fullMoneyCheack = Number(_this.project.data.attraction_amount.toString().replace(/\s/g, ''));

            // for(var InvPushMoney of _this.allInvsOfProject)
            // {
            //     fullMoneysInvs = fullMoneysInvs + Number(InvPushMoney.data.pay.toString().replace(/\s/g, ''));
            // };

            // if(fullMoneysInvs >= fullMoneyCheack)
            // {
            //     var msgsBlock = $(`
            //         <div class="creating_page_block">
            //             <div class="creating_page_start" style="margin-bottom: 20px">
            //                 <span>
            //                     Уважаемый Инвестор ${global.allData.User.first_name} превышен лимит инвестирования в данный пул, выберите другое предложение</a>.
            //                 </span>
            //             </div>
            //         </div>
            //     `);

            //     var documentBlock = $(`
            //         <div class="creating_page_input">
            //             <div class="creating_page_input_div">
            //                 <span>Выбрать</span>
            //             </div>
            //         </div>
            //     `);

            //     documentBlock.find('span').click( function() {
            //         var protoUrl    = "tg:\/\/resolve?domain=invester_official";
            //         window.location = protoUrl;
            //     });

            //     this.global.append(msgsBlock);
            //     this.global.append(documentBlock);
            // }
            // else
            // {
            //     var msgsBlock = $(`
            //         <div class="creating_page_block">
            //             <div class="creating_page_start" style="margin-bottom: 20px">
            //                 <span>
            //                     Уважаемый Инвестор ${global.allData.User.first_name} вводя данные вы подтверждаете, что <br> ознакомились и принимаете все условия <a href="https://invester-relocation.site/documents/p5.pdf" target="_blank">"Политики обработки персональных данных"</a>.
            //                 </span>
            //             </div>
            //             <div class="creating_page_start">
            //                 <span>
            //                     Для того, чтобы проинвестировать в данное предложение Вам необходимо внести свои данные, ознакомится с договором и перечислить средства по указанным реквезитам
            //                 </span>
            //             </div>
            //         </div>
            //     `);

            //     var documentBlock = $(`
            //         <div class="creating_page_input">
            //             <div class="creating_page_input_div">
            //                 <span>Ознакомится с договором</span>
            //             </div>
            //         </div>
            //     `);

            //     documentBlock.find('span').click( function() {
            //         window.open(`/projects/${_project._id}/${_project.signature_document.user_document}` , '_blank');
            //     })

            //     var inputText = $(`
            //         <div class="creating_page_input">
            //             <div class="creating_page_input_div" data="UR" data-type="Юр. Лицо">
            //                 <span>Юр. Лицо</span>
            //             </div>
            //             <div class="creating_page_input_div" data="IP" data-type="Ип">
            //                 <span>Ип</span>
            //             </div>
            //             <div class="creating_page_input_div" data="FIZ" data-type="Физ. Лицо">
            //                 <span>Физ. Лицо</span>
            //             </div>
            //         </div>
            //     `);

            //     inputText.find('.creating_page_input_div').click(async function() {
            //         _this.render_next($(this).attr('data'));
            //     });

            //     this.global.append(msgsBlock);
            //     this.global.append(documentBlock);
            //     this.global.append(inputText);
            // }
        }

        async cheackGetDocuments()
        {
            $('.creating_page').empty();

            var _this = this;

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
                <div class="creating_page_input">
                    <div class="creating_page_input_div" data="pay">
                        <span style="text-align: center">Оплатить</span> 
                    </div>
                </div>
            `);

            documentBlock.eq(0).find("span").eq(0).click( function() { 
                window.open(`/projects/${_this.project._id}/${_this.project.signature_document.user_document}` , '_blank');
            })

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
            } else if (_this.inv.type == "IP")
            {
                html += `inn=${findOfArrayOn_id(_this.inv.data, "inn")}&`;
                html += `ogrn=${findOfArrayOn_id(_this.inv.data, "ogrnip")}&`;
            }

            html += `type=${_this.inv.type}&`;
            html += `bank=${_this.project.data.bank}`;

            _this.urlForDocument = html;

            documentBlock.eq(0).find("span").eq(1).click( function() 
            {
                window.open(html, '_blank');
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

        async cheackGet()
        {
            $('.creating_page').empty();

            var _this       = this;
            var pushMoney   = _this.money + " ₽";

            if(typeof this.project.notFullpay != "undefined")
            {
                pushMoney = `${Number(Number(_this.money.toString().trim().replace(/\s/g, '')) / 100 * Number(this.project.notFullpay)).toString().ReplaceNumber()} ₽ (${this.project.notFullpay}%)`;
            };

            var msgsBlock = $(`
                <div class="creating_page_block">
                    <div class="creating_page_start" style="margin-bottom: 20px">
                        <span>
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
                        Уважаемый Инвестор ${findOfArrayOn_id(_this.inv.data, "fio")}
                        Подтверждая инвестицию, вы подтверждаете, что по окончанию сбора средств вы выплатите зарезервированную вами сумму,
                        Отказавшись вы получите запрет на использование платформы в будущем, на определенный срок
                    `.toString().trim());

                    _block.find('span').html("Подтвердить");
                };
            };

            _block.find('span').click( async function () 
            {
                if(typeof _this.project.notFullpay != "undefined" && Number(_this.project.notFullpay) == 0)
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

                    var InvIdGet = await callApi({
                        methodName: "setInvesterDataProjectForInvesterPageGetIdNullMoney",
                        data: {
                            idUser: _GET('user'),
                            money: _this.money,
                            date: _this.date,
                        },
                    });

                    await callApi({
                        methodName: "endInvestingDataPush",
                        data: {
                            user: _GET('user'),
                            project: _this.project._id,
                            money: _this.money.toString().ReplaceNumber(),
                            date: _this.date,
                            url: _this.urlForDocument,
                            invId: InvIdGet,
                            accept: true,
                        },
                    });

                    SoloAlert.alert({
                        title:"Успешно",
                        body:"",
                        icon: "success"
                    }).then(() => {
                        var protoUrl    = "tg:\/\/resolve?domain=invester_official_bot";
                        window.location = protoUrl;
                    });
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
                                window.open(`https://invester-relocation.site/projects/${_this.project._id}/${data.data.inv}_investment.${extension}`, '_blank');
                            });
            
                            moreBlock.find(`[data="accept"]`).click( async function() 
                            {
                                await callApi({
                                    methodName: "endInvestingDataPush",
                                    data: {
                                        user: _GET('user'),
                                        project: _this.project._id,
                                        money: _this.money.toString().ReplaceNumber(),
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

        async renderOldBlock()
        {
            var _this           = this;
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

            if(typeof multiplicityData != "undefined")
            {
                multiplicityText = `<br>Сумма должна быть кратна: ${multiplicityData.toString().ReplaceNumber()} руб.`;
            };

            var msgsBlock = $(`
                <div class="creating_page_block">
                    <div class="creating_page_start" style="margin-bottom: 20px">
                        <span>
                            Уважаемый Инвестор ${global.allData.User.first_name} Введите сумму инвестирования</a>.<br>
                            Минимальная сумма входа: ${_projectMoney.toString().ReplaceNumber()} руб.
                            ${multiplicityText} <br>
                            Сумма не должна превышать ${Number(fullMoneyCheack - fullMoneysInvs).toString().ReplaceNumber()} руб.
                        </span>
                    </div>
                </div>
            `);

            var _block = $(`
                <div class="creating_page_input">
                    <input type="text" class="creating_page_input_div" data="pay" placeholder="Сумма">
                    <div class="creating_page_input_button">
                        <span>Отправить</span>
                    </div>
                </div>
            `);

            _block.find(`input`).on('keyup input', function() 
            {
                var _val = $(this).val();
                _val = _val.replace(/[^\d;]/g, '')
                _val = _val.replace(/\s/g, '');
                var format = String(_val).replace(/(\d)(?=(\d{3})+([^\d]|$))/g, '$1 ');
                $(this).val(format);
            });

            var _this = this;

            _block.find('.creating_page_input_button span').click( function() 
            {
                var money   = $('.creating_page_input input').val();
                var _money  = money.toString().replace(/\s/g, '');

                if(typeof _this.project.requestInvestingMoney != "undefined")
                {
                    if(Number(fullMoneyCheack) < Number(fullMoneysInvs) + Number(_money))
                    {
                        alert(`Сумма превышает на ${Number(Number(fullMoneysInvs) + Number(_money) - Number(fullMoneyCheack)).toString().ReplaceNumber()}`);
                        return;
                    }
                };

                if(Number(_money) < Number(_projectMoney))
                {
                    alert('Сумма недостаточна!');
                } else {
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

        async render_next(DT) 
        {
            var render_nextfuns = 
            {
                "UR": function() 
                {
                    var _block = $(`
                        <div class="creating_page_input">
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
                            <div class="creating_page_input_button">
                                <span>Отправить</span> 
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
                            <input type="text" class="creating_page_input_div" data="fio" placeholder="ФИО">
                            <input type="text" class="creating_page_input_div" data="inn" placeholder="ИНН">
                            <input type="text" class="creating_page_input_div" data="ogrnip" placeholder="ОГРНИП">
                            <input type="text" class="creating_page_input_div" data="addr" placeholder="адрес">
                            <input type="text" class="creating_page_input_div" data="bank" placeholder="Банк получателя">
                            <input type="text" class="creating_page_input_div" data="bik" placeholder="БИК">
                            <input type="text" class="creating_page_input_div" data="nomer" placeholder="Номер расчетного счета">
                            <input type="text" class="creating_page_input_div" data="nomer_kor" placeholder="Номер корреспондентского счета">

                            <div class="creating_page_input_button">
                                <span>Отправить</span>
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
                            <input type="text" class="creating_page_input_div" data="fio" placeholder="Фио полностью">
                            <input type="text" class="creating_page_input_div" data="cpecial" placeholder="Номер паспорта и Серия паспорта">
                            <input type="text" class="creating_page_input_div" data="how_get" placeholder="Кем выдан">
                            <input type="text" class="creating_page_input_div" data="propiska" placeholder="Прописка">
                            <input type="text" class="creating_page_input_div" data="bank" placeholder="Банк получателя">
                            <input type="text" class="creating_page_input_div" data="bik" placeholder="БИК">
                            <input type="text" class="creating_page_input_div" data="nomer" placeholder="Номер расчетного счета">
                            <input type="text" class="creating_page_input_div" data="nomer_kor" placeholder="Номер корреспондентского счета">

                            <div class="creating_page_input_button">
                                <span>Отправить</span>
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
        
                $('.creating_page_input').children("input").each((i, element) => 
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
                } 
                else 
                {
                    _this.inv = _array;
                    _this.renderOldBlock();
                }
            })
        }
    }

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