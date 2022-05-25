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

    class applications
    {
        constructor() 
        {
            
        };

        async render() 
        {
            var settingBlock1 = $(`
                <div class="settingBlock" style="margin-bottom: 20px">
                    <div class="version2_default_bkg row_default"></div>
                    <div class="settingBlock_header">
                        <div class="invester_status_projects_status_first">
                            <div class="invester_status_projects_status_first_line">
                                <span>1</span>
                                <a>2</a>
                                <span>3</span>
                                <a>4</a>
                            </div>
                            <div class="invester_status_projects_status_first_line">
                                <span>1</span>
                                <a>2</a>
                                <span>3</span>
                                <a>4</a>
                            </div>
                        </div>
                    </div>
                </div>
            `);

            var settingBlock2 = $(`
                <div class="settingBlock">
                    <div class="version2_settingBlock_header">
                        <p></p>
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

            $('.index_page_body_data').append(settingBlock1);
            $('.index_page_body_data').append(settingBlock2);
        }
    }

    var components = {
        applications,
    };

    if(!global.Components) { global.Components = components; } 
    else { 
        for(var key in components)
        {
            global.Components[key] = components[key];
        }
    }

}(window))