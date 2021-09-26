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

        async renderType(allData)
        {
            var _data = await callApi({
                methodName: "invester_status_project",
                data: _GET('id'),
            });

            console.log(_data);

            var settingBlock = $(`
                <div class="info_active_block">
                    <div class="info_active_block_left">
                        <p class="info_active_block_left_header">Информация по платежу</p>
                        <div class="info_active_block_left_info">
                            <div class="info_active_block_left_info_line">
                                <span>Номер проекта:</span>
                                <a></a>
                            </div>
                            <div class="info_active_block_left_info_line">
                                <span>ФИО Инвестора:</span>
                                <a>${_data.invester.first_name} ${_data.invester.last_name}</a>
                            </div>
                            <div class="info_active_block_left_info_line">
                                <span>Номер инвестора в проекте:</span>
                                <a></a>
                            </div>
                            <div class="info_active_block_left_info_line">
                                <span>Дата прикрепления чека:</span>
                                <a></a>
                            </div>
                            <div class="info_active_block_left_info_line">
                                <span>Статус:</span>
                                <a></a>
                            </div>
                        </div>
                        <div class="info_active_block_left_buttons">
                            <span class="accept_block">Подтвердить оплату</span>
                            <span class="remove_block">Отказать</span>
                            <span class="show_block">Посмотреть чек об оплате</span>
                        </div>
                    </div>
                    <div class="info_active_block_right">
                        <div class="info_active_block_photo">
                            
                        </div>
                        <span>${_data.invester.first_name} ${_data.invester.last_name}</span>
                        <p>Invester</p>

                        <div class="info_active_block_massage_button">
                            <span>Перейти к диалогу</span>
                        </div>
                    </div>
                </div>
            `);

            $('.index_page_body_data').append(settingBlock);
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
                    <div class="settingBlock_body_line" data="${element.invester}">
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
                location.href = window.location.href + `&id=${$(this).attr('data')}`;
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
                    <div class="settingBlock_body_line" data="${element.invester}">
                        <span>${i + 1}</span>
                        <span>${element.projectId}</span>
                        <span>${element.invester}</span>
                        <span>${_status[element.status]}</span>
                    </div>
                `;

                settingBlock.find('.settingBlock_body').append(template_text);
            })

            $('.index_page_body_data').append(settingBlock);

            // $('.settingBlock_accept').click( async function () {
            //     var acceptInvestor = await callApi({
            //         methodName: "acceptInvestor",
            //         data: $(this).attr("data"),
            //     });

            //     alert('Оплата подтвержденна!');
            //     location.reload();
            // })

            $('.settingBlock_body_line').click( function () {
                location.href = `/?page=activ_projects&id=${$(this).attr('data')}`;
            })
        }

        async renderType()
        {
            var charts = {
                first_chart: function() 
                {
                    var template_text = $(`
                        div class="wrappert">
                            <div class="wrapper">
                                <div class="container">
                                    <div id="validate-bar__parcent-bar" data-percent="77"></div>
                                </div>
                            </div>
                        </div>
                    `);

                    $('.index_page_body_data').append(template_text);

                    var el = document.getElementById('validate-bar__parcent-bar');

                    var options = {
                        percent: el.getAttribute('data-percent') || 25,
                        size: el.getAttribute('data-size') || 220,
                        lineWidth: el.getAttribute('data-line') || 15,
                        rotate: el.getAttribute('data-rotate') || 0
                    }

                    var canvas = document.createElement('canvas');
                    var span = document.createElement('span');
                    var validateText = span.className = "validate-bar__parcent-bar";

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

                    drawCircle('#efefef', options.lineWidth, 100 / 100);
                    drawCircle('#4598d1', options.lineWidth, options.percent / 100);
                }
            }

            for(var key in charts) {
                charts[key]();
            }
            
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
                var _status = {
                    "wait": `
                        
                    `,
                }
                var template_text = `
                    <div class="settingBlock_body_line" data="${element.invester}">
                        <span>${i + 1}</span>
                        <span>${element._id}</span>
                        <span>${element.data.name}</span>
                        <span><span class="settingBlock_wait settingBlock_block settingBlock_accept" data="${element._id}">Открыть</span></span>
                    </div>
                `;

                settingBlock.find('.settingBlock_body').append(template_text);
            })
            
            $('.settingBlock_accept').click( function() {
                 location.href = `/?page=myProjects&id=${$(this).attr('data')}`;
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

            $('.index_page_body_header_user_avatar_name span').html(_User.first_name + " " + _User.last_name);
            $('.index_page_body_header_user_avatar_name p').html(_User.type);

            var buttons = {
                "investor": 
                `
                    <div class="index_page_menu_block_line" data="activ_projects">
                        <i class="fal fa-chart-line"></i>
                        <span>Активные проекты</span>
                    </div>
                    <div class="index_page_menu_block_line">
                        <i class="fal fa-money-check-alt"></i>
                        <span>Вознаграждение</span>
                    </div>
                    <div class="index_page_menu_block_line">
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
                    <div class="index_page_menu_block_line" data="activ_projects">
                        <i class="fal fa-chart-line"></i>
                        <span>История</span>
                    </div>
                    <div class="index_page_menu_block_line" data="pay_investors">
                        <i class="fal fa-money-check-alt"></i>
                        <span>Не выплачено</span>
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
 
            return _User;
        }
    }

    class chats {
        constructor() {};

        async render() {

            var ID = _GET('id');

            if(ID) {
                var templateText = `
                    <div class="chat_block">
                        <div class="chat_block_chat">
                            <div class="chat_block_chat_header">
                                <span>Чат</span>
                            </div>
                            <div class="chat_block_chat_body">
                                <div class="chat_block_chat_body_row">



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
            }
           
        }
    }

    if(!global.Components)
    {
        global.Components = {
            process_status,
            activ_projects,
            put_document,
            pay_investors,
            acceptPays,
            user_block,
            chats,
            myProjects,
        }
    }

}(window))