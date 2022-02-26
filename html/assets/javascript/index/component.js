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

    class activ_projects
    {
        constructor() {};

        pad(s, width, character) {
            return new Array(width - s.toString().length + 1).join(character) + s;
        }

        async business_render(_data) 
        {
            var _dataPhoto = await callApi({
                methodName: "getPhotoByUser",
                data: _data.invester.user,
            });

            var photoPathPut = "null";

            if(_dataPhoto)
            {
                photoPathPut = _dataPhoto.file_path;
            }

            $('.info_active_block_right').append(`
                <div class="info_active_block_photo">
                    <img src="https://api.telegram.org/file/bot2062839693:AAE0hzj8SVXyexq29s5x7aRLC5x8O77c-pQ/${photoPathPut}" alt="">
                </div>
                <span>${_data.invester.first_name}</span>
                <p>Invester</p>
                <div class="info_active_block_massage_button">
                    <span>Открыть спор и перейти к диалогу</span>
                </div>
            `);

            if(_data.InvDoc.status == "accept")
            {
                var bank        = null;
                var bik         = null;
                var nomer       = null;
                var nomer_kor   = null;

                _data.InvDoc.data.data.forEach(elementInv => {

                    if(elementInv._id == "bank")
                    {
                        bank = elementInv.data;
                    };

                    if(elementInv._id == "bik")
                    {
                        bik = elementInv.data;
                    };

                    if(elementInv._id == "nomer")
                    {
                        nomer = elementInv.data;
                    };

                    if(elementInv._id == "nomer_kor")
                    {
                        nomer_kor = elementInv.data;
                    };
                })
                
                var headerPaysBlock = $(`
                    <div class="headerPaysBlock">
                        <div class="headerPaysBlock_header">
                            <span class="headerPaysBlock_header_span">
                                Выплаты по проекту
                                <div class="headerPaysBlock_header_span_button_reqvesits">
                                    <span>Посмотреть реквезиты</span>
                                    <div class="settingBlock_body_line_drop_menu">
                                        <p>Банк получателя: <span>${bank}</span></p>
                                        <p>БИК: <span>${bik}</span></p>
                                        <p>Номер расчетного счета: <span>${nomer}</span></p>
                                        <p>Номер кор счета: <span>${nomer_kor}</span></p>
                                    </div>
                                </div>
                            </span>
                            <div class="headerPaysBlock_header_line">
                                <span>#</span>
                                <span>Дата</span>
                                <span>Сумма</span>
                                <span>Статус</span>
                            </div>
                        </div>
                        <div class="headerPaysBlock_body">

                        </div>
                    </div>
                `);

                headerPaysBlock.find('.headerPaysBlock_header_span_button_reqvesits').click( function() {
                    $(this).find('.settingBlock_body_line_drop_menu').fadeToggle();
                })

                headerPaysBlock.find('.headerPaysBlock_header_span').css({
                    'display': "flex",
                    "position": "relative",
                    "align-items": "center",
                });


                var _status = {
                    "wait": "Прикрепить чек",
                    "accept": "Оплачено"
                }

                _data.InvDoc.pays.forEach((el, i) => 
                {
                    var _pay = Math.ceil(el.pay);
                    var morePay = "";

                    if((i + 1) == _data.InvDoc.pays.length)
                    {
                        morePay = ` + ${_data.InvDoc.data.pay} руб.`
                    }

                    var maxDate = new Date(el.date);
                    var maxDateFormatted =  this.pad(maxDate.getDate(), 2, '0') + '.' + this.pad(maxDate.getMonth() + 1, 2, '0') + '.' + maxDate.getFullYear();
                
                    var _block = $(`
                        <div class="headerPaysBlock_body_line">
                            <span>${i + 1}</span>
                            <span>${maxDateFormatted}</span>
                            <span>${_pay.toString().replace(/(\d)(?=(\d{3})+([^\d]|$))/g, '$1 ')} руб ${morePay.toString().replace(/(\d)(?=(\d{3})+([^\d]|$))/g, '$1 ')}</span>
                            <span class="headerPaysBlock_button" data="${el.status}" data-rec="${el.receipt}">
                                <input type="file" name="" id='${i}'>
                                <label for="${i}">${_status[el.status]}</label>
                            </span>
                        </div>
                    `);

                    if(typeof el.statusAccept != "undefined")
                    {
                        if(el.statusAccept == "push")
                        {
                            var blockMore = $(`
                                <div class="mgshjtokj">
                                    <span>Подтвердить</span>
                                    <span>Посмотреть</span>
                                </div>
                            `);

                            blockMore.find('span').eq(0).click( async function() {
                                await callApi({
                                    methodName: "business_cheack_accept_in_cabinet",
                                    data: {
                                        id: _GET('id'),
                                        project: _GET('project'),
                                        number: $(this).parent().parent().find('input').attr('id'),
                                    },
                                });

                                alert('Успешно!');
                                location.reload();
                            });

                            blockMore.find('span').eq(1).click( async function() {
                                window.open(`/projects/${_GET('project')}/${$(this).parent().parent().attr('data-rec')}` , '_blank');
                            })

                            blockMore.find('span').css('margin-bottom', '10px');
                            blockMore.find('span').eq(0).css('margin-top', '10px');
                            _block.find('label').html('<span>Заменить</span>');
                            _block.children("span").eq(3).append(blockMore);
                        }
                    }

                    headerPaysBlock.find('.headerPaysBlock_body').append(_block);
                });

                headerPaysBlock.find('input[type=file]').change( async function() 
                {
                    var _form    = new FormData();
            
                    _form.append('file_id', $(this).attr('id'));
                    _form.append('_user', _GET('id'));
                    _form.append('_project', _GET('project'));
                    _form.append('_pts', $(this.files)[0].type);
                    _form.append('files', $(this.files)[0]);

                    var _url = `${getURL()}/file_chart.io/files`;

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
                });

                $('.index_page_body_data').append(headerPaysBlock);
            } else {
                $('.index_page_body_data').append(`
                    <div class="Attracted_headerInfoBlock_info_data_alert">
                        <span>Нажимая кнопку подтвердить, вы подтверждаете, что сумма и дата платежа верна</span>
                    </div>
                    <div class="Attracted_headerInfoBlock">
                        <div class="Attracted_headerInfoBlock_block accept_block_tap">
                            <div class="Attracted_headerInfoBlock_block_i">
                                <i class="fad fa-check"></i>
                            </div>
                            <div class="Attracted_headerInfoBlock_block_text">
                                <p>Подтвердить</p>
                            </div>
                        </div>
                        <div class="Attracted_headerInfoBlock_block remove_block_tap">
                            <div class="Attracted_headerInfoBlock_block_i">
                                <i class="fad fa-times"></i>
                            </div>
                            <div class="Attracted_headerInfoBlock_block_text Attracted_headerInfoBlock_block_text_moneys">
                                <p>Отказать</p>
                            </div>
                        </div>
                    </div>
                `);
            }
        }

        async invester_render(_data)
        {
            var settingBlock = $(`.info_active_block`);

            settingBlock.find('.info_active_block_right').append(`
                <div class="info_active_block_photo">
                        
                </div>
                <span>${_data.project.data.name}</span>
                <p>business</p>
                <div class="info_active_block_massage_button">
                    <span>Открыть спор и перейти к диалогу</span>
                </div>
            `);

            $('.index_page_body_data').append(settingBlock);

            if(_data.InvDoc.status == "accept")
            {
                var bank        = null;
                var bik         = null;
                var nomer       = null;
                var nomer_kor   = null;

                _data.InvDoc.data.data.forEach(elementInv => {

                    if(elementInv._id == "bank")
                    {
                        bank = elementInv.data;
                    };

                    if(elementInv._id == "bik")
                    {
                        bik = elementInv.data;
                    };

                    if(elementInv._id == "nomer")
                    {
                        nomer = elementInv.data;
                    };

                    if(elementInv._id == "nomer_kor")
                    {
                        nomer_kor = elementInv.data;
                    };
                })

                var headerPaysBlock = $(`
                    <div class="headerPaysBlock">
                        <div class="headerPaysBlock_header">
                            <span class="headerPaysBlock_header_span">
                                Выплаты по проекту
                                <div class="headerPaysBlock_header_span_button_reqvesits">
                                    <span>Посмотреть реквезиты</span>
                                    <div class="settingBlock_body_line_drop_menu">
                                        <p>Банк получателя: <span>${bank}</span></p>
                                        <p>БИК: <span>${bik}</span></p>
                                        <p>Номер расчетного счета: <span>${nomer}</span></p>
                                        <p>Номер кор счета: <span>${nomer_kor}</span></p>
                                    </div>
                                </div>
                            </span>
                            <div class="headerPaysBlock_header_line">
                                <span>#</span>
                                <span>Дата</span>
                                <span>Сумма</span>
                                <span>Статус</span>
                            </div>
                        </div>
                        <div class="headerPaysBlock_body">

                        </div>
                    </div>
                `);

                headerPaysBlock.find('.headerPaysBlock_header_span_button_reqvesits').click( function() {
                    $(this).find('.settingBlock_body_line_drop_menu').fadeToggle();
                })

                headerPaysBlock.find('.headerPaysBlock_header_span').css({
                    'display': "flex",
                    "position": "relative",
                    "align-items": "center",
                });

                var _status = {
                    "wait": "Ожидает оплату",
                    "accept": "Посмотреть чек",
                }

                _data.InvDoc.pays.forEach((el, i) => {
                    var maxDate = new Date(el.date);
                    var maxDateFormatted =  this.pad(maxDate.getDate(), 2, '0') + '.' + this.pad(maxDate.getMonth() + 1, 2, '0') + '.' + maxDate.getFullYear();

                    var morePay = "";

                    if((i + 1) == _data.InvDoc.pays.length)
                    {
                        morePay = ` + ${_data.InvDoc.data.pay} руб.`
                    }
                
                    var _block = $(`
                        <div class="headerPaysBlock_body_line">
                            <span>${i + 1}</span>
                            <span>${maxDateFormatted}</span>
                            <span>${Math.ceil(el.pay).toString().replace(/(\d)(?=(\d{3})+([^\d]|$))/g, '$1 ')} руб ${morePay.replace(/(\d)(?=(\d{3})+([^\d]|$))/g, '$1 ')}</span>
                            <span class="headerPaysBlock_body_line_inv" data="${el.receipt}">
                                <span>
                                    ${_status[el.status]}
                                </span>
                            </span>
                        </div>
                    `);

                    if(el.status == "accept")
                    {
                        _block.find(".headerPaysBlock_body_line_inv").children().css("background", "rgb(80, 200, 120)");
                    }

                    headerPaysBlock.find('.headerPaysBlock_body').append(_block);
                });

                headerPaysBlock.find('.headerPaysBlock_body_line_inv').click( function() {
                    window.open(`/projects/${_GET('project')}/${$(this).attr('data')}` , '_blank');
                })

                $('.index_page_body_data').append(headerPaysBlock);
            }
        }

        async renderType(allData)
        {
            var _data = await callApi({
                methodName: "invester_status_project",
                data: _GET('id'),
            });

            var blockProject = await callApi({
                methodName: "getProjectById",
                data: _data.InvDoc.projectId,
            });

            console.log(_data);

            var _dateText = "Ожидание";

            if(_data.InvDoc.date)
            {
                var maxDate = new Date(Number(_data.InvDoc.date));
                var needDate = `${this.pad(maxDate.getDate(), 2, '0')}.${this.pad(maxDate.getMonth() + 1, 2, '0')}.${maxDate.getFullYear()}`;
                _dateText = needDate;
            }

            var _status = {
                "wait": "Ожидает подтверждения",
                "accept": "Подтверждено",
            }

            var settingBlock = $(`
                <div class="info_active_block">
                    <div class="info_active_block_right">
                        
                    </div>
                    <div class="info_active_block_left">
                        <p class="info_active_block_left_header">Информация по платежу</p>
                        <div class="info_active_block_left_info">
                            <div class="info_active_block_left_info_line">
                                <span>Название:</span>
                                <a>${blockProject.data.name}</a>
                            </div>
                            <div class="info_active_block_left_info_line">
                                <span>Номер проекта:</span>
                                <a>${_data.InvDoc.projectId}</a>
                            </div>
                            <div class="info_active_block_left_info_line">
                                <span>Номер инвестора:</span>
                                <a>${_data.initNumber}</a>
                            </div>
                        </div>
                        <div class="info_active_block_left_info">
                            <div class="info_active_block_left_info_line">
                                <span>Статус:</span>
                                <a>${_status[_data.InvDoc.status]}</a>
                            </div>
                            <div class="info_active_block_left_info_line">
                                <span>Сумма инвестиции:</span>
                                <a>${_data.InvDoc.data.pay.replace(/(\d)(?=(\d{3})+([^\d]|$))/g, '$1 ')} руб</a>
                            </div>
                            <div class="info_active_block_left_info_line">
                                <span>Дата:</span>
                                <a>${_dateText}</a>
                            </div>
                        </div>
                        <div class="info_active_block_left_buttons">
                            <span class="show_block">Посмотреть чек об оплате</span>
                            <span class="show_document">Посмотреть договор</span>
                        </div>
                    </div>
                </div>
            `);

            $('.index_page_body_data').append(settingBlock);

            if(allData.User.type == "business")
            {
                await this.business_render(_data);
            } else 
            {
                await this.invester_render(_data);
            }

            $('.info_active_block_massage_button').click(function() {
                window.open(`./?page=chats&id=${_data.InvDoc._id}`, '_blank');
            });

            $('.show_block').click( function() {
                window.open(`./projects/${_data.InvDoc.projectId}/${_data.InvDoc.data.document}`, '_blank');
            });

            $('.show_document').click( async function() {
                var getProjectById = await callApi({
                    methodName: "getProjectById",
                    data: _GET('project'),
                });
                window.open(`https://invester-relocation.site/projects/${_data.InvDoc.projectId}/${_data.InvDoc.urlToLastDocument}`, '_blank');
            });

            $('.accept_block_tap').click( async function () 
            {
                var acceptInvestor = await callApi({
                    methodName: "acceptInvestor",
                    data: {
                        id: _GET('id'),
                        projectId: _GET('project'),
                    },
                });

                alert('Оплата подтвержденна!');
                location.reload();
            })

            $('.remove_block_tap').click( async function () 
            {
                var acceptInvestor = await callApi({
                    methodName: "removePayInvestor",
                    data: _data.invester.user,
                });

                alert('Отказано!');
                location.reload();
            })
        }

        async render(allData) 
        {
            var _data = await callApi({
                methodName: "ALL_DATA",
                data: global.allData.User._id,
            });

            console.log(_data);

            if(allData.User.type == "business")
            {
                var _data = await callApi({
                    methodName: "Business_status_projects",
                    data: allData,
                });

                console.log(_data);

                var settingBlock = $(`
                    <div class="settingBlock">
                        <div class="settingBlock_header">
                            <p>История оплат</p>
                            <div class="settingBlock_header_line">
                                <span>#</span>
                                <span>Название проекта</span>
                                <span>Номер проекта</span>
                                <span>Номер Инвестора</span>
                                <span>Статус</span>
                            </div>
                        </div>
                        <div class="settingBlock_body">

                        </div>
                    </div>
                `);

                var i = 0;

                for(var element of _data)
                {
                    var _projectGet = await callApi({
                        methodName: "getProjectById",
                        data: element.projectId,
                    });

                    var _status = {
                        "wait": `
                            <span class="settingBlock_wait settingBlock_block">Ожидает подтверждения</span>
                        `,
                        "accept": `
                            <span class="settingBlock_accept_color settingBlock_block">Оплата подтверждена</span>
                        `,
                    }
                    var template_text = `
                        <div class="settingBlock_body_line" data="${element.invester}" data-more="${element.projectId}">
                            <span>${i + 1}</span>
                            <span>${_projectGet.data.name}</span>
                            <span>${element.projectId}</span>
                            <span>${element.invester}</span>
                            <span>${_status[element.status]}</span>
                        </div>
                    `;

                    settingBlock.find('.settingBlock_body').append(template_text);

                    i++;
                }

                $('.index_page_body_data').append(settingBlock);

                $('.settingBlock_body_line').click( function () {
                    location.href = window.location.href + `&id=${$(this).attr('data')}&project=${$(this).attr('data-more')}`;
                })
            } else 
            {
                var settingBlock = $(`
                    <div class="settingBlock" style="margin-bottom: 20px">
                        <div class="settingBlock_header">
                            <div class="invester_status_projects_status_first">
                                <div class="invester_status_projects_status_first_line">
                                    <span>Проинвестировано</span>
                                    <a>${_data.invester_data.invested.toString().ReplaceNumber()} руб.</a>
                                    <span>Получено</span>
                                    <a>${_data.invester_data.paid.toString().ReplaceNumber()} руб</a>
                                </div>
                                <div class="invester_status_projects_status_first_line">
                                    <span>Ожидают подтверждения</span>
                                    <a>${_data.invester_data.investedWait.toString().ReplaceNumber()} руб</a>
                                    <span>Ближайшие поступления на</span>
                                    <a>${_data.invester_data.receipts.toString().ReplaceNumber()} руб</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="settingBlock" style="margin-bottom: 20px">
                        <div class="settingBlock_header">
                            <div class="invester_status_projects_status_first">
                                <div class="invester_status_projects_status_first_line">
                                    <span>Привлечено инвесторов</span>
                                    <a>${_data.attracted.investers.length}</a>
                                    <span>Бонус</span>
                                    <a>0 руб</a>
                                </div>
                                <div class="invester_status_projects_status_first_line">
                                    <span>Привлечено бизнес проектов</span>
                                    <a>${_data.attracted.business.length}</a>
                                    <span>Бонус</span>
                                    <a>0 руб</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="settingBlock" style="margin-bottom: 20px">
                        <div class="settingBlock_header">
                            <div class="invester_status_projects_status_first">
                                <div class="invester_status_projects_status_first_line">
                                    <span>Проивестировано в проекты</span>
                                    <a>${_data.invester_data.acceptInvs.length}</a>
                                </div>
                            </div>
                        </div> 
                    </div>
                `);

                $('.index_page_body_data').append(settingBlock);

                var settingBlock = $(`
                    <div class="settingBlock">
                        <div class="settingBlock_header">
                            <p>Активные проекты</p>
                            <div class="settingBlock_header_line">
                                <span>№</span>
                                <span>№ Проекта</span>
                                <span>Название</span>
                                <span>Договор</span>
                                <span>Сумма входа</span>
                                <span>Сумма платежа</span>
                            </div>
                        </div>
                        <div class="settingBlock_body">

                        </div>
                    </div>
                `);

                var i = 0;

                for(var element of _data.invester_data.activeInvs)
                {
                    var maxDate             = new Date(Number(element.Inv.date));
                    var maxDateFormatted    =  this.pad(maxDate.getDate(), 2, '0') + '.' + this.pad(maxDate.getMonth() + 1, 2, '0') + '.' + maxDate.getFullYear();

                    var lastPay = 0;

                    for(var payInv of element.Inv.pays)
                    {
                        if(payInv.status == "wait")
                        {
                            lastPay = payInv.pay;
                            break;
                        }
                    }

                    var template_text = $(`
                        <div class="settingBlock_body_line" data="${element.Inv.invester}" data-more="${element.Inv.projectId}">
                            <span>${i + 1}</span>
                            <span>${element.project._id}</span>
                            <span>${element.project.data.name}</span>
                            <span>${element.project._id}/${element.number} от ${maxDateFormatted}</span>
                            <span>${element.Inv.data.pay} руб</span>
                            <span>${lastPay} руб</span>
                        </div>
                    `);

                    template_text.click( function () {
                        location.href = window.location.href + `&id=${$(this).attr('data')}&project=${$(this).attr('data-more')}`;
                    })

                    settingBlock.find('.settingBlock_body').append(template_text);

                    i++;
                };

                $('.index_page_body_data').append(settingBlock);

                
            } 
        }
    }

    class put_document
    {
        constructor() {};

        async render(allData) 
        {
            var _data = await callApi({
                methodName: "invester_status_projects",
                data: allData,
            });
            
            var statusBlock = "invester_status_project_yellow";

            var text = `
                <div class="invester_status_project ${statusBlock}">
                    <p>Вставте документ</p>
                    <input type="file" placeholder="Документ">
                </div>
            `;

            $('.content').append(text);   
        }
    }

    class process_status 
    {
        constructor() {};

        async render(allData) 
        {
            var _data = await callApi({
                methodName: "invester_status_projects",
                data: allData,
            });

            if(_data.length > 0) {
                _data.forEach(function(element) 
                {
                    var statusBlock     = "";
                    var statusInfo      = "";
    
                    if(!element.document) {
                        statusBlock = "invester_status_project_yellow";
                        statusInfo  = "Не подписан документ";
                    } else {
                        statusInfo  = "Деньги не переведенны";
                    }
    
                    var text = `
                        <div class="invester_status_project ${statusBlock}">
                            <p>Проект номер: ${element.projectId}</p>
                            <p>${statusInfo}</p>
                        </div>
                    `;
    
                    $('.content').append(text);
                })
            } else {
                var statusBlock = "invester_status_project_red";

                var text = `
                    <div class="invester_status_project ${statusBlock}">
                        <p>Вы не подавали заявку на инвестирование</p>
                    </div>
                `;

                $('.content').append(text);
            }
        }
    }

    class pay_investors {
        constructor() {};

        rednderCheackInvesting(_id) {
            $('.content').empty(text);

            var statusBlock = "invester_status_project_red";

            var text = `
                <div class="invester_status_project ${statusBlock} cheackInvestingUser">
                    <p>Оплаченно</p>
                </div>
            `;

            $('.content').append(text);
        }

        async render() 
        {
            var _id = _GET('id');
            var _data = await callApi({
                methodName: "getInvestorsProject",
                data: _id,
            });

            var _needData = [];

            _data.forEach(el => {
                if(el.receipt) {
                    _needData.push(el);
                }
            });

        
            var settingBlock = $(`
                <div class="settingBlock">
                    <div class="settingBlock_header">
                        <p>Не выплачено</p>
                        <div class="settingBlock_header_line">
                            <span>#</span>
                            <span>ID</span>
                            <span>Инвестор ID</span>
                            <span>Кнопка</span>
                        </div>
                    </div>
                    <div class="settingBlock_body">

                    </div>
                </div>
            `);

            $('.index_page_body_data').append(settingBlock);
        
        }
    }

    class acceptPays 
    {
        constructor() {};

        async render() 
        {
            var _id = global.allData._id;

            var _data = await callApi({
                methodName: "notAcceptInvesting",
                data: _id,
            });

            console.log(_data);

            var settingBlock = $(`
                <div class="settingBlock">
                    <div class="settingBlock_header">
                        <p>Не подтвержденные оплаты</p>
                        <div class="settingBlock_header_line">
                            <span>#</span>
                            <span>Номер проекта</span>
                            <span>Сумма инвестиции</span>
                            <span>Инвестор ID</span>
                            <span>Кнопка</span>
                        </div>
                    </div>
                    <div class="settingBlock_body">

                    </div>
                </div>
            `);

            _data.forEach(function(element, i) {
                var _status = {
                    "wait": `
                        <span class="settingBlock_wait settingBlock_block settingBlock_accept" data="${element.invester}">Открыть</span>
                    `,
                }
                var template_text = `
                    <div class="settingBlock_body_line" data="${element.invester}"  data_more="${element._id}">
                        <span>${i + 1}</span>
                        <span>${element.projectId}</span>
                        <span>${element.data.pay.toString().ReplaceNumber()} руб</span>
                        <span>${element.invester}</span>
                        <span>${_status[element.status]}</span>
                    </div>
                `;

                settingBlock.find('.settingBlock_body').append(template_text);
            })

            $('.index_page_body_data').append(settingBlock);

            $('.settingBlock_body_line').click( function () {
                location.href = `/?page=activ_projects&id=${$(this).attr('data_more')}`;
            })
        }
    }

    class myProjects
    {
        constructor() {};

        async render(data_rt) 
        {
            var _data = await callApi({
                methodName: "getAllProjectsBusiness",
                data: data_rt._id,
            });

            console.log(_data);

            var settingBlock = $(`
                <div class="settingBlock">
                    <div class="settingBlock_header">
                        <p>Доступные проекты</p>
                        <div class="settingBlock_header_line">
                            <span>#</span>
                            <span>Номер проекта</span>
                            <span>Название</span>
                            <span>Кнопка</span>
                        </div>
                    </div>
                    <div class="settingBlock_body">

                    </div>
                </div>
            `);

            _data.forEach(function(element, i) {
                var template_text = `
                    <div class="settingBlock_body_line" data="${element._id}">
                        <span>${i + 1}</span>
                        <span>${element._id}</span>
                        <span>${element.data.name}</span>
                        <span><span class="settingBlock_wait settingBlock_block settingBlock_accept" data="${element._id}">Открыть</span></span>
                    </div>
                `;

                settingBlock.find('.settingBlock_body').append(template_text);
            })

            $('.index_page_body_data').append(settingBlock);

            $('.settingBlock_body_line').click( function() {
                location.href = `/?page=myProjects&id=${$(this).attr('data')}`;
            })
        }

        async renderType()
        {
            var Project_data = await callApi({
                methodName: "getProjectNew",
                data: _GET('id'),
            });

            var _header = $(`
                <div class="info_block_project">
                    <span>№ ${Project_data.project._id}</span>
                    <span>${Project_data.project.data.name}</span>
                    <span>${Project_data.project.type}</span>
                </div>
            `);

            $('.index_page_body_data').append(_header);

            var settingBlock = $(`
                <div class="settingBlock" style="margin-bottom: 20px">
                    <div class="settingBlock_header">
                        <div class="invester_status_projects_status_first">
                            <div class="invester_status_projects_status_first_line">
                                <span>Сумма сбора</span>
                                <a>${Project_data.project.data.attraction_amount.toString().ReplaceNumber()} руб.</a>
                                <span>Собрано</span>
                                <a>${Project_data.moreGetData.paysInvesters.toString().ReplaceNumber()} руб</a>
                            </div>
                            <div class="invester_status_projects_status_first_line">
                                <span>Выплачено</span>
                                <a>${Project_data.moreGetData.paysAcceptInvs.toString().ReplaceNumber()} руб</a>
                                <span>Долг</span>
                                <a>${Project_data.moreGetData.commissionForPtoject.toString().ReplaceNumber()} руб</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="settingBlock" style="margin-bottom: 20px">
                    <div class="settingBlock_header">
                        <div class="invester_status_projects_status_first">
                            <div class="invester_status_projects_status_first_line">
                                <span>Количество инвесторов</span>
                                <a>${Project_data.moreGetData.acceptInvs.length}</a>
                            </div>
                        </div>
                    </div> 
                </div>
            `);

            $('.index_page_body_data').append(settingBlock);

            var settingBlock = $(`
                <div class="settingBlock">
                    <div class="settingBlock_header">
                        <p>Инвестора</p>
                        <div class="settingBlock_header_line">
                            <span>№</span>
                            <span>Номер договора</span>
                            <span>Инвестор</span>
                            <span>Дата договора</span>
                            <span>Сумма</span>
                            <span>Договор</span>
                            <span>Реквизиты</span>
                            <span>Сообщение</span>
                        </div>
                    </div>
                    <div class="settingBlock_body">

                    </div>
                </div>
            `);

            Project_data.moreGetData.invsPush.forEach(function(element, i) 
            {
                var UserNameInvester = null;
                var bank        = null;
                var bik         = null;
                var nomer       = null;
                var nomer_kor   = null;


                element.inv.data.data.forEach(elementMoreData => {
                    if(elementMoreData._id == "fio")
                    {
                        UserNameInvester = elementMoreData.data;
                    };

                    if(elementMoreData._id == "bank")
                    {
                        bank = elementMoreData.data;
                    };

                    if(elementMoreData._id == "bik")
                    {
                        bik = elementMoreData.data;
                    };

                    if(elementMoreData._id == "nomer")
                    {
                        nomer = elementMoreData.data;
                    };

                    if(elementMoreData._id == "nomer_kor")
                    {
                        nomer_kor = elementMoreData.data;
                    };
                });

                var template_text = $(`
                    <div class="settingBlock_body_line" data="${element.inv.invester}" data-project="${element.inv._id}" data-document="${element.inv.urlToLastDocument}">
                        <span>${i + 1}</span>
                        <span>${element.inv.projectId}/${i + 1}</span>
                        <span>${UserNameInvester}</span>
                        <span>${DateFormatted(element.inv.date)}</span>
                        <span>${element.inv.data.pay} руб</span>
                        <span><i class="fal fa-cloud-download"></i></span>
                        <span>
                            <div class="settingBlock_body_line_drop_menu">
                                <p>Банк получателя: <span>${bank}</span></p>
                                <p>БИК: <span>${bik}</span></p>
                                <p>Номер расчетного счета: <span>${nomer}</span></p>
                                <p>Номер кор счета: <span>${nomer_kor}</span></p>
                            </div>
                            <i class="fal fa-cloud-download"></i>
                        </span>
                        <span><i class="fal fa-comments-alt"></i></span>
                    </div>
                `);

                template_text.children('span').eq(0).click( function() {
                    location.href = `./?page=activ_projects&id=${$(this).parent().attr('data-project')}`;
                })
                template_text.children('span').eq(1).click( function() {
                    location.href = `./?page=activ_projects&id=${$(this).parent().attr('data-project')}`;
                }) 
                template_text.children('span').eq(2).click( function() {
                    location.href = `./?page=activ_projects&id=${$(this).parent().attr('data-project')}`;
                })
                template_text.children('span').eq(3).click( function() {
                    location.href = `./?page=activ_projects&id=${$(this).parent().attr('data-project')}`;
                })
                template_text.children('span').eq(4).click( function() {
                    location.href = `./?page=activ_projects&id=${$(this).parent().attr('data-project')}`;
                })
                template_text.children('span').eq(5).click( function() {
                    window.open(`./projects/${$(this).parent().attr('data-project')}/${$(this).parent().attr('data-document')}`, "_blank");
                })

                template_text.children('span').eq(6).css("position", "relative");
                template_text.children('span').eq(6).click( function() 
                {
                    $(".settingBlock_body_line_drop_menu").fadeOut();
                    if($(this).find('.settingBlock_body_line_drop_menu').css('display') == "block")
                    {
                        (this).find('.settingBlock_body_line_drop_menu').fadeOut();
                    } else
                    {
                        $(this).find('.settingBlock_body_line_drop_menu').fadeIn();
                    }
                });


                template_text.children('span').eq(7).click( function() {
                    location.href = `./?page=activ_projects&id=${$(this).parent().attr('data-project')}`;
                })

                settingBlock.find('.settingBlock_body').append(template_text);
            })

            $('.index_page_body_data').append(settingBlock);
        }
    }

    class user_block 
    {
        constructor() {};

        async render(_id) 
        {
            var _User = await callApi({
                methodName: "getUserForId",
                data: _id,
            });

            if(_User != "error")
            {
                var _ImgPath    = _User.Path_im;
                _User           = _User._User;
    
                console.log(_User);
    
                if(_ImgPath)
                {
                    $('.index_page_body_header_user_avatar_img img').attr('src', `https://api.telegram.org/file/bot2062839693:AAE0hzj8SVXyexq29s5x7aRLC5x8O77c-pQ/${_ImgPath.file_path}`);
                }
                
                $('.index_page_body_header_user_avatar_name span').html(_User.first_name + " " + _User.last_name);
                $('.index_page_body_header_user_avatar_name p').html(_User.type);
    
                var buttons = {
                    "investor": 
                    `
                        <div class="index_page_menu_block_line" data="activ_projects">
                            <i class="fal fa-chart-line"></i>
                            <span>Активные проекты</span>
                        </div>
                        <div class="index_page_menu_block_line" data="wait_projects">
                            <i class="fal fa-inventory"></i>
                            <span>Ожидают подтверждения</span>
                        </div>
                        <div class="index_page_menu_block_line" data="Attracted_by_me">
                            <i class="fal fa-users"></i>
                            <span>Мной привлечено</span>
                        </div>
                    `,
                    "business": `
                        <div class="index_page_menu_block_line" data="myProjects">
                            <i class="fal fa-project-diagram"></i>
                            <span>Мои проекты</span>
                        </div>
                        <div class="index_page_menu_block_line" data="payments_new">
                            <i class="fal fa-money-check"></i>
                            <span>Выплаты</span>
                        </div>
                        <div class="index_page_menu_block_line" data="obligations">
                            <i class="fal fa-file-import"></i>
                            <span>Обязательства перед investER</span>
                        </div>
                        <div class="index_page_menu_block_line" data="acceptPays">
                            <i class="fal fa-check-square"></i>
                            <span>Поступления</span>
                        </div>
                    `,
                    "attraction": `
                        <!-- <div class="index_page_menu_block_line" data="reward">
                            <i class="fal fa-money-check-alt"></i>
                            <span>Вознаграждение</span>
                        </div> -->
                        <div class="index_page_menu_block_line" data="Attracted_by_me">
                            <i class="fal fa-users"></i>
                            <span>Мной привлечено</span>
                        </div>
                    `,
                }
    
                var button = buttons[_User.type];
    
                console.log(button);
    
                $('.index_page_menu_block').append(button);
    
                $(`.index_page_menu_block_line[data="${global.allData.pageID}"]`).addClass('selected');
                $('.index_page_body_header_info span').html($('.index_page_menu_block_line.selected').text());
    
                $('.index_page_menu_block_line').click( function() {
                    location.href = `/?page=${$(this).attr('data')}`;
                });
    
                if(_User.type == "business")
                {
                    $('.add_project_button').click( function() {
                        location.href = `/?page=creating`;
                    });
                } else 
                {
                    $('.add_project_button span').html("Инвестировать");
    
                    $('.add_project_button').click( function() {
                        location.href = `https://t.me/invester_official`;
                    });
                }
    
                if(_User.alerts)
                {
                    _User.alerts.forEach(function(alert) {
                        if(alert.type == "Attracted_by_me")
                        {
                            $('.index_page_menu_block_line[data="Attracted_by_me"]').addClass('alerts');
                        }
                    })
                }
    
                if(_User.alert_msgs)
                {
                    $('.index_page_menu_block_line[data="chats"] .index_page_menu_block_line_alert i').css('display', 'flex');
                }
            }

            return _User;
        }
    }

    class chats {
        constructor() {};

        async render(data) 
        {
            if(_GET('owner')) 
            {
                var templateText = `
                    <div class="chat_block">
                        <div class="chat_block_chat">
                            <div class="chat_block_chat_header">
                                <span>Чат</span>
                            </div>
                            <div class="chat_block_chat_body">
                                <div class="chat_block_chat_body_row">

                                    <div class="chat_block_chat_body_msgs">

                                    </div>

                                    <div class="chat_block_chat_body_row_input">
                                        <input type="text">
                                        <span>Отправить</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="chat_block_info">
                            <div class="info_active_block_photo">
                            
                            </div>
                            <span>Тех поддержка</span>
                            <p>Администрация</p>
                        </div>
                    </div>
                `;

                $('.index_page_body_data').append(templateText);
            } else {
                if(_GET('id')) {

                    var all_msgs = await callApi({
                        methodName: "all_msgs",
                        data: {
                            user: _GET('user'),
                            to: _GET('id'),
                        },
                    });
    
                    var clearAlertMsg = await callApi({
                        methodName: "clearAlertMsg",
                        data: global.allData._id,
                    });
    
                    console.log(all_msgs);
    
    
                    var templateText = `
                        <div class="chat_block">
                            <div class="chat_block_chat">
                                <div class="chat_block_chat_header">
                                    <span>Чат</span>
                                </div>
                                <div class="chat_block_chat_body">
                                    <div class="chat_block_chat_body_row">
    
                                        <div class="chat_block_chat_body_msgs">
    
                                        </div>
    
                                        <div class="chat_block_chat_body_row_input">
                                            <input type="text">
                                            <span>Отправить</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="chat_block_info">
                                <div class="info_active_block_photo">
                                
                                </div>
                                <span>Кирилл Максимов</span>
                                <p>Invester</p>
                            </div>
                        </div>
                    `;
        
                    $('.index_page_body_data').append(templateText);
    
                    if(all_msgs) {
                        if(all_msgs.msgs.length > 0) {
                            all_msgs.msgs.forEach(function(el) 
                            {
                                var myBlock = `
                                    <div class="chat_block_chat_body_msgs_line">
                                        <div class="chat_block_chat_body_msgs_line_my">
                                            <span>${el.text}</span>
                                        </div>
                                    </div>
                                `;
    
                                var notMyblock = `
                                    <div class="chat_block_chat_body_msgs_line chat_block_chat_body_msgs_line_left">
                                        <div class="chat_block_chat_body_msgs_line_my">
                                            <span>${el.text}</span>
                                        </div>
                                    </div>
                                `;
    
                                if(global.allData.User.type == "business")
                                {
                                    if(el.type == "investor")
                                    {
                                        $('.chat_block_chat_body_msgs').append(notMyblock);
                                    } else {
                                        $('.chat_block_chat_body_msgs').append(myBlock);
                                    }
                                } else {
                                    if(el.type == "investor")
                                    {
                                        $('.chat_block_chat_body_msgs').append(myBlock);
                                    } else {
                                        $('.chat_block_chat_body_msgs').append(notMyblock);
                                    }
                                }
    
                                
                            })
            
                            $('.chat_block_chat_body_msgs').animate({scrollTop: $('.chat_block_chat_body_msgs').height()}, 'fast');
                        }
                    }
        
                    var Project_data = await callApi({
                        methodName: "getProject",
                        data: _GET('id'),
                    });
    
                    var _User = await callApi({
                        methodName: "getUserForId",
                        data: _GET('user'),
                    });
        
                    var headerShow = {
                        "investor": function() {
                            $('.chat_block_info span').html(Project_data.data.name);
                            $('.chat_block_info p').html("business");
                        },
                        "business": function() {
                            $('.chat_block_info span').html(_User.first_name);
                            $('.chat_block_info p').html("investor");
                        },
                    }
        
                    headerShow[_User._User.type]();
        
                    $('.chat_block_chat_body_row_input input').focus( async function() {
                        $(window).keyup(async function(event){
                            if(event.keyCode == 13) {
                                event.preventDefault();
                                var myBlock = `
                                    <div class="chat_block_chat_body_msgs_line">
                                        <div class="chat_block_chat_body_msgs_line_my">
                                            <span>${$('.chat_block_chat_body_row_input input').val()}</span>
                                        </div>
                                    </div>
                                `;
        
                                $('.chat_block_chat_body_msgs').append(myBlock);
        
                                $('.chat_block_chat_body_msgs').animate({scrollTop: $('.chat_block_chat_body_msgs').height()}, 'fast');
        
                                await callApi({
                                    methodName: "msgUP",
                                    data: {
                                        user: _GET('user'),
                                        to: _GET('id'),
                                        type: _User.type,
                                        msg: $('.chat_block_chat_body_row_input input').val(),
                                    },
                                });
        
                                $('.chat_block_chat_body_row_input input').val('');
                            }
                        });
                    });
        
                    $('.chat_block_chat_body_row_input span').click( async function() {
        
                        var myBlock = `
                            <div class="chat_block_chat_body_msgs_line">
                                <div class="chat_block_chat_body_msgs_line_my">
                                    <span>${$('.chat_block_chat_body_row_input input').val()}</span>
                                </div>
                            </div>
                        `;
        
                        $('.chat_block_chat_body_msgs').append(myBlock);
        
                        $('.chat_block_chat_body_msgs').animate({scrollTop: $('.chat_block_chat_body_msgs').height()}, 'fast');
        
                        await callApi({
                            methodName: "msgUP",
                            data: {
                                user: _GET('user'),
                                to: _GET('id'),
                                type: _User.type,
                                msg: $('.chat_block_chat_body_row_input input').val(),
                            },
                        });
        
                        $('.chat_block_chat_body_row_input input').val('');
                    });
                } else 
                {
                    console.log('start');
    
                    var selectedMsgChats = await callApi({
                        methodName: "selectedMsgChats",
                        data: data._id,
                    });
    
                    console.log(selectedMsgChats);
    
                    var block = $(`
                        <div class="msg_block_getting">
    
                        </div>
                    `);
    
                    selectedMsgChats.forEach(el => {
    
                        var template_text = $(`
                            <div class="msg_block_getting_line" data="${el.business}" data-more="${el.investor}">
                                <div class="msg_block_getting_line_img">
                                    <div class="msg_block_getting_line_img_block"></div>
                                </div>
                                <div class="msg_block_getting_line_text">
                                    <span>VIBERY.STORE</span>
                                    <p>${el.msgs[el.msgs.length - 1].text}</p>
                                </div>
                            </div>
                        `);
                        
                        block.append(template_text);
                    })
    
                    $('.index_page_body_data').append(block);
    
                    $('.msg_block_getting_line').click( function() {
                        location.href = `https://invester-relocation.site/?user=${$(this).attr('data-more')}&page=chats&id=${$(this).attr('data')}`;
                    })
    
                }
            }
        }
    }

    class signature
    {
        constructor() {};

        async render() 
        {
            $('.index_page').addClass('signature');

            var _body = $(`
                <div class="signature_canvas">
                    <div class="signature_canvas_row">
                        <span class="signature_canvas_span">Подпишите документ</span>
                        <div class="row_canvas">
                            <canvas width="700" height="400"></canvas>
                        </div>
                        <div class="index_page_buttons">
                            <span class="clean">Очистить</span>
                            <span class="put">Посмотреть подписываемый документ<i class="fas fa-arrow-right" aria-hidden="true"></i></span>
                            <span class="accept_signature">Отправить</span>
                        </div>
                    </div>
                </div>
            `);

            $('.index_page_body_data').append(_body);

            var canvas          = document.querySelector("canvas");
            var signaturePad    = new SignaturePad(canvas);

            $('.clean').click( function() {
                signaturePad.clear();
            });

            $('.put').click( function() {
                window.open(`https://invester-relocation.site/html/project/document/#${_GET('id')}#/?id=${global.allData.User._id}`, '_blank');
            });

            $('.accept_signature').click( async function() 
            {
                alert('Документ подписан!');

                const _dataImg = signaturePad.toDataURL();

                var _data = callApi({
                    methodName: "setSignaturePro",
                    data: {
                        id: _GET('id'),
                        user: _GET('user'),
                        data: _dataImg,
                    },
                });

                location.href = "https://t.me/invester_official_bot?start=setSignaturePro_1";
            })
        }
    }

    class Attracted_by_me
    {
        constructor() {
            this.allMoneyMembers    = 0;
            this._paysInvesters     = [];
            this._paysBusiness      = [];
            this.allAttracted       = null;
        };

        async renderHeader(_data) 
        {
            var headerInfoBlock = 
            $(`
                <div class="Attracted_by_me_headerRefUrlsBlock">
                    <div class="Attracted_by_me_headerRefUrlsBlock_blocks">
                        <div class="Attracted_by_me_headerRefUrlsBlock_blocks_line">
                            <span>Ваша реферальная ссылка для Инвесторов</span>
                            <span>https://t.me/invester_official_bot?start=adder_${_data.User.user}</span>
                            <div class="Attracted_by_me_headerRefUrlsBlock_blocks_line_copy">
                                <i class="fal fa-copy"></i>
                            </div>
                        </div>
                        <div class="Attracted_by_me_headerRefUrlsBlock_blocks_line">
                            <span>Ваша реферальная ссылка для Бизнеса</span>
                            <span>https://t.me/invester_official_bot?start=adder-b_${_data.User.user}</span>
                            <div class="Attracted_by_me_headerRefUrlsBlock_blocks_line_copy">
                                <i class="fal fa-copy"></i>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="Attracted_headerInfoBlock">
                    <div class="Attracted_headerInfoBlock_block">
                        <div class="Attracted_headerInfoBlock_block_i">
                            <i class="fas fa-users"></i>
                        </div>
                        <div class="Attracted_headerInfoBlock_block_text">
                            <span>Мной привлечено инвесторов</span>
                            <p>${this.allAttracted.investors.length}</p>
                        </div>
                    </div>
                    <div class="Attracted_headerInfoBlock_block">
                        <div class="Attracted_headerInfoBlock_block_i">
                            <i class="fal fa-credit-card-blank"></i>
                        </div>
                        <div class="Attracted_headerInfoBlock_block_text Attracted_headerInfoBlock_block_text_moneys" data="wait">
                            <span>Общая сумма бонусов начисленных</span>
                            <p>0</p>
                        </div>
                    </div>
                </div>
                <div class="Attracted_headerInfoBlock">
                    <div class="Attracted_headerInfoBlock_block">
                        <div class="Attracted_headerInfoBlock_block_i">
                            <i class="fal fa-chair-office"></i>
                        </div>
                        <div class="Attracted_headerInfoBlock_block_text">
                            <span>Мной привлечено бизнесс проектов</span>
                            <p>${this.allAttracted.business.length}</p>
                        </div>
                    </div>
                    <div class="Attracted_headerInfoBlock_block">
                        <div class="Attracted_headerInfoBlock_block_i">
                            <i class="fal fa-envelope-open-dollar"></i>
                        </div>
                        <div class="Attracted_headerInfoBlock_block_text Attracted_headerInfoBlock_block_text_moneys" data="accept">
                            <span>Общая сумма бонусов выплаченных</span>
                            <p>0</p>
                        </div>
                    </div>
                </div>
            `);

            headerInfoBlock.find(".Attracted_by_me_headerRefUrlsBlock_blocks_line_copy").click( function() {
                var $tmp = $("<textarea>");
                $("body").append($tmp);
                $tmp.val($(this).parent().find('span').eq(1).text()).select();
                document.execCommand("copy");
                $tmp.remove();
                alert('Ваша ссылка скопирована в буфер обмена!');
            });

            var moreGetButtons = $(`
                <div class="moreGetButtons" data="get">
                    <span data="get"><i class="fad fa-money-check-edit-alt"></i> Запросить выплату</span>
                </div>
            `);

            moreGetButtons.find('span[data="get"]').click( function () {
                location.href = "./?page=get_money_abstraction"
            });

            $('.index_page_body_data').append(headerInfoBlock);
            $('.index_page_body_data').append(moreGetButtons);
        }

        async renderInvesters(_pays) 
        {      
            var settingBlock = $(`
                <div class="settingBlock">
                    <div class="settingBlock_header">
                        <p>Привлеченные инвестора</p>
                        <div class="settingBlock_header_line">
                            <span>#</span>
                            <span>username</span>
                            <span>Имя</span>
                        </div>
                    </div>
                    <div class="settingBlock_body">

                    </div> 
                </div>
            `);

            settingBlock.css("margin-top", "20px");

            var initNumber = 1;

            for(var element of this.allAttracted.investors)
            {
                var template_text = `
                    <div class="settingBlock_body_line">
                        <span>${initNumber}</span>
                        <span>${element.username}</span>
                        <span>${element.first_name}</span>
                    </div>
                `;

                initNumber++;

                settingBlock.find('.settingBlock_body').append(template_text);
            }

            $('.index_page_body_data').append(settingBlock);

            return;
        }

        async renderBussnes(_dataMore)
        {
            var settingBlock = $(`
                <div class="settingBlock">
                    <div class="settingBlock_header">
                        <p>Привлеченные бизнес проекты</p>
                        <div class="settingBlock_header_line">
                            <span>Номер проекта</span>
                            <span>Название проекта</span>
                            <span>Сумма выплаты</span>
                        </div>
                    </div>
                    <div class="settingBlock_body">

                    </div> 
                </div>
            `);

            settingBlock.css("margin-top", "20px");

            for(var element of this.allAttracted.business)
            {  
                var template_text = `
                    <div class="settingBlock_body_line">
                        <span>${element._id}</span>
                        <span>${element.data.name}</span>
                        <span>${((element.payersData.commission) * (element.payersData.attraction_commission / 100) * (element.payersData.business_commission / 100)).toFixed(3)} %</span>
                    </div>
                `;

                settingBlock.find('.settingBlock_body').append(template_text);
            }

            $('.index_page_body_data').append(settingBlock);

            return;
        }

        async allProjectsRender() {
            var _data = await callApi({
                methodName: "getAllProjectsInvesting",
                data: null,
            });

            console.log(_data);

            var settingBlock = $(`
                <div class="settingBlock">
                    <div class="settingBlock_header">
                        <p>Вознаграждения по проектам</p>
                        <div class="settingBlock_header_line">
                            <span>ID Предложения</span>
                            <span>Имя предложения</span>
                            <span>Сумма выплаты за инвестора</span>
                        </div>
                    </div>
                    <div class="settingBlock_body">

                    </div> 
                </div>
            `);

            settingBlock.css("margin-top", "20px");

            for(var element of _data)
            {
                var procentAttraction   = Number(element.payersData.commission / 100 * element.payersData.attraction_commission);
                var procentInvester     = Number(procentAttraction / 100 * element.payersData.investors_commission);

                var template_text = $(`
                    <div class="settingBlock_body_line">
                        <span>${element._id}</span>
                        <span>${element.data.name}</span>
                        <span>${procentInvester}%</span>
                    </div>
                `);

                template_text.click( function() {
                    window.location = `tg://resolve?domain=invester_official&post=${element.channel_id}`;
                })

                settingBlock.find('.settingBlock_body').append(template_text);
            }

            $('.index_page_body_data').append(settingBlock);
        }

        async renderAllPayments()
        {
            var _WaitMoneys     = 0;
            var _AcceptMoneys   = 0;
            var allPayments     = await callApi({
                methodName: "allPayments",
                data:  global.allData._id,
            });

            var settingBlock = $(`
                <div class="settingBlock">
                    <div class="settingBlock_header">
                        <p>Статистика ваших выплат</p>
                        <div class="settingBlock_header_line">
                            <span>№</span>
                            <span>Тип привлечения</span>
                            <span>Номер Проекта/Инвестора</span>
                            <span>Сумма выплаты</span>
                            <span>Дата</span>
                        </div>
                    </div>
                    <div class="settingBlock_body">

                    </div> 
                </div>
            `);

            settingBlock.css("margin-top", "20px");

            var initNumber = 1;

            for(var element of allPayments)
            {
                var investerPay                     = Number(element.pay.toString().replace(/\s/g, ''));
                var commissionCompany               = Number(investerPay / 100 * Number(element.data.ProjectData.commission));
                var commissionAttraction            = Number(commissionCompany / 100 * Number(element.data.ProjectData.attraction_commission));
                var commissionAttractionInvester    = Number(commissionAttraction / 100 * element.data.ProjectData.investors_commission);
                var commissionAttractionBusiness    = Number(commissionAttraction / 100 * element.data.ProjectData.business_commission);
                var commissionAttractionNeedPay     = 0;
                var AttractionType                  = "Инвестор";
                var AttractionId                    = null;

                if(element.type == "investing")
                {
                    commissionAttractionNeedPay = commissionAttractionInvester;
                    AttractionId                = element.data._InvInvester;
                } else 
                {
                    commissionAttractionNeedPay = commissionAttractionBusiness;
                    AttractionType              = "Бизнес";
                    AttractionId                = element.data._id;
                }

                var template_text = $(`
                    <div class="settingBlock_body_line">
                        <span>${initNumber}</span>
                        <span>${AttractionType}</span>
                        <span>${AttractionId}</span>
                        <span>${commissionAttractionNeedPay.toString().ReplaceNumber()} руб</span>
                        <span>${DateFormatted(element.date)}</span>
                    </div>
                `);

                settingBlock.find('.settingBlock_body').append(template_text);

                initNumber++;

                if(element.status == "wait")
                {
                    _WaitMoneys     = _WaitMoneys + commissionAttractionNeedPay;
                }

                if(element.status == "accept")
                {
                    _AcceptMoneys   = _AcceptMoneys + commissionAttractionNeedPay;
                }
            }

            $('.Attracted_headerInfoBlock_block_text_moneys[data="wait"] p').html(_WaitMoneys.toString().ReplaceNumber() + " руб");
            $('.Attracted_headerInfoBlock_block_text_moneys[data="accept"] p').html(_AcceptMoneys.toString().ReplaceNumber() + " руб");

            $('.index_page_body_data').append(settingBlock);
        }

        async render(data) 
        {
            var _data = await callApi({
                methodName: "ALL_DATA",
                data: global.allData.User._id,
            });

            var _pays       = await callApi({
                methodName: "Attracted_by_pays",
                data: data._id,
            });

            var allAttracted = await callApi({
                methodName: "allAttracted",
                data: data._id,
            }); 

            var _this = this;

            console.log(_pays);
            console.log(allAttracted);

            this.allAttracted = allAttracted;

            _pays.forEach(el=> {
                if(el.type == "investing")
                {
                    _this._paysInvesters.push(el);
                } else {
                    _this._paysBusiness.push(el);
                }
            })

            await this.renderHeader(_data);
            await this.allProjectsRender();
            await this.renderInvesters();
            await this.renderBussnes();
            await this.renderAllPayments();
        }
    }

    class reward
    {
        constructor() {};

        async render() {
            var settingBlock = $(`
                <div class="settingBlock">
                    <div class="settingBlock_header">
                        <p>Доступные вознаграждения</p>
                        <div class="settingBlock_header_line">
                            <span>#</span>
                            <span>Номер проекта</span>
                            <span>Дата</span>
                            <span>Статус</span>
                        </div>
                    </div>
                    <div class="settingBlock_body">

                    </div>
                </div>
            `);

            $('.index_page_body_data').append(settingBlock);
        }
    }

    class ref_url
    {
        constructor() {
            this.global = $(`
                <div class="creating_page"></div>
            `);
        };

        async render() {
            $('.index_page_menu').css({
                "flex": "none",
                "position": "absolute",
                "margin-left": "-100%",
            });

            $('.index_page_body_header_info').css({
                "justify-content": "center",
            });

            $('.index_page_body_header_info span').html("ВАША ССЫЛКА НА ПРИВЛЕЧЕНИЕ БИЗНЕС ПРОЕКТОВ");

            var msgsBlock = $(`
                <div class="creating_page_block">
                    <div class="creating_page_start">
                        <span>
                            https://t.me/invester_official_bot?start=adder-b_${global.allData.User.user}
                        </span>
                    </div>
                </div>
            `);

            msgsBlock.css('margin', '0 auto');

            this.global.append(msgsBlock);

            $('.index_page_body_data').append(this.global);
        }
    }

    class wait_projects
    {
        constructor() {};

        async render()
        {
            var _data = await callApi({
                methodName: "ALL_DATA",
                data: global.allData.User._id,
            });

            console.log(_data);

            var settingBlock = $(`
                <div class="settingBlock">
                    <div class="settingBlock_header">
                        <p>Ожидают подтверждания</p>
                        <div class="settingBlock_header_line">
                            <span>№</span>
                            <span>№ Проекта</span>
                            <span>Название</span>
                            <span>Договор</span>
                            <span>Сумма</span>
                            <span>Статус</span>
                        </div>
                    </div>
                    <div class="settingBlock_body">

                    </div>
                </div>
            `);

            var i = 0;

            for(var element of _data.invester_data.waitInvs)
            {
                var template_text = $(`
                    <div class="settingBlock_body_line" data="${element.Inv.invester}" data-more="${element.Inv.projectId}">
                        <span>${i + 1}</span>
                        <span>${element.project._id}</span>
                        <span>${element.project.data.name}</span>
                        <span>${element.project._id}/${element.number}</span>
                        <span>${element.Inv.data.pay}</span>
                        <span>Ожидает подтверждения</span>
                    </div>
                `);

                template_text.click( function () {
                    location.href = `/?page=activ_projects&id=${$(this).attr('data')}&project=${$(this).attr('data-more')}`;
                })

                settingBlock.find('.settingBlock_body').append(template_text);

                i++;
            };

            $('.index_page_body_data').append(settingBlock);
        }
    }

    var components = {
        Attracted_by_me,
        activ_projects,
        put_document,
        pay_investors,
        acceptPays,
        user_block,
        chats,
        myProjects,
        signature,
        reward,
        process_status,
        ref_url,
        wait_projects,
    };

    if(!global.Components) { global.Components = components; } 
    else { 
        for(var key in components)
        {
            global.Components[key] = components[key];
        }
    }

}(window))