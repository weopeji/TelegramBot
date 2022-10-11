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

    
    function findOfArrayOn_id(arr, value) {
        for (var i = 0; i < arr.length; i++)
            if (arr[i]["_id"] == value)
                return arr[i].data;
    }

    class invester_data
    {
        constructor() 
        {
            this.project            = null;
            this.inv                = null;
            this.money              = null;
            this.date               = null;
            this.urlForDocument     = null;
            this.allInvsOfProject   = [];
            this.DT                 = null;
            this.redactingInvDoc    = null;
            this.typeRender         = null;  
        };

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

            $('.index_page_body_data').css({
                "padding": 0,
            });

            $('.index_page_body_header_user_logotype').css({
                "display": "none",
            });

            $('.buttons_menu').css({
                "display": "none",
            });

            $('.index_page_body_header_alertNewBlock').css({
                "display": "none",
            });

            $('.index_page_body_header_user').css('display', 'none');

            if(typeof this.project.design_type != 'undefined')
            {
                if(this.project.design_type == 'pp') {
                    $('body').addClass('pp_project');
                    $('body').append(`
                        <div class="logo_business">
                            <div class="page-header__logo">
                                <div class="trapezoid left"></div>
                                <div class="trapezoid right"></div>
                                <a href="/">
                                    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0" y="0" viewBox="0 0 1000 1000"><g><path d="M495.1 212c.8-2 3.2-1.7 4.9-1.3 1.7 2 2.4 4.5 3.5 6.9 3.5 7.6 6.8 15.4 10.3 23 7.2-4.1 14.3-8.2 21.5-12.3 1.7-1.2 3.8.1 4.7 1.7.4 2-.2 4.1-.4 6.1-2.1 12.6-4.1 25.3-6.4 37.9-.2 2.1-2.2 3.6-4.2 3.3h-62.1c-2.1.3-4.1-1.2-4.2-3.3-2.3-13.3-4.4-26.6-6.6-39.9-.3-1.9-.8-4.4 1.3-5.5 1.2-1.1 2.8-.6 4 .2 6.9 4 13.9 7.9 20.8 11.9 4.5-9.6 8.4-19.3 12.9-28.7m-8.1 35.1c-.7 1.8-3.1 2.6-4.8 1.6-6.2-3.3-12.1-7.1-18.2-10.3 1.7 10.6 3.5 21.3 5.2 31.9h57.5c1.7-10.6 3.6-21.2 5.2-31.9-6.2 3.3-12.1 7-18.3 10.4-1.6 1-4.1.2-4.7-1.7-3.7-8.1-7.3-16.3-10.9-24.4-3.8 8-7.2 16.3-11 24.4zM38.5 255.1h374.8c0 1.8 0 3.7.1 5.5-125 .3-249.9 0-374.8.1-.1-1.8-.1-3.7-.1-5.6zM582.7 255.1h377.8v5.6c-125.9 0-251.8-.1-377.8 0v-5.6zM655.5 332H828c22.5.1 45.3 2.1 66.9 8.8 14.4 4.6 28.7 11 40.2 21 11.5 10.1 19.1 24.2 22 39.1 3.1 16.1 2.8 33.2-3.7 48.4-7 16.7-20.4 29.9-35.3 39.7-26.5 17-58.1 24.1-89.1 25.6-18.5.6-37 .2-55.5.3v118.4c17 7 34.2 13.6 51.1 20.7-.1 2.6-.1 5.2 0 7.8-56.3.1-112.7 0-169 0v-8c14.1-6.7 28.1-13.7 42.3-20.3.4-53.9.1-107.8.2-161.7-.1-37.2.1-74.4-.1-111.6-14.2-6.6-28.2-13.6-42.4-20.3-.1-2.6-.1-5.2-.1-7.9m118 27.5v131c18.5-.2 37.3 1.2 55.4-3.5 16.3-3.8 31.7-12.7 41.9-26.1 7.7-9.9 11.7-22.4 11.7-34.9.2-14.3-2.8-29.3-11.8-40.7-7.8-10-19.5-16-31.3-19.9-21.3-6.8-43.8-5.9-65.9-5.9zM40 333h170c19.4-.1 38.9 1.3 57.9 5.7 16.2 3.8 32.2 9.9 45.9 19.5 13.2 9.2 22.8 23.3 26.7 38.9 3.9 15.9 4.5 33-.7 48.7-4.3 13-12.6 24.3-22.7 33.4-12.9 11.8-28.7 20.1-45.2 25.9-21.7 7.7-44.9 10.7-67.8 11-15.3.1-30.6 0-46 0 .1 39.5-.1 79.1.1 118.6 17 6.7 33.9 13.6 50.9 20.4v8h-169v-8c14.2-6.9 28.3-13.7 42.5-20.5v-273c-14.3-7-28.4-13.8-42.6-20.6v-8m118 27.5v131c14.5-.2 29 .7 43.4-1.2 16.8-2.2 33.5-8.2 46.1-19.9 11-9.8 18.3-23.6 19.3-38.3 1-16-1.6-33.3-11.9-46.1-9.6-11.9-24.4-18.1-38.9-21.6-18.9-4.7-38.6-3.8-58-3.9zM424 480.9c15.1-11.3 34.5-15.2 53-14.2 15.5.6 31.8 4.3 43.8 14.6 7.3 6.1 12 15.2 11.9 24.8.4 9.6-4.9 18.6-11.8 24.9-11 9.9-25 15.4-38.6 20.6 19.5 18.4 38.7 37.1 58.2 55.6 10.8-16.1 18.8-33.9 25.5-52.1-10.3-3.8-20.5-7.7-30.7-11.5 0-1.6 0-3.3-.1-4.9 25.9-.1 51.8 0 77.7 0v4.9c-9 3.8-18.1 7.2-26.9 11.4-11.2 20.8-22.1 41.9-36 61.1 11.7 11 23.1 22.3 34.9 33.3 8 4.2 16.4 7.8 24.6 11.8v5.2h-72.4c-6.2-5.9-12.4-11.9-18.6-17.8-15.6 12-34.8 19.4-54.4 20.6-18.4 1.3-37.8-.6-54-10-9.2-5.2-17-13.4-20.3-23.5-4.1-12.3-3.2-26.4 3.5-37.5 8.6-15.1 23.8-25 39.4-31.9-7.1-7.2-14-14.7-19.7-23.2-6.9-10.1-8.8-23.1-6.7-35 1.8-11.2 8.9-20.7 17.7-27.2m37.9 0c-5.5 1.7-9.3 6.6-11.1 11.8-3.2 9.3-1.8 19.9 3.5 28.1 5.2 8 11.9 15 18.7 21.7 10.9-10.4 18.1-25.3 17-40.6-.5-7.3-3.5-14.9-9.7-19.2-5.4-3.4-12.4-3.6-18.4-1.8m-32 124.1c-.4 10.7 1.5 22.2 8.2 30.8 5.7 7.5 14.6 12.2 23.8 13.6 16.1 2.5 33.1-1 47-9.7-22.6-21.9-45.1-43.8-67.9-65.5-7.9 8.2-11.1 19.7-11.1 30.8zM516.2 730c2.5-1.6 6.5-.2 6.8 3 .5 3.3-3.4 5.8-6.3 4.3-3-1.1-3.3-5.7-.5-7.3zM623 730.4h6.5v50.1H623v-50.1zM542 736.9h6.5v7.7c3.4 0 6.9-.1 10.3.1-.1 1.7-.1 3.5-.1 5.2h-10.3c.1 7-.1 14 .1 21 .5 5.1 7.1 5.4 10.5 3 .9 1.5 1.6 3.1 2 4.9-4.1 2.3-9.4 2.9-13.8.9-3.2-1.5-5.2-5.1-5.2-8.6-.2-7 0-14-.1-21.1h-6.1v-5.4h6.1c.1-2.6.1-5.1.1-7.7zM369.4 752.5c6.4-10.3 24.2-11.3 30.6-.5-1.6 1.1-3.2 2.2-4.9 3.2-3.7-5.4-11.7-6.7-17-3-7 4.8-6.8 16.8.4 21.2 5.3 3.4 13 2 16.7-3.2 1.6 1 3.3 2.1 4.9 3.1-5.6 9.3-19.7 9.9-27.5 3.1-6.8-5.7-8-16.6-3.2-23.9zM413.4 748.9c5.3-3.8 12.1-5.1 18.4-4.3 3.6.5 7.3 2.2 9.3 5.2 2.1 2.9 2.4 6.6 2.4 10.1v20.5h-6.1c0-1.5.1-3 .1-4.5-4 5-11.2 5.8-17.1 4.3-4.2-1.1-8-4.7-8-9.3-.5-4.6 2.9-9.1 7.3-10.2 5.7-1.5 11.6-.7 17.4-1 .1-3.4-.8-7.4-4.3-8.8-5.5-2.3-12.1-.7-16.8 2.7-.8-1.5-1.7-3.1-2.6-4.7m8.8 16.4c-4.1 1.1-4.5 7.3-.9 9.3 4.6 2.5 11.3 1.5 14.5-2.8 1.9-2 1.2-4.8 1.3-7.2-4.9.3-10.1-.6-14.9.7zM462.5 744.6h6.1v5.5c6.3-7.7 19.1-7.6 25.9-.7 7.4 7.5 6.7 21.6-2 28-7 5.2-18.1 4.6-23.7-2.4v18.4h-6.4c.1-16.2.1-32.5.1-48.8m14.9 5.9c-4.2 1.2-7.6 5.1-8.3 9.4-1.5 6.7 2.8 14.5 9.9 15.2 8 1.7 15.4-6.3 13.9-14.2-.3-7.5-8.5-12.7-15.5-10.4zM515.4 780.5c0-12-.1-23.9 0-35.9h6.4v35.9h-6.4zM574 748.9c5.4-3.9 12.4-5.2 18.9-4.2 3.8.6 7.5 2.5 9.4 6 1.9 3.1 1.9 6.8 2 10.3v19.5c-2.1 0-4.1 0-6.2.1 0-1.5-.1-3-.1-4.5-4.9 5.8-14.3 6.3-20.5 2.5-6.1-3.5-5.8-13.6.5-16.8 6.2-3 13.3-1.6 19.9-2-.1-3.3-.8-7.1-4-8.7-5.6-2.6-12.3-.8-17.1 2.5-1-1.5-1.9-3.1-2.8-4.7m8.3 25.9c4.9 2.3 11.9 1.1 14.7-3.8 1.3-1.9.6-4.3.8-6.4-4.9.2-9.9-.6-14.7.6-4.4 1-4.9 7.8-.8 9.6z"></path></g></svg>
                                </a>
                            </div>
                        </div>
                    `);
                };
            };
        };

        async renderFirstData() 
        {
            var _this       = this;
            var ActionBlock = $(`
                <div class="version2_invester_data_h1">
                    <h1>Инвестирование в проект «${_this.project.data.name}»</h1>
                </div>
                <div class="version2_creating_block">
                    <div class="version2_creating_block_info version2_default_shadow_block">
                        <div class="version2_default_bkg row_default"></div>
                        <div class="version2_creating_block_info_row">
                            <h1>Уважаемый Инвестор ${global.allData.User.first_name}!</h1>
                            <p>
                                Вы находитесь на сайте инвестиционного проекта партнера ${_this.project.data.name}
                                <br>
                                Для того, чтобы проинвестировать в проект, Вам необходимо указатьсвои данные
                            </p>
                        </div>
                    </div>
                </div>
                <div class="version2_creating_block mt25">
                    <div class="version2_creating_block_info version2_default_shadow_block">
                        <div class="version2_default_bkg row_default"></div>
                        <div class="version2_creating_block_info_row">
                            <p class="pt25">
                                <a href="https://google.com">"Пользовательское соглашение на обработку перснальных данных"</a>
                                <br>
                                <a href="https://google.com">"Договор оферты"</a>и<a href="https://google.com">"Политика конфиденциальности"</a>
                            </p>
                        </div>
                        <div class="version2_creating_block_info_row_cheackbox">
                            <label class="checkbox-custom-label" for="highload0">
                                <input class="checkbox-custom" type="checkbox" name="highload0" id="highload0" checked/>
                                <span class="checkmark"></span>
                            </label>
                        </div>
                    </div>
                </div>
                <div class="version2_invester_data_typeButtons">
                    <div class="version2_invester_data_typeButtons_type">
                        <!-- <div class="version2_invester_data_typeButtons_type_button" data="UR">
                            <span>Юридическое лицо</span>
                        </div> -->
                        <div class="version2_invester_data_typeButtons_type_button" data="FIZ">
                            <span>Продолжить как Физическое лицо</span>
                        </div>
                        <!-- <div class="version2_invester_data_typeButtons_type_button version2_invester_data_typeButtons_type_button_last" data="IP">
                            <span>ИП</span>
                        </div> -->
                    </div>
                    <div class="version2_invester_data_typeButtons_document">
                        <div class="version2_default_bkg row_default"></div>
                        <span><i class="far fa-file-alt"></i>Ознакомиться с договором проекта</span>
                    </div>
                </div>
            `);

            $(".creating_page").css({
                "padding-bottom": "200px",
            });

            ActionBlock.find('.version2_invester_data_typeButtons_document').click( function () {
                if(window.screen.width < 1300)
                {
                    var documnetTemplate = $(`
                        <div class="version2_invester_data_mobile_documents">
                            <div class="version2_invester_data_mobile_documents_row">
                                <div class="version2_invester_data_mobile_documents_img">
                                    <img src="/documents/service/index-1.jpg" alt="">
                                </div>
                                <div class="version2_invester_data_mobile_documents_img">
                                    <img src="/documents/service/index-2.jpg" alt="">
                                </div>
                                <div class="version2_invester_data_mobile_documents_img">
                                    <img src="/documents/service/index-3.jpg" alt="">
                                </div>
                            </div>
                        </div>
                    `);

                    documnetTemplate.css({
                        "position": "fixed",
                        "top": "0",
                        "left": "0",
                        "z-index": "1000",
                        "overflow-y": "scroll",
                        "height": "100vh"
                    });

                    documnetTemplate.click( function () {
                        $(this).fadeOut('fast', function () {
                            $(this).remove();
                        });
                    })

                    $('body').append(documnetTemplate);
                }
                else
                {
                    window.open(`/documents/service/index.pdf` , '_blank');
                };
            });

            ActionBlock.find('.version2_invester_data_typeButtons_type_button').click(async function() {
                if($('.version2_creating_block_info_row_cheackbox input').is(':checked')) {
                    _this.typeRender = $(this).attr('data');
                    _this.renderOldBlock();
                };
            });

            $(`.creating_page`).append(ActionBlock);
        }

        async render(data, notPush) 
        {
            $('.index_page_body_data').append(`<div class="creating_page" style="width: auto;"></div>`);
            $('.preloader').css("display", "block");

            var _this = this;

            if(_GET("InvRedacting"))
            {
                _this.redactingInvDoc = await callApi({
                    methodName: "version2_getInvDocByRedactingId",
                    data: _GET("InvRedacting"),
                });
            };

            if(typeof notPush == "undefined")
            {
                var _project = await callApi({
                    methodName: "getProjectForInvesterPage",
                    data: _GET('user'),
                });
    
                var _AllInvsOfProject = await callApi({
                    methodName: "getProjectForInvesterPageAllInvs" ,
                    data: _project._id,
                });
    
                _this.allInvsOfProject   = _AllInvsOfProject;
                _this.project            = _project;
            };

            await this.defaultCSS();
            await this.renderFirstData();
            
            setTimeout(() => {
                $('.preloader').css("display", "none");
            }, 1000);
        }

        async cheackGetDocuments()
        {
            var _this = this;

            $('.creating_page').empty();

            $('.version2_invester_data_backBlock_circule').click( function(e) {
                e.preventDefault();
                _this.render_next();
            });

            if(window.screen.width < 1300)
            {
                var documentBlock = $(`
                    <div class="version2_invester_data_mobile_documents">
                        <div class="version2_invester_data_mobile_documents_row">
                            <div class="version2_invester_data_mobile_documents_img">
                                <img src="/html/assets/images/2.0.0/documents/image-001.png" alt="">
                            </div>
                            <div class="version2_invester_data_mobile_documents_img">
                                <img src="/html/assets/images/2.0.0/documents/image-002.png" alt="">
                            </div>
                            <div class="version2_invester_data_mobile_documents_img">
                                <img src="/html/assets/images/2.0.0/documents/image-003.png" alt="">
                            </div>
                            <div class="version2_invester_data_mobile_documents_document">
                                <h1>Приложение номер 2 - Тестирование</h1>

                                <p>Фио инвестора <data type="fio">${findOfArrayOn_id(_this.inv.data, "fio")}</data></p>
                                <p>Дата <data type="date">${new Date()}</data></p>
                                <p>Сумма инвестиции <data type="summ">${_this.money}</data></p>
                                <p>Банк <data type="bank">${_this.project.data.bank}</data></p>
                                <p>Инн <data type="inn"></data>${findOfArrayOn_id(_this.inv.data, "inn")}</p>
                                <p>Огрн <data type="ogrn">${findOfArrayOn_id(_this.inv.data, "ogrnip")}</data></p>
                            </div>
                        </div>
                    </div>
                    <div class="version2_creating_block_info_row_cheackbox">
                        <label class="checkbox-custom-label" for="highload0">
                            <input class="checkbox-custom" type="checkbox" name="highload0" id="highload0" checked/>
                            <span class="checkmark"></span>
                        </label>
                    </div>
                    <div class="creating_page_input" style="width: 360px;">
                        <div class="creating_page_input_div" data="pay">
                            <span style="text-align: center">Оплатить</span> 
                        </div>
                    </div>
                `);

                documentBlock.find(".creating_page_input_div").click( function() {
                    _this.cheackGet();
                })

                if(typeof _this.project.notFullpay != "undefined")
                {
                    if(Number(_this.project.notFullpay) == 0)
                    {
                        documentBlock.find(".creating_page_input_div").find('span').html('Подтвердить инвестицию');
                    };
                };

                $('.creating_page').append(documentBlock);
            }
            else
            {
                var documentBlock = $(`
                    <div class="creating_page_input creating_page_input_document_img">
                        <img src="./html/assets/images/documentPNG.png" alt="">
                        <div class="creating_page_input_document_img_hover">
                            <div class="creating_page_input_document_img_hover_row">
                                <span>Ознакомится с договором</span>
                                <span>Ознакомится с приложением №2</span>
                            </div>
                        </div>
                    </div>
                    <div class="version2_creating_block_info_row_cheackbox creating_page_input_document_img_version2_creating_block_info_row_cheackbox">
                        <label class="checkbox-custom-label" for="highload0">
                            <input class="checkbox-custom" type="checkbox" name="highload0" id="highload0" checked/>
                            <span class="checkmark"></span>
                        </label>
                        <a>Принимаю условия договора</a>
                    </div>
                    <div class="creating_page_input" style="width: 360px;">
                        <div class="creating_page_input_div" data="pay">
                            <span style="text-align: center">Оплатить</span> 
                        </div>
                    </div>
                `);

                documentBlock.find('.creating_page_input_div').css({
                    "background": "linear-gradient(81.65deg, #CF2DBF 18.55%, #951CDF 97.44%)",
                });

                documentBlock.eq(0).find("span").eq(0).click( function() 
                {
                    if(window.screen.width < 1300)
                    {
                        DownLoadFileAjax(`/projects/${_this.project._id}/${_this.project.signature_document.user_document}`, `${_this.project.signature_document.user_document}`);
                    }
                    else
                    {
                        window.open(`/projects/${_this.project._id}/${_this.project.signature_document.user_document}` , '_blank');
                    };
                });

                var html = `/html/project/application_number_2/?`;

                html += `fio=${findOfArrayOn_id(_this.inv.data, "fio")}&`;
                html += `number=2&`;
                html += `summ=${_this.money}&`;
                
                if(_this.inv.type == "UR")
                {
                    html += `inn=${findOfArrayOn_id(_this.inv.data, "inn")}&`;
                    html += `ogrn=${findOfArrayOn_id(_this.inv.data, "ogrnip")}&`;
                    html += `do=${findOfArrayOn_id(_this.inv.data, "cpecial")}&`;
                    html += `fio_dolg=${findOfArrayOn_id(_this.inv.data, "fio_dolg")}&`
                } 
                else if (_this.inv.type == "IP")
                {
                    html += `inn=${findOfArrayOn_id(_this.inv.data, "inn")}&`;
                    html += `ogrn=${findOfArrayOn_id(_this.inv.data, "ogrnip")}&`;
                }

                html += `type=${_this.inv.type}&`;
                html += `bank=${_this.project.data.bank}`;

                _this.urlForDocument = html;

                documentBlock.eq(0).find("span").eq(1).click( function() 
                {
                    if(window.screen.width < 1300)
                    {
                        DownLoadFileAjax(html, `document.html`);
                    }
                    else
                    {
                        window.open(html, '_blank');
                    };
                })

                documentBlock.find(".creating_page_input_div").click( function() {
                    _this.cheackGet();
                })

                if(typeof _this.project.notFullpay != "undefined")
                {
                    if(Number(_this.project.notFullpay) == 0)
                    {
                        documentBlock.find(".creating_page_input_div").find('span').html('Подтвердить инвестицию');
                    };
                };

                $('.creating_page').append(documentBlock);
            };
        }

        async cheackGet()
        {
            $('.creating_page').empty();

            $('.version2_invester_data_backBlock_circule').click( function(e) {
                e.preventDefault();
                _this.cheackGetDocuments();
            });

            var _this       = this;
            var pushMoney   = _this.money + " ₽";

            if(typeof this.project.notFullpay != "undefined")
            {
                pushMoney = `${Number(Number(_this.money.toString().trim().replace(/\s/g, '')) / 100 * Number(this.project.notFullpay)).toString().replace(/(\d)(?=(\d{3})+([^\d]|$))/g, '$1 ')} ₽ (${this.project.notFullpay}%)`;
            };

            var msgsBlock = $(`
                <div class="creating_page_block">
                    <div class="creating_page_start" style="margin-bottom: 20px">
                        <div class="version2_default_bkg row_default"></div>
                        <span style="position: relative; z-index: 2;">
                            Уважаемый Инвестор ${findOfArrayOn_id(_this.inv.data, "fio")} переведите ${pushMoney} По реквезитам ниже и Пришлите чек оплаты для окончания инвестирования. <br><br>

                            Реквезиты перечисления: <br><br>
                            Банк-получатель: ${this.project.data.bank} <br>
                            Корр. счет: ${this.project.data.account_correct} <br>
                            БИК: ${this.project.data.bik} <br>
                            КПП: ${this.project.data.kpp} <br>
                            Получатель: ${this.project.data.recipient} <br>
                            Счет получателя: ${this.project.data.account_get} <br>
                            Назначение платежа: Номер Проекта ${this.project._id}, Имя проекта ${this.project.data.name} <br>
                        </span>
                    </div>
                </div>
            `);

            var _block = $(`
                <div class="creating_page_input">
                    <div class="creating_page_input_div" data="pay">
                        <input type="file" id="triggerClick">
                        <span data="first" style="text-align: center; cursor: pointer;">Загрузить</span>
                    </div>
                </div>
            `);

            _block.find('.creating_page_input_div').css({
                "background": "linear-gradient(81.65deg, #CF2DBF 18.55%, #951CDF 97.44%)",
            });

            if(typeof _this.project.notFullpay != "undefined")
            {
                if(Number(_this.project.notFullpay) == 0)
                {
                    msgsBlock.find('.creating_page_start span').html(` 
                        <div class="version_2_row_creating_page_input" style="position: relative; z-index: 2;">
                            Уважаемый Инвестор ${findOfArrayOn_id(_this.inv.data, "fio")}
                            Подтверждая инвестицию, вы подтверждаете, что по окончанию сбора средств в проект вы выплатитите зарезервированную вами сумму. Отказавшись вы получите запрет на использование сервиса в будущем на определенный срок
                        </div>
                    `.toString().trim());

                    _block.find('span').html("Подтвердить");
                };
            };

            _block.find('span').click( async function () 
            {
                if(typeof _this.project.notFullpay != "undefined" && Number(_this.project.notFullpay) == 0)
                {
                    $('.preloader').fadeIn();

                    if(_GET("InvRedacting"))
                    {
                        await callApi({
                            methodName: "version2_investerData_invdoc_notMoney_redacting",
                            data: {
                                user:  _GET('user'),
                                inv: _this.inv,
                                money: _this.money,
                                url: _this.urlForDocument,
                                invId: _GET("InvRedacting"),
                            },
                        });
                    }
                    else
                    {
                        await callApi({
                            methodName: "version2_investerData_invdoc_notMoney",
                            data: {
                                user:  _GET('user'),
                                inv: _this.inv,
                                money: _this.money,
                                url: _this.urlForDocument,
                            },
                        });
                    }

                    window.open("tg:\/\/resolve?domain=invester_official_bot",'_self').close()
                }
                else
                {
                    if(!_this.date)
                    {
                        var autch_block = $(`
                            <div class="autch_block">
                                <div class="autch_block_row">
                                    <p>Дата вашей инвестиции совпадает с текущей датой?</p>
                                    <div class="autch_block_buttons">
                                        <div class="autch_block_buttons_block autch_block_buttons_block_close">
                                            <span>Не совпадает</span>
                                        </div>
                                        <div class="autch_block_buttons_block autch_block_buttons_block_accept">
                                            <span>Совпадает</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        `);
    
                        autch_block.find('.autch_block_buttons_block_close').click( function() {
                            $('.autch_block').find(".autch_block_row").remove();
    
                            function pad(s, width, character) {
                                return new Array(width - s.toString().length + 1).join(character) + s;
                            }
    
                            var maxDate     = new Date(Number(_this.project.data_creating.toString()));
                            var maxmaxDate  = new Date();
    
                            var _blockAppend = 
                            $(`
                                <div class="autch_block_row">
                                    <p>Выберите дату инвестирования:</p>
                                    <div class="autch_block_row_input_date">
                                        <input type="date" placeholder="Дата" id='needDateNow' max="${maxmaxDate.getFullYear()}-${pad(maxmaxDate.getMonth() + 1, 2, '0')}-${pad(maxmaxDate.getDate(), 2, '0')}" min="${maxDate.getFullYear()}-${pad(maxDate.getMonth() + 1, 2, '0')}-${pad(maxDate.getDate(), 2, '0')}">
                                    </div>
                                    <div class="autch_block_buttons">
                                        <div class="autch_block_buttons_block autch_block_buttons_block_close">
                                            <span>Назад</span> 
                                        </div>
                                        <div class="autch_block_buttons_block autch_block_buttons_block_accept">
                                            <span>Подтвердить</span>
                                        </div>
                                    </div>
                                </div>
                            `);
    
                            _blockAppend.find('.autch_block_buttons').css('margin-top', "25px");
    
                            _blockAppend.find('.autch_block_buttons_block_close').click( function() {
                                $('.autch_block').remove();
                            })
    
                            _blockAppend.find('.autch_block_buttons_block_accept').click( function() {
                                var valueNeed = $('#needDateNow').val();
    
                                if(valueNeed.length > 0)
                                {
                                    _this.date = new Date(valueNeed).getTime();
                                    $('.autch_block').remove();
                                    $('#triggerClick').trigger("click");
                                } else 
                                {
                                    alert('Выберите дату!');
                                }
                            })
    
                            $('.autch_block').append(_blockAppend);
                        });
    
                        autch_block.find('.autch_block_buttons_block_accept').click( async function() {
                            $('.autch_block').remove();
                            $('#triggerClick').trigger("click");
                        })
    
                        $('body').append(autch_block);
                    } else 
                    {
                        $('#triggerClick').trigger("click");
                    }
                }
            })

            var _this = this;

            _block.find('input[type=file]').change( async function() 
            {
                var _thisFile = $(this);

                if($(this.files).length > 0)
                {
                    await callApi({
                        methodName: "setInvesterDataProjectForInvesterPage",
                        data: {
                            user:  _GET('user'),
                            data: {
                                inv: _this.inv,
                                date: _this.date,
                            },
                        },
                    });

                    var filename    = $(this.files)[0].name;
                    var aux         = filename.split('.');
                    var extension   = aux[aux.length -1].toUpperCase();
    
                    var _form       = new FormData();
                    var _url        = `${getURL()}/file_cheack_get.io/files`;
                    _form.append('files', $(this.files)[0]);
                    _form.append('_User', _GET('user'));
                    _form.append('_id', _this.project._id);
                    _form.append('_pts', extension);
                    _form.append('_pay', _this.money);
                    _form.append('_date', _this.date);

                    if($(this).attr('token')) 
                    {
                        _form.append('token', $(this).attr('token'));
                    }

                    var _file       = _form;

                    var uploadBlock = 
                    $(`
                        <div class="process_upload_block">
                            <div class="process_upload_block_row">
                                <div class="process_upload_block_line"></div>
                            </div>
                        </div>
                    `);

                    $('.index_page_body_header').append(uploadBlock);
        
                    axios.post(_url, _file, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        },
                        onUploadProgress: function(progressEvent) 
                        {
                            const totalLength = progressEvent.lengthComputable ? progressEvent.total : progressEvent.target.getResponseHeader('content-length') || progressEvent.target.getResponseHeader('x-decompressed-content-length');
                            if (totalLength !== null) {
                                var progressBarData = Math.round( (progressEvent.loaded * 100) / totalLength );
                                $('.process_upload_block_line').css("width", progressBarData + "%");
                            }
                        }
                    }).then(data => 
                    {
                        if(data.data.status == "ok") 
                        {
                            _thisFile.attr('token', data.data.inv);

                            alert("Чек прикоеплен!");
                            $('.process_upload_block').remove();
                            $('.creating_page_input span[data="first"]').html('Заменить');
    
                            $('.creating_page_input_div[data="show"]').remove();
                            $('.creating_page_input_div[data="accept"]').remove();
            
                            var moreBlock = $(`
                                <div class="creating_page_input_div_row">
                                    <div class="creating_page_input_div" data="show">
                                        <span style="text-align: center">Посмотреть</span>
                                    </div>
                                    <div class="creating_page_input_div" data="accept">
                                        <span style="text-align: center">Подтвердить</span>
                                    </div>
                                </div>
                            `);
            
                            moreBlock.find(`[data="show"]`).click( function() {
                                window.open(`https://investir.one/projects/${_this.project._id}/${data.data.inv}_investment.${extension}`, '_blank');
                            });
            
                            moreBlock.find(`[data="accept"]`).click( async function() 
                            {
                                await callApi({
                                    methodName: "endInvestingDataPush",
                                    data: {
                                        user: _GET('user'),
                                        project: _this.project._id,
                                        money: _this.money.toString().replace(/(\d)(?=(\d{3})+([^\d]|$))/g, '$1 '),
                                        date: _this.date,
                                        url: _this.urlForDocument,
                                        invId: data.data.inv,
                                    },
                                });

                                var protoUrl    = "tg:\/\/resolve?domain=invester_official_bot";
                                window.location = protoUrl;
                            });
            
                            $('.creating_page_input').append(moreBlock);
                        };
                    });
                };
            });

            $('.creating_page').append(msgsBlock);
            $('.creating_page').append(_block);
        }

        async renderOldBlock()
        {
            var _this           = this;
            this.render_backBlock();

            $('.version2_invester_data_backBlock_circule').click( function(e) {
                $('.index_page_body_data').empty();
                e.preventDefault();
                _this.render(null, true);
            });

            try {
                var _projectMoney   = _this.project.data.minimal_amount.toString().trim().replace(/\s/g, '');
                var fullMoneysInvs  = 0;
                var fullMoneyCheack = Number(_this.project.data.attraction_amount.toString().replace(/\s/g, ''));
    
                if(typeof _this.project.requestInvestingMoney != "undefined")
                {
                    fullMoneyCheack = fullMoneyCheack + Number(_this.project.requestInvestingMoney.toString().replace(/\s/g, '')); 
                }
    
                for(var InvPushMoney of _this.allInvsOfProject)
                {
                    fullMoneysInvs = fullMoneysInvs + Number(InvPushMoney.data.pay.toString().replace(/\s/g, ''));
                };
    
                $('.creating_page').empty();
    
                var multiplicityData = _this.project.multiplicity;
                var multiplicityText = "";

                if(typeof _this.project.multiplicity != "undefined")
                {
                    multiplicityText = `<br>Сумма должна быть кратна: ${multiplicityData.toString().replace(/(\d)(?=(\d{3})+([^\d]|$))/g, '$1 ')} руб.`;
                };
    
                var msgsBlock = $(`
                    <div class="creating_page_block">
                        <div class="creating_page_start" style="margin-bottom: 20px">
                            <div class="version2_default_bkg row_default"></div>
                            <span style="position: relative; z-index: 2;">
                                Уважаемый Инвестор ${global.allData.User.first_name} введите сумму инвестирования</a>.<br>
                                Минимальная сумма входа: ${_projectMoney.toString().replace(/(\d)(?=(\d{3})+([^\d]|$))/g, '$1 ')} руб.
                                ${multiplicityText} <br>
                                <span class="version2_invester_data_moneyFull">Сумма не должна превышать ${Number(fullMoneyCheack - fullMoneysInvs).toString().replace(/(\d)(?=(\d{3})+([^\d]|$))/g, '$1 ')} руб.</span>
                            </span>
                        </div>
                    </div>
                `);
    
                var _block = $(`
                    <div class="creating_page_input">
                        <div class="version2_default_bkg row_default"></div>
                        <input type="text" class="creating_page_input_div" data="pay" placeholder="Сумма">
                        <div class="creating_page_input_button">
                            <span>Отправить</span>
                        </div>
                    </div>
                `);

                if(_GET("InvRedacting"))
                {
                    _block.find(`input[type="text"]`).val(_this.redactingInvDoc.data.pay);
                }

                if(_this.money)
                {
                    _block.find(`input[type="text"]`).val(_this.money);
                }

                if(_getCookie('pay_invester_data')) {
                    _block.find(`input[type="text"]`).val(Number(_getCookie('pay_invester_data')).toString().ReplaceNumber());
                };
    
                _block.find(`input`).on('keyup input', function() 
                {
                    var _val = $(this).val();
                    _val = _val.replace(/[^\d;]/g, '')
                    _val = _val.replace(/\s/g, '');
                    var format = String(_val).replace(/(\d)(?=(\d{3})+([^\d]|$))/g, '$1 ');
                    $(this).val(format);
                    setCookie('pay_invester_data', Number(format.replace(/\s/g,'')));
                });
    
                var _this               = this;
                var errorMoneyCheack    = false;
    
                if(typeof _this.project.notFullpay != "undefined")
                {
                    if(Number(_this.project.notFullpay) == 0) {
                        msgsBlock.find(".version2_invester_data_moneyFull").remove();
                        errorMoneyCheack = true;
                        msgsBlock.find('.creating_page_start span').append("Ваше место в очереди подтверждения заявок: " + Number(Number(_this.allInvsOfProject.length) + Number(1)) + "<br>");
                        msgsBlock.find('.creating_page_start span').append("Вы находитесь в очереди проверки заявок инвестирования в проект, после которой мы отправим оповещение для оплаты в течении 3 дней");
                    };
                };
    
                _block.find('.creating_page_input_button span').click( function() 
                {
                    var money   = $('.creating_page_input input').val();
                    var _money  = money.toString().replace(/\s/g, '');
    
                    if(!errorMoneyCheack) {
                        if(typeof _this.project.requestInvestingMoney != "undefined")
                        {
                            if(Number(fullMoneyCheack) < Number(fullMoneysInvs) + Number(_money))
                            {
                                alert(`Сумма превышает на ${Number(Number(fullMoneysInvs) + Number(_money) - Number(fullMoneyCheack)).toString().replace(/(\d)(?=(\d{3})+([^\d]|$))/g, '$1 ')}`);
                                return;
                            }
                        };
                    }
    
                    if(Number(_money) < Number(_projectMoney))
                    {
                        alert('Сумма недостаточна!');
                    } 
                    else {
                        if(typeof _this.project.multiplicity != "undefined")
                        {
                            if(Number(_money) % _this.project.multiplicity == 0)
                            {
                                _this.money = money;
                                _this.render_next();
                            } else {
                                alert(`Сумма должна быть кратной ${_this.project.multiplicity}`);
                            }
                        } else {
                            _this.money = money;
                            _this.render_next();
                        }
                    }
                });
    
                $('.creating_page').append(msgsBlock);
                $('.creating_page').append(_block);
            }
            catch(e) {
                alert(e);
            }
        }

        async render_backBlock()
        {
            var _this       = this;

            var backBlock   = $(`
                <div class="version2_invester_data_backBlock">
                    <div class="version2_invester_data_backBlock_circule version2_default_bkg row_default">
                        <i class="fal fa-angle-left"></i>
                    </div>
                </div>
            `);

            $('.version2_invester_data_backBlock').remove();
            $('.index_page_body_data').prepend(backBlock);
        }

        async render_next(DT, InvPush) 
        {
            this.DT = this.typeRender;
            this.render_backBlock();

            $('.version2_invester_data_backBlock_circule').off('click').click( function(e) {
                e.preventDefault();
                _this.renderOldBlock();
            });

            var render_nextfuns = 
            {
                "UR": function() 
                {
                    var _block = $(`
                        <div class="creating_page_input">
                            <div class="version2_default_bkg row_default"></div>
                            <div class="version_2_creating_page_input_row">
                                <input type="text" class="creating_page_input_div" data="fio" placeholder="Название Юр. Лица">
                                <input type="text" class="creating_page_input_div" data="inn" placeholder="ИНН">
                                <input type="text" class="creating_page_input_div" data="kpp" placeholder="КПП">
                                <input type="text" class="creating_page_input_div" data="ogrnip" placeholder="ОГРН">
                                <input type="text" class="creating_page_input_div" data="cpecial" placeholder="Должность">
                                <input type="text" class="creating_page_input_div" data="fio_dolg" placeholder="ФИО должностного лица">
                                <input type="text" class="creating_page_input_div" data="addr" placeholder="Юридический адрес">
                                <input type="text" class="creating_page_input_div" data="bank" placeholder="Банк получателя">
                                <input type="text" class="creating_page_input_div" data="bik" placeholder="БИК">
                                <input type="text" class="creating_page_input_div" data="nomer" placeholder="Номер расчетного счета">
                                <input type="text" class="creating_page_input_div" data="nomer_kor" placeholder="Номер корреспондентского счета">
                                <input type="text" class="creating_page_input_div" data="info_more" placeholder="На основе чего вы действуете?">
                                <div class="creating_page_input_button">
                                    <span>Отправить</span> 
                                </div>
                            </div>
                        </div>
                    `);

                    _block.find('input[data="inn"]').bind("change keyup input click", function() {
                        if (this.value.match(/[^0-9]/g)) {
                            this.value = this.value.replace(/[^0-9]/g, '');
                        }
                    });
                    _block.find('input[data="ogrnip"]').bind("change keyup input click", function() {
                        if (this.value.match(/[^0-9]/g)) {
                            this.value = this.value.replace(/[^0-9]/g, '');
                        }
                    });

                    _block.find('input[data="nomer"]').bind("change keyup input click", function() {
                        if (this.value.match(/[^0-9]/g)) {
                            this.value = this.value.replace(/[^0-9]/g, '');
                        }
                    });
                    _block.find('input[data="bik"]').bind("change keyup input click", function() {
                        if (this.value.match(/[^0-9]/g)) {
                            this.value = this.value.replace(/[^0-9]/g, '');
                        }
                    });
                    _block.find('input[data="nomer_kor"]').bind("change keyup input click", function() {
                        if (this.value.match(/[^0-9]/g)) {
                            this.value = this.value.replace(/[^0-9]/g, '');
                        }
                    });

                    $('.creating_page').append(_block);
                },
                "IP": function()
                {
                    var _block = $(`
                        <div class="creating_page_input">
                            <div class="version2_default_bkg row_default"></div>
                            <div class="version_2_creating_page_input_row">
                                <input type="text" class="creating_page_input_div" data="fio" placeholder="ФИО">
                                <input type="text" class="creating_page_input_div" data="inn" placeholder="ИНН">
                                <input type="text" class="creating_page_input_div" data="ogrnip" placeholder="ОГРНИП">
                                <input type="text" class="creating_page_input_div" data="addr" placeholder="адрес">
                                <input type="text" class="creating_page_input_div" data="bank" placeholder="Банк получателя">
                                <input type="text" class="creating_page_input_div" data="bik" placeholder="БИК">
                                <input type="text" class="creating_page_input_div" data="nomer" placeholder="Номер расчетного счета">
                                <input type="text" class="creating_page_input_div" data="nomer_kor" placeholder="Номер корреспондентского счета">
                                <input type="text" class="creating_page_input_div" data="info_more" placeholder="На основе чего вы действуете?">

                                <div class="creating_page_input_button">
                                    <span>Отправить</span>
                                </div>
                            </div>
                        </div>
                    `);

                    _block.find('input[data="inn"]').bind("change keyup input click", function() {
                        if (this.value.match(/[^0-9]/g)) {
                            this.value = this.value.replace(/[^0-9]/g, '');
                        }
                    });
                    _block.find('input[data="ogrnip"]').bind("change keyup input click", function() {
                        if (this.value.match(/[^0-9]/g)) {
                            this.value = this.value.replace(/[^0-9]/g, '');
                        }
                    });


                    _block.find('input[data="nomer"]').bind("change keyup input click", function() {
                        if (this.value.match(/[^0-9]/g)) {
                            this.value = this.value.replace(/[^0-9]/g, '');
                        }
                    });
                    _block.find('input[data="bik"]').bind("change keyup input click", function() {
                        if (this.value.match(/[^0-9]/g)) {
                            this.value = this.value.replace(/[^0-9]/g, '');
                        }
                    });
                    _block.find('input[data="nomer_kor"]').bind("change keyup input click", function() {
                        if (this.value.match(/[^0-9]/g)) {
                            this.value = this.value.replace(/[^0-9]/g, '');
                        }
                    });

                    $('.creating_page').append(_block);
                },
                "FIZ": function()
                {
                    var _block = $(`
                        <div class="creating_page_input">
                            <div class="version2_default_bkg row_default"></div>
                            <div class="version_2_creating_page_input_row">
                                <input type="text" class="creating_page_input_div" data="fio" placeholder="* ФИО полностью">
                                <input type="text" class="creating_page_input_div" data="cpecial" placeholder="* Номер паспорта и серия">
                                <input type="text" class="creating_page_input_div" data="how_get" placeholder="* Кем выдан">
                                <input type="text" class="creating_page_input_div" data="propiska" placeholder="* Адрес регистрации (прописка)">
                                <input type="text" class="creating_page_input_div" data="bank" placeholder="* Банк получателя">
                                <input type="text" class="creating_page_input_div" data="bik" placeholder="* БИК">
                                <input type="text" class="creating_page_input_div" data="nomer" placeholder="* Номер расчетного счета">
                                <input type="text" class="creating_page_input_div" data="nomer_kor" placeholder="* Номер корреспондентского счета">
                                <input type="text" class="creating_page_input_div" data="info_more" placeholder="* На основе чего вы действуете?">

                                <div class="version2_creating_page_input_inputCheackBoxRezident">
                                    <span>* Являетесь ли вы резидентом?</span>
                                    <div class="version2_creating_page_input_inputCheackBoxRezident_buttons">
                                        <div class="version2_creating_page_input_inputCheackBoxRezident_buttons_button">
                                            <div class="version2_default_bkg row_default"></div>
                                            <a>Да</a>
                                        </div>
                                        <div class="version2_creating_page_input_inputCheackBoxRezident_buttons_button">
                                            <div class="version2_default_bkg row_default"></div>
                                            <a>Нет</a>
                                        </div>
                                    </div>
                                </div>

                                <p style="
                                    position: relative;
                                    z-index: 2;
                                ">* обязательные поля</p>
    
                                <div class="creating_page_input_button">
                                    <span>Отправить</span>
                                </div>
                            </div>
                        </div>
                    `);

                    _block.find('.version2_creating_page_input_inputCheackBoxRezident_buttons_button').click( function() {
                        $('.version2_creating_page_input_inputCheackBoxRezident_buttons_button').removeClass('selected');
                        $(this).addClass('selected');
                    })

                    _block.find('input[data="cpecial"]').mask('9999 999999');

                    _block.find('input[data="nomer"]').bind("change keyup input click", function() {
                        if (this.value.match(/[^0-9]/g)) {
                            this.value = this.value.replace(/[^0-9]/g, '');
                        }
                    });
                    _block.find('input[data="bik"]').bind("change keyup input click", function() {
                        if (this.value.match(/[^0-9]/g)) {
                            this.value = this.value.replace(/[^0-9]/g, '');
                        }
                    });
                    _block.find('input[data="nomer_kor"]').bind("change keyup input click", function() {
                        if (this.value.match(/[^0-9]/g)) {
                            this.value = this.value.replace(/[^0-9]/g, '');
                        }
                    });

                    $('.creating_page').append(_block);
                }
            }

            $('.creating_page').empty();

            render_nextfuns[this.typeRender]();

            $('input.creating_page_input_div').keydown(function(e) {
                if(e.keyCode === 13) {
                    var indexInput      = $(this).index();
                    var indexInteger    = indexInput + 1;

                    if(indexInteger > $('input.creating_page_input_div').length - 1)
                    {
                        indexInteger = 0;
                    }

                    $('input.creating_page_input_div').eq(indexInteger).focus();
                }
            });

            var _this = this;

            $('.creating_page_input_button').click( function() 
            {
                var _array = {
                    type: DT,
                    data: [],
                };
                var _error      = false;
                var _errorMore  = true;
        
                $('.creating_page_input').find("input").each((i, element) => 
                {
                    if($(element).val().length == 0)
                    {
                        _error = true;
                    }
                    _array.data.push({
                        _id: $(element).attr('data'),
                        data: $(element).val(),
                    });
                });

                $('.version2_creating_page_input_inputCheackBoxRezident_buttons_button').each((i, element) => {
                    if($(element).hasClass('selected')) {
                        _errorMore = false;
                    };
                })

                if(_errorMore)  {
                    alert('Ответьте на вопрос являетесь ли вы резидентом');
                    return;
                };

                if(_error)
                {
                    alert('Введите все данные!');
                    _this.inv = _array;
                } 
                else 
                {
                    _this.inv = _array;
                    _this.cheackGetDocuments();
                }
            });

            if(_GET("InvRedacting"))
            {
                $('.creating_page_input_div').each( function(i, element) 
                {
                    if(typeof $(element).attr("data") != "undefined")
                    {
                        if(typeof findOfArrayOn_id(_this.redactingInvDoc.data.data, $(element).attr("data")) != "undefined")
                        {
                            $(element).val(findOfArrayOn_id(_this.redactingInvDoc.data.data, $(element).attr("data")));
                        };
                    };
                });
            };

            if(_this.inv)
            {
                $('.creating_page_input_div').each( function(i, element) 
                {
                    if(typeof $(element).attr("data") != "undefined")
                    {
                        if(typeof findOfArrayOn_id(_this.inv.data, $(element).attr("data")) != "undefined")
                        {
                            $(element).val(findOfArrayOn_id(_this.inv.data, $(element).attr("data")));
                        };
                    };
                });
            };

            if(window.screen.width < 1300)
            {
                $('.creating_page').css({
                    "padding-bottom": "100px",
                });
            };
        };
    };

    var components = {
        invester_data,
    };

    if(!global.Components) { global.Components = components; } 
    else { 
        for(var key in components)
        {
            global.Components[key] = components[key];
        }
    }

}(window))