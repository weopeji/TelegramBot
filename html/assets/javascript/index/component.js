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

    class process_status 
    {
        constructor() {};

        async render(allData) 
        {
            var _data = await callApi({
                methodName: "invester_status_projects",
                data: allData,
            });

            console.log(_data);

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
        }
    }

    if(!global.Components)
    {
        global.Components = {
            process_status,
        }
    }

}(window))