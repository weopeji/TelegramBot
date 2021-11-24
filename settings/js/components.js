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

                var _date = element.data.collection_period.split('-');
                
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
                                <span>На срок</span><p>${_date[2]}.${_date[1]}.${_date[0]}</p>
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

                item_block.find('.index_page_body_hrefs a').eq(0).css('color', "#32B3F9");
                item_block.find('.index_page_body_hrefs a').eq(1).css('color', "#10C760");
                item_block.find('.index_page_body_hrefs a').eq(2).css('color', "#6F62E5");

                this.global_block.append(item_block);
            });

            $('.index_page_body_data').append(this.global_block);

            $('.index_page_body_moderation_block').click( function () {
                location.href = `/settings/?page=block&id=${$(this).attr('data')}&more=data`;
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
                "active": async function() {
                    var getModerations = await callApi({
                        methodName: "getActive",
                        data: null,
                    });

                    return getModerations;
                },
            }

            this.getBlocks(await typeRender[type](), type)
        }
    }

    class block
    {
        constructor() {
            this.global_block = $(`
                <div class="global_block"></div>
            `);
        };

        accept(_id) 
        {
            callApi({
                methodName: 'acceptProject',
                data: _id,
            }).then((data) => {
                return data; 
            });
        }

        async render_header(_project)
        {
            var _this = this;

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

            header_info.find('.global_block_header_accept_button').click( function () {
                _this.accept(_project._id);
                alert('Успешно!');
                location.reload();
            });

            header_menu.find('span').click( function () {
                location.href = `/settings/?page=block&id=${_project._id}&more=${$(this).attr('data')}`;
            });

            if(_GET('more'))
            {
                header_menu.find(`span[data="${_GET('more')}"]`).addClass('selected');
            }

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

            var firstBlockMore = $(`
                <div class="body_point">
                    <div class="body_point_header">
                        <span>Редактирование выплат</span>
                    </div>
                    <div class="body_point_line_block_more">
                        <div class="body_point_line body_point_line_first" data="investings_pay">
                            <span>Комиссия от привлеченных средств:</span>
                            <p>25</p>
                        </div>
                        <div class="body_point_line body_point_line_input" data="investings_pay_input">
                            <textarea rows="1" id="investings_pay_textarea" class="text_area"></textarea>
                            <span class="body_point_line_input_close">
                                <i class="fal fa-minus-square"></i>
                            </span>
                            <span class="body_point_line_input_accept">
                                <i class="fal fa-check-square"></i>
                            </span>
                        </div>
                    </div>
                    <div class="body_point_line_block_more">
                        <div class="body_point_line body_point_line_first" data="investings_pay">
                            <span>Процент доли компании:</span>
                            <p>5</p>
                        </div>
                        <div class="body_point_line body_point_line_input" data="investings_pay_input">
                            <textarea rows="1" id="investings_pay_textarea" class="text_area"></textarea>
                            <span class="body_point_line_input_close">
                                <i class="fal fa-minus-square"></i>
                            </span>
                            <span class="body_point_line_input_accept">
                                <i class="fal fa-check-square"></i>
                            </span>
                        </div>
                    </div>
                    <div class="body_point_line_block_more">
                        <div class="body_point_line body_point_line_first" data="investings_pay">
                            <span>Процент Отчисления за привлечение:</span>
                            <p>50</p>
                        </div>
                        <div class="body_point_line body_point_line_input" data="investings_pay_input">
                            <textarea rows="1" id="investings_pay_textarea" class="text_area"></textarea>
                            <span class="body_point_line_input_close">
                                <i class="fal fa-minus-square"></i>
                            </span>
                            <span class="body_point_line_input_accept">
                                <i class="fal fa-check-square"></i>
                            </span>
                        </div>
                    </div>
                    <div class="body_point_line_block_more">
                        <div class="body_point_line body_point_line_first" data="investings_pay">
                            <span>За привлечение инвесторов:</span>
                            <p>70</p>
                        </div>
                        <div class="body_point_line body_point_line_input" data="investings_pay_input">
                            <textarea rows="1" id="investings_pay_textarea" class="text_area"></textarea>
                            <span class="body_point_line_input_close">
                                <i class="fal fa-minus-square"></i>
                            </span>
                            <span class="body_point_line_input_accept">
                                <i class="fal fa-check-square"></i>
                            </span>
                        </div>
                    </div>
                    <div class="body_point_line_block_more">
                        <div class="body_point_line body_point_line_first" data="investings_pay">
                            <span>За привлечение бизнеса:</span>
                            <p>30</p>
                        </div>
                        <div class="body_point_line body_point_line_input" data="investings_pay_input">
                            <textarea rows="1" id="investings_pay_textarea" class="text_area"></textarea>
                            <span class="body_point_line_input_close">
                                <i class="fal fa-minus-square"></i>
                            </span>
                            <span class="body_point_line_input_accept">
                                <i class="fal fa-check-square"></i>
                            </span>
                        </div>
                    </div>
                </div>
            `);

            firstBlockMore.css("padding-bottom", "20px");

            firstBlockMore.find('.body_point_line_first').click( function () {
                $(this).fadeOut( function() {
                    $(this).parent().find(".body_point_line_input").css("display", "flex");
                });
            })

            firstBlockMore.find(".body_point_line_input_close").click( function() {
                $(this).parent().fadeOut( function() 
                {
                    $(this).parent().parent().find(".body_point_line_first").fadeIn();
                });
            })

            firstBlockMore.find(".body_point_line_input_accept").click( function() {
                $(this).parent().fadeOut( function() 
                {
                    var _text = $(this).parent().find("textarea").val();
                    $(this).parent().parent().find(".body_point_line_first p").html(_text);

                    $(this).parent().parent().find(".body_point_line_first").fadeIn();
                });
            })

            this.global_block.append(firstBlockMore);

            var string      = function (element, _project)
            {

                var moreBlock  = {
                    "string": function() {
                        return `<p>${_project.data[element._id]}</p>`;
                    },
                    "file": function() {
                        var file_block = `
                            <div class="body_point_line_file_show">
                                <span>Посмотреть</span>
                            </div>
                        `;

                        return file_block;
                    },
                };

                var _line = $(`
                    <div class="body_point_line_block_more">
                        <div class="body_point_line body_point_line_first" data="${element._id}">
                            <span>${element.name}:</span>
                            ${moreBlock[element.type]()}
                        </div>
                        <div class="body_point_line body_point_line_input" data="${element._id}_input">
                            <textarea rows="1" id="${element._id}_textarea" class="text_area"></textarea>
                            <div class="body_point_line_input_buttons">
                                <span class="body_point_line_input_close">
                                    <i class="fal fa-minus-square"></i>
                                </span>
                                <span class="body_point_line_input_accept">
                                    <i class="fal fa-check-square"></i>
                                </span>
                            </div>
                        </div>
                    </div>
                `);
 
                _line.find(".body_point_line_input_close").click( function() {
                    $(this).parent().parent().fadeOut( function() 
                    {
                        $(this).parent().find(".body_point_line_first").fadeIn();
                    });
                })

                _line.find(".body_point_line_input_accept").click( function() {
                    $(this).parent().parent().fadeOut( function() 
                    {
                        var _text = $(this).parent().find("textarea").val();
                        $(this).parent().find(".body_point_line_first p").html(_text);

                        $(this).parent().find(".body_point_line_first").fadeIn();
                    });
                })



                if(element.type == "string") {
                    _line.find(".body_point_line_first").click( function() {
                        $(this).fadeOut( function() {
                            $(this).parent().find(".body_point_line_input").css("display", "flex");
                        });
                    })
                } else {
                    var _url = getURL() + "/projects/" + _project._id + "/" + _project.data[element._id];
                    _line.find(".body_point_line_first").click( function() {
                        location.href = _url;
                    })
                }

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
                            _body.append(string(element, _project), );
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
                        <textarea id="${key}_textarea" class="text_area text_area_redacting" rows="1"></textarea>
                    </div>
                `);
                
                this.global_block.append(_body);
            }

            var not_accept = 
            $(`
                <div class="not_accept_block_button">
                    <span>Отправить на доработку</span>
                </div>
            `);

            var _this = this;

            not_accept.click( function () 
            {
                var _array = [];

                $('.body_point').each(function(i,elem) 
                {
                    var _input = $(elem).find('.text_area_redacting').val();
                    
                    if(_input.length > 0)
                    {
                        _array.push({
                            type: $(elem).find('textarea').attr('id').split('_')[0],
                            value: $(elem).find('textarea').val(),
                        })
                    }
                   
                })

                _this.not_accept({
                    _id: _GET('id'),
                    data: _array,
                });

                alert('Проект отправленн на исправление!');
                
                location.reload();
            })

            this.global_block.append(not_accept);
        }

        not_accept(data) {
            callApi({
                methodName: 'not_acceptProject',
                data: data,
            }).then((data) => {
                return data; 
            });
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

        getNewDataProjects(_eq, _id) {
            return callApi({
                methodName: 'getNewDataProjects',
                data: {
                    data: _eq,
                    _id: _id,
                },
            }).then((data) => {
                return data; 
            });
        }

        setSignatureFile(_id, _form) {
            var _url = `${getURL()}/file_urist.io/files`;

            var _file = _form;

            axios.post(_url, _file, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
        }

        dellSignatureFile(projectId)
        {
            return callApi({
                methodName: 'dellSignatureFile',
                data: projectId,
            }).then((data) => {
                return data; 
            });
        }

        async renderMore(_project)
        {
            var signature = {
                "1": {
                    "+1_s": {
                        header: "Загрузите не достающие документы",
                        body: [
                            {
                                type: "file",
                                name: `Устав`,
                                _id: "file+1_s"
                            },
                            {
                                type: "file",
                                name: `Решение об избрании руководителя`,
                                _id: "file+2_s"
                            },
                            {
                                type: "file",
                                name: `Приказ о назначении руководителя`,
                                _id: "file+3_s"
                            },
                            {
                                type: "file",
                                name: `Свидетельство ИНН`,
                                _id: "file+4_s"
                            },
                            {
                                type: "file",
                                name: `ОГРН`,
                                _id: "file+5_s"
                            },
                            {
                                type: "file",
                                name: `Карточка с банковскими реквизитами`,
                                _id: "file+6_s"
                            },
                            {
                                type: "file",
                                name: `Бух.отчетность за последний год`,
                                _id: "file+7_s"
                            },
                        ]
                    },
                },
                "2": {
                    "+1_s": {
                        header: "Загрузите не достающие документы",
                        body: [
                            {
                                type: "file",
                                name: `Устав`,
                                _id: "file+1_s"
                            },
                            {
                                type: "file",
                                name: `Решение об избрании руководителя`,
                                _id: "file+2_s"
                            },
                            {
                                type: "file",
                                name: `Приказ о назначении руководителя`,
                                _id: "file+3_s"
                            },
                            {
                                type: "file",
                                name: `Свидетельство ИНН`,
                                _id: "file+4_s"
                            },
                            {
                                type: "file",
                                name: `ОГРН`,
                                _id: "file+5_s"
                            },
                            {
                                type: "file",
                                name: `Карточка с банковскими реквизитами`,
                                _id: "file+6_s"
                            },
                            {
                                type: "file",
                                name: `Бух.отчетность за последний год`,
                                _id: "file+7_s"
                            },
                            {
                                type: "file",
                                name: `Выписку из ЕГРН на недвижимость (+свидетельство о собственности, если есть)`,
                                _id: "file+8_s"
                            },
                            {
                                type: "file",
                                name: `Предоставляемую в залог`,
                                _id: "file+9_s"
                            },
                            {
                                type: "file",
                                name: `Договор купли-продажи недвижимости (основание приобретение недвижимости)`,
                                _id: "file+10_s"
                            },
                            {
                                type: "file",
                                name: `Cогласие супруга на залог`,
                                _id: "file+11_s"
                            },
                        ]
                    }
                },
                "3": {
                    "+1_s": {
                        header: "Загрузите не достающие документы",
                        body: [
                            {
                                type: "file",
                                name: `Устав`,
                                _id: "file+1_s"
                            },
                            {
                                type: "file",
                                name: `Решение об избрании руководителя`,
                                _id: "file+2_s"
                            },
                            {
                                type: "file",
                                name: `Приказ о назначении руководителя`,
                                _id: "file+3_s"
                            },
                            {
                                type: "file",
                                name: `Свидетельство ИНН`,
                                _id: "file+4_s"
                            },
                            {
                                type: "file",
                                name: `ОГРН`,
                                _id: "file+5_s"
                            },
                            {
                                type: "file",
                                name: `Карточка с банковскими реквизитами`,
                                _id: "file+6_s"
                            },
                            {
                                type: "file",
                                name: `Бух.отчетность за последний год`,
                                _id: "file+7_s"
                            },
                            {
                                type: "file",
                                name: `Паспорт поручителя`,
                                _id: "file+8_s"
                            },
                            {
                                type: "file",
                                name: `Cогласие поручителя на обработку персональных данных`,
                                _id: "file+9_s"
                            },
                        ]
                    },
                },
                "4": {
                    "+1_s": {
                        header: "Загрузите не достающие документы",
                        body: [
                            {
                                type: "file",
                                name: `Устав`,
                                _id: "file+1_s"
                            },
                            {
                                type: "file",
                                name: `Решение об избрании руководителя`,
                                _id: "file+2_s"
                            },
                            {
                                type: "file",
                                name: `Приказ о назначении руководителя`,
                                _id: "file+3_s"
                            },
                            {
                                type: "file",
                                name: `Свидетельство ИНН`,
                                _id: "file+4_s"
                            },
                            {
                                type: "file",
                                name: `ОГРН`,
                                _id: "file+5_s"
                            },
                            {
                                type: "file",
                                name: `Карточка с банковскими реквизитами`,
                                _id: "file+6_s"
                            },
                            {
                                type: "file",
                                name: `Бух.отчетность за последний год`,
                                _id: "file+7_s"
                            },
                            {
                                type: "file",
                                name: `Паспорт поручителя`,
                                _id: "file+8_s"
                            },
                            {
                                type: "file",
                                name: `Согласие супруга на купли-продажу доли`,
                                _id: "file+9_s"
                            },
                        ]
                    },
                },
                "5": {
                    "+1_s": {
                        header: "Загрузите не достающие документы",
                        body: [
                            {
                                type: "file",
                                name: `Устав`,
                                _id: "file+1_s"
                            },
                            {
                                type: "file",
                                name: `Решение об избрании руководителя`,
                                _id: "file+2_s"
                            },
                            {
                                type: "file",
                                name: `Приказ о назначении руководителя`,
                                _id: "file+3_s"
                            },
                            {
                                type: "file",
                                name: `Свидетельство ИНН`,
                                _id: "file+4_s"
                            },
                            {
                                type: "file",
                                name: `ОГРН`,
                                _id: "file+5_s"
                            },
                            {
                                type: "file",
                                name: `Карточка с банковскими реквизитами`,
                                _id: "file+6_s"
                            },
                            {
                                type: "file",
                                name: `Бух.отчетность за последний год`,
                                _id: "file+7_s"
                            },
                            {
                                type: "file",
                                name: `Выписку из ЕГРН на недвижимость (+свидетельство о собственности, если есть), предоставляемую в залог`,
                                _id: "file+8_s"
                            },
                            {
                                type: "file",
                                name: `Договор купли-продажи недвижимости (основание приобретение недвижимости)`,
                                _id: "file+9_s"
                            },
                            {
                                type: "file",
                                name: `Согласие супруга на залог доли`,
                                _id: "file+10_s"
                            },
                        ]
                    },
                },
                "6": {
                    "+1_s": {
                        header: "Загрузите не достающие документы",
                        body: [
                            {
                                type: "file",
                                name: `Устав`,
                                _id: "file+1_s"
                            },
                            {
                                type: "file",
                                name: `Решение об избрании руководителя`,
                                _id: "file+2_s"
                            },
                            {
                                type: "file",
                                name: `Приказ о назначении руководителя`,
                                _id: "file+3_s"
                            },
                            {
                                type: "file",
                                name: `Свидетельство ИНН`,
                                _id: "file+4_s"
                            },
                            {
                                type: "file",
                                name: `ОГРН`,
                                _id: "file+5_s"
                            },
                            {
                                type: "file",
                                name: `Карточка с банковскими реквизитами`,
                                _id: "file+6_s"
                            },
                            {
                                type: "file",
                                name: `Бух.отчетность за последний год`,
                                _id: "file+7_s"
                            },
                            {
                                type: "file",
                                name: `Выписку из ЕГРН на недвижимость (+свидетельство о собственности, если есть), предоставляемую в залог`,
                                _id: "file+8_s"
                            },
                            {
                                type: "file",
                                name: `Договор купли-продажи недвижимости (основание приобретение недвижимости)`,
                                _id: "file+9_s"
                            },
                            {
                                type: "file",
                                name: `Согласие супруга на залог доли`,
                                _id: "file+10_s"
                            },
                        ]
                    }
                },
            };

            var _this = this;

            if(_project.signature) 
            {
                var _lenth = Object.keys(_project.signature).length;

                if(_lenth > 1)
                {
                    var putDocumentToSignature = $(`
                        <!-- <div class="body_point putDocumentToSignature_doc">
                            <div class="body_point_header">
                                <span>Загрузите документ на подписание</span>
                            </div>
                        </div>
                        <div class="putDocumentToSignature">
                            <input type="file" name="" id="DocumentToSignature">
                            <label for="DocumentToSignature" class="putDocumentToSignature_open">
                                <span>Загрузить документ</span>
                            </label>
                        </div> -->

                        <div class="Attracted_headerInfoBlock">
                            <input type="file" name="" id="DocumentToSignature">
                            <div class="Attracted_headerInfoBlock_block" data="loader">
                                <div class="Attracted_headerInfoBlock_block_i">
                                    <i class="fad fa-file-download"></i>
                                </div>
                                <div class="Attracted_headerInfoBlock_block_text">
                                    <span>Загрузите документ на подписание</span>
                                    <p>Загрузить документ</p>
                                </div>
                            </div>
                            <div class="Attracted_headerInfoBlock_block" data="dell">
                                <div class="Attracted_headerInfoBlock_block_i">
                                    <i class="fad fa-times-circle"></i>
                                </div>
                                <div class="Attracted_headerInfoBlock_block_text">
                                    <span>Действие с документом</span>
                                    <p>Недоступно</p>
                                </div>
                            </div>
                        </div>
                    `);

                    putDocumentToSignature.find('input[type=file]').change( async function() 
                    {
                        var filename = $(this.files)[0].name;
                        var aux = filename.split('.');
                        var extension = aux[aux.length -1].toUpperCase();

                        if(extension === 'DOC'
                            || extension === 'DOCX'
                            ){
                            
                            var _form    = new FormData();

                            _form.append('files', $(this.files)[0]);
                            _form.append('_id', _project._id);
                            _form.append('_pts', extension);
                            _this.setSignatureFile(_project._id, _form);

                            alert('Успешно!');
                            location.reload();
                        }else{
                            alert('Invalid extension: ' + extension + '. Only: DOC, DOCX are allowed.');
                        }  
                    });

                    this.global_block.append(putDocumentToSignature);

                    if(_project.signature_document) {
                        if(_project.signature_document.status == 'on') {
                            this.global_block.find('.Attracted_headerInfoBlock_block[data="loader"]').find('span').html('Документ подписан бизнесом');
                            this.global_block.find('.Attracted_headerInfoBlock_block[data="loader"]').find('p').html(`Посмотреть`);
                            this.global_block.find('.Attracted_headerInfoBlock_block[data="loader"]').click( function() {
                                window.open(`https://invester-relocation.site/html/project/document/#${_project._id}`, '_blank');
                            })
                        } else {
                            this.global_block.find('.Attracted_headerInfoBlock_block[data="loader"]').find('span').html('Документ отправлен бизнесу');
                            this.global_block.find('.Attracted_headerInfoBlock_block[data="loader"]').find('p').html(`Посмотреть`);
                            this.global_block.find('.Attracted_headerInfoBlock_block[data="loader"]').click( function() {
                                window.open(`https://invester-relocation.site/html/project/document/#${_project._id}`, '_blank');
                            })
                            this.global_block.find('.Attracted_headerInfoBlock_block[data="dell"]').find('p').html(`Удалить документ`);
                            this.global_block.find('.Attracted_headerInfoBlock_block[data="dell"]').click( function() {
                                _this.dellSignatureFile(_project._id);
                                alert("Успешно");
                                location.reload();
                            })
                        }
                    } else {
                        this.global_block.find('.Attracted_headerInfoBlock_block[data="loader"]').click( function() {
                            $('#DocumentToSignature').trigger('click');
                        })
                    }

                    var _header = $(`<div class="body_point"></div>`);

                    var headerButton = $(`
                        <div class="body_point_header get_new_data">
                            <span>Полученные данные</span>
                        </div>
                    `);

                    _header.append(headerButton);
                    
                    var _type = _project.signature.type;

                    for(var key in signature) 
                    {
                        if(key == _type) {
                            signature[key]['+1_s'].body.forEach(element => {
                                var _file = `
                                    <div class="download_buttons">
                                        <a target="_blank" href="${getURL()}/projects/${_project._id}/${_project.signature.data[element._id]}">Посмотреть <i class='fas fa-download'></i></a>
                                    </div>  
                                `;
                                var _line = $(`
                                    <div class="body_point_line _file">
                                        <div class="body_point_line_header">
                                            <div class="body_point_line_header_text">
                                                <span>${element.name}</span>
                                                ${_file}
                                            </div>
                                            <div class="body_point_line_header_info">

                                            </div>
                                        </div>
                                    </div>
                                `);

                                _header.append(_line);
                            }) 
                        }
                    }

                    this.global_block.append(_header);

                    if(_project.signature_document) {
                        if(_project.signature_document.status == 'on') {
                            $('.putDocumentToSignature').find('p').html('Документ подписан бизнесом');
                            $('.putDocumentToSignature').find('label').remove();
                            $('.putDocumentToSignature').append(`
                                <div class="putDocumentToSignature_show">
                                    <span>Посмотреть</span>
                                </div>
                            `);
                            $('.putDocumentToSignature_show').click( function() {
                                window.open(`https://skin-win.ru/html/project/document/#${_project._id}`, '_blank');
                            })
                        }
                    }
                }
                
            };

            var templateText = $(`
                <div class="index_page_body_project_body_type">
                    <span class="selected" data="1">Займ</span>
                    <span data="2">Займ с залогом</span>
                    <span data="3">Займ с поручительством</span>
                    <span data="4">Доля в ООО</span>
                    <span data="5">Займ с залогом доли в ООО</span>
                    <span data="6">Доля в объекте недвижимости</span>
                </div>
                <div class="index_page_more_menu_blocks">
                    <h1>Получаемые данные</h1>
                    <div class="index_page_more_menu_blocks_need">
                        <p>
                            1. Устав <br>
                            2. Решение об избрании руководителя <br>
                            3. Приказ о назначении руководителя <br>
                            4. Свидетельство ИНН <br>
                            5. ОГРН <br>
                            6. Карточка с банковскими реквизитами <br>
                            7. Бух.отчетность за последний год <br>
                        </p>
                    </div>
                </div>
                <div class="index_page_more_menu_buttons">
                    <span class="get_new_data">Получить данные</span>
                </div>
            `);

            templateText.find('.get_new_data').click( function() {
                _this.getNewDataProjects($('.index_page_body_project_body_type').find('span.selected').attr('data'), _project._id);
                alert('Успешно!');
                location.reload();
            });

            var _doc = 
            {
                _append: function(data) 
                {
                    $('.index_page_more_menu_blocks_need').append(`<p>${data}</p>`)
                },
                "1": function() 
                {
                    var text = `
                    1. Устав <br>
                    2. Решение об избрании руководителя <br>
                    3. Приказ о назначении руководителя <br>
                    4. Свидетельство ИНН <br>
                    5. ОГРН <br>
                    6. Карточка с банковскими реквизитами <br>
                    7. Бух.отчетность за последний год <br>
                    `;
                    this._append(text);
                },
                "2": function() {
                    var text = `
                    1. Устав <br>
                    2. Решение об избрании руководителя <br>
                    3. Приказ о назначении руководителя <br>
                    4. Свидетельство ИНН <br>
                    5. ОГРН <br>
                    6. Карточка с банковскими реквизитами <br>
                    7. Бух.отчетность за последний год <br>
                    8. Выписку из ЕГРН на недвижимость (+свидетельство о собственности, если есть) <br>
                    9. Предоставляемую в залог <br>
                    10. Договор купли-продажи недвижимости (основание приобретение недвижимости) <br>
                    11. Cогласие супруга на залог <br>
                    `;
                    this._append(text);
                },
                "3": function() 
                {
                    var text = `
                    1. Устав <br>
                    2. Решение об избрании руководителя <br>
                    3. Приказ о назначении руководителя <br>
                    4. Свидетельство ИНН <br>
                    5. ОГРН <br>
                    6. Карточка с банковскими реквизитами <br>
                    7. Бух.отчетность за последний год <br>
                    8. Паспорт поручителя <br>
                    9. Cогласие поручителя на обработку персональных данных <br>
                    `;
                    this._append(text);
                },
                "4": function() 
                {
                    var text = `
                    1. Устав <br>
                    2. Решение об избрании руководителя <br>
                    3. Приказ о назначении руководителя <br>
                    4. Свидетельство ИНН <br>
                    5. ОГРН <br>
                    6. Карточка с банковскими реквизитами <br>
                    7. Бух.отчетность за последний год <br>
                    8. Паспорт поручителя <br>
                    9. Согласие супруга на купли-продажу доли <br>
                    `;
                    this._append(text);
                },
                "5": function() 
                {
                    var text = `
                    1. Устав <br>
                    2. Решение об избрании руководителя <br>
                    3. Приказ о назначении руководителя <br>
                    4. Свидетельство ИНН <br>
                    5. ОГРН <br>
                    6. Карточка с банковскими реквизитами <br>
                    7. Бух.отчетность за последний год <br>
                    8. Выписку из ЕГРН на недвижимость (+свидетельство о собственности, если есть), предоставляемую в залог <br>
                    9. Договор купли-продажи недвижимости (основание приобретение недвижимости) <br>
                    10. Согласие супруга на залог доли <br>
                    `;
                    this._append(text);
                },
                "6": function() 
                {
                    var text = `
                    1. Устав <br>
                    2. Решение об избрании руководителя <br>
                    3. Приказ о назначении руководителя <br>
                    4. Свидетельство ИНН <br>
                    5. ОГРН <br>
                    6. Карточка с банковскими реквизитами <br>
                    7. Бух.отчетность за последний год <br>
                    8. Выписку из ЕГРН на недвижимость (+свидетельство о собственности, если есть), предоставляемую в залог <br>
                    9. Договор купли-продажи недвижимости (основание приобретение недвижимости) <br>
                    10. Согласие супруга на залог доли <br>
                    `;
                    this._append(text);
                },
            }

            templateText.eq(0).find('span').click( function() {
                $('.index_page_body_project_body_type span').removeClass('selected');
                $(this).addClass('selected');

                $('.index_page_more_menu_blocks_need').empty();
                _doc[$(this).attr('data')]();
            })

            this.global_block.append(templateText);
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
                    "more": function () {
                        _this.renderMore(getProject);
                    }
                };

                renderMore[_GET('more')]();
            }

            $('.index_page_body_data').append(this.global_block);
        }
    }

    class all_users
    {
        constructor() {};

        async render()
        {
            var allUsers = await callApi({
                methodName: "allUsers",
                data: null,
            });

            var templateText = $(`
                <div class="settingBlock">
                    <div class="settingBlock_header">
                        <p>Пользавтели (Нажмите на пользователя чтобы просмотреть его кабинет)</p>
                        <div class="settingBlock_header_line">
                            <span>#</span>
                            <span>ID Инвестора</span>
                            <span>ФИО</span>
                            <span>Тип</span>
                        </div>
                    </div>
                    <div class="settingBlock_body">
                       
                    </div>
                </div>
            `);

            allUsers.forEach( function (user, i) {
                var userLine = $(`
                    <div class="settingBlock_body_line" data="${user._id}" data-more="41">
                        <span>${i + 1}</span>
                        <span>${user.user}</span>
                        <span>${user.first_name + " " + user.last_name}</span>
                        <span>${user.type}</span>
                    </div>
                `);

                templateText.find('.settingBlock_body').append(userLine);
            })

            $('.index_page_body_data').append(templateText);

            $('.settingBlock_body_line').click(async function() {
                var _id = $(this).attr('data');
                // var getUserID = await callApi({
                //     methodName: "getUserID",
                //     data: _id,
                // });
                location.href = `/?user=${_id}`;
            })
        }
    }

    class investings
    {
        constructor() {};

        async render()
        {
            var allInvestings = await callApi({
                methodName: "allInvestings",
                data: null,
            });

            var templateText = $(`
                <div class="settingBlock">
                    <div class="settingBlock_header">
                        <p>Пользавтели</p>
                        <div class="settingBlock_header_line">
                            <span>#</span>
                            <span>ID Инвестора</span>
                            <span>ID Проекта</span>
                            <span>Сумма</span>
                        </div>
                    </div>
                    <div class="settingBlock_body">
                       
                    </div>
                </div>
            `);

            allInvestings.forEach( function (user, i) {
                var userLine = $(`
                    <div class="settingBlock_body_line" data="1062688870" data-more="41">
                        <span>${i + 1}</span>
                        <span>${user.invester}</span>
                        <span>${user.projectId}</span>
                        <span>${user.data.pay} руб</span>
                    </div>
                `);

                templateText.find('.settingBlock_body').append(userLine);
            })

            $('.index_page_body_data').append(templateText);
        }
    }

    class pays_business
    {
        constructor() {};

        async render()
        {
            var bPays = await callApi({
                methodName: "bPays",
                data: null,
            });

            var templateText = $(`
                <div class="settingBlock">
                    <div class="settingBlock_header">
                        <p>Выплаты от бизнеса</p>
                        <div class="settingBlock_header_line">
                            <span>#</span>
                            <span>ID Проекта</span>
                            <span>Сумма</span>
                            <span>Чек</span>
                        </div>
                    </div>
                    <div class="settingBlock_body">
                       
                    </div>
                </div>
            `);

            bPays.forEach( function (el, i) {
                var userLine = $(`
                    <div class="settingBlock_body_line" data="1062688870" data-more="41">
                        <span>${i + 1}</span>
                        <span>${el.projectId}</span>
                        <span>${el.pay}</span>
                        <span>Посмотреть чек</span>
                    </div>
                `);

                templateText.find('.settingBlock_body').append(userLine);
            })

            $('.index_page_body_data').append(templateText);
        }
    }

    class pays_attract
    {
        constructor() {};

        async render()
        {
            var templateText = $(`
                <div class="settingBlock">
                    <div class="settingBlock_header">
                        <p>Запрошенные выплаты</p>
                        <div class="settingBlock_header_line">
                            <span>#</span>
                            <span>ID</span>
                            <span>Сумма выплаты</span>
                            <span>Статус самозанятого</span>
                            <span>Чек</span>
                        </div>
                    </div>
                    <div class="settingBlock_body">
                       
                    </div>
                </div>
            `);

            templateText.css('margin-bottom', '20px');

            $('.index_page_body_data').append(templateText);

            var bPays = await callApi({
                methodName: "toAttractPay",
                data: null,
            });

            console.log(bPays);

            var templateText = $(`
                <div class="settingBlock">
                    <div class="settingBlock_header">
                        <p>Выплаты ожидающие подтверждения</p>
                        <div class="settingBlock_header_line">
                            <span>#</span>
                            <span>ID</span>
                            <span>Сумма выплаты</span>
                            <span>Статус самозанятого</span>
                        </div>
                    </div>
                    <div class="settingBlock_body">
                       
                    </div>
                </div>
            `);

            bPays.forEach( function (el, i) {

                el.AM_data_fun.forEach(el2 => {
                    var userLine = $(`
                        <div class="settingBlock_body_line" data="1062688870" data-more="41">
                            <span>${i + 1}</span>
                            <span>${el.AM_data.user}</span>
                            <span>${el2.YouPay}</span>
                            <span>
                                <i class="fad fa-check-circle"></i>
                            </span>
                        </div>
                    `);

                    userLine.find('i').css('color', "#28BA32");

                    templateText.find('.settingBlock_body').append(userLine);
                })
                
            })

            $('.index_page_body_data').append(templateText);
        }
    }

    if(!global.Components)
    {
        global.Components = {
            auth_block,
            projects,
            block,
            all_users,
            investings,
            pays_business,
            pays_attract,
        }
    }

}(window))