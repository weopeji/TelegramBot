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

            var msgsBlock = $(`
                <div class="creating_page_block">
                    <div class="creating_page_start" style="margin-bottom: 20px">
                        <span>
                            Уважаемый Инвестор.... вводя данные вы подтверждаете, что <br> ознакомились и принимаете все условия <a href="https://google.com">"Пользовательского соглашения"</a>.
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

        async renderOldBlock(_array)
        {
            console.log(_array);
            
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
                        <span contenteditable="true">Введите сумму инвестирования</span>
                    </div>
                    <div class="creating_page_input_button">
                        <span>Отправить</span>
                    </div>
                </div>
            `);

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
                    _array.data.push({
                        _id: $(element).attr('data'),
                        data: $(element).find('span').text(),
                    });
                });

                _this.renderOldBlock(_array);
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