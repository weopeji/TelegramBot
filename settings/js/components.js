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
                        <div class="version2_default_bkg row_default"></div>
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
                                <span>На срок</span><p>${element.data.date} мес</p>
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

                item_block.find('.index_page_body_hrefs a').eq(0).css({
                    "background-color": "#32B3F9",
                    'color': "white"
                });
                item_block.find('.index_page_body_hrefs a').eq(1).css({
                    "background-color": "#10C760",
                    'color': "white"
                });
                item_block.find('.index_page_body_hrefs a').eq(2).css({
                    "background-color": "#6F62E5",
                    'color': "white"
                });

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

        async render_header(_project)
        {
            var _this = this;

            var header_info = $(`
                <div class="global_block_header">
                    <div class="global_block_header_info">
                        <h1>${_project.data.name}</h1>
                        <p>${_project.data.target}</p>
                    </div>
                    <div class="global_block_header_status">
                        <span></span>
                    </div>
                    <div class="global_block_header_accept_button">
                        <span>Принять проект<i class="fas fa-arrow-right"></i></span>
                    </div>
                </div>
            `);

            var header_menu = $(`
                <div class="global_block_menu">
                    <span data="data">
                        <div class="version2_default_bkg row_default"></div>
                        <i class="fal fa-file-chart-line"></i>
                        <p>Поданные данные</p>
                    </span>
                    <span data="info">
                        <div class="version2_default_bkg row_default"></div>
                        <i class="fal fa-database"></i>
                        <p>О компании</p>
                    </span>
                    <span data="redacting">
                        <div class="version2_default_bkg row_default"></div>
                        <i class="fal fa-sliders-v"></i>
                        <p>Проект</p>
                    </span>
                    <span data="more">
                        <div class="version2_default_bkg row_default"></div>
                        <i class="fal fa-info-square"></i>
                        <p>Юридические данные</p>
                    </span>
                    <span data="settings">
                        <div class="version2_default_bkg row_default"></div>
                        <i class="fal fa-video"></i>
                        <p>Видео</p>
                    </span>
                </div>
            `);

            var _status = "Ожидает модерации";

            if(_project.type == "correction") 
            {
                header_info.find('.global_block_header_status span').css('background', "#500907");
                _status = 'На редактировании';
            }

            if(_project.type == "active")
            {
                header_info.find('.global_block_header_status span').css('background', "#50C878");
                _status = 'Активно';

                header_info.find('.global_block_header_accept_button').css('display', "none");
            }

            header_info.find('.global_block_header_status span').html(_status);

            header_info.find('.global_block_header_accept_button').click( async function () 
            {
                note({
                    content: "Пожалуйста подождите!",
                    type: "info",
                    time: 2,
                });

                var AcceptProjectData = await callApi({
                    methodName: 'acceptProject',
                    data: _project._id,
                });

                if(AcceptProjectData == "error")
                {
                    note({
                        content: "Проект не заполнен полностью!",
                        type: "info",
                        time: 2,
                    });

                    return;
                }

                if(AcceptProjectData == "error_add")
                {
                    note({
                        content: "Проект был добавлен с ошибкой!",
                        type: "info",
                        time: 2,
                        callback: function()
                        {
                            location.reload();
                        },
                    });

                    return;
                };

                if(AcceptProjectData == "ok")
                {
                    note({
                        content: "Проект был успешно добавлен!",
                        type: "info",
                        time: 2,
                        callback: function()
                        {
                            location.reload();
                        },
                    });

                    return;
                }
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
            new global.Components.redacting_page_more().render(_project, this.global_block)
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
                    <iframe id="profil" src="../html/project/profil/?id=${_project._id}&administator=true" frameborder="0"></iframe>
                </div>
            `);

            var _iframe = _body.find('#profil');
            
            _iframe.on('load', function () {
                var _content = _iframe.contents();
                var _height = _content.find('.index_page_profil')[0];
                _iframe.css({
                    'height': '7000px',
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
            }).then(data => {
                note({
                    content: "Успешно",
                    type: "info",
                    time: 2,
                    callback: function()
                    {
                        location.reload();
                    },
                });
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
                "+1": {
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
                "+2": {
                    header: "Загрузите документы",
                    body: [
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
                "+3": {
                    header: "Загрузите документы",
                    body: [
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
            };

            var _this           = this;

            if(_project.signature) 
            {
                var _lenth = Object.keys(_project.signature).length;

                if(_lenth > 1)
                {
                    var putDocumentToSignature = $(`
                        <div class="Attracted_headerInfoBlock" style="display: none;">
                            <input type="file" name="" id="DocumentToSignature">
                            <div class="Attracted_headerInfoBlock_block" data="loader">
                                <div class="Attracted_headerInfoBlock_block_i">
                                    <i class="fad fa-file-download"></i>
                                </div>
                                <div class="Attracted_headerInfoBlock_block_text">
                                    <span>Загрузите</span>
                                    <p>Загрузить</p>
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

                    var putDocumentToSignatureAddMore = $(`
                        <div class="Attracted_headerInfoBlock Attracted_headerInfoBlock_moreDataNoShow" style="display: none;">
                            <div class="Attracted_headerInfoBlock_block">
                                <div class="Attracted_headerInfoBlock_block_i">
                                    <i class="fad fa-file-download"></i>
                                </div>
                                <div class="Attracted_headerInfoBlock_block_text">
                                    <span>Действие</span>
                                    <p>Подтвердить документ</p>
                                </div>
                            </div>
                        </div>
                    `);

                    putDocumentToSignatureAddMore.click( async function() {
                        note({
                            content: "Пожалуйста подождите!",
                            type: "info",
                            time: 2,
                        });

                        await callApi({
                            methodName: 'setCorrectionForProject',
                            data: _GET("id"),
                        });

                        note({
                            content: "Успешно",
                            type: "info",
                            time: 2,
                            callback: function()
                            {
                                location.reload();
                            },
                        });
                    })

                    putDocumentToSignature.find('input[type=file]').change( async function() 
                    {
                        var filename = $(this.files)[0].name;
                        var aux = filename.split('.');
                        var extension = aux[aux.length -1].toUpperCase();

                        if(extension != "DOCX")
                        {
                            note({
                                content: `Не верный формат! ${extension}, вы должны загрузить word`,
                                type: "info",
                                time: 4,
                            });

                            return;
                        }
   
                        var _form    = new FormData();

                        _form.append('files', $(this.files)[0]);
                        _form.append('_id', _project._id);
                        _form.append('_pts', extension);

                        note({
                            content: "Загрузка началась, ожидайте",
                            type: "info",
                            time: 2,
                        });

                        await _this.setSignatureFile(_project._id, _form);
                    });

                    this.global_block.append(putDocumentToSignature);
                    this.global_block.append(putDocumentToSignatureAddMore);

                    if(_project.signature_document) {
                        if(_project.signature_document.status == 'on') 
                        {
                            this.global_block.find('.Attracted_headerInfoBlock_block[data="loader"]').find('span').html('Документ подписан бизнесом');
                            this.global_block.find('.Attracted_headerInfoBlock_block[data="loader"]').find('p').html(`Посмотреть`);
                            this.global_block.find('.Attracted_headerInfoBlock_block[data="loader"]').click( function() {
                                window.open(`https://cashflo.ru/projects/${_project._id}/${_project.signature_document.user_document}`, '_blank');
                            })
                        } else 
                        {
                            this.global_block.find('.Attracted_headerInfoBlock_block[data="loader"]').find('span').html('Документ отправлен бизнесу');
                            this.global_block.find('.Attracted_headerInfoBlock_block[data="loader"]').find('p').html(`Посмотреть`);
                            this.global_block.find('.Attracted_headerInfoBlock_block[data="loader"]').click( function() {
                                window.open(`https://cashflo.ru/projects/${_project._id}/signature_document.pdf`, '_blank');
                            })
                            this.global_block.find('.Attracted_headerInfoBlock_block[data="dell"]').find('p').html(`Удалить`);
                            this.global_block.find('.Attracted_headerInfoBlock_block[data="dell"]').click( function() {
                                _this.dellSignatureFile(_project._id);
                                note({
                                    content: "Успешно!",
                                    type: "info",
                                    time: 2,
                                    callback: function()
                                    {
                                        location.reload();
                                    },
                                });
                            });
                            
                            if(_project.type == "moderation")
                            {
                                this.global_block.find('.Attracted_headerInfoBlock_moreDataNoShow').css('display', "flex");
                            };

                            if(_project.type == "correction")
                            {
                                this.global_block.find('.Attracted_headerInfoBlock').css('display', "none");
                            }
                        }
                    } else {
                        this.global_block.find('.Attracted_headerInfoBlock_block[data="loader"]').click( function() {
                            $('#DocumentToSignature').trigger('click');
                        })
                    }

                    var _header = $(`<div class="body_point"></div>`);

                    _header.css('padding-bottom', "40px");

                    var headerButton = $(`
                        <div class="body_point_header get_new_data">
                            <span>Полученные данные</span>
                        </div>
                    `);

                    _header.append(headerButton);
                    
                    var _type = "+" + _project.data.organization;

                    signature[_type].body.forEach( function(element) 
                    {
                        var dataBlockUrlAppend  = _project.signature.data[element._id];
                        var dataBlockUrlText    = "Посмотреть <i class='fas fa-download'></i>";
                        var clearCssForAhref    = false;
                        
                        if(!dataBlockUrlAppend)
                        {
                            dataBlockUrlText = "Документ не был добавлен пользователем";
                            clearCssForAhref = true;
                        }
                        
                        var _file = $(`
                            <div class="download_buttons">
                                <a target="_blank" href="${getURL()}/projects/${_project._id}/${dataBlockUrlAppend}">${dataBlockUrlText}</a>
                            </div>  
                        `);

                        if(clearCssForAhref)
                        {
                            _file.find('a').css('text-decoration', "none");
                        }

                        _file.find('a').css('color', "white");

                        var _line = $(`
                            <div class="body_point_line _file">
                                <div class="body_point_line_header">
                                    <div class="body_point_line_header_text">
                                        <span>${element.name}</span>
                                        
                                    </div>
                                    <div class="body_point_line_header_info">

                                    </div>
                                </div>
                            </div>
                        `);

                        _line.find(".body_point_line_header_text").append(_file);

                        _header.append(_line);
                    });

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
                    <!--
                    <span data="2">Займ с залогом</span>
                    <span data="3">Займ с поручительством</span>
                    <span data="4">Доля в ООО</span>
                    <span data="5">Займ с залогом доли в ООО</span>
                    <span data="6">Доля в объекте недвижимости</span>
                    -->
                </div>
                <div class="index_page_more_menu_blocks">
                    <h1>Зпрашиваемые данные</h1>
                    <div class="index_page_more_menu_blocks_need">
                        <p>
                            * Физ.лицо * <br> <br>
                            6. Карточка с банковскими реквизитами <br>
                            7. Бух.отчетность за последний год <br>
                            <br>
                            <br>
                            * ИП * <br> <br>
                            3. Приказ о назначении руководителя <br>
                            4. Свидетельство ИНН <br>
                            5. ОГРН <br>
                            6. Карточка с банковскими реквизитами <br>
                            7. Бух.отчетность за последний год <br>
                            <br>
                            <br>
                            * ООО * <br> <br>
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

            templateText.find('.get_new_data').click( function() 
            {
                _this.getNewDataProjects($('.index_page_body_project_body_type').find('span.selected').attr('data'), _project._id);
                note({
                    content: "Успешно",
                    type: "info",
                    time: 2,
                    callback: function()
                    {
                        location.reload();
                    },
                });
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
                    * Физ.лицо * <br> <br>
                    6. Карточка с банковскими реквизитами <br>
                    7. Бух.отчетность за последний год <br>
                    <br>
                    <br>
                    * ИП * <br> <br>
                    3. Приказ о назначении руководителя <br>
                    4. Свидетельство ИНН <br>
                    5. ОГРН <br>
                    6. Карточка с банковскими реквизитами <br>
                    7. Бух.отчетность за последний год <br>
                    <br>
                    <br>
                    * ООО * <br> <br>
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

        async renderSettings(_project)
        {
            const video_redactor = new global.Components.video_redactor();
            await video_redactor.render(this.global_block, _project);
        }

        setRegistrationFile(_id, _form) {
            var _url = `${getURL()}/file_registration.io/files`;

            var _file = _form;

            axios.post(_url, _file, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
        }

        async renderRedacting(_project)
        {
            var _this = this;

            if(_project.type != "active")
            {
                if(typeof _project.registrationDocument == 'undefined')
                {
                    var firstBlockMore = $(`
                        <div class="body_point">
                            <div class="version2_default_bkg row_default"></div>
                            <div class="body_point_header">
                                <span>Договор бизнеса с InvestER</span>
                            </div>
                            <div class="body_point_line_block_more_registration_business">
                                <input type="file" name="" id="DocumentToRegistration">
                                <label for="DocumentToRegistration">
                                    <span>Загрузить документ</span>
                                </label>
                            </div>
                        </div>
                    `);

                    firstBlockMore.css("padding-bottom", "20px");

                    firstBlockMore.find('input[type=file]').change( async function() 
                    {
                        var filename = $(this.files)[0].name;
                        var aux = filename.split('.');
                        var extension = aux[aux.length -1].toUpperCase();

                        var _form    = new FormData();

                        _form.append('files', $(this.files)[0]);
                        _form.append('_id', _project._id);
                        _form.append('_pts', extension);
                        _this.setRegistrationFile(_project._id, _form);

                        note({
                            content: "Документ успешно загружен на сервер, перепроверьте его и отправьте бизнесу!",
                            type: "info",
                            time: 3,
                            callback: function()
                            {
                                location.reload(); 
                            },
                        });
                    });

                    this.global_block.append(firstBlockMore);
                } else 
                {
                    if(_project.registrationDocument.status == "on")
                    {
                        var firstBlockMore = $(`
                            <div class="body_point">
                                <div class="version2_default_bkg row_default"></div>
                                <div class="body_point_header">
                                    <span>Договор бизнеса с InvestER</span>
                                </div>
                                <div class="body_point_line_block_more_registration_business">
                                    <st data="show">Посмотреть</st>
                                    <st data="clear">Очистить</st>
                                </div>
                            </div>
                        `);

                        firstBlockMore.find('.body_point_line_block_more_registration_business').css('margint-top', "20px");
                        firstBlockMore.find('st[data="clear"]').css('margin-left', '20px');

                        firstBlockMore.css("padding-bottom", "20px");

                        firstBlockMore.find('st[data="show"]').click( function() {
                            window.open(`https://cashflo.ru/projects/${_project._id}/${_project.registrationDocument.user_document}`, "_blank")
                        });

                        firstBlockMore.find('st[data="clear"]').click( async function() 
                        {
                            note({
                                content: "Пожалуйста подождите!",
                                type: "info",
                                time: 2,
                            });

                            await callApi({
                                methodName: 'registrationDocumentClearAdmin',
                                data: _GET("id"),
                            });

                            note({
                                content: "Успешно!",
                                type: "info",
                                time: 2,
                                callback: function()
                                {
                                    location.reload(); 
                                },
                            });
                        });

                        this.global_block.append(firstBlockMore);
                    } 
                    else if(_project.registrationDocument.status == "wait_admin") 
                    {
                        var firstBlockMore = $(`
                            <div class="body_point">
                                <div class="version2_default_bkg row_default"></div>
                                <div class="body_point_header">
                                    <span>Договор бизнеса с InvestER</span>
                                </div>
                                <div class="body_point_line_block_more_registration_business">
                                    <st>Посмотреть</st>
                                    <st>Подтвердить</st>
                                    <input type="file" name="" id="DocumentToRegistration">
                                    <label for="DocumentToRegistration">
                                        <span>Заменить</span>
                                    </label>
                                </div>
                            </div>
                        `);

                        firstBlockMore.find('st').eq(1).css({
                            "margin-left": "20px",
                            "margin-right": "20px",
                        });

                        firstBlockMore.css("padding-bottom", "20px");

                        firstBlockMore.find('st').eq(0).click( function() {
                            window.open(`https://cashflo.ru/projects/${_project._id}/${_project.registrationDocument.document}`, "_blank")
                        });

                        firstBlockMore.find('st').eq(1).click( async function() 
                        {
                            note({
                                content: "Пожалуйста подождите!",
                                type: "info",
                                time: 2,
                            });

                            await callApi({
                                methodName: 'registrationDocumentAcceptAdmin',
                                data: _GET("id"),
                            });

                            note({
                                content: "Успешно!",
                                type: "info",
                                time: 2,
                                callback: function()
                                {
                                    location.reload(); 
                                },
                            }); 
                        });

                        firstBlockMore.find('input[type=file]').change( async function() 
                        {
                            var filename = $(this.files)[0].name;
                            var aux = filename.split('.');
                            var extension = aux[aux.length -1].toUpperCase();

                            var _form    = new FormData();

                            _form.append('files', $(this.files)[0]);
                            _form.append('_id', _project._id);
                            _form.append('_pts', extension);
                            _this.setRegistrationFile(_project._id, _form);

                            note({
                                content: "Успешно!",
                                type: "info",
                                time: 2,
                                callback: function()
                                {
                                    location.reload(); 
                                },
                            }); 
                        });

                        this.global_block.append(firstBlockMore);
                    }
                }

                var firstBlockMore = $(`
                    <div class="body_point">
                        <div class="version2_default_bkg row_default"></div>
                        <div class="body_point_header" data="type_project">
                            <span>Выберите тип проетка</span>
                        </div>
                        <div class="body_point_line_block_more_registration_business">
                            <st data="default">Обычный</st>
                            <st data="investing_not_pay">Инвестиция с предоплатой</st>
                        </div>
                    </div>
                `);

                if(typeof _project.notFullpay != "undefined")
                {
                    firstBlockMore.find('.body_point_header[data="type_project"] span').html(`Выбран тип: С предоплатой ${_project.notFullpay}%`);
                }

                firstBlockMore.find('st[data="investing_not_pay"]').click( function() 
                {
                    SoloAlert.prompt({
                        title: "Подтверждение",
                        body: `Вы уверены, что хотите сменить тип проекта на "Инвестиция с предоплатой"? Если да, введите первичный процент инвестиции`,
                        theme: "dark",
                        type: "number",
                    }).then(async (value) => 
                    {
                        if(value.length != 0)
                        {
                            await callApi({
                                methodName: 'setNewTypeProject',
                                data: {
                                    id: _GET('id'),
                                    data: value,
                                },
                            });

                            SoloAlert.alert({
                                title:"Успешно",
                                body:"",
                                icon: "success"
                            });

                            $('.body_point_header[data="type_project"] span').html(`Выбран тип: С предоплатой ${value}%`);
                        }
                    })
                });

                firstBlockMore.find('st[data="investing_not_pay"]').css('margin-left', '20px');
                firstBlockMore.css("padding-bottom", "20px");

                this.global_block.append(firstBlockMore);
            }
            else
            {
                if(typeof _project.notFullpay != "undefined")
                {
                    if(Number(_project.notFullpay) != 0)
                    {
                        var firstBlockMore = $(`
                            <div class="body_point">
                                <div class="version2_default_bkg row_default"></div>
                                <div class="body_point_header" data="type_project">
                                    <span>Действие</span>
                                </div>
                                <div class="body_point_line_block_more_registration_business">
                                    <st data="request">Запросить еще ${100 - Number(_project.notFullpay)}% выплаты досрочно</st>
                                </div>
                            </div>
                        `);


                        firstBlockMore.find('st[data="request"]').click( function() 
                        {
                            SoloAlert.confirm({
                                title: "Подтверждение",
                                body: `Вы уверены, что хотите останосить инвестирования и запросить недостающую сумму?`,
                                theme: "dark",
                                useTransparency: true,
                            }).then(async (value) => 
                            {
                                if(value.length != 0)
                                {
                                    await callApi({
                                        methodName: 'requestLastMoneyInProject',
                                        data: _GET('id'),
                                    });
        
                                    SoloAlert.alert({
                                        title:"Успешно",
                                        body:"",
                                        icon: "success"
                                    });
                                }
                            })
                        });

                        firstBlockMore.css("padding-bottom", "20px");

                        this.global_block.append(firstBlockMore);

                        var requestInvestingMoney = 0;

                        if(typeof _project.requestInvestingMoney != "undefined")
                        {
                            requestInvestingMoney = _project.requestInvestingMoney;
                        }
        
                        var firstBlockMore = $(`
                            <div class="body_point">
                                <div class="version2_default_bkg row_default"></div>
                                <div class="body_point_header" data="type_project">
                                    <span>Сумма пересбора заявок</span>
                                </div>
                                <div class="body_point_line_block_more_registration_business">
                                    <st data="requestMoreMoney">Выбрана сумма: ${requestInvestingMoney.toString().ReplaceNumber()} р</st>
                                </div>
                            </div>
                        `);
        
                        firstBlockMore.find('st[data="requestMoreMoney"]').click( function() 
                        {
                            SoloAlert.prompt({
                                title: "Подтверждение",
                                body: `Вы уверены, что хотите сменить тип проекта на "Инвестиция с предоплатой"? Если да, введите первичный процент инвестиции`,
                                theme: "dark",
                                type: "number",
                            }).then(async (value) => 
                            {
                                if(value.length != 0)
                                {
                                    await callApi({
                                        methodName: 'setNewTypeProjectNumberMore',
                                        data: {
                                            id: _GET('id'),
                                            data: value,
                                        },
                                    });
        
                                    SoloAlert.alert({
                                        title:"Успешно",
                                        body:"",
                                        icon: "success"
                                    });
        
                                    $('st[data="requestMoreMoney"]').html(`Выбрана сумма: ${value.toString().ReplaceNumber()} р`);
                                }
                            })
                        });
        
                        firstBlockMore.css("padding-bottom", "20px");
        
                        this.global_block.append(firstBlockMore);
                    }
                }
            }

            var firstBlockMore = $(`
                <div class="body_point">
                <div class="version2_default_bkg row_default"></div>
                    <div class="body_point_header">
                        <span>Редактирование выплат</span>
                    </div>
                    <div class="body_point_line_block_more">
                        <div class="body_point_line body_point_line_first" data="commission">
                            <span>Комиссия от привлеченных средств:</span>
                            <p>${_project.payersData.commission}</p>
                        </div>
                        <div class="body_point_line body_point_line_input" data="commission">
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
                        <div class="body_point_line body_point_line_first" data="company_commission">
                            <span>Процент доли компании:</span>
                            <p>${_project.payersData.company_commission}</p>
                        </div>
                        <div class="body_point_line body_point_line_input" data="company_commission">
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
                        <div class="body_point_line body_point_line_first" data="attraction_commission">
                            <span>Процент Отчисления за привлечение:</span>
                            <p>${_project.payersData.attraction_commission}</p>
                        </div>
                        <div class="body_point_line body_point_line_input" data="attraction_commission">
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
                        <div class="body_point_line body_point_line_first" data="investors_commission">
                            <span>За привлечение инвесторов:</span>
                            <p>${_project.payersData.investors_commission}</p>
                        </div>
                        <div class="body_point_line body_point_line_input" data="investors_commission">
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
                        <div class="body_point_line body_point_line_first" data="business_commission">
                            <span>За привлечение бизнеса:</span>
                            <p>${_project.payersData.business_commission}</p>
                        </div>
                        <div class="body_point_line body_point_line_input" data="business_commission">
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
                        <div class="body_point_line body_point_line_first" data="show">
                            <span>Абсолют Инвестора:</span>
                            <span>${((_project.payersData.commission * (_project.payersData.attraction_commission / 100)) * (_project.payersData.investors_commission / 100)).toFixed(3)} %</span>
                            <span>Абсолют бизнеса:</span>
                            <span>${((_project.payersData.commission * (_project.payersData.attraction_commission / 100)) * (_project.payersData.business_commission / 100)).toFixed(3)} %</span>
                        </div>
                    </div>
                </div>
            `);

            firstBlockMore.css("padding-bottom", "20px");

            firstBlockMore.find('.body_point_line_first').click( function () {
                if($(this).attr('data') != "show")
                {
                    $(this).fadeOut( function() {
                        $(this).parent().find(".body_point_line_input").css("display", "flex");
                    });
                }
            })

            firstBlockMore.find(".body_point_line_input_close").click( function() {
                $(this).parent().fadeOut( function() 
                {
                    $(this).parent().parent().find(".body_point_line_first").fadeIn();
                });
            })

            firstBlockMore.find(".body_point_line_input_accept").click( async function() 
            {
                var _text   = $(this).parent().find("textarea").val();
                var _lineId = $(this).parent().attr('data');

                if(_lineId == "business_commission" || _lineId == "investors_commission")
                {
                    var needData = Number(_text);
                    var moreData = null;
                    var moreLineId = null;

                    if(_lineId == "business_commission")
                    {
                        moreData    = Number($('.body_point_line_input[data="investors_commission"]').find('p').text());
                        moreLineId  = "investors_commission";
                    } else
                    {
                        moreData    = Number($('.body_point_line_input[data="business_commission"]').find('p').text());
                        moreLineId  = "business_commission";
                    };

                    await callApi({
                        methodName: 'redactingLineSettingsPageGlobal',
                        data: {
                            projectId: _GET('id'),
                            lineId: _lineId,
                            data: _text,
                        },
                    });

                    await callApi({
                        methodName: 'redactingLineSettingsPageGlobal',
                        data: {
                            projectId: _GET('id'),
                            lineId: moreLineId,
                            data: 100 - needData,
                        },
                    });
                } else 
                {
                    await callApi({
                        methodName: 'redactingLineSettingsPageGlobal',
                        data: {
                            projectId: _GET('id'),
                            lineId: _lineId,
                            data: _text,
                        },
                    });
                }
                
                $(this).parent().fadeOut( function() 
                {
                    $(this).parent().find(".body_point_line_first p").html(_text);
                    $(this).parent().find(".body_point_line_first").fadeIn();
                    location.reload();
                });
            })

            this.global_block.append(firstBlockMore);

            var firstBlockMore = $(`
                <div class="body_point">
                    <div class="version2_default_bkg row_default"></div>
                    <div class="body_point_header">
                        <span>Редактирование Кратности</span>
                    </div>
                    <div class="body_point_line_block_more">
                        <div class="body_point_line body_point_line_first" data="multiplicity">
                            <span>Выбранная кратность:</span>
                            <p>0</p>
                        </div>
                        <div class="body_point_line body_point_line_input" data="multiplicity">
                            <input id="investings_pay_textarea" class="text_area"></textarea>
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

            firstBlockMore.find('input').on('keyup input', function() 
            {
                var _val = $(this).val();
                _val = _val.replace(/[^\d;]/g, '')
                _val = _val.replace(/\s/g, '');
                var format = String(_val).replace(/(\d)(?=(\d{3})+([^\d]|$))/g, '$1 ');
                $(this).val(format);
            });

            if(typeof _project.multiplicity != 'undefined')
            {
                firstBlockMore.find('.body_point_line_first p').html(Number(_project.multiplicity).toDivide());
            }

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

            firstBlockMore.find(".body_point_line_input_accept").click( function() 
            {
                var _text = $(this).parent().find("input").val();

                callApi({
                    methodName: 'redactingLineSettingsPageGlobalMultiplicity',
                    data: {
                        projectId: _GET('id'),
                        data: Number(_text.toString().trim().replace(/\s/g, '')),
                    },
                });

                $(this).parent().fadeOut( function() 
                {
                    $(this).parent().find(".body_point_line_first p").html(Number(_text.toString().trim().replace(/\s/g, '')).toDivide());
                    $(this).parent().find(".body_point_line_first").fadeIn();
                });
            })

            this.global_block.append(firstBlockMore);

            var getUserByProjectOfId = await callApi({
                methodName: "getUserByProjectOfId",
                data: _GET("id"),
            });

            var _block = 
            $(`
                <div class="structCreator_new_block"">
                <div class="version2_default_bkg row_default"></div>
                    <div class="structCreator_new_block_row">
                        <span>Кто создал проект</span>
                        <a>
                            <BB>${getUserByProjectOfId.whoGet}</BB>
                            <BB>${getUserByProjectOfId.nameGet}</BB>
                        </a>
                    </div>
                </div>
            `);

            _block.find('BB').css("margin-right", "20px");

            _block.css('margin-top', '20px');

            this.global_block.append(_block);   

            var activeData = await callApi({
                methodName: "activeDataProject",
                data: _GET("id"),
            });

            var _block = 
            $(`
                <div class="structCreator_new_block"">
                    <div class="version2_default_bkg row_default"></div>
                    <div class="structCreator_new_block_row">
                        <span>Кто привлек проект</span>
                        <a>
                            <BB>${activeData.whoGet}</BB>
                            <BB>${activeData.nameGet}</BB>
                        </a>
                    </div>
                </div>
            `);

            _block.find('BB').css("margin-right", "20px");

            _block.css('margin-top', '20px');

            this.global_block.append(_block);   

            if(typeof _project.notFullpay != "undefined")
            {
                await this.pushDropMenuNotFullpay();
            }
            else
            {
                var templateText = $(`
                    <div class="settingBlock">
                        <div class="settingBlock_header">
                            <p>Подтвержденные инвестиции в проект</p>
                            <div class="settingBlock_header_line">
                                <span>Инвестор</span>
                                <span>Сумма Инвестиции</span>
                                <span>Чек</span>
                                <span>Статус оплаты</span>
                                <span>Подтверждение</span>
                                <span>Чек</span>
                            </div>
                        </div>
                        <div class="settingBlock_body">
                        
                        </div>
                    </div>
                `);

                templateText.css('margin-top', '20px');

                for(var _Inv of activeData.investers.invs)
                {
                    var zadoljenost         = "Имеется";
                    var statusOplaty        = "Не оплачено";
                    var podtvergdenie       = "Не подтвержденно";
                    var check               = null;
                    var textCheack          = 'Отсутствует';

                    if(_Inv.commission)
                    {
                        statusOplaty = "Оплачено";
                        if(_Inv.commission.status == "accept") { podtvergdenie = "Отсутствует"; podtvergdenie = "Подтверждено"};
                        if(_Inv.commission.recipient) { textCheack = "Открыть"; check = _Inv.commission.recipient };
                    }

                    var _block = $(`
                        <div class="settingBlock_body_line">
                            <span>${_Inv.inv.invester}</span>
                            <span>${_Inv.inv.data.pay} руб</span>
                            <span><a target="_blank" href="https://cashflo.ru/projects/${_Inv.inv.projectId}/${_Inv.inv.data.document}">Открыть</a></span>
                            <span>${statusOplaty}</span>
                            <span>${podtvergdenie}</span>
                            <span><a target="_blank" href="https://cashflo.ru/projects/${_Inv.inv.projectId}/${check}">${textCheack}</a></span>
                        </div>
                    `);

                    templateText.find('.settingBlock_body').append(_block);
                }

                this.global_block.append(templateText); 

                var templateText = $(`
                    <div class="settingBlock">
                        <div class="settingBlock_header">
                            <p>Поступления</p>
                            <div class="settingBlock_header_line">
                                <span>Инвестор</span>
                                <span>Сумма Инвестиции</span>
                                <span>Чек</span>
                                <span>Статус оплаты</span>
                                <span>Подтверждение</span>
                                <span>Чек</span>
                            </div>
                        </div>
                        <div class="settingBlock_body">
                        
                        </div>
                    </div>
                `);

                templateText.css('margin-top', '20px');

                for(var _Inv of activeData.investers.invsWait)
                {
                    var zadoljenost         = "Имеется";
                    var statusOplaty        = "Не оплачено";
                    var podtvergdenie       = "Не подтвержденно";
                    var check               = null;
                    var textCheack          = 'Отсутствует';

                    if(_Inv.commission)
                    {
                        statusOplaty = "Оплачено";
                        if(_Inv.commission.status == "accept") { podtvergdenie = "Отсутствует"; podtvergdenie = "Подтверждено"};
                        if(_Inv.commission.recipient) { textCheack = "Открыть"; check = _Inv.commission.recipient };
                    }

                    var _block = $(`
                        <div class="settingBlock_body_line">
                            <span>${_Inv.inv.invester}</span>
                            <span>${_Inv.inv.data.pay} руб</span>
                            <span><a target="_blank" href="https://cashflo.ru/projects/${_Inv.inv.projectId}/${_Inv.inv.data.document}">Открыть</a></span>
                            <span>${statusOplaty}</span>
                            <span>${podtvergdenie}</span>
                            <span><a target="_blank" href="https://cashflo.ru/projects/${_Inv.inv.projectId}/${check}">${textCheack}</a></span>
                        </div>
                    `);

                    templateText.find('.settingBlock_body').append(_block);
                }

                this.global_block.append(templateText); 
            };            
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
                    },
                    "settings": function () {
                        _this.renderSettings(getProject);
                    },
                    "redacting": function () {
                        _this.renderRedacting(getProject);
                    },
                };

                renderMore[_GET('more')]();
            }

            $('.index_page_body_data').append(this.global_block);
        }

        async pushDropMenuNotFullpay() 
        {
            var ActionData = await callApi({
                methodName: "version2_notFullPay_data",
                data: _GET('id'),
            });

            var ActionFullMoney     = 0;
            var ActionMoney         = 0;
            var ActionFiveMoney     = 0;
            var ActionInWorkMoney   = 0;
            var ActionAcceptmoney   = 0;

            ActionData.invs.forEach((element, initNumber) => {
                if(typeof element.applicationRequest == "undefined") 
                {
                    ActionMoney = ActionMoney + Number(element.data.pay.toString().trim().RedactingNumber());
                };

                if(Number(element.data.pay.toString().replace(/\s/g, '')) >= 5000000 && typeof element.applicationRequest == "undefined") {
                    ActionFiveMoney = ActionFiveMoney + Number(element.data.pay.toString().trim().RedactingNumber());
                };

                if(typeof element.applicationRequest != "undefined" && element.applicationRequest) {
                    ActionInWorkMoney = ActionInWorkMoney + Number(element.data.pay.toString().trim().RedactingNumber());
                };

                if(typeof element.applicationRequest != "undefined" && !element.applicationRequest) {
                    ActionAcceptmoney = ActionAcceptmoney + Number(element.data.pay.toString().trim().RedactingNumber());
                };

                ActionFullMoney = ActionFullMoney + Number(element.data.pay.toString().trim().RedactingNumber());
            });

            var headerMenuBlock = $(`
                <div class="version2_myProjects_header" style="margin-top: 40px;">
                    <div class="version2_default_bkg row_default"></div>
                    <div class="version2_myProjects_header_row">
                        <div class="info_block_project">
                            <div class="info_block_project_row">
                                <span>Общая сумма всех инвестиций</span>
                                <span>-</span>
                                <span>${ActionFullMoney.toString().ReplaceNumber()} руб.</span>
                            </div>
                        </div>
                        <div class="settingBlock" style="margin-bottom: 20px; margin-top: 0;">
                            <div class="settingBlock_header">
                                <div class="invester_status_projects_status_first">
                                    <div class="invester_status_projects_status_first_line">
                                        <span>Инвестиции</span>
                                        <a>${ActionMoney.toString().ReplaceNumber()} руб.</a>
                                        <span>Выше 5 млн рублей</span>
                                        <a>${ActionFiveMoney.toString().ReplaceNumber()} руб</a>
                                    </div>
                                    <div class="invester_status_projects_status_first_line">
                                        <span>В работе</span>
                                        <a>${ActionInWorkMoney.toString().ReplaceNumber()} руб</a>
                                        <span>Подтвержденные</span>
                                        <a>${ActionAcceptmoney.toString().ReplaceNumber()} руб</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `);

            var menuBlock = $(`
                <div class="version2_settings_notFullPay_settings">
                    <div class="version2_settings_notFullPay_settings_header">
                        <div class="version2_settings_notFullPay_settings_header_buttons selected" data="default">
                            <div class="version2_default_bkg row_default"></div>
                            <span>Инвестиции</span>
                        </div>
                        <div class="version2_settings_notFullPay_settings_header_buttons" data="five">
                            <div class="version2_default_bkg row_default"></div>
                            <span>Выше 5 млн рублей</span>
                        </div>
                        <div class="version2_settings_notFullPay_settings_header_buttons" data="wait">
                            <div class="version2_default_bkg row_default"></div>
                            <span>В работе</span>
                        </div>
                        <div class="version2_settings_notFullPay_settings_header_buttons" data="accept">
                            <div class="version2_default_bkg row_default"></div>
                            <span>Подтвержденные</span>
                        </div>
                    </div>
                </div>
            `);

            menuBlock.find('.version2_settings_notFullPay_settings_header_buttons').click( function() {
                $('.version2_settings_notFullPay_settings_header_buttons').removeClass('selected');
                $(this).addClass('selected');
                $('.settingBlockDropMenuMore').remove();
                functionByMenuBLock[$(this).attr('data')]();
            });

            this.global_block.append(headerMenuBlock); 
            this.global_block.append(menuBlock); 

            var cheackStaticPush    = false;
            var _this               = this;
            var functionByMenuBLock = 
            {
                "default": function() 
                {
                    var settingBlock = $(`
                        <div class="settingBlockDropMenuMore">
                            <div class="settingBlockDropMenuMoreBody">
                                <div class="settingBlock">
                                    <div class="version2_settingBlock_header">
                                        <p>Доступные проекты <div class="version2_settingBlock_header_settings_moreMoney"></div></p>
                                    </div>
                                    <div class="version2_default_bkg row_default"></div>
                                    <div class="settingBlock_header">
                                        <div class="settingBlock_header_line">
                                            <span>#</span>
                                            <span>id</span>
                                            <span>Сумма</span>
                                            <span>Выбор</span>
                                            <span>Действие</span>
                                            <span>Перейти</span>
                                        </div>
                                    </div>
                                    <div class="settingBlock_body">

                                    </div>
                                </div>
                            </div>
                            <div class="settingBlockDropMenuMoreMenu">

                            </div>
                        </div>
                    `);

                    var ActionInvs = [];

                    ActionData.invs.forEach((element, initNumber) => {
                        if(typeof element.applicationRequest == "undefined") {
                            ActionInvs.push(element);
                        }
                    });

                    ActionInvs.forEach((element, initNumber) => {
                        var template_text = $(`
                            <div class="settingBlock_body_line" data="${element._id}" data-pay="${element.data.pay}">
                                <span>${initNumber}</span>
                                <span>${element.invester}</span>
                                <span>${element.data.pay} ₽</span>
                                <span><input type="checkbox" class="version2_activ_projects_lineCheackBox"></span>
                                <span><span class="version2ButtonGradient1 settingBlock_wait settingBlock_block settingBlock_accept">Подтвердить</span></span>
                                <span><span class="version2ButtonGradient1 settingBlock_wait settingBlock_block settingBlock_accept_more">Посмотреть</span></span>
                            </div>
                        `);

                        template_text.find('.settingBlock_accept_more').click( function() {
                            window.open(`https://cashflo.ru/?page=activ_projects&id=${$(this).parent().parent().attr('data')}`, "_blank")
                        });

                        template_text.find('input[type="checkbox"]').change( function() {

                            var ActionNumber = 0;

                            $('.settingBlock_body_line').each((i, element) => {
                                if($(element).find('input[type="checkbox"]').is(':checked')) {
                                    ActionNumber = ActionNumber + Number($(element).attr('data-pay').toString().RedactingNumber());
                                };
                            });

                            if(ActionNumber != 0)
                            {
                                $('.version2_settingBlock_header_settings_moreMoney').html("Выбрано: " + ActionNumber.toString().ReplaceNumber() + " Р");
                            }
                            else
                            {
                                $('.version2_settingBlock_header_settings_moreMoney').html("");
                            }
                        });

                        template_text.find('.settingBlock_accept').click( async function() {

                            var ActionArray = [];

                            $('.settingBlock_body_line').each((i, element) => {
                                if($(element).find('input[type="checkbox"]').is(':checked')) {
                                    ActionArray.push($(element).attr('data'));
                                }
                            });

                            await callApi({
                                methodName: "version2_notFullPay_relocation_data",
                                data: ActionArray,
                            });

                            alert("Успешно!");
                            location.reload();
                        });

                        settingBlock.find(".settingBlock_body").append(template_text);
                    });

                    if(!cheackStaticPush) {
                        _this.global_block.append(settingBlock); 
                        cheackStaticPush = true;
                    } else {
                        $('.global_block').append(settingBlock);
                    }
                },
                "five": function() 
                {
                    var settingBlock = $(`
                        <div class="settingBlockDropMenuMore">
                            <div class="settingBlockDropMenuMoreBody">
                                <div class="settingBlock">
                                    <div class="version2_settingBlock_header">
                                        <p>Доступные проекты</p>
                                    </div>
                                    <div class="version2_default_bkg row_default"></div>
                                    <div class="settingBlock_header">
                                        <div class="settingBlock_header_line">
                                            <span>#</span>
                                            <span>id</span>
                                            <span>Сумма</span>
                                            <span>Выбор</span>
                                            <span>Действие</span>
                                            <span>Перейти</span>
                                        </div>
                                    </div>
                                    <div class="settingBlock_body">

                                    </div>
                                </div>
                            </div>
                            <div class="settingBlockDropMenuMoreMenu">

                            </div>
                        </div>
                    `);

                    var ActionInvs = [];

                    ActionData.invs.forEach((element, initNumber) => {
                        if(Number(element.data.pay.toString().replace(/\s/g, '')) >= 5000000 && typeof element.applicationRequest == "undefined") {
                            ActionInvs.push(element);
                        };
                    });

                    ActionInvs.forEach((element, initNumber) => {
                        var template_text = $(`
                            <div class="settingBlock_body_line" data="${element._id}">
                                <span>${initNumber}</span>
                                <span>${element.invester}</span>
                                <span>${element.data.pay} ₽</span>
                                <span><input type="checkbox" class="version2_activ_projects_lineCheackBox"></span>
                                <span><span class="version2ButtonGradient1 settingBlock_wait settingBlock_block settingBlock_accept">Подтвердить</span></span>
                                <span><span class="version2ButtonGradient1 settingBlock_wait settingBlock_block settingBlock_accept_more">Посмотреть</span></span>
                            </div>
                        `);

                        template_text.find('.settingBlock_accept_more').click( function() {
                            window.open(`https://cashflo.ru/?page=activ_projects&id=${$(this).parent().parent().attr('data')}`, "_blank")
                        });

                        template_text.find('.settingBlock_accept').click( async function() {

                            var ActionArray = [];

                            $('.settingBlock_body_line').each((i, element) => {
                                if($(element).find('input[type="checkbox"]').is(':checked')) {
                                    ActionArray.push($(element).attr('data'));
                                }
                            });

                            await callApi({
                                methodName: "version2_notFullPay_relocation_data",
                                data: ActionArray,
                            });

                            alert("Успешно!");
                            location.reload();
                        });

                        settingBlock.find(".settingBlock_body").append(template_text);
                    });

                    $('.global_block').append(settingBlock);
                },
                "wait": function() 
                {
                    var settingBlock = $(`
                        <div class="settingBlockDropMenuMore">
                            <div class="settingBlockDropMenuMoreBody">
                                <div class="settingBlock">
                                    <div class="version2_settingBlock_header">
                                        <p>Доступные проекты</p>
                                    </div>
                                    <div class="version2_default_bkg row_default"></div>
                                    <div class="settingBlock_header">
                                        <div class="settingBlock_header_line">
                                            <span>#</span>
                                            <span>id</span>
                                            <span>Сумма</span>
                                            <span>Перейти</span>
                                        </div>
                                    </div>
                                    <div class="settingBlock_body">

                                    </div>
                                </div>
                            </div>
                            <div class="settingBlockDropMenuMoreMenu">

                            </div>
                        </div>
                    `);

                    var ActionInvs = [];

                    ActionData.invs.forEach((element, initNumber) => {
                        if(typeof element.applicationRequest != "undefined" && element.applicationRequest) {
                            ActionInvs.push(element);
                        };
                    });

                    ActionInvs.forEach((element, initNumber) => {
                        var template_text = $(`
                            <div class="settingBlock_body_line" data="${element._id}">
                                <span>${initNumber}</span>
                                <span>${element.invester}</span>
                                <span>${element.data.pay} ₽</span>
                                <span><span class="version2ButtonGradient1 settingBlock_wait settingBlock_block settingBlock_accept_more">Посмотреть</span></span>
                            </div>
                        `);

                        template_text.find('.settingBlock_accept_more').click( function() {
                            window.open(`https://cashflo.ru/?page=activ_projects&id=${$(this).parent().parent().attr('data')}`, "_blank")
                        });

                        settingBlock.find(".settingBlock_body").append(template_text);
                    });

                    $('.global_block').append(settingBlock);
                },
                "accept": function() 
                {
                    var settingBlock = $(`
                        <div class="settingBlockDropMenuMore">
                            <div class="settingBlockDropMenuMoreBody">
                                <div class="settingBlock">
                                    <div class="version2_settingBlock_header">
                                        <p>Доступные проекты</p>
                                    </div>
                                    <div class="version2_default_bkg row_default"></div>
                                    <div class="settingBlock_header">
                                        <div class="settingBlock_header_line">
                                            <span>#</span>
                                            <span>id</span>
                                            <span>Сумма</span>
                                            <span>Перейти</span>
                                        </div>
                                    </div>
                                    <div class="settingBlock_body">

                                    </div>
                                </div>
                            </div>
                            <div class="settingBlockDropMenuMoreMenu">

                            </div>
                        </div>
                    `);

                    var ActionInvs = [];

                    ActionData.invs.forEach((element, initNumber) => {
                        if(typeof element.applicationRequest != "undefined" && !element.applicationRequest) {
                            ActionInvs.push(element);
                        };
                    });

                    ActionInvs.forEach((element, initNumber) => {
                        var template_text = $(`
                            <div class="settingBlock_body_line" data="${element._id}">
                                <span>${initNumber}</span>
                                <span>${element.invester}</span>
                                <span>${element.data.pay} ₽</span>
                                <span><span class="version2ButtonGradient1 settingBlock_wait settingBlock_block settingBlock_accept_more">Посмотреть</span></span>
                            </div>
                        `);

                        template_text.find('.settingBlock_accept_more').click( function() {
                            window.open(`https://cashflo.ru/?page=activ_projects&id=${$(this).parent().parent().attr('data')}`, "_blank")
                        });

                        settingBlock.find(".settingBlock_body").append(template_text);
                    }); 

                    $('.global_block').append(settingBlock);
                },
            };

            $('.settingBlockDropMenuMore').remove();
            functionByMenuBLock["default"]();
        };
    };

    class all_users
    {
        constructor() {
            this.globalBlock = $(`
                <div class="usersAdminBlock">

                </div>
            `)
        };

        async renderUser()
        {
            var templateText = $(`
                <div class="usersAdminBlock_user">
                    <div class="usersAdminBlock_user_row">
                        <div class="usersAdminBlock_user_img">
                            <div class="usersAdminBlock_user_img_row">
                                <img src="" alt="">
                            </div>
                        </div>
                        <span class="usersAdminBlock_user_h1">Выберите пользователя</span>
                    </div>
                </div>
            `);

            this.globalBlock.append(templateText);
        };

        async showUser(_id)
        {
            var allUsersGetOne = await callApi({
                methodName: "allUsersGetOne",
                data: _id,
            });

            $('.usersAdminBlock_user_img_row img').attr('src', allUsersGetOne.Photo);
            $('.usersAdminBlock_user_h1').html(allUsersGetOne.User.first_name);
            $('.usersAdminBlock_user_first_parse').remove();

            var first_parseBlock = $(`
                <div class="usersAdminBlock_user_first_parse">
                    <div class="usersAdminBlock_user_first_parse_line">
                        <span>Кол-во инвестиций:</span>
                        <a>${allUsersGetOne.InvsGet}</a>
                    </div>
                    <div class="usersAdminBlock_user_first_parse_line">
                        <span>Кол-во проектов:</span>
                        <a>${allUsersGetOne.ProjectsGet}</a>
                    </div>
                </div>
            `);

            $('.usersAdminBlock_user_row').append(first_parseBlock);

            if(typeof allUsersGetOne.User.first_parse != "undefined")
            {
                var phone   = allUsersGetOne.User.first_parse.phone;
                var watsapp = allUsersGetOne.User.first_parse.watsapp;
                var mail    = allUsersGetOne.User.first_parse.mail;

                var first_parseBlock = $(`
                    <div class="usersAdminBlock_user_first_parse">
                        <div class="usersAdminBlock_user_first_parse_line">
                            <span>Телефон:</span>
                            <a>${phone}</a>
                        </div>
                        <div class="usersAdminBlock_user_first_parse_line">
                            <span>WatsApp:</span>
                            <a>${watsapp}</a>
                        </div>
                        <div class="usersAdminBlock_user_first_parse_line">
                            <span>e-mail</span>
                            <a>${mail}</a>
                        </div>
                    </div>
                `);

                $('.usersAdminBlock_user_row').append(first_parseBlock);
            }
        }

        async renderBody()
        {
            var _this       = this;
            var allUsers    = await callApi({
                methodName: "allUsers",
                data: null,
            });

            var templateText = $(`
                <div class="settingBlock">
                    <div class="settingBlock_header">
                        <p>Пользавтели</p>
                        <div class="settingBlock_header_line">
                            <span>#</span>
                            <span>ID Инвестора</span>
                            <span>ФИО</span>
                            <span>Тип</span>
                            <span>Данные</span>
                            <span>Стать пользователем</span>
                        </div>
                    </div>
                    <div class="settingBlock_body">
                       
                    </div>
                </div>
            `);

            templateText.css('width', 'calc(92% - 40px');
            templateText.css('margin', '0 auto');
            templateText.css('flex', '3');
            templateText.css('margin-right', '20px');
            templateText.css('height', 'fit-content');

            allUsers.forEach( function (user, i) {
                var userLine = $(`
                    <div class="settingBlock_body_line" data="${user._id}" data-more="41">
                        <span>${i + 1}</span>
                        <span>${user.user}</span>
                        <span>${user.first_name}</span>
                        <span>${user.type}</span>
                        <span>Посотреть</span>
                        <span>Открыть</span>
                    </div>
                `);

                userLine.children('span').eq(4).click(async function() {
                    var _id = $(this).parent().attr('data');
                    await _this.showUser(_id);
                });

                userLine.children('span').eq(5).click(async function() {
                    var _id = $(this).parent().attr('data');
                    location.href = `/?user=${_id}`;
                });

                templateText.find('.settingBlock_body').append(userLine);
            });

            this.globalBlock.append(templateText);
        }

        async render()
        {
            await this.renderUser();
            await this.renderBody();

            $('.index_page_body_data').append(this.globalBlock);
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

            for(var invData of allInvestings)
            {
                var templateText = $(`
                    <div class="settingBlock_opener">
                        <div class="settingBlock_opener_row">
                            <span>${invData.project._id}</span>
                            <span>${invData.project.data.name}</span>
                            <i class="fal fa-chevron-down"></i>
                        </div>
                        <div class="settingBlock_opener_menu">

                        </div>
                    </div>
                `);

                templateText.css('width', 'calc(92% - 40px');
                templateText.css('margin', '0 auto');

                templateText.click( function() {
                    $(this).find('.settingBlock_opener_menu').slideToggle();
                })

                for(var invInvester of invData.invs)
                {
                    var menuBlock = $(`
                        <div class="settingBlock_opener_menu_line">
                            <span>${invInvester.invester}</span>
                            <span>${invInvester.status}</span>
                            <span>${invInvester.data.type}</span>
                            <span>${invInvester.data.pay} руб</span>
                        </div>
                    `);

                    templateText.find('.settingBlock_opener_menu').append(menuBlock);
                }

                $('.index_page_body_data').append(templateText);
            }
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