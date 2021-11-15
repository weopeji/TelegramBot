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
            $('.info_active_block_right').append(`
                <div class="info_active_block_photo">
                        
                </div>
                <span>${_data.invester.first_name} ${_data.invester.last_name}</span>
                <p>Invester</p>
                <div class="info_active_block_massage_button">
                    <span>Перейти к диалогу</span>
                </div>
            `);

            if(_data.InvDoc.status == "accept")
            {
                var headerPaysBlock = $(`
                    <div class="headerPaysBlock">
                        <div class="headerPaysBlock_header">
                            <span class="headerPaysBlock_header_span">Выплаты по проекту</span>
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

                var _status = {
                    "wait": "Прикрепить чек",
                    "accept": "Оплачено"
                }

                _data.InvDoc.pays.forEach((el, i) => {
                    var maxDate = new Date(el.date);
                    var maxDateFormatted =
                        maxDate.getFullYear() +
                        ':' + this.pad(maxDate.getMonth() + 1, 2, '0') +
                        ':' + this.pad(maxDate.getDate(), 2, '0');
                
                    var _block = $(`
                        <div class="headerPaysBlock_body_line">
                            <span>${i + 1}</span>
                            <span>${maxDateFormatted}</span>
                            <span>${Math.ceil(el.pay)} руб</span>
                            <span class="headerPaysBlock_button" data="${el.status}">
                                <input type="file" name="" id='${i}'>
                                <label for="${i}">${_status[el.status]}</label>
                            </span>
                        </div>
                    `);

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
                        }
                    });

                    $(this).val('');
                });

                $('.index_page_body_data').append(headerPaysBlock);
            } else {
                $('.index_page_body_data').append(`
                    <div class="Attracted_headerInfoBlock">
                        <div class="Attracted_headerInfoBlock_block accept_block_tap">
                            <div class="Attracted_headerInfoBlock_block_i">
                                <i class="fad fa-check"></i>
                            </div>
                            <div class="Attracted_headerInfoBlock_block_text">
                                <p>Подтвердить оплату</p>
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
                    <span>Перейти к диалогу</span>
                </div>
            `);

            $('.index_page_body_data').append(settingBlock);

            if(_data.InvDoc.status == "accept")
            {
                var headerPaysBlock = $(`
                    <div class="headerPaysBlock">
                        <div class="headerPaysBlock_header">
                            <span class="headerPaysBlock_header_span">Выплаты по проекту</span>
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

                var _status = {
                    "wait": "Ожидает оплату",
                }

                _data.InvDoc.pays.forEach((el, i) => {
                    var maxDate = new Date(el.date);
                    var maxDateFormatted =
                        maxDate.getFullYear() +
                        ':' + this.pad(maxDate.getMonth() + 1, 2, '0') +
                        ':' + this.pad(maxDate.getDate(), 2, '0');
                
                    var _block = $(`
                        <div class="headerPaysBlock_body_line">
                            <span>${i + 1}</span>
                            <span>${maxDateFormatted}</span>
                            <span>${Math.ceil(el.pay)} руб</span>
                            <span class="headerPaysBlock_body_line_inv">
                                <span>
                                    ${_status[el.status]}
                                </span>
                            </span>
                        </div>
                    `);

                    headerPaysBlock.find('.headerPaysBlock_body').append(_block);
                });

                $('.index_page_body_data').append(headerPaysBlock);
            }
        }

        async renderType(allData)
        {
            var _data = await callApi({
                methodName: "invester_status_project",
                data: {
                    id: _GET('id'),
                    project: _GET('project'),
                },
            });

            console.log(_data);

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
                                <span>Номер проекта:</span>
                                <a>${_data.InvDoc.projectId}</a>
                            </div>
                            <div class="info_active_block_left_info_line">
                                <span>Номер инвестора:</span>
                                <a>1</a>
                            </div>
                            <div class="info_active_block_left_info_line">
                                <span>Дата:</span>
                                <a></a>
                            </div>
                            <div class="info_active_block_left_info_line">
                                <span>Статус:</span>
                                <a>${_status[_data.InvDoc.status]}</a>
                            </div>
                        </div>
                        <div class="info_active_block_left_info">
                            <div class="info_active_block_left_info_line">
                                <span>Сумма инвестиции:</span>
                                <a>${_data.InvDoc.data.pay} руб</a>
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
                this.business_render(_data);
            } else 
            {
                this.invester_render(_data);
            }

            $('.info_active_block_massage_button').click(function() {
                location.href = `./?user=${allData.User._id}&page=chats&id=${_data.InvDoc.projectId}`;
            });

            $('.show_block').click( function() {
                location.href = `./projects/${_data.InvDoc.receipt}`;
            });

            $('.show_document').click( function() {
                window.open(`https://invester-relocation.site/html/project/document/#${_data.InvDoc.projectId}#/?id=${_data.invester._id}&accept=true`, '_blank');
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
                methodName: "invester_status_projects",
                data: allData,
            });

            console.log(_data);

            var settingBlock = $(`
                <div class="settingBlock">
                    <div class="settingBlock_header">
                        <p>История оплат</p>
                        <div class="settingBlock_header_line">
                            <span>#</span>
                            <span>Номер проекта</span>
                            <span>ID Инвестора</span>
                            <span>Статус</span>
                        </div>
                    </div>
                    <div class="settingBlock_body">

                    </div>
                </div>
            `);

            _data.forEach(function(element, i) {
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
                        <span>${element.projectId}</span>
                        <span>${element.invester}</span>
                        <span>${_status[element.status]}</span>
                    </div>
                `;

                settingBlock.find('.settingBlock_body').append(template_text);
            })

            $('.index_page_body_data').append(settingBlock);

            $('.settingBlock_body_line').click( function () {
                location.href = window.location.href + `&id=${$(this).attr('data')}&project=${$(this).attr('data-more')}`;
            })
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

            // if(_needData.length == 0) 
            // {
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
            // } else {

            //     var _this = this;

            //     var settingBlock = $(`
            //         <div class="settingBlock">
            //             <div class="settingBlock_header">
            //                 <p>Не подтвержденные инвесторы</p>
            //                 <div class="settingBlock_header_line">
            //                     <span>#</span>
            //                     <span>ID</span>
            //                     <span>Инвестор ID</span>
            //                     <span>Написать</span>
            //                     <span>Кнопка</span>
            //                 </div>
            //             </div>
            //             <div class="settingBlock_body">

            //             </div>
            //         </div>
            //     `);

            //     _needData.forEach(el => {
            //         var statusBlock = "invester_status_project_red";

            //         var text = `
            //             <div class="invester_status_project ${statusBlock} cheackInvestingUser">
            //                 <p>Не оплачен инвестор</p>
            //                 <p>${el.data.fio}</p>
            //             </div>
            //         `;

            //         $('.content').append(text);

                   

            //         $('.cheackInvestingUser').click( function () {
            //             _this.rednderCheackInvesting(el.invester);
            //         })
            //     });
            // }

            // console.log(_data);
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
                    <div class="settingBlock_body_line" data="${element.invester}"  data_more="${element.projectId}">
                        <span>${i + 1}</span>
                        <span>${element.projectId}</span>
                        <span>${element.invester}</span>
                        <span>${_status[element.status]}</span>
                    </div>
                `;

                settingBlock.find('.settingBlock_body').append(template_text);
            })

            $('.index_page_body_data').append(settingBlock);

            $('.settingBlock_body_line').click( function () {
                location.href = `/?page=activ_projects&id=${$(this).attr('data')}&project=${$(this).attr('data_more')}`;
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
                methodName: "getProject",
                data: _GET('id'),
            });

            var _Invs = await callApi({
                methodName: "getInvestorsProject",
                data: _GET('id'),
            });

            var _getPaysProject = await callApi({
                methodName: "getPaysProject",
                data: _GET('id'),
            })

            var _attraction_amount  = Project_data.data.attraction_amount;
            _attraction_amount      = _attraction_amount.replace(/\s/g, '');
            var _procent             = (_getPaysProject / _attraction_amount) * 100;

            console.log(Project_data);
            console.log(_Invs);

            var initialDate = Project_data.data.collection_period;
            var now = Date.now();
            var difference = now - initialDate;
            var millisecondsPerDay = 24 * 60 * 60 * 1000;
            var daysSince = Math.floor(difference / millisecondsPerDay);

            console.log(daysSince);


            var _header = $(`
                <div class="info_block_project">
                    <span>№ ${Project_data._id}</span>
                    <span>${Project_data.data.name}</span>
                    <span>${Project_data.type}</span>
                </div>
            `);

            $('.index_page_body_data').append(_header);

            var charts = {
                first_chart: function() 
                {
                    var template_text = $(`
                        <div class="discret">
                            <span class="discret_header">Выплаченная сумма</span>
                            <div class="wrappert">
                                <div class="wrapper">
                                    <div class="container">
                                        <div id="validate-bar__parcent-bar"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `);

                    $('.index_page_body_data').append(template_text);

                    var el = document.getElementById('validate-bar__parcent-bar');

                    var options = {
                        percent: el.getAttribute('data-percent') || _procent,
                        size: el.getAttribute('data-size') || 220,
                        lineWidth: el.getAttribute('data-line') || 10,
                        rotate: el.getAttribute('data-rotate') || 0
                    }

                    var canvas = document.createElement('canvas');
                    var span = document.createElement('span');

                    span.textContent = options.percent;

                    if (typeof(G_vmlCanvasManager) !== 'undefined') {
                        G_vmlCanvasManager.initElement(canvas);
                    }

                    var ctx = canvas.getContext('2d');
                    canvas.width = canvas.height = options.size;

                    el.appendChild(span);
                    el.appendChild(canvas);

                    ctx.translate(options.size / 2, options.size / 2); // change center
                    ctx.rotate((-1 / 2 + options.rotate / 180) * Math.PI); // rotate -90 deg

                    //imd = ctx.getImageData(0, 0, 240, 240);
                    var radius = (options.size - options.lineWidth) / 2;

                    var drawCircle = function(color, lineWidth, percent) {
                        percent = Math.min(Math.max(0, percent || 1), 1);
                        ctx.beginPath();
                        ctx.arc(0, 0, radius, 0, Math.PI * 2 * percent, false);
                        ctx.strokeStyle = color;
                        ctx.lineCap = 'square'; // butt, round or square
                        ctx.lineWidth = lineWidth
                        ctx.stroke();
                    };

                    drawCircle('#4598d1', options.lineWidth, 100 / 100);
                    drawCircle('#0E1122', options.lineWidth, options.percent / 100);
                },
                second: function() 
                {
                    var template_text = $(`
                        <div class="discret">
                            <span class="discret_header">Оставшееся время</span>
                            <div class="wrappert">
                                <div class="wrapper">
                                    <div class="container">
                                        <div id="validate-bar__parcent-bar2"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `);

                    $('.index_page_body_data').append(template_text);

                    var el = document.getElementById('validate-bar__parcent-bar2');

                    var options = {
                        percent: el.getAttribute('data-percent') || 0,
                        size: el.getAttribute('data-size') || 220,
                        lineWidth: el.getAttribute('data-line') || 10,
                        rotate: el.getAttribute('data-rotate') || 0
                    }

                    var canvas = document.createElement('canvas');
                    var span = document.createElement('span');

                    span.textContent = options.percent;

                    if (typeof(G_vmlCanvasManager) !== 'undefined') {
                        G_vmlCanvasManager.initElement(canvas);
                    }

                    var ctx = canvas.getContext('2d');
                    canvas.width = canvas.height = options.size;

                    el.appendChild(span);
                    el.appendChild(canvas);

                    ctx.translate(options.size / 2, options.size / 2); // change center
                    ctx.rotate((-1 / 2 + options.rotate / 180) * Math.PI); // rotate -90 deg

                    //imd = ctx.getImageData(0, 0, 240, 240);
                    var radius = (options.size - options.lineWidth) / 2;

                    var drawCircle = function(color, lineWidth, percent) {
                        percent = Math.min(Math.max(0, percent || 1), 1);
                        ctx.beginPath();
                        ctx.arc(0, 0, radius, 0, Math.PI * 2 * percent, false);
                        ctx.strokeStyle = color;
                        ctx.lineCap = 'square'; // butt, round or square
                        ctx.lineWidth = lineWidth
                        ctx.stroke();
                    };

                    drawCircle('#4598d1', options.lineWidth, 100 / 100);
                    drawCircle('#0E1122', options.lineWidth, options.percent / 100);
                },
                thirds: function () {
                    var template_text = $(`
                        <div class="discret">
                            <span class="discret_header">Выплаченно инвесторам</span>
                            <div class="wrappert">
                                <div class="wrapper">
                                    <div class="container">
                                        <div id="validate-bar__parcent-bar3"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `);

                    $('.index_page_body_data').append(template_text);

                    var el = document.getElementById('validate-bar__parcent-bar3');

                    var options = {
                        percent: el.getAttribute('data-percent') || 0,
                        size: el.getAttribute('data-size') || 220,
                        lineWidth: el.getAttribute('data-line') || 10,
                        rotate: el.getAttribute('data-rotate') || 0
                    }

                    var canvas = document.createElement('canvas');
                    var span = document.createElement('span');

                    span.textContent = options.percent;

                    if (typeof(G_vmlCanvasManager) !== 'undefined') {
                        G_vmlCanvasManager.initElement(canvas);
                    }

                    var ctx = canvas.getContext('2d');
                    canvas.width = canvas.height = options.size;

                    el.appendChild(span);
                    el.appendChild(canvas);

                    ctx.translate(options.size / 2, options.size / 2); // change center
                    ctx.rotate((-1 / 2 + options.rotate / 180) * Math.PI); // rotate -90 deg

                    //imd = ctx.getImageData(0, 0, 240, 240);
                    var radius = (options.size - options.lineWidth) / 2;

                    var drawCircle = function(color, lineWidth, percent) {
                        percent = Math.min(Math.max(0, percent || 1), 1);
                        ctx.beginPath();
                        ctx.arc(0, 0, radius, 0, Math.PI * 2 * percent, false);
                        ctx.strokeStyle = color;
                        ctx.lineCap = 'square'; // butt, round or square
                        ctx.lineWidth = lineWidth
                        ctx.stroke();
                    };

                    drawCircle('#4598d1', options.lineWidth, 100 / 100);
                    drawCircle('#0E1122', options.lineWidth, options.percent / 100);
                }
            }

            for(var key in charts) {
                charts[key]();
            }

            this.renderPay();
            
        }

        async renderPay()
        {
            var getPaysBusiness = await callApi({
                methodName: "getPaysBusiness",
                data: _GET('id'),
            });

            var settingBlock = $(`
                <div class="settingBlock">
                    <div class="settingBlock_header">
                        <p>Сумма выплат процентов за инвестиции</p>

                        <div class="settingBlock_header_line">
                            <span>ID Инвестора</span>
                            <span>Сумма инвестиции</span>
                            <span>Сумма выплаты</span>
                            <span>Чек</span>
                        </div>
                    </div>
                    <div class="settingBlock_body">

                    </div> 
                </div>
            `);

            settingBlock.css("margin-top", "400px");

            
            for(var element of getPaysBusiness)
            {

                var template_text = $(`
                    <div class="settingBlock_body_line">
                        <span>${element.Inv.invester}</span>
                        <span>${element.pay}</span>
                        <span>${element.needPay}</span>
                        <span>Прикрепить чек</span>
                    </div>
                `);

                template_text.click( function() {
                    location.href = 'https://t.me/invester_official/64';
                })

                settingBlock.find('.settingBlock_body').append(template_text);
            }

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

            $('.index_page_body_header_user_avatar_name span').html(_User.first_name + " " + _User.last_name);
            $('.index_page_body_header_user_avatar_name p').html(_User.type);

            var buttons = {
                "investor": 
                `
                    <div class="index_page_menu_block_line" data="activ_projects">
                        <i class="fal fa-chart-line"></i>
                        <span>Активные проекты</span>
                    </div>
                    <!-- <div class="index_page_menu_block_line" data="reward">
                        <i class="fal fa-money-check-alt"></i>
                        <span>Вознаграждение</span>
                    </div> -->
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
                    <div class="index_page_menu_block_line" data="acceptPays">
                        <i class="fal fa-check-square"></i>
                        <span>Получение</span>
                    </div>
                    <div class="index_page_menu_block_line" data="pay_investors">
                        <i class="fal fa-money-check-alt"></i>
                        <span>Не выплачено</span>
                    </div>
                    <div class="index_page_menu_block_line" data="activ_projects">
                        <i class="fal fa-chart-line"></i>
                        <span>История</span>
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
 
            return _User;
        }
    }

    class chats {
        constructor() {};

        async render(data) 
        {
            if(_GET('id')) {

                var all_msgs = await callApi({
                    methodName: "all_msgs",
                    data: {
                        user: _GET('user'),
                        to: _GET('id'),
                    },
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
                        $('.chat_block_info span').html(_User.first_name + " " + _User.last_name);
                        $('.chat_block_info p').html("investor");
                    },
                }
    
                headerShow[_User.type]();
    
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
                        <div class="msg_block_getting_line" data="${el.business}" data-more="">
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
                    location.href = `https://invester-relocation.site/?user=612c7ba18b28880d5c0f8d05&page=chats&id=${$(this).attr('data')}`;
                })

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
            this.allMoneyMembers = 0;
        };

        async renderHeader(_data, _dataMore) 
        {
            var headerInfoBlock1 = 
            $(`
                <div class="Attracted_headerInfoBlock">
                    <div class="Attracted_headerInfoBlock_block">
                        <div class="Attracted_headerInfoBlock_block_i">
                            <i class="fas fa-users"></i>
                        </div>
                        <div class="Attracted_headerInfoBlock_block_text">
                            <span>Мной привлечено инвесторов</span>
                            <p>${_data.length}</p>
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
            `);

            var headerInfoBlock2 = 
            $(`
                <div class="Attracted_headerInfoBlock">
                    <div class="Attracted_headerInfoBlock_block">
                        <div class="Attracted_headerInfoBlock_block_i">
                            <i class="fal fa-chair-office"></i>
                        </div>
                        <div class="Attracted_headerInfoBlock_block_text">
                            <span>Мной привлечено бизнесс проектов</span>
                            <p>${_dataMore[0].length}</p>
                        </div>
                    </div>
                    <div class="Attracted_headerInfoBlock_block">
                        <div class="Attracted_headerInfoBlock_block_i">
                            <i class="fal fa-envelope-open-dollar"></i>
                        </div>
                        <div class="Attracted_headerInfoBlock_block_text Attracted_headerInfoBlock_block_text_moneys" data="pays">
                            <span>Общая сумма бонусов выплаченных</span>
                            <p>0</p>
                        </div>
                    </div>
                </div>
            `);

            var moreGetButtons = $(`
                <div class="moreGetButtons">
                    <span data="get"><i class="fad fa-money-check-edit-alt"></i> Запросить выплату</span>
                    <span data="pay"><i class="fad fa-handshake"></i> Инвестировать в проект</span>
                </div>
            `);

            moreGetButtons.find('span[data="pay"]').click( function () {
                location.href = "https://t.me/invester_official";
            })

            $('.index_page_body_data').append(headerInfoBlock1);
            $('.index_page_body_data').append(headerInfoBlock2);
            $('.index_page_body_data').append(moreGetButtons);
        }

        async renderInvesters(_data) 
        {      
            var settingBlock = $(`
                <div class="settingBlock">
                    <div class="settingBlock_header">
                        <p>Выплаты за Инвесторов</p>
                        <div class="settingBlock_header_line">
                            <span>ID Инвестора</span>
                            <span>Сумма инвестиций</span>
                            <span>Сумма  выплаты</span>
                            <span>Чек</span>
                        </div>
                    </div>
                    <div class="settingBlock_body">

                    </div> 
                </div>
            `);

            settingBlock.css("margin-top", "20px");

            for(var element of _data)
            {
                var investing_pay = await callApi({
                    methodName: "Attracted_by_me_investing_pay",
                    data: element.user,
                });

                for(var el of investing_pay)
                {
                    var template_text = `
                        <div class="settingBlock_body_line">
                            <span>${element.user}</span>
                            <span>${el.Pay}</span>
                            <span>${el.YouPay}</span>
                            <span>${el.status}</span>
                        </div>
                    `;

                    this.allMoneyMembers += el.YouPay;

                    settingBlock.find('.settingBlock_body').append(template_text);
                }
            }

            $('.index_page_body_data').append(settingBlock);

            return;
        }

        async renderBussnes(_dataMore)
        {
            var settingBlock = $(`
                <div class="settingBlock">
                    <div class="settingBlock_header">
                        <p>Выплаты по бизнесс проектам</p>
                        <div class="settingBlock_header_line">
                            <span>Номер проекта</span>
                            <span>Сумма привлеченная в проект</span>
                            <span>Сумма  выплаты</span>
                            <span>Чек</span>
                        </div>
                    </div>
                    <div class="settingBlock_body">

                    </div> 
                </div>
            `);

            settingBlock.css("margin-top", "20px");

            for(var element of _dataMore[0])
            {
                var investing_pay = await callApi({
                    methodName: "Attracted_by_me_Bussnes_pay",
                    data: element._id,
                });

                for(var el of investing_pay)
                {
                    var template_text = `
                        <div class="settingBlock_body_line">
                            <span>${element._id}</span>
                            <span>${el.Pay}</span>
                            <span>${el.YouPay}</span>
                            <span>${el.status}</span>
                        </div>
                    `;

                    this.allMoneyMembers += el.YouPay;

                    settingBlock.find('.settingBlock_body').append(template_text);
                }
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
                        <p>Все предложения для инвестиций</p>
                        <div class="settingBlock_header_line">
                            <span>ID Предложения</span>
                            <span>Имя предложения</span>
                            <span>Сумма выплаты за инвестора</span>
                            <span>Сумма выплаты за бизнес</span>
                        </div>
                    </div>
                    <div class="settingBlock_body">

                    </div> 
                </div>
            `);

            settingBlock.css("margin-top", "20px");

            
            for(var element of _data)
            {

                var template_text = $(`
                    <div class="settingBlock_body_line">
                        <span>${element._id}</span>
                        <span>${element.data.name}</span>
                        <span>70%</span>
                        <span>30%</span>
                    </div>
                `);

                template_text.click( function() {
                    location.href = 'https://t.me/invester_official/64';
                })

                settingBlock.find('.settingBlock_body').append(template_text);
            }

            $('.index_page_body_data').append(settingBlock);
        }

        async renderAllPayments()
        {
            var allPayments     = await callApi({
                methodName: "allPayments",
                data:  global.allData._id,
            });

            console.log(allPayments);

            var settingBlock = $(`
                <div class="settingBlock">
                    <div class="settingBlock_header">
                        <p>Статистика ваших выплат</p>
                        <div class="settingBlock_header_line">
                            <span>Номер</span>
                            <span>ID Проекта/Инвестора</span>
                            <span>Сумма выплаты</span>
                            <span>Статус/span>
                        </div>
                    </div>
                    <div class="settingBlock_body">

                    </div> 
                </div>
            `);

            settingBlock.css("margin-top", "20px");

            var i = 1;
            for(var element of allPayments)
            {

                var template_text = $(`
                    <div class="settingBlock_body_line">
                        <span>${i}</span>
                        <span>${element.data._id}</span>
                        <span>${element.data._id}</span>
                        <span>Ожидает оплаты</span>
                    </div>
                `);

                template_text.click( function() {
                    location.href = 'https://t.me/invester_official/64';
                })

                settingBlock.find('.settingBlock_body').append(template_text);

                i++;
            }

            $('.index_page_body_data').append(settingBlock);
        }

        async render(data) 
        {
            var _data           = await callApi({
                methodName: "Attracted_by_me",
                data: data._id,
            });
            var _dataMore       = await callApi({
                methodName: "Attracted_by_me_b",
                data: data._id,
            });
           

            console.log(_data);
            console.log(_dataMore);

            await this.renderHeader(_data, _dataMore);
            await this.renderInvesters(_data);
            await this.renderBussnes(_dataMore)
            // await this.renderAllPayments();
            await this.allProjectsRender();

            $('.Attracted_headerInfoBlock_block_text_moneys[data="wait"] p').html(this.allMoneyMembers);
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
    };

    if(!global.Components) { global.Components = components; } 
    else { 
        for(var key in components)
        {
            global.Components[key] = components[key];
        }
    }

}(window))