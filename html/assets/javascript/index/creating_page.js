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

    class creating_page
    {
        constructor() 
        {
            this.global = $(`
                <div class="creating_page"></div>
            `);

            this.struct = 
            {
                "+1": {
                    header: "1. Описание предложения",
                    body: [
                        {
                            type: "string",
                            name: "Название проекта",
                            info: "Введите название проекта латинскими буквами или кирилицей",
                            _id: "name"
                        },
                        {
                            type: "string",
                            name: "Цель привлечения средств",
                            info: "Введите цель привлечения средств латинскими буквами или кирилицей",
                            _id: "target"
                        },
                        {
                            type: "string",
                            name: "Общая сумма привлечения",
                            info: "Введите целое значение суммы в рублях",
                            _id: "attraction_amount",
                            redacting: true,
                        },
                        {
                            type: "string",
                            name: "Срок инвестирования",
                            info: "Укажите целое количество месяцев",
                            _id: "date",
                            number: true
                        },
                        {
                            type: "string",
                            name: "Минимальная сумма",
                            info: "Введите целое значение суммы в рублях (от 50000)",
                            _id: "minimal_amount",
                            redacting: true,
                        },
                        {
                            type: "string",
                            name: "Ставка % в месяц",
                            info: "Введите целое или дробное значение в формате 1.15",
                            _id: "rate",
                            number_t: true
                        },
                        {
                            type: "menu",
                            menu_list: ['Ежедневно', 'Ежемесячно', 'Ежеквартально', 'Ежегодно'],
                            name: "Выплата процентов",
                            info: "Ежедневно, Ежемесячно, Ежеквартально, Ежегодно",
                            _id: "date_payments"
                        },
                        {
                            type: "date",
                            name: "Период сбора",
                            info: "Выберите дату периода сбора",
                            _id: "collection_period"
                        }
                    ]
                },
                "+2": {
                    header: "2. Данные о компании",
                    body: {
                        1: [
                            {
                                type: "string",
                                name: "Название компании",
                                info: "Введите название проекта латинскими буквами",
                                _id: "name_company"
                            },
                            {
                                type: "string",
                                name: "ИНН",
                                info: "Введите ИНН",
                                _id: "inn",
                                number: true
                            },
                            {
                                type: "string",
                                name: "ОГРН",
                                info: "Введите ОГРН",
                                _id: "ogrn",
                                number: true
                            },
                            {
                                type: "addr",
                                name: "Фактический адрес",
                                info: "Введите Фактический адрес",
                                _id: "addr"
                            },
                            {
                                type: "string",
                                name: "Сайт",
                                info: "Введите название ссылку на ваш сайт",
                                _id: "syte"
                            }
                        ],
                        2: [
                            {
                                type: "string",
                                name: "Прописка как в паспорте",
                                info: "Введите точные данные как в паспорте",
                                _id: "registration"
                            },
                            {
                                type: "string",
                                name: "Регион согласно паспорту",
                                info: "Например Московская область, Свердловская область",
                                _id: "region"
                            },
                            {
                                type: "string",
                                name: "Основанная деятельность",
                                info: "Например розничная торговля",
                                _id: "activity"
                            }
                        ]
                    }
                },
                "+3": {
                    header: "3. Выписка из банка",
                    body: [
                        {
                            type: "file",
                            name: "Загрузите вашу выписку из банка за 6 месяцев",
                            _id: "file+3"
                        },
                    ]
                },
                "+3_1": {
                    header: "3.1. Отчет о прибылях",
                    body: [
                        {
                            type: "file",
                            name: "Загрузите отчет о прибылях и убытках не менее чем за последние 6 месяцев.",
                            _id: "file+3_1"
                        },
                    ]
                },
                "+3_2": {
                    header: "3.2. Отчет о движении денежных средств",
                    body: [
                        {
                            type: "file",
                            name: "Загрузите отчет о движении денежных средств не менее чем за последние 6 месяцев.",
                            _id: "file+3_2"
                        },
                    ]
                },
                "+3_3": {
                    header: "3.3. Бухгалтерский баланс",
                    body: [
                        {
                            type: "file",
                            name: "Загрузите бухгалтерский баланс не старше 2 недель",
                            _id: "file+3_3"
                        },
                    ]
                },
                "+4": {
                    header: "4. Скан паспорта",
                    body: [
                        {
                            type: "file",
                            name: "Загрузите скан паспорта всех страниц одним файлом в формате PDF",
                            _id: "file+4"
                        },
                    ]
                },
                "+5": {
                    header: "5. Контакты",
                    body: [
                        {
                            type: "string",
                            name: "ФИО Представителя",
                            info: "Введите ФИО кирилицей",
                            _id: "initials"
                        },
                        {
                            type: "string",
                            name: "Должность",
                            info: "Должность которую вы занимаете в компании",
                            _id: "position"
                        },
                        {
                            type: "string",
                            name: "Телефон",
                            info: "Ваш номер телефона",
                            _id: "phone",
                            phone: true
                        },
                        {
                            type: "string",
                            name: "WhatsApp",
                            info: "Ваш номер телефона привязанный к WhatsApp",
                            _id: "whatsapp",
                            phone: true
                        },
                        {
                            type: "string",
                            name: "Email",
                            info: "Ваш действующий email",
                            _id: "email",
                            mail: true
                        }
                    ]
                },
                "+6": {
                    header: "6. Реквизиты",
                    body: [
                        {
                            type: "string",
                            name: "Банк-получатель",
                            info: "Введите название банка",
                            _id: "bank"
                        },
                        {
                            type: "string",
                            name: "Корр. счет",
                            info: "Введите Корр. счет",
                            _id: "account_correct",
                            number: true
                        },
                        {
                            type: "string",
                            name: "БИК",
                            info: "Введите БИК",
                            _id: "bik",
                            number: true,
                        },
                        {
                            type: "string",
                            name: "Получатель",
                            info: "Введите кто будет получать инвестиции",
                            _id: "recipient"
                        },
                        {
                            type: "string",
                            name: "Счет получателя",
                            info: "Введите счет получателя",
                            _id: "account_get",
                            number: true
                        },
                        {
                            type: "string",
                            name: "КПП",
                            info: "Введите КПП",
                            _id: "kpp",
                            number: true
                        }
                    ]
                },
                "+7": {
                    header: "7. Презентация",
                    body: [
                        {
                            type: "file",
                            name: "Загрузите вашу презентацию. Обращаем внимание: Презентация не должна содержать контактов!",
                            _id: "file+7"
                        },
                    ]
                },
                "+8": {
                    header: "8. Видео презентация",
                    body: [
                        {
                            type: "file",
                            name: `Загрузите вашу видео-презентацию (Внимание: без контактов!). Если видео-презентации нет, снимите видео с ответами на следующие вопросы:<br><br>
                            1. Поздоровайтесь и представтесь как ва зовут<br>
                            2. Кем вы являетесь в компании(проекте)<br>
                            3. Расскажите про ваш опыт чем и сколько по времени вы занимались ранее.<br>
                            4. Назовите название вашей компании(проекта)<br>
                            5. Сколько уже компания работает<br>
                            6. Расскажите о рынке на котором работает ваша компания<br>
                            7. Расскажите в кратце суть проекта<br>
                            8. Расскажите за счет чего формируется прибыль в компании(проекте)<br>
                            9. Расскажите о рисках<br>
                            10. Расскажите как вы решаете проблему с каждым риском`,
                            _id: "file+8"
                        },
                    ]
                }
            };
        };

        validateInn(inn) {
            var error = {};
            var result = false;
            if (typeof inn === 'number') {
                inn = inn.toString();
            } else if (typeof inn !== 'string') {
                inn = '';
            }
            if (!inn.length) {
                error.code = 1;
                error.message = 'ИНН пуст';
            } else if (/[^0-9]/.test(inn)) {
                error.code = 2;
                error.message = 'ИНН может состоять только из цифр';
            } else if ([10, 12].indexOf(inn.length) === -1) {
                error.code = 3;
                error.message = 'ИНН может состоять только из 10 или 12 цифр';
            } else {
                var checkDigit = function (inn, coefficients) {
                    var n = 0;
                    for (var i in coefficients) {
                        n += coefficients[i] * inn[i];
                    }
                    return parseInt(n % 11 % 10);
                };
                switch (inn.length) {
                    case 10:
                        var n10 = checkDigit(inn, [2, 4, 10, 3, 5, 9, 4, 6, 8]);
                        if (n10 === parseInt(inn[9])) {
                            result = true;
                        }
                        break;
                    case 12:
                        var n11 = checkDigit(inn, [7, 2, 4, 10, 3, 5, 9, 4, 6, 8]);
                        var n12 = checkDigit(inn, [3, 7, 2, 4, 10, 3, 5, 9, 4, 6, 8]);
                        if ((n11 === parseInt(inn[10])) && (n12 === parseInt(inn[11]))) {
                            result = true;
                        }
                        break;
                }
                if (!result) {
                    error.code = 4;
                    error.message = 'Неправильное контрольное число';
                }
            }
            return {
                result: result,
                error: error,
            };
        }

        dataLines = 
        {
            "string": function(data, put) 
            {
                var _line = $(`
                    <div class="body_point_line">
                        <div class="body_point_line_header">
                            <div class="body_point_line_header_text">
                                <span>${data.name}</span>
                                <p>${data.info}</p>
                            </div>
                            <div class="body_point_line_header_info">
                                <span class="_not">Не заполнено</span>
                                <span class="_yes">Готово</span>
                            </div>
                        </div>
                        <input id="${data._id}" class="text_area" placeholder="Введите значение">
                    </div>
                `);

                _line.find(`#${data._id}`).on('keyup input', function() 
                {
                    var _val = $(this).val();
                    Cookies.set(data._id, _val);
                });

                if(typeof Cookies.get(data._id) != "undefined") {
                    if(Cookies.get(data._id).length != 0) {
                        _line.find(`#${data._id}`).val(Cookies.get(data._id));
                        _line.find('._yes').css('display', "block");
                        _line.find('._not').css('display', "none");
                    }
                }

                
                if(typeof data.redacting != 'undefined') {
                    _line.find(`#${data._id}`).on('keyup input', function() 
                    {
                        var _val = $(this).val();
                        _val = _val.replace(/[^\d;]/g, '')
                        _val = _val.replace(/\s/g, '');
                        var format = String(_val).replace(/(\d)(?=(\d{3})+([^\d]|$))/g, '$1 ');
                        $(this).val(format);
                    });
                }

                if(typeof put != "undefined") {
                    _line.find(`#${data._id}`).val(put.data[data._id]);
                    _line.find('._yes').css('display', "block");
                    _line.find('._not').css('display', "none");
                }

                if(typeof data.phone != "undefined") {
                    _line.find(`#${data._id}`).mask("+7(999) 999-9999");
                }

                if(typeof data.inn_type != "undefined") {
                    _line.find(`#${data._id}`).mask("NNNNNNNNNNNN");
                }

                if(typeof data.number != "undefined") {
                    _line.find(`#${data._id}`).bind("change keyup input click", function() {
                        if (this.value.match(/[^0-9]/g)) {
                            this.value = this.value.replace(/[^0-9]/g, '');
                        }
                    });
                }

                if(typeof data.number_t != "undefined") {
                    _line.find(`#${data._id}`).bind("change keyup input click", function() {
                        if (this.value.match(/[^0-9\.]/g)) {
                            this.value = this.value.replace(/[^0-9\.]/g, '');
                        }
                    });
                }

                if(typeof data.mail != "undefined") {
                    _line.find(`#${data._id}`).inputmask("email");
                }

                return _line;
            },
            "file": function(data) 
            {
                var _file = `
                    <div class="download_buttons">
                        <input class="file_load" id='${data._id}' type='file'>
                        <label for="${data._id}">Загрузить <i class="fas fa-angle-double-down"></i></label>
                    </div>
                    <div class="loader_input" id="${data._id}_block">
                        <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
                    </div>
                    <div class="all_good">
                        <div class="all_good_row">
                            <span class="all_good_cheack">Посмотреть</span>
                            <span class="all_good_del">Удалить</span>
                        </div>
                    </div>
                    
                `;
                var _line = $(`
                    <div class="body_point_line _file">
                        <div class="body_point_line_header">
                            <div class="body_point_line_header_text">
                                <span>${data.name}</span>
                                ${_file}
                            </div>
                            <div class="body_point_line_header_info">

                            </div>
                        </div>
                    </div>
                `);

                return _line;
            },
            "menu": function(data) {
                var _line = $(`
                    <div class="body_point_line _menu">
                        <div class="body_point_line_header">
                            <div class="body_point_line_header_text">
                                <span>${data.name}</span>
                                <p>${data.info}</p>
                            </div>
                        </div>
                        <input id="${data._id}" class="text_area" placeholder="Введите значение">
                        <div class="menu_block">
                            <span>Ежедневно</span>
                            <i class="far fa-layer-group"></i>
                            <div class="menu_block_inline">

                            </div>
                        </div>
                    </div>
                `);

                _line.find('input').val(data.menu_list[0]);

                data.menu_list.forEach(element => {
                    _line.find('.menu_block_inline').append(`<p>${element}</p>`);
                });

                _line.find('.menu_block').click( function() {
                    $(this).find('.menu_block_inline').fadeToggle();
                })

                _line.find('.menu_block p').click( function() {
                    _line.find('.menu_block span').html($(this).html());
                    _line.find('input').val($(this).html());
                    console.log(_line.find('input').val());
                })

                return _line;
            },
            "date": function(data) 
            {
               
                var _line = $(`
                    <div class="body_point_line">
                        <div class="body_point_line_header">
                            <div class="body_point_line_header_text">
                                <span>${data.name}</span>
                                <p>${data.info}</p>
                            </div>
                            <div class="body_point_line_header_info">
                                <span class="_not">Не заполнено</span>
                                <span class="_yes">Готово</span>
                            </div>
                        </div>
                        <input id="${data._id}" type="date" class="text_area" name="calendar" min="2021-08-07">
                    </div>
                `);

                return _line;
            },
            "addr": function(data) {
                var _line = $(`
                    <div class="body_point_line">
                        <div class="body_point_line_header">
                            <div class="body_point_line_header_text">
                                <span>${data.name}</span>
                                <p>${data.info}</p>
                            </div>
                            <div class="body_point_line_header_info">
                                <span class="_not">Не заполнено</span>
                                <span class="_yes">Готово</span>
                            </div>
                        </div>
                        <input id="${data._id}" class="text_area" placeholder="Введите значение">
                        <div class="body_point_line_more_info_addr">
                            <span>addr</span>
                            <span>addr</span>
                        </div>
                    </div>
                `);

                var $input = _line.find(`#${data._id}`);
                var typingTimer;
                var doneTypingInterval = 1000;

                $input.on('keyup', function () {
                    clearTimeout(typingTimer);
                    typingTimer = setTimeout(doneTyping, doneTypingInterval);
                });
                  
                $input.on('keydown', function () {
                    clearTimeout(typingTimer);
                });
                  
                async function doneTyping () 
                {
                    if($input.val().length == 0) {
                        return;
                    }

                    var getAddr = await callApi({
                        methodName: 'getAddr',
                        data: $input.val(),
                    });

                    

                    var _data = JSON.parse(getAddr);

                    console.log(_data);

                    $('.body_point_line_more_info_addr span').eq(0).text(_data[0].result);
                    $('.body_point_line_more_info_addr span').eq(1).text(_data[0].source);
                    $('.body_point_line_more_info_addr').fadeOut( function () {
                        $(this).fadeIn();
                    });

                    $('.body_point_line_more_info_addr span').click( function () {
                        var inputText = $(this).text();
                        $(this).parent().parent().find('input').val(inputText);
                        $('.body_point_line_more_info_addr').fadeOut();
                    })
                }
                    
                return _line;
            }
            
        }

        async startRenderCreating(creatingData)
        {
            var type = {
                "LEGAL": function() {},
                "INDIVIDUAL": function() {},
                "FIZ": function() {},
            }

            if(creatingData == "error") {type["FIZ"]()}
            else {type[creatingData.type]()};

            $('.creating_page').empty();

            for (var key in this.struct) 
            {
                if(param != 1) 
                {
                    if(key == "+3_1" || key == "+3_2" || key == "+3_3") {
                        continue;
                    }
                }


                var data = this.struct[key];

                var _body = $(`<div class="body_point"></div>`);

                _body.append(`
                    <div class="body_point_header">
                        <span>${data.header}</span>
                    </div>
                `);

                var _this = this;
                
                var _dataBlock = data.body;
                if(key == "+2") { if(param == 1 || param == 2) { _dataBlock = data.body[1] } else { _dataBlock = data.body[2] }; }; 
                _dataBlock.forEach(element => 
                {
                    _body.append(_this.dataLines[element.type](element));
                });
                
                $('.creating_page').append(_body);
            }
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

            $('.index_page_body_header_info span').html("СОЗДАНИЕ ПРОЕКТА");
        }

        async nextRender() {
            var inn = $('.creating_page_input input').val();
            $('.creating_page_input input').val("")

            var user_block = `
                <div class="creating_page_start_user">
                    <div class="creating_page_start_user_block">
                        <span>
                            ${inn}
                        </span>
                    </div>
                </div>
            `;

            $('.creating_page_block').append(user_block);

            var cheackINN = this.validateInn(inn);

            if(!cheackINN.result)
            {
                var msgsBlock = `
                    <div class="creating_page_block">
                        <div class="creating_page_start">
                            <span>
                               ${cheackINN.error.message}
                            </span>
                        </div>
                    </div>
                `;
                $('.creating_page_block').append(msgsBlock);
            } else {
                var creatingData = await callApi({
                    methodName: "creatingData",
                    data: inn,
                });

                var msgsBlock = `
                    <div class="creating_page_block">
                        <div class="creating_page_start">
                            <span>
                               Подождите...
                            </span>
                        </div>
                    </div>
                `;
                $('.creating_page_block').append(msgsBlock);
            }

            console.log(creatingData);
            console.log(cheackINN);

            this.startRenderCreating(creatingData);
        }

        async startDefault()
        {
            var msgsBlock = $(`
                <div class="creating_page_block">
                    <div class="creating_page_start">
                        <span>
                            Добро пожаловать в мастер создания проекта! <br>
                            Введите свой инн для продолжения...
                        </span>
                    </div>
                </div>
            `);

            var inputText = $(`
                <div class="creating_page_input">
                    <input type="text">
                    <div class="creating_page_input_button">
                        <span>Отправить</span>
                    </div>
                </div>
            `);

            var _this = this;

            inputText.find('.creating_page_input_button span').click( function () {
                _this.nextRender();
            });

            this.global.append(msgsBlock);
            this.global.append(inputText);
        }

        async render() 
        {
            this.defaultCSS();    
            this.startDefault();

            $('.index_page_body_data').append(this.global);
        }
    }

    var components = {
        creating_page,
    };

    if(!global.Components) { global.Components = components; } 
    else { 
        for(var key in components)
        {
            global.Components[key] = components[key];
        }
    }

}(window))