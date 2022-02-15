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
                        <i class="fal fa-file-chart-line"></i>
                        <p>Поданные данные</p>
                    </span>
                    <span data="info">
                        <i class="fal fa-database"></i>
                        <p>О компании</p>
                    </span>
                    <span data="redacting">
                        <i class="fal fa-sliders-v"></i>
                        <p>Проект</p>
                    </span>
                    <span data="more">
                        <i class="fal fa-info-square"></i>
                        <p>Юридические данные</p>
                    </span>
                    <span data="settings">
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

            var _this = this;

            if(_project.signature) 
            {
                var _lenth = Object.keys(_project.signature).length;

                if(_lenth > 1)
                {
                    var putDocumentToSignature = $(`
                        <div class="Attracted_headerInfoBlock">
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
                        <div class="Attracted_headerInfoBlock Attracted_headerInfoBlock_moreDataNoShow">
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
                        await callApi({
                            methodName: 'setCorrectionForProject',
                            data: _GET("id"),
                        });
                        alert('Успешно');
                        location.reload();
                    })

                    putDocumentToSignature.find('input[type=file]').change( async function() 
                    {
                        var filename = $(this.files)[0].name;
                        var aux = filename.split('.');
                        var extension = aux[aux.length -1].toUpperCase();
   
                        var _form    = new FormData();

                        _form.append('files', $(this.files)[0]);
                        _form.append('_id', _project._id);
                        _form.append('_pts', extension);
                        _this.setSignatureFile(_project._id, _form);

                        alert('Успешно!');
                        location.reload();
                    });

                    this.global_block.append(putDocumentToSignature);
                    this.global_block.append(putDocumentToSignatureAddMore);

                    if(_project.signature_document) {
                        if(_project.signature_document.status == 'on') 
                        {
                            this.global_block.find('.Attracted_headerInfoBlock_block[data="loader"]').find('span').html('Документ подписан бизнесом');
                            this.global_block.find('.Attracted_headerInfoBlock_block[data="loader"]').find('p').html(`Посмотреть`);
                            this.global_block.find('.Attracted_headerInfoBlock_block[data="loader"]').click( function() {
                                window.open(`https://invester-relocation.site/projects/${_project._id}/${_project.signature_document.user_document}`, '_blank');
                            })
                        } else 
                        {
                            this.global_block.find('.Attracted_headerInfoBlock_block[data="loader"]').find('span').html('Документ отправлен бизнесу');
                            this.global_block.find('.Attracted_headerInfoBlock_block[data="loader"]').find('p').html(`Посмотреть`);
                            this.global_block.find('.Attracted_headerInfoBlock_block[data="loader"]').click( function() {
                                window.open(`https://invester-relocation.site/projects/${_project._id}/signature_document.pdf`, '_blank');
                            })
                            this.global_block.find('.Attracted_headerInfoBlock_block[data="dell"]').find('p').html(`Удалить`);
                            this.global_block.find('.Attracted_headerInfoBlock_block[data="dell"]').click( function() {
                                _this.dellSignatureFile(_project._id);
                                alert("Успешно");
                                location.reload();
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

                    signature[_type].body.forEach( function(element) {
                        
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
            if(_project.YT_VIDEO)
            {
                var yt_data = JSON.parse(_project.YT_VIDEO[3])

                var tamplateText = $(`
                    <div class="upload_video_block">
                        <h1>Загруженное видео</h1>
                        <iframe width="560" height="315" src="https://www.youtube.com/embed/${yt_data.id}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    </div>
                `);

                this.global_block.append(tamplateText);
            } else 
            {
                var _description = `${_project.data.name} № ${_project._id}\n${_project.data.target}\nСтавка ${_project.data.rate}% годовых\nВыплаты ${_project.data.date_payments}\nВход от ${_project.data.minimal_amount} руб.\nПодробнее о предложении в телеграм канале - https://t.me/invester_official
                `.toString().trim();

                var tamplateText = $(`
                    <div class="upload_video_block">
                        <h1>Загрузка видео на YouTube</h1>
                        <video controls="controls" src="https://invester-relocation.site/projects/${_project._id}/${_project.data['file+8']}"></video>
                        <div class="upload_video_block_unputs">
                            <div class="upload_video_block_unputs_text" id="upload_video_name" contenteditable="true" style="white-space: pre-line">${_project.data.name} № ${_project._id}</div>
                            <textarea class="upload_video_block_unputs_text" id="upload_video_description">${_description}</textarea>
                        </div>
                    </div>
                    <div class="upload_video_block_button_row">
                        <div class="upload_video_block_button">
                            <span>Загрузить видео</span>
                        </div>
                    </div>
                `);

                tamplateText.find('.upload_video_block_button').click( async function () {
                    var _name = $('#upload_video_name').html();
                    var _description = $('#upload_video_description').val();

                    alert('Видео отправленно на загрузку, дождитесь его публикации');

                    var setYouTubeVideo = await callApi({
                        methodName: "setYouTubeVideo",
                        data: {
                            projectId: _project._id,
                            name: _name,
                            description: _description,
                        },
                    });


                    alert(setYouTubeVideo);

                    location.reload();
                })

                this.global_block.append(tamplateText);
            }
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

            if(typeof _project.registrationDocument == 'undefined')
            {
                var firstBlockMore = $(`
                    <div class="body_point">
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

                    alert('Успешно!');
                    location.reload(); 
                });

                this.global_block.append(firstBlockMore);
            } else 
            {
                if(_project.registrationDocument.status == "on")
                {
                    var firstBlockMore = $(`
                        <div class="body_point">
                            <div class="body_point_header">
                                <span>Договор бизнеса с InvestER</span>
                            </div>
                            <div class="body_point_line_block_more_registration_business">
                                <st>Посмотреть</st>
                            </div>
                        </div>
                    `);

                    firstBlockMore.css("padding-bottom", "20px");

                    firstBlockMore.find('st').click( function() {
                        window.open(`https://invester-relocation.site/projects/${_project._id}/${_project.registrationDocument.user_document}`, "_blank")
                    });

                    this.global_block.append(firstBlockMore);
                }
            }

            var firstBlockMore = $(`
                <div class="body_point">
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
                    <div class="body_point_header">
                        <span>Редактирование Кратности</span>
                    </div>
                    <div class="body_point_line_block_more">
                        <div class="body_point_line body_point_line_first" data="multiplicity">
                            <span>Выбранная кратность:</span>
                            <p>0</p>
                        </div>
                        <div class="body_point_line body_point_line_input" data="multiplicity">
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
                var _text = $(this).parent().find("textarea").val();

                callApi({
                    methodName: 'redactingLineSettingsPageGlobalMultiplicity',
                    data: {
                        projectId: _GET('id'),
                        data: _text,
                    },
                });

                $(this).parent().fadeOut( function() 
                {
                    $(this).parent().find(".body_point_line_first p").html(Number(_text).toDivide());
                    $(this).parent().find(".body_point_line_first").fadeIn();
                });
            })

            this.global_block.append(firstBlockMore);

            var activeData = await callApi({
                methodName: "activeDataProject",
                data: _GET("id"),
            });

            global_block.append($(`<h1>Кто привлек проект</h1>`));

            var _block = 
            $(`
                <div class="structCreator_new_block"">
                    <div class="structCreator_new_block_row">
                        <span>ID</span>
                        <a>
                            <BB>${activeData.whoGet}</BB>
                        </a>
                    </div>
                </div>
            `);

            global_block.append(_block);   

            global_block.append($(`<h1>Инвестиции</h1>`));

            var templateText = $(`
                <div class="settingBlock">
                    <div class="settingBlock_header">
                        <p>Инвестиции в проект</p>
                        <div class="settingBlock_header_line">
                            <span>Инвестор</span>
                            <span>Сумма Инвестиции</span>
                            <span>Чек</span>
                            <span>Задолженость</span>
                            <span>Статус оплаты</span>
                            <span>Подтверждение</span>
                            <span>Чек</span>
                        </div>
                    </div>
                    <div class="settingBlock_body">
                       
                    </div>
                </div>
            `);

            templateText.css('margin', '35px 0');

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
                        <span><a target="_blank" href="https://invester-relocation.site/projects/${_Inv.inv.projectId}/${_Inv.inv.data.document}">Открыть</a></span>
                        <span>${zadoljenost}</span>
                        <span>${statusOplaty}</span>
                        <span>${podtvergdenie}</span>
                        <span><a target="_blank" href="https://invester-relocation.site/projects/${_Inv.inv.projectId}/${check}">${textCheack}</a></span>
                    </div>
                `);

                templateText.find('.settingBlock_body').append(_block);
            }

            global_block.append(templateText); 
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

            templateText.css('width', 'calc(92% - 40px');
            templateText.css('margin', '0 auto');

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