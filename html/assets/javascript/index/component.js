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

        async render(allData) 
        {
            var _data = await callApi({
                methodName: "invester_status_projects",
                data: allData,
            });

            var statusBlock = "invester_status_project_red";

            var text = `
                <div class="invester_status_project ${statusBlock}">
                    <p>Вы не оплатили ни один проект</p>
                </div>
            `;

            $('.content').append(text);
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

            if(_needData.length == 0) 
            {
                var statusBlock = "invester_status_project_red";

                var text = `
                    <div class="invester_status_project ${statusBlock}">
                        <p>Инвесторы не найдены</p>
                    </div>
                `;

                $('.content').append(text);
            } else {

                var _this = this;

                _needData.forEach(el => {
                    var statusBlock = "invester_status_project_red";

                    var text = `
                        <div class="invester_status_project ${statusBlock} cheackInvestingUser">
                            <p>Не оплачен инвестор</p>
                            <p>${el.data.fio}</p>
                        </div>
                    `;

                    $('.content').append(text);

                   

                    $('.cheackInvestingUser').click( function () {
                        _this.rednderCheackInvesting(el.invester);
                    })
                });
            }

            console.log(_data);
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
        }
    }

}(window))