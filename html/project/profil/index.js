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
        var _id = _GET("id");

        if(!_id)
        {
            _id = window.location.href.split('#')[1].split('/')[0];
        }

        var getR_F = await callApi({
            methodName: 'getR_F',
            data: _id,
        });

        var need_project = await callApi({
            methodName: 'getProject',
            data: _id,
        });

        console.log(need_project);
        console.log(getR_F);

        function startArbitr()
        {
            if(Array.isArray(need_project.parce.ar))
            {
                if(need_project.parce.ar.response.length > 0 && need_project.parce.ar.response != "Null")
                {
                    $('.arbitr_add').append(`<span class="arbitr_arbitr_add">${need_project.parce.ar.many}</span>`);

                    var initNumber = 0;

                    need_project.parce.ar.response.forEach(el => 
                    {
                        if(initNumber == 2)
                        {
                            var _block = 
                            $(`
                                <div class="arbitr_add_more_data_button">
                                    <span>Показать больше</span>
                                </div>
                                <div class="arbitr_add_more_data">

                                </div>
                            `);

                            _block.eq(0).click( function() {
                                $('.arbitr_add').toggleClass('selected');
                            })

                            $('.arbitr_add').append(_block);
                        }

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

                        if(initNumber < 2)
                        {
                            $('.arbitr_add').append(_text);
                        } else 
                        {
                            $('.arbitr_add_more_data').append(_text);
                        }

                        initNumber = initNumber + 1;
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
            } else {
                var _default = $(`
                    <div class="page_line">
                        <span>Подробная информация</span>
                        <p>Проблемы парсера</p>
                    </div>
                `);

                $('.arbitr_add').append(_default);
            }
        }

        function startArbitrIspo()
        {
            if(getR_F == "ok")
            {
                if(Array.isArray(need_project.parce.ispo))
                {
                    if(need_project.parce.ispo.length > 0)
                    {
                        if(need_project.parce.ispo[0].result.length > 0)
                        {
                            var appendBlock = $(`
                                <h1 class="h1_sob">ИСПОЛНИТЕЛЬНОЕ ПРОИЗВОДСТВО</h1>

                                <div class="ispo_line_more_data">
                                    <div class="ispo_line_more_data_data">

                                    </div>
                                </div>
                            `);

                            need_project.parce.ispo[0].result.forEach(el => {
                                var _text = $(`
                                    <div class="page_line">
                                        <div class="page_line_block">
                                            <span>${el.name}</span><br>
                                            <span>${el.exe_production}</span><br>
                                        </div>
                                        <div class="page_line_block">
                                            <span>${el.details}</span><br>
                                            <span>${el.subject}</span><br>
                                        </div>
                                        <div class="page_line_block">
                                            <span>${el.department}</span><br>
                                            <span>${el.bailiff}</span><br>
                                        </div>
                                    </div>
                                    <div class="page_line_line"></div>
                                `);

                                _text.css('margin-top','20px');
                                _text.css('margin-bottom','20px');

                                $(appendBlock).find('.ispo_line_more_data_data').append(_text);
                            });

                            $('.index_page_profil').append(appendBlock);
                        }
                    }
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
                    this._append("ИНН/ОГРН", need_project.parce.pr.inn + " / " + need_project.parce.pr.ogrn);
                    this._append("Адрес юридический", need_project.parce.pr.address.value);
                    this._append("Адрес фактический", need_project.data.addr_fact);
                    this._append("Сайт", need_project.data.syte, true);
                    this._append("Цель", need_project.data.target);
                    this._append("Учредитель", need_project.parce.pr.management.name);
                    this._append("List.org", `https://www.list-org.com/search?type=inn&val=${need_project.parce.pr.inn}`, true);

                    startArbitr();
                    startArbitrIspo();
                },
                "2": function () {
                    $('.index_page_profil_data h1').html(_config.header());
                    this._append("Название компании", need_project.parce.pr.name.full);
                    this._append("ИНН/ОГРН", need_project.parce.pr.inn + " / " + need_project.parce.pr.ogrn);
                    this._append("Адрес юридический", need_project.parce.pr.address.value);
                    this._append("Адрес фактический", need_project.data.addr_fact);
                    this._append("Сайт", need_project.data.syte, true);
                    this._append("Цель", need_project.data.target);

                    if(typeof need_project.parce.pr.management != "undefined") {
                        this._append("Учредитель", need_project.parce.pr.management.name);
                    } else {
                        if(typeof need_project.parce.pr.name.full != "undefined")
                        {
                            this._append("Учредитель", `${need_project.parce.pr.name.full}`);
                        }   
                    }
                    
                    this._append("List.org", `https://www.list-org.com/search?type=fio&val=${need_project.parce.pr.inn}`, true);

                    startArbitr();
                },
                "3": function (params) {
                    $('.index_page_profil_data h1').html(_config.header());
                    this._append("Название компании", need_project.data.name);
                    this._append("Цель", need_project.data.target);

                    $('h1[data="arbitr"]').remove();
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

        if(_GET("administator"))
        {
            if(getR_F == "ok")
            {
                var _allArbitrFizData   = [];
    
                _allArbitrFizData.push(need_project.parce.fiz.globalUserData);
    
                need_project.parce.fiz.moreUsersData.forEach(elementFiz => {
                    _allArbitrFizData.push(elementFiz);
                });
    
                _allArbitrFizData.forEach((el, i) => 
                {
                    var userDataFio = null;
                    var initNumber  = i + 1;

                    if(initNumber == 1)
                    {
                        userDataFio = `${need_project.data.sob_fio}`;
                    } else
                    {
                        userDataFio = need_project.data.moreUsersNotParce[`+${initNumber}`][`BB*sob_fio_${initNumber}`];
                    }

                    var _HEADER = $(`<h1>Cобстевенник ${initNumber} ФИО: ${userDataFio}</h1>`);
    
                    $('.ispo_line').append(_HEADER);
    
                    var deistvitelnost  = "Не действителен или не правельно введен";
                    var jsonObj         = $.parseJSON(el.dePa);
    
                    if(jsonObj[0].qc == 0)
                    {
                        deistvitelnost = "Паспорт действителен";
                    }
    
                    $('.ispo_line').append($(`
                        <div class='page_line'>
                            <span>Действительность паспорта</span>
                            <p>${deistvitelnost}</p>
                        </div>
                    `));
    
                    var smozanyatiy = "Не является налого плательшиком или не правильно введены данные (Требуется ручная перепроверка)";
    
                    if(el.saMo.ok)
                    {
                        smozanyatiy = "Является налого плательшиком";
                    }
    
                    $('.ispo_line').append($(`
                        <div class='page_line'>
                            <span>Статус налогоплательщика</span>
                            <p>${smozanyatiy}</p>
                        </div>
                    `));
    
                    $('.ispo_line').append($(`
                        <div class='page_line'>
                            <span>Статус розыска</span>
                            <p>Не находится в розыске</p>
                        </div>
                    `));
    
                    $('.ispo_line').append($(`
                        <div class='page_line'>
                            <span>Банкротство</span>
                            <p>Не имеет Банкротства</p>
                        </div>
                    `));
    
                    var _HEADER         = $(`<h1>Исполнительное производство Cобстевенника ${i + 1}</h1>`);
                    var ispoErrorBlock  = true;
                    
                    $('.ispo_line').append(_HEADER);
    
                    el.arBi[0].result.forEach(elementArBi => 
                    {
                        ispoErrorBlock  = false;
    
                        var _block = $(`
                            <div class="page_line">
                                <span>${elementArBi.exe_production}</span>
                                <p>${elementArBi.subject}</p>
                            </div>
                        `);
    
                        $('.ispo_line').append(_block);
                    })
    
                    if(ispoErrorBlock)
                    {
                        var _block = $(`
                            <div class="page_line">
                                <span>Подробная информация</span>
                                <p>Отсутствует</p>
                            </div>
                        `);
    
                        $('.ispo_line').append(_block);
                    }
                })
            } else {
                var _preloader = $(`
                    <div class="loader_input">
                        <img src="../../assets/images/ispo_preloader.png" alt="">
                    </div>
                `);
    
                $('.ispo_line').append(_preloader);
            };
        } else
        {
            $('.h1_sob').remove();
        }

        $('body').append('<div class="iframe_ready"></div>')
        $('.index_page_hover_preloader_dor_document').remove();
    }

}(window))