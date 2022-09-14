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
                                        <button type="button" class="btn btn-primary">Сохранить</button>
                                    </h2>
                                </div>
                                <div class="row position-relative version2_default_bkg row_default mt-3">
                                    <label for="basic-url" class="form-label fs-3 text">Запрос телефона</label>
                                    <div class="input-group mb-3">
                                        <span class="input-group-text">Ссылка на фотографию</span>
                                        <input type="text" class="form-control" aria-label="Username" aria-describedby="basic-addon1">
                                    </div>
                                    <div class="input-group mb-3">
                                        <span class="input-group-text">Текс</span>
                                        <input type="text" class="form-control" aria-label="Username" aria-describedby="basic-addon1">
                                    </div>                                                                            
                                </div>
                                <div class="row position-relative version2_default_bkg row_default mt-3">
                                    <label for="basic-url" class="form-label fs-3 text">Оплата</label>
                                    <div class="input-group mb-3">
                                        <span class="input-group-text">Ссылка на фотографию</span>
                                        <input type="text" class="form-control" aria-label="Username" aria-describedby="basic-addon1">
                                    </div>
                                    <div class="input-group mb-3">
                                        <span class="input-group-text">Текс</span>
                                        <input type="text" class="form-control" aria-label="Username" aria-describedby="basic-addon1">
                                    </div>
                                    <div class="input-group mb-3">
                                        <span class="input-group-text">Сумма</span>
                                        <input type="text" class="form-control" aria-label="Username" aria-describedby="basic-addon1">
                                    </div>                                                                                                                                                        
                                </div>
                                <div class="row position-relative version2_default_bkg row_default mt-3">
                                    <label for="basic-url" class="form-label fs-3 text">После оплаты</label>
                                    <div class="input-group mb-3">
                                        <span class="input-group-text">Ссылка на фотографию</span>
                                        <input type="text" class="form-control" aria-label="Username" aria-describedby="basic-addon1">
                                    </div>
                                    <div class="input-group mb-3">
                                        <span class="input-group-text">Текс</span>
                                        <input type="text" class="form-control" aria-label="Username" aria-describedby="basic-addon1">
                                    </div>                                                                            
                                </div>
                                <div class="row position-relative version2_default_bkg row_default mt-3">
                                    <label for="basic-url" class="form-label fs-3 text">Если не оплатил</label>
                                    <div class="input-group mb-3">
                                        <span class="input-group-text">Ссылка на фотографию</span>
                                        <input type="text" class="form-control" aria-label="Username" aria-describedby="basic-addon1">
                                    </div>
                                    <div class="input-group mb-3">
                                        <span class="input-group-text">Текс</span>
                                        <input type="text" class="form-control" aria-label="Username" aria-describedby="basic-addon1">
                                    </div>                                                                            
                                </div>
                                <div class="row position-relative version2_default_bkg row_default mt-3">
                                    <label for="basic-url" class="form-label fs-3 text">Если оплатил после</label>
                                    <div class="input-group mb-3">
                                        <span class="input-group-text">Ссылка на фотографию</span>
                                        <input type="text" class="form-control" aria-label="Username" aria-describedby="basic-addon1">
                                    </div>
                                    <div class="input-group mb-3">
                                        <span class="input-group-text">Текс</span>
                                        <input type="text" class="form-control" aria-label="Username" aria-describedby="basic-addon1">
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
                                        <button type="button" class="btn btn-primary">Сохранить</button>
                                    </h1>
                                </div>
                                <div class="row position-relative version2_default_bkg row_default mt-3">
                                    <label for="basic-url" class="form-label fs-3 text">Оплата</label>
                                    <div class="input-group mb-3">
                                        <span class="input-group-text">Ссылка на фотографию</span>
                                        <input type="text" class="form-control" aria-label="Username" aria-describedby="basic-addon1">
                                    </div>
                                    <div class="input-group mb-3">
                                        <span class="input-group-text">Текс</span>
                                        <input type="text" class="form-control" aria-label="Username" aria-describedby="basic-addon1">
                                    </div>  
                                    <div class="input-group mb-3">
                                        <span class="input-group-text">Сумма</span>
                                        <input type="text" class="form-control" aria-label="Username" aria-describedby="basic-addon1">
                                    </div>                                                                            
                                </div>
                                <div class="row position-relative version2_default_bkg row_default mt-3">
                                    <label for="basic-url" class="form-label fs-3 text">После оплаты</label>
                                    <div class="input-group mb-3">
                                        <span class="input-group-text">Ссылка на фотографию</span>
                                        <input type="text" class="form-control" aria-label="Username" aria-describedby="basic-addon1">
                                    </div>
                                    <div class="input-group mb-3">
                                        <span class="input-group-text">Текс</span>
                                        <input type="text" class="form-control" aria-label="Username" aria-describedby="basic-addon1">
                                    </div>                                                                          
                                </div>
                                <div class="row position-relative version2_default_bkg row_default mt-3">
                                    <label for="basic-url" class="form-label fs-3 text">Если не оплатил</label>
                                    <div class="input-group mb-3">
                                        <span class="input-group-text">Ссылка на фотографию</span>
                                        <input type="text" class="form-control" aria-label="Username" aria-describedby="basic-addon1">
                                    </div>
                                    <div class="input-group mb-3">
                                        <span class="input-group-text">Текс</span>
                                        <input type="text" class="form-control" aria-label="Username" aria-describedby="basic-addon1">
                                    </div>                                                                          
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