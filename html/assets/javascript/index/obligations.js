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
                    <div class="version2_default_bkg row_default"></div>
                    <div class="settingBlock_header">
                        <div class="invester_status_projects_status_first">
                            <div class="invester_status_projects_status_first_line">
                                <span>Привлечено</span>
                                <a>${_data.obligations_data.attracted.toString().ReplaceNumber()} руб</a>
                                <span>Коммисия investiR</span>
                                <a>${_data.obligations_data.commission.toString().ReplaceNumber()} руб</a>
                            </div>
                            <div class="invester_status_projects_status_first_line">
                                <span>Выплачено</span>
                                <a>${_data.obligations_data.commissionPay.toString().ReplaceNumber()} руб</a>
                                <span>Задолженость</span>
                                <a>${_data.obligations_data.DebtComission.toString().ReplaceNumber()} руб</a>
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

            _data.obligations_data.showBlocks.forEach(element => 
            {
                var _data   = element.repayData;
                var _error  = false;

                if(_data)
                {
                    _data = DateFormatted(Number(element.repayData) + 864000000);
                } 
                else 
                {
                    _error = true;
                    _data = "Отсутствует";
                }

                var elementBlock = $(`
                    <div class="obligations_block_element" data="${element.project._id}">
                        <div class="version2_default_bkg row_default"></div>
                        <div class="obligations_block_element_row">
                            <div class="obligations_block_element_header">
                                <h1>Проект ${element.project._id}</h1>
                                <h2>${element.project.data.name}</h2>
                            </div>
                            <div class="obligations_block_element_line">
                                <span>Привлечено</span>
                                <p>${element.attracted.toString().ReplaceNumber()} руб</p>
                            </div>
                            <div class="obligations_block_element_line">
                                <span>Коммисия investiR</span>
                                <p>${element.project.payersData.commission} %</p>
                            </div>
                            <div class="obligations_block_element_line">
                                <span>Коммисия investiR</span>
                                <p>${element.accrued.toString().ReplaceNumber()} руб</p>
                            </div>
                            <div class="obligations_block_element_line">
                                <span>Выплачено</span>
                                <p>${element.commissionPay.toString().ReplaceNumber()} руб</p>
                            </div>
                            <div class="obligations_block_element_line">
                                <span>Задолженость</span>
                                <p>${element.DebtComission.toString().ReplaceNumber()} руб</p>
                            </div>
                            <div class="obligations_block_element_line">
                                <span>Погаисть до</span>
                                <p class="alert_p_alert">${_data}</p>
                            </div>
                            <div class="obligations_block_element_line">
                                <span>Договор реквезиты</span>
                                <p>Открыть</p>
                            </div>
                            <div class="obligations_block_element_button">
                                <span>Написать investiR</span>
                            </div>
                        </div>
                    </div>
                `);

                if(!_error)
                {
                    if(Number(Number(element.repayData) + 864000000) < Number(new Date().getTime().toString()))
                    {
                        elementBlock.attr('alertForLine', 'true');
                        elementBlock.find('h3').html('Имеется задолженость')
                    }
                }
                
                elementBlock.click( function() {
                    location.href = "./?page=obligations&ProjectId=" + $(this).attr('data');
                });

                settingBlock.append(elementBlock);
            });

            $('.index_page_body_data').append(settingBlock);

            setInterval( function() 
            {
                $('.obligations_block_element[alertForLine="true"]').toggleClass('alertForLine');
            }, 1000);
        }

        async renderType()
        {
            var _data = await callApi({
                methodName: "obligationsProjectData",
                data: _GET('ProjectId'),
            });

            var settingBlock = $(`
                <div class="settingBlock">
                    <div class="version2_settingBlock_header">
                        <p>Проект № ${_data.project._id} ${_data.project.data.name}</p>
                    </div>
                    <div class="version2_default_bkg row_default"></div>
                    <div class="settingBlock_header">
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
                    <div class="settingBlock_body_line settingBlock_body_line_obligations" data="${element._id}" dataInv="${element.Inv._id}">
                        <span>${i + 1}</span>
                        <span>${element.Inv.data.pay} руб</span>
                        <span>${_data.project._id}/${element.initNuberProject} от ${DateFormatted(element.Inv.date)}</span>
                        <span>${Number(element.Inv.data.pay.toString().replace(/\s/g, '') / 100 * _data.project.payersData.commission).toString().ReplaceNumber()} руб</span>
                        <span>${DateFormatted(Number(element.Inv.date) + 864000000)}</span>
                        <span class="settingBlock_body_line_obligations_put">
                            <label for="${element.Inv._id}">Прикрепить</label>
                        </span>
                        <span>Не оплачено</span>
                        <input type="file" name="" id="${element.Inv._id}" data-project="${_data.project._id}">
                    </div>
                `);

                if(element.commission)
                {
                    if(element.commission.status == "accept")
                    {
                        var buttonPut = $(`<a href="https://investir.one/projects/${_data.project._id}/${element.commission.recipient}" target="_blank">Посмотреть</a>`);
                        template_text.find('.settingBlock_body_line_obligations_put').empty().append(buttonPut);
                        template_text.children('span').eq(6).html("Подтверждено");
                    }

                    if(element.commission.status == "wait")
                    {
                        var buttonPut = $(`<a href="https://investir.one/projects/${_data.project._id}/${element.commission.recipient}" target="_blank">Посмотреть</a>`);
                        template_text.find('.settingBlock_body_line_obligations_put').empty().append(buttonPut);
                        template_text.children('span').eq(6).html("Ожидает подтверждения от investiR");
                    }

                    if(element.commission.status == "wait_accept")
                    {
                        template_text.find('.settingBlock_body_line_obligations_put').css('display', 'block');
                        template_text.children('span').eq(6).html("Ожидает подтверждения");
                        var buttonPut = $(`
                            <label class="settingBlock_body_line_obligations_btn" for="${element.Inv._id}">Заменить</label>
                            <div class="settingBlock_body_line_obligations_btn">
                                <span>Посмотерть</span>
                            </div>
                            <div class="settingBlock_body_line_obligations_btn">
                                <span>Подтвердить</span>
                            </div>
                        `);

                        buttonPut.eq(2).click( function() {
                            window.open(`https://investir.one/projects/${_data.project._id}/${element.commission.recipient}`, '_blank')
                        });

                        buttonPut.eq(4).click( async function() {
                            await callApi({
                                methodName: "obligations_accept_commission_put",
                                data: $(this).parent().parent().attr('dataInv'),
                            });
                            alert('Успешно!');
                            location.reload();
                        });

                        template_text.find('.settingBlock_body_line_obligations_put').empty().append(buttonPut);
                    };  
                }
                else
                {
                    if(Number(Number(element.Inv.date) + 864000000) < Number(new Date().getTime().toString()))
                    {
                        template_text.attr('alertForLine', 'true');
                    }
                }

                settingBlock.find('.settingBlock_body').append(template_text);
            });

            settingBlock.find('input[type="file"]').change( async function() 
            {
                var _form    = new FormData();
            
                _form.append('invId', $(this).attr('id'));
                _form.append('_id', $(this).attr('data-project'));
                _form.append('_pts', $(this.files)[0].type);
                _form.append('files', $(this.files)[0]);

                var _url = `${getURL()}/file_commission.io/files`;

                axios.post(_url, _form, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    },
                }).then(data => {
                    if(data.data.status == "ok") {
                        alert("Чек прикоеплен!");
                        location.reload();
                    }
                });
            })

            $('.index_page_body_data').append(settingBlock);

            setInterval( function() 
            {
                $('.settingBlock_body_line[alertForLine="true"]').toggleClass('alertForLine');
            }, 1000);
        }

        async render()
        {
            if(_GET('ProjectId'))
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