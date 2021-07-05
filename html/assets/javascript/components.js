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


    class moderation {

        constructor() {

            this.$component = $(`
                <div class="index_page_body_moderation">
                    
                </div>
            `);

            this.header = $(`
                <div class="index_page_body_moderation_search">
                    <h1>Проекты, ожидающие модерации</h1>
                    <div class="moderation_search_block">
                        <input type="text" placeholder="Поиск">
                        <div class="moderation_search_block_buttons">
                            <div class="moderation_search_block_buttons_search">
                                <i class="fas fa-search"></i>
                            </div>
                            <div class="moderation_search_block_buttons_type">
                                <div class="moderation_search_block_buttons_type_full selected">
                                    <i class="fas fa-th"></i>
                                </div>
                                <div class="moderation_search_block_buttons_type_mini">
                                    <i class="fas fa-th-large"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `);

        };

        getModerationsBlocks() {
            return callApi({
                methodName: 'getModerations',
            }).then((data) => {
                return data; 
            });
        }

        setActive(_id) {
            return callApi({
                methodName: 'setActive',
                data: _id
            }).then((data) => {
                return data; 
            });
        }

        async render() 
        {
            this.$component.empty();
            this.$component.append(this.header);
            var _moderations = await this.getModerationsBlocks();
            _moderations.forEach(element => {
                var templateText = `
                    <div class="index_page_body_moderation_block">
                        <div class="redacting_button" data="${element._id}">
                            <i class="fas fa-pen-square"></i>
                        </div>

                        <h1>${element.data.name}</h1>
                        <p>${element.data.target}</p>
                        <div class="index_page_body_moderation_block_info_line">
                            <div class="index_page_body_moderation_block_info_line_row">
                                <span>№ ${element._id}</span><a>На модерации</a>
                            </div>
                        </div>
                        <div class="index_page_body_body_line">
                            <div class="index_page_body_body_line_left">
                                <div class="row">
                                    <span>СУММА</span>
                                    <p> ${element.data.attraction_amount} руб.</p>
                                </div>
                            </div>
                            <div class="index_page_body_body_line_right">
                                <div class="row">
                                    <span>СБОР МЕСЯЦЕВ</span>
                                    <p>${element.data.date}</p>
                                </div>
                            </div>
                        </div>
                        <div class="index_page_body_info">
                            <div class="index_page_body_info_line">
                                <span>Ставка % в год</span><p>${element.data.rate}%</p>
                            </div>
                            <div class="index_page_body_info_line">
                                <span>Выплаты</span><p>${element.data.date_payments}</p>
                            </div>
                            <div class="index_page_body_info_line">
                                <span>Вход от</span><p>${element.data.minimal_amount} руб.</p>
                            </div>
                        </div>
                        <div class="index_page_body_hrefs">
                            <a target="_blank" href="http://localhost/tbot/projects/${element._id}">Профиль компании</a>
                            <a target="_blank" href="http://localhost/tbot/projects/${element._id}/${element.data["file+7"]}">Презентация</a>
                            <a target="_blank" href="http://localhost/tbot/projects/${element._id}/${element.data["file+8"]}">Видео-презентация</a>
                        </div>
                    </div>
                `;
                this.$component.append(templateText);
            });

            return this.$component;
        }

    }

    class active {

        constructor() {

            this.$component = $(`
                <div class="index_page_body_moderation">

                </div>
            `);

            this.header = $(`
                <div class="index_page_body_moderation_search">
                    <h1>Активные проекты</h1>
                    <div class="moderation_search_block">
                        <input type="text" placeholder="Поиск">
                        <div class="moderation_search_block_buttons">
                            <div class="moderation_search_block_buttons_search">
                                <i class="fas fa-search"></i>
                            </div>
                            <div class="moderation_search_block_buttons_type">
                                <div class="moderation_search_block_buttons_type_full selected">
                                    <i class="fas fa-th"></i>
                                </div>
                                <div class="moderation_search_block_buttons_type_mini">
                                    <i class="fas fa-th-large"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `);

        };

        getActiveBlocks() {
            return callApi({
                methodName: 'getActive',
            }).then((data) => {
                return data; 
            });
        }

        async render() 
        {
            this.$component.empty();
            this.$component.append(this.header);
            var _moderations = await this.getActiveBlocks();
            console.log(_moderations);
            _moderations.forEach(element => {
                var templateText = `
                    <div class="index_page_body_moderation_block">

                        <h1>${element.data.name}</h1>
                        <p>${element.data.target}</p>
                        <div class="index_page_body_moderation_block_info_line">
                            <div class="index_page_body_moderation_block_info_line_row">
                                <span>№ ${element._id}</span><a>Активный</a>
                            </div>
                        </div>
                        <div class="index_page_body_body_line">
                            <div class="index_page_body_body_line_left">
                                <div class="row">
                                    <span>СУММА</span>
                                    <p> ${element.data.attraction_amount} руб.</p>
                                </div>
                            </div>
                            <div class="index_page_body_body_line_right">
                                <div class="row">
                                    <span>СБОР МЕСЯЦЕВ</span>
                                    <p>${element.data.date}</p>
                                </div>
                            </div>
                        </div>
                        <div class="index_page_body_info">
                            <div class="index_page_body_info_line">
                                <span>Ставка % в год</span><p>${element.data.rate}%</p>
                            </div>
                            <div class="index_page_body_info_line">
                                <span>Выплаты</span><p>${element.data.date_payments}</p>
                            </div>
                            <div class="index_page_body_info_line">
                                <span>Вход от</span><p>${element.data.minimal_amount} руб.</p>
                            </div>
                        </div>
                        <div class="index_page_body_hrefs">
                            <a target="_blank" href="http://localhost/tbot/projects/${element._id}">Профиль компании</a>
                            <a target="_blank" href="http://localhost/tbot/projects/${element._id}/${element.data["file+7"]}">Презентация</a>
                            <a target="_blank" href="http://localhost/tbot/projects/${element._id}/${element.data["file+8"]}">Видео-презентация</a>
                        </div>
                    </div>
                `;
                this.$component.append(templateText);
            });

            return this.$component;
        }

    }

    class project 
    {

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
                            _id: "name"
                        },
                        {
                            type: "string",
                            name: "Цель привлечения средств",
                            _id: "target"
                        },
                        {
                            type: "string",
                            name: "Общая сумма привлечения",
                            _id: "attraction_amount"
                        },
                        {
                            type: "string",
                            name: "Срок инвестирования",
                            _id: "date"
                        },
                        {
                            type: "string",
                            name: "Минимальная сумма",
                            _id: "minimal_amount"
                        },
                        {
                            type: "string",
                            name: "Ставка % в месяц",
                            _id: "rate"
                        },
                        {
                            type: "string",
                            name: "Выплата процентов",
                            _id: "date_payments"
                        },
                        {
                            type: "string",
                            name: "Период сбора",
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
                                _id: "name_company"
                            },
                            {
                                type: "string",
                                name: "ИНН",
                                _id: "inn"
                            },
                            {
                                type: "string",
                                name: "ОГРН",
                                _id: "ogrn"
                            },
                            {
                                type: "string",
                                name: "Фактический адрес",
                                _id: "addr"
                            },
                            {
                                type: "string",
                                name: "Сайт",
                                _id: "syte"
                            }
                        ],
                        2: [
                            {
                                type: "string",
                                name: "Прописка как в паспорте",
                                _id: "registration"
                            },
                            {
                                type: "string",
                                name: "Регион согласно паспорту",
                                _id: "region"
                            },
                            {
                                type: "string",
                                name: "Основанная деятельность",
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
                            name: "Загруженная выписка",
                            _id: "file+3"
                        },
                    ]
                },
                "+3_1": {
                    header: "3.1. Отчет о прибылях",
                    body: [
                        {
                            type: "file",
                            name: "Загруженный отчет",
                            _id: "file+3_1"
                        },
                    ]
                },
                "+3_2": {
                    header: "3.2. Отчет о движении денежных средств",
                    body: [
                        {
                            type: "file",
                            name: "Загруженный отчет",
                            _id: "file+3_2"
                        },
                    ]
                },
                "+3_3": {
                    header: "3.3. Бухгалтерский баланс",
                    body: [
                        {
                            type: "file",
                            name: "Загруженный бухгалтерский баланс",
                            _id: "file+3_3"
                        },
                    ]
                },
                "+4": {
                    header: "4. Скан паспорта",
                    body: [
                        {
                            type: "file",
                            name: "Загруженный скан паспорта",
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
                            _id: "initials"
                        },
                        {
                            type: "string",
                            name: "Компания/проект",
                            _id: "company_project"
                        },
                        {
                            type: "string",
                            name: "Должность",
                            _id: "position"
                        },
                        {
                            type: "string",
                            name: "Телефон",
                            _id: "phone"
                        },
                        {
                            type: "string",
                            name: "WhatsApp",
                            _id: "whatsapp"
                        },
                        {
                            type: "string",
                            name: "Email",
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
                            _id: "bank"
                        },
                        {
                            type: "string",
                            name: "Корр. счет",
                            _id: "account_correct"
                        },
                        {
                            type: "string",
                            name: "БИК",
                            _id: "bik"
                        },
                        {
                            type: "string",
                            name: "Получатель",
                            _id: "recipient"
                        },
                        {
                            type: "string",
                            name: "Счет получателя",
                            _id: "account_get"
                        },
                        {
                            type: "string",
                            name: "Назначение платежа",
                            _id: "get_pay"
                        },
                        {
                            type: "string",
                            name: "ИНН",
                            _id: "bank_inn"
                        },
                        {
                            type: "string",
                            name: "КПП",
                        }
                    ]
                },
                "+7": {
                    header: "7. Презентация",
                    body: [
                        {
                            type: "file",
                            name: "Презентация",
                            _id: "file+7"
                        },
                    ]
                },
                "+8": {
                    header: "8. Видео презентация",
                    body: [
                        {
                            type: "file",
                            name: `Видео-презентация`,
                            _id: "file+8"
                        },
                    ]
                }
            }
        };

        getProject(_id) {
            return callApi({
                methodName: 'getProject',
                data: _id,
            }).then((data) => {
                return data; 
            });
        }

        string(data, _project) 
        {
            var need_block = _project.data[data._id];
            var _line = $(`
                <div class="body_point_line">
                    <div class="body_point_line_header">
                        <div class="body_point_line_header_text">
                            <span><strong>${data.name}:</strong></span>
                            <p>${need_block}</p>
                        </div>
                    </div>
                </div>
            `);

            return _line;
        }

        file(data, _project) {
            var _file = `
                <div class="download_buttons">
                    <a>Посмотреть <i class='fas fa-download'></i></a>
                </div>  
            `;
            var _line = $(`
                <div class="body_point_line _file">
                    <div class="body_point_line_header">
                        <div class="body_point_line_header_text">
                            <span><strong>${data.name}</strong></span>
                            ${_file}
                        </div>
                        <div class="body_point_line_header_info">

                        </div>
                    </div>
                </div>
            `);

            return _line;
        }

        showProjectData(_project, _data) 
        {
            var param = _project.data.organization;

            if(_data == "1") 
            {
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
                                        var _string = this.string(element, _project);
                                        _body.append(_string);
                                    }
                                    if(element.type == "file")
                                    {
                                        var _string = this.file(element, _project);
                                        _body.append(_string);
                                    }
                                });
                        } else {
                            data.body[2].forEach(element => 
                                {
                                    if(element.type == "string")
                                    {
                                        var _string = this.string(element, _project);
                                        _body.append(_string);
                                    }
                                    if(element.type == "file")
                                    {
                                        var _string = this.file(element, _project);
                                        _body.append(_string);
                                    }
                                });
                        }
                    } else {
                        data.body.forEach(element => 
                        {
                            if(element.type == "string")
                            {
                                var _string = this.string(element, _project);
                                _body.append(_string);
                            }
                            if(element.type == "file")
                            {
                                var _string = this.file(element, _project);
                                _body.append(_string);
                            }
                        });
                    }
    
                    _body.append('<textarea id="${data._id}" class="text_area" rows="1"></textarea>');
                    
                    $('.index_page_body_row').append(_body);
                } 
            }
            if(_data == "2")
            {
                var templateText = `
                    <div class="info_block">
                        <div class="info_block_line">
                            <h1>Заемщик - ЮРИДИЧЕСКОЕ ЛИЦО</h1>
                            <div class="info_block_line_text">
                                <span>Название компании</span>
                                <p>ОБЩЕСТВО С ОГРАНИЧЕННОЙ ОТВЕТСТВЕННОСТЬЮ "ЛЕРУА МЕРЛЕН ВОСТОК"</p>
                            </div>
                            <div class="info_block_line_text">
                                <span>Дата регистрации</span>
                                <p>18.06.2003</p>
                            </div>
                            <div class="info_block_line_text">
                                <span>Подробная информация</span>
                                <p>https://www.rusprofile.ru/id/1725155</p>
                            </div>
                            <div class="info_block_line_text">
                                <span>ИНН/ОГРН</span>
                                <p>5029069967/1035005516105</p>
                            </div>
                            <div class="info_block_line_text">
                                <span>Фактический адрес:</span>
                                <p>адрес ф</p>
                            </div>
                            <div class="info_block_line_text">
                                <span>Основная деятельность</span>
                                <p>Торговля розничная мебелью, осветительными приборами и прочими бытовыми изделиями в специализированных магазинах (47.59)</p>
                            </div>
                            <div class="info_block_line_text">
                                <span>Учредитель</span>
                                <p>Дефассье Лоран Луи Клод</p>
                            </div>
                        </div>
                        <div class="info_block_line">
                            <h1>Кредитная история в «<strong>investER</strong>»</h1>
                            <div class="info_block_line_text">
                                <span>Сумма закрытых займов</span>
                                <p>0 ₽</p>
                            </div>
                            <div class="info_block_line_text">
                                <span>Сумма займов за текущий календарный год</span>
                                <p>0 ₽</p>
                            </div>
                            <div class="info_block_line_text">
                                <span>Максимальная сумма займа</span>
                                <p>0 ₽</p>
                            </div>
                            <div class="info_block_line_text">
                                <span>Дата закрытия последнего договора займа</span>
                                <p></p>
                            </div>
                            <div class="info_block_line_text">
                                <span>Обеспечение</span>
                                <p>недоступно</p>
                            </div>
                        </div>
                        <div class="info_block_line">
                            <h1>Арбитражная практика</h1>
                            <div class="info_block_line_text">
                                <span>Рассматриваемые судебные дела</span>
                                <p>44</p>
                            </div>
                            <div class="info_block_line_text">
                                <span>Из них в качестве ответчика: 16, В качестве истца: 19, В качестве третьего/иного лица: 10</span>
                                <p></p>
                            </div>
                            <div class="info_block_line_text">
                                <span>Сумма исковых требований</span>
                                <p>311 681 491 руб.</p>
                            </div>
                            <div class="info_block_line_text">
                                <span>Завершенные судебные дела</span>
                                <p>390</p>
                            </div>
                            <div class="info_block_line_text">
                                <span>Из них в качестве ответчика: 134, В качестве истца: 162, В качестве третьего/иного лица: 97</span>
                                <p></p>
                            </div>
                        </div>
                    </div>
                `;


                $('.index_page_body_row').append(templateText);
            }

        }

        redactingInfoProject(_projectBlock, _project) 
        {
            var _this = this;
            _this.showProjectData(_project, 1);
            _projectBlock.find('.index_page_body_project_body_header span').click( function() {
                $('.index_page_body_project_body_header span').removeClass('selected');
                $(this).addClass('selected');
                var _data = $(this).attr('data');
                $('.body_point').remove();
                $('.info_block').remove();
                _this.showProjectData(_project, _data);
            })
        }

        async render(_id) 
        {
            var _project = await this.getProject(_id);
            var _projectBlock = $(`
                <div class="index_page_body_project">
                    <div class="index_page_body_project_header">
                        <div class="index_page_body_project_header_text">
                            <h1>№ ${_project._id} ${_project.data.name}</h1>
                            <p>Развитие бизнеса</p>
                            <div class="index_page_body_project_header_buttons">
                                <span class="not_accept">Отправить на доработку</span>
                                <span class="accept">Принять проект</span>
                            </div>
                            <div class="index_page_body_project_body">
                                <div class="index_page_body_project_body_header">
                                    <span class="selected" data="1">Поданные данные</span>
                                    <span data="2">Компания</span>
                                </div>
                                <div class="index_page_body_project_body_content">
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `);

            $('.index_page_body_row').append(_projectBlock);

            this.redactingInfoProject(_projectBlock, _project);
        }

        accept(_id) 
        {
            callApi({
                methodName: 'acceptProject',
                data: _id,
            }).then((data) => {
                return data; 
            });
        }

    }

    if(!global.Components)
    {
        global.Components = {
            moderation,
            active,
            project,
        }
    }
    


}(window))