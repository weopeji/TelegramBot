

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

    class redacting_page_more
    {
        constructor() {

        };

        async getPAgeOfData(organization)
        {
            return new Promise((resolve,reject) =>
            {
                if(organization == 3)
                {
                    global.loadResources(['../html/project/creating/JSON/fiz.js'], () => {
                        resolve();
                    });
                } else if(organization == 2) {
                    global.loadResources(['../html/project/creating/JSON/ur.js'], () => {
                        resolve();
                    });
                } else if(organization == 1) {
                    global.loadResources(['../html/project/creating/JSON/ur.js'], () => {
                        resolve();
                    });
                }
            });
        }

        async renderRedacting(_project, global_block)
        {
            return new Promise(async (resolve,reject) =>
            {
                var _block = 
                $(`
                    <div class="parcing_again_block">
                        <div class="parcing_again_block_row">
                            <span>Запросить перепарсинг данных</span>
                        </div>
                    </div>
                `);

                _block.find(".parcing_again_block_row").click( function() 
                {
                    callApi({
                        methodName: 'redactingParcingProject',
                        data: _GET("id"),
                    });

                    note({
                        content: "Успешно запрошен перепарсинг, ожидайте уведомления в боте о его окончании",
                        type: "info",
                        time: 2,
                    });
                })

                global_block.append(_block);

                resolve();
            })
        }

        async render(_project, global_block)
        {
            await this.renderRedacting(_project, global_block);

            var _data           = _project.data;
            var _page           = await this.getPAgeOfData(_data.organization);
            var _structCreator  = global.structCreator;
            var _strucBocks     = [];

            for(var _struc of _structCreator)
            {
                _struc.body.forEach(element => {
                    if(element.type != "add_more_sob")
                    {
                        _strucBocks.push(element);
                    }
                })
            }

            global_block.append($(`<h1>Первичная информация</h1>`).css({
                "padding": "20px 30px",
                "border-radius": "8px",
                "font-weight": "600",
                "font-family": "Circe , sans-serif",
            }));

            for(var DataBlock of _strucBocks)
            {
                var nameBLock       = DataBlock.name;
                var dataNameBlock   = null;
                var dataFoRate      = null;

                if(DataBlock.type == "file")
                {
                    nameBLock = DataBlock.name_redacting;
                }

                if(typeof _project.data[DataBlock._id] == "undefined")
                {
                    dataNameBlock = "Пусто";
                } else {
                    dataNameBlock = _project.data[DataBlock._id];
                }

                if(DataBlock._id == "rate")
                {
                    dataFoRate = dataNameBlock;
                    dataNameBlock = Number(dataNameBlock / 12).toFixed(2);
                }

                if(DataBlock.type == "date")
                {
                    dataNameBlock = dataNameBlock.split('-')[2] + "." + dataNameBlock.split('-')[1] + "." + dataNameBlock.split('-')[0];
                }

                var _block = 
                $(`
                    <div class="structCreator_new_block" data="${DataBlock._id}" type="${DataBlock.type}">
                        <div class="version2_default_bkg row_default"></div>
                        <input type="file">
                        <div class="structCreator_new_block_row">
                            <span>${nameBLock}</span>
                            <nn></nn>
                            <a> 
                                <input type="text">
                                <BB>${dataNameBlock}</BB>
                            </a>
                            <div class="structCreator_new_block_buttons">
                                <div class="structCreator_new_block_buttons_row">
                                    <div class="structCreator_new_block_buttons_block structCreatorinputIcon">
                                        <i class="fal fa-check-square"></i>
                                    </div>
                                    <div class="structCreator_new_block_buttons_block" data="input">
                                        <i class="fal fa-pencil-ruler"></i>
                                    </div>
                                    <div class="structCreator_new_block_buttons_block">
                                        <input type="checkbox" val="${dataNameBlock}">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `);

                if(typeof _project.last_redacting != "undefined")
                    {
                        if(_project.last_redacting.length > 0)
                        {
                            for(var redactingLastData of _project.last_redacting)
                            {
                                if(redactingLastData.name == DataBlock._id)
                                {
                                    _block.find("nn").html(`Отредактировано <i class="fal fa-pencil"></i>`);
                                }
                            }
                        }
                    }

                if(typeof DataBlock.readonly != "undefined")
                {
                    if(DataBlock.readonly)
                    {
                        _block.find('input[type="checkbox"]').remove();
                    }
                }

                if(DataBlock._id == "rate")
                {
                    _block.find('a').append($(`
                        <BBB>(${dataFoRate} в год)</BBB>
                    `))
                }

                _block.find('input[type="file"]').change( async function() {

                    var attrId = $(this).parent().attr('data');
                    var filename    = $(this.files)[0].name;
                    var aux         = filename.split('.');
                    var extension   = aux[aux.length -1].toUpperCase();

                    var _form    = new FormData();

                    _form.append('files', $(this.files)[0]);
                    _form.append('file_id', attrId);
                    _form.append('_id', _GET('id'));
                    _form.append('_pts', `extension/${extension.toLowerCase()}`);

                    var _url = `https://cashflo.ru/file_redacting.io/files`;

                    var _file = _form;

                    $('.loaderElement').fadeIn('fast', function() {
                        axios.post(_url, _file, {
                            headers: {
                            'Content-Type': 'multipart/form-data'
                            },
                            onUploadProgress: (progressEvent) => {
                                const totalLength = progressEvent.lengthComputable ? progressEvent.total : progressEvent.target.getResponseHeader('content-length') || progressEvent.target.getResponseHeader('x-decompressed-content-length');
                                if (totalLength !== null) {
                                    var progressBarData = Math.round( (progressEvent.loaded * 100) / totalLength );
                                    $('.loaderElement span').css({
                                        "width" : progressBarData + "%",
                                    });

                                    $('.loaderElement span').html(progressBarData + "%");
                                }
                            }
                        }).then(data => {
                            if(data.data.status == "ok") {
                                callApi({
                                    methodName: 'redactingProjectByAdmin',
                                    data: {
                                        projectid: _GET("id"),
                                        lineId: attrId,
                                        data: data.data.file_name
                                    },
                                }).then((data) => {
                                    location.reload();
                                });

                                $('.loaderElement').fadeOut("fast");
                            }
                        })
                    });

                    $(this).val('');
                })

                if(typeof _project.data[DataBlock._id] != "undefined")
                {
                    if(DataBlock.type == "file")
                    {
                        _block.find('span').click( function() {
                            var _url = getURL() + "/projects/" + _project._id + "/" + $(this).parent().parent().find('BB').text();
                            window.open(_url); 
                        });
                    }
                }

                _block.find(`.structCreator_new_block_buttons_block[data="input"]`).click( function()
                {
                    if($(this).parent().parent().parent().parent().attr('type') == "file")
                    {
                        $(this).parent().parent().parent().parent().find('input[type="file"]').trigger('click');
                    } 
                    else 
                    {
                        $(this).parent().parent().parent().toggleClass("structCreator_new_block_input_text");
                        $(this).parent().parent().parent().parent().find('input[type="text"]').val($(this).parent().parent().parent().parent().find('BB').text())
                    }
                });

                _block.find('.structCreatorinputIcon').click( function()
                {
                    var _value = $(this).parent().parent().parent().find('input[type="text"]').val();

                    if(_value.length > 0)
                    {

                        var _IdBlock    = $(this).parent().parent().parent().parent().attr('data');
                        var _typeBlock  = $(this).parent().parent().parent().parent().attr('type');

                        if(_IdBlock == "rate")
                        {
                            _value = Number(_value * 12).toFixed(2);
                        }

                        if(_typeBlock == "date")
                        {
                            _value = _value.split('.')[2] + '-' + _value.split('.')[1] + '-' + _value.split('.')[0];
                        }

                        callApi({
                            methodName: 'redactingLineSettingsPage',
                            data: {
                                projectId: _GET('id'),
                                lineId: _IdBlock,
                                data: _value,
                            },
                        });

                        $(this).parent().parent().parent().parent().find("bb").html(_value);
                        $(this).parent().parent().parent().toggleClass("structCreator_new_block_input_text");
                    }
                });
    
                global_block.append(_block);                
            }

            var moreuSersData = _data.moreUsersNotParce;

            for(var _key in moreuSersData)
            {
                global_block.append($(`<h1>Собственник ${_key.split("+")[1]}</h1>`).css({
                    "background-color": "#182037",
                    "padding": "20px 30px", 
                    "border-radius": "8px",
                    "font-weight": "600",
                    "font-family": "Circe , sans-serif",
                }));

                for(var _keyBlock in moreuSersData[_key])
                {
                    var _idBlock            = _keyBlock.split('BB*')[1].split(`_${_key.split("+")[1]}`)[0];
                    var _element            = window.structCreator.filter(function (obj) { return obj.header == "4. Данные собственника" })[0];
                    var _needElementSort    = null;

                    if(_idBlock == "file+4")
                    {
                        _needElementSort = {
                            name: "Скан паспорта дополнительyого собственника",
                            type: "file",
                        };
                        
                    } else {
                        _element.body.forEach(elKO => {
                            if(elKO._id == _idBlock)
                            {
                                _needElementSort = elKO;
                            };
                        });
                    }

                    var dataNameBlock   = moreuSersData[_key][_keyBlock];
                    var nameBLock       = _needElementSort.name;

                    if(_needElementSort.type == "date")
                    {
                        dataNameBlock = dataNameBlock.split('-')[2] + "." + dataNameBlock.split('-')[1] + "." + dataNameBlock.split('-')[0];
                    }

                    var _block = 
                    $(`
                        <div class="structCreator_new_block" data="${_keyBlock}" type="${_needElementSort.type}">
                            <input type="file">
                            <div class="structCreator_new_block_row">
                                <span>${nameBLock}</span>
                                <NN></NN>
                                <a> 
                                    <input type="text">
                                    <BB>${dataNameBlock}</BB>
                                </a>
                                <div class="structCreator_new_block_buttons">
                                    <div class="structCreator_new_block_buttons_row">
                                        <div class="structCreator_new_block_buttons_block structCreatorinputIcon">
                                            <i class="fal fa-check-square"></i>
                                        </div>
                                        <div class="structCreator_new_block_buttons_block" data="input">
                                            <i class="fal fa-pencil-ruler"></i>
                                        </div>
                                        <div class="structCreator_new_block_buttons_block">
                                            <input type="checkbox" val="${dataNameBlock}">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `);

                    if(typeof _project.last_redacting != "undefined")
                    {
                        if(_project.last_redacting.length > 0)
                        {
                            for(var redactingLastData of _project.last_redacting)
                            {
                                if(redactingLastData.name == _keyBlock)
                                {
                                    _block.find("NN").html(`Отредактировано <i class="fal fa-pencil"></i>`);
                                }
                            }
                        }
                    }

                    _block.find(`.structCreator_new_block_buttons_block[data="input"]`).click( function()
                    {
                        if($(this).parent().parent().parent().parent().attr('type') == "file")
                        {
                            // $(this).parent().parent().parent().parent().find('input[type="file"]').trigger('click');
                        } 
                        else 
                        {
                            $(this).parent().parent().parent().toggleClass("structCreator_new_block_input_text");
                            $(this).parent().parent().parent().parent().find('input[type="text"]').val($(this).parent().parent().parent().parent().find('BB').text())
                        }
                    });

                    _block.find('.structCreatorinputIcon').click( function()
                    {
                        var _value = $(this).parent().parent().parent().find('input[type="text"]').val();

                        if(_value.length > 0)
                        {

                            var _IdBlock    = $(this).parent().parent().parent().parent().attr('data');
                            var _typeBlock  = $(this).parent().parent().parent().parent().attr('type');

                            if(_IdBlock == "rate")
                            {
                                _value = Number(_value * 12).toFixed(2);
                            }

                            if(_typeBlock == "date")
                            {
                                _value = _value.split('.')[2] + '-' + _value.split('.')[1] + '-' + _value.split('.')[0];
                            }

                            callApi({
                                methodName: 'redactingLineSettingsPage',
                                data: {
                                    projectId: _GET('id'),
                                    lineId: _IdBlock,
                                    data: _value,
                                    type: true,
                                },
                            });

                            location.reload();
                        }
                    });

                    if(_needElementSort.type == "file")
                    {
                        _block.find('span').click( function() {
                            var _url = getURL() + "/projects/" + _project._id + "/" + $(this).parent().parent().find('BB').text();
                            window.open(_url); 
                        });
                    }

                    global_block.append(_block);
                }
            }

            global_block.append($(`<h1>Действия</h1>`).css({
                "background-color": "#182037",
                "padding": "20px 30px",
                "border-radius": "8px",
                "font-weight": "600",
                "font-family": "Circe , sans-serif",
            }));

            var buttons_block = $(`
                <input type="text" id="redacting_input" placeholder="Коментарий">
                <div class="structCreator_new_block_buttons_block" data="redacting">
                    <span>Запросить редактирование</span>
                </div>
                <div class="structCreator_new_block_buttons_block" data="delete">
                    <span>Удалить проект</span>
                </div>
            `);

            var _this = this;

            buttons_block.click( function() {
                var funs = {
                    "redacting": function() 
                    {
                        _this.startRedacting();
                    },
                    "delete": function() 
                    {
                        alert("Кнопка не доступна");
                    },
                }

                funs[$(this).attr('data')]()
            });

            global_block.append(buttons_block);
        }

        async startRedacting()
        {
            var redactingData = [];

            $('.global_block').find('.structCreator_new_block').each((i, element) => {
                if($(element).find(`input[type="checkbox"]`).prop('checked'))
                {
                    var _block = 
                    {
                        _id: $(element).attr('data'),
                        type: $(element).attr('type'),
                        name: $(element).find('span').text(),
                    };

                    redactingData.push(_block)
                }
            });

            note({
                content: "Пожалуйста подождите",
                type: "info",
                time: 2,
            });

            await callApi({
                methodName: "setRedactingProject",
                data: {
                    projectId: _GET("id"),
                    input: $('#redacting_input').val(),
                    redactingData: redactingData,
                },
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
        }
    }

    var components = {
        redacting_page_more,
    };

    if(!global.Components) { global.Components = components; } 
    else { 
        for(var key in components)
        {
            global.Components[key] = components[key];
        }
    }

}(window))