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
        
        $('.index_page_header_user span').html(_User.first_name);

        $('.index_page_body_points').fadeOut( function() {
            _components.render("1");
            $('.index_page_body_points').fadeIn();
            changeTextArea();
        });
        
        $('.index_page_header_logo_menu_row span').click( function() {
            $('.index_page_header_logo_menu_row span').removeClass('selected');
            $(this).addClass('selected');
            $('.index_page_body_points').fadeOut( function() {
                _components.render($(this).attr('data'));
                $('.index_page_body_points').fadeIn();
                changeTextArea();
            });
        });

        function changeTextArea() 
        {
            $('.text_area').change( function() {
                _components.changeTextArea($(this));
            });

            $('.body_point_line_header_text input[type=file]').change( function() 
            {
                _components.load_file(this, _id, $(this).attr('id'));
            });

            $('.all_good_cheack').click( function() {
                var file_name = $(this).parent().parent().parent().find('.loader_input').attr('data');
                global.open(`http://localhost/tbot/users/${_id}/${file_name}`, "_blank");
            });

            $('.all_good_del').click( function() {
                $(this).parent().parent().fadeOut( function() {
                    $(this).parent().parent().parent().find('.download_buttons').fadeIn();
                })
            });
        }

        $('.index_page_body_button').click( function() {
            _components.correct($('.index_page_header_logo_menu_row').find('.selected').attr('data'), _id);
        });
        
    }

}(window))