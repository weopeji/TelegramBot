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
                                <div class="row">
                                    1
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="container">
                                <div class="row">
                                    
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