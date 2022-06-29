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

    if(_getCookie('black_styles'))
    {
        let $       = document;
        let head    = $.getElementsByTagName('head')[0];
        let link    = $.createElement('link');
        link.rel    = 'stylesheet';
        link.type   = 'text/css';
        link.href   = '/html/assets/css/2.0.0/black/index.css';
        head.appendChild(link);
    }
    else
    {
        let $       = document;
        let head    = $.getElementsByTagName('head')[0];
        let link    = $.createElement('link');
        link.rel    = 'stylesheet';
        link.type   = 'text/css';
        link.href   = '/html/assets/css/2.0.0/white/index.css';
        head.appendChild(link);
    };

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
        };

        var need_project = await callApi({
            methodName: 'getProject',
            data: _id,
        });

        function startArbitr()
        {
            if(typeof need_project.parce.ar != "undefined")
            {
                if(need_project.parce.ar == "error")
                {
                    $('.arbitr_info_block_header a').empty().append(`Ошибка парсинга`);
                    return;
                }
            }
            else
            {
                $('.arbitr_info_block_header a').empty().append(`Ошибка парсинга`);
                return;
            }

            if(typeof need_project.parce.ar.result != 'undefined')
            {
                if(typeof need_project.parce.ar.result["Ответчик"] != 'undefined')
                {
                    var initNumber = 0;

                    for(var _key in need_project.parce.ar.result["Ответчик"])
                    {
                        var dataBlock       = need_project.parce.ar.result["Ответчик"][_key];

                        var templateText    = $(`
                            <div class="page_line">
                                <div class="page_line_row">
                                    <div class="page_line_block">
                                        <span>${dataBlock["Дата"]}</span><br>
                                        <span>${_key}</span><br>
                                    </div>
                                    <div class="page_line_block">
                                        <span>${dataBlock["Суд"]}</span><br>
                                        <span>${dataBlock["Судья"]}</span><br>
                                    </div>
                                    <div class="page_line_block">
                                        <span>${dataBlock["Сумма"]}</span><br>
                                        <span>${dataBlock["Статус"]}</span><br>
                                    </div>
                                    <div class="page_line_block">
                                        <span><a href="${dataBlock["Url"]}" target="_blank">Перейти</a></span>
                                    </div>
                                </div>
                            </div>
                        `);

                        initNumber++;
                        $('.arbitr_info_block_body').append(templateText);
                    };

                    $('.arbitr_info_block_header a').empty().append(`Найдено ${initNumber} дел`);


                    if(initNumber > 1)
                    {
                        var allBlacksFadeIn = [];

                        $('.arbitr_info_block_body .page_line').each( async function(i, element) {
                            if(i > 0)
                            {
                                allBlacksFadeIn.push($(element));
                            };
                        });

                        $('.arbitr_info_blockbutton').fadeIn().click( async function() 
                        {
                            if($(this).attr('push'))
                            {
                                if ($(this).attr('push') == "false")
                                {
                                    $(this).attr('push', true);

                                    for(var block of allBlacksFadeIn)
                                    {
                                        block.fadeIn();
                                        await sleep(50);
                                    }
                                }
                                else
                                {
                                    $(this).attr('push', false);

                                    for(var block of allBlacksFadeIn)
                                    {
                                        block.fadeOut();
                                        await sleep(50);
                                    }
                                }
                            }
                            else
                            {
                                $(this).attr('push', true);

                                for(var block of allBlacksFadeIn)
                                {
                                    block.fadeIn();
                                    await sleep(50);
                                }
                            }
                        });
                    }
                    
                } else {
                    $('.arbitr_info_block_header a').empty().append(`Найдено 0 дел`);
                }
            } else {
                $('.arbitr_info_block_header a').empty().append(`Найдено 0 дел`);
            }
        }

        function startArbitrIspo()
        {

            if(typeof need_project.parce.ispo != "undefined")
            {
                if(need_project.parce.ispo == "error")
                {
                    $('.fssp_info_block_header a').empty().append(`Ошибка парсинга`);
                    return;
                }
            }
            else
            {
                $('.fssp_info_block_header a').empty().append(`Ошибка парсинга`);
                return;
            }

            if(typeof need_project.parce.ispo[need_project.data.inn.toString()] != "undefined")
            {
                var initNumber = 0;

                for(var _key in need_project.parce.ispo[need_project.data.inn.toString()])
                {
                    var dataBlock       = need_project.parce.ispo[need_project.data.inn.toString()][_key];

                    var templateText    = $(`
                        <div class="page_line">
                            <div class="page_line_row">
                                <div class="page_line_block">
                                    <span>${dataBlock["Дата"]}</span><br>
                                    <span>${_key}</span><br>
                                </div>
                                <div class="page_line_block">
                                    <span>${dataBlock["РегНомерСД"]}</span><br>
                                    <span>${dataBlock["НомерИсп"]}</span><br>
                                </div>
                                <div class="page_line_block">
                                    <span>${dataBlock["Сумма"]}</span><br>
                                    <span>${dataBlock["Статус"]}</span><br>
                                </div>
                            </div>
                        </div>
                    `);

                    initNumber++;
                    $('.fssp_info_block_body').append(templateText);
                };

                $('.fssp_info_block_header a').empty().append(`Найдено ${initNumber} дел`);


                if(initNumber > 1)
                {
                    var allBlacksFadeIn = [];

                    $('.fssp_info_block_body .page_line').each( async function(i, element) {
                        if(i > 0)
                        {
                            allBlacksFadeIn.push($(element));
                        };
                    });

                    $('.fssp_info_blockbutton').fadeIn().click( async function() 
                    {
                        if($(this).attr('push'))
                        {
                            if ($(this).attr('push') == "false")
                            {
                                $(this).attr('push', true);

                                for(var block of allBlacksFadeIn)
                                {
                                    block.fadeIn();
                                    await sleep(50);
                                }
                            }
                            else
                            {
                                $(this).attr('push', false);

                                for(var block of allBlacksFadeIn)
                                {
                                    block.fadeOut();
                                    await sleep(50);
                                }
                            }
                        }
                        else
                        {
                            $(this).attr('push', true);

                            for(var block of allBlacksFadeIn)
                            {
                                block.fadeIn();
                                await sleep(50);
                            }
                        }
                    });
                }
            }
            else
            {
                $('.fssp_info_block_header a').empty().append(`Найдено 0 дел`);
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

        // if(_GET("administator"))
        // {
        //     if(getR_F == "ok")
        //     {
        //         var _allArbitrFizData   = [];
    
        //         _allArbitrFizData.push(need_project.parce.fiz.globalUserData);
    
        //         need_project.parce.fiz.moreUsersData.forEach(elementFiz => {
        //             _allArbitrFizData.push(elementFiz);
        //         });
    
        //         _allArbitrFizData.forEach((el, i) => 
        //         {
        //             var userDataFio = null;
        //             var initNumber  = i + 1;

        //             if(initNumber == 1)
        //             {
        //                 userDataFio = `${need_project.data.sob_fio}`;
        //             } else
        //             {
        //                 userDataFio = need_project.data.moreUsersNotParce[`+${initNumber}`][`BB*sob_fio_${initNumber}`];
        //             }

        //             var _HEADER = $(`<h1>Cобстевенник ${initNumber} ФИО: ${userDataFio}</h1>`);
    
        //             $('.ispo_line').append(_HEADER);
    
        //             var deistvitelnost  = "Не действителен или не правельно введен";
        //             var jsonObj         = $.parseJSON(el.dePa);
    
        //             if(jsonObj[0].qc == 0)
        //             {
        //                 deistvitelnost = "Паспорт действителен";
        //             }
    
        //             $('.ispo_line').append($(`
        //                 <div class='page_line'>
        //                     <span>Действительность паспорта</span>
        //                     <p>${deistvitelnost}</p>
        //                 </div>
        //             `));
    
        //             var smozanyatiy = "Не является налого плательшиком или не правильно введены данные (Требуется ручная перепроверка)";
    
        //             if(el.saMo.ok)
        //             {
        //                 smozanyatiy = "Является налого плательшиком";
        //             }
    
        //             $('.ispo_line').append($(`
        //                 <div class='page_line'>
        //                     <span>Статус налогоплательщика</span>
        //                     <p>${smozanyatiy}</p>
        //                 </div>
        //             `));
    
        //             $('.ispo_line').append($(`
        //                 <div class='page_line'>
        //                     <span>Статус розыска</span>
        //                     <p>Не находится в розыске</p>
        //                 </div>
        //             `));
    
        //             $('.ispo_line').append($(`
        //                 <div class='page_line'>
        //                     <span>Банкротство</span>
        //                     <p>Не имеет Банкротства</p>
        //                 </div>
        //             `));
    
        //             var _HEADER         = $(`<h1>Исполнительное производство Cобстевенника ${i + 1}</h1>`);

        //             $('.ispo_line').append(_HEADER);


        //             var ispoErrorBlock  = true;
                    
        //             if(el.arBi != "error")
        //             {
        //                 el.arBi[0].result.forEach(elementArBi => 
        //                 {
        //                     ispoErrorBlock  = false;
        
        //                     var _block = $(`
        //                         <div class="page_line">
        //                             <span>${elementArBi.exe_production}</span>
        //                             <p>${elementArBi.subject}</p>
        //                         </div>
        //                     `);
        
        //                     $('.ispo_line').append(_block);
        //                 })

        //             }
    
        //             if(ispoErrorBlock)
        //             {
        //                 var _block = $(`
        //                     <div class="page_line">
        //                         <span>Подробная информация</span>
        //                         <p>Отсутствует</p>
        //                     </div>
        //                 `);
    
        //                 $('.ispo_line').append(_block);
        //             }
        //         })
        //     } else {
        //         var _preloader = $(`
        //             <div class="loader_input">
        //                 <img src="../../assets/images/ispo_preloader.png" alt="">
        //             </div>
        //         `);
    
        //         $('.ispo_line').append(_preloader);
        //     };
        // } else
        // {
            if(need_project.data.organization != 1)
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

                        if(el.arBi != "error")
                        {
        
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
                        }
        
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
            
        // }

        $('body').append('<div class="iframe_ready"></div>')
        $('.index_page_hover_preloader_dor_document').remove();
    }

}(window))