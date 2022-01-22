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

            var _this = this;

            var msgsBlock = $(`
                <div class="creating_page_block">
                    <div class="creating_page_start" style="margin-bottom: 20px">
                        <span>
                            Уважаемый Инвестор ${global.allData.User.first_name} переведите ${_this.money} руб. По реквезитам ниже и Пришлите чек оплаты для окончания инвестирования. <br><br>

                            Реквезиты перечисления: <br><br>
                            Банк-получатель: ${this.project.data.bank} <br>
                            Корр. счет: ${this.project.data.account_correct} <br>
                            БИК: ${this.project.data.bik} <br>
                            КПП: ${this.project.data.kpp} <br>
                            Получатель: ${this.project.data.recipient} <br>
                            Счет получателя: ${this.project.data.account_get} <br>
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
                            Уважаемый Инвестор ${global.allData.User.first_name} Введите сумму инвестирования</a>.
                        </span>
                    </div>
                </div>
            `);

            var _block = $(`
                <div class="creating_page_input">
                    <div class="creating_page_input_div" data="pay" data-number="true">
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

            // var funGetBBDAta = () => {
            //     $(`.creating_page_input_div[data-number="true"] span`).bind("DOMSubtreeModified",function(){
            //         $(this).removeEventListener("DOMSubtreeModified", funGetBBDAta(), false);
            //         var _text = $(this).text();
            //         $(this).html(_text.toString().replace(/(\d)(?=(\d{3})+([^\d]|$))/g, '$1 '));
            //     });
            // }

            // funGetBBDAta();
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