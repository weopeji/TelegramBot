(function (global) 
{
    io_connect( function() 
    {
        global.loadResources(['./js/components.js'], () => {
            Main();
        });    
    });

    async function Main()
    {
        global.pageID           = _GET('page');

        const auth_block        = new global.Components.auth_block().render();
        const moderations       = new global.Components.moderations();

        var pagesLAN = {
            "moderations": function() {moderations.render();},
        }

        (() => {
            $('.buttons_menu').click( function() {
                $('.index_page_menu').toggleClass('selected');
                $('.buttons_menu').toggleClass('selected');
            })
        })()
    }

}(window))