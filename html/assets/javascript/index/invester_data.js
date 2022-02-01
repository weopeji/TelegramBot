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
            this.project    = null;
            this.inv        = null;
            this.money      = null;
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

            $('.index_page_body_header_info span').html(`Инвестирование в проект "${this.project.data.name}"`);
        }

        async render() 
        {
            var _this = this;

            var _project = await callApi({
                methodName: "getProjectForInvesterPage",
                data: _GET('user'),
            });

            this.project = _project;

            this.defaultCSS();

            var msgsBlock = $(`
                <div class="creating_page_block">
                    <div class="creating_page_start" style="margin-bottom: 20px">
                        <span>
                            Уважаемый Инвестор ${global.allData.User.first_name} вводя данные вы подтверждаете, что <br> ознакомились и принимаете все условия <a href="https://invester-relocation.site/documents/p.pdf" target="_blank">"Пользовательского соглашения"</a>.
                        </span>
                    </div>
                    <div class="creating_page_start">
                        <span>
                            Для того, чтобы проинвестировать в данное предложение Вам необходимо внести свои данные, ознакомится с договором и перечислить средства по указанным реквезитам
                        </span>
                    </div>
                </div>
            `);

            var documentBlock = $(`
                <div class="creating_page_input">
                    <div class="creating_page_input_div">
                        <span>Ознакомится с договором</span>
                    </div>
                </div>
            `);

            documentBlock.find('span').click( function() {
                window.open(`/projects/${_project._id}/${_project.signature_document.user_document}` , '_blank');
            })

            var inputText = $(`
                <div class="creating_page_input">
                    <div class="creating_page_input_div" data="UR" data-type="Юр. Лицо">
                        <span>Юр. Лицо</span>
                    </div>
                    <div class="creating_page_input_div" data="IP" data-type="Ип">
                        <span>Ип</span>
                    </div>
                    <div class="creating_page_input_div" data="FIZ" data-type="Физ. Лицо">
                        <span>Физ. Лицо</span>
                    </div>
                </div>
            `);

            inputText.find('.creating_page_input_div').click(async function() {
                _this.render_next($(this).attr('data'));
            })

            this.global.append(msgsBlock);
            this.global.append(documentBlock);
            this.global.append(inputText);

            $('.index_page_body_data').append(this.global);
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

            documentBlock.eq(0).find("span").eq(1).click( function() 
            {
                var html = `/html/project/application_number_2/?`;

                html += `fio=${findOfArrayOn_id(_this.inv.data, "fio")}&`;
                html += `number=2&`;
                html += `summ=${_this.money}&`;
                
                if(_this.inv.type == "UR")
                {
                    html += `inn=${findOfArrayOn_id(_this.inv.data, "inn")}&`;
                    html += `ogrn=${findOfArrayOn_id(_this.inv.data, "ogrnip")}&`;
                    html += `do=${findOfArrayOn_id(_this.inv.data, "cpecial")}&`;
                } else if (_this.inv.type == "IP")
                {
                    html += `inn=${findOfArrayOn_id(_this.inv.data, "inn")}&`;
                    html += `ogrn=${findOfArrayOn_id(_this.inv.data, "ogrnip")}&`;
                }

                html += `type=${_this.inv.type}&`;
                html += `bank=${_this.project.data.bank}`;
                
                window.open(html, '_blank');
            })

            documentBlock.find(".creating_page_input_div").click( function() {
                _this.cheackGet();
            })

            $('.creating_page').append(documentBlock);
        }

        async cheackGet()
        {
            $('.creating_page').empty();

            var _this = this;

            var msgsBlock = $(`
                <div class="creating_page_block">
                    <div class="creating_page_start" style="margin-bottom: 20px">
                        <span>
                            Уважаемый Инвестор ${_this.inv.fio} переведите ${_this.money} руб. По реквезитам ниже и Пришлите чек оплаты для окончания инвестирования. <br><br>

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
                        <input type="file">
                        <span data="first" style="text-align: center">Загрузить</span>
                    </div>
                </div>
            `);

            _block.find('span').click( function () {
                _block.find('input').click();
            })

            var _this = this;

            _block.find('input[type=file]').change( async function() 
            {
                if($(this.files).length > 0)
                {
                    await callApi({
                        methodName: "setInvesterDataProjectForInvesterPage",
                        data: {
                            user:  _GET('user'),
                            data: _this.inv,
                        },
                    });

                    var filename    = $(this.files)[0].name;
                    var aux         = filename.split('.');
                    var extension   = aux[aux.length -1].toUpperCase();
    
                    var _form    = new FormData();
    
                    _form.append('files', $(this.files)[0]);
                    _form.append('_User', _GET('user'));
                    _form.append('_id', _this.project._id);
                    _form.append('_pts', extension);
                    _form.append('_pay', _this.money);
                    
                    var _url = `${getURL()}/file_cheack_get.io/files`;
    
                    var _file = _form;
        
                    axios.post(_url, _file, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    });
    
                    $('.creating_page_input span[data="first"]').html('Перезаписать');
    
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
                        window.open(`https://invester-relocation.site/projects/${_this.project._id}/file_cheack_get_${global.allData.User.user}.${extension}`, '_blank');
                    })
    
                    moreBlock.find(`[data="accept"]`).click( async function() {
                        location.href = `https://t.me/invester_official_bot?start=project_${_this.project._id}`; 
                    })
    
                    $('.creating_page_input').append(moreBlock);
                }
            });

            $('.creating_page').append(msgsBlock);
            $('.creating_page').append(_block);
        }

        async renderOldBlock()
        {
            var _this = this;
            var _projectMoney = _this.project.data.minimal_amount.toString().trim().replace(/\s/g, '');

            $('.creating_page').empty();

            var msgsBlock = $(`
                <div class="creating_page_block">
                    <div class="creating_page_start" style="margin-bottom: 20px">
                        <span>
                            Уважаемый Инвестор ${global.allData.User.first_name} Введите сумму инвестирования</a>.<br>
                            Минимальная сумма входа: ${_projectMoney} руб.
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

            _block.find('.creating_page_input_button span').click( function() {
                var money   = $('.creating_page_input input').val();
                var _money  = money.toString().replace(/\s/g, '');

                console.log(_this.project.data.minimal_amount.toString().trim());

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
                            <input type="text" class="creating_page_input_div" data="inn" placeholder="ИНН">
                            <input type="text" class="creating_page_input_div" data="kpp" placeholder="КПП">
                            <input type="text" class="creating_page_input_div" data="ogrnip" placeholder="ОГРН">
                            <input type="text" class="creating_page_input_div" data="cpecial" placeholder="Должность">
                            <input type="text" class="creating_page_input_div" data="fio" placeholder="ФИО должностного лица">
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


            var _this = this;

            $('.creating_page_input_button').click( function() 
            {
                var _array = {
                    type: DT,
                    data: [],
                };
                var _error = false;
        
                $('.creating_page_input').children("input").each((i, element) => {
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
                } else {
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