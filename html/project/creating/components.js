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

    global.add_blocks = 2;

    class components {

        constructor() 
        {

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
                if(extension === 'MP4'
                    || extension === 'MPEG'
                    || extension === 'MPEG-1'
                    || extension === 'MPEG-2'
                    || extension === 'MPEG-3'
                    || extension === 'MPEG-4'
                ){
                    alert('Неверный формат: ' + extension + '. Видео запрещенно.');
                    return;
                }
            }

            if(file_id == 'file+3')
            {
                if(extension === 'MP4'
                    || extension === 'MPEG'
                    || extension === 'MPEG-1'
                    || extension === 'MPEG-2'
                    || extension === 'MPEG-3'
                    || extension === 'MPEG-4'
                ){
                    alert('Неверный формат: ' + extension + '. Видео запрещенно.');
                    return;
                }
            }

            if(file_id == 'file+3_1')
            {
                if(extension === 'MP4'
                    || extension === 'MPEG'
                    || extension === 'MPEG-1'
                    || extension === 'MPEG-2'
                    || extension === 'MPEG-3'
                    || extension === 'MPEG-4'
                ){
                    alert('Неверный формат: ' + extension + '. Видео запрещенно.');
                    return;
                }
            }
            
            if(file_id == 'file+3_3')
            {
                if(extension === 'MP4'
                    || extension === 'MPEG'
                    || extension === 'MPEG-1'
                    || extension === 'MPEG-2'
                    || extension === 'MPEG-3'
                    || extension === 'MPEG-4'
                ){
                    alert('Неверный формат: ' + extension + '. Видео запрещенно.');
                    return;
                }
            }
            
            if(file_id == 'file+3_2')
            {
                if(extension === 'MP4'
                    || extension === 'MPEG'
                    || extension === 'MPEG-1'
                    || extension === 'MPEG-2'
                    || extension === 'MPEG-3'
                    || extension === 'MPEG-4'
                ){
                    alert('Неверный формат: ' + extension + '. Видео запрещенно.');
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
        }

        async load_file_redacting_registration_document(_this, _id)
        {
            var _form    = new FormData();

            _form.append('files', $(_this.files)[0]);
            _form.append('_id', _id);
            _form.append('_pts', $(_this.files)[0].type);

            var _url = `${getURL()}/file_registration_document.io/files`;

            var _file = _form;

            axios.post(_url, _file, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then(data => {
                if(data.data.status == "ok") {
                    $('.index_page').empty();
                    $('.preloader').fadeIn( function() {
                        $('.preloader').fadeOut( function() {
                            $('.end_get_project').css('display', "flex");
                        });
                    });
                }
            })
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
                    <div class="body_point_line" data="string">
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

                if(typeof data.bess != 'undefined') {
                    _line.find(`#${data._id}`).keyup(function(e) {
                        if(e.keyCode < 91 && e.keyCode > 64) 
                        {
                            $(this).val('Бессрочно');
                        }

                        if(e.keyCode == 8) 
                        {
                            $(this).val('');
                        }
                    });

                    _line.find(`#${data._id}`).keydown(function(e) {
                        if($(this).val() == "Бессрочно") {
                            $(this).val('Бессрочно');
                        }
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
                    <div class="body_point_line _file" data="file">
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
                    <div class="body_point_line _menu" data="menu">
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
                    <div class="body_point_line" data="date">
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
                    <div class="body_point_line" data="addr">
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
            },
            "add_more_sob": function(data)
            {
                var _this = this;

                var _line = $(`
                    <div class="body_point_line">
                        <div class="body_point_line_add_more_sob">
                            <span>Добавить собственника +</span>
                        </div>
                    </div>
                `);

                _line.click( function() 
                {
                    // FILE ===========================================
                    var _element    = window.structCreator.filter(function (obj) { return obj.header == "4. Скан паспорта" })[0];
                    var _body       = $(`<div class="body_point"></div>`);
                    var _dataBlock  = _element.body;

                    if(_element.header.length > 0)
                    {
                        _body.append(`
                            <div class="body_point_header">
                                <div class="body_point_header_close_two_block">
                                    <i class="fal fa-times"></i>
                                </div>
                                <span>Скан паспорта дополнительного собственника: ${global.add_blocks}</span>
                            </div>
                        `);

                        _body.find('.body_point_header_close_two_block').click( function() {
                            var _inexBlock = $(this).parent().parent().index();
                            $('.body_point').eq(_inexBlock).remove();
                            $('.body_point').eq(_inexBlock).remove();

                            global.add_blocks = global.add_blocks - 1;
                        })
                    }
    
                    _dataBlock.forEach(element => 
                    {
                        element._id = `BB#${element._id}_${global.add_blocks}`;
                        _body.append(_this.file(element));
                    });
                    $(_line.parent()).before(_body);

                    // BLOCK ========================================
                    var _element    = window.structCreator.filter(function (obj) { return obj.header == "4. Данные собстевенника" })[0];
                    var _body       = $(`<div class="body_point"></div>`);
                    var _dataBlock  = _element.body;
                    console.log(_element);
                    if(_element.header.length > 0)
                    {
                        _body.append(`
                            <div class="body_point_header">
                                <span>Данные дополнительного собственника: ${global.add_blocks}</span>
                            </div>
                        `);
                    }
                    _dataBlock.forEach(element => 
                    {
                        element._id = `BB#${element._id}_${global.add_blocks}`;
                        _body.append(_this.string(element));
                    });
                    $(_line.parent()).before(_body);

                    global.add_blocks = global.add_blocks + 1;
                    
                    global.changeTextArea();
                })

                return _line;
            }
        }

        async render(param) 
        {
            $('.index_page_body_points').empty();
            $('.index_page_header_user').css('display', 'none');
            $('.index_page_body_header_type span').css('display', "none");
            $(`.index_page_body_header_type span[data="${global._User.creatingData.type}"]`).css('display', "flex");

            var uploadFile = 
            {
                "ur": function() {
                    return new Promise((resolve,reject) => 
                    {
                        global.loadResources(['./JSON/ur.js'], () => {
                            resolve();
                        });
                    });
                },
                "fiz": function() {
                    return new Promise((resolve,reject) => 
                    {
                        global.loadResources(['./JSON/fiz.js'], () => {
                            resolve();
                        });
                    });
                },
                "ip": function() {
                    return new Promise((resolve,reject) => 
                    {
                        global.loadResources(['./JSON/ip.js'], () => {
                            resolve();
                        });
                    });
                }
            }

            if(param == 3)
            {
                await uploadFile['fiz']();
            } else if(param == 1)
            {
                await uploadFile['ur']();
            } else {
                await uploadFile['ip']();
            }

            for (var key in window.structCreator) 
            {
                var data        = window.structCreator[key];
                var _body       = $(`<div class="body_point"></div>`);
                var _this       = this;
                var _dataBlock  = data.body;

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

                if(data.header.length > 0)
                {
                    _body.append(`
                        <div class="body_point_header">
                            <span>${data.header}</span>
                        </div>
                    `);
                }

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

            var _block = $(`
                <div class="body_point_adder_document_block">
                    <div class="body_point_adder_document_block_logo">
                        <img src="./imgs/Google_Docs_logo.png" alt="">
                    </div>
                    <div class="body_point_adder_document_block_buttons">
                        <div class="body_point_adder_document_block_buttons_row">
                            <div class="body_point_line_header_text">
                                <input class="file_load" id='signature_mass' type='file'>
                            </div>
                            <div class="body_point_adder_document_block_buttons_button" data="download">
                                <span>Скачать договор</span>
                            </div>
                            <div class="body_point_adder_document_block_buttons_button" data="upload">
                                <span>Загрузить подписаный</span>
                            </div>
                        </div>
                    </div>
                </div>
            `);

            _block.find('.body_point_adder_document_block_buttons_button[data="download"]').click( function() {
                window.open(`https://invester-relocation.site/projects/${_project._id}/${_project.signature_document.document}`, "_blank");
            })

            _block.find('.body_point_adder_document_block_buttons_button[data="upload"]').click( function() {
                $(this).parent().find('input').trigger('click');
            })

            $('.index_page_body_points').append(_block);
        }

        render_registration_document(_project) 
        {
            var _block = $(`
                <div class="body_point_adder_document_block">
                    <div class="body_point_adder_document_block_logo">
                        <img src="./imgs/Google_Docs_logo.png" alt="">
                    </div>
                    <div class="body_point_adder_document_block_buttons">
                        <div class="body_point_adder_document_block_buttons_row">
                            <div class="body_point_line_header_text">
                                <input class="file_load" id='signature_mass' type='file'>
                            </div>
                            <div class="body_point_adder_document_block_buttons_button" data="download">
                                <span>Скачать договор</span>
                            </div>
                            <div class="body_point_adder_document_block_buttons_button" data="upload">
                                <span>Загрузить подписаный</span>
                            </div>
                        </div>
                    </div>
                </div>
            `);

            _block.find('.body_point_adder_document_block_buttons_button[data="download"]').click( function() {
                window.open(`https://invester-relocation.site/projects/${_project._id}/${_project.registrationDocument.document}`, "_blank");
            })

            _block.find('.body_point_adder_document_block_buttons_button[data="upload"]').click( function() {
                $(this).parent().find('input').trigger('click');
            })

            $('.index_page_body_points').append(_block);
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

            correctArray.organization = param;

            $('.index_page_body_points .body_point .body_point_line').each((i, element) => {

                var _attr = $(element).attr('data');

                var FUN = 
                {
                    string: function(element) 
                    {   
                        correctArray[$(element).find('input').attr('id')] = {
                            data: $(element).find('input').val(),
                            type: "string"
                        };
                    },
                    file: function(element)
                    {
                        correctArray[$(element).find('input').attr('id')] = {
                            data: $(element).find('.loader_input').attr('data'),
                            type: "file"
                        }
                    },
                    menu: function(element)
                    {
                        correctArray[$(element).find('input').attr('id')] = {
                            data: $(element).find('.menu_block span').text(),
                            type: "menu"
                        }
                    },
                    addr: function(element)
                    {
                        correctArray[$(element).find('input').attr('id')] = {
                            data: $(element).find('input').val(),
                            type: "addr"
                        }
                    },
                    date: function(element)
                    {
                        correctArray[$(element).find('input').attr('id')] = {
                            data: $(element).find('input').val(),
                            type: "date"
                        }
                    }
                };

                if(_attr)
                {
                    FUN[_attr](element);
                }
            });

            console.log(correctArray);

            for(var key in correctArray)
            {
                if(key == "syte") continue;
                if(key == "organization") continue;
                if(correctArray[key].type == 'file') continue;
                if(typeof correctArray[key].data == "undefined")
                {
                    alert('Введите все данные!');
                    return;
                }
                if(correctArray[key].data.length == 0 || correctArray[key].data == null) {
                    alert('Введите все данные!');
                    return;
                }
                if(key == "rate") {correctArray[key].data = (correctArray[key].data.replace(/,/, '.') * 12).toFixed(2)};
            }

            $('.index_page').fadeOut();
            $('.preloader').fadeIn();

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