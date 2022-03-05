(function (global) 
{
    io_connect( function() 
    {
        global.loadResources(['./js/components.js'], () => {
            global.loadResources(['./js/redacting_page.js'], () => {
                global.loadResources(['./js/commissions.js'], () => {
                    global.loadResources(['./js/Chats.js'], () => {
                        global.loadResources(['./js/video_redactor.js'], () => {
                            global.loadResources(['./js/wait_investings.js'], () => {
                                global.loadResources(['./js/complaint.js'], () => {
                                    Main();
                                });
                            });
                        });
                    });
                });
            });
        });    
    });

    async function Main()
    {
        global.pageID           = _GET('page');

        const auth_block        = new global.Components.auth_block().render();
        const projects          = new global.Components.projects();
        const block             = new global.Components.block();
        const all_users         = new global.Components.all_users();
        const investings        = new global.Components.investings();
        const pays_business     = new global.Components.pays_business();
        const pays_attract      = new global.Components.pays_attract();
        const commissions       = new global.Components.commissions();
        const Chats             = new global.Components.Chats();
        const wait_investings   = new global.Components.wait_investings();
        const complaint         = new global.Components.complaint();
        
        var pagesLAN = 
        {
            "moderations": function() {projects.render("moderations");},
            "active": function() {projects.render("active");},
            "block": function() {block.render();},
            "all_users": function() {all_users.render();},
            "investings": function() {investings.render()},
            "pays_business": function() {pays_business.render()},
            "pays_attract": function() {pays_attract.render()},
            "commissions": function() {commissions.render()},
            "Chats": function() {Chats.render()},
            "wait_investings": function() {wait_investings.render()},
            "complaint": function() {complaint.render()},
        };

        if(global.pageID)
        {
            $('.index_page_body_data').empty();
            pagesLAN[global.pageID]();
        } else {
            $('.index_page_body_data').empty();
            pagesLAN["moderations"]();
        }

        $('.button_open_settings_page').click( function() {
            $('.index_page').toggleClass('selected');
        })
    }

}(window))