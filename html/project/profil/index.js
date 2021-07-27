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

        var need_project = await callApi({
            methodName: 'getProject',
            data: _id,
        });

        var _config = 
        {
            header: function() 
            {
                var type = "Займ";
                var organization;
                if(need_project.data.organization == "1") organization = "Юридическое лицо";
                if(need_project.data.organization == "2") organization = "Индивидуальный предпрениматель";
                if(need_project.data.organization == "3") organization = "Физическое лицо";
                var text = `${type} - ${organization}`;
                return text;
            },
            data: {
                _append: function(name, data, a) 
                {
                    if(a) {
                        $('.index_page_profil_data').append(`
                        <div class="page_line">
                            <span>${name}</span>
                            <p><a href="${data}">${data}</a></p>
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
                    this._append("Название компании", need_project.parce.name);
                    this._append("Подробная информация", "https://www.rusprofile.ru", true);
                    this._append("ИНН/ОГРН", need_project.parce.inn + "/" + need_project.parce.ogrn);
                    this._append("Адрес юридический", need_project.parce.addr);
                    this._append("Адрес фактический", need_project.data.addr);
                    this._append("Сайт", need_project.data.syte, true);
                    this._append("Цель займа", need_project.data.target);
                    this._append("Учредитель", need_project.parce.founder);
                },
                "2": function (params) {
                    $('.index_page_profil_data h1').html(_config.header());
                    this._append("Название компании", need_project.parce.name);
                    this._append("Подробная информация", need_project.parce.info, true);
                    this._append("ИНН/ОГРН", need_project.parce.inn + "/" + need_project.parce.ogrn);
                    this._append("Адрес юридический", need_project.parce.addr);
                    this._append("Адрес фактический", need_project.data.addr);
                    this._append("Сайт", need_project.data.syte, true);
                    this._append("Цель займа", need_project.data.target);
                    this._append("Учредитель", need_project.parce.founder);
                },
                "3": function (params) {
                    $('.index_page_profil_data h1').html(_config.header());
                    this._append("Название компании", need_project.data.name);
                    this._append("ИНН", need_project.data.inn);
                    this._append("Адрес фактический", need_project.data.addr);
                    this._append("Сайт", need_project.data.syte, true);
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