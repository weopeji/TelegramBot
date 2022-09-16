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
                    <div class="row d-flex justify-content-end">
                        <button type="button" class="btn btn-primary" data="from">Сохранить</button>
                    </div>
                    <div class="row">
                        <div class="col-md-6">
                            <div class="container">
                                <div class="row position-relative version2_default_bkg row_default">
                                    <h1 class="display-6">
                                        Бот от
                                        <small class="text-success">5 млн</small>
                                    </h2>
                                </div>
                                <div class="row position-relative version2_default_bkg row_default mt-3">
                                    <label for="basic-url" class="form-label fs-3 text">Запрос телефона</label>
                                    <div class="input-group mb-3">
                                        <span class="input-group-text">Ссылка на фотографию</span>
                                        <input data="phone_img" type="text" class="form-control" aria-label="Username" aria-describedby="basic-addon1">
                                    </div>
                                    <div class="input-group mb-3">
                                        <span class="input-group-text">Текс</span>
                                        <input data="phone_text" type="text" class="form-control" aria-label="Username" aria-describedby="basic-addon1">
                                    </div>                                                                            
                                </div>
                                <div class="row position-relative version2_default_bkg row_default mt-3">
                                    <label for="basic-url" class="form-label fs-3 text">Оплата</label>
                                    <div class="input-group mb-3">
                                        <span class="input-group-text">Ссылка на фотографию</span>
                                        <input data="pay_img" type="text" class="form-control" aria-label="Username" aria-describedby="basic-addon1">
                                    </div>
                                    <div class="input-group mb-3">
                                        <span class="input-group-text">Текс</span>
                                        <input data="pay_text" type="text" class="form-control" aria-label="Username" aria-describedby="basic-addon1">
                                    </div>
                                    <div class="input-group mb-3">
                                        <span class="input-group-text">Сумма</span>
                                        <input data="pay_money" type="text" class="form-control" aria-label="Username" aria-describedby="basic-addon1">
                                    </div>                                                                                                                                                        
                                </div>
                                <div class="row position-relative version2_default_bkg row_default mt-3">
                                    <label for="basic-url" class="form-label fs-3 text">После оплаты</label>
                                    <div class="input-group mb-3">
                                        <span class="input-group-text">Ссылка на фотографию</span>
                                        <input data="end_img" type="text" class="form-control" aria-label="Username" aria-describedby="basic-addon1">
                                    </div>
                                    <div class="input-group mb-3">
                                        <span class="input-group-text">Текс</span>
                                        <input data="end_text" type="text" class="form-control" aria-label="Username" aria-describedby="basic-addon1">
                                    </div>                                                                            
                                </div>
                                <div class="row position-relative version2_default_bkg row_default mt-3">
                                    <label for="basic-url" class="form-label fs-3 text">Если не оплатил</label>
                                    <div class="input-group mb-3">
                                        <span class="input-group-text">Ссылка на фотографию</span>
                                        <input data="not_img" type="text" class="form-control" aria-label="Username" aria-describedby="basic-addon1">
                                    </div>
                                    <div class="input-group mb-3">
                                        <span class="input-group-text">Текс</span>
                                        <input data="not_text" type="text" class="form-control" aria-label="Username" aria-describedby="basic-addon1">
                                    </div>                                                                            
                                </div>
                                <div class="row position-relative version2_default_bkg row_default mt-3">
                                    <label for="basic-url" class="form-label fs-3 text">Если оплатил после</label>
                                    <div class="input-group mb-3">
                                        <span class="input-group-text">Ссылка на фотографию</span>
                                        <input data="payNot_img" type="text" class="form-control" aria-label="Username" aria-describedby="basic-addon1">
                                    </div>
                                    <div class="input-group mb-3">
                                        <span class="input-group-text">Текс</span>
                                        <input data="payNot_text" type="text" class="form-control" aria-label="Username" aria-describedby="basic-addon1">
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
                                <div class="row position-relative version2_default_bkg row_default mt-3">
                                    <label for="basic-url" class="form-label fs-3 text">Сообщение</label>
                                    <div class="input-group mb-3">
                                        <span class="input-group-text">Ссылка на фотографию</span>
                                        <input data="toText_img" type="text" class="form-control" aria-label="Username" aria-describedby="basic-addon1">
                                    </div>
                                    <div class="input-group mb-3">
                                        <span class="input-group-text">Текс</span>
                                        <input data="toText_text" type="text" class="form-control" aria-label="Username" aria-describedby="basic-addon1">
                                    </div>                                                                          
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        };
        
        async render() 
        {
            var _this       = this;
            var bodyBlock   = $(_this.body_block);

            bodyBlock.find('button[data="from"]').click( function() 
            {
                var headerBlock = $(this).parent().parent();
                var ActionData  = {
                    "phone": {
                        img: headerBlock.find('input[data="phone_img"]').val(),
                        text: headerBlock.find('input[data="phone_text"]').val(),
                    },
                    "pay": {
                        img: headerBlock.find('input[data="pay_img"]').val(),
                        text: headerBlock.find('input[data="pay_text"]').val(),
                        money: headerBlock.find('input[data="pay_money"]').val(),
                    },
                    "end": {
                        img: headerBlock.find('input[data="end_img"]').val(),
                        text: headerBlock.find('input[data="end_text"]').val(),
                    },
                    "not": {
                        img: headerBlock.find('input[data="not_img"]').val(),
                        text: headerBlock.find('input[data="not_text"]').val(),
                    },
                    "payNot": {
                        img: headerBlock.find('input[data="payNot_img"]').val(),
                        text: headerBlock.find('input[data="payNot_text"]').val(),
                    },
                    "toText": {
                        img: headerBlock.find('input[data="toText_img"]').val(),
                        text: headerBlock.find('input[data="toText_text"]').val(),
                    },
                };

                console.log(ActionData);
            });


            this.body.append();
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