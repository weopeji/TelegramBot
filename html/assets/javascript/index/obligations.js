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

    class obligations
    {
        constructor() {};

        async renderGlobal()
        {
            var _data = await callApi({
                methodName: "ALL_DATA",
                data: global.allData.User._id,
            });

            var settingBlock = $(`
                <div class="settingBlock" style="margin-bottom: 20px">
                    <div class="settingBlock_header">
                        <div class="invester_status_projects_status_first">
                            <div class="invester_status_projects_status_first_line">
                                <span>Привлечено</span>
                                <a>${_data.obligations_data.attracted.toString().ReplaceNumber()} руб</a>
                                <span>Коммисия investER</span>
                                <a>${_data.obligations_data.commission.toString().ReplaceNumber()} руб</a>
                            </div>
                            <div class="invester_status_projects_status_first_line">
                                <span>Выплачено</span>
                                <a>0 руб</a>
                                <span>Задолженость</span>
                                <a>0 руб</a>
                            </div>
                        </div>
                    </div>
                </div>
            `);

            $('.index_page_body_data').append(settingBlock);

            var settingBlock = $(`
                <div class="obligations_block">

                </div>
            `);

            _data.obligations_data.showBlocks.forEach(element => {
                var elementBlock = $(`
                    <div class="obligations_block_element" data="${element.project._id}">
                        <h1>Проект № ${element.project._id}</h1>
                        <h2>${element.project.data.name}</h2>
                        <div class="obligations_block_element_line">
                            <span>Привлечено</span>
                            <p>${element.attracted.toString().ReplaceNumber()} руб</p>
                        </div>
                        <div class="obligations_block_element_line">
                            <span>Коммисия investER</span>
                            <p>${element.project.payersData.commission} %</p>
                        </div>
                        <div class="obligations_block_element_line">
                            <span>Коммисия investER</span>
                            <p>${element.accrued.toString().ReplaceNumber()} руб</p>
                        </div>
                        <div class="obligations_block_element_line">
                            <span>Выплачено</span>
                            <p>0 руб</p>
                        </div>
                        <div class="obligations_block_element_line">
                            <span>Задолженость</span>
                            <p>0 руб</p>
                        </div>
                        <div class="obligations_block_element_line">
                            <span>Погаисть до</span>
                            <p>0</p>
                        </div>
                        <div class="obligations_block_element_line">
                            <span>Договор реквезиты</span>
                            <p>Открыть</p>
                        </div>
                        <div class="obligations_block_element_button">
                            <span>Написать investER</span>
                        </div>
                    </div>
                `);

                elementBlock.click( function() {
                    location.href = "./?page=obligations&id=" + $(this).attr('data');
                });

                settingBlock.append(elementBlock);
            });

            $('.index_page_body_data').append(settingBlock);
        }

        async renderType()
        {
            var _data = await callApi({
                methodName: "obligationsProjectData",
                data: _GET('id'),
            });

            var settingBlock = $(`
                <div class="settingBlock">
                    <div class="settingBlock_header">
                        <p>Проект № ${_data.project._id} ${_data.project.data.name}</p>
                        <div class="settingBlock_header_line">
                            <span>№</span>
                            <span>Привлечено</span>
                            <span>№ Договора от</span>
                            <span>Комиссия</span>
                            <span>Оплатить до</span>
                            <span>Чек об оплате</span>
                            <span>Статус</span>
                        </div>
                    </div>
                    <div class="settingBlock_body">

                    </div>
                </div>
            `);

            _data.Invs.forEach(function(element, i) 
            {
                var template_text = $(`
                    <div class="settingBlock_body_line settingBlock_body_line_obligations" data="${element._id}">
                        <input type="file" name="" id="${element._id}">
                        <span>${i + 1}</span>
                        <span>${element.data.pay}</span>
                        <span>${_data.project._id}/${i + 1} от ${DateFormatted(element.date)}</span>
                        <span>${element.data.pay.toString().replace(/\s/g, '') / 100 * _data.project.payersData.commission}</span>
                        <span>${DateFormatted(Number(element.date) + 864000000)}</span>
                        <span clas="settingBlock_body_line_obligations_put">Прикрепить</span>
                        <span>Не оплачено</span>
                    </div>
                `);

                template_text.click( function() {
                    alert('ok');
                });

                settingBlock.find('.settingBlock_body').append(template_text);
            })

            $('.index_page_body_data').append(settingBlock);
        }

        async render()
        {
            if(_GET('id'))
            {
                this.renderType();
            } else {
                this.renderGlobal();
            }
        }
    }

    var components = {
        obligations,
    };

    if(!global.Components) { global.Components = components; } 
    else { 
        for(var key in components)
        {
            global.Components[key] = components[key];
        }
    }

}(window))