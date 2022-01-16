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

            $('.index_page_body_header_info span').html("ЗАЯВКА НА ИНВЕСТИРОВАНИЕ ПРОЕКТА");
        }

        async render() 
        {
            this.defaultCSS();
            var _this = this;

            var _project = await callApi({
                methodName: "getProjectForInvesterPage",
                data: _GET('user'),
            });

            this.project = _project;

            var msgsBlock = $(`
                <div class="creating_page_block">
                    <div class="creating_page_start" style="margin-bottom: 20px">
                        <span>
                            Уважаемый Инвестор ${global.allData.User.first_name} вводя данные вы подтверждаете, что <br> ознакомились и принимаете все условия <a href="https://google.com">"Пользовательского соглашения"</a>.
                        </span>
                    </div>
                    <div class="creating_page_start">
                        <span>
                            Добро пожаловать в мастер Инвестиции в проект! <br>
                            На этом этапе вам необходимо  ознакомится с договором и внести данные для договора. Заполните данные, выберите нужный пункт 
                        </span>
                    </div>
                </div>
            `);

            var inputViewProject = $(`
                <div class="creating_page_input_viev">
                    <img src="/projects/19/logo.png" alt="">
                </div>
            `);

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
            this.global.append(inputViewProject);
            this.global.append(inputText);

            $('.index_page_body_data').append(this.global);
        }

        async cheackGet()
        {
            $('.creating_page').empty();

            var msgsBlock = $(`
                <div class="creating_page_block">
                    <div class="creating_page_start" style="margin-bottom: 20px">
                        <span>
                            Уважаемый Инвестор.... Пришлите чек оплаты для окончания инвестирования</a>.
                        </span>
                    </div>
                </div>
            `);

            var _block = $(`
                <div class="creating_page_input">
                    <div class="creating_page_input_div" data="pay">
                        <input type="file">
                        <span style="text-align: center">Загрузить</span>
                    </div>
                </div>
            `);

            _block.find('span').click( function () {
                _block.find('input').click();
            })

            var _this = this;

            _block.find('input[type=file]').change( async function() 
            {
                await callApi({
                    methodName: "setInvesterDataProjectForInvesterPage",
                    data: {
                        user:  _GET('user'),
                        data: _this.inv,
                    },
                });

                var filename = $(this.files)[0].name;
                var aux = filename.split('.');
                var extension = aux[aux.length -1].toUpperCase();

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

                alert('Успешно!');
                location.href = `https://t.me/invester_official_bot?start=project_${_this.project._id}`; 
            });

            $('.creating_page').append(msgsBlock);
            $('.creating_page').append(_block);
        }

        async renderOldBlock()
        {
            $('.creating_page').empty();

            var msgsBlock = $(`
                <div class="creating_page_block">
                    <div class="creating_page_start" style="margin-bottom: 20px">
                        <span>
                            Уважаемый Инвестор.... Введите сумму инвестирования</a>.
                        </span>
                    </div>
                </div>
            `);

            var _block = $(`
                <div class="creating_page_input">
                    <div class="creating_page_input_div" data="pay">
                        <span contenteditable="true"></span>
                    </div>
                    <div class="creating_page_input_button">
                        <span>Отправить</span>
                    </div>
                </div>
            `);

            var _this = this;

            _block.find('.creating_page_input_button span').click( function() {
                var money = $('.creating_page_input_div span').text();
                var _projectMoney = _this.project.data.minimal_amount.toString().trim().replace(/\s/g, '');

                console.log(_this.project.data.minimal_amount.toString().trim());

                if(Number(money) < Number(_projectMoney))
                {
                    alert('Сумма недостаточна!');
                } else {
                    _this.money = Number(money);
                    _this.cheackGet();
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
                            <div class="creating_page_input_div" data="inn">
                                <span contenteditable="true">ИНН</span>
                            </div>
                            <div class="creating_page_input_div" data="kpp">
                                <span contenteditable="true">КПП</span>
                            </div>
                            <div class="creating_page_input_div" data="ogrnip">
                                <span contenteditable="true">ОГРН</span>
                            </div>
                            <div class="creating_page_input_div" data="cpecial">
                                <span contenteditable="true">Должность</span>
                            </div>
                            <div class="creating_page_input_div" data="fio">
                                <span contenteditable="true">ФИО должностного лица</span>
                            </div>
                            <div class="creating_page_input_div" data="addr">
                                <span contenteditable="true">Юридический адрес</span>
                            </div>
                            <div class="creating_page_input_div" data="bank">
                                <span contenteditable="true">Банк получателя</span>
                            </div>
                            <div class="creating_page_input_div" data="bik">
                                <span contenteditable="true">БИК</span>
                            </div>
                            <div class="creating_page_input_div" data="nomer">
                                <span contenteditable="true">Номер расчетного счета</span>
                            </div>
                            <div class="creating_page_input_div" data="nomer_kor">
                                <span contenteditable="true">Номер корреспондентского  счета</span>
                            </div>
                            <div class="creating_page_input_button">
                                <span>Отправить</span>
                            </div>
                        </div>
                    `);

                    _block.find('.creating_page_input_div').click( function() {
                        if(!$(this).attr('data'))
                        {
                            $(this).children('span').empty();
                            $(this).attr('data', "true");
                        }
                    })

                    $('.creating_page').append(_block);
                },
                "IP": function()
                {
                    var _block = $(`
                        <div class="creating_page_input">
                            <div class="creating_page_input_div" data="fio">
                                <span contenteditable="true">ФИО</span>
                            </div>
                            <div class="creating_page_input_div" data="cpecial">
                                <span contenteditable="true">ИНН</span>
                            </div>
                            <div class="creating_page_input_div" data="fio">
                                <span contenteditable="true">ОГРНИП</span>
                            </div>
                            <div class="creating_page_input_div" data="addr">
                                <span contenteditable="true">адрес</span>
                            </div>
                            <div class="creating_page_input_div" data="bank">
                                <span contenteditable="true">Банк получателя</span>
                            </div>
                            <div class="creating_page_input_div" data="bik">
                                <span contenteditable="true">БИК</span>
                            </div>
                            <div class="creating_page_input_div" data="nomer">
                                <span contenteditable="true">Номер расчетного счета</span>
                            </div>
                            <div class="creating_page_input_div" data="nomer_kor">
                                <span contenteditable="true">Номер корреспондентского  счета</span>
                            </div>
                            <div class="creating_page_input_button">
                                <span>Отправить</span>
                            </div>
                        </div>
                    `);

                    _block.find('.creating_page_input_div').click( function() {
                        if(!$(this).attr('data'))
                        {
                            $(this).children('span').empty();
                            $(this).attr('data', "true");
                        }
                    })

                    $('.creating_page').append(_block);
                },
                "FIZ": function()
                {
                    var _block = $(`
                        <div class="creating_page_input">
                            <div class="creating_page_input_div" data="ogrnip">
                                <span contenteditable="true">Фио полностью</span>
                            </div>
                            <div class="creating_page_input_div" data="cpecial">
                                <span contenteditable="true">Номер паспорта и Серия паспорта</span>
                            </div>
                            <div class="creating_page_input_div" data="fio">
                                <span contenteditable="true">Кем выдан</span>
                            </div>
                            <div class="creating_page_input_div" data="addr">
                                <span contenteditable="true">Прописка</span>
                            </div>
                            <div class="creating_page_input_div" data="bank">
                                <span contenteditable="true">Банк получателя</span>
                            </div>
                            <div class="creating_page_input_div" data="bik">
                                <span contenteditable="true">БИК</span>
                            </div>
                            <div class="creating_page_input_div" data="nomer">
                                <span contenteditable="true">Номер расчетного счета</span>
                            </div>
                            <div class="creating_page_input_div" data="nomer_kor">
                                <span contenteditable="true">Номер корреспондентского  счета</span>
                            </div>
                            <div class="creating_page_input_button">
                                <span>Отправить</span>
                            </div>
                        </div>
                    `);

                    _block.find('.creating_page_input_div').click( function() {
                        if(!$(this).attr('data'))
                        {
                            $(this).children('span').empty();
                            $(this).attr('data', "true");
                        }
                    })

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
        
                $('.creating_page_input').children().each((i, element) => {
                    if(typeof $(element).attr('data') != 'undefined')
                    {
                        _array.data.push({
                            _id: $(element).attr('data'),
                            data: $(element).find('span').text(),
                        });
                    }
                });

                _this.inv = _array;
                _this.renderOldBlock();
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