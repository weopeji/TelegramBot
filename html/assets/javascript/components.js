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
                                    <span>СРОК ИНВЕСТИРОВАНИЯ</span>
                                    <p>${element.data.date} мес.</p>
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
                            <a target="_blank" href="${getURL()}/html/project/profil/#${element._id}">Профиль компании</a>
                            <a target="_blank" href="${getURL()}/projects/${element._id}/${element.data["file+7"]}">Презентация</a>
                            <a target="_blank" href="${getURL()}/projects/${element._id}/${element.data["file+8"]}">Видео-презентация</a>
                        </div>
                    </div>
                `;
                this.$component.append(templateText);
            });

            return this.$component;
        }

        async render_mini() 
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

                        <h1>${element.data.name} № ${element._id}</h1>
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
                            <a target="_blank" href="${getURL()}/html/project/profil/#${element._id}">Профиль компании</a>
                            <a target="_blank" href="${getURL()}/projects/${element._id}/${element.data["file+7"]}">Презентация</a>
                            <a target="_blank" href="${getURL()}/projects/${element._id}/${element.data["file+8"]}">Видео-презентация</a>
                        </div>
                    </div>
                `;
                this.$component.append(templateText);
            });

            return this.$component;
        }

    }

    class correction {

        constructor() {

            this.$component = $(`
                <div class="index_page_body_moderation">

                </div>
            `);

            this.header = $(`
                <div class="index_page_body_moderation_search">
                    <h1>Проекты ожидающие исправления</h1>
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

        getСorrectionBlocks() {
            return callApi({
                methodName: 'getСorrection',
            }).then((data) => {
                return data; 
            });
        }

        async render() 
        {
            this.$component.empty();
            this.$component.append(this.header);
            var _moderations = await this.getСorrectionBlocks();
            _moderations.forEach(element => {
                var templateText = `
                    <div class="index_page_body_moderation_block">

                        <h1>${element.data.name}</h1>
                        <p>${element.data.target}</p>
                        <div class="index_page_body_moderation_block_info_line">
                            <div class="index_page_body_moderation_block_info_line_row">
                                <span>№ ${element._id}</span><a>На исправлении</a>
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
                            <a target="_blank" href="${getURL()}/html/project/profil/#${element._id}">Профиль компании</a>
                            <a target="_blank" href="${getURL()}/projects/${element._id}/${element.data["file+7"]}">Презентация</a>
                            <a target="_blank" href="${getURL()}/projects/${element._id}/${element.data["file+8"]}">Видео-презентация</a>
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
            };

            this.signature = {
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

        setSignatureFile(_id, _file) {
            return callApi({
                methodName: 'setSignatureFile',
                data: {
                    file: _file,
                    _id: _id,
                },
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
                            <span>${data.name}:</span>
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
                    <a target="_blank" href="${getURL()}/projects/${_project._id}/${_project.data[data._id]}">Посмотреть <i class='fas fa-download'></i></a>
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

        showProjectData(_project) 
        {
            var param = _project.data.organization;

            $('.index_page_body_row').append('<div class="index_page_body_project_data"></div>');

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

                _body.append(`
                    <div class="wrapper_block">
                        <div class="wrapper">
                            <input type="checkbox" class="checkbox_true" id="${key}_checkbox" />
                            <label for="${key}_checkbox"></label>
                        </div>
                    </div>
                `);

                _body.append(`<textarea id="${key}_textarea" class="text_area" rows="1"></textarea>`);
                
                $('.index_page_body_project_data').append(_body);
            } 

            $('.index_page_body_row').append(`
                <div class="index_page_profil">
                    <div class="index_page_profil_header">
                        <span class="selected">Профиль для инвестора</span>
                        <span>Полный профиль</span>
                    </div>
                    <iframe id="profil" src="./html/project/profil#${_project._id}" frameborder="0"></iframe>
                </div>
            `);

            var _iframe = $('#profil');
            _iframe.on('load', function () {
                var _content = _iframe.contents();
                var _height = _content.find('.index_page_profil')[0];
                _iframe.css('height', '1934px');
                _content.find('.index_page_profil').css({
                    'width': '100%',
                    'margin': 0,
                });
                _content.find('body').css('width', '100%');
            });


            // index_page_more_menu ======================================================

            $('.index_page_body_row').append('<div class="index_page_more_menu"></div>');

            if(_project.signature) 
            {
                var _lenth = Object.keys(_project.signature).length;

                if(_lenth > 1) 
                {
                    var putDocumentToSignature = $(`
                        <div class="putDocumentToSignature">
                            <input type="file" name="" id="DocumentToSignature">
                            <label for="DocumentToSignature" class="putDocumentToSignature_open">
                                <span>Загрузить документ</span>
                            </label>
                        </div>
                    `);

                    var _this = this;

                    putDocumentToSignature.find('input[type=file]').change( async function() 
                    {
                        let Data = {};

                        $(this.files).each(function(index, file) {
                            Data.files = file;
                            Data._id = _project._id;
                            Data._pts = file.type;
                        });

                        _this.setSignatureFile(_project._id, Data);

                        $('.index_page_body_row').empty();
                    });


                    $('.index_page_more_menu').append(putDocumentToSignature);

                    var _header = $(`<div class="body_point"></div>`);
                    _header.append(`
                        <div class="body_point_header">
                            <span>Полученные данные</span>
                        </div>
                    `);
                    
                    var _type = _project.signature.type;

                    for(var key in this.signature) 
                    {
                        if(key == _type) {
                            this.signature[key]['+1_s'].body.forEach(element => {
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

                    _header.css({
                        'margin-bottom': '50px',
                        'width': '100%',
                    });

                    $('.index_page_more_menu').append(_header);
                }
            };

            if(_project.signature_document) {
                if(_project.signature_document.status == 'on') {
                    $('.index_page_more_menu').empty();
                    $('.index_page_more_menu').append('<h1>Документ подписан</h1>')
                }
            }

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
                    <div class="index_page_more_menu_blocks_need"></div>
                </div>
                <div class="index_page_more_menu_buttons">
                    <span class="get_new_data">Получить данные</span>
                </div>
            `);

            $('.index_page_more_menu').append(templateText);

            var _this = this;
            $('.get_new_data').click( function() {
                _this.getNewDataProjects($('.index_page_body_project_body_type').find('span.selected').attr('data'), _project._id);
                $('.index_page_body_row').children().fadeOut('fast');
            });
            

        }

        redactingInfoProject(_projectBlock, _project) 
        {
            var _this = this;
            $('.index_page_body_project_data').remove();
            $('.info_block').remove();
            _this.showProjectData(_project);
            _projectBlock.find('.index_page_body_project_body_header span').click( function() {
                $('.index_page_body_project_body_header span').removeClass('selected');
                $(this).addClass('selected');
                var _data = $(this).attr('data');
                if(_data == "2") {
                    $('.index_page_body_project_data').css('display', 'none');
                    $('.index_page_profil').css('display', "block");
                    $('.index_page_more_menu').css('display', 'none');
                } 
                if(_data == "1") {
                    $('.index_page_body_project_data').css('display', 'block');
                    $('.index_page_profil').css('display', "none");
                    $('.index_page_more_menu').css('display', 'none');
                }
                if(_data == "3") {
                    $('.index_page_body_project_data').css('display', 'none');
                    $('.index_page_profil').css('display', "none");
                    $('.index_page_more_menu').css('display', 'block');
                }
            });

            

            if(_project.signature) {
                if(_project.signature.type == "wait") {
                    _projectBlock.find('.index_page_body_project_body_header d_t').html('Ожидает данных');
                }
            }

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
                    8. Паспорт поручителя
                    9. Cогласие поручителя на обработку персональных данных
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
                    8. Паспорт поручителя
                    9. Согласие супруга на купли-продажу доли
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
                    10. Согласие супруга на залог доли
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
                    10. Согласие супруга на залог доли
                    `;
                    this._append(text);
                },
            }

            $('.index_page_more_menu_blocks_need').empty();
            _doc["1"]();

            $('.index_page_body_project_body_type span').click( function() {
                $('.index_page_body_project_body_type span').removeClass('selected');
                $(this).addClass('selected');

                $('.index_page_more_menu_blocks_need').empty();
                _doc[$(this).attr('data')]();
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
                                <span class="accept">Принять проект<i class="fas fa-arrow-right"></i></span>
                            </div>
                            <div class="index_page_body_project_body">
                                <div class="index_page_body_project_body_header">
                                    <span class="selected" data="1">Поданные данные</span>
                                    <span data="2">Компания</span>
                                    <span data="3">Дополнительно</span>
                                    <a><d_t>Дополнительные данные не получены</d_t><i class="fas fa-times-circle"></i></a>
                                </div>
                                <div class="index_page_body_project_body_content">
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `);

            if(_project.signature) 
            {
                var _lenth = Object.keys(_project.signature).length;

                if(_lenth > 1) {
                    _projectBlock.find('.index_page_body_project_body d_t').html('Данные получены');
                }
            }

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

        not_accept(data) {
            callApi({
                methodName: 'not_acceptProject',
                data: data,
            }).then((data) => {
                return data; 
            });
        }

    }

    if(!global.Components)
    {
        global.Components = {
            correction,
            moderation,
            active,
            project,
            
        }
    }
    


}(window))