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

    class creating_page
    {
        constructor() 
        {
            this.global = $(`
                <div class="creating_page"></div>
            `);
        };

        validateInn(inn) {
            var error = {};
            var result = false;
            if (typeof inn === 'number') {
                inn = inn.toString();
            } else if (typeof inn !== 'string') {
                inn = '';
            }
            if (!inn.length) {
                error.code = 1;
                error.message = 'ИНН пуст';
            } else if (/[^0-9]/.test(inn)) {
                error.code = 2;
                error.message = 'ИНН может состоять только из цифр';
            } else if ([10, 12].indexOf(inn.length) === -1) {
                error.code = 3;
                error.message = 'ИНН может состоять только из 10 или 12 цифр';
            } else {
                var checkDigit = function (inn, coefficients) {
                    var n = 0;
                    for (var i in coefficients) {
                        n += coefficients[i] * inn[i];
                    }
                    return parseInt(n % 11 % 10);
                };
                switch (inn.length) {
                    case 10:
                        var n10 = checkDigit(inn, [2, 4, 10, 3, 5, 9, 4, 6, 8]);
                        if (n10 === parseInt(inn[9])) {
                            result = true;
                        }
                        break;
                    case 12:
                        var n11 = checkDigit(inn, [7, 2, 4, 10, 3, 5, 9, 4, 6, 8]);
                        var n12 = checkDigit(inn, [3, 7, 2, 4, 10, 3, 5, 9, 4, 6, 8]);
                        if ((n11 === parseInt(inn[10])) && (n12 === parseInt(inn[11]))) {
                            result = true;
                        }
                        break;
                }
                if (!result) {
                    error.code = 4;
                    error.message = 'Неправильное контрольное число';
                }
            }
            return {
                result: result,
                error: error,
            };
        }

        async startRenderCreating(creatingData, inn)
        {
            var param = 0;

            var type = {
                "LEGAL": function() {param = 1},
                "INDIVIDUAL": function() {param = 2},
                "FIZ": function() {param = 3},
            }

            if(creatingData == "error") {type["FIZ"]()}
            else {type[creatingData.type]()};

            var _data = {
                user: global.allData._id,
                type: param,
                data: creatingData,
                inn: inn,
            };

            var setCreatingData = await callApi({
                methodName: "setCreatingData",
                data: _data,
            });

            location.href = setCreatingData;
        }

        defaultCSS()
        {
            $('.index_page_menu').css({
                "flex": "none",
                "position": "absolute",
                "margin-left": "-100%",
            });

            $('.index_page_body_header_info').css({
                "justify-content": "center",
            });

            $('.index_page_body_header_info span').html("ЗАЯВКА НА ФИНАНСИРОВАНИЕ ПРОЕКТА");
        }

        async nextRender() 
        {
            var inn = $('.creating_page_input input').val();

            $('.creating_page_input input').val("");

            var user_block = `
                <div class="creating_page_start_user">
                    <div class="creating_page_start_user_block">
                        <span>
                            ${inn}
                        </span>
                    </div>
                </div>
            `;

            $('.creating_page_block').append(user_block);

            var cheackINN = this.validateInn(inn);

            if(!cheackINN.result)
            {
                var msgsBlock = `
                    <div class="creating_page_start">
                        <span>
                            ${cheackINN.error.message}
                        </span>
                    </div>
                `;
                $('.creating_page_block').append(msgsBlock);
            } else {
                var creatingData = await callApi({
                    methodName: "creatingData",
                    data: inn,
                });

                var msgsBlock = `
                    <div class="creating_page_block">
                        <div class="creating_page_start">
                            <span>
                               Подождите...
                            </span>
                        </div>
                    </div>
                `;
                $('.creating_page_block').append(msgsBlock);

                this.startRenderCreating(creatingData, inn);
            }

            console.log(creatingData);
            console.log(cheackINN);
        }

        async startDefault()
        {
            var msgsBlock = $(`
                <div class="creating_page_block">
                        <div class="creating_page_start">
                            <span>
                                Уважаемый Инвестор.... вводя данные вы подтверждаете, что <br> ознакомились и принимаете все условия <a href="https://google.com">"Пользовательского соглашения"</a>.
                            </span>
                        </div>
                    </div>
                <div class="creating_page_block">
                    <div class="creating_page_start">
                        <span>
                            Добро пожаловать в мастер создания проекта! <br>
                            Введите инн проекта для создания заявки на его финансирование
                        </span>
                    </div>
                </div>
            `);

            var inputText = $(`
                <div class="creating_page_input">
                    <input type="text">
                    <div class="creating_page_input_button">
                        <span>Отправить</span>
                    </div>
                </div>
            `);

            var _this = this;

            inputText.find('.creating_page_input_button span').click( function (event) {
                _this.nextRender();
                return(false);
            });

            this.global.append(msgsBlock);
            this.global.append(inputText);
        }

        async render() 
        {
            this.defaultCSS();    
            this.startDefault();

            $('.index_page_body_data').append(this.global);
        }
    }

    var components = {
        creating_page,
    };

    if(!global.Components) { global.Components = components; } 
    else { 
        for(var key in components)
        {
            global.Components[key] = components[key];
        }
    }

}(window))