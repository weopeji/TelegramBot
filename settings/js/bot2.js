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

    class bot2
    {
        constructor() {
            this.body       = $('.index_page_body_data');
            this.body_block = `
                <div class="container bot2_block">
                    <div class="row">
                        <div class="col-md-6">
                            <div class="container">
                                <div class="row position-relative version2_default_bkg row_default">
                                    <h1 class="display-6">
                                        Бот от
                                        <small class="text-muted">5 млн</small>
                                    </h2>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="container">
                                <div class="row position-relative version2_default_bkg row_default">
                                    Бот до
                                    <small class="text-muted">5 млн</small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        };
        
        async render() {
            this.body.append(this.body_block);
        };
    };

    var components = {
        bot2,
    };

    if(!global.Components) { global.Components = components; } 
    else { 
        for(var key in components)
        {
            global.Components[key] = components[key];
        }
    }

}(window))