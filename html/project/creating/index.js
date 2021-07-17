(function (global) {

    (() => {
        delete imSocket;
        imSocket = null;
        var url = null;
        if (location.hostname === "localhost" || location.hostname === "127.0.0.1") {
            url = global_data.data_url_localhost;
            imSocket = io(url, {transports: ['polling']});
        } else {
            url = global_data.data_url_server;
            imSocket = io(url, {
                path: '/socket.io'
            });
        }
        imSocket.on('connect', function() {
            console.log("Сервер подключен к: " + url);
            global.loadResources(['./components.js'], () => {
                Main();
            });
        });
    })();

    async function Main()
    {
        var _id                 = global.location.href.split("#")[1];
        const _components       = new global.Components.components();
        var _User               = await _components._User(_id);

        
        if(_id.length < 9) 
        {
            var _project = await _components.getProject(_id);

            $('.index_page_body_header_type').remove();
            
            if(_project.signature) {
                $('.index_page_body h1').html('Подписание документов');
                $('.index_page_body h2').html('Отправьте последние документы для составления договора и подпишите его');
                $('.index_page_body_button span').html('Отправить');

                await _components.render_signature(_project);

                var canvas          = document.querySelector("canvas");
                var signaturePad    = new SignaturePad(canvas);

                $('.clean').click( function() {
                    signaturePad.clear();
                });

                $('.index_page_body_button').click( function() {
                    _components.correct_signature(_id);
                    $('.preloader').fadeIn( function() {
                        $('.preloader').fadeOut( function() {
                            $('.end_get_project').css('display', "flex");
                        });
                    });
                });
            }

            if(_project.redacting) {
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
            $('.index_page_header_user span').html(`${_User.first_name} ${_User.last_name}`);
            $('.index_page_header_user_img').html(`<img src='http://localhost/tbot/users_profile/${_User.user}/${_User.img}'></img>`)
    
            $('.index_page_body_points').fadeOut( async function() {
                await _components.render($('.index_page_body_header_type .selected').attr('data'));
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
                _components.correct($('.index_page_body_header_type').find('.selected').attr('data'), _id);
            });
        }

        function changeTextArea() 
        {
            $('.text_area').change( function() {
                _components.changeTextArea($(this));
            });

            $('.body_point_line_header_text input[type=file]').change( async function() 
            {
                var id_ = _id;
                if(_id.length < 10) {
                    id_ = await _components.getId(_id);
                }
                _components.load_file(this, id_, $(this).attr('id'));
            });

            $('.all_good_cheack').click( async function() {
                var id_ = _id;
                if(_id.length < 10) {
                    id_ = await _components.getId(_id);
                }
                var file_name = $(this).parent().parent().parent().find('.loader_input').attr('data');
                global.open(`http://localhost/tbot/users/${id_}/${file_name}`, "_blank");
            });

            $('.all_good_del').click( function() {
                $(this).parent().parent().fadeOut( function() {
                    $(this).parent().parent().parent().find('.download_buttons').fadeIn();
                })
            });
        }
        
    }

}(window))