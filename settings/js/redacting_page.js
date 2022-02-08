

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

        async renderActive(global_block)
        {
            return new Promise(async (resolve,reject) =>
            {
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
                            </div>
                        </div>
                        <div class="settingBlock_body">
                           
                        </div>
                    </div>
                `);
    
                templateText.css('margin', '35px 0');
    
                for(var _Inv of activeData.investers.invs)
                {
                    var _block = $(`
                        <div class="settingBlock_body_line">
                            <span>${_Inv.invester}</span>
                            <span>${_Inv.data.pay} руб</span>
                            <span><a href="https://invester-relocation.site/projects/${_Inv.projectId}/${_Inv.data.document}">Открыть</a></span>
                        </div>
                    `);
    
                    templateText.find('.settingBlock_body').append(_block);
                }
    
                global_block.append(templateText); 
                resolve();
            })
        }

        async render(_project, global_block)
        {
            if(_project.type = "active")
            {
                await this.renderActive(global_block);
            }

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

            global_block.append($(`<h1>Первичная информация</h1>`));

            for(var DataBlock of _strucBocks)
            {
                var nameBLock       = DataBlock.name;
                var dataNameBlock   = null;

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
                    dataNameBlock = Number(dataNameBlock / 12).toFixed(2);
                }

                if(DataBlock.type == "date")
                {
                    dataNameBlock = dataNameBlock.split('-')[2] + "." + dataNameBlock.split('-')[1] + "." + dataNameBlock.split('-')[0];
                }

                var _block = 
                $(`
                    <div class="structCreator_new_block" data="${DataBlock._id}" type="${DataBlock.type}">
                        <input type="file">
                        <div class="structCreator_new_block_row">
                            <span>${nameBLock}</span>
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

                _block.find('input[type="file"]').change( async function() {

                    var attrId = $(this).parent().attr('data');
                    var filename    = $(this.files)[0].name;
                    var aux         = filename.split('.');
                    var extension   = aux[aux.length -1].toUpperCase();

                    alert('Загрузка началась!');

                    var _form    = new FormData();

                    _form.append('files', $(this.files)[0]);
                    _form.append('file_id', attrId);
                    _form.append('_id', _GET('id'));
                    _form.append('_pts', `extension/${extension.toLowerCase()}`);

                    var _url = `https://invester-relocation.site/file_redacting.io/files`;

                    var _file = _form;

                    axios.post(_url, _file, {
                        headers: {
                        'Content-Type': 'multipart/form-data'
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
                                alert('Загрузка завершена');
                                location.reload();
                            });
                        }
                    })


                    $(this).val('');
                })

                if(typeof _project.data[DataBlock._id] != "undefined")
                {
                    if(DataBlock.type == "file")
                    {
                        _block.find('span').click( function() {
                            var _url = getURL() + "/projects/" + _project._id + "/" + $(this).parent().parent().find('BB').text();
                            window.open(_url);
                        })
                    }
                }

                _block.find(`.structCreator_new_block_buttons_block[data="input"]`).click( function()
                {
                    if($(this).parent().parent().parent().parent().attr('type') == "file")
                    {
                        $(this).parent().parent().parent().parent().find('input[type="file"]').trigger('click');
                    } else {
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

                        location.reload();
                    }
                });
    
                global_block.append(_block);                
            }

            var moreuSersData = _data.moreUsersNotParce;

            for(var _key in moreuSersData)
            {
                global_block.append($(`<h1>Собственник ${_key.split("+")[1]}</h1>`));

                for(var _keyBlock in moreuSersData[_key])
                {
                    var _idBlock            = _keyBlock.split('BB#')[1].split(`_${_key.split("+")[1]}`)[0];
                    var _type               = "string";
                    var _element            = window.structCreator.filter(function (obj) { return obj.header == "4. Данные собственника" })[0];
                    var _needElementSort    = null;

                    if(_idBlock == "file+4")
                    {
                        _type = "file";

                        _needElementSort = {
                            name: "Скан паспорта дополнительyого собственника",
                        }
                    } else {
                        _element.body.forEach(elKO => {
                            if(elKO._id == _idBlock)
                            {
                                _needElementSort = elKO;
                            }
                        })
                    }

                    var dataNameBlock   = moreuSersData[_key][_keyBlock];
                    var nameBLock       = _needElementSort.name;

                    var _block = 
                    $(`
                        <div class="structCreator_new_block" data="${_keyBlock}" type="${_needElementSort.type}">
                            <input type="file">
                            <div class="structCreator_new_block_row">
                                <span>${nameBLock}</span>
                                <a>
                                    <input type="text">
                                    <BB>${dataNameBlock}</BB>
                                </a>
                                <div class="structCreator_new_block_buttons">
                                    <div class="structCreator_new_block_buttons_row">
                                        <div class="structCreator_new_block_buttons_block">
                                            <input type="checkbox" val="${dataNameBlock}">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `);

                    global_block.append(_block);
                }
            }

            global_block.append($(`<h1>Действия</h1>`));

            var buttons_block = $(`
                <input type="text" id="redacting_input">
                <div class="structCreator_new_block_buttons_block" data="redacting">
                    <span>Запросить редактирование</span>
                </div>
                <div class="structCreator_new_block_buttons_block" data="hover">
                    <span>Скрыть проект</span>
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
                    "hover": function() 
                    {

                    },
                    "delete": function() 
                    {

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

            await callApi({
                methodName: "setRedactingProject",
                data: {
                    projectId: _GET("id"),
                    input: $('#redacting_input').val(),
                    redactingData: redactingData,
                },
            });

            alert('Успешно!');

            location.reload();
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