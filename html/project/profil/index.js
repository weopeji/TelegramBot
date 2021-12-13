(function (global) {

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

    io_connect( function() 
    {
        Main();
    });

    async function Main()
    {
        var _id = global.location.href.split("#")[1];

        var getR_F = await callApi({
            methodName: 'getR_F',
            data: _id,
        });

        console.log(getR_F);

        var need_project = await callApi({
            methodName: 'getProject',
            data: _id,
        });

        console.log(need_project);

        function startArbitr()
        {
            if(need_project.parce.ar)
            {
                if(need_project.parce.ar.response.length > 0)
                {
                    $('.arbitr_add').append(`<span class="arbitr_arbitr_add">${need_project.parce.ar.many}</span>`);
                    need_project.parce.ar.response.forEach(el => {
                        var _text = $(`
                            <div class="page_line">
                                <div class="page_line_block">
                                    <span>${el.data}</span><br>
                                    <span>${el.id}</span><br>
                                </div>
                                <div class="page_line_block">
                                    <span>${el.judge}</span><br>
                                    <span>${el.sity}</span><br>
                                </div>
                                <div class="page_line_block">
                                    <span>${el.plaintiff}</span><br>
                                    <span>${el.respondent}</span><br>
                                </div>
                                <div class="page_line_block">
                                    <span><a href="${el.id_url}" target="_blank">Перейти</a></span>
                                </div>
                            </div>
                            <div class="page_line_line"></div>
                        `);

                        _text.css('margin-top','20px');
                        _text.css('margin-bottom','20px');
    
                        $('.arbitr_add').append(_text);
                    })
                } else {
                    var _default = $(`
                        <div class="page_line">
                            <span>Подробная информация</span>
                            <p>Отсутствует</p>
                        </div>
                    `);
    
                    $('.arbitr_add').append(_default);
                }
            }
        }

        var _config = 
        {
            header: function() 
            {
                var organization;
                if(need_project.data.organization == "1") organization = "Юридическое лицо";
                if(need_project.data.organization == "2") organization = "Индивидуальный предприниматель";
                if(need_project.data.organization == "3") organization = "Физическое лицо";
                var text = `${organization}`;
                return text;
            },
            data: {
                _append: function(name, data, a) 
                {
                    if(a) {
                        var _url = data;
                        if(_url.substr(0, 5) != "https") {
                            _url = "https://" + _url
                        }
                        $('.index_page_profil_data').append(`
                        <div class="page_line">
                            <span>${name}</span>
                            <p><a href="${_url}" target="_blank">${data}</a></p>
                        </div>`);
                    } else {
                        $('.index_page_profil_data').append(`
                        <div class="page_line">
                            <span>${name}</span>
                            <p>${data}</p>
                        </div>`);
                    }
                },
                "1": function() 
                {
                    $('.index_page_profil_data h1').html(_config.header());
                    this._append("Название компании", need_project.parce.pr.name.full);
                    //this._append("Подробная информация", need_project.parce.info, true);
                    this._append("ИНН/ОГРН", need_project.parce.pr.inn + "/" + need_project.parce.pr.ogrn);
                    this._append("Адрес юридический", need_project.parce.pr.address.value);
                    this._append("Адрес фактический", need_project.data.addr);
                    this._append("Сайт", need_project.data.syte, true);
                    this._append("Цель займа", need_project.data.target);
                    this._append("Учредитель", need_project.parce.pr.management.name);
                    this._append("List.org", `https://www.list-org.com/search?type=inn&val=${need_project.parce.pr.inn}`, true);

                    startArbitr();
                },
                "2": function (params) {
                    $('.index_page_profil_data h1').html(_config.header());
                    this._append("Название компании", need_project.parce.pr.name.full);
                    //this._append("Подробная информация", need_project.parce.info, true);
                    this._append("ИНН/ОГРН", need_project.parce.pr.inn + "/" + need_project.parce.pr.ogrn);
                    this._append("Адрес юридический", need_project.parce.pr.address.value);
                    this._append("Адрес фактический", need_project.data.addr);
                    this._append("Сайт", need_project.data.syte, true);
                    this._append("Цель займа", need_project.data.target);
                    this._append("Учредитель", need_project.parce.pr.management.name);
                    this._append("List.org", `https://www.list-org.com/search?type=inn&val=${need_project.parce.pr.inn}`, true);

                    startArbitr();
                },
                "3": function (params) {
                    $('.index_page_profil_data h1').html(_config.header());
                    this._append("Название компании", need_project.data.name);
                    this._append("Цель займа", need_project.data.target);
                }
            },
            credit_story: {
                _append: function(name, data) {
                    $('.index_page_profil_credit').append(`
                    <div class="page_line">
                        <span>${name}</span>
                        <p>${data}</p>
                    </div>`);
                },
                _push: function() {
                    this._append("Сумма закрытых займов", "0 ₽");
                    this._append("Сумма займов за текущий календарный год", "0 ₽");
                    this._append("Максимальная сумма займа", "0 ₽");
                    this._append("Дата закрытия последнего договора займа", "0 ₽");
                    this._append("Обеспечение", "0 ₽");
                },
            }
        }

        _config.data[need_project.data.organization]();
        _config.credit_story._push();

        $('body').append('<div class="iframe_ready"></div>')
    }

}(window))