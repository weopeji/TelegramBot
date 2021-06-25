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
            global.loadResources(['./html/assets/javascript/components.js'], () => {
                Main();
            });
        });
    })();

    function Main()
    {
        const _moderation      = new global.Components.moderation();
        const _active           = new global.Components.active();

        $('.index_page_menu_line').click( function() {
            $('.index_page_menu_line').removeClass('selected');
            $(this).addClass('selected');

            _components[$(this).attr('data')]();
        });

        const _components = {
            "moderation": async function() {
                var _block = await _moderation.render();
                $('.index_page_body_row').empty();
                $('.index_page_body_row').append(_block);
            },
            "active": async function() {
                var _block = await _active.render();
                $('.index_page_body_row').empty();
                $('.index_page_body_row').append(_block);
            },
        }
    }

}(window))