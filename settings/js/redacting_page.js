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

        async render(_project, global_block)
        {
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
                    }
                });

                _block.find('.structCreatorinputIcon').click( function()
                {
                    var _value = $(this).parent().parent().parent().find('input[type="text"]').val();

                    if(_value.length > 0)
                    {
                        callApi({
                            methodName: 'redactingLineSettingsPage',
                            data: {
                                projectId: _GET('id'),
                                lineId: $(this).parent().parent().parent().parent().attr('data'),
                                data: _value,
                            },
                        });

                        location.reload();
                    }
                });
    
                global_block.append(_block);                
            }

            global_block.append($(`<h1>Информация собственников</h1>`));

            var moreuSersData = _data.moreUsersNotParce;

            for(var _key in moreuSersData)
            {
                global_block.append($(`<h1>Собственник ${_key.split("+")[1]}</h1>`));

                for(var _keyBlock in moreuSersData[_key])
                {
                    var _idBlock    = _keyBlock.split('BB#')[1].split(`_${_key.split("+")[1]}`)[0];
                    var _type       = "string";

                    if(_idBlock == "file+4")
                    {
                        _type = "file";
                    }

                    var _block = 
                    $(`
                        <div class="structCreator_new_block" data="${_keyBlock}" type="${DataBlock.type}">
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
                }
            }
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