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

        async render()
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