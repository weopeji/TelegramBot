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
                                        <small class="text-success">5 млн</small>
                                    </h2>
                                </div>
                                <div class="row position-relative version2_default_bkg row_default">
                                    <label for="basic-url" class="form-label">Запрос телефона</label>
                                    <div class="input-group mb-3">
                                        <span class="input-group-text" id="basic-addon1">Ссылка на фотографию</span>
                                        <input type="text" class="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1">
                                    </div>
                                    <div class="input-group mb-3">
                                        <span class="input-group-text" id="basic-addon1">Текс</span>
                                        <input type="text" class="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1">
                                    </div>                                                                            
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="container">
                                <div class="row position-relative version2_default_bkg row_default">
                                    <h1 class="display-6">
                                        Бот до
                                        <small class="text-success">5 млн</small>
                                    </h1>
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