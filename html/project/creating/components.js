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


    class components {

        constructor() 
        {
            this.struct = 
            {
                "+1": {
                    header: "1. Описание предложения",
                    body: [
                        {
                            type: "string",
                            name: "Название проекта",
                            info: "Введите название проекта латинскими буквами",
                            _id: "name"
                        },
                        {
                            type: "string",
                            name: "Цель привлечения средств",
                            info: "Введите название проекта латинскими буквами",
                            _id: "target"
                        },
                        {
                            type: "string",
                            name: "Общая сумма привлечения",
                            info: "Введите целое значение суммы в рублях",
                            _id: "attraction_amount"
                        },
                        {
                            type: "string",
                            name: "Срок инвестирования",
                            info: "Укажите целое количество месяцев",
                            _id: "date"
                        },
                        {
                            type: "string",
                            name: "Минимальная сумма",
                            info: "Введите целое значение суммы в рублях (от 50000)",
                            _id: "minimal_amount"
                        },
                        {
                            type: "string",
                            name: "Ставка % в месяц",
                            info: "Введите целое или дробное значение в формате 1.15",
                            _id: "rate"
                        },
                        {
                            type: "string",
                            name: "Выплата процентов",
                            info: "Ежедневно, Ежемесячно, Ежеквартально, Ежегодно",
                            _id: "date_payments"
                        },
                        {
                            type: "string",
                            name: "Период сбора",
                            info: "Укажите целое количество месяцев либо Бессрочно",
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
                                info: "Введите название проекта латинскими буквами",
                                _id: "inn"
                            },
                            {
                                type: "string",
                                name: "ОГРН",
                                info: "Введите название проекта латинскими буквами",
                                _id: "ogrn"
                            },
                            {
                                type: "string",
                                name: "Фактический адрес",
                                info: "Введите название проекта латинскими буквами",
                                _id: "addr"
                            },
                            {
                                type: "string",
                                name: "Сайт",
                                info: "Введите название проекта латинскими буквами",
                                _id: "syte"
                            }
                        ],
                        2: [
                            {
                                type: "string",
                                name: "Прописка как в паспорте",
                                info: "null",
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
                            name: "Загрузите вашу выписку из банка за 8 месяцев",
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
                            name: "ФИО",
                            info: "null",
                            _id: "initials"
                        },
                        {
                            type: "string",
                            name: "Компания/проект",
                            info: "null",
                            _id: "company_project"
                        },
                        {
                            type: "string",
                            name: "Должность",
                            info: "null",
                            _id: "position"
                        },
                        {
                            type: "string",
                            name: "Телефон",
                            info: "null",
                            _id: "phone"
                        },
                        {
                            type: "string",
                            name: "WhatsApp",
                            info: "null",
                            _id: "whatsapp"
                        },
                        {
                            type: "string",
                            name: "Email",
                            info: "null",
                            _id: "email"
                        }
                    ]
                },
                "+6": {
                    header: "6. Реквезиты",
                    body: [
                        {
                            type: "string",
                            name: "Банк-получатель",
                            info: "null",
                            _id: "bank"
                        },
                        {
                            type: "string",
                            name: "Корр. счет",
                            info: "null",
                            _id: "account_correct"
                        },
                        {
                            type: "string",
                            name: "БИК",
                            info: "null",
                            _id: "bik"
                        },
                        {
                            type: "string",
                            name: "Получатель",
                            info: "null",
                            _id: "recipient"
                        },
                        {
                            type: "string",
                            name: "Счет получателя",
                            info: "null",
                            _id: "account_get"
                        },
                        {
                            type: "string",
                            name: "Назначение платежа",
                            info: "null",
                            _id: "get_pay"
                        },
                        {
                            type: "string",
                            name: "ИНН",
                            info: "null",
                            _id: "bank_inn"
                        },
                        {
                            type: "string",
                            name: "КПП",
                            info: "kpp",
                        }
                    ]
                },
                "+7": {
                    header: "7. Презентация",
                    body: [
                        {
                            type: "file",
                            name: "null",
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

        start_preloader(_this, callback) {
            _this.parent().fadeOut( function() {
                _this.parent().parent().find('.loader_input').fadeIn( function() {
                    callback();
                });
            }); 
        }

        async load_file(_this, _id, file_id) 
        {
            let Data = new FormData();

            $(_this.files).each(function(index, file) {
                Data.append('files', file);
                Data.append('file_id', file_id);
                Data.append('_id', _id);
            });

            this.start_preloader($(_this), function() {
                $.ajax({
                    url: "http://localhost:3000/upload_project",
                    type: "POST",
                    data: Data,
                    contentType: false,
                    processData: false,
                    success: function(data) {
                        $(_this).parent().parent().find('.loader_input').attr('data', data.file_name);
                        $(_this).parent().parent().find('.loader_input').fadeOut( function() {
                            $(_this).parent().parent().find('.all_good').fadeIn( function() {
                        
                            });
                        });
                    }
               });
            });
        }

        _User(_id) {
            return callApi({
                methodName: 'getUser',
                data: _id,
            }).then((data) => {
                return data; 
            });
        }

        string(data) 
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
                    <textarea id="${data._id}" class="text_area" rows="1"></textarea>
                </div>
            `);

            return _line;
        }

        file(data) {
            var _file = `
                <div class="download_buttons">
                    <input class="file_load" id='${data._id}' type='file'>
                    <label for="${data._id}">Загрузить <i class='fas fa-download'></i></label>
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
        }


        async render(param) 
        {

            $('.index_page_body_points').empty();

            for (var key in this.struct) 
            {
                if(param != "1") {
                    if(key == "+3.1" || key == "+3.2" || key == "+3.3") {
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

                if(key == "+2") {
                    if(param == 1 || param == 2) {
                        data.body[1].forEach(element => 
                            {
                                if(element.type == "string")
                                {
                                    var _string = this.string(element);
                                    _body.append(_string);
                                }
                                if(element.type == "file")
                                {
                                    var _string = this.file(element);
                                    _body.append(_string);
                                }
                            });
                    } else {
                        data.body[2].forEach(element => 
                            {
                                if(element.type == "string")
                                {
                                    var _string = this.string(element);
                                    _body.append(_string);
                                }
                                if(element.type == "file")
                                {
                                    var _string = this.file(element);
                                    _body.append(_string);
                                }
                            });
                    }
                } else {
                    data.body.forEach(element => 
                    {
                        if(element.type == "string")
                        {
                            var _string = this.string(element);
                            _body.append(_string);
                        }
                        if(element.type == "file")
                        {
                            var _string = this.file(element);
                            _body.append(_string);
                        }
                    });
                }
                
                $('.index_page_body_points').append(_body);
            }
        }

        changeTextArea(block) {
            if(block.val().length > 0) {
                block.parent().find('._not').fadeOut( function() {
                    block.parent().find('._yes').fadeIn();
                });
            } else {
                block.parent().find('._yes').fadeOut( function() {
                    block.parent().find('._not').fadeIn();
                });
            }
        }

        correct(param, user) 
        {
            var correctArray = {};

            correctArray.organization = $('.index_page_header_logo_menu_row').find('.selected').attr('data');

            for (var key in this.struct) 
            {
                if(param != "1") {
                    if(key == "+3.1" || key == "+3.2" || key == "+3.3") {
                        continue;
                    }
                }

                var data = this.struct[key];

                if(key == "+2") {
                    if(param == 1 || param == 2) {
                        data.body[1].forEach(element => 
                        {
                            if(element.type == "string")
                            {
                                correctArray[element._id] = $(`#${element._id}`).val();
                            }
                            if(element.type == "file")
                            {
                                correctArray[element._id] = document.getElementById(`${element._id}_block`).getAttribute('data');
                            }
                        });
                    } else {
                        data.body[2].forEach(element => 
                        {
                            if(element.type == "string")
                            {
                                correctArray[element._id] = $(`#${element._id}`).val();
                            }
                            if(element.type == "file")
                            {
                                correctArray[element._id] = document.getElementById(`${element._id}_block`).getAttribute('data');
                            }
                        });
                    }
                } else {
                    data.body.forEach(element => 
                    {
                        if(element.type == "string")
                        {
                            correctArray[element._id] = $(`#${element._id}`).val();
                        }
                        if(element.type == "file")
                        {
                            correctArray[element._id] = document.getElementById(`${element._id}_block`).getAttribute('data');
                        }
                    });
                }
            }

            $('.index_page').empty();
            $('.preloader').fadeIn();

            callApi({
                methodName: 'setProject',
                data: {
                    data: correctArray,
                    user: user,
                },
            }).then((data) => {
                $('.preloader').fadeOut( function() {
                    $('.end_get_project').css('display', "flex");
                })
            });
        }
    }

    if(!global.Components)
    {
        global.Components = {
            components,
        }
    }
    


}(window))