(function (global) {

    io_connect( function() 
    {
        global.loadResources(['./components.js'], () => {
            Main();
        });
    });

    async function Main()
    {
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

        var _id                             = global.location.href.split("#")[1];
        const _components                   = new global.Components.components();
        
        if(_id.length >= 7) 
        {
            var _User                       = await _components._User(_id);
            var _id                         = _User.user;
        }

        global._typePage    = 'creating';
        global._User        = _User;
        
        if(_id.length < 7)  
        {
            var _project = await _components.getProject(_id);

            $('.index_page_body_header_type').remove();
            
            if(_project.signature) 
            {
                if(_project.signature.status == 'wait') 
                {
                    global._typePage = 'signature';

                    $('.index_page_body h1').html('Дополнительные документы');
                    $('.index_page_body h2').html('Отправьте следующие документы');
                    $('.index_page_body_button span').html('Отправить');

                    await _components.render_signature(_project);

                    $('.index_page_body_button').click( function() {
                        _components.correct_signature(_project.data.organization, _id);
                    });

                    changeTextArea();
                }
            }

            if(_project.signature_document) 
            {
                if(_project.signature_document.status == 'wait') 
                {
                    global._typePage = 'signature_document';

                    $('.index_page_body h1').html('Подписание договора с инвестором');
                    $('.index_page_body h2').html('Скачайте документ, подпишите его и загрузите в формате PDF');
                    $('.index_page_body_button span').html('Отправить');

                    await _components.render_signature_document(_project);

                    $('.index_page_body_button').remove();

                    changeTextArea();

                }
            }

            if(typeof _project.registrationDocument != 'undefined') 
            {
                if(_project.registrationDocument.status == 'wait') 
                {
                    global._typePage = 'registrationDocument';

                    $('.index_page_body h1').html('Подписание договора с investiR');
                    $('.index_page_body h2').html('Скачайте документ, подпишите его и загрузите');
                    $('.index_page_body_button span').html('Отправить');

                    await _components.render_registration_document(_project);

                    $('.index_page_body_button').remove();

                    changeTextArea();

                }
            }

            if(_project.redacting) 
            {

                global._typePage = 'redacting'; 

                $('.index_page_body h1').html('Исправление данных');                                   
                $('.index_page_body h2').html('Исправте все недостающие данные');                      
                $('.index_page_body_button span').html('Отправить');

                await _components.render_redacting(_project);

                $('.index_page_body_button').click( function() {
                    _components.redactingAgain(_id);
                });

                changeTextArea();                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         
            }

        } else 
        {
            $('.index_page_body_points').fadeOut( async function() 
            {
                await _components.render(_User.creatingData.type);

                $('.index_page_body_points').fadeIn();
                changeTextArea();
            });
            
            $('.index_page_body_header_type span').click( function() {
                $('.index_page_body_header_type span').removeClass('selected');
                $(this).addClass('selected');
                $('.index_page_body_points').fadeOut( async function() {
                    await _components.render($('.index_page_body_header_type .selected').attr('data'));
                    $('.index_page_body_points').fadeIn();
                    changeTextArea();
                });
            });

            $('.index_page_body_button').click( function() {
                _components.correct(_User.creatingData.type, _id);
            });

        }




        // =============================================================================================

        function changeTextArea() 
        {
            $('.text_area').change( function() {
                _components.changeTextArea($(this));
            });

            $('.body_point_line_header_text input[type=file]').change( async function() 
            {
                if(_typePage == 'signature') 
                {
                    await _components.load_file_signature(this, _id, $(this).attr('id'));
                } 
                else if(_typePage == 'redacting') 
                {
                    await _components.load_file_redacting(this, _id, $(this).attr('id'));
                }
                else if(_typePage == 'signature_document') 
                {
                    await _components.load_file_redacting_signature_document(this, _id);
                }
                else if(_typePage == 'registrationDocument') 
                {
                    await _components.load_file_redacting_registration_document(this, _id);
                } else
                {
                    await _components.load_file(this, _id, $(this).attr('id'));
                }

                $(this).val('');
            });

            $('.all_good_cheack').click( async function() {
                var file_name = $(this).parent().parent().parent().find('.loader_input').attr('data');
                if(global._typePage == "signature" || global._typePage == "redacting") {
                    global.open(`${getURL()}/projects/${_id}/${file_name}`, "_blank");
                } else {
                    global.open(`${getURL()}/users/${_id}/${file_name}`, "_blank");
                }
            });

            $('.all_good_del').click( function() {
                $(this).parent().parent().parent().find('.loader_input').removeAttr('data');
                $(this).parent().parent().fadeOut( function() {
                    $(this).parent().parent().parent().find('.download_buttons').fadeIn();
                })
            });
        }

        global.changeTextArea = changeTextArea;

        setTimeout( function() {
            $('.preloader').fadeOut('fast');
        }, 1000);
    }

}(window))