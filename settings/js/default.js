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
        const projects          = new global.Components.projects();

        var pagesLAN = 
        {
            "moderations": function() {projects.render("moderations");},
        }

        if(global.pageID)
        {
            $('.index_page_body_data').empty();
            pagesLAN[global.pageID]();
        }
    }

}(window))