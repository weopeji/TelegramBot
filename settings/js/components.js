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

    class auth_block
    {
        constructor() {};

        render() 
        {
            if(global.pageID) 
            {
                $(`.index_page_menu_block_line[data="${global.pageID}"]`).addClass('selected');
            }

            $('.index_page_menu_block_line').click( function() {
                location.href = `/settings/?page=${$(this).attr('data')}`;
            });
        }
    }

    class projects
    {
        constructor() 
        {
            this.global_block = $(`
                <div class="moderation_item_block"></div>
            `);
        };

        getBlocks(_array, name) 
        {
            _array.forEach(element => {
                var item_block = $(`
                    <div class="index_page_body_moderation_block" data="${element._id}">
                        <h1>${element.data.name}</h1>
                        <p>${element.data.target}</p>
                        <div class="index_page_body_moderation_block_info_line">
                            <span>${element._id}</span><a>${name}</a>
                        </div>
                        <div class="index_page_body_info">
                            <div class="index_page_body_info_line">
                                <span>Сумма</span><p>${element.data.attraction_amount} руб.</p>
                            </div>
                            <div class="index_page_body_info_line">
                                <span>На срок</span><p>${element.data.collection_period.replace(/-/g, ".")}</p>
                            </div>
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
                            <a target="_blank" href="${getURL()}/html/project/profil/#${element._id}">
                                <i class="fal fa-id-card"></i>
                            </a>
                            <a target="_blank" href="${getURL()}/projects/${element._id}/${element.data["file+7"]}">
                                <i class="fal fa-presentation"></i>
                            </a>
                            <a target="_blank" href="${getURL()}/projects/${element._id}/${element.data["file+8"]}">
                                <i class="fal fa-play"></i>
                            </a>
                        </div>
                    </div>
                `);

                this.global_block.append(item_block);
            });

            $('.index_page_body_data').append(this.global_block);

            $('.index_page_body_moderation_block').click( function () {
                location.href = `/settings/?page=block&id=${$(this).attr('data')}`;
            });
        }

        async render(type) 
        {
            var typeRender = {
                "moderations": async function() {
                    var getModerations = await callApi({
                        methodName: "getModerations",
                        data: null,
                    });

                    return getModerations;
                },
            }

            this.getBlocks(await typeRender[type](), "На модерации")
        }
    }

    class block
    {
        constructor() {
            this.global_block = $(`
                <div class="global_block"></div>
            `);
        };

        async render_header(_project)
        {
            var header_info = $(`
                <div class="global_block_header">
                    <div class="global_block_header_info">
                        <h1>${_project.data.name}</h1>
                        <p>${_project.data.target}</p>
                    </div>
                    <div class="global_block_header_accept_button">
                        <span>Принять проект<i class="fas fa-arrow-right"></i></span>
                    </div>
                </div>
            `);

            var header_menu = $(`
                <div class="global_block_menu">
                    <span data="data">Поданные данные</span>
                    <span data="info">О компании</span>
                    <span data="more">Юридические данные</span>
                </div>
            `);

            header_menu.find('span').click( function () {
                location.href = `/settings/?page=block&id=${_project._id}&more=${$(this).attr('data')}`;
            });

            this.global_block.append(header_info);
            this.global_block.append(header_menu);
        }

        async renderData(_project)
        {
            var struct = 
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
                            name: "Ставка % в год",
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
            };

            var param       = _project.data.organization;

            var string      = function (element, _project)
            {

                var moreBlock  = {
                    "string": function() {
                        return `<p>${_project.data[element._id]}</p>`;
                    },
                    "file": function() {
                        return ``;
                    },
                };

                var _line = $(`
                    <div class="body_point_line">
                        <span>${element.name}:</span>
                        ${moreBlock[element.type]()}
                    </div>
                `);

                return _line;
            }

            for (var key in struct) 
            {
                var _body       = $(`<div class="body_point"></div>`);

                if(param != "1") {
                    if(key == "+3.1" || key == "+3.2" || key == "+3.3") {
                        continue;
                    }
                }

                var data = struct[key];

                _body.append(`
                    <div class="body_point_header">
                        <span>${data.header}</span>
                    </div>
                `);

                if(key == "+2") {
                    if(param == 1 || param == 2) {
                        data.body[1].forEach(element => 
                        {
                            _body.append(string(element, _project));
                        });
                    } else {
                        data.body[2].forEach(element => 
                        {
                            _body.append(string(element, _project));
                        });
                    }
                } else {
                    data.body.forEach(element => 
                    {
                        _body.append(string(element, _project));
                    });
                }

                _body.append(`
                    <div class="body_point_textarea">
                        <textarea id="${key}_textarea" class="text_area" rows="1"></textarea>
                    </div>
                `);
                
                this.global_block.append(_body);
            }
        }

        async renderInfo(_project)
        {
            var _body = $(`
                <div class="index_page_profil">
                    <iframe id="profil" src="../html/project/profil#${_project._id}" frameborder="0"></iframe>
                </div>
            `);

            var _iframe = _body.find('#profil');
            
            _iframe.on('load', function () {
                var _content = _iframe.contents();
                var _height = _content.find('.index_page_profil')[0];
                _iframe.css({
                    'height': '1934px',
                    'width': '100%',
                    'margin': 0,
                    "margin-top": "20px",
                });
                _content.find('.index_page_profil').css({
                    'width': '100%',
                    'margin': 0,
                });
                _content.find('body').css('width', '100%');
            });

            this.global_block.append(_body);
        }

        async render()
        {
            var _this = this;

            var getProject = await callApi({
                methodName: "getProject",
                data: _GET('id'),
            });

            console.log(getProject);

            this.render_header(getProject);

            if(_GET('more')) {
                var renderMore = {
                    "data": function () {
                        _this.renderData(getProject);
                    },
                    "info": function () {
                        _this.renderInfo(getProject);
                    },
                };

                renderMore[_GET('more')]();
            }

            $('.index_page_body_data').append(this.global_block);
        }
    }

    if(!global.Components)
    {
        global.Components = {
            auth_block,
            projects,
            block,
        }
    }

}(window))