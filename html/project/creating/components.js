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
                            info: "Введите название проекта, например: Сеть ресторанов",
                            parsing_data: null,
                            _id: "name"
                        },
                        {
                            type: "string",
                            name: "Цель привлечения средств",
                            info: "Напишите коротко для чего вам требуется финансирование, например: Открытие 10 ресторанов",
                            parsing_data: null,
                            _id: "target"
                        },
                        {
                            type: "string",
                            name: "Общая сумма привлечения",
                            info: "Укажите необходимую сумму для реализации проекта, например: 30 000 000",
                            _id: "attraction_amount",
                            parsing_data: null,
                            redacting: true,
                        },
                        {
                            type: "string",
                            name: "Срок инвестирования",
                            info: "Укажите срок заключения договора с инвестором в месяцах, например: 12, либо выберите 'бессрочно', если если это доля в проекте",
                            parsing_data: null,
                            _id: "date",
                            number: true
                        },
                        {
                            type: "string",
                            name: "Минимальная сумма",
                            info: "Укажите минимальную сумму входа в проект, например: 50 000",
                            parsing_data: null,
                            _id: "minimal_amount",
                            redacting: true,
                        },
                        {
                            type: "string",
                            name: "Ставка % в месяц",
                            info: "Введите целое или дробное значение в формате 1.15 и мы сами пересчитаем ее в % годовых",
                            parsing_data: null,
                            _id: "rate",
                            number_t: true
                        },
                        {
                            type: "menu",
                            menu_list: ['Ежедневно', 'Ежемесячно', 'Ежеквартально', 'Ежегодно','Раз в 6 месяцев', 'В конце срока'],
                            name: "Выплата процентов",
                            info: "Ежедневно, Ежемесячно, Ежеквартально, Ежегодно, Раз в 6 месяцев, В конце срока",
                            _id: "date_payments"
                        },
                        {
                            type: "date",
                            name: "Период сбора",
                            info: "Выберите дату окончания приема средств",
                            _id: "collection_period",
                            ogranit_day: true,
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
                                info: "",
                                parsing_data: "name/short_with_opf",
                                readonly: true,
                                _id: "name_company"
                            },
                            {
                                type: "string",
                                name: "ИНН",
                                info: "",
                                _id: "inn",
                                parsing_data: "inn",
                                readonly: true,
                                number: true
                            },
                            {
                                type: "string",
                                name: "ОГРН",
                                info: "",
                                parsing_data: "ogrn",
                                _id: "ogrn",
                                readonly: true,
                                number: true
                            },
                            {
                                type: "addr",
                                name: "Юридический адрес",
                                info: "",
                                parsing_data: null,
                                moreGet: true,
                                readonly: true,
                                _id: "addr"
                            },
                            {
                                type: "addr",
                                name: "Фактический адрес",
                                info: "Введите Фактический адрес",
                                parsing_data: null,
                                moreGet: true,
                                shower: "Ваш юридический адрес не совпадают с Фактическим",
                                _id: "addr_fact"
                            },
                            {
                                type: "string",
                                name: "Сайт",
                                info: "Введите название / ссылку на ваш сайт",
                                parsing_data: null,
                                _id: "syte"
                            }
                        ],
                        2: [
                            // {
                            //     type: "string",
                            //     name: "Прописка как в паспорте",
                            //     info: "Введите точные данные как в паспорте",
                            //     parsing_data: null,
                            //     _id: "registration"
                            // },
                            // {
                            //     type: "string",
                            //     name: "Регион согласно паспорту",
                            //     info: "Например Московская область, Свердловская область",
                            //     parsing_data: null,
                            //     _id: "region"
                            // },
                            {
                                type: "string",
                                name: "Основанная деятельность",
                                info: "Например розничная торговля",
                                parsing_data: null,
                                _id: "activity"
                            },
                            // {
                            //     type: "date",
                            //     name: "Ваша дата рождения",
                            //     info: "*",
                            //     parsing_data: null,
                            //     _id: "date_user"
                            // }
                        ]
                    }
                },
                "+3": {
                    header: "3. Выписка из банка",
                    body: [
                        {
                            type: "file",
                            name: "Загрузите выписку с расчетного счета не менее чем за последние 6 месяцев.",
                            _id: "file+3"
                        },
                    ]
                },
                "+3_1": {
                    header: "3. Отчет о прибылях",
                    body: [
                        {
                            type: "file",
                            name: "Загрузите отчет о прибылях и убытках не менее чем за последние 6 месяцев.",
                            _id: "file+3_1"
                        },
                    ]
                },
                "+3_2": {
                    header: "3. Отчет о движении денежных средств",
                    body: [
                        {
                            type: "file",
                            name: "Загрузите отчет о движении денежных средств не менее чем за последние 6 месяцев.",
                            _id: "file+3_2"
                        },
                    ]
                },
                "+3_3": {
                    header: "3. Бухгалтерский баланс",
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
                            name: "Загрузите скан паспорта всех учредителей Юр. лица, все страницы одним файлом в формате PDF по каждому лицу отдельно",
                            _id: "file+4"
                        },
                    ]
                },
                "+4_1": {
                    header: "4. Данные собстевенника",
                    body: [
                        {
                            type: "string",
                            name: "Ф.И.О Собственника как в паспорте",
                            info: "",
                            parsing_data: null,
                            _id: "sob_fio"
                        },
                        {
                            type: "string",
                            name: "Дата рождения",
                            info: "",
                            parsing_data: null,
                            _id: "sob_date"
                        },
                        {
                            type: "string",
                            name: "Прописка как в паспорте",
                            info: "",
                            parsing_data: null,
                            _id: "sob_prop"
                        },
                        {
                            type: "string",
                            name: "Регион согласно паспорту",
                            info: "",
                            parsing_data: null,
                            _id: "sob_region"
                        },
                        {
                            type: "string",
                            name: "Серия паспорта",
                            info: "",
                            parsing_data: null,
                            _id: "sob_serion"
                        },
                        {
                            type: "string",
                            name: "Номер паспорта",
                            info: "",
                            parsing_data: null,
                            _id: "sob_number"
                        },
                        {
                            type: "string",
                            name: "ИНН физ лица",
                            info: "",
                            parsing_data: null,
                            _id: "sob_inn"
                        },
                    ]
                },
                "+5": {
                    header: "5. Контакты",
                    body: [
                        // {
                        //     type: "string",
                        //     name: "ФИО Представителя",
                        //     info: "Введите ФИО кирилицей",
                        //     _id: "initials"
                        // },
                        {
                            type: "string",
                            name: "Должность",
                            info: "Должность которую вы занимаете в компании",
                            _id: "doljnost",
                            phone: true
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
                            name: "КПП",
                            info: "Введите КПП",
                            _id: "kpp",
                            number: true
                        },
                        {
                            type: "string",
                            name: "Получатель",
                            info: "Введите кто будет получать инвестиции например: ООО 'Интегра'",
                            _id: "recipient"
                        },
                        {
                            type: "string",
                            name: "Счет получателя",
                            info: "Введите счет получателя",
                            _id: "account_get",
                            number: true
                        }
                    ]
                },
                "+7": {
                    header: "7. Презентация",
                    body: [
                        {
                            type: "file",
                            name: "Загрузите презентацию вашего проекта. Обращаем внимание: Презентация не должна содержать контактов!",
                            _id: "file+7"
                        },
                    ]
                },
                "+8": {
                    header: "8. Видео презентация",
                    body: [
                        {
                            type: "file",
                            name: `Загрузите вашу видео-презентацию, еcли она есть`,
                            _id: "file+8"
                        },
                    ]
                }
            };

            this.signature = {
                "1": {
                    "+1_s": {
                        header: "Загрузите документы",
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
                        header: "Загрузите документы",
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

        start_preloader(_this, callback) {

            _this.parent().fadeOut( function() {
                _this.parent().parent().find('.loader_input').fadeIn( function() {
                    callback();
                });
            }); 
        }

        async load_file(_this, _id, file_id) 
        {
            var filename = $(_this.files)[0].name;
            var aux = filename.split('.');
            var extension = aux[aux.length -1].toUpperCase();

            if(file_id == 'file+4')
            {
                if(extension === 'PNG'
                    || extension === 'JPG'
                    || extension === 'PDF'
                    || extension === 'WEBP'
                ){}else{
                    alert('Неверный формат: ' + extension + '. Только: PNG JPG PDF WEBP.');
                    return;
                }  
            }

            if(file_id == 'file+3')
            {
                if(extension === 'PNG'
                    || extension === 'JPG'
                    || extension === 'PDF'
                    || extension === 'WEBP'
                ){}else{
                    alert('Неверный формат: ' + extension + '. Только: PNG JPG PDF WEBP.');
                    return;
                }  
            }

            if(file_id == 'file+3_1')
            {
                if(extension === 'PNG'
                    || extension === 'JPG'
                    || extension === 'PDF'
                    || extension === 'WEBP'
                ){}else{
                    alert('Неверный формат: ' + extension + '. Только: PNG JPG PDF WEBP.');
                    return;
                }  
            }
            
            if(file_id == 'file+3_3')
            {
                if(extension === 'PNG'
                    || extension === 'JPG'
                    || extension === 'PDF'
                    || extension === 'WEBP'
                ){}else{
                    alert('Неверный формат: ' + extension + '. Только: PNG JPG PDF WEBP.');
                    return;
                }  
            }
            
            if(file_id == 'file+3_2')
            {
                if(extension === 'PNG'
                    || extension === 'JPG'
                    || extension === 'PDF'
                    || extension === 'WEBP'
                ){}else{
                    alert('Неверный формат: ' + extension + '. Только: PNG JPG PDF WEBP.');
                    return;
                }  
            }

            var _form    = new FormData();
            
            _form.append('file_id', file_id);
            _form.append('_id', _id);
            _form.append('_pts', $(_this.files)[0].type);
            _form.append('files', $(_this.files)[0]);

            this.start_preloader($(_this), async function() 
            {
                var _url = `${getURL()}/file.io/files`;

                axios.post(_url, _form, {
                    headers: {
                      'Content-Type': 'multipart/form-data'
                    },
                    onUploadProgress: (progressEvent) => {
                        const totalLength = progressEvent.lengthComputable ? progressEvent.total : progressEvent.target.getResponseHeader('content-length') || progressEvent.target.getResponseHeader('x-decompressed-content-length');
                        console.log("onUploadProgress", totalLength);
                        if (totalLength !== null) {
                            var progressBarData = Math.round( (progressEvent.loaded * 100) / totalLength );
                            $(_this).parent().parent().find('.loader_input span').html(progressBarData + "%");
                        }
                    }
                }).then(data => {
                    if(data.data.status == "ok") {
                        $(_this).parent().parent().find('.loader_input').attr('data', data.data.file_name);
                        $(_this).parent().parent().find('.loader_input').fadeOut( function() {
                            $(_this).parent().parent().find('.all_good').fadeIn( function() {
                         
                            });
                        });
                    }
                });

            });
        }

        async load_file_redacting(_this, _id, file_id) {
            var _form    = new FormData();

            _form.append('files', $(_this.files)[0]);
            _form.append('file_id', file_id);
            _form.append('_id', _id);
            _form.append('_pts', $(_this.files)[0].type);


            this.start_preloader($(_this), async function() 
            {
                var _url = `${getURL()}/file_redacting.io/files`;

                var _file = _form;

                axios.post(_url, _file, {
                    headers: {
                      'Content-Type': 'multipart/form-data'
                    }
                }).then(data => {
                    if(data.data.status == "ok") {
                        $(_this).parent().parent().find('.loader_input').attr('data', data.data.file_name);
                        $(_this).parent().parent().find('.loader_input').fadeOut( function() {
                            $(_this).parent().parent().find('.all_good').fadeIn( function() {
                        
                            });
                        });
                    }
                })

            });
        }

        async load_file_redacting_signature_document(_this, _id)
        {
            var _form    = new FormData();

            _form.append('files', $(_this.files)[0]);
            _form.append('_id', _id);
            _form.append('_pts', $(_this.files)[0].type);


            this.start_preloader($(_this), async function() 
            {
                var _url = `${getURL()}/file_signature_document.io/files`;

                var _file = _form;

                axios.post(_url, _file, {
                    headers: {
                      'Content-Type': 'multipart/form-data'
                    }
                }).then(data => {
                    if(data.data.status == "ok") {
                        $(_this).parent().parent().find('.loader_input').attr('data', data.data.file_name);
                        $(_this).parent().parent().find('.loader_input').fadeOut( function() {
                            $(_this).parent().parent().find('.all_good').fadeIn( function() {
                                $('.index_page').empty();
                                $('.preloader').fadeIn( function() {
                                    $('.preloader').fadeOut( function() {
                                        $('.end_get_project').css('display', "flex");
                                    });
                                });
                            });
                        });
                    }
                })

            });
        }

        async load_file_redacting_registration_document(_this, _id)
        {
            var _form    = new FormData();

            _form.append('files', $(_this.files)[0]);
            _form.append('_id', _id);
            _form.append('_pts', $(_this.files)[0].type);


            this.start_preloader($(_this), async function() 
            {
                var _url = `${getURL()}/file_registration_document.io/files`;

                var _file = _form;

                axios.post(_url, _file, {
                    headers: {
                      'Content-Type': 'multipart/form-data'
                    }
                }).then(data => {
                    if(data.data.status == "ok") {
                        $(_this).parent().parent().find('.loader_input').attr('data', data.data.file_name);
                        $(_this).parent().parent().find('.loader_input').fadeOut( function() {
                            $(_this).parent().parent().find('.all_good').fadeIn( function() {
                                $('.index_page').empty();
                                $('.preloader').fadeIn( function() {
                                    $('.preloader').fadeOut( function() {
                                        $('.end_get_project').css('display', "flex");
                                    });
                                });
                            });
                        });
                    }
                })

            });
        }

        async load_file_signature(_this, _id, file_id) 
        {
            var _form    = new FormData();

            _form.append('files', $(_this.files)[0]);
            _form.append('file_id', file_id);
            _form.append('_id', _id);
            _form.append('_pts', $(_this.files)[0].type);

            this.start_preloader($(_this), function() {
                var _url = `${getURL()}/file_signature.io/files`;

                var _file = _form;

                axios.post(_url, _file, {
                    headers: {
                      'Content-Type': 'multipart/form-data'
                    },
                    onUploadProgress: (progressEvent) => {
                        const totalLength = progressEvent.lengthComputable ? progressEvent.total : progressEvent.target.getResponseHeader('content-length') || progressEvent.target.getResponseHeader('x-decompressed-content-length');
                        console.log("onUploadProgress", totalLength);
                        if (totalLength !== null) {
                            var progressBarData = Math.round( (progressEvent.loaded * 100) / totalLength );
                            $(_this).parent().parent().find('.loader_input span').html(progressBarData + "%");
                        }
                    }
                }).then(data => {
                    if(data.data.status == "ok") {
                        $(_this).parent().parent().find('.loader_input').attr('data', data.data.file_name);
                        $(_this).parent().parent().find('.loader_input').fadeOut( function() {
                            $(_this).parent().parent().find('.all_good').fadeIn( function() {
                                
                            });
                        });
                    }
                })
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
                        <input id="${data._id}" class="text_area" placeholder="">
                    </div>
                `);

                _line.find(`#${data._id}`).on('keyup input', function() 
                {
                    var _val = $(this).val();
                    Cookies.set(data._id, _val);
                });
                
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

                if(global._typePage != "redacting") {
                    if(typeof data.parsing_data != "undefined") {
                        if(data.parsing_data)
                        {
                            if(data.parsing_data.indexOf('/') > -1)
                            {
                                _line.find(`#${data._id}`).val(global._User.creatingData.data[data.parsing_data.split('/')[0]][data.parsing_data.split('/')[1]]);
                                _line.find(`#${data._id}`).attr("readonly", "readonly");
                            } else 
                            {
                                _line.find(`#${data._id}`).val(global._User.creatingData.data[data.parsing_data]);
                                _line.find(`#${data._id}`).attr("readonly", "readonly");
                            }
                        }
                    }
                }

                if(typeof data.readonly != "undefined") 
                {
                    _line.find(`#${data._id}`).attr("readonly", "readonly");
                    _line.find(`#${data._id}`).parent().find('.body_point_line_header_info').remove();
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
                        <span></span>
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
                        <input id="${data._id}" type="date" class="text_area" name="calendar">
                    </div>
                `);

                if(typeof data.ogranit_day != "undefined") 
                {
                    var dtToday = new Date();

                    var month = dtToday.getMonth() + 1;
                    var day = dtToday.getDate();
                    var year = dtToday.getFullYear();

                    if(month < 10)
                        month = '0' + month.toString();
                    if(day < 10)
                        day = '0' + day.toString();

                    var maxDate = year + '-' + month + '-' + day;    
                    _line.find('input').attr('min', maxDate);
                }

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

                if(global._typePage != "redacting") {
                    $input.val(global._User.creatingData.data.address.value);
                }

                if(typeof data.shower != "undefined") 
                {
                    var _showerBlock = $(`
                        <div class="_showerBlock">
                            <div class="_showerBlock_row">
                                <span>${data.shower}</span>
                                <i class="fal fa-chevron-right"></i>
                            </div>
                        </div>
                    `);

                    _showerBlock.find('._showerBlock_row').click( function() {
                        $(this).parent().remove();
                    })

                    _line.append(_showerBlock);
                }

                if(typeof data.readonly != "undefined") 
                {
                    $input.attr("readonly", "readonly");
                    $input.parent().find('.body_point_line_header_info').remove();
                }

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

                    $input.parent().find('.body_point_line_more_info_addr span').eq(0).text(_data[0].result);
                    $input.parent().find('.body_point_line_more_info_addr span').eq(1).text(_data[0].source);
                    $input.parent().find('.body_point_line_more_info_addr').fadeOut( function () {
                        $(this).fadeIn();
                    });

                    $input.parent().find('.body_point_line_more_info_addr span').click( function () {
                        var inputText = $(this).text();
                        $(this).parent().parent().find('input').val(inputText);
                        $input.parent().find('.body_point_line_more_info_addr').fadeOut();
                    })
                }
                    
                return _line;
            }
            
        }

        async render(param) 
        {
            $('.index_page_body_points').empty();

            $('.index_page_header_user').css('display', 'none');

            $('.index_page_body_header_type span').css('display', "none");
            $(`.index_page_body_header_type span[data="${global._User.creatingData.type}"]`).css('display', "flex");

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

                if(key == "+5")
                {
                    var preloaderBlockBlock = $(`
                        <div class="preloaderBlockBlock">
                            <div class="preloaderBlockBlock_row">
                                <p>Вводя персональные данные физических лиц, вы подтверждаете, что ознакомились с <a href="/documents/p.pdf">Политикой обработки персональных данных</a> и даете согласие на обработку персональных данных</p>
                                <div class="preloaderBlockBlock_button">
                                    <span>Подтверждаю</span>
                                </div>
                            </div>
                        </div>
                    `);

                    preloaderBlockBlock.find('.preloaderBlockBlock_button').click( function () {
                        $(this).parent().parent().remove();
                    })

                    _body.append(preloaderBlockBlock);
                }

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
                
                $('.index_page_body_points').append(_body);
            }
        }

        render_signature(_project) 
        {
            var _type = _project.signature.type;

            for (var key in this.signature[_type]) 
            {
                var data = this.signature[_type][key];

                var _body = $(`<div class="body_point"></div>`);
                _body.append(`
                    <div class="body_point_header">
                        <span>${data.header}</span>
                    </div>
                `);

                data.body.forEach(element => 
                {
                    var _string = this.dataLines["file"](element);
                    _body.append(_string);
                });

                $('.index_page_body_points').append(_body);
            }
            
        }

        render_signature_document(_project) 
        {
            var _uploadBlock = $(`
                <div class="_uploadBlock">
                    <span>Загрузить</span>
                </div>
            `);

            _uploadBlock.click( function () {
                window.open(`https://invester-relocation.site/projects/${_project._id}/${_project.signature_document.document}`, "_blank");
            })

            var _body = $(`
                <div class="body_point">
                    <div class="body_point_line _file">
                        <div class="body_point_line_header">
                            <div class="body_point_line_header_text">
                                <span>Загрузите</span>
                                <div class="download_buttons">
                                    <input class="file_load" id='signature_mass' type='file'>
                                    <label for="signature_mass">Загрузить <i class="fas fa-angle-double-down"></i></label>
                                </div>
                                <div class="loader_input" id="signature_mass_block">
                                    <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
                                    <span></span>
                                </div>
                                <div class="all_good">
                                    <div class="all_good_row">
                                        <span class="all_good_cheack">Посмотреть</span>
                                        <span class="all_good_del">Удалить</span>
                                    </div>
                                </div>  
                            </div>
                            <div class="body_point_line_header_info">
                                
                            </div>
                        </div>
                    </div>
                </div>
            `);

            _body.find('.body_point_line_header').css('margin-top', '30px');

            $('.index_page_body_points').append(_uploadBlock);
            $('.index_page_body_points').append(_body);
        }

        render_registration_document(_project) 
        {
            var _uploadBlock = $(`
                <div class="_uploadBlock">
                    <span>Скачать документ</span>
                </div>
            `);

            _uploadBlock.click( function () {
                window.open(`https://invester-relocation.site/projects/${_project._id}/${_project.registrationDocument.document}`, "_blank");
            })

            var _body = $(`
                <div class="body_point">
                    <div class="body_point_line _file">
                        <div class="body_point_line_header">
                            <div class="body_point_line_header_text">
                                <span>Загрузите</span>
                                <div class="download_buttons">
                                    <input class="file_load" id='signature_mass' type='file'>
                                    <label for="signature_mass">Загрузить обратно <i class="fas fa-angle-double-down"></i></label>
                                </div>
                                <div class="loader_input" id="signature_mass_block">
                                    <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
                                    <span></span>
                                </div>
                                <div class="all_good">
                                    <div class="all_good_row">
                                        <span class="all_good_cheack">Посмотреть</span>
                                        <span class="all_good_del">Удалить</span>
                                    </div>
                                </div>  
                            </div>
                            <div class="body_point_line_header_info">
                                
                            </div>
                        </div>
                    </div>
                </div>
            `);

            _body.find('.body_point_line_header').css('margin-top', '30px');

            $('.index_page_body_points').append(_uploadBlock);
            $('.index_page_body_points').append(_body);
        }

        getId(_id) {
            return callApi({
                methodName: 'getID',
                data: _id,
            }).then((data) => {
                return data; 
            });
        }

        async render_redacting(_project) 
        {
            $('.index_page_body_points').empty();

            _project.redacting.forEach(element => 
            {
                var data = this.struct[element.type];

                var _body = $(`<div class="body_point"></div>`);

                _body.append(`
                    <div class="body_point_header">
                        <span>${data.header}</span>
                    </div>
                    <div class="body_point_header_info_red">
                        <span>${element.value}</span>
                    </div>
                `);

                var _this = this;

                var param = _project.data.organization;
                if(element.type == "+2") {
                    if(param == "1" || param == "2") {
                        
                        data.body[1].forEach(element => 
                        {
                            _body.append(_this.dataLines[element.type](element));
                        });

                    } else {
                        data.body[2].forEach(element => 
                        {
                            _body.append(_this.dataLines[element.type](element));
                        });
                    }
                } else {
                    data.body.forEach(element => 
                    {
                        _body.append(_this.dataLines[element.type](element));
                    });
                }
                

                $('.index_page_body_points').append(_body);
            })
        }

        putRedacting(data) {
            return callApi({
                methodName: 'putRedacting',
                data: data,
            }).then((data) => {
                return data; 
            });
        }

        async redactingAgain(_id) 
        {
            var _array = [];

            $('.body_point').each((i, element) => {
                $(element).find('.body_point_line').each((i, _element) => {
                    if($(_element).find("input").length) {
                        _array.push({
                            name: $(_element).find("input").attr('id'),
                            val: $(_element).find("input").val()
                        });
                    } else {
                        _array.push({
                            name: $(_element).find(".loader_input").attr('id').split('_')[0],
                            val: $(_element).find(".loader_input").attr('data')
                        });
                    }
                });
            });

            $('.index_page').empty();
            $('.preloader').fadeIn();

            console.log(_array);

            this.putRedacting({
                array: _array,
                _id: _id,
            }).then(() => {
                $('.preloader').fadeOut( function() {
                    $('.end_get_project').css('display', "flex");
                });
            });
            
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

        async correct_next_load(param, user) 
        {
            var correctArray    = {};
            var types           = {};

            correctArray.organization = param;

            for (var key in this.struct) 
            {
                if(param != 1) 
                {
                    if(key == "+3_1" || key == "+3_2" || key == "+3_3") {
                        continue;
                    }
                }

                var data = this.struct[key];

                var FUN = 
                {
                    _string: function(element) 
                    {
                        correctArray[element._id] = $(`#${element._id}`).val();
                        types[element._id] = "string";
                    },
                    _file: function(element) 
                    {
                        correctArray[element._id] = document.getElementById(`${element._id}_block`).getAttribute('data');
                        types[element._id] = "file";
                    },
                    _menu: function(element)
                    {
                        correctArray[element._id] = $(`#${element._id}`).val();
                        types[element._id] = "menu";
                    },
                    _addr: function(element)
                    {
                        correctArray[element._id] = $(`#${element._id}`).val();
                        types[element._id] = "string";
                    },
                    _date: function(element)
                    {
                        console.log($(`#${element._id}`).val());
                        correctArray[element._id] = $(`#${element._id}`).val();
                        types[element._id] = "string";
                    }
                }

                function _el(element)
                {
                    if(element.type == "string") FUN._string(element);
                    if(element.type == "file") FUN._file(element);
                    if(element.type == "menu") FUN._menu(element);
                    if(element.type == "addr") FUN._addr(element);
                    if(element.type == "date") FUN._date(element);
                }

                if(key == "+2") {
                    if(param == 1 || param == 2) {
                        data.body[1].forEach(element => 
                        {
                            _el(element)
                        });
                    } else {
                        data.body[2].forEach(element => 
                        {
                            _el(element)
                        });
                    }
                } else {
                    data.body.forEach(element => 
                    {
                        _el(element)
                    });
                }
            }

            console.log(correctArray);

            for(var key in correctArray)
            {
                if(key == "rate") {correctArray[key] = (correctArray[key].replace(/,/, '.') * 12).toFixed(2)};
                if(key == "syte") continue;
                if(types[key] == 'file') continue;
                var _data = correctArray[key];
                if(_data.length == 0 || _data == null) {
                    alert('Введите все данные!');
                    return;
                }
            }

            $('.index_page').fadeOut();
            $('.preloader').fadeIn();

            var cheackInnCreator = "not error";

            if(param != 3)
            {
                cheackInnCreator = await callApi({
                    methodName: "cheackInnCreator",
                    data: {
                        data: correctArray,
                        user: user,
                    },
                });
            }

            if(cheackInnCreator == "error") 
            {
                alert('Инн введен не верно!');
                $('.preloader').fadeOut();
                $('.index_page').fadeIn();
            } else 
            {
                callApi({
                    methodName: 'setProject',
                    data: {
                        data: correctArray,
                        user: user,
                    },
                });

                if(global._User.member_b)
                {
                    callApi({
                        methodName: 'tg_alert_user_numbers',
                        data: {
                            text: "Вы привели новый Проект! Вы можете посмотреть весь список у себя в кабинете",
                            user: global._User.member_b,
                        },
                    });
                }
                
                $('.preloader').fadeOut( function() {
                    $('.end_get_project').css('display', "flex"); 
                });
            }
        }

        async correct(param, user) 
        {

            var autch_block = $(`
                <div class="autch_block">
                    <div class="autch_block_row">
                        <p>Вы даете согласие на отправку вам сообщений которые могут потребоваться для уточнения информации.</p>
                        <div class="autch_block_buttons">
                            <div class="autch_block_buttons_block autch_block_buttons_block_close">
                                <span>Отказать</span>
                            </div>
                            <div class="autch_block_buttons_block autch_block_buttons_block_accept">
                                <span>Принять</span>
                            </div>
                        </div>
                    </div>
                </div>
            `);

            autch_block.find('.autch_block_buttons_block_close').click( function() {
                $(this).parent().parent().parent().remove();
            });

            var _this = this;

            autch_block.find('.autch_block_buttons_block_accept').click( async function() {
                $('.autch_block').remove();
                _this.correct_next_load(param, user);
            })

            $('body').append(autch_block);
        }

        correct_signature(_type, _id)
        {
            var correctArray = {};

            for (var key in this.signature[_type]) 
            {
                var data = this.signature[_type][key];

                data.body.forEach(element => 
                {
                    correctArray[element._id] = document.getElementById(`${element._id}_block`).getAttribute('data');
                });
            }

            for(var key in correctArray) 
            {
                var _data = correctArray[key];
                if(_data == null) {
                    alert('Введите все данные!');
                    return;
                }
            }

            $('.index_page').empty();
            $('.preloader').fadeIn( function() {
                $('.preloader').fadeOut( function() {
                    $('.end_get_project').css('display', "flex");
                });
            });

            return callApi({
                methodName: 'correct_signature',
                data: {
                    _id: _id,
                    data: correctArray,
                },
            }).then((data) => {
                return data; 
            });
        }

        correct_signature_document(_id, _dataImg) 
        {

            return callApi({
                methodName: 'correct_signature_document',
                data: {
                    _id: _id,
                    img: _dataImg,
                },
            }).then((data) => {
                return data; 
            });
        }


        // =======================================================================================

        getProject(_id) {
            return callApi({
                methodName: 'getProject_id',
                data: _id,
            }).then((data) => {
                return data; 
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