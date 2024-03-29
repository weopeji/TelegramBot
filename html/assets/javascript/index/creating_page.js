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
                <div class="version2_creating"></div>
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
            var inn         = $('.version2_creating_block_input input').val();
            var cheackINN   = this.validateInn(inn);

            if(cheackINN.result) 
            {
                $('.version2_creating_block_input input').val("");

                var creatingData = await callApi({
                    methodName: "creatingData",
                    data: inn,
                });
    
                this.startRenderCreating(creatingData, inn);
            }
        }

        async startDefault()
        {
            var ActionBlock = $(`
                <div class="version2_creating_block">
                    <div class="version2_creating_block_info version2_default_shadow_block">
                        <div class="version2_default_bkg row_default"></div>
                        <div class="version2_creating_block_info_row">
                            <h1>Уважаемый пользователь ${global.allData.User.first_name}!</h1>
                            <p>Вводя данные, вы подтверждаете что ознакомились с условиями “Пользовательского соглашения” и “Политики обработки данных”</p>
                        </div>
                    </div>
                    <div class="version2_creating_block_onlyText version2_default_boxShadow_text">
                        <h1>Введите ИНН для создания заявки на финансирование проекта</h1>
                    </div>
                    <div class="version2_creating_block_input">
                        <div class="version2_default_bkg row_default"></div>
                        <div class="version2_creating_block_input_row">
                            <input type="text" placeholder="Введите Ваш ИНН">
                            <button type="button">Отправить</button>
                        </div>
                    </div>
                </div>
            `);

            ActionBlock.find('input').bind("change keyup input click", function() {
                if (this.value.match(/[^0-9]/g)) {
                    this.value = this.value.replace(/[^0-9]/g, '');
                }
            });

            this.global.append(ActionBlock);

            var _this = this;

            ActionBlock.find('button').click( function () {
                _this.nextRender();
            });
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